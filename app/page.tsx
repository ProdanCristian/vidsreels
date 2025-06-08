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
import { trackViewContent, trackInitiateCheckout } from '@/lib/facebook-tracking'
import { trackTikTokViewContent, trackTikTokInitiateCheckout } from '@/lib/tiktok-tracking'

const Page = () => {
  const { elementRef, isVisible } = useScrollTrigger({ threshold: 0.1, rootMargin: '0px 0px -200px 0px' })
  const { isVisible: isVisibleSimple } = useSimpleScrollTrigger('bonus-reveal')

  // Track ViewContent when page loads and handle checkout parameter
  useEffect(() => {
    // Track on both Facebook and TikTok
    trackViewContent()
    trackTikTokViewContent()
    
    // Check if user came from preview page with checkout intent
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('checkout') === 'true') {
        // Auto-trigger checkout for users coming from preview page
        setTimeout(() => {
          handleGetBundle('Preview Page Redirect')
        }, 500) // Small delay to ensure page is loaded
      }
    }
  }, [])

  const handleGetBundle = async (buttonLocation: string = 'Unknown') => {
    // Track InitiateCheckout on both Facebook and TikTok before redirecting
    await Promise.all([
      trackInitiateCheckout(29.00, buttonLocation),
      trackTikTokInitiateCheckout(29.00, `${buttonLocation} - VidsReels Bundle`)
    ])
    
    // Redirect to Stripe checkout
    await redirectToCheckout()
  }

  return (
    <div className="bg-background min-h-screen">
      <Hero onGetBundle={() => handleGetBundle('Hero Section')} />
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
      <Guarantee onGetBundle={() => handleGetBundle('Guarantee Section')} />
      <FAQMain />
      <Footer />
      
      {/* Sticky CTA Button */}
      <StickyCTAButton 
        isVisible={isVisible || isVisibleSimple} 
        onGetBundle={() => handleGetBundle('Sticky Button')}
      />
    </div>
  )
}

export default Page