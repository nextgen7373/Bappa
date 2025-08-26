import React from 'react'
import { motion } from 'framer-motion'

export default function TypingIndicator() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex justify-start mb-6"
    >
      <div className="max-w-[85%] sm:max-w-[70%] lg:max-w-[60%] relative">
        {/* Message Bubble */}
        <div className="relative rounded-3xl px-5 py-4 bg-white border border-gray-200/60 text-gray-800 shadow-sm">
          {/* Typing Text */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium text-gray-600">Bappa is typing</span>
            <div className="flex items-center gap-1">
              {/* Animated dots */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                className="w-2 h-2 bg-brand-primary rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 bg-brand-primary rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 bg-brand-primary rounded-full"
              />
            </div>
          </div>
          
          {/* Message Tail */}
          <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white border-l border-b border-gray-200/60" />
        </div>
        
        {/* Avatar and Name - Consistent with ChatMessage */}
        <div className="flex items-center gap-3 mt-2">
          <div className="w-10 h-10 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="text-sm font-semibold text-gray-700">Bappa</span>
        </div>
      </div>
    </motion.div>
  )
}
