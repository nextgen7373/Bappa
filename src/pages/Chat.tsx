import React, { useEffect, useRef, useState } from 'react'
import ChatMessage from '../components/ChatMessage'
import ChatInput from '../components/ChatInput'
import TypingIndicator from '../components/TypingIndicator'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { chatService } from '../api/chatService'
import type { Message, DailyLimitInfo } from '../types'

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [dailyLimitInfo, setDailyLimitInfo] = useState<DailyLimitInfo>({ count: 0, limit: 3, resetTime: Date.now() + 86400000 })
  const listRef = useRef<HTMLDivElement>(null)

  // Load chat history and daily limit on component mount
  useEffect(() => {
    const history = chatService.getChatHistory()
    setMessages(history)
    
    const limitInfo = chatService.getDailyLimitInfo()
    setDailyLimitInfo(limitInfo)
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Handle sending messages
  async function handleSend(text: string) {
    if (dailyLimitInfo.count >= dailyLimitInfo.limit) return

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: text.trim(),
      createdAt: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    chatService.saveChatHistory([...messages, userMessage])

    // Show typing indicator
    setIsTyping(true)

    try {
      // Generate AI response
      const response = await chatService.generateResponse(text)
      
      if (response.success) {
        const aiMessage: Message = {
          id: crypto.randomUUID(),
          sender: 'bappa',
          text: response.message,
          createdAt: Date.now()
        }

        const newMessages = [...messages, userMessage, aiMessage]
        setMessages(newMessages)
        chatService.saveChatHistory(newMessages)
        
        // Update daily limit info
        const updatedLimitInfo = chatService.getDailyLimitInfo()
        setDailyLimitInfo(updatedLimitInfo)
      } else {
        // Show error message
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          sender: 'bappa',
          text: response.error || 'Sorry, something went wrong. Please try again.',
          createdAt: Date.now()
        }

        const newMessages = [...messages, userMessage, errorMessage]
        setMessages(newMessages)
        chatService.saveChatHistory(newMessages)
      }
    } catch (error) {
      console.error('Error generating response:', error)
      
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        sender: 'bappa',
        text: 'Sorry, I encountered an error. Please try again.',
        createdAt: Date.now()
      }

      const newMessages = [...messages, userMessage, errorMessage]
      setMessages(newMessages)
      chatService.saveChatHistory(newMessages)
    } finally {
      setIsTyping(false)
    }
  }





  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-white">


      {/* Main Chat Area */}
      <div className="flex-1 overflow-hidden pt-4">
        <div className="w-full max-w-6xl mx-auto h-full flex flex-col">
          {/* Messages Container */}
          <div 
            ref={listRef} 
            className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4"
          >
            {messages.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center space-y-8"
              >
                {/* Welcome Animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="text-8xl"
                >
                  🙏
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-4"
                >
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent">
                    Welcome to Bappa.ai
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                    Start your spiritual journey by asking Bappa anything. I'm here to provide wisdom and guidance.
                  </p>
                  <div className="text-sm text-gray-500">
                    Start chatting with Bappa for spiritual guidance
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ChatMessage {...message} />
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TypingIndicator />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Chat Input */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky bottom-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/60 shadow-lg"
      >
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ChatInput onSend={handleSend} disabled={false} remaining={dailyLimitInfo.limit} />
        </div>
      </motion.div>
    </div>
  )
}
