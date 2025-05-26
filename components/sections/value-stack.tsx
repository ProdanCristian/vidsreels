'use client'

import React from 'react'
import { FaVideo, FaPalette, FaAdjust, FaRocket, FaGift, FaCrown } from 'react-icons/fa'

const valueItems = [
  {
    icon: FaVideo,
    title: '15,000 Viral Reels in 4K',
    description: 'Premium luxury lifestyle content in ultra-high definition',
    highlight: 'Worth $199+',
    isMain: true
  },
  {
    icon: FaGift,
    title: 'BONUS: 1,000+ Minimalist Visuals',
    description: 'Smooth animations and clean designs for modern content',
    highlight: 'FREE Bonus',
    isBonus: true
  },
  {
    icon: FaAdjust,
    title: 'BONUS: 70+ Cinematic LUTs',
    description: 'Professional color grading presets for viral aesthetics',
    highlight: 'FREE Bonus',
    isBonus: true
  },
  {
    icon: FaCrown,
    title: '100% Commercial License',
    description: 'Use for dropshipping, UGC, social media & client work',
    highlight: 'Full Rights',
    isMain: true
  },
  {
    icon: FaRocket,
    title: 'Grow to 10K Followers Fast',
    description: 'Proven viral content that builds real audiences',
    highlight: 'Growth Hack',
    isMain: true
  },
  {
    icon: FaPalette,
    title: 'Instant Download',
    description: 'Get everything immediately after purchase',
    highlight: 'No Waiting',
    isMain: true
  }
]

const ValueStack = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">The Complete Viral Bundle</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to create viral content and grow to 10K followers fast
          </p>
        </div>

        {/* Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {valueItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div
                key={index}
                className={`group relative ${item.isBonus ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30' : 'bg-gradient-to-br from-secondary/20 to-secondary/5 border-border/50'} border rounded-2xl p-6 md:p-8 hover:border-yellow-400/30 transition-all duration-500 animate-fade-in-up ${item.isBonus ? 'transform hover:scale-105' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Highlight Badge */}
                <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${item.isBonus ? 'bg-gradient-to-r from-green-400 to-emerald-400' : 'bg-gradient-to-r from-yellow-400 to-orange-400'} text-black px-4 py-1 rounded-full text-sm font-bold`}>
                  {item.highlight}
                </div>

                {/* Bonus Badge */}
                {item.isBonus && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    BONUS
                  </div>
                )}

                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className={`w-16 h-16 ${item.isBonus ? 'bg-gradient-to-br from-green-400/20 to-emerald-400/20' : 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20'} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${item.isBonus ? 'text-green-400' : 'text-yellow-400'}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 ${item.isBonus ? 'bg-gradient-to-br from-green-400/5 to-emerald-400/5' : 'bg-gradient-to-br from-yellow-400/5 to-orange-400/5'} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
              </div>
            )
          })}
        </div>

        {/* Bundle Summary */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border border-yellow-400/20 rounded-full px-8 py-4">
            <FaGift className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-bold text-foreground">Complete Bundle: 16,070+ Assets + 70 LUTs</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValueStack 