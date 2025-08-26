export type Sender = 'user' | 'bappa'
export interface Message { 
  id: string; 
  sender: Sender; 
  text: string; 
  createdAt: number 
}

export interface DailyLimitInfo {
  count: number
  limit: number
  resetTime: number
}

export interface ChatResponse {
  success: boolean
  message: string
  error?: string
}

export interface GroqResponse {
  success: boolean
  message: string
  error?: string
}
