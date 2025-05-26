'use client'

import React from 'react'
import { FaBolt, FaChartLine, FaDollarSign } from 'react-icons/fa'

const benefits = [
  {
    icon: FaChartLine,
    title: 'Grow to 10K Followers Fast',
    description: 'Proven viral 4K content + professional LUTs that build real audiences and engagement.',
    highlight: 'Growth Hack'
  },
  {
    icon: FaBolt,
    title: 'Create Content in Minutes',
    description: 'Skip the creation grind. 16,000+ ready-to-post assets with smooth animations.',
    highlight: 'Time Saver'
  },
  {
    icon: FaDollarSign,
    title: 'Monetize Immediately',
    description: 'Full commercial rights for dropshipping, UGC, client work, and personal brands.',
    highlight: 'Money Maker'
  }
]

const Benefits = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Why Creators Use This Bundle</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of successful creators who transformed their social media presence
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <div
                key={index}
                className="group text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Icon Container */}
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    {/* Highlight Badge */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-1 rounded-full text-xs font-bold z-10">
                      {benefit.highlight}
                    </div>
                    
                    {/* Icon Background */}
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-yellow-400/30">
                      <IconComponent className="w-10 h-10 text-yellow-400" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  {benefit.description}
                </p>

                {/* Animated Underline */}
                <div className="mt-6 w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Benefits 