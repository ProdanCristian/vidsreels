'use client'

import React from 'react'
import Image from 'next/image'
import { FaTiktok, FaInstagram, FaYoutube, FaFire, FaEye } from 'react-icons/fa'
import { HiCheckCircle } from 'react-icons/hi'
import { AiFillStar } from 'react-icons/ai'
import { trackFacebookButtonClickClient } from '@/lib/facebook-tracking'
import { trackTikTokButtonClickClient } from '@/lib/tiktok-tracking'

const previewScreenshots = [
  '/previews/vidsreels_1.jpg',
  '/previews/vidsreels_2.jpg',
  '/previews/vidsreels_3.jpg',
  '/previews/vidsreels_4.jpg',
  '/previews/vidsreels_5.jpg',
  '/previews/vidsreels_6.jpg',
  '/previews/vidsreels_7.jpg',
  '/previews/vidsreels_8.jpg',
  '/previews/vidsreels_9.jpg',
  '/previews/vidsreels_10.jpg',
  '/previews/vidsreels_11.jpg',
  // New videos from /new directory
  '/previews/vidsreels_41.jpg',
  '/previews/vidsreels_52.jpg',
  '/previews/vidsreels_54.jpg',
  '/previews/vidsreels_69.jpg',
  '/previews/vidsreels_120.jpg',
  '/previews/vidsreels_129.jpg',
  '/previews/vidsreels_160.jpg',
  '/previews/vidsreels_161.jpg',
  '/previews/vidsreels_171.jpg',
  '/previews/vidsreels_172.jpg',
  '/previews/vidsreels_173.jpg',
  '/previews/vidsreels_175.jpg',
  '/previews/vidsreels_195.jpg',
  '/previews/vidsreels_198.jpg',
  '/previews/vidsreels_235.jpg',
  '/previews/vidsreels_236.jpg',
]
const previewVideos = [
  '/previews/vidsreels_1.mp4',
  '/previews/vidsreels_2.mp4',
  '/previews/vidsreels_3.mp4',
  '/previews/vidsreels_4.mp4',
  '/previews/vidsreels_5.mp4',
  '/previews/vidsreels_6.mp4',
  '/previews/vidsreels_7.mp4',
  '/previews/vidsreels_8.mp4',
  '/previews/vidsreels_9.mp4',
  '/previews/vidsreels_10.mp4',
  '/previews/vidsreels_11.mp4',
  // New videos from /new directory
  '/previews/new/Vidsreels_41.mp4',
  '/previews/new/Vidsreels_52.mp4',
  '/previews/new/Vidsreels_54.mp4',
  '/previews/new/Vidsreels_69.mp4',
  '/previews/new/Vidsreels_120.MP4',
  '/previews/new/Vidsreels_129.MP4',
  '/previews/new/Vidsreels_160.MP4',
  '/previews/new/Vidsreels_161.MP4',
  '/previews/new/Vidsreels_171.MP4',
  '/previews/new/Vidsreels_172.MP4',
  '/previews/new/Vidsreels_173.MP4',
  '/previews/new/Vidsreels_175.MP4',
  '/previews/new/Vidsreels_195.MP4',
  '/previews/new/Vidsreels_198.MP4',
  '/previews/new/Vidsreels_235.MP4',
  '/previews/new/Vidsreels_236.MP4',
]

interface HeroProps {
  onGetBundle?: () => void
}

// Counter Animation Component
const AnimatedCounter = () => {
  const [count, setCount] = React.useState(0)
  const [isComplete, setIsComplete] = React.useState(false)

  React.useEffect(() => {
    const duration = 2000 // 2 seconds
    const target = 1000000 // 1 million
    const increment = target / (duration / 16) // 60fps
    
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        setIsComplete(true)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return '1,000,000+'
    }
    return num.toLocaleString()
  }

  return (
    <span className={`transition-all duration-300 ${isComplete ? 'animate-pulse text-red-300 font-bold' : ''}`}>
      {formatNumber(count)} Millions of Views
    </span>
  )
}

const Hero: React.FC<HeroProps> = ({ onGetBundle }) => {
  const [modalIdx, setModalIdx] = React.useState<number|null>(null)
  const [imgError, setImgError] = React.useState<{[key:number]:boolean}>({})

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (modalIdx !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [modalIdx])

  // Close modal on ESC
  React.useEffect(() => {
    if (modalIdx === null) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalIdx(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalIdx])

  // Duplicate the list for infinite marquee
  const items = [...previewScreenshots, ...previewScreenshots]

  const handleGetBundleClick = () => {
    // Track client-side button click for both platforms
    trackFacebookButtonClickClient('Hero Section', 'Get 15,000 Reels – $29 (was $287)')
    trackTikTokButtonClickClient('Hero Section', 'Get 15,000 Reels – $29 (was $287)')
    
    // Trigger checkout (server-side tracking handled in parent component)
    if (onGetBundle) {
      onGetBundle()
    }
  }

  return (
    <>
    <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Hero Content */}
      <div className="relative container mx-auto px-4 pt-16 pb-8">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-full text-sm font-medium text-red-400 animate-fade-in-up">
            <FaEye className="w-4 h-4" /> 
            <AnimatedCounter />
          </div>
          
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight animate-fade-in-up [animation-delay:0.2s]">
            <span className="block gradient-text">
              Get Instant Access to{' '}
            </span>
            <span className="block mt-1">
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 animate-pulse">
                  15,000 Editable
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 blur-lg opacity-20 animate-ping"></span>
              </span>
              <span className="gradient-text"> Viral Reels</span>
            </span>
          </h1>
        </div>
      </div>
      
      {/* Preview Reels Marquee - Full Width - 2 Rows */}
      <div className="relative py-12 w-full bg-gradient-to-r from-background/30 via-background/10 to-background/30 animate-fade-in-up [animation-delay:0.3s]">
        <div className="relative">
          {/* Gradient fade left */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-background via-background/60 to-transparent" />
          {/* Gradient fade right */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-background via-background/60 to-transparent" />
          
          {/* 2 Rows of Videos */}
          <div className="space-y-8">
            {/* Row 1 - Moving Right */}
            <div className="overflow-x-hidden">
              <div className="flex gap-4 animate-marquee-right w-max">
                {[...items.slice(0, 14), ...items.slice(0, 14)].map((src, i) => (
                  <div key={`row1-${src}-${i}`} className="inline-block relative w-44 h-80 sm:w-48 sm:h-88 md:w-52 md:h-96 lg:w-56 lg:h-[400px] rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-black cursor-pointer" onClick={() => setModalIdx(i % 14)}>
                    {!imgError[i] ? (
                      <Image
                        src={src}
                        alt={`Preview Reel ${(i % 14) + 1}`}
                        fill
                        className="object-cover w-full h-full"
                        sizes="(max-width: 640px) 176px, (max-width: 768px) 192px, (max-width: 1024px) 208px, 224px"
                        onError={() => setImgError(e => ({...e, [i]: true}))}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-black">
                        <svg className="w-12 h-12 text-white opacity-60" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                    {/* Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200">
                        <svg className="w-8 h-8 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 - Moving Left */}
            <div className="overflow-x-hidden">
              <div className="flex gap-4 animate-marquee-left w-max">
                {[...items.slice(14, 27), ...items.slice(14, 27)].map((src, i) => (
                  <div key={`row2-${src}-${i}`} className="inline-block relative w-44 h-80 sm:w-48 sm:h-88 md:w-52 md:h-96 lg:w-56 lg:h-[400px] rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-black cursor-pointer" onClick={() => setModalIdx((i % 13) + 14)}>
                    {!imgError[i + 14] ? (
                      <Image
                        src={src}
                        alt={`Preview Reel ${(i % 13) + 15}`}
                        fill
                        className="object-cover w-full h-full"
                        sizes="(max-width: 640px) 176px, (max-width: 768px) 192px, (max-width: 1024px) 208px, 224px"
                        onError={() => setImgError(e => ({...e, [i + 14]: true}))}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-black">
                        <svg className="w-12 h-12 text-white opacity-60" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                    {/* Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200">
                        <svg className="w-8 h-8 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 pb-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Description */}
          <p className="text-lg sm:text-xl md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:0.5s]">
            Get instant access to 15,000 premium 4K viral reels that are proven to get millions of views — 
            <span className="font-semibold text-foreground"> normally $287, now just $29 (90% OFF!)</span>
          </p>

          {/* Badges */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 animate-fade-in-up [animation-delay:0.6s]">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 rounded-full text-sm font-semibold text-yellow-700">
              <FaFire className="w-4 h-4 text-orange-500" /> Limited Time: 90% OFF
            </span>
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-green-100 border border-green-300 rounded-full text-sm font-semibold text-green-700">
              <HiCheckCircle className="w-4 h-4 text-green-500" /> 30-Day Money-Back Guarantee
            </span>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in-up [animation-delay:0.7s]">
            <button 
              onClick={handleGetBundleClick}
              className="cursor-pointer px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-full font-bold text-xl hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-2xl hover:shadow-3xl border-4 border-yellow-400/40 hover:border-orange-400/60 hover:scale-105"
            >
              <div className="flex items-center justify-center gap-3">
                <FaFire className="w-5 h-5" />
                <span>Get Access – $29</span>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-black/60 leading-none">was</span>
                  <span className="line-through text-sm text-black/70 leading-none">$287</span>
                </div>
              </div>
            </button>
          </div>

          {/* Platform Icons */}
          <div className="flex justify-center items-center gap-6 py-4 animate-fade-in-up [animation-delay:0.8s]">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-9 h-9 bg-secondary border border-border rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400/20 hover:to-orange-400/20 transition-all duration-300">
                <FaTiktok className="w-4 h-4 text-foreground" />
              </div>
              <span>TikTok</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-9 h-9 bg-secondary border border-border rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-400/20 hover:to-blue-500/20 transition-all duration-300">
                <FaInstagram className="w-4 h-4 text-foreground" />
              </div>
              <span>Instagram</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-9 h-9 bg-secondary border border-border rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-red-400/20 hover:to-orange-400/20 transition-all duration-300">
                <FaYoutube className="w-4 h-4 text-foreground" />
              </div>
              <span>YouTube</span>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground animate-fade-in-up [animation-delay:0.9s]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <AiFillStar key={i} className="w-4 h-4 text-yellow-500" />
                ))}
              </div>
              <span className="font-medium">4.9/5 from 2,847 creators</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Modal for video playback */}
    {modalIdx !== null && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setModalIdx(null)}>
        <div className="relative w-[90vw] max-w-[420px] aspect-[9/16] max-h-[90vh] flex items-center justify-center bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#1e293b]" onClick={e => e.stopPropagation()}>
          <video
            src={previewVideos[modalIdx]}
            className="w-full h-full object-contain bg-black rounded-2xl"
            autoPlay
            controls
            playsInline
            style={{ maxHeight: '90vh', background: 'black', borderRadius: '1rem' }}
          />
          <button className="cursor-pointer absolute top-2 right-2 bg-black/80 rounded-full p-3 text-white hover:bg-yellow-400 hover:text-black transition-colors shadow-lg z-10" onClick={() => setModalIdx(null)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
    )}
    <style jsx>{`
      @keyframes marquee-right {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes marquee-left {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
      .animate-marquee-right {
        animation: marquee-right 60s linear infinite;
      }
      .animate-marquee-left {
        animation: marquee-left 60s linear infinite;
      }
    `}</style>
    </>
  )
}

export default Hero