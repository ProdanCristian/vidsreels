import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store for recent events (last 50 events)
let recentEvents: Array<{
  timestamp: string;
  platform: 'Facebook' | 'TikTok';
  eventName: string;
  eventId: string;
  success: boolean;
  host: string;
  userAgent: string;
  hasEmail: boolean;
  hasPhone: boolean;
  value?: string;
  currency?: string;
  error?: string;
}> = [];

// Function to add event to monitoring (call this from your tracking APIs)
export function logEventForMonitoring(eventData: {
  platform: 'Facebook' | 'TikTok';
  eventName: string;
  eventId: string;
  success: boolean;
  host: string;
  userAgent: string;
  hasEmail: boolean;
  hasPhone: boolean;
  value?: string;
  currency?: string;
  error?: string;
}) {
  const event = {
    timestamp: new Date().toISOString(),
    ...eventData
  };
  
  recentEvents.unshift(event);
  
  // Keep only last 50 events
  if (recentEvents.length > 50) {
    recentEvents = recentEvents.slice(0, 50);
  }
}

export async function GET(request: NextRequest) {
  try {
    // Simple authentication check
    const authHeader = request.headers.get('authorization');
    const expectedAuth = process.env.MONITOR_AUTH_KEY || 'monitor-key-123';
    
    if (authHeader !== `Bearer ${expectedAuth}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const platform = url.searchParams.get('platform');
    const limit = parseInt(url.searchParams.get('limit') || '20');

    let filteredEvents = recentEvents;
    
    if (platform && (platform === 'Facebook' || platform === 'TikTok')) {
      filteredEvents = recentEvents.filter(event => event.platform === platform);
    }

    const limitedEvents = filteredEvents.slice(0, limit);

    const stats = {
      total: recentEvents.length,
      facebook: recentEvents.filter(e => e.platform === 'Facebook').length,
      tiktok: recentEvents.filter(e => e.platform === 'TikTok').length,
      successful: recentEvents.filter(e => e.success).length,
      failed: recentEvents.filter(e => !e.success).length,
      lastHour: recentEvents.filter(e => {
        const eventTime = new Date(e.timestamp);
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        return eventTime > oneHourAgo;
      }).length
    };

    return NextResponse.json({
      stats,
      events: limitedEvents,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in monitor endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 