'use client'

import React, { useEffect, useState } from 'react'
import { FaPlay, FaFire, FaEye, FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { trackInitiateCheckout, trackFacebookButtonClickClient } from '@/lib/facebook-tracking'
import { trackTikTokButtonClickClient, trackTikTokInitiateCheckout } from '@/lib/tiktok-tracking'
import { redirectToCheckout } from '@/lib/checkout'

// Extend window interface for direct pixel calls
declare global {
  interface Window {
    fbq?: ((action: string, event: string, data?: Record<string, unknown>) => void) & {
      version?: string;
    };
    ttq?: {
      identify: (data: Record<string, string>) => void;
      track: (event: string, data: Record<string, unknown>, options?: Record<string, string>) => void;
    };
  }
}

export default function PreviewPage() {
  const router = useRouter()
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasViewedVideos, setHasViewedVideos] = useState(false)
  const [hasTrackedPageVisit, setHasTrackedPageVisit] = useState(false)

  // Video data
  const videos = [
    { id: 1, src: '/previews/vidsreels_1.mp4', title: 'Luxury Lifestyle Reel #1' },
    { id: 2, src: '/previews/vidsreels_2.mp4', title: 'Viral Content Reel #2' },
    { id: 3, src: '/previews/vidsreels_3.mp4', title: 'Premium Reel #3' },
    { id: 4, src: '/previews/vidsreels_4.mp4', title: 'High-Quality Reel #4' },
    { id: 5, src: '/previews/vidsreels_5.mp4', title: 'Engaging Reel #5' },
    { id: 6, src: '/previews/vidsreels_6.mp4', title: 'Professional Reel #6' },
    { id: 7, src: '/previews/vidsreels_7.mp4', title: 'Stunning Reel #7' },
    { id: 8, src: '/previews/vidsreels_8.mp4', title: 'Creative Reel #8' },
    { id: 9, src: '/previews/vidsreels_9.mp4', title: 'Viral Reel #9' },
    { id: 10, src: '/previews/vidsreels_10.mp4', title: 'Premium Reel #10' },
    { id: 11, src: '/previews/vidsreels_11.mp4', title: 'Luxury Reel #11' },
  ]

  useEffect(() => {
    // Track that user visited preview page with ViewContent instead of Lead
    if (!hasTrackedPageVisit) {
      const trackPageVisit = async () => {
        try {
          // Use ViewContent for page visits instead of Lead to avoid duplicate Lead events
          if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'ViewContent', {
              content_name: 'Preview Page Visited',
              content_category: 'Page View'
            })
          }
          if (typeof window !== 'undefined' && window.ttq) {
            window.ttq.track('ViewContent', {
              contents: [
                {
                  content_id: 'preview_page',
                  content_type: 'product',
                  content_name: 'Preview Page Visited'
                }
              ]
            })
          }
        } catch (error) {
          console.error('Error tracking preview page visit:', error)
        }
      }
      trackPageVisit()
      setHasTrackedPageVisit(true)
    }
  }, [hasTrackedPageVisit])

  const handleVideoPlay = async (index: number) => {
    setCurrentVideo(index)
    setIsPlaying(true)
    setHasViewedVideos(true)
    
    // Track video engagement with ViewContent instead of Lead
    try {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'ViewContent', {
          content_name: `Video ${index + 1} Played`,
          content_category: 'Video Engagement'
        })
      }
      if (typeof window !== 'undefined' && window.ttq) {
        window.ttq.track('ViewContent', {
          contents: [
            {
              content_id: `video_${index + 1}`,
              content_type: 'product',
              content_name: `Video ${index + 1} Played`
            }
          ]
        })
      }
    } catch (error) {
      console.error('Error tracking video play:', error)
    }
  }

  const handleCheckoutClick = async () => {
    // Track checkout intent with both client-side and server-side
    const action = hasViewedVideos ? 'Checkout After Preview' : 'Checkout from Preview Page'
    
    try {
      // Client-side button tracking
      trackFacebookButtonClickClient('Preview Page', action)
      await trackTikTokButtonClickClient('Preview Page', action)
      
      // Server-side conversion tracking
      await Promise.all([
        trackInitiateCheckout(undefined, 'Preview Page'),  // Facebook server-side
        trackTikTokInitiateCheckout(undefined, 'Preview Page')  // TikTok server-side
      ])
    } catch (error) {
      console.error('Error tracking checkout click:', error)
    }
    
    // Go directly to Stripe checkout instead of redirecting to main page
    await redirectToCheckout()
  }

  const handleBackToHome = async () => {
    try {
      // Track user leaving preview page with ViewContent instead of Lead
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'ViewContent', {
          content_name: 'Back to Home from Preview',
          content_category: 'Navigation'
        })
      }
      if (typeof window !== 'undefined' && window.ttq) {
        window.ttq.track('ViewContent', {
          contents: [
            {
              content_id: 'back_to_home',
              content_type: 'product',
              content_name: 'Back to Home from Preview'
            }
          ]
        })
      }
    } catch (error) {
      console.error('Error tracking back to home:', error)
    }
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Preview Our Premium Reels
              </h1>
              <p className="text-muted-foreground mt-1">
                                 See what you&apos;ll get in the full bundle
              </p>
            </div>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main Video Player */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl">
            <video
              key={currentVideo}
              className="w-full h-full object-cover"
              controls
              autoPlay={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={videos[currentVideo].src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
                <h3 className="text-white font-semibold text-sm">
                  {videos[currentVideo].title}
                </h3>
                <p className="text-white/80 text-xs">
                  {currentVideo + 1} of {videos.length} previews
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-xl font-bold text-center mb-6">
            Choose Any Video to Preview
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => handleVideoPlay(index)}
                className={`relative aspect-[9/16] rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                  currentVideo === index 
                    ? 'border-yellow-400 shadow-lg shadow-yellow-400/25' 
                    : 'border-border hover:border-yellow-400/50'
                }`}
              >
                <video
                  className="w-full h-full object-cover"
                  muted
                  preload="metadata"
                >
                  <source src={`${video.src}#t=1`} type="video/mp4" />
                </video>
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                    <FaPlay className="w-3 h-3 text-black ml-0.5" />
                  </div>
                </div>
                
                {/* Video Number */}
                <div className="absolute top-2 left-2">
                  <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                    #{video.id}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-8">
            <div className="mb-6">
              <FaFire className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready for All 15,000 Reels?
              </h2>
              <p className="text-lg text-muted-foreground mb-2">
                What you just saw is only a tiny sample!
              </p>
              <p className="text-muted-foreground">
                Get instant access to <span className="font-bold text-foreground">15,000 premium 4K reels</span>, 
                <span className="font-bold text-foreground"> 1,000 animations</span>, and 
                <span className="font-bold text-foreground"> 70 LUTs</span>
              </p>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-2xl text-muted-foreground line-through">$199</span>
                <span className="text-4xl font-bold text-green-600">$29</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  85% OFF
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Limited time offer - normally $199
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleCheckoutClick}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-full font-bold text-xl hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 animate-pulse-cta shadow-lg hover:shadow-xl hover:scale-105"
            >
              <FaFire className="inline w-5 h-5 mr-2" />
              Get Full Bundle Now - $29
            </button>

            {/* Trust Indicators */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <FaEye className="w-4 h-4" />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center gap-2">
                <span>•</span>
                <span>Commercial License</span>
              </div>
              <div className="flex items-center gap-2">
                <span>•</span>
                <span>30-Day Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
