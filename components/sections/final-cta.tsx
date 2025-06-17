'use client'

import React from 'react'
import { FaFire, FaDownload, FaUsers, FaCheckCircle } from 'react-icons/fa'

const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Final Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Ready to Go Viral?</span>
            <br />
            <span className="text-foreground">Get Your Bundle Now</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join creators who transformed their social media presence with our viral reel bundle
          </p>

          {/* Key Benefits Recap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <FaCheckCircle className="w-4 h-4 text-green-400" />
              <span>15,000 Viral Reels</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <FaCheckCircle className="w-4 h-4 text-green-400" />
              <span>10 Premium Niches</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <FaCheckCircle className="w-4 h-4 text-green-400" />
              <span>Commercial License</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <FaCheckCircle className="w-4 h-4 text-green-400" />
              <span>Instant Download</span>
            </div>
          </div>

          {/* Price Display */}
          <div className="mb-8">
            <div className="inline-block bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-center gap-4">
                            <span className="text-2xl md:text-3xl font-bold text-red-400 line-through">$69.99</span>
            <span className="text-4xl md:text-5xl font-bold text-green-400">$14.99</span>
              </div>
                              <p className="text-sm text-muted-foreground mt-2">Save 78% Today Only</p>
            </div>
          </div>

          {/* Main CTA Button */}
          <div className="mb-8">
            <button className="group relative px-12 md:px-16 py-6 md:py-8 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-full font-bold text-xl md:text-2xl hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 animate-pulse-cta">
              <FaFire className="inline w-6 h-6 mr-3" />
              Download All 15,000 Reels – $14.99
              <FaDownload className="inline w-5 h-5 ml-3" />
            </button>
          </div>

          {/* Security & Trust */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4 text-green-400" />
              <span>Secure Payment</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4 text-green-400" />
              <span>30-Day Guarantee</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4 text-green-400" />
              <span>Instant Access</span>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-gradient-to-r from-secondary/20 to-secondary/10 border border-border/50 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-3">
                <FaUsers className="w-6 h-6 text-yellow-400" />
                <div>
                  <div className="text-2xl font-bold text-foreground">2,500+</div>
                  <div className="text-sm text-muted-foreground">Happy Creators</div>
                </div>
              </div>
              
              <div className="hidden sm:block w-px h-12 bg-border"></div>
              
              <div className="flex items-center gap-3">
                <FaFire className="w-6 h-6 text-red-400" />
                <div>
                  <div className="text-2xl font-bold text-foreground">50M+</div>
                  <div className="text-sm text-muted-foreground">Views Generated</div>
                </div>
              </div>
              
              <div className="hidden sm:block w-px h-12 bg-border"></div>
              
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA 