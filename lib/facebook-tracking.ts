// Facebook Conversions API tracking utilities

interface FacebookEventData {
  eventName: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  currency?: string;
  value?: number;
  orderId?: string;
  contentName?: string;
  contentCategory?: string;
  userAgent?: string;
  sourceUrl?: string;
  interestLevel?: string;
  actionType?: string;
  location?: string;
}

export async function trackFacebookEvent(eventData: FacebookEventData): Promise<boolean> {
  // Track all traffic - Facebook's attribution system will handle matching

  try {
    const response = await fetch('/api/facebook-conversion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...eventData,
        userAgent: eventData.userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : ''),
        sourceUrl: eventData.sourceUrl || (typeof window !== 'undefined' ? window.location.href : ''),
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`Facebook ${eventData.eventName} event tracked successfully:`, result.eventId);
      return true;
    } else {
      console.error(`Failed to track Facebook ${eventData.eventName} event`);
      return false;
    }
  } catch (error) {
    console.error(`Error tracking Facebook ${eventData.eventName} event:`, error);
    return false;
  }
}

// Track when someone views the main page
export function trackViewContent() {
  return trackFacebookEvent({
    eventName: 'ViewContent',
    contentName: '15,000 Viral Reels Bundle',
    contentCategory: 'Digital Products',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  });
}

// Track when someone starts checkout
export function trackInitiateCheckout(value?: number, buttonLocation?: string) {
  return trackFacebookEvent({
    eventName: 'InitiateCheckout',
    // No value/currency for InitiateCheckout - only for actual purchases
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    contentName: buttonLocation ? `Initiate Checkout from ${buttonLocation}` : 'Initiate Checkout',
    contentCategory: 'Checkout Intent',
  });
}

// ===== CLIENT-SIDE TRACKING FUNCTIONS =====
// These use the Facebook pixel directly in the browser

declare global {
  interface Window {
    fbq?: ((action: string, event: string, data?: Record<string, unknown>) => void) & {
      version?: string;
    };
  }
}

// Client-side Facebook tracking for button interactions
export function trackFacebookViewContentClient() {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: '15,000 Viral Reels Bundle',
      content_category: 'Digital Products'
      // No value/currency for ViewContent - only for actual purchases
    })
  }
}

export function trackFacebookInitiateCheckoutClient() {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: 'VidsReels Bundle Checkout',
      content_category: 'Purchase Intent'
      // No value/currency for InitiateCheckout - only for actual purchases
    })
  }
}

export function trackFacebookButtonClickClient(buttonLocation: string, buttonText?: string) {
  if (typeof window !== 'undefined' && window.fbq) {
    // For high-intent buttons (buy/checkout), use InitiateCheckout
    if (buttonText?.toLowerCase().includes('get') || 
        buttonText?.toLowerCase().includes('buy') || 
        buttonText?.toLowerCase().includes('checkout')) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: buttonText || 'Checkout Button',
        content_category: 'Purchase Intent'
        // No value/currency - only for actual purchases
      })
    } else {
      // For other buttons (preview, etc), use Lead
      window.fbq('track', 'Lead', {
        content_name: buttonText || 'Button Interaction',
        content_category: 'User Interest'
      })
    }
  }
}

export function trackFacebookPurchaseClient() {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      value: 29,
      currency: 'USD',
      content_name: '15,000 Viral Reels Bundle - Purchase Completed',
      content_category: 'Digital Product Purchase'
    })
  }
}

// Removed redundant server-side button tracking functions to prevent duplicate server-side events
// Only keeping essential server-side events: ViewContent, InitiateCheckout, Purchase

// Track purchase completion
export function trackPurchase(
  email?: string, 
  firstName?: string, 
  lastName?: string, 
  orderId?: string,
  phone?: string,
  country?: string,
  city?: string,
  state?: string,
  postalCode?: string
) {
  return trackFacebookEvent({
    eventName: 'Purchase',
    email,
    firstName,
    lastName,
    phone,
    country,
    city,
    state,
    postalCode,
    currency: 'USD',
    value: 29.00,
    orderId,
  });
} 