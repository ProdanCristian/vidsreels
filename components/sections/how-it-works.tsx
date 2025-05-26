'use client'

import React, { useState, useEffect, useRef } from 'react'
import Logo from '@/app/logo'

const HowItWorks = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [currentAction, setCurrentAction] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const lastSeekTime = useRef(0)
  const isSeekingRef = useRef(false)
  const rafId = useRef<number | null>(null)
  const currentActionRef = useRef(currentAction)

  // Keep ref in sync with state
  useEffect(() => {
    currentActionRef.current = currentAction
  }, [currentAction])

  const editingActions = [
    { 
      action: "Importing", 
      description: "Loading raw footage",
      timeRange: [0, 0.25],
      timelineProgress: 15
    },
    { 
      action: "Cutting", 
      description: "Trimming clips to perfection",
      timeRange: [0.25, 0.45],
      timelineProgress: 35
    },
    { 
      action: "Color Grading", 
      description: "Enhancing visual appeal",
      timeRange: [0.45, 0.65],
      timelineProgress: 65
    },
    { 
      action: "Adding Effects", 
      description: "Applying transitions & filters",
      timeRange: [0.65, 0.8],
      timelineProgress: 85
    },
    { 
      action: "Branding", 
      description: "Placing your logo & identity",
      timeRange: [0.8, 1],
      timelineProgress: 100
    }
  ]

  // Chrome-optimized video initialization
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded, duration:', video.duration)
      // Chrome needs a small delay before setting currentTime
      setTimeout(() => {
        video.currentTime = 0.1
        setIsVideoReady(true)
      }, 100)
    }

    const handleCanPlayThrough = () => {
      console.log('Video can play through, duration:', video.duration)
      setIsVideoReady(true)
    }

    const handleError = (e: Event) => {
      console.error('Video error:', e)
    }

    // Chrome-specific attributes
    video.setAttribute('webkit-playsinline', 'true')
    video.setAttribute('x-webkit-airplay', 'allow')
    
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('canplaythrough', handleCanPlayThrough)
    video.addEventListener('error', handleError)

    // Force load for Chrome
    video.load()

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('canplaythrough', handleCanPlayThrough)
      video.removeEventListener('error', handleError)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Debug logging
      console.log('Scroll Debug:', {
        rectTop: rect.top,
        rectHeight: rect.height,
        windowHeight: windowHeight,
        isVideoReady: isVideoReady
      })
      
      // Calculate scroll progress - video only starts when fully centered
      // Video is fully centered when section.top = 0 (video at top of viewport)
      // Progress starts from 0 when video is centered and goes to 1 as we continue scrolling
      
      let progress = 0
      
      // Only start progress when video is fully centered (section.top <= 0)
      if (rect.top <= 0) {
        // Calculate how much we've scrolled past the center point
        const scrolledPastCenter = Math.abs(rect.top)
        // Total distance from center to when section leaves viewport
        const totalProgressDistance = rect.height - windowHeight
        
        if (totalProgressDistance > 0) {
          progress = Math.max(0, Math.min(1, scrolledPastCenter / totalProgressDistance))
        }
      }
      
      console.log('Progress:', progress)
      setScrollProgress(progress)

      // Update current editing action
      const newAction = editingActions.findIndex(action => 
        progress >= action.timeRange[0] && progress < action.timeRange[1]
      )
      
      let targetAction = currentActionRef.current
      if (newAction !== -1) {
        targetAction = newAction
      } else if (progress >= 0.8) {
        targetAction = 4 // Branding phase
      }
      
      if (targetAction !== currentActionRef.current) {
        currentActionRef.current = targetAction
        setCurrentAction(targetAction)
        console.log('Action changed to:', editingActions[targetAction].action)
      }

      // Ultra-smooth Chrome video seeking
      if (videoRef.current && isVideoReady) {
        const video = videoRef.current
        if (video.duration && !isNaN(video.duration) && video.duration > 0) {
          // Calculate stopping point well before the end to account for screen transition
          const frameRate = 30
          const framesBeforeEnd = 15 // Stop 15 frames (0.5 seconds) before the end
          const timeBeforeEnd = framesBeforeEnd / frameRate
          const maxVideoTime = video.duration - timeBeforeEnd
          
          // Map progress to video time, but stop well before the end
          const targetTime = Math.min(progress * video.duration, maxVideoTime)
          const timeDiff = Math.abs(targetTime - lastSeekTime.current)
          
          // Only seek if time difference is significant and not currently seeking
          if (timeDiff > 0.05 && !isSeekingRef.current) {
            // Cancel any pending animation frame
            if (rafId.current) {
              cancelAnimationFrame(rafId.current)
            }
            
            // Use requestAnimationFrame for ultra-smooth seeking
            rafId.current = requestAnimationFrame(() => {
              if (video && !video.seeking && !isSeekingRef.current) {
                isSeekingRef.current = true
                try {
                  video.currentTime = targetTime
                  lastSeekTime.current = targetTime
                  console.log('Video time set to:', targetTime, 'of', video.duration, '(max:', maxVideoTime, ')')
                  
                  // Reset seeking flag after a short delay
                  setTimeout(() => {
                    isSeekingRef.current = false
                  }, 50)
                } catch (error) {
                  console.error('Error setting video time:', error)
                  isSeekingRef.current = false
                }
              }
            })
          }
        } else {
          console.log('Video duration not ready:', video.duration)
        }
      }
    }

    // Ultra-smooth scroll handling for Chrome
    let ticking = false
    const smoothScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    // Use passive scroll listener for better performance
    window.addEventListener('scroll', smoothScroll, { 
      passive: true,
      capture: false 
    })
    
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', smoothScroll)
      // Clean up any pending animation frames
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [isVideoReady])

  return (
    <>
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
            <span className="gradient-text">Simple Editing Process</span>
          </h2>
      {/* CSS Animations for Effects */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes glitch {
          0% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
          100% { transform: translateX(0); }
        }
        @keyframes wipe {
          0% { transform: translateX(-100%) skewX(-12deg); }
          50% { transform: translateX(400%) skewX(-12deg); }
          100% { transform: translateX(-100%) skewX(-12deg); }
        }
        @keyframes colorShift {
          0% { filter: hue-rotate(0deg); }
          25% { filter: hue-rotate(90deg); }
          50% { filter: hue-rotate(180deg); }
          75% { filter: hue-rotate(270deg); }
          100% { filter: hue-rotate(360deg); }
        }
        @keyframes lutApplication {
          0% { opacity: 0.4; filter: hue-rotate(0deg) saturate(1.1); }
          50% { opacity: 0.7; filter: hue-rotate(15deg) saturate(1.3); }
          100% { opacity: 0.4; filter: hue-rotate(0deg) saturate(1.1); }
        }
      `}</style>
      
      <section ref={sectionRef} className="relative min-h-[300vh] bg-background">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        
        {/* Vertical Video Container */}
        <div 
          className="relative w-full max-w-sm h-full flex items-center justify-center"
        >
          <div className="relative w-full aspect-[9/16] max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              preload="metadata"
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload nofullscreen noremoteplayback"
              crossOrigin="anonymous"
              style={{ 
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                perspective: '1000px',
                transform: 'translateZ(0)', // Force hardware acceleration in Chrome
                imageRendering: 'auto',
                WebkitTransform: 'translateZ(0)', // Webkit-specific acceleration
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <source src="/editing.mp4" type="video/mp4" />
            </video>
            
            {/* Video overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

            {/* Color Grading LUT - Only show during Color Grading phase */}
            {editingActions[currentAction]?.action === 'Color Grading' && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Cinematic Orange/Teal LUT */}
                <div 
                  className="absolute inset-0 mix-blend-color opacity-40"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,140,60,0.6) 0%, rgba(255,180,100,0.4) 30%, rgba(40,120,140,0.5) 70%, rgba(20,80,120,0.6) 100%)',
                    animation: 'lutApplication 4s ease-in-out infinite'
                  }}
                ></div>

                {/* Warm Highlights */}
                <div 
                  className="absolute inset-0 mix-blend-overlay opacity-30"
                  style={{
                    background: 'radial-gradient(ellipse at 30% 20%, rgba(255,200,120,0.8) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,160,80,0.6) 0%, transparent 40%)',
                    filter: 'contrast(1.2) saturate(1.4)'
                  }}
                ></div>

                {/* Cool Shadows */}
                <div 
                  className="absolute inset-0 mix-blend-multiply opacity-50"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 30%, rgba(20,40,80,0.7) 80%)',
                    filter: 'brightness(0.8) contrast(1.1)'
                  }}
                ></div>

                {/* Film Grain Texture */}
                <div 
                  className="absolute inset-0 mix-blend-overlay opacity-20"
                  style={{
                    background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                    backgroundSize: '100px 100px'
                  }}
                ></div>
              </div>
            )}

            {/* Visual Effects - Only show during Adding Effects phase */}
            {editingActions[currentAction]?.action === 'Adding Effects' && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Particle Effect */}
                <div className="absolute inset-0">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-70"
                      style={{
                        left: `${10 + (i * 8)}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        animation: `float ${2 + (i % 3)}s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    ></div>
                  ))}
                </div>

                {/* Glitch Effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-blue-500/20 mix-blend-overlay"
                  style={{
                    animation: 'glitch 0.3s ease-in-out infinite alternate'
                  }}
                ></div>

                {/* Light Rays */}
                <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-yellow-400/60 via-transparent to-transparent transform rotate-12 opacity-80"></div>
                <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-pink-400/60 via-transparent to-transparent transform -rotate-12 opacity-80"></div>

                {/* Transition Wipe */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                  style={{
                    animation: 'wipe 3s ease-in-out infinite',
                    width: '20%'
                  }}
                ></div>

                {/* Color Filter Overlay */}
                <div 
                  className="absolute inset-0 mix-blend-color-dodge opacity-30"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, #ff6b6b, #4ecdc4, #45b7d1)',
                    animation: 'colorShift 4s ease-in-out infinite'
                  }}
                ></div>
              </div>
            )}

            {/* Logo - Only show during Branding phase at center bottom of video */}
            {editingActions[currentAction]?.action === 'Branding' && (
              <div 
                className="absolute inset-x-0 bottom-8 flex justify-center transition-all duration-1000 ease-out z-20"
                style={{
                  opacity: 1
                }}
              >
                <div 
                  className="bg-black/70 backdrop-blur-md rounded-xl px-4 py-3 border border-white/40 shadow-xl"
                  style={{
                    transform: 'scale(0.6)'
                  }}
                >
                  <Logo />
                </div>
              </div>
            )}

            {/* Editing Action Text */}
            <div 
              className={`absolute top-6 left-6 right-6 transition-all duration-700 ${
                scrollProgress > 0.1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-1">
                    {editingActions[currentAction]?.action}
                  </h3>
                  <p className="text-sm text-white/80">
                    {editingActions[currentAction]?.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Video Trimming Timeline - Only show during Cutting phase */}
            <div 
              className={`absolute bottom-20 left-6 right-6 transition-all duration-700 ${
                editingActions[currentAction]?.action === 'Cutting' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/20">
                <div className="flex items-center justify-between text-white text-xs mb-2">
                  <span>Video Timeline</span>
                  <span>Trimming</span>
                </div>
                
                {/* Video timeline with trim indicators */}
                <div className="relative h-3 bg-white/20 rounded-sm overflow-hidden mb-1">
                  {/* Full video length */}
                  <div className="absolute left-0 top-0 w-full h-full bg-white/10"></div>
                  
                  {/* Trimmed section (active part) */}
                  <div 
                    className="absolute top-0 h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-500"
                    style={{ 
                      left: `${Math.max(0, scrollProgress * 20)}%`,
                      width: `${Math.min(80, 60 + scrollProgress * 20)}%`
                    }}
                  ></div>
                  
                  {/* Trim handles */}
                  <div 
                    className="absolute top-0 w-1 h-full bg-yellow-400 transition-all duration-500"
                    style={{ left: `${Math.max(0, scrollProgress * 20)}%` }}
                  ></div>
                  <div 
                    className="absolute top-0 w-1 h-full bg-yellow-400 transition-all duration-500"
                    style={{ left: `${Math.min(80, 60 + scrollProgress * 20)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-white/60">
                  <span>00:00</span>
                  <span className="text-green-400">
                    {Math.round(scrollProgress * 15 + 5)}s selected
                  </span>
                  <span>01:30</span>
                </div>
              </div>
            </div>

            {/* Branding Explanation
            {scrollProgress >= 0.75 && (
              <div 
                className="absolute top-1/2 left-6 right-6 transform -translate-y-1/2 transition-all duration-1000"
                style={{ opacity: (scrollProgress - 0.75) * 4 }}
              >
                <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/30 text-center">
                  <h3 className="text-white text-xl font-bold mb-2">Perfect Branding</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                                         Your logo is seamlessly integrated into the video, maintaining brand consistency 
                     while preserving the content&apos;s viral appeal.
                  </p>
                </div>
              </div>
            )} */}
          </div>
        </div>

        {/* Progress Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        >
          <div className="bg-black/30 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
            <div className="flex items-center gap-3 text-white">
              <span className="text-sm font-medium">Progress</span>
              <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${scrollProgress * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold">{Math.round(scrollProgress * 100)}%</span>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  )
}

export default HowItWorks
