import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function ChatInput({ onSend, disabled, remaining }: { onSend: (t:string)=>void; disabled: boolean; remaining: number }) {
  const [val, setVal] = useState('')
  const canSend = !disabled && val.trim().length > 0
  
  return (
    <div className="w-full space-y-4">
      {/* Main Input Area */}
      <div className="flex items-end gap-4">
        {/* Input Field */}
        <div className="flex-1 relative">
          <motion.input
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Type your message"
            className="w-full rounded-2xl border-2 border-gray-200 bg-white px-5 py-4 pr-20 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 transition-all duration-300 text-base resize-none shadow-sm"
            placeholder={remaining > 0 ? 'Ask Bappa for spiritual guidance...' : 'Daily limit reached (5/5)'}
            value={val}
            onChange={e => setVal(e.target.value)}
            onKeyDown={e => { 
              if(e.key === 'Enter' && !e.shiftKey && canSend){ 
                e.preventDefault()
                onSend(val); 
                setVal('') 
              } 
            }}
            disabled={!canSend && remaining <= 0}
          />
          
          {/* Character Count */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
            {val.length}/500
          </div>
        </div>
        
        {/* Send Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!canSend}
          onClick={() => { onSend(val); setVal('') }}
          className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-primary/20 ${
            canSend 
              ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg hover:shadow-xl hover:shadow-brand-primary/25' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>Send</span>
            {canSend && (
              <motion.svg
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </motion.svg>
            )}
          </div>
        </motion.button>
      </div>
      
      {/* Enhanced Help Text */}
      <div className="text-center">
        {remaining > 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 rounded-full"
          >
            <span className="text-brand-primary text-lg">💡</span>
            <span className="text-sm font-medium text-brand-primary">
              You have {remaining} message{remaining > 1 ? 's' : ''} remaining today
            </span>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full"
          >
            <span className="text-red-500 text-lg">⏰</span>
            <span className="text-sm font-medium text-red-600">
              Daily limit reached. Come back tomorrow for more wisdom!
            </span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
