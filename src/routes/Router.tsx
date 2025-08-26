import React from 'react'
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Home from '../pages/Home'
import Chat from '../pages/Chat'
import NotFound from '../pages/NotFound'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ParallaxBg from '../components/ParallaxBg'

function RouterContent() {
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
            <Routes location={location}>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              
              {/* Chat Route - No longer protected */}
              <Route path="/chat" element={<Chat />} />
              
              {/* Error Routes */}
              <Route path="/404" element={<NotFound />} />
              <Route path="/not-found" element={<NotFound />} />
              
              {/* Catch All - Redirect to 404 */}
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default function Router() {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  )
}
