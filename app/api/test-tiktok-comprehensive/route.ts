import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Running comprehensive TikTok server-side test...')
    
    const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`
    
    // Test 1: ViewContent Event
    console.log('📋 Test 1: Sending ViewContent event...')
    const viewContentResponse = await fetch(`${baseUrl}/api/tiktok-conversion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'ViewContent',
        contentName: 'VidsReels Bundle - Comprehensive Test',
        contentType: 'product',
        contentId: 'comprehensive_test_1',
        userAgent: 'TikTok-Test-Agent/1.0',
        sourceUrl: 'https://vidsreels.com/test-comprehensive'
      })
    })
    const viewContentResult = await viewContentResponse.json()
    
    // Wait 1 second between events
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Test 2: InitiateCheckout Event
    console.log('📋 Test 2: Sending InitiateCheckout event...')
    const checkoutResponse = await fetch(`${baseUrl}/api/tiktok-conversion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'InitiateCheckout',
        contentName: 'VidsReels Bundle - Checkout Test',
        contentType: 'product',
        contentId: 'comprehensive_test_2',
        userAgent: 'TikTok-Test-Agent/1.0',
        sourceUrl: 'https://vidsreels.com/test-checkout'
      })
    })
    const checkoutResult = await checkoutResponse.json()
    
    // Wait 1 second between events
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Test 3: Purchase Event (with value)
    console.log('📋 Test 3: Sending Purchase event...')
    const purchaseResponse = await fetch(`${baseUrl}/api/tiktok-conversion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'Purchase',
        contentName: 'VidsReels Bundle - Purchase Test',
        contentType: 'product',
        contentId: 'comprehensive_test_3',
        value: 29.00,
        currency: 'USD',
        userAgent: 'TikTok-Test-Agent/1.0',
        sourceUrl: 'https://vidsreels.com/test-purchase'
      })
    })
    const purchaseResult = await purchaseResponse.json()
    
    console.log('✅ Comprehensive TikTok test completed!')
    
    return NextResponse.json({
      success: true,
      message: 'Comprehensive TikTok server-side test completed',
      results: {
        viewContent: {
          success: viewContentResponse.ok,
          eventId: viewContentResult.eventId,
          response: viewContentResult
        },
        initiateCheckout: {
          success: checkoutResponse.ok,
          eventId: checkoutResult.eventId,
          response: checkoutResult
        },
        purchase: {
          success: purchaseResponse.ok,
          eventId: purchaseResult.eventId,
          response: purchaseResult
        }
      },
      instructions: [
        '🔍 How to verify these events worked:',
        '',
        '1. TikTok Events Manager → Your Pixel → Overview tab',
        '2. Look for event counts in the last hour/day',
        '3. Check "Events" section for ViewContent, InitiateCheckout, Purchase',
        '4. Server-side events may take 15-30 minutes to appear in reporting',
        '',
        '⚠️  Note: TikTok Test Events tab often doesn\'t show server-side events',
        '✅ But they still work for optimization and reporting!',
        '',
        '📊 Alternative verification methods:',
        '- Check TikTok Ads Manager for conversion data',
        '- Monitor campaign performance metrics',
        '- Use TikTok\'s attribution reporting'
      ]
    })
    
  } catch (error) {
    console.error('❌ Comprehensive TikTok test failed:', error)
    return NextResponse.json({
      success: false,
      error: 'Comprehensive test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 