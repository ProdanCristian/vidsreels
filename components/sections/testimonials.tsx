'use client'

import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { FaQuoteLeft } from 'react-icons/fa'

const testimonials = [
  {
    quote: "Got 1m views on my first reel using this! The luxury car content is absolutely insane.",
    author: "@Valuance",
    avatar: "/avatars/valuance.jpg",
    verified: true,
    stats: "26m views • 199k followers"
  },
  {
    quote: "This bundle saved me months of content creation. The watch and lifestyle reels are pure gold. Already made back 10x my investment through brand deals.",
    author: "@beingbilionaire",
    avatar: "/avatars/beingbilionaire.jpg", 
    verified: true,
    stats: "30m+ views • $100k earned"
  },
  {
    quote: "Finally found viral content that actually works! The yacht and vacation reels got me noticed by major brands. Best $14.99 I ever spent.",
    author: "@the.10.millionaire/",
    avatar: "/avatars/the10millionaire.jpg",
    verified: true,
    stats: "100m+ views • Brand partnerships"
  }
]

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">This Made Me Go Viral</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from creators who transformed their social media presence
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-secondary/20 to-secondary/5 border border-border/50 rounded-2xl p-6 md:p-8 hover:border-yellow-400/30 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                  <FaQuoteLeft className="w-4 h-4 text-black" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex justify-center mb-4 mt-2">
                {[...Array(5)].map((_, i) => (
                  <AiFillStar key={i} className="w-5 h-5 text-green-500" />
                ))}
              </div>

              {/* Quote */}
                             <blockquote className="text-foreground text-center mb-6 leading-relaxed italic">
                 &ldquo;{testimonial.quote}&rdquo;
               </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-center gap-4">
                {/* Avatar */}
                {testimonial.avatar.startsWith('/') ? (
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center font-bold text-black">
                    {testimonial.avatar}
                  </div>
                )}
                
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{testimonial.author}</span>
                    {testimonial.verified && (
                      <div className="w-4 h-4 bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{testimonial.stats}</div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Testimonials 