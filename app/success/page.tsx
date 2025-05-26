'use client'

import React, { useEffect, useState } from 'react'
import { CheckCircle, Download, Play, Palette, Film } from 'lucide-react'


export default function SuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get session ID from URL on client side
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const id = urlParams.get('session_id')
      setSessionId(id)
    }
    
    // Shorter loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Processing your order...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">  
      {/* Success Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-12">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-14 h-14 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Payment Successful! 🎉
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Welcome to the VidsReels family!
            </p>
            {sessionId && (
              <p className="text-sm text-muted-foreground">
                Order ID: <span className="text-foreground">{sessionId.slice(-8).toUpperCase()}</span>
              </p>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-12">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg text-muted-foreground">Total Paid:</span>
              <span className="text-3xl font-bold text-green-600">$29.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-muted-foreground">You Saved:</span>
              <span className="text-2xl font-bold text-red-500">$258.00 (90% OFF)</span>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Download Your Bundle</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 15,000 Reels */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                <div className="mb-4">
                  <Film className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-foreground mb-2">15,000 Viral Reels</h3>
                  <p className="text-sm text-muted-foreground mb-4">Premium 4K luxury lifestyle content</p>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105">
                  <Download className="w-5 h-5 inline mr-2" />
                  Download Reels
                </button>
              </div>

              {/* 1,000 Minimal Animations */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-6">
                <div className="mb-4">
                  <Play className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-foreground mb-2">1,000 Animations</h3>
                  <p className="text-sm text-muted-foreground mb-4">Minimal motion graphics & transitions</p>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105">
                  <Download className="w-5 h-5 inline mr-2" />
                  Download Animations
                </button>
              </div>

              {/* 70 LUTs */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-6">
                <div className="mb-4">
                  <Palette className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-foreground mb-2">70 Premium LUTs</h3>
                  <p className="text-sm text-muted-foreground mb-4">Professional color grading presets</p>
                </div>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105">
                  <Download className="w-5 h-5 inline mr-2" />
                  Download LUTs
                </button>
              </div>
            </div>
          </div>

          {/* Download All Button */}
          <div className="mb-12">
            <p className="text-sm text-muted-foreground mt-3">
              All files also sent to your email address
            </p>
          </div>

          {/* Support */}
          <div className="text-center">
            <p className="text-muted-foreground mb-2">
              Need help? Contact our support team:
            </p>
            <a 
              href="mailto:support@vidsreels.com" 
              className="text-primary hover:underline font-medium text-lg"
            >
              support@vidsreels.com
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 VidsReels. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
} 