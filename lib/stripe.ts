import { loadStripe } from '@stripe/stripe-js'

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export const STRIPE_CONFIG = {
  // Product configuration
  BUNDLE_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
  BUNDLE_PRICE: 29, // $29
  ORIGINAL_PRICE: 287, // $287
  CURRENCY: 'usd',
  
  // Product details
  PRODUCT_NAME: 'VidsReels - 15,000 Viral Reels Bundle',
  PRODUCT_DESCRIPTION: '15,000+ luxury lifestyle reels, LUTs, and animations for content creators',
  
  // Success/Cancel URLs
  SUCCESS_URL: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
  CANCEL_URL: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
} 