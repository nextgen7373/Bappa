import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Router from './routes/Router'
import Header from './components/Header'
import Footer from './components/Footer'
import ParallaxBg from './components/ParallaxBg'
import ErrorBoundary from './components/ErrorBoundary'

function AppContent() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-accent-cream to-accent-warm relative">
      <ParallaxBg />
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="h-full"
          >
            <Router />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  )
}
