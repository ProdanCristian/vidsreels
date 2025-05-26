'use client'

import React, { useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import { FaTiktok, FaInstagram, FaYoutube, FaEye, FaFire } from 'react-icons/fa'
import { HiCheckCircle } from 'react-icons/hi'
import { AiFillStar } from 'react-icons/ai'
import { useRouter } from 'next/navigation'

const Hero = () => {
  const router = useRouter()
  const [hoveredPhone, setHoveredPhone] = useState<number | null>(null)
  const [loadingVideos, setLoadingVideos] = useState<Set<number>>(new Set())
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set())
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const handleMouseEnter = useCallback((phoneNumber: number) => {
    setHoveredPhone(phoneNumber)
    // Preload video on hover for desktop
    if (!loadedVideos.has(phoneNumber)) {
      preloadVideo(phoneNumber)
    } else {
      // If video is already loaded, play it with audio on desktop
      const video = videoRefs.current[phoneNumber - 1]
      if (video) {
        video.muted = false
        video.play().catch(() => {
          // If audio fails, fallback to muted
          video.muted = true
          video.play()
        })
      }
    }
  }, [loadedVideos])

  const handleMouseLeave = useCallback(() => {
    setHoveredPhone(null)
  }, [])

  const preloadVideo = useCallback((phoneNumber: number) => {
    if (loadingVideos.has(phoneNumber) || loadedVideos.has(phoneNumber)) return
    
    setLoadingVideos(prev => new Set([...prev, phoneNumber]))
    
    const video = videoRefs.current[phoneNumber - 1]
    if (video) {
      video.load()
      video.addEventListener('loadeddata', () => {
        setLoadedVideos(prev => new Set([...prev, phoneNumber]))
        setLoadingVideos(prev => {
          const newSet = new Set(prev)
          newSet.delete(phoneNumber)
          return newSet
        })
        
        // Auto-play with audio when loaded
        if (hoveredPhone === phoneNumber) {
          video.muted = false
          video.play().catch(() => {
            // If audio fails, fallback to muted
            video.muted = true
            video.play()
          })
        }
      }, { once: true })
    }
  }, [loadingVideos, loadedVideos, hoveredPhone])

  const handleTouch = useCallback((phoneNumber: number) => {
    if (hoveredPhone === phoneNumber) {
      setHoveredPhone(null)
    } else {
      setHoveredPhone(phoneNumber)
      // Immediately preload video on mobile touch
      if (!loadedVideos.has(phoneNumber)) {
        preloadVideo(phoneNumber)
      } else {
        // If video is already loaded, play it with audio
        const video = videoRefs.current[phoneNumber - 1]
        if (video) {
          video.muted = false
          video.play().catch(() => {
            // If audio fails, fallback to muted
            video.muted = true
            video.play()
          })
        }
      }
    }
  }, [hoveredPhone, loadedVideos, preloadVideo])

  return (
    <section className="relative min-h-screen">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 dark:to-accent/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.2),transparent_50%)]"></div>
      
      <div className="relative container mx-auto px-4 py-8">
      <article className="text-center mb-16 space-y-6">
                  <aside className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-full text-sm font-medium text-red-400 mb-4 animate-fade-in-up">
            <FaFire className="w-4 h-4" /> <span>15,000+ Viral Reels</span>
          </aside>
        
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
          <span className="block gradient-text animate-shimmer">Get 15,000 4K Viral Reels</span>
          <span className="block text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
            Grow to 10K Followers Fast
          </span>
        </h1>

                 <figure className="relative flex justify-center items-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
           {/* Phone 1 - Back left */}
           <div 
             className={`absolute z-10 -rotate-12 -translate-x-16 sm:-translate-x-24 md:-translate-x-32 translate-y-4 sm:translate-y-6 md:translate-y-8 animate-phone-entrance [animation-delay:0.2s] transform transition-all duration-500 hover:scale-110 cursor-pointer ${hoveredPhone === 1 ? 'z-50 scale-110' : 'hover:z-50'}`}
             onMouseEnter={() => handleMouseEnter(1)}
             onMouseLeave={handleMouseLeave}
             onTouchStart={() => handleTouch(1)}
           >
             {hoveredPhone === 1 ? (
               <div className="relative">
                 <video
                   ref={(el) => { videoRefs.current[0] = el }}
                   src="/1.mp4"
                   autoPlay
                   loop
                   playsInline
                   preload="metadata"
                   className="w-40 h-80 sm:w-44 sm:h-88 md:w-48 md:h-96 lg:w-[300px] lg:h-[600px] rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] object-cover pointer-events-none"
                 />
                 {loadingVideos.has(1) && 'ontouchstart' in window && (
                   <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem]">
                     <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                   </div>
                 )}
               </div>
             ) : (
               <Image
                 src="/VidsReels 1.webp"
                 alt="VidsReels 1"
                 width={300}
                 height={600}
                 className="w-40 h-80 sm:w-44 sm:h-88 md:w-48 md:h-96 lg:w-[300px] lg:h-[600px] rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] object-cover pointer-events-none"
               />
             )}
           </div>

                     {/* Phone 2 - Back right */}
           <div 
             className={`absolute z-20 rotate-12 translate-x-16 sm:translate-x-24 md:translate-x-32 translate-y-4 sm:translate-y-6 md:translate-y-8 animate-phone-entrance [animation-delay:0.4s] transform transition-all duration-500 hover:scale-110 cursor-pointer ${hoveredPhone === 2 ? 'z-50 scale-110' : 'hover:z-50'}`}
             onMouseEnter={() => handleMouseEnter(2)}
             onMouseLeave={handleMouseLeave}
             onTouchStart={() => handleTouch(2)}
           >
             {hoveredPhone === 2 ? (
               <div className="relative">
                 <video
                   ref={(el) => { videoRefs.current[1] = el }}
                   src="/2.mp4"
                   autoPlay
                   loop
                   playsInline
                   preload="metadata"
                   className="w-40 h-80 sm:w-44 sm:h-88 md:w-48 md:h-96 lg:w-[300px] lg:h-[600px] rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] object-cover pointer-events-none"
                 />
                 {loadingVideos.has(2) && 'ontouchstart' in window && (
                   <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem]">
                     <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                   </div>
                 )}
               </div>
             ) : (
               <Image
                 src="/VidsReels 2.webp"
                 alt="VidsReels 2"
                 width={300}
                 height={600}
                 className="w-40 h-80 sm:w-44 sm:h-88 md:w-48 md:h-96 lg:w-[300px] lg:h-[600px] rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] object-cover pointer-events-none"
               />
             )}
           </div>

           {/* Phone 3 - Front left */}
           <div 
             className={`absolute z-30 -rotate-6 -translate-x-8 sm:-translate-x-12 md:-translate-x-16 -translate-y-2 sm:-translate-y-3 md:-translate-y-4 animate-phone-entrance [animation-delay:0.6s] transform transition-all duration-500 hover:scale-110 cursor-pointer ${hoveredPhone === 3 ? 'z-50 scale-110' : 'hover:z-50'}`}
             onMouseEnter={() => handleMouseEnter(3)}
             onMouseLeave={handleMouseLeave}
             onTouchStart={() => handleTouch(3)}
           >
             {hoveredPhone === 3 ? (
               <div className="relative">
                 <video
                   ref={(el) => { videoRefs.current[2] = el }}
                   src="/3.mp4"
                   autoPlay
                   loop
                   playsInline
                   preload="metadata"
                   className="w-40 h-80 sm:w-44 sm:h-88 md:w-48 md:h-96 lg:w-[300px] lg:h-[600px] rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] object-cover pointer-events-none"
                 />
                 {loadingVideos.has(3) && 'ontouchstart' in window && (
                   <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem]">
                     <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                   </div>
                 )}
               </div>
             ) : (
               <Image
                 src="/VidsReels 3.webp"
                 alt="VidsReels 3"
                 width={300}
                 height={600}
                 className="w-40 h-80 sm:w-44 sm:h-88 md:w-48 md:h-96 lg:w-[300px] lg:h-[600px] rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] object-cover pointer-events-none"
               />
             )}
           </div>

           {/* Phone 4 - Front center */}
           <div 
             className={`relative z-40 animate-phone-entrance [animation-delay:0.8s] transform transition-all duration-500 hover:scale-110 cursor-pointer ${hoveredPhone === 4 ? 'z-50 scale-110' : 'hover:z-50'}`}
             onMouseEnter={() => handleMouseEnter(4)}
             onMouseLeave={handleMouseLeave}
             onTouchStart={() => handleTouch(4)}
           >
             {hoveredPhone === 4 ? (
               <div className="relative">
                 <video
                   ref={(el) => { videoRefs.current[3] = el }}
                   src="/4.mp4"
                   autoPlay
                   loop
                   playsInline
                   preload="metadata"
                   className="w-40 h-80 sm:w-44 sm:h-88 md:w-48 md:h-96 lg:w-[300px] lg:h-[600px] rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] object-cover pointer-events-none"
                 />
                 {loadingVideos.has(4) && 'ontouchstart' in window && (
                   <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem]">
                     <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                   </div>
                 )}
               </div>
             ) : (
               <Image
                 src="/VidsReels 4.webp"
                 alt="VidsReels 4"
                 width={300}
                 height={600}
                 className="w-40 h-80 sm:w-44 sm:h-88 md:w-48 md:h-96 lg:w-[300px] lg:h-[600px] rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] object-cover pointer-events-none"
               />
             )}
           </div>
        </figure>
                 <div className="mt-10 flex justify-center items-center gap-4 text-sm text-muted-foreground animate-fade-in-up [animation-delay:0.6s]">
           <span className="flex items-center gap-2">
            <HiCheckCircle className="w-5 h-5 text-green-500" /> 100% Commercial Use License
           </span>
         </div>

        <p className="mt-6 sm:mt-8 md:mt-10 text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:0.3s] px-4">
          Get instant access to 15,000 premium 4K viral reels that are proven to get millions of views — 
          <span className="font-semibold text-foreground">normally $199, now just $29 (85% OFF!)</span>
        </p>
        
        {/* Platform Icons */}
        <nav className="flex justify-center items-center gap-4 sm:gap-6 py-4 animate-fade-in-up [animation-delay:0.4s]">
          <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground">
            <aside className="w-8 h-8 bg-secondary border border-border rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400/20 hover:to-orange-400/20 transition-all duration-300">
              <FaTiktok className="w-4 h-4 text-foreground" />
            </aside>
            <span>TikTok</span>
          </a>
          <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground">
            <aside className="w-8 h-8 bg-secondary border border-border rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-400/20 hover:to-blue-500/20 transition-all duration-300">
              <FaInstagram className="w-4 h-4 text-foreground" />
            </aside>
            <span>Instagram</span>
          </a>
          <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground">
            <aside className="w-8 h-8 bg-secondary border border-border rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-red-400/20 hover:to-orange-400/20 transition-all duration-300">
              <FaYoutube className="w-4 h-4 text-foreground" />
            </aside>
            <span>YouTube</span>
          </a>
        </nav>
        
        <nav className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up [animation-delay:0.5s] px-4">
                     <button className="cursor-pointer w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-full font-bold text-lg sm:text-xl hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 animate-pulse-cta shadow-lg hover:shadow-xl">
             <FaFire className="inline w-5 h-5 mr-2" /> Get 15,000 Reels – $29 (was $199)
           </button>
           <button onClick={() => router.push('/preview')} className="cursor-pointer w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-secondary border border-border rounded-full font-semibold text-base sm:text-lg hover:bg-secondary/80 transition-all duration-300 hover:scale-105">
             <FaEye className="inline w-4 h-4 mr-2" /> Preview reels
           </button>
        </nav>
        
        {/* Social Proof */}
                 <aside className="flex justify-center items-center gap-4 text-sm text-muted-foreground animate-fade-in-up [animation-delay:0.6s]">
           <span className="flex items-center gap-2">
             <div className="flex items-center gap-1">
               {[...Array(5)].map((_, i) => (
                 <AiFillStar key={i} className="w-4 h-4 text-green-500" />
               ))}
             </div>
             <span>4.9/5 from 2,847 creators</span>
           </span>
         </aside>
       </article>
       </div>
     </section>
  )
}

export default Hero