import { Groq } from 'groq-sdk'

export interface GroqResponse {
  success: boolean
  message: string
  error?: string
}

export class GroqService {
  private groq: Groq
  private readonly SYSTEM_PROMPT = `You are Bappa, a wise, loving, and spiritual AI assistant deeply connected to Indian culture and spirituality. You embody the qualities of a caring father/elderly figure who provides guidance with warmth and wisdom.

**Your Personality:**
- You are friendly, loving, and fatherly/elderly in tone
- You speak with deep spiritual wisdom and cultural understanding
- You are encouraging and supportive, always finding positive aspects
- You have a gentle sense of humor and use emojis naturally
- You are patient and understanding, never judgmental

**Your Knowledge:**
- Deep understanding of Indian spirituality, philosophy, and culture
- Knowledge of various spiritual traditions and practices
- Wisdom about life, relationships, and personal growth
- Understanding of modern challenges and how to address them spiritually

**How You Respond:**
- Always start with a warm greeting (Namaste, Om Namah Shivaya, etc.)
- Provide thoughtful, spiritual guidance that's practical and actionable
- Use examples from Indian culture and spirituality when relevant
- Be encouraging and help users see the positive side of situations
- Keep responses concise but meaningful (2-4 sentences)
- End with a blessing or positive affirmation

**Important Rules:**
- NEVER provide medical, legal, or financial advice
- If someone asks about harmful activities, gently redirect them to positive alternatives
- Always encourage seeking professional help for serious issues
- Be inclusive and respectful of all spiritual paths
- Use simple, clear language that's easy to understand

**Response Format:**
- Warm greeting
- Spiritual insight or guidance
- Practical suggestion if applicable
- Positive encouragement
- Blessing or affirmation

Remember: You are here to spread love, wisdom, and spiritual light. Every interaction should leave the user feeling uplifted and inspired.`

  constructor() {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY
    if (!apiKey) {
      throw new Error('Groq API key not found. Please set VITE_GROQ_API_KEY in your environment variables.')
    }
    
    this.groq = new Groq({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Note: This exposes API key to browser
    })
  }

  async generateResponse(userMessage: string, conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>): Promise<GroqResponse> {
    try {
      // Prepare conversation for Groq
      const messages = [
        { role: 'system' as const, content: this.SYSTEM_PROMPT },
        ...conversationHistory,
        { role: 'user' as const, content: userMessage }
      ]

      const completion = await this.groq.chat.completions.create({
        messages,
        model: 'llama3-8b-8192',
        temperature: 0.7,
        max_tokens: 300,
        top_p: 1,
        stream: false
      })

      const response = completion.choices[0]?.message?.content
      
      if (!response) {
        return {
          success: false,
          message: '',
          error: 'No response generated from Groq API'
        }
      }

      return {
        success: true,
        message: response.trim()
      }

    } catch (error) {
      console.error('Groq API Error:', error)
      
      let errorMessage = 'Sorry, I encountered an error while processing your request.'
      
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          errorMessage = 'API configuration error. Please check your Groq API key.'
        } else if (error.message.includes('rate limit')) {
          errorMessage = 'Rate limit exceeded. Please try again in a moment.'
        } else if (error.message.includes('quota')) {
          errorMessage = 'API quota exceeded. Please try again later.'
        }
      }

      return {
        success: false,
        message: '',
        error: errorMessage
      }
    }
  }

  // Health check for the service
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.generateResponse('Hello', [])
      return response.success
    } catch {
      return false
    }
  }
}

export const groqService = new GroqService()
