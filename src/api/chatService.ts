import type { Message } from '../types'
import { groqService, GroqResponse } from './groqService'

export interface ChatResponse {
  success: boolean
  message: string
  error?: string
}

export class ChatService {
  private readonly STORAGE_KEY = 'bappa_chat_history'
  private readonly DAILY_LIMIT_KEY = 'bappa_daily_limit'
  private readonly DAILY_LIMIT = 3

  // Get chat history from local storage
  getChatHistory(): Message[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading chat history:', error)
      return []
    }
  }

  // Save chat history to local storage
  saveChatHistory(messages: Message[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages))
    } catch (error) {
      console.error('Error saving chat history:', error)
    }
  }

  // Check daily limit
  checkDailyLimit(): { canSend: boolean; remaining: number; resetTime: number } {
    try {
      const now = Date.now()
      const today = new Date().toDateString()
      const stored = localStorage.getItem(this.DAILY_LIMIT_KEY)
      
      if (!stored) {
        // First time user
        const limitData = {
          date: today,
          count: 0,
          resetTime: new Date().setHours(24, 0, 0, 0)
        }
        localStorage.setItem(this.DAILY_LIMIT_KEY, JSON.stringify(limitData))
        return { canSend: true, remaining: this.DAILY_LIMIT, resetTime: limitData.resetTime }
      }

      const limitData = JSON.parse(stored)
      
      // Check if it's a new day
      if (limitData.date !== today) {
        const newLimitData = {
          date: today,
          count: 0,
          resetTime: new Date().setHours(24, 0, 0, 0)
        }
        localStorage.setItem(this.DAILY_LIMIT_KEY, JSON.stringify(newLimitData))
        return { canSend: true, remaining: this.DAILY_LIMIT, resetTime: newLimitData.resetTime }
      }

      const remaining = this.DAILY_LIMIT - limitData.count
      return { 
        canSend: remaining > 0, 
        remaining: Math.max(0, remaining), 
        resetTime: limitData.resetTime 
      }
    } catch (error) {
      console.error('Error checking daily limit:', error)
      return { canSend: true, remaining: this.DAILY_LIMIT, resetTime: Date.now() + 86400000 }
    }
  }

  // Increment daily count
  incrementDailyCount(): void {
    try {
      const today = new Date().toDateString()
      const stored = localStorage.getItem(this.DAILY_LIMIT_KEY)
      
      if (stored) {
        const limitData = JSON.parse(stored)
        if (limitData.date === today) {
          limitData.count += 1
          localStorage.setItem(this.DAILY_LIMIT_KEY, JSON.stringify(limitData))
        }
      }
    } catch (error) {
      console.error('Error incrementing daily count:', error)
    }
  }

  // Generate AI response using Groq API
  async generateResponse(userMessage: string): Promise<ChatResponse> {
    // Check daily limit first
    const limitCheck = this.checkDailyLimit()
    if (!limitCheck.canSend) {
      return {
        success: false,
        message: '',
        error: `Daily limit reached! You can send ${this.DAILY_LIMIT} messages per day. Please try again tomorrow.`
      }
    }

    try {
      // Get conversation history for context
      const history = this.getChatHistory()
      const conversationHistory = history.map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      }))

      // Generate response using Groq API
      const groqResponse = await groqService.generateResponse(userMessage, conversationHistory)
      
      if (groqResponse.success) {
        // Increment daily count only on successful response
        this.incrementDailyCount()
        
        return {
          success: true,
          message: groqResponse.message
        }
      } else {
        return {
          success: false,
          message: '',
          error: groqResponse.error || 'Failed to generate response from Groq API'
        }
      }

    } catch (error) {
      console.error('Error generating Groq response:', error)
      
      return {
        success: false,
        message: '',
        error: 'Sorry, I encountered an error while processing your request. Please try again.'
      }
    }
  }

  // Clear chat history
  clearChatHistory(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing chat history:', error)
    }
  }

  // Get daily limit info
  getDailyLimitInfo(): { count: number; limit: number; resetTime: number } {
    try {
      const stored = localStorage.getItem(this.DAILY_LIMIT_KEY)
      if (stored) {
        const limitData = JSON.parse(stored)
        const today = new Date().toDateString()
        
        if (limitData.date === today) {
          return {
            count: limitData.count,
            limit: this.DAILY_LIMIT,
            resetTime: limitData.resetTime
          }
        }
      }
      
      return { count: 0, limit: this.DAILY_LIMIT, resetTime: Date.now() + 86400000 }
    } catch (error) {
      console.error('Error getting daily limit info:', error)
      return { count: 0, limit: this.DAILY_LIMIT, resetTime: Date.now() + 86400000 }
    }
  }

  // Test Groq API connection
  async testGroqConnection(): Promise<boolean> {
    try {
      return await groqService.healthCheck()
    } catch (error) {
      console.error('Groq connection test failed:', error)
      return false
    }
  }
}

export const chatService = new ChatService()
