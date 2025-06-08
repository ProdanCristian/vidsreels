import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const FACEBOOK_API_VERSION = 'v21.0';
const PIXEL_ID = process.env.FACEBOOK_PIXEL_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

// Hash function for PII data
function hashData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

// Generate event ID for deduplication
function generateEventId(): string {
  return crypto.randomBytes(16).toString('hex');
}

export async function POST(request: NextRequest) {
  try {
    if (!ACCESS_TOKEN) {
      console.error('Facebook Access Token not configured');
      return NextResponse.json(
        { error: 'Facebook Access Token not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { 
      eventName, 
      email, 
      firstName, 
      lastName, 
      phone, 
      country, 
      currency = 'USD', 
      value, 
      orderId,
      userAgent,
      sourceUrl 
    } = body;

    // Validate required fields
    if (!eventName) {
      return NextResponse.json(
        { error: 'Event name is required' },
        { status: 400 }
      );
    }

    const eventTime = Math.floor(Date.now() / 1000);
    const eventId = generateEventId();

    // Prepare user data with hashed PII
    const userData: Record<string, string[] | string> = {};
    
    if (email) {
      userData.em = [hashData(email)];
    }
    
    if (phone) {
      userData.ph = [hashData(phone.replace(/\D/g, ''))]; // Remove non-digits and hash
    }
    
    if (firstName) {
      userData.fn = [hashData(firstName)];
    }
    
    if (lastName) {
      userData.ln = [hashData(lastName)];
    }
    
    if (country) {
      userData.country = [hashData(country)];
    }

    // Prepare custom data
    const customData: Record<string, string> = {};
    if (currency) customData.currency = currency;
    if (value) customData.value = value.toString();
    if (orderId) customData.order_id = orderId;

    // Build the event payload
    const eventData = {
      event_name: eventName,
      event_time: eventTime,
      event_id: eventId,
      action_source: 'website',
      event_source_url: sourceUrl || request.headers.get('referer') || '',
      user_data: userData,
      custom_data: customData,
    };

    // Add user agent if provided
    if (userAgent) {
      eventData.user_data.client_user_agent = userAgent;
    }

    const payload = {
      data: [eventData],
      test_event_code: process.env.FACEBOOK_TEST_EVENT_CODE || undefined,
    };

    // Send to Facebook Conversions API
    const facebookUrl = `https://graph.facebook.com/${FACEBOOK_API_VERSION}/${PIXEL_ID}/events`;
    
    const response = await fetch(facebookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Facebook API Error:', result);
      return NextResponse.json(
        { error: 'Failed to send event to Facebook', details: result },
        { status: response.status }
      );
    }

    console.log('Facebook Conversion Event sent successfully:', {
      eventName,
      eventId,
      email: email ? `${email.substring(0, 3)}***` : 'not provided',
      result
    });

    return NextResponse.json({
      success: true,
      eventId,
      facebookResponse: result,
    });

  } catch (error) {
    console.error('Error sending Facebook conversion event:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 