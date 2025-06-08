import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const host = request.headers.get('host') || '';
    const isLocalhost = host.includes('localhost');
    
    const debugInfo = {
      environment: isLocalhost ? 'localhost' : 'production',
      host,
      facebook_config: {
        pixel_id: process.env.FACEBOOK_PIXEL_ID || 'NOT_SET',
        has_access_token: !!process.env.FACEBOOK_ACCESS_TOKEN,
        test_event_code_localhost: process.env.FACEBOOK_TEST_EVENT_CODE || 'NOT_SET',
        test_event_code_prod: process.env.FACEBOOK_TEST_EVENT_CODE_PROD || 'NOT_SET',
        active_test_code: isLocalhost 
          ? process.env.FACEBOOK_TEST_EVENT_CODE 
          : process.env.FACEBOOK_TEST_EVENT_CODE_PROD
      },
      api_url: `https://graph.facebook.com/v21.0/${process.env.FACEBOOK_PIXEL_ID}/events`,
      recommendations: [] as string[]
    };

    // Add recommendations based on config
    if (!process.env.FACEBOOK_PIXEL_ID) {
      debugInfo.recommendations.push('❌ FACEBOOK_PIXEL_ID is not set');
    }
    
    if (!process.env.FACEBOOK_ACCESS_TOKEN) {
      debugInfo.recommendations.push('❌ FACEBOOK_ACCESS_TOKEN is not set');
    }
    
    if (!process.env.FACEBOOK_TEST_EVENT_CODE) {
      debugInfo.recommendations.push('❌ FACEBOOK_TEST_EVENT_CODE is not set for localhost testing');
    }
    
    if (!debugInfo.facebook_config.active_test_code) {
      debugInfo.recommendations.push('⚠️ No test event code active for current environment');
      debugInfo.recommendations.push('💡 Events will go to live pixel instead of test events');
    }

    if (debugInfo.recommendations.length === 0) {
      debugInfo.recommendations.push('✅ Configuration looks good!');
      debugInfo.recommendations.push('💡 If test events still not showing, check Facebook Events Manager Test Events tab');
      debugInfo.recommendations.push('💡 Make sure you\'re looking at the correct pixel ID: ' + process.env.FACEBOOK_PIXEL_ID);
    }

    return NextResponse.json(debugInfo, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Debug endpoint error', details: error },
      { status: 500 }
    );
  }
} 