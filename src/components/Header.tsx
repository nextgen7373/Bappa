import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

// This component uses useLocation, so it must be rendered inside Router context
function HeaderContent() {
  const location = useLocation()
  
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-premium"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Always links to home */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="/assets/face image.jpg" 
                alt="Bappa.ai" 
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover shadow-premium" 
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Bappa.ai
              </span>
              <span className="text-xs text-gray-500 hidden sm:block">AI-powered spiritual guidance</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2 sm:gap-4">
            {/* Chat Link - Only show if not already on chat page */}
            {location.pathname !== '/chat' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link 
                  to="/chat" 
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-brand-primary font-medium hover:text-brand-dark transition-colors duration-200"
                >
                  <span className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></span>
                  Chat with Bappa
                </Link>
              </motion.div>
            )}
            
            {/* Home Link - Only show if not already on home page */}
            {location.pathname !== '/' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link 
                  to="/" 
                  className="px-4 py-2.5 text-brand-primary font-medium hover:text-brand-dark transition-colors duration-200 focus-ring rounded-lg"
                >
                  Home
                </Link>
              </motion.div>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

// Export a simple component that doesn't use Router hooks
export default function Header() {
  return <HeaderContent />
}
