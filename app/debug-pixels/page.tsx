'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

declare global {
  interface Window {
    fbq?: ((action: string, event: string, data?: Record<string, unknown>) => void) & {
      version?: string;
      track: (event: string, data?: Record<string, unknown>) => void;
    };
    ttq?: {
      methods?: string[];
      track: (event: string, data?: Record<string, unknown>) => void;
    };
    TiktokAnalyticsObject?: string;
  }
}

export default function DebugPixelsPage() {
  const [pixelStatus, setPixelStatus] = useState({
    facebook: {
      loaded: false,
      version: '',
      pixelId: '',
      error: ''
    },
    tiktok: {
      loaded: false,
      pixelId: '',
      methods: [] as string[],
      error: ''
    }
  })

  const checkPixels = () => {
    // Check Facebook Pixel
    const facebookStatus = {
      loaded: false,
      version: '',
      pixelId: '',
      error: ''
    }

    try {
      if (typeof window !== 'undefined' && window.fbq) {
        facebookStatus.loaded = true
        facebookStatus.version = window.fbq.version || 'Unknown'
        facebookStatus.pixelId = '690110657249043'
      } else {
        facebookStatus.error = 'Facebook Pixel (fbq) not found on window object'
      }
    } catch (error) {
      facebookStatus.error = `Facebook Pixel error: ${error}`
    }

    // Check TikTok Pixel
    const tiktokStatus = {
      loaded: false,
      pixelId: '',
      methods: [] as string[],
      error: ''
    }

    try {
      if (typeof window !== 'undefined' && window.ttq) {
        tiktokStatus.loaded = true
        tiktokStatus.pixelId = 'D12M6FBC77U53580S2M0'
        tiktokStatus.methods = window.ttq.methods || []
      } else {
        tiktokStatus.error = 'TikTok Pixel (ttq) not found on window object'
      }
    } catch (error) {
      tiktokStatus.error = `TikTok Pixel error: ${error}`
    }

    setPixelStatus({
      facebook: facebookStatus,
      tiktok: tiktokStatus
    })
  }

  useEffect(() => {
    // Check immediately
    checkPixels()

    // Check again after a delay to allow scripts to load
    const timer = setTimeout(checkPixels, 2000)
    return () => clearTimeout(timer)
  }, [])

  const testFacebookEvent = () => {
    try {
      if (window.fbq) {
        window.fbq('track', 'ViewContent')
        alert('Facebook test event sent! Check browser console for details.')
      } else {
        alert('Facebook Pixel not loaded')
      }
    } catch (error) {
      alert(`Facebook test error: ${error}`)
    }
  }

  const testTikTokEvent = () => {
    try {
      if (window.ttq) {
        window.ttq.track('ViewContent', {
          content_name: 'Debug Test Event',
          value: 29,
          currency: 'USD'
        })
        alert('TikTok test event sent! Check browser console for details.')
      } else {
        alert('TikTok Pixel not loaded')
      }
    } catch (error) {
      alert(`TikTok test error: ${error}`)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Pixel Debug Dashboard</h1>
        <p className="text-muted-foreground">Check if Facebook and TikTok pixels are loading correctly</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Facebook Pixel Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Facebook Pixel
              <Badge variant={pixelStatus.facebook.loaded ? 'default' : 'destructive'}>
                {pixelStatus.facebook.loaded ? 'Loaded' : 'Not Loaded'}
              </Badge>
            </CardTitle>
            <CardDescription>Pixel ID: 690110657249043</CardDescription>
          </CardHeader>
          <CardContent>
            {pixelStatus.facebook.loaded ? (
              <div className="space-y-2">
                <p><strong>Version:</strong> {pixelStatus.facebook.version}</p>
                <p><strong>Status:</strong> ✅ Ready</p>
                <Button onClick={testFacebookEvent} className="w-full">
                  Test Facebook Event
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-red-600"><strong>Error:</strong> {pixelStatus.facebook.error}</p>
                <p className="text-sm text-muted-foreground">
                  Make sure the Facebook Pixel script is loaded in the page head.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* TikTok Pixel Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              TikTok Pixel
              <Badge variant={pixelStatus.tiktok.loaded ? 'default' : 'destructive'}>
                {pixelStatus.tiktok.loaded ? 'Loaded' : 'Not Loaded'}
              </Badge>
            </CardTitle>
            <CardDescription>Pixel ID: D12M6FBC77U53580S2M0</CardDescription>
          </CardHeader>
          <CardContent>
            {pixelStatus.tiktok.loaded ? (
              <div className="space-y-2">
                <p><strong>Methods:</strong> {pixelStatus.tiktok.methods.length} available</p>
                <p><strong>Status:</strong> ✅ Ready</p>
                <Button onClick={testTikTokEvent} className="w-full">
                  Test TikTok Event
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-red-600"><strong>Error:</strong> {pixelStatus.tiktok.error}</p>
                <p className="text-sm text-muted-foreground">
                  Make sure the TikTok Pixel script is loaded in the page head.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Refresh Button */}
      <div className="text-center">
        <Button onClick={checkPixels} variant="outline">
          Refresh Pixel Status
        </Button>
      </div>

      {/* Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use TikTok Pixel Helper</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>Install the TikTok Pixel Helper browser extension</li>
            <li>Visit this page or your main site</li>
            <li>Click the TikTok Pixel Helper icon in your browser</li>
            <li>You should see pixel ID: D12M6FBC77U53580S2M0</li>
            <li>If not detected, check the console for errors</li>
          </ol>
          
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm">
              <strong>Note:</strong> If the TikTok Pixel Helper still doesn&apos;t detect the pixel, 
              try refreshing the page or checking in an incognito window. Sometimes browser 
              extensions or ad blockers can interfere with pixel detection.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 