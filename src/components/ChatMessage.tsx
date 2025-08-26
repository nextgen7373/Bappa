import React from 'react'
import { motion } from 'framer-motion'
import type { Message } from '../types'

export default function ChatMessage({ text, sender }: Message) {
  const isUser = sender === 'user'
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 25,
        duration: 0.5
      }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} group mb-6`}
    >
      <div className={`max-w-[85%] sm:max-w-[70%] lg:max-w-[60%] relative ${isUser ? 'ml-auto' : 'mr-auto'}`}>
        {/* Message Bubble */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`relative rounded-3xl px-5 py-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
            isUser 
              ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white ml-auto' 
              : 'bg-white border border-gray-200/60 text-gray-800 shadow-sm'
          }`}
          role="article"
        >
          {/* Message Text */}
          <div className="text-sm sm:text-base leading-relaxed font-medium">
            {text}
          </div>
          
          {/* Message Tail */}
          <div className={`absolute top-0 w-4 h-4 ${
            isUser 
              ? 'right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 bg-brand-secondary' 
              : 'left-0 transform -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white border-l border-b border-gray-200/60'
          }`} />
        </motion.div>
        
        {/* Timestamp - Fixed Alignment */}
        <div className={`mt-2 text-xs text-gray-400 font-medium ${
          isUser ? 'text-right' : 'text-left'
        }`}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        
        {/* Avatar and Name - Fixed Alignment */}
        <div className={`flex items-center gap-3 mt-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          {!isUser && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-10 h-10 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center shadow-lg border-2 border-white"
            >
              <span className="text-white font-bold text-sm">B</span>
            </motion.div>
          )}
          
          <span className={`text-sm font-semibold ${isUser ? 'text-gray-600' : 'text-gray-700'}`}>
            {isUser ? 'You' : 'Bappa'}
          </span>
          
          {isUser && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
            >
              <span className="text-white font-bold text-sm">U</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
