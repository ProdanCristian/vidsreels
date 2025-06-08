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
export function trackInitiateCheckout(value: number = 29.00, buttonLocation?: string) {
  return trackFacebookEvent({
    eventName: 'InitiateCheckout',
    currency: 'USD',
    value,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    contentName: buttonLocation ? `Checkout from ${buttonLocation}` : 'Checkout Initiated',
    contentCategory: 'Button Click',
  });
}

// Track custom button interactions with proper event type
export function trackButtonClick(buttonLocation: string, buttonText?: string, interestLevel: 'High' | 'Medium' | 'Low' = 'Medium') {
  // For high-intent checkout actions, use InitiateCheckout instead of Lead
  if (interestLevel === 'High' && (buttonText?.toLowerCase().includes('checkout') || buttonText?.toLowerCase().includes('buy') || buttonText?.toLowerCase().includes('get'))) {
    return trackFacebookEvent({
      eventName: 'InitiateCheckout',
      currency: 'USD',
      value: 29.00,
      contentName: buttonText || 'Checkout Button',
      contentCategory: 'Purchase Intent',
      actionType: 'Button Click',
      location: buttonLocation,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    });
  }
  
  return trackFacebookEvent({
    eventName: 'Lead',
    contentName: buttonText || 'Button Interaction',
    contentCategory: `${interestLevel} Interest Action`,
    interestLevel,
    actionType: 'Button Click',
    location: buttonLocation,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  });
}

// Track user interest levels based on actions
export function trackUserInterest(interestLevel: 'High' | 'Medium' | 'Low', action: string, location: string) {
  return trackFacebookEvent({
    eventName: 'ViewContent',
    contentName: `${interestLevel} Interest: ${action}`,
    contentCategory: `User Intent - ${location}`,
    interestLevel,
    actionType: action,
    location,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  });
}

// Track preview interactions (medium interest)
export function trackPreviewClick(location: string) {
  return trackButtonClick(location, 'Preview Reels', 'Medium');
}

// Track high-intent actions (ready to buy)
export function trackHighIntent(action: string, location: string) {
  return trackButtonClick(location, action, 'High');
}

// Track engagement actions (browsing, exploring)
export function trackEngagement(action: string, location: string) {
  return trackUserInterest('Low', action, location);
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
    value: 29.00,
    orderId,
  });
} 