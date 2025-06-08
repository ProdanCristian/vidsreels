import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})

export async function POST(request: NextRequest) {
  try {
    const { action, priceId, quantity = 1, sessionId } = await request.json()

    // Handle getting session data
    if (action === 'get_session') {
      if (!sessionId) {
        return NextResponse.json(
          { error: 'Session ID is required' },
          { status: 400 }
        )
      }

      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['customer']
      })
      return NextResponse.json(session)
    }

    // Handle creating checkout session
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
      automatic_tax: { enabled: true },
      billing_address_collection: 'required',
      customer_creation: 'always',
      metadata: {
        product: 'VidsReels Bundle',
        version: '1.0',
      },
      custom_text: {
        submit: {
          message: 'Get instant access to 15,000+ viral reels, LUTs, and animations!',
        },
      },
    })

    if (!session.url) {
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    console.error('Stripe checkout error:', err)
    const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
} 