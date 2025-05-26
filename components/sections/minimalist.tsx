'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { FaPlay, FaEdit, FaDownload } from 'react-icons/fa'

const MinimalistAnimations = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [videosLoaded, setVideosLoaded] = useState(false)

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const sectionHeight = rect.height

    // Check if section is visible
    if (rect.top < windowHeight && rect.bottom > 0) {
      setIsVisible(true)
      
      // Calculate scroll progress within the section
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + sectionHeight)))
      setScrollProgress(progress)
    } else {
      setIsVisible(false)
    }
  }, [])

  useEffect(() => {
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', throttledScroll)
  }, [handleScroll])

  // Intersection Observer for lazy loading videos
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !videosLoaded) {
            setVideosLoaded(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2, rootMargin: '50px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [videosLoaded])

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Optimized Background Lines - Reduced count */}
      <div className="absolute inset-0">
        {/* Horizontal Lines */}
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              top: `${(i + 1) * 16.66}%`,
              left: 0,
              right: 0,
              transform: `scaleX(${isVisible ? scrollProgress : 0})`,
              transition: 'transform 0.8s ease-out',
              transitionDelay: `${i * 0.1}s`
            }}
          />
        ))}

        {/* Vertical Lines */}
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
            style={{
              left: `${(i + 1) * 20}%`,
              top: 0,
              bottom: 0,
              transform: `scaleY(${isVisible ? scrollProgress : 0})`,
              transition: 'transform 0.8s ease-out',
              transitionDelay: `${i * 0.15}s`
            }}
          />
        ))}

        {/* Animated Dots - Reduced count */}
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${15 + (i % 4) * 20}%`,
              top: `${25 + Math.floor(i / 4) * 30}%`,
              opacity: isVisible ? scrollProgress : 0,
              transform: `scale(${isVisible ? scrollProgress : 0})`,
              transition: 'all 0.6s ease-out',
              transitionDelay: `${0.8 + i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* Section Header */}
        <div 
          className="text-center mb-8 md:mb-12 lg:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 30}px)`,
            transition: 'all 0.8s ease-out',
            transitionDelay: '0.2s'
          }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full px-4 md:px-6 py-2 md:py-3 mb-4 md:mb-6">
            <FaPlay className="w-4 md:w-5 h-4 md:h-5 text-yellow-400" />
            <span className="text-sm md:text-lg font-bold text-yellow-400">1000+ MINIMALIST ANIMATIONS</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Clean animations</span>
            <br />
            <span className="text-white">that convert viewers</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Minimalist animations designed to keep your audience engaged and boost retention rates.
          </p>
        </div>

        {/* Optimized Marquee Animation Showcase - Reduced videos */}
        <div 
          className="mb-16 overflow-hidden"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 50}px)`,
            transition: 'all 0.8s ease-out',
            transitionDelay: '0.8s'
          }}
        >
          {/* First Row - Moving Right - Reduced from 16 to 8 */}
          <div className="flex animate-marquee-right mb-8">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={`right-${i}`} className="flex-shrink-0 mx-4">
                <div className="relative w-64 h-36 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-500">
                  {videosLoaded ? (
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="none"
                      style={{
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)'
                      }}
                    >
                      <source src="/minimalists/1_compressed.mp4" type="video/mp4" />
                    </video>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 animate-pulse" />
                  )}
                  
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaPlay className="w-3 h-3 text-white ml-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row - Moving Left - Reduced from 16 to 8 */}
          <div className="flex animate-marquee-left mb-8">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={`left-${i}`} className="flex-shrink-0 mx-4">
                <div className="relative w-64 h-36 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-500">
                  {videosLoaded ? (
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="none"
                      style={{
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)'
                      }}
                    >
                      <source src="/minimalists/1_compressed.mp4" type="video/mp4" />
                    </video>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 animate-pulse" />
                  )}
                  
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaPlay className="w-3 h-3 text-white ml-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Third Row - Moving Right (Slower) - Reduced from 16 to 8 */}
          <div className="flex animate-marquee-right-slow">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={`slow-${i}`} className="flex-shrink-0 mx-4">
                <div className="relative w-64 h-36 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-500">
                  {videosLoaded ? (
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="none"
                      style={{
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)'
                      }}
                    >
                      <source src="/minimalists/1_compressed.mp4" type="video/mp4" />
                    </video>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 animate-pulse" />
                  )}
                  
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaPlay className="w-3 h-3 text-white ml-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div 
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 30}px)`,
            transition: 'all 0.8s ease-out',
            transitionDelay: '1.6s'
          }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-300">
            <div className="flex items-center gap-2">
              <FaEdit className="w-5 h-5 text-blue-400" />
              <span>Easy to Edit</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <FaPlay className="w-5 h-5 text-green-400" />
              <span>Smooth Animations</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <FaDownload className="w-5 h-5 text-purple-400" />
              <span>Instant Download</span>
            </div>
          </div>
        </div>
      </div>

      {/* Optimized Floating Elements - Reduced count */}
      {isVisible && (
        <>
          <div 
            className="absolute top-20 left-10 w-4 h-4 border border-white/30 rotate-45"
            style={{
              animation: 'float 6s ease-in-out infinite',
              animationDelay: '0s'
            }}
          />
          <div 
            className="absolute bottom-40 left-20 w-3 h-3 bg-white/20"
            style={{
              animation: 'float 7s ease-in-out infinite',
              animationDelay: '4s'
            }}
          />
        </>
      )}
    </section>
  )
}

export default MinimalistAnimations
