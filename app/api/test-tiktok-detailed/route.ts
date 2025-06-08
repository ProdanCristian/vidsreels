import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Hash user data for privacy (TikTok requires SHA256 hashing)
function hashUserData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

// Generate unique event ID
function generateEventId(): string {
  return crypto.randomBytes(16).toString('hex');
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Testing TikTok server-side event tracking...');
    
    // Get TikTok credentials from environment
    const rawAccessToken = process.env.TIKTOK_ACCESS_TOKEN;
    const pixelId = process.env.TIKTOK_PIXEL_ID || 'D12M6FBC77U53580S2M0';
    const advertiserId = process.env.TIKTOK_ADVERTISER_ID;
    const testEventCode = process.env.TIKTOK_TEST_EVENT_CODE;
    
    console.log('📋 Environment check:');
    console.log('- Access Token:', rawAccessToken ? '✅ Present' : '❌ Missing');
    console.log('- Pixel ID:', pixelId);
    console.log('- Advertiser ID:', advertiserId ? '✅ Present' : '❌ Missing');
    console.log('- Test Event Code:', testEventCode ? '✅ Present' : '❌ Missing');
    
    if (!rawAccessToken) {
      return NextResponse.json({ error: 'TikTok Access Token not configured' }, { status: 500 });
    }

    if (!advertiserId) {
      return NextResponse.json({ error: 'TikTok Advertiser ID not configured' }, { status: 500 });
    }

    // URL decode the access token if needed
    const accessToken = decodeURIComponent(rawAccessToken);
    
    // Get client IP and user agent
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    '127.0.0.1';
    
    const userAgent = request.headers.get('user-agent') || 'VidsReels-Test-Agent';

    // Build the event payload according to TikTok Events API v1.3 format
    const eventId = generateEventId();
    const eventTime = Math.floor(Date.now() / 1000);

    // Test with a simple ViewContent event
    const userData: Record<string, string> = {
      ip: clientIp,
      user_agent: userAgent,
    };

    // Add test email for better tracking
    userData.email = hashUserData('test@vidsreels.com');

    // Prepare event properties
    const properties: Record<string, string | number> = {
      content_type: 'product',
      content_id: 'vidsreels_test_bundle',
      content_name: 'TikTok Server-Side Test Event'
    };

    // Build request body with test event code if available
    const requestBody: Record<string, unknown> = {
      event_source: "web",
      event_source_id: pixelId,
      data: [{
        event: 'ViewContent',
        event_time: eventTime,
        user: userData,
        properties: properties,
        page: {
          url: 'https://vidsreels.com/test',
          referrer: ''
        }
      }]
    };

    // Add test event code if available (for development/testing)
    if (testEventCode) {
      requestBody.test_event_code = testEventCode;
      console.log('🧪 Using test event code:', testEventCode);
    }

    console.log('📤 Sending request to TikTok:');
    console.log('- URL: https://business-api.tiktok.com/open_api/v1.3/event/track/');
    console.log('- Event ID:', eventId);
    console.log('- Event Time:', eventTime);
    console.log('- Request Body:', JSON.stringify(requestBody, null, 2));

    const tiktokResponse = await fetch(`https://business-api.tiktok.com/open_api/v1.3/event/track/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': accessToken,
      },
      body: JSON.stringify(requestBody)
    });

    const result = await tiktokResponse.json();

    console.log('📥 TikTok Response:');
    console.log('- Status:', tiktokResponse.status);
    console.log('- Response:', JSON.stringify(result, null, 2));

    if (tiktokResponse.ok) {
      console.log('✅ TikTok test event sent successfully!');
      
      return NextResponse.json({ 
        success: true, 
        eventId,
        message: 'TikTok test event tracked successfully',
        response: result,
        requestBody,
        debug: {
          pixelId,
          advertiserId,
          hasTestEventCode: !!testEventCode,
          eventTime,
          clientIp,
          userAgent: userAgent.substring(0, 50) + '...'
        }
      });
    } else {
      console.error('❌ TikTok test event failed:', result);
      
      return NextResponse.json({
        success: false,
        error: 'Failed to track TikTok test event',
        details: result,
        requestBody,
        debug: {
          pixelId,
          advertiserId,
          hasTestEventCode: !!testEventCode,
          eventTime,
          clientIp,
          userAgent: userAgent.substring(0, 50) + '...'
        }
      }, { status: tiktokResponse.status });
    }

  } catch (error) {
    console.error('💥 Error testing TikTok event:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 