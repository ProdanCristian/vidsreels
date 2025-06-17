'use client'

import React, { useState, useEffect } from 'react'
import { trackFacebookButtonClickClient } from '@/lib/facebook-tracking'
import { trackTikTokButtonClickClient } from '@/lib/tiktok-tracking'

interface StickyCTAButtonProps {
  isVisible: boolean
  onGetBundle: () => void
}

const StickyCTAButton: React.FC<StickyCTAButtonProps> = ({ isVisible, onGetBundle }) => {
  const handleGetBundleClick = () => {
    // Track client-side button click for both platforms
    trackFacebookButtonClickClient('Sticky Button', 'Get The Bundle Now')
    trackTikTokButtonClickClient('Sticky Button', 'Get The Bundle Now')
    
    // Trigger checkout (server-side tracking handled in parent component)
    onGetBundle()
  }
  const [timeLeft, setTimeLeft] = useState({
    minutes: 30,
    seconds: 0
  })

  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else {
          // Reset timer to 30 minutes when it reaches 0
          minutes = 30
          seconds = 0
        }

        return { minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isVisible])
  
  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[9999] animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-xl shadow-2xl p-3 max-w-xs mx-auto">
        {/* Price Section */}
        <div className="text-center mb-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground line-through">$69.99</span>
            <span className="text-lg font-bold text-green-500">$14.99</span>
          </div>
          <div className="text-xs text-muted-foreground">78% OFF - Limited Time</div>
        </div>

        {/* Timer Section */}
        <div className="text-center mb-2">
          <div className="inline-flex items-center gap-1.5 bg-red-50/80 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
            <span>Expires in</span>
          </div>
          <div className="mt-1 text-lg font-bold text-foreground font-mono">
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>

        {/* Main CTA Button */}
        <button
          onClick={handleGetBundleClick}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-3 px-4 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <div className="text-center">
            <div className="text-sm font-bold">Get The Bundle Now</div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default StickyCTAButton 