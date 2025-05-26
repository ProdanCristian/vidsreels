'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'
import { Flame, X } from 'lucide-react'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const shouldShow = scrollY > window.innerHeight && !isDismissed
      setIsVisible(shouldShow)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-4 shadow-2xl border border-red-500/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white">
                <p className="font-bold text-lg">🔥 Limited Time!</p>
                <p className="text-red-100 text-sm">15,000 Reels for $29</p>
              </div>
              <button
                onClick={handleDismiss}
                className="text-red-200 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <Button
              className="w-full bg-black hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-xl shadow-lg"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Flame className="mr-2 h-5 w-5" />
              Get Bundle Now
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 