'use client'

import React, { useEffect } from 'react'
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
import { trackInitiateCheckout, trackFacebookViewContentClient } from '@/lib/facebook-tracking'
import { trackTikTokInitiateCheckout, trackTikTokViewContentClient } from '@/lib/tiktok-tracking'


const Page = () => {
  const { elementRef, isVisible } = useScrollTrigger({ threshold: 0.1, rootMargin: '0px 0px -200px 0px' })
  const { isVisible: isVisibleSimple } = useSimpleScrollTrigger('bonus-reveal')

  // Track ViewContent when page loads and handle checkout parameter
  useEffect(() => {
    // Track ViewContent on both Facebook and TikTok (client-side only for better user interaction data)
    trackFacebookViewContentClient()  // Facebook client-side
    trackTikTokViewContentClient()  // TikTok client-side
    
    // Check if user came from preview page with checkout intent
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('checkout') === 'true') {
        // Auto-trigger checkout for users coming from preview page
        setTimeout(() => {
          handleGetBundle()
        }, 500) // Small delay to ensure page is loaded
      }
    }
  }, [])

  const handleGetBundle = async () => {
    // Track InitiateCheckout on both Facebook and TikTok (server-side only for accurate conversion tracking)
    await Promise.all([
      trackInitiateCheckout(),  // Facebook server-side (no value)
      trackTikTokInitiateCheckout()  // TikTok server-side (no value)
    ])
    
    // Redirect to Stripe checkout
    await redirectToCheckout()
  }

  return (
    <div className="bg-background min-h-screen">
      <Hero onGetBundle={() => handleGetBundle()} />
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
      <Guarantee onGetBundle={() => handleGetBundle()} />
      <FAQMain />
      <Footer />
      
      {/* Sticky CTA Button */}
      <StickyCTAButton 
        isVisible={isVisible || isVisibleSimple} 
        onGetBundle={() => handleGetBundle()}
      />
    </div>
  )
}

export default Page