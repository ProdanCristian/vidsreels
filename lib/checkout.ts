import { STRIPE_CONFIG } from './stripe'

export interface CheckoutOptions {
  priceId?: string
  quantity?: number
}

export async function redirectToCheckout(options: CheckoutOptions = {}) {
  try {
    const { priceId = STRIPE_CONFIG.BUNDLE_PRICE_ID, quantity = 1 } = options

    // Call our API to create a checkout session
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        quantity,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create checkout session')
    }

    if (data.url) {
      // Redirect to Stripe Checkout
      window.location.href = data.url
    } else {
      throw new Error('No checkout URL received')
    }
  } catch (error) {
    console.error('Checkout error:', error)
    
    // Show user-friendly error message
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.'
    alert(`Error: ${errorMessage}`)
    
    // You could replace this with a toast notification or modal
    // Example: toast.error(errorMessage)
  }
}

// Helper function to format price
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price)
}

// Helper function to calculate discount percentage
export function calculateDiscount(originalPrice: number, salePrice: number): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
} 