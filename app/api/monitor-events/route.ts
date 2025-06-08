import { NextRequest, NextResponse } from 'next/server';
import { getRecentEvents } from '@/lib/event-monitor';

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
    const platform = url.searchParams.get('platform') as 'Facebook' | 'TikTok' | null;
    const limit = parseInt(url.searchParams.get('limit') || '20');

    const result = getRecentEvents(platform || undefined, limit);

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error in monitor endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 