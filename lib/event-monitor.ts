// Event monitoring utilities

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

// Function to add event to monitoring
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

// Function to get recent events
export function getRecentEvents(platform?: 'Facebook' | 'TikTok', limit: number = 20) {
  let filteredEvents = recentEvents;
  
  if (platform) {
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

  return {
    stats,
    events: limitedEvents,
    timestamp: new Date().toISOString()
  };
} 