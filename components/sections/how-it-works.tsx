'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'

// Lazy load the Logo component
const Logo = dynamic(() => import('@/app/logo'), {
  loading: () => <div className="w-16 h-8 bg-white/20 rounded animate-pulse" />
})

const HowItWorks = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [currentAction, setCurrentAction] = useState(0)
  const [isInView, setIsInView] = useState(false)
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

  // Memoize editing actions to prevent recreation
  const editingActions = useMemo(() => [
    { 
      action: "Importing", 
      description: "Loading raw footage",
      timeRange: [0, 0.25] as [number, number],
      timelineProgress: 15
    },
    { 
      action: "Cutting", 
      description: "Trimming clips to perfection",
      timeRange: [0.25, 0.45] as [number, number],
      timelineProgress: 35
    },
    { 
      action: "Color Grading", 
      description: "Enhancing visual appeal",
      timeRange: [0.45, 0.65] as [number, number],
      timelineProgress: 65
    },
    { 
      action: "Adding Effects", 
      description: "Applying transitions & filters",
      timeRange: [0.65, 0.8] as [number, number],
      timelineProgress: 85
    },
    { 
      action: "Branding", 
      description: "Placing your logo & identity",
      timeRange: [0.8, 1] as [number, number],
      timelineProgress: 100
    }
  ], [])

  // Intersection Observer for detecting when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Video loading and setup
  useEffect(() => {
    const video = videoRef.current
    if (!video || !isInView) return

    const handleLoadedMetadata = () => {
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      const delay = isSafari ? 200 : 50
      
      setTimeout(() => {
        try {
          video.currentTime = 0.1
          setIsVideoReady(true)
        } catch {
          setIsVideoReady(true)
        }
      }, delay)
    }

    const handleCanPlayThrough = () => setIsVideoReady(true)
    const handleLoadedData = () => setIsVideoReady(true)
    const handleError = () => {
      setTimeout(() => {
        if (video && !isVideoReady) {
          video.load()
        }
      }, 1000)
    }

    // Safari-specific attributes
    video.setAttribute('webkit-playsinline', 'true')
    video.setAttribute('x-webkit-airplay', 'allow')
    video.setAttribute('playsinline', 'true')
    
    video.addEventListener('loadedmetadata', handleLoadedMetadata, { passive: true })
    video.addEventListener('canplaythrough', handleCanPlayThrough, { passive: true })
    video.addEventListener('loadeddata', handleLoadedData, { passive: true })
    video.addEventListener('error', handleError, { passive: true })

    // Load the video
    video.load()

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('canplaythrough', handleCanPlayThrough)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
    }
  }, [isInView, isVideoReady])

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return

    const section = sectionRef.current
    const rect = section.getBoundingClientRect()
    const windowHeight = window.innerHeight
    
    let progress = 0
    
    if (rect.top <= 0) {
      const scrolledPastCenter = Math.abs(rect.top)
      const totalProgressDistance = rect.height - windowHeight
      
      if (totalProgressDistance > 0) {
        progress = Math.max(0, Math.min(1, scrolledPastCenter / totalProgressDistance))
      }
    }
    
    setScrollProgress(progress)

    // Update current editing action
    const newAction = editingActions.findIndex(action => 
      progress >= action.timeRange[0] && progress < action.timeRange[1]
    )
    
    let targetAction = currentActionRef.current
    if (newAction !== -1) {
      targetAction = newAction
    } else if (progress >= 0.8) {
      targetAction = 4
    }
    
    if (targetAction !== currentActionRef.current) {
      currentActionRef.current = targetAction
      setCurrentAction(targetAction)
    }

    // Optimized video seeking
    if (videoRef.current && isVideoReady && isInView) {
      const video = videoRef.current
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        const frameRate = 30
        const framesBeforeEnd = 15
        const timeBeforeEnd = framesBeforeEnd / frameRate
        const maxVideoTime = video.duration - timeBeforeEnd
        
        const targetTime = Math.min(progress * video.duration, maxVideoTime)
        const timeDiff = Math.abs(targetTime - lastSeekTime.current)
        
        if (timeDiff > 0.1 && !isSeekingRef.current) {
          if (rafId.current) {
            cancelAnimationFrame(rafId.current)
          }
          
          rafId.current = requestAnimationFrame(() => {
            if (video && !video.seeking && !isSeekingRef.current) {
              isSeekingRef.current = true
              try {
                video.currentTime = targetTime
                lastSeekTime.current = targetTime
                
                setTimeout(() => {
                  isSeekingRef.current = false
                }, 100)
              } catch {
                isSeekingRef.current = false
              }
            }
          })
        }
      }
    }
  }, [editingActions, isVideoReady, isInView])

  // Throttled scroll listener
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

    window.addEventListener('scroll', throttledScroll, { 
      passive: true,
      capture: false 
    })
    
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [handleScroll])

  // Memoized CSS animations
  const cssAnimations = useMemo(() => `
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
  `, [])

  return (
    <>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
        <span className="gradient-text">Simple Editing Process</span>
      </h2>
      
      <style jsx>{cssAnimations}</style>
      
      <section ref={sectionRef} className="relative min-h-[300vh] bg-background">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative w-full max-w-sm h-full flex items-center justify-center">
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
                style={{ 
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                  WebkitBackfaceVisibility: 'hidden',
                  opacity: isInView ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out'
                }}
              >
                <source src="/editing_ultra_compressed.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

              {/* Color Grading LUT - Only show during Color Grading phase */}
              {editingActions[currentAction]?.action === 'Color Grading' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div 
                    className="absolute inset-0 mix-blend-color opacity-40"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,140,60,0.6) 0%, rgba(255,180,100,0.4) 30%, rgba(40,120,140,0.5) 70%, rgba(20,80,120,0.6) 100%)',
                      animation: 'lutApplication 4s ease-in-out infinite'
                    }}
                  />
                  <div 
                    className="absolute inset-0 mix-blend-overlay opacity-30"
                    style={{
                      background: 'radial-gradient(ellipse at 30% 20%, rgba(255,200,120,0.8) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,160,80,0.6) 0%, transparent 40%)',
                      filter: 'contrast(1.2) saturate(1.4)'
                    }}
                  />
                </div>
              )}

              {/* Visual Effects - Only show during Adding Effects phase */}
              {editingActions[currentAction]?.action === 'Adding Effects' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-70"
                        style={{
                          left: `${10 + (i * 10)}%`,
                          top: `${20 + (i % 3) * 25}%`,
                          animation: `float ${2 + (i % 3)}s ease-in-out infinite`,
                          animationDelay: `${i * 0.3}s`
                        }}
                      />
                    ))}
                  </div>
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-blue-500/20 mix-blend-overlay"
                    style={{ animation: 'glitch 0.3s ease-in-out infinite alternate' }}
                  />
                </div>
              )}

              {/* Logo - Only show during Branding phase */}
              {editingActions[currentAction]?.action === 'Branding' && (
                <div className="absolute inset-x-0 bottom-8 flex justify-center transition-all duration-1000 ease-out z-20">
                  <div 
                    className="bg-black/70 backdrop-blur-md rounded-xl px-4 py-3 border border-white/40 shadow-xl"
                    style={{ transform: 'scale(0.6)' }}
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
              {editingActions[currentAction]?.action === 'Cutting' && (
                <div className="absolute bottom-20 left-6 right-6 transition-all duration-700 opacity-100 translate-y-0">
                  <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/20">
                    <div className="flex items-center justify-between text-white text-xs mb-2">
                      <span>Video Timeline</span>
                      <span>Trimming</span>
                    </div>
                    
                    <div className="relative h-3 bg-white/20 rounded-sm overflow-hidden mb-1">
                      <div className="absolute left-0 top-0 w-full h-full bg-white/10" />
                      <div 
                        className="absolute top-0 h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-500"
                        style={{ 
                          left: `${Math.max(0, scrollProgress * 20)}%`,
                          width: `${Math.min(80, 60 + scrollProgress * 20)}%`
                        }}
                      />
                      <div 
                        className="absolute top-0 w-1 h-full bg-yellow-400 transition-all duration-500"
                        style={{ left: `${Math.max(0, scrollProgress * 20)}%` }}
                      />
                      <div 
                        className="absolute top-0 w-1 h-full bg-yellow-400 transition-all duration-500"
                        style={{ left: `${Math.min(80, 60 + scrollProgress * 20)}%` }}
                      />
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
              )}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <div className="bg-black/30 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
              <div className="flex items-center gap-3 text-white">
                <span className="text-sm font-medium">Progress</span>
                <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
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
