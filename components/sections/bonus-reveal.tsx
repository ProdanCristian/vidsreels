'use client'

import React from 'react'
import { FaGift, FaVideo, FaArrowRight, FaPlus } from 'react-icons/fa'
import LutsShowcase from './luts'
import MinimalistAnimations from './minimalist'

// Import bonus components (to be created)
// import MinimalistVisualsBonus from './bonuses/minimalist-visuals'
// import CinematicLutsBonus from './bonuses/cinematic-luts'
// import MoreBonusComponents from './bonuses/...'

const BonusReveal = () => {
  // Define all bonus items for the value stack
  const bonusItems = [
    { name: '15,000 4K Viral Reels', description: 'Premium luxury lifestyle content', value: 199, isMain: true },
    { name: '1,000+ Minimalist Visuals', description: 'Smooth animations and modern designs', value: 49 },
    { name: '70+ Cinematic LUTs', description: 'Professional color grading presets', value: 39 },
    // Add more bonus items here as you create them
    // { name: 'Bonus 3 Name', description: 'Description', value: 29 },
    // { name: 'Bonus 4 Name', description: 'Description', value: 19 },
  ]

  const totalValue = bonusItems.reduce((sum, item) => sum + item.value, 0)
  const finalPrice = 29
  const discountPercentage = Math.round(((totalValue - finalPrice) / totalValue) * 100)

  return (
    <section id="bonus-reveal" className="py-16 md:py-24 bg-gradient-to-b from-background to-green-500/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-full px-6 py-3 mb-6 animate-pulse">
            <FaGift className="w-5 h-5 text-red-400" />
            <span className="text-lg font-bold text-red-400">EXCLUSIVE BONUSES</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">But Wait, There&apos;s More!</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            When you get the 15,000 4K viral reels today, you also get these incredible bonuses absolutely FREE
          </p>
        </div>

        {/* Main Bundle */}
        <div className="mb-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border border-yellow-400/20 rounded-2xl px-6 sm:px-8 py-6 max-w-2xl mx-auto">
            <FaVideo className="w-8 h-8 text-yellow-400 flex-shrink-0" />
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">15,000 4K Viral Reels</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Premium luxury lifestyle content</p>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-xl sm:text-2xl font-bold text-yellow-400">${bonusItems[0].value} Value</div>
            </div>
          </div>
        </div>

        {/* Plus Sign */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full text-black text-2xl sm:text-3xl font-bold">
            <FaPlus />
          </div>
        </div>

        {/* Bonus Components Section */}
        <div className="space-y-16 mb-16">
          <LutsShowcase />
          <MinimalistAnimations /> 
        </div>

        {/* Value Stack Section */}
        <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-border rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Complete Value Breakdown</span>
            </h3>
            <p className="text-muted-foreground text-lg">
              Here&apos;s everything you get in this incredible bundle
            </p>
          </div>

          {/* Value Stack Items */}
          <div className="space-y-4 mb-8 max-w-3xl mx-auto">
            {bonusItems.map((item, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                  item.isMain 
                    ? 'bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border-yellow-400/30' 
                    : 'bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-green-500/20'
                }`}
              >
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-lg">{item.name}</h4>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                <div className="text-right ml-4">
                  <div className={`text-xl font-bold ${item.isMain ? 'text-yellow-400' : 'text-green-400'}`}>
                    ${item.value}
                  </div>
                  <div className="text-xs text-muted-foreground">Value</div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Value Calculation */}
          <div className="border-t border-border pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-lg text-muted-foreground mb-1">Total Bundle Value</div>
                <div className="text-3xl sm:text-4xl font-bold text-red-400 line-through">${totalValue}</div>
              </div>
              
              <div className="hidden sm:block">
                <FaArrowRight className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="block sm:hidden">
                <div className="w-6 h-6 flex items-center justify-center text-muted-foreground text-2xl">↓</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg text-muted-foreground mb-1">Your Price Today</div>
                <div className="text-4xl sm:text-5xl font-bold text-yellow-400">${finalPrice}</div>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-xl text-muted-foreground">
                That&apos;s a <span className="font-bold text-green-400">{discountPercentage}% discount</span> - but only for a limited time!
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-semibold text-sm">Limited Time Offer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BonusReveal 