// TikTok Events API tracking utilities
import { generateEventId } from './hash-utils'

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

// Removed server-side ViewContent tracking - handled by browser-based tracking for better user interaction data

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
    eventName: 'CompletePayment',
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
// Server-side events: InitiateCheckout, Purchase (ViewContent handled client-side for better user interaction data)

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

// Removed client-side InitiateCheckout - handled by server-side for accurate conversion tracking

// Removed client-side Purchase - handled by server-side for accurate conversion tracking and revenue attribution

// Client-side TikTok button tracking functions - optimized like Facebook
export async function trackTikTokButtonClickClient(buttonLocation: string, buttonText?: string) {
  if (typeof window !== 'undefined' && window.ttq) {
    const eventId = generateEventId()
    
    // For high-intent buttons (buy/checkout), use Contact event (TikTok's equivalent to Facebook Lead)
    if (buttonText?.toLowerCase().includes('get') || 
        buttonText?.toLowerCase().includes('buy') || 
        buttonText?.toLowerCase().includes('checkout')) {
      window.ttq.track('Contact', {
        contents: [
          {
            content_id: 'vidsreels_bundle_15k_high_intent',
            content_type: 'product',
            content_name: buttonText || 'High Intent Button Click'
          }
        ],
        description: 'High Intent Button Click'
        // No value/currency - button interactions don't have monetary value
      }, {
        event_id: eventId
      })
    } else {
      // For other buttons (preview, explore, etc), use ViewContent with user interest category
      window.ttq.track('ViewContent', {
        contents: [
          {
            content_id: 'vidsreels_bundle_15k_interest',
            content_type: 'product',
            content_name: buttonText || 'User Interest Button'
          }
        ],
        description: 'User Interest'
        // No value/currency - button interactions don't have monetary value
      }, {
        event_id: eventId
      })
    }
  }
} 