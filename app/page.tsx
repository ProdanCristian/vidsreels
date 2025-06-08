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
import { trackViewContent, trackInitiateCheckout, trackFacebookViewContentClient, trackFacebookInitiateCheckoutClient } from '@/lib/facebook-tracking'
import { trackTikTokViewContent, trackTikTokInitiateCheckout, trackTikTokViewContentClient, trackTikTokInitiateCheckoutClient } from '@/lib/tiktok-tracking'

const Page = () => {
  const { elementRef, isVisible } = useScrollTrigger({ threshold: 0.1, rootMargin: '0px 0px -200px 0px' })
  const { isVisible: isVisibleSimple } = useSimpleScrollTrigger('bonus-reveal')

  // Track ViewContent when page loads and handle checkout parameter
  useEffect(() => {
    // Track ViewContent on both Facebook and TikTok (server-side + client-side)
    trackViewContent()  // Facebook server-side
    trackFacebookViewContentClient()  // Facebook client-side
    trackTikTokViewContent()  // TikTok server-side
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
    // Track InitiateCheckout once on both Facebook and TikTok (server-side + client-side)
    await Promise.all([
      trackInitiateCheckout(29.00),  // Facebook server-side
      trackFacebookInitiateCheckoutClient(),  // Facebook client-side
      trackTikTokInitiateCheckout(29.00, 'VidsReels Bundle'),  // TikTok server-side
      trackTikTokInitiateCheckoutClient()  // TikTok client-side
    ])
    
    // Redirect to Stripe checkout
    await redirectToCheckout()
  }

  return (
    <div className="bg-background min-h-screen">
      <Hero onGetBundle={() => handleGetBundle()} />
      <Niches />
      <Editing />
      <HowItWorks />
      <div ref={elementRef}>
        <BonusReveal />
      </div>
      <Prof />
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