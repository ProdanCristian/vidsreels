'use client'

import React from 'react'
import { FaShieldAlt, FaCheckCircle, FaClock, FaHeart } from 'react-icons/fa'

const Guarantee = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        {/* Main Guarantee Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl p-8 md:p-12 text-center">
            {/* Shield Icon */}
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                <FaShieldAlt className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Main Guarantee Text */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground">
              <span className="text-green-400">30-Day</span> Money-Back
              <br />
              <span className="gradient-text">Guarantee</span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              We&apos;re so confident you&apos;ll love these viral reels that we offer a 
              <span className="font-semibold text-foreground"> no-questions-asked 30-day guarantee</span>. 
              If you&apos;re not completely satisfied, get your money back instantly.
            </p>

            {/* Guarantee Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-8">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-foreground mb-1">No Questions Asked</h3>
                  <p className="text-sm text-muted-foreground">Simple refund process</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <FaClock className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-foreground mb-1">Full 30 Days</h3>
                  <p className="text-sm text-muted-foreground">Plenty of time to test</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <FaHeart className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-foreground mb-1">Keep Everything</h3>
                  <p className="text-sm text-muted-foreground">Even if you refund</p>
                </div>
              </div>
            </div>

            {/* Trust Statement */}
            <div className="bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-green-500/10 rounded-2xl p-6 mb-8">
              <p className="text-foreground font-medium">
                &ldquo;We&apos;ve helped creators go viral. We stand behind our content 100%.&rdquo;
              </p>
              <p className="text-sm text-muted-foreground mt-2">- VidsReels Team</p>
            </div>

            {/* CTA Button */}
            <button className="px-10 md:px-12 py-5 md:py-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-full font-bold text-xl md:text-2xl hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Get Your Risk-Free Bundle – <span className="line-through">$287</span> $29
            </button>

            {/* Security Badge */}
            <div className="mt-6 flex justify-center items-center gap-2 text-sm text-muted-foreground">
              <FaShieldAlt className="w-4 h-4 text-green-400" />
              <span>Secure Payment • SSL Encrypted • Instant Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guarantee 