import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const rawAccessToken = process.env.TIKTOK_ACCESS_TOKEN;
    const pixelId = process.env.TIKTOK_PIXEL_ID;
    const advertiserId = process.env.TIKTOK_ADVERTISER_ID;

    if (!rawAccessToken || !pixelId || !advertiserId) {
      return NextResponse.json({ 
        error: 'Missing TikTok configuration',
        missing: {
          access_token: !rawAccessToken,
          pixel_id: !pixelId,
          advertiser_id: !advertiserId
        }
      }, { status: 500 });
    }

    const accessToken = decodeURIComponent(rawAccessToken);
    const eventId = crypto.randomBytes(16).toString('hex');
    const eventTime = Math.floor(Date.now() / 1000);

    // Get the correct source URL from the request
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const sourceUrl = `${protocol}://${host}`;

    // Build the exact payload being sent to TikTok
    const payload = {
      event_source: "web",
      event_source_id: pixelId,
      data: [{
        event: 'ViewContent',
        event_time: eventTime,
        user: {
          ip: '127.0.0.1',
          user_agent: 'Test-Agent/1.0'
        },
        properties: {
          value: 29,
          currency: 'USD',
          content_name: 'Detailed TikTok Test Event'
        },
        page: {
          url: sourceUrl,
          referrer: ''
        }
      }]
    };

    const url = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

    console.log('🔍 Sending to TikTok:', {
      url,
      payload: JSON.stringify(payload, null, 2),
      pixel_id: pixelId,
      advertiser_id: advertiserId
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': accessToken,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    console.log('📥 TikTok Response:', {
      status: response.status,
      result
    });

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      eventId,
      pixelId,
      advertiserId,
      tiktokResponse: result,
      payload,
      instructions: [
        '1. Go to TikTok Events Manager',
        '2. Check your pixel: ' + pixelId,
        '3. Look for ViewContent events',
        '4. Event should appear within 1-2 minutes',
        '5. Note: TikTok doesn\'t have test events like Facebook'
      ]
    });

  } catch (error) {
    console.error('❌ TikTok test failed:', error);
    return NextResponse.json({ error: 'TikTok test failed', details: error }, { status: 500 });
  }
} 