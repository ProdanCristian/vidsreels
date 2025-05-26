'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { FaAdjust, FaFilm, FaEye } from 'react-icons/fa'
import { SiAdobepremierepro, SiAdobeaftereffects, SiDavinciresolve, SiApple } from 'react-icons/si'
import { TbCut } from 'react-icons/tb'

const luts = [
  {
    id: 1,
    name: '3Strip',
    description: 'Classic cinema look with rich contrast and vintage appeal',
    poster: '/luts/3Strip-poster.jpg',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 2,
    name: 'Punch',
    description: 'High-impact colors with dramatic saturation boost',
    poster: '/luts/Punch-poster.jpg',
    color: 'from-red-400 to-pink-500'
  },
  {
    id: 3,
    name: 'Hannibal',
    description: 'Dark, moody atmosphere with cinematic shadows',
    poster: '/luts/Hannibal-poster.jpg',
    color: 'from-gray-400 to-slate-600'
  },
  {
    id: 4,
    name: 'Glacier',
    description: 'Cool, crisp tones with icy blue undertones',
    poster: '/luts/Glacier-poster.jpg',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    id: 5,
    name: 'Duotone',
    description: 'Stylized two-tone effect for modern aesthetics',
    poster: '/luts/Duotone-poster.jpg',
    color: 'from-purple-400 to-indigo-500'
  },
  {
    id: 6,
    name: 'Drive',
    description: 'Neon-soaked retro vibes with synthwave appeal',
    poster: '/luts/Drive-poster.jpg',
    color: 'from-pink-400 to-purple-500'
  }
]

const LutsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      // Calculate which LUT should be active based on scroll position
      const scrollProgress = Math.max(0, Math.min(1, 
        (scrollY - sectionTop + windowHeight * 0.5) / (sectionHeight - windowHeight * 0.5)
      ))
      
      const newActiveIndex = Math.min(
        luts.length - 1,
        Math.floor(scrollProgress * luts.length)
      )

      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeIndex])

  return (
    <section ref={sectionRef} className="py-8 md:py-16 lg:py-24 bg-gradient-to-b from-background to-purple-500/5 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 md:px-6 py-2 md:py-3 mb-4 md:mb-6">
            <FaAdjust className="w-4 md:w-5 h-4 md:h-5 text-purple-400" />
            <span className="text-sm md:text-lg font-bold text-purple-400">70+ CINEMATIC LUTS</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
            <span className="gradient-text">See the power</span>
            <br />
            <span className="text-foreground">cinematic LUTs in action</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">Each preset instantly transforms your footage into viral-worthy content.
          </p>
        </div>

        {/* Stacked LUTs Layout */}
        <div className="relative max-w-2xl mx-auto">
          {/* Progress Indicator - Hidden on mobile */}
          {!isMobile && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary/30 rounded-full z-10">
              <div 
                className="w-full bg-gradient-to-b from-purple-400 to-pink-400 rounded-full transition-all duration-500"
                style={{ height: `${((activeIndex + 1) / luts.length) * 100}%` }}
              />
            </div>
          )}

          {/* LUT Stack */}
          <div className={`relative ${isMobile ? 'ml-0' : 'ml-8'}`}>
            {luts.map((lut, index) => {
              const isActive = index === activeIndex
              const isPassed = index < activeIndex
              const isFuture = index > activeIndex

              return (
                <div
                  key={lut.id}
                  className={`relative ${isMobile ? 'mb-8' : 'mb-16'} transition-all duration-700 ${
                    isActive 
                      ? 'opacity-100 scale-100 z-20' 
                      : isPassed 
                        ? 'opacity-40 scale-95 -translate-y-8' 
                        : 'opacity-20 scale-90 translate-y-8'
                  }`}
                  style={{
                    transform: isMobile 
                      ? `scale(${isActive ? 1 : 0.95})` 
                      : `translateY(${isFuture ? (index - activeIndex) * 50 : isPassed ? -50 : 0}px) scale(${isActive ? 1 : 0.95})`
                  }}
                >
                  {/* LUT Card */}
                  <div className={`group relative bg-gradient-to-br from-secondary/20 to-secondary/5 border ${isActive ? 'border-purple-400/50' : 'border-border/30'} rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 transition-all duration-500`}>
                    {/* LUT Info */}
                    <div className={`flex items-center gap-3 md:gap-4 mb-4 md:mb-6 ${isMobile ? 'flex-col sm:flex-row text-center sm:text-left' : ''}`}>
                      <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-gradient-to-r ${lut.color} rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <FaFilm className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-bold text-foreground`}>{lut.name} LUT</h3>
                        <p className={`text-muted-foreground ${isMobile ? 'text-sm' : 'text-base'} ${isMobile ? 'line-clamp-2' : ''}`}>{lut.description}</p>
                      </div>
                      <div className={`${isMobile ? 'order-first sm:order-last' : 'ml-auto'}`}>
                        <div className={`px-3 md:px-4 py-1 md:py-2 bg-gradient-to-r ${lut.color} rounded-full text-white text-xs md:text-sm font-bold`}>
                          #{index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Image Container */}
                    <div className="relative aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden bg-black">
                      <Image
                        src={lut.poster}
                        alt={`${lut.name} LUT Preview`}
                        fill
                        className="object-cover"
                      />
                      
                      {/* LUT Name Overlay */}
                      <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4">
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 md:px-4 py-2">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-semibold text-sm md:text-base">{lut.name} Applied</span>
                            <div className="flex items-center gap-2 text-white/80 text-xs md:text-sm">
                              <FaEye className="w-3 h-3 md:w-4 md:h-4" />
                              <span className="hidden sm:inline">Preview</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Active Indicator - Hidden on mobile */}
                    {isActive && !isMobile && (
                      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                        <div className={`w-8 h-8 bg-gradient-to-r ${lut.color} rounded-full flex items-center justify-center animate-pulse`}>
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                      </div>
                    )}

                    {/* Mobile Active Indicator */}
                    {isActive && isMobile && (
                      <div className="absolute -top-2 -right-2">
                        <div className={`w-6 h-6 bg-gradient-to-r ${lut.color} rounded-full flex items-center justify-center animate-pulse`}>
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Dots */}
          <div className={`flex justify-center gap-2 md:gap-3 ${isMobile ? 'mt-6' : 'mt-12'}`}>
            {luts.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'} rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-purple-400 scale-125' 
                    : index < activeIndex 
                      ? 'bg-purple-400/50' 
                      : 'bg-secondary'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`${isMobile ? 'mt-8' : 'mt-16'} text-center px-4`}>
          <div className="inline-flex items-center gap-3 md:gap-4 bg-gradient-to-r from-purple-400/10 to-pink-400/10 border border-purple-400/20 rounded-full px-4 md:px-8 py-3 md:py-4">
            <FaAdjust className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-purple-400`} />
            <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-foreground`}>70+ Professional LUTs Included</span>
          </div>
          
          {/* Compatible Software Icons */}
          <div className={`${isMobile ? 'mt-6' : 'mt-8'} flex flex-col items-center`}>
            <p className={`text-muted-foreground ${isMobile ? 'text-sm' : 'text-base'} mb-4 md:mb-6`}>
              Compatible with all major video editing software:
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              {/* DaVinci Resolve */}
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <SiDavinciresolve className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <span className="text-xs md:text-sm font-medium text-muted-foreground">DaVinci Resolve</span>
              </div>

              {/* Premiere Pro */}
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <SiAdobepremierepro className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <span className="text-xs md:text-sm font-medium text-muted-foreground">Premiere Pro</span>
              </div>

              {/* Final Cut Pro */}
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <SiApple className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <span className="text-xs md:text-sm font-medium text-muted-foreground">Final Cut Pro</span>
              </div>

              {/* CapCut */}
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <TbCut className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <span className="text-xs md:text-sm font-medium text-muted-foreground">CapCut</span>
              </div>

              {/* After Effects */}
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <SiAdobeaftereffects className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <span className="text-xs md:text-sm font-medium text-muted-foreground">After Effects</span>
              </div>

              {/* Filmora */}
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <FaFilm className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <span className="text-xs md:text-sm font-medium text-muted-foreground">Filmora</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LutsShowcase
