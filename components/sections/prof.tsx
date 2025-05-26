'use client'

import React from 'react'
import Image from 'next/image'
import Logo from '../../app/logo'

const ResultsSection = () => {
  const results = [
    {
      id: 1,
      url: '/results/Prof 1.webp'
    },
    {
      id: 2,
      url: '/results/Prof 2.webp'
    },
    {
      id: 3,
      url: '/results/Prof 3.webp'
    },
  {
    id: 4,
    url: '/results/Prof 4.webp'
  },
    {
      id: 5,
      url: '/results/Prof 5.webp'
    }

  ]

  



  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Results Speak for Themselves</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real creators, real results. See how our viral reels are generating millions of views 
            and building massive followings across all platforms.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {results.map((result, index) => (
            <div
              key={result.id}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <Image src={result.url} alt={result.url} width={500} height={500} className='w-full h-full object-cover' />

              {/* Logo Overlay - Full Coverage Pattern */}
              <div className="absolute inset-0 z-10 opacity-50 pointer-events-none overflow-hidden">
                <div className="grid grid-cols-3 grid-rows-4 gap-2 h-full w-full p-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="scale-[0.15] flex items-center justify-center">
                      <Logo />
                    </div>
                  ))}
                </div>
              </div>

              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
            </div>
          ))}
        </div>      

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full text-green-400 font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>These results are from our actual customers</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResultsSection
