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

// ===== SERVER-SIDE ONLY TRACKING FUNCTIONS =====
// All Facebook events now use Conversions API (server-side) for better privacy and accuracy

// Track page views server-side
export function trackViewContent(contentName?: string) {
  return trackFacebookEvent({
    eventName: 'ViewContent',
    contentName: contentName || '15,000 Viral Reels Bundle',
    contentCategory: 'Digital Products',
  });
}

// Track when someone starts checkout
export function trackInitiateCheckout(value?: number, buttonLocation?: string) {
  return trackFacebookEvent({
    eventName: 'InitiateCheckout',
    // No value/currency for InitiateCheckout - only for actual purchases
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    contentName: buttonLocation ? `Initiate Checkout from ${buttonLocation}` : 'Initiate Checkout',
    contentCategory: 'Initiate Checkout',
  });
}

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
    value: 14.99,
    orderId,
  });
} 