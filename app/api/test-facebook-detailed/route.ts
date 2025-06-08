import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
    const PIXEL_ID = process.env.FACEBOOK_PIXEL_ID;
    const TEST_EVENT_CODE = process.env.FACEBOOK_TEST_EVENT_CODE;

    if (!ACCESS_TOKEN || !PIXEL_ID) {
      return NextResponse.json({ error: 'Missing Facebook configuration' }, { status: 500 });
    }

    const eventId = crypto.randomBytes(16).toString('hex');
    const eventTime = Math.floor(Date.now() / 1000);

    // Get the correct source URL from the request
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const sourceUrl = `${protocol}://${host}`;

    // Build the exact payload being sent to Facebook
    const payload = {
      data: [{
        event_name: 'ViewContent',
        event_time: eventTime,
        event_id: eventId,
        action_source: 'website',
        event_source_url: sourceUrl,
        user_data: {
          client_ip_address: '127.0.0.1',
          client_user_agent: 'Test-Agent/1.0'
        },
        custom_data: {
          currency: 'USD',
          value: '29',
          content_name: 'Detailed Test Event'
        }
      }],
      test_event_code: TEST_EVENT_CODE
    };

    const url = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

    console.log('🔍 Sending to Facebook:', {
      url,
      payload: JSON.stringify(payload, null, 2),
      test_event_code: TEST_EVENT_CODE,
      pixel_id: PIXEL_ID
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    console.log('📥 Facebook Response:', {
      status: response.status,
      result
    });

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      eventId,
      testEventCode: TEST_EVENT_CODE,
      pixelId: PIXEL_ID,
      facebookResponse: result,
      payload,
      instructions: [
        '1. Go to Facebook Events Manager',
        '2. Click on your pixel: ' + PIXEL_ID,
        '3. Click "Test Events" tab',
        '4. Look for test code: ' + TEST_EVENT_CODE,
        '5. Should see ViewContent event with ID: ' + eventId,
        '6. Event should appear within 1-2 minutes'
      ]
    });

  } catch (error) {
    console.error('❌ Test failed:', error);
    return NextResponse.json({ error: 'Test failed', details: error }, { status: 500 });
  }
} 