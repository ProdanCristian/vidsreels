// TikTok Events API tracking utilities
import { hashSHA256Client, generateEventId } from './hash-utils'

// Extend window interface for TikTok pixel
declare global {
  interface Window {
    ttq?: {
      identify: (data: Record<string, string>) => void;
      track: (event: string, data: Record<string, unknown>, options?: Record<string, string>) => void;
    };
  }
}

interface TikTokEventData {
  eventName: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  value?: number;
  currency?: string;
  contentId?: string;
  contentType?: string;
  contentName?: string;
  searchString?: string;
  userAgent?: string;
  sourceUrl?: string;
  ip?: string;
}

export async function trackTikTokEvent(eventData: TikTokEventData): Promise<boolean> {
  try {
    const response = await fetch('/api/tiktok-conversion', {
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
      console.log(`TikTok ${eventData.eventName} event tracked successfully:`, result.eventId);
      return true;
    } else {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error(`Failed to track TikTok ${eventData.eventName} event:`, {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      return false;
    }
  } catch (error) {
    console.error(`Error tracking TikTok ${eventData.eventName} event:`, error);
    return false;
  }
}

// Track when someone views the main page
export function trackTikTokViewContent() {
  return trackTikTokEvent({
    eventName: 'ViewContent',
    contentName: '15,000 Viral Reels Bundle',
    contentType: 'product',
    contentId: 'viral-reels-bundle',
    // No value/currency for ViewContent - only for actual purchases
  });
}

// Track when someone starts checkout
export function trackTikTokInitiateCheckout(value?: number, contentName?: string) {
  return trackTikTokEvent({
    eventName: 'InitiateCheckout',
    // No value/currency for InitiateCheckout - only for actual purchases
    contentName: contentName || 'VidsReels Bundle Checkout',
    contentType: 'product',
    contentId: 'viral-reels-bundle',
  });
}

// Track purchase completion (server-side)
export function trackTikTokPurchase(
  email?: string, 
  phone?: string,
  firstName?: string,
  lastName?: string,
  orderId?: string,
  value: number = 29.00
) {
  return trackTikTokEvent({
    eventName: 'Purchase',
    email,
    phone,
    firstName,
    lastName,
    currency: 'USD',
    value,
    contentName: '15,000 Viral Reels Bundle - Purchase Completed',
    contentType: 'product',
    contentId: orderId || 'viral-reels-bundle',
  });
}

// Removed redundant server-side tracking functions:
// - trackTikTokAddPaymentInfo
// - trackTikTokPlaceOrder  
// - trackTikTokSearch
// - trackTikTokAddToWishlist
// - trackTikTokCompleteRegistration
// Only keeping essential events: ViewContent, InitiateCheckout, Purchase

// ===== CLIENT-SIDE TRACKING FUNCTIONS =====
// These use the TikTok pixel directly in the browser

export async function trackTikTokViewContentClient() {
  if (typeof window !== 'undefined' && window.ttq) {
    const eventId = generateEventId()
    
    window.ttq.track('ViewContent', {
      contents: [
        {
          content_id: 'vidsreels_bundle_15k',
          content_type: 'product',
          content_name: 'VidsReels 15,000 Bundle'
        }
      ]
      // No value/currency for ViewContent - only for actual purchases
    }, {
      event_id: eventId
    })
  }
}

export async function trackTikTokInitiateCheckoutClient() {
  if (typeof window !== 'undefined' && window.ttq) {
    const eventId = generateEventId()
    
    window.ttq.track('InitiateCheckout', {
      contents: [
        {
          content_id: 'vidsreels_bundle_15k',
          content_type: 'product',
          content_name: 'VidsReels 15,000 Bundle'
        }
      ]
      // No value/currency for InitiateCheckout - only for actual purchases
    }, {
      event_id: eventId
    })
  }
}

export async function trackTikTokPurchaseClient(customerData?: {
  email?: string
  phone?: string
  externalId?: string
}) {
  if (typeof window !== 'undefined' && window.ttq) {
    try {
      const eventId = generateEventId()
      
      // Hash PII data if provided
      if (customerData?.email || customerData?.phone || customerData?.externalId) {
        const identifyData: Record<string, string> = {}
        
        if (customerData.email) {
          identifyData.email = await hashSHA256Client(customerData.email)
        }
        if (customerData.phone) {
          identifyData.phone_number = await hashSHA256Client(customerData.phone)
        }
        if (customerData.externalId) {
          identifyData.external_id = await hashSHA256Client(customerData.externalId)
        }
        
        window.ttq.identify(identifyData)
      }
      
      window.ttq.track('Purchase', {
        contents: [
          {
            content_id: 'vidsreels_bundle_15k',
            content_type: 'product',
            content_name: 'VidsReels 15,000 Bundle'
          }
        ],
        value: 29,
        currency: 'USD'
      }, {
        event_id: eventId
      })
    } catch (error) {
      console.error('Error tracking TikTok Purchase client-side:', error)
      
      // Fallback: Track without PII data if hashing fails
      try {
        const eventId = generateEventId()
        window.ttq.track('Purchase', {
          contents: [
            {
              content_id: 'vidsreels_bundle_15k',
              content_type: 'product',
              content_name: 'VidsReels 15,000 Bundle'
            }
          ],
          value: 29,
          currency: 'USD'
        }, {
          event_id: eventId
        })
      } catch (fallbackError) {
        console.error('Error with TikTok Purchase fallback tracking:', fallbackError)
      }
    }
  }
}

// Client-side TikTok button tracking functions
export async function trackTikTokButtonClickClient(buttonLocation: string, buttonText?: string) {
  if (typeof window !== 'undefined' && window.ttq) {
    const eventId = generateEventId()
    
    // For high-intent buttons (buy/checkout), use InitiateCheckout
    if (buttonText?.toLowerCase().includes('get') || 
        buttonText?.toLowerCase().includes('buy') || 
        buttonText?.toLowerCase().includes('checkout')) {
      window.ttq.track('InitiateCheckout', {
        contents: [
          {
            content_id: 'vidsreels_bundle_15k',
            content_type: 'product',
            content_name: buttonText || 'VidsReels Bundle'
          }
        ]
        // No value/currency for InitiateCheckout - only for actual purchases
      }, {
        event_id: eventId
      })
    } else {
      // For other buttons (preview, etc), use ViewContent
      window.ttq.track('ViewContent', {
        contents: [
          {
            content_id: 'vidsreels_bundle_15k',
            content_type: 'product',
            content_name: buttonText || 'Button Interaction'
          }
        ]
        // No value/currency for ViewContent - only for actual purchases
      }, {
        event_id: eventId
      })
    }
  }
} 