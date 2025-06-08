// TikTok Events API tracking utilities

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
    value: 29.00,
    currency: 'USD',
  });
}

// Track when someone starts checkout
export function trackTikTokInitiateCheckout(value: number = 29.00, contentName?: string) {
  return trackTikTokEvent({
    eventName: 'InitiateCheckout',
    currency: 'USD',
    value,
    contentName: contentName || 'VidsReels Bundle Checkout',
    contentType: 'product',
    contentId: 'viral-reels-bundle',
  });
}

// Track when someone adds payment info
export function trackTikTokAddPaymentInfo(value: number = 29.00) {
  return trackTikTokEvent({
    eventName: 'AddPaymentInfo',
    currency: 'USD',
    value,
    contentName: '15,000 Viral Reels Bundle',
    contentType: 'product',
    contentId: 'viral-reels-bundle',
  });
}

// Track when someone places an order
export function trackTikTokPlaceOrder(value: number = 29.00, orderId?: string) {
  return trackTikTokEvent({
    eventName: 'PlaceAnOrder',
    currency: 'USD',
    value,
    contentName: '15,000 Viral Reels Bundle',
    contentType: 'product',
    contentId: orderId || 'viral-reels-bundle',
  });
}

// Track purchase completion
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

// Track search events (if you add search functionality)
export function trackTikTokSearch(searchString: string) {
  return trackTikTokEvent({
    eventName: 'Search',
    searchString,
    contentName: 'VidsReels Search',
    contentType: 'search',
  });
}

// Track when someone adds to wishlist (if you add this feature)
export function trackTikTokAddToWishlist(contentName: string) {
  return trackTikTokEvent({
    eventName: 'AddToWishlist',
    contentName,
    contentType: 'product',
    value: 29.00,
    currency: 'USD',
  });
}

// Track registration/signup events
export function trackTikTokCompleteRegistration(email?: string) {
  return trackTikTokEvent({
    eventName: 'CompleteRegistration',
    email,
    contentName: 'VidsReels Account Registration',
    contentType: 'registration',
  });
} 