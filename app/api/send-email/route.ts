import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.zoho.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // your email
    pass: process.env.SMTP_PASS, // your email password
  },
  tls: {
    rejectUnauthorized: false // Accept self-signed certificates
  },
  debug: true, // Enable debug output
  logger: true // Log to console
})

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Retrieve the session from Stripe to get customer email
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer']
    })

    if (!session.customer_details?.email) {
      return NextResponse.json(
        { error: 'Customer email not found' },
        { status: 400 }
      )
    }

    const customerEmail = session.customer_details.email
    const customerName = session.customer_details.name || 'Valued Customer'
    const orderId = sessionId.slice(-8).toUpperCase()

    // Email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your VidsReels Bundle</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
          }
          .success-icon {
            width: 80px;
            height: 80px;
            background: #10b981;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
          }
          .title {
            font-size: 28px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 10px;
          }
          .subtitle {
            font-size: 18px;
            color: #6b7280;
            margin-bottom: 30px;
          }
          .order-info {
            background: #f3f4f6;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
          }
          .download-section {
            margin: 40px 0;
          }
          .download-item {
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 20px;
            transition: all 0.3s ease;
          }
          .download-item:hover {
            border-color: #3b82f6;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
          }
          .download-item.reels {
            border-color: #3b82f6;
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          }
          .download-item.animations {
            border-color: #8b5cf6;
            background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
          }
          .download-item.luts {
            border-color: #f59e0b;
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          }
          .download-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #1f2937;
          }
          .download-desc {
            color: #6b7280;
            margin-bottom: 16px;
          }
          .download-btn {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          .download-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          }
          .download-btn.purple {
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          }
          .download-btn.orange {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          }
          .support-section {
            background: #fef3c7;
            border-radius: 8px;
            padding: 20px;
            margin-top: 40px;
            text-align: center;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">VidsReels</div>
            <div class="success-icon">✅</div>
            <h1 class="title">Payment Successful! 🎉</h1>
            <p class="subtitle">Welcome to the VidsReels family, ${customerName}!</p>
          </div>

          <div class="order-info">
            <h3 style="margin: 0 0 10px 0; color: #1f2937;">Order Summary</h3>
            <p style="margin: 5px 0;"><strong>Order ID:</strong> ${orderId}</p>
            <p style="margin: 5px 0;"><strong>Total Paid:</strong> $29.00</p>
            <p style="margin: 5px 0;"><strong>You Saved:</strong> $258.00 (90% OFF)</p>
          </div>

          <div class="download-section">
            <h2 style="text-align: center; margin-bottom: 30px; color: #1f2937;">Download Your Bundle</h2>
            
            <div class="download-item reels">
              <div class="download-title">🎬 15,000 Viral Reels</div>
              <div class="download-desc">Premium 4K luxury lifestyle content</div>
              <a href="https://drive.google.com/drive/folders/12PJSdiD-iEjst_suZdVLwxwh-xVbUpKT?usp=drive_link" class="download-btn">Download Reels</a>
            </div>

            <div class="download-item animations">
              <div class="download-title">🎨 1,000 Minimal Animations</div>
              <div class="download-desc">Minimal motion graphics & transitions</div>
              <a href="https://drive.google.com/drive/folders/1kbMmcUn42trZqo-zw8tzSvEIoOwsOzyD?usp=drive_link" class="download-btn purple">Download Animations</a>
            </div>

            <div class="download-item luts">
              <div class="download-title">🎨 70 Premium LUTs</div>
              <div class="download-desc">Professional color grading presets</div>
              <a href="https://drive.google.com/drive/folders/16VYaDmUhYHLeyX2nLCxRMWCs6LCm3ZCQ?usp=drive_link" class="download-btn orange">Download LUTs</a>
            </div>
          </div>

          <div class="support-section">
            <h3 style="margin: 0 0 10px 0; color: #1f2937;">Need Help?</h3>
            <p style="margin: 0;">Contact our support team at <a href="mailto:support@vidsreels.com" style="color: #3b82f6; text-decoration: none;">support@vidsreels.com</a></p>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #6b7280;">We typically respond within 24 hours</p>
          </div>

          <div class="footer">
            <p>&copy; 2025 VidsReels. All rights reserved.</p>
            <p>This email was sent to ${customerEmail} because you purchased our VidsReels Bundle.</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email using Nodemailer
    const mailOptions = {
      from: `"VidsReels" <support@vidsreels.com>`,
      to: customerEmail,
      subject: '🎉 Your VidsReels Bundle is Ready for Download!',
      html: emailHtml,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully' 
    })

  } catch (err: unknown) {
    console.error('Send email error:', err)
    const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
} 