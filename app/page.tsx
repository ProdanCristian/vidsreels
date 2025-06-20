'use client'

import React, { useEffect, useState } from 'react'
import Hero from '@/components/sections/hero'
import Niches from '@/components/sections/niches'
import ValueStack from '@/components/sections/value-stack'
import BonusReveal from '@/components/sections/bonus-reveal'
import Benefits from '@/components/sections/benefits'
import Testimonials from '@/components/sections/testimonials'
import Guarantee from '@/components/sections/guarantee'
import Footer from '@/components/sections/footer'
import Editing from '@/components/sections/editing'
import FAQMain from '@/components/sections/faq-main'
import HowItWorks from '@/components/sections/how-it-works'
import Prof from '@/components/sections/prof'
import StickyCTAButton from '@/components/ui/sticky-cta-button'
import { useScrollTrigger } from '@/hooks/useScrollTrigger'
import { useSimpleScrollTrigger } from '@/hooks/useSimpleScrollTrigger'
import { redirectToCheckout } from '@/lib/checkout'
import { trackInitiateCheckout, trackViewContent } from '@/lib/facebook-tracking'
import { trackTikTokInitiateCheckout, trackTikTokViewContentClient } from '@/lib/tiktok-tracking'


const Page = () => {
  const { elementRef, isVisible } = useScrollTrigger({ threshold: 0.1, rootMargin: '0px 0px -200px 0px' })
  const { isVisible: isVisibleSimple } = useSimpleScrollTrigger('bonus-reveal')
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)
  const [hasTrackedInitiateCheckout, setHasTrackedInitiateCheckout] = useState(false)

  // Track ViewContent when page loads and handle checkout parameter
  useEffect(() => {
    // Track ViewContent on both Facebook and TikTok (server-side for better privacy)
    trackViewContent()  // Facebook server-side
    trackTikTokViewContentClient()  // TikTok client-side
    
    // Check if user came from preview page with checkout intent
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('checkout') === 'true') {
        console.log('🔗 Auto-checkout triggered from URL parameter')
        // Auto-trigger checkout for users coming from preview page
        setTimeout(() => {
          handleGetBundle()
        }, 500) // Small delay to ensure page is loaded
      }
    }
  }, [])

  const handleGetBundle = async () => {
    try {
      setIsCheckoutLoading(true)
      
      // Prevent duplicate InitiateCheckout events
      if (!hasTrackedInitiateCheckout) {
        console.log('🔄 Tracking InitiateCheckout - first time only')
        setHasTrackedInitiateCheckout(true)
        
        // Track InitiateCheckout on both Facebook and TikTok (server-side only for accurate conversion tracking)
        await Promise.all([
          trackInitiateCheckout(),  // Facebook server-side (no value)
          trackTikTokInitiateCheckout()  // TikTok server-side (no value)
        ])
      } else {
        console.log('⚠️ InitiateCheckout already tracked - skipping duplicate')
      }
      
      // Redirect to Stripe checkout
      await redirectToCheckout()
    } catch (error) {
      console.error('Checkout error:', error)
      setIsCheckoutLoading(false) // Only set false on error, success will redirect away
    }
  }

  return (
    <div className="bg-background min-h-screen">
      <Hero onGetBundle={() => handleGetBundle()} isLoading={isCheckoutLoading} />
      <Prof />
      <Niches />
      <Editing />
      <HowItWorks />
      <div ref={elementRef}>
        <BonusReveal />
      </div>
      <Benefits />
      <Testimonials />
      <ValueStack />
      <Guarantee onGetBundle={() => handleGetBundle()} isLoading={isCheckoutLoading} />
      <FAQMain />
      <Footer />
      
      {/* Sticky CTA Button */}
      <StickyCTAButton 
        isVisible={isVisible || isVisibleSimple} 
        onGetBundle={() => handleGetBundle()}
        isLoading={isCheckoutLoading}
      />
    </div>
  )
}

export default Page