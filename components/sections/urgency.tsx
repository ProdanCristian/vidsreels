'use client'

import React from 'react'
import { FaFire, FaClock } from 'react-icons/fa'

const Urgency = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 border-y border-red-500/20">
      <div className="container mx-auto px-4">
        {/* Urgency Banner */}
        <div className="text-center">
          {/* Fire Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <FaFire className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Main Message */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            <span className="text-red-400">🔥 This deal is live for a</span>
            <br />
            <span className="gradient-text">limited time only.</span>
            <br />
            <span className="text-foreground">Don&apos;t miss it.</span>
          </h2>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join creators who already transformed their social media presence. 
            This exclusive bundle won&apos;t be available forever.
          </p>

          {/* Countdown Timer Effect */}
          <div className="mb-8 flex justify-center">
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-4 md:p-6">
              <div className="flex items-center gap-3 text-red-400">
                <FaClock className="w-5 h-5" />
                <span className="font-semibold">Limited Time Offer</span>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="px-10 md:px-12 py-5 md:py-6 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full font-bold text-xl md:text-2xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-2xl hover:shadow-3xl animate-pulse-cta transform hover:scale-105">
            Get the Bundle Now – $14.99
          </button>

          {/* Urgency Points */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span>No recurring fees</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span>Instant download</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span>Lifetime access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Urgency 