import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { logEventForMonitoring } from '@/lib/event-monitor'

interface TikTokEventData {
  eventName: string
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  value?: number
  currency?: string
  contentId?: string
  contentType?: string
  contentName?: string
  searchString?: string
  userAgent?: string
  sourceUrl?: string
  ip?: string
}

// Hash user data for privacy (TikTok requires SHA256 hashing)
function hashUserData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex')
}

// Generate unique event ID
function generateEventId(): string {
  return crypto.randomBytes(16).toString('hex')
}

export async function POST(request: NextRequest) {
  try {
    const eventData: TikTokEventData = await request.json()
    
    // Get TikTok credentials from environment
    const rawAccessToken = process.env.TIKTOK_ACCESS_TOKEN
    const pixelId = process.env.TIKTOK_PIXEL_ID || 'D12M6FBC77U53580S2M0'
    const advertiserId = process.env.TIKTOK_ADVERTISER_ID
    
    if (!rawAccessToken) {
      console.error('TikTok Access Token not configured')
      return NextResponse.json({ error: 'TikTok Access Token not configured' }, { status: 500 })
    }

    if (!advertiserId) {
      console.error('TikTok Advertiser ID not configured')
      return NextResponse.json({ error: 'TikTok Advertiser ID not configured. Please add TIKTOK_ADVERTISER_ID to your .env.local file' }, { status: 500 })
    }

    // URL decode the access token if needed
    const accessToken = decodeURIComponent(rawAccessToken)
    


    // Get client IP and user agent
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    eventData.ip || '127.0.0.1'
    
    const userAgent = request.headers.get('user-agent') || eventData.userAgent || ''

    // Build the event payload according to TikTok Events API v1.3 format
    const eventId = generateEventId()
    const eventTime = Math.floor(Date.now() / 1000)

    // Prepare user data (hash sensitive information)
    const userData: Record<string, string> = {
      ip: clientIp,
      user_agent: userAgent,
    }

    if (eventData.email) {
      userData.email = hashUserData(eventData.email)
    }

    if (eventData.phone) {
      userData.phone = hashUserData(eventData.phone)
    }

    // Prepare event properties
    const properties: Record<string, string | number> = {
      value: eventData.value || 0,
      currency: eventData.currency || 'USD',
    }

    if (eventData.contentId) {
      properties.content_id = eventData.contentId
    }

    if (eventData.contentType) {
      properties.content_type = eventData.contentType
    }

    if (eventData.contentName) {
      properties.content_name = eventData.contentName
    }

    if (eventData.searchString) {
      properties.search_string = eventData.searchString
    }



    // Send to TikTok Events API with official format
    const requestBody = {
      event_source: "web",
      event_source_id: pixelId,
      data: [{
        event: eventData.eventName,
        event_time: eventTime,
        user: userData,
        properties: properties,
        page: {
          url: eventData.sourceUrl || 'https://vidsreels.com',
          referrer: ''
        }
      }]
    }



    const tiktokResponse = await fetch(`https://business-api.tiktok.com/open_api/v1.3/event/track/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': accessToken,
      },
      body: JSON.stringify(requestBody)
    })

    const result = await tiktokResponse.json()

    if (tiktokResponse.ok) {
      // Log successful events (production-safe)
      const logData = {
        eventId,
        eventName: eventData.eventName,
        timestamp: new Date().toISOString(),
        host: request.headers.get('host') || '',
        userAgent: request.headers.get('user-agent')?.substring(0, 50) + '...',
        hasEmail: !!eventData.email,
        hasPhone: !!eventData.phone,
        value: properties.value,
        currency: properties.currency
      };
      
      console.log(`✅ TikTok ${eventData.eventName} event sent successfully:`, logData);
      
      // Add to monitoring
      logEventForMonitoring({
        platform: 'TikTok',
        eventName: eventData.eventName,
        eventId,
        success: true,
        host: logData.host,
        userAgent: logData.userAgent,
        hasEmail: !!eventData.email,
        hasPhone: !!eventData.phone,
        value: properties.value?.toString(),
        currency: properties.currency?.toString()
      });

      return NextResponse.json({ 
        success: true, 
        eventId,
        message: `TikTok ${eventData.eventName} event tracked successfully`,
        result 
      })
    } else {
      const errorResult = await tiktokResponse.json()
      
      const errorData = {
        status: tiktokResponse.status,
        error: errorResult,
        eventId,
        timestamp: new Date().toISOString()
      };
      
      console.error(`❌ TikTok ${eventData.eventName} event failed:`, errorData);
      
      // Add to monitoring
      logEventForMonitoring({
        platform: 'TikTok',
        eventName: eventData.eventName,
        eventId,
        success: false,
        host: request.headers.get('host') || '',
        userAgent: request.headers.get('user-agent')?.substring(0, 50) + '...',
        hasEmail: !!eventData.email,
        hasPhone: !!eventData.phone,
        value: properties.value?.toString(),
        currency: properties.currency?.toString(),
        error: JSON.stringify(errorResult)
      });
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to track TikTok event',
          details: errorResult 
        },
        { status: tiktokResponse.status }
      )
    }

  } catch (error) {
    console.error('Error sending TikTok conversion event:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 