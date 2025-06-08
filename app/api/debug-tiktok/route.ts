import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const host = request.headers.get('host') || '';
    const isLocalhost = host.includes('localhost');
    
    const debugInfo = {
      environment: isLocalhost ? 'localhost' : 'production',
      host,
      tiktok_config: {
        pixel_id: process.env.TIKTOK_PIXEL_ID || 'NOT_SET',
        has_access_token: !!process.env.TIKTOK_ACCESS_TOKEN,
        advertiser_id: process.env.TIKTOK_ADVERTISER_ID || 'NOT_SET',
        access_token_preview: process.env.TIKTOK_ACCESS_TOKEN ? 
          process.env.TIKTOK_ACCESS_TOKEN.substring(0, 20) + '...' : 'NOT_SET'
      },
      api_url: 'https://business-api.tiktok.com/open_api/v1.3/event/track/',
      recommendations: [] as string[]
    };

    // Add recommendations based on config
    if (!process.env.TIKTOK_PIXEL_ID) {
      debugInfo.recommendations.push('❌ TIKTOK_PIXEL_ID is not set');
    }
    
    if (!process.env.TIKTOK_ACCESS_TOKEN) {
      debugInfo.recommendations.push('❌ TIKTOK_ACCESS_TOKEN is not set');
    }
    
    if (!process.env.TIKTOK_ADVERTISER_ID) {
      debugInfo.recommendations.push('❌ TIKTOK_ADVERTISER_ID is not set');
      debugInfo.recommendations.push('💡 This will cause TikTok API calls to fail');
    }

    if (debugInfo.recommendations.length === 0) {
      debugInfo.recommendations.push('✅ TikTok configuration looks good!');
      debugInfo.recommendations.push('💡 TikTok events should be working properly');
    }

    return NextResponse.json(debugInfo, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Debug endpoint error', details: error },
      { status: 500 }
    );
  }
} 