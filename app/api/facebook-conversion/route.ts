import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { logEventForMonitoring } from '@/lib/event-monitor';

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
      city,
      state,
      postalCode,
      currency = 'USD', 
      value, 
      orderId,
      userAgent,
      sourceUrl,
      contentName,
      contentCategory,
      interestLevel,
      actionType,
      location
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

    if (city) {
      userData.ct = [hashData(city)];
    }

    if (state) {
      userData.st = [hashData(state)];
    }

    if (postalCode) {
      userData.zp = [hashData(postalCode)];
    }

    // For events without customer data, we need to include client_user_agent
    // This is required for proper event matching
    if (userAgent) {
      userData.client_user_agent = userAgent;
    }

    // Add client IP if available (helps with matching)
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip');
    if (clientIp) {
      userData.client_ip_address = clientIp.split(',')[0].trim();
    }

    // Prepare custom data
    const customData: Record<string, string> = {};
    if (currency) customData.currency = currency;
    if (value) customData.value = value.toString();
    if (orderId) customData.order_id = orderId;
    if (contentName) customData.content_name = contentName;
    if (contentCategory) customData.content_category = contentCategory;
    if (interestLevel) customData.interest_level = interestLevel;
    if (actionType) customData.action_type = actionType;
    if (location) customData.button_location = location;

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

    // User agent is already added to userData above, no need to add it again here

    // Use same test event code for both localhost and production
    const testEventCode = process.env.FACEBOOK_TEST_EVENT_CODE;

    const payload = {
      data: [eventData],
      test_event_code: testEventCode || undefined,
    };

    // Build Facebook API URL
    const url = `https://graph.facebook.com/v21.0/${process.env.FACEBOOK_PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

    // Send to Facebook
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      // Log successful events (production-safe)
      const logData = {
        eventId,
        eventName,
        timestamp: new Date().toISOString(),
        host: request.headers.get('host') || '',
        userAgent: request.headers.get('user-agent')?.substring(0, 50) + '...',
        hasEmail: !!email,
        hasPhone: !!phone,
        value: customData.value,
        currency: customData.currency
      };
      
      console.log(`✅ Facebook ${eventName} event sent successfully:`, logData);
      
      // Add to monitoring
      logEventForMonitoring({
        platform: 'Facebook',
        eventName,
        eventId,
        success: true,
        host: logData.host,
        userAgent: logData.userAgent,
        hasEmail: !!email,
        hasPhone: !!phone,
        value: customData.value,
        currency: customData.currency
      });

      return NextResponse.json({ 
        success: true, 
        eventId,
        message: `${eventName} event tracked successfully`
      });
    } else {
      const errorData = {
        status: response.status,
        error: result,
        eventId,
        timestamp: new Date().toISOString()
      };
      
      console.error(`❌ Facebook ${eventName} event failed:`, errorData);
      
      // Add to monitoring
      logEventForMonitoring({
        platform: 'Facebook',
        eventName,
        eventId,
        success: false,
        host: request.headers.get('host') || '',
        userAgent: request.headers.get('user-agent')?.substring(0, 50) + '...',
        hasEmail: !!email,
        hasPhone: !!phone,
        value: customData.value,
        currency: customData.currency,
        error: JSON.stringify(result)
      });
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to track event',
          details: result 
        },
        { status: response.status }
      );
    }

  } catch (error) {
    console.error('Error sending Facebook conversion event:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 