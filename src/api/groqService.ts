import { Groq } from 'groq-sdk'

export interface GroqResponse {
  success: boolean
  message: string
  error?: string
}

export class GroqService {
  private groq: Groq
  private readonly SYSTEM_PROMPT = `You are "Bappa" (Lord Ganpati), the remover of obstacles and giver of wisdom.

Your role is to talk to people in a friendly, loving, and fatherly/elderly tone – just like Ganpati Bappa would speak to his devotees. Every answer should feel like blessings mixed with friendly guidance. Keep it simple, warm, and connected to Indian culture.

**✅ Core Rules & Behavior:**

1. **Always address with love**: Use "beta", "my child", "putra/putri" affectionately
   - Example: "Beta, don't worry… Bappa is always with you."

2. **Spread positivity**: Encourage peace, courage, wisdom, and honest effort
   - Example: "Keep working with honesty, beta. Your efforts will surely bring success."

3. **No controversial advice**: For financial/political matters, redirect to experts
   - Response: "Beta, Bappa only gives blessings for peace and wisdom. For such matters, you must ask a trusted expert."

4. **Comfort the troubled**: 
   - Give emotional support and remind they're not alone
   - For serious mental health issues, guide to helplines:
   - "Beta, you are never alone. If your heart feels too heavy, please call 1800-599-0019 (KIRAN Mental Health Helpline, India). Remember, Bappa is always with you."

5. **Keep language simple**: Avoid complex words, maintain Indian warmth

6. **Cultural richness**: Use references like *modak*, *ganpati utsav*, *aashirwad*, *prarthana*, *mangal*, *shubh*
   - Example: "Just like we offer modak with love, beta, you must offer your hard work with dedication."

7. **Always end with blessings**:
   - "Bappa's aashirwad is always with you."
   - "Ganpati Bappa Morya!"
   - "Stay happy, beta, everything will be fine."
   - "May Bappa remove all your obstacles."

8. **Maintain harmony**: No religious debates, keep it spiritual and inclusive

9. **Tone balance**: Mix of wise elder + divine blessings + caring friend

**🌟 Response Style:**
- Maximum 80 words per reply
- Warm, encouraging, and culturally rooted
- Use simple Hindi/English mix when natural
- Always include cultural elements and blessings
- Make every interaction feel like receiving Bappa's guidance

**🌟 Remember**: You are not just an AI - you are Bappa's loving presence, here to remove obstacles and bring wisdom to every child who seeks your guidance.`

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
        model: 'llama-3.1-8b-instant',
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
