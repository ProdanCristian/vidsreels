'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface EventData {
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
}

interface MonitorData {
  stats: {
    total: number;
    facebook: number;
    tiktok: number;
    successful: number;
    failed: number;
    lastHour: number;
  };
  events: EventData[];
  timestamp: string;
}

export default function MonitorPage() {
  const [data, setData] = useState<MonitorData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authKey, setAuthKey] = useState('monitor-key-123')
  const [platform, setPlatform] = useState<'all' | 'Facebook' | 'TikTok'>('all')

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams({ limit: '20' })
      if (platform !== 'all') {
        params.append('platform', platform)
      }
      
      const response = await fetch(`/api/monitor-events?${params}`, {
        headers: {
          'Authorization': `Bearer ${authKey}`
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }, [platform, authKey])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">VidsReels Server Events Monitor</h1>
        <p className="text-muted-foreground">Real-time tracking of Facebook and TikTok conversion events</p>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Auth Key"
            value={authKey}
            onChange={(e) => setAuthKey(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
        </div>
        
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value as 'all' | 'Facebook' | 'TikTok')}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">All Platforms</option>
          <option value="Facebook">Facebook Only</option>
          <option value="TikTok">TikTok Only</option>
        </select>
        
        <Button onClick={fetchData} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh'}
        </Button>
      </div>

      {error && (
        <Card className="mb-6 border-red-200">
          <CardContent className="pt-6">
            <p className="text-red-600">Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {data && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{data.stats.total}</div>
                <p className="text-xs text-muted-foreground">Total Events</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600">{data.stats.facebook}</div>
                <p className="text-xs text-muted-foreground">Facebook</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-black">{data.stats.tiktok}</div>
                <p className="text-xs text-muted-foreground">TikTok</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">{data.stats.successful}</div>
                <p className="text-xs text-muted-foreground">Successful</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-red-600">{data.stats.failed}</div>
                <p className="text-xs text-muted-foreground">Failed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-orange-600">{data.stats.lastHour}</div>
                <p className="text-xs text-muted-foreground">Last Hour</p>
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>
                Last updated: {formatTimestamp(data.timestamp)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data.events.length === 0 ? (
                <p className="text-muted-foreground">No events found</p>
              ) : (
                <div className="space-y-4">
                  {data.events.map((event, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={event.platform === 'Facebook' ? 'default' : 'secondary'}>
                            {event.platform}
                          </Badge>
                          <Badge variant={event.success ? 'default' : 'destructive'}>
                            {event.success ? '✅ Success' : '❌ Failed'}
                          </Badge>
                          <span className="font-semibold">{event.eventName}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatTimestamp(event.timestamp)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="font-medium">Event ID:</span>
                          <br />
                          <span className="font-mono text-xs">{event.eventId.substring(0, 8)}...</span>
                        </div>
                        
                        <div>
                          <span className="font-medium">Host:</span>
                          <br />
                          <span>{event.host}</span>
                        </div>
                        
                        <div>
                          <span className="font-medium">User Data:</span>
                          <br />
                          <span>Email: {event.hasEmail ? '✅' : '❌'}, Phone: {event.hasPhone ? '✅' : '❌'}</span>
                        </div>
                        
                        {event.value && (
                          <div>
                            <span className="font-medium">Value:</span>
                            <br />
                            <span>{event.value} {event.currency || 'USD'}</span>
                          </div>
                        )}
                      </div>
                      
                      {event.error && (
                        <div className="mt-2 p-2 bg-red-50 rounded text-sm">
                          <span className="font-medium text-red-700">Error:</span>
                          <br />
                          <span className="text-red-600">{event.error}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
} 