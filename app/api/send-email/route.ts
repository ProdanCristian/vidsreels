import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true,
  logger: true,
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 10000,
})

async function sendEmailWithTimeout(mailOptions: nodemailer.SendMailOptions, timeoutMs: number = 15000): Promise<nodemailer.SentMessageInfo> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Email sending timeout'))
    }, timeoutMs)

    transporter.sendMail(mailOptions)
      .then((result: nodemailer.SentMessageInfo) => {
        clearTimeout(timeout)
        resolve(result)
      })
      .catch((error: Error) => {
        clearTimeout(timeout)
        reject(error)
      })
  })
}

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

    // For testing: send to support email instead of customer
    const isTestMode = process.env.EMAIL_TEST_MODE === 'true'
    const emailRecipient = isTestMode ? process.env.SMTP_USER : customerEmail

    // Debug logging
    console.log('🔍 Email Debug Info:')
    console.log('- Customer Email:', customerEmail)
    console.log('- Test Mode:', isTestMode)
    console.log('- Email Recipient:', emailRecipient)
    console.log('- Environment EMAIL_TEST_MODE:', process.env.EMAIL_TEST_MODE)

    // Email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Your VidsReels Bundle</title>
        <link href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <!--[if mso]>
        <style type="text/css">
          .fallback-font { font-family: Arial, sans-serif !important; }
        </style>
        <![endif]-->
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #ffffff;
            background: #0a0a0a;
            margin: 0;
            padding: 0;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            position: relative;
            overflow: hidden;
          }
          
          /* Background Pattern */
          .bg-pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 20%, rgba(120,119,198,0.1), transparent 50%);
            pointer-events: none;
          }
          
          .content {
            position: relative;
            z-index: 10;
            padding: 40px 20px;
          }
          
          /* Logo Section */
          .logo-section {
            text-align: center;
            margin-bottom: 40px;
          }
          
          .logo {
            font-family: 'Major Mono Display', monospace;
            font-size: 32px;
            font-weight: 400;
            color: #ffffff;
            text-decoration: none;
            display: inline-block;
            margin-bottom: 20px;
            letter-spacing: 1px;
          }
          
          .logo .highlight {
            color: #facc15;
          }
          
          /* Success Section */
          .success-section {
            text-align: center;
            margin-bottom: 40px;
          }
          
          .success-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background: linear-gradient(to right, rgba(239, 68, 68, 0.1), rgba(236, 72, 153, 0.1));
            border: 1px solid rgba(239, 68, 68, 0.2);
            border-radius: 9999px;
            font-size: 14px;
            font-weight: 500;
            color: #f87171;
            margin-bottom: 32px;
          }
          
          .main-title {
            font-size: 36px;
            font-weight: 800;
            margin-bottom: 16px;
            color: #ffffff;
          }
          
          .subtitle {
            font-size: 20px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 20px;
            opacity: 0.9;
          }
          
          /* Test Mode Banner */
          .test-mode {
            background: linear-gradient(to right, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1));
            border: 1px solid rgba(251, 191, 36, 0.3);
            border-radius: 12px;
            padding: 16px;
            margin: 20px 0;
            text-align: center;
            font-size: 14px;
            color: #fbbf24;
          }
          
          /* Order Info */
          .order-info {
            background: linear-gradient(135deg, rgba(55, 65, 81, 0.3), rgba(31, 41, 55, 0.2));
            border: 1px solid rgba(75, 85, 99, 0.3);
            border-radius: 16px;
            padding: 24px;
            margin: 32px 0;
          }
          
          .order-info h3 {
            font-size: 20px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 16px;
          }
          
          .order-detail {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
            font-size: 16px;
          }
          
          .order-detail strong {
            color: #ffffff;
          }
          
          .order-detail .value {
            color: #ffffff;
          }
          
          .savings {
            color: #10b981 !important;
            font-weight: 700;
          }
          
          /* Download Section */
          .download-section {
            margin: 40px 0;
          }
          
          .section-title {
            font-size: 28px;
            font-weight: 800;
            text-align: center;
            margin-bottom: 32px;
            color: #ffffff;
          }
          
          .download-grid {
            display: grid;
            gap: 20px;
          }
          
          .download-item {
            border: 2px solid rgba(75, 85, 99, 0.3);
            border-radius: 16px;
            padding: 24px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .download-item.reels {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05));
            border-color: rgba(59, 130, 246, 0.3);
          }
          
          .download-item.animations {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(196, 181, 253, 0.05));
            border-color: rgba(139, 92, 246, 0.3);
          }
          
          .download-item.luts {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(252, 211, 77, 0.05));
            border-color: rgba(245, 158, 11, 0.3);
          }
          
          .download-header {
            text-align: center;
            margin-bottom: 20px;
          }
          
          .download-icon {
            font-size: 32px;
            margin-bottom: 12px;
            display: block;
          }
          
          .download-title {
            font-size: 20px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 8px;
          }
          
          .download-desc {
            color: #ffffff;
            font-size: 14px;
            margin-bottom: 20px;
            opacity: 0.8;
          }
          
          .download-btn {
            display: inline-block;
            width: 100%;
            padding: 14px 24px;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 700;
            text-align: center;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 16px;
          }
          
          .download-btn.purple {
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            color: #ffffff !important;
          }
          
          .download-btn.orange {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: #ffffff !important;
          }
          
          .download-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
          }
          
          /* Support Section */
          .support-section {
            background: linear-gradient(to right, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.05));
            border: 1px solid rgba(251, 191, 36, 0.2);
            border-radius: 16px;
            padding: 24px;
            text-align: center;
            margin: 40px 0;
          }
          
          .support-section h3 {
            font-size: 20px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 12px;
          }
          
          .support-section p {
            color: #ffffff;
            margin-bottom: 8px;
            opacity: 0.9;
          }
          
          .support-section a {
            color: #facc15;
            text-decoration: none;
            font-weight: 600;
          }
          
          .support-section a:hover {
            color: #f59e0b;
          }
          
          /* Footer */
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 24px;
            border-top: 1px solid rgba(75, 85, 99, 0.3);
            color: #ffffff;
            font-size: 14px;
            opacity: 0.7;
          }
          
          .footer p {
            margin: 8px 0;
          }
          
          /* Responsive */
          @media (max-width: 600px) {
            .content {
              padding: 20px 16px;
            }
            
            .main-title {
              font-size: 28px;
            }
            
            .subtitle {
              font-size: 18px;
            }
            
            .logo {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="bg-pattern"></div>
          
          <div class="content">
            <!-- Logo Section -->
            <div class="logo-section">
              <div class="logo">
                VidsReels
              </div>
            </div>
            
            <!-- Success Section -->
            <div class="success-section">
              <div class="success-badge">
                🔥 <span>15,000+ Viral Reels</span>
              </div>
              
              <h1 class="main-title">Payment Successful! 🎉</h1>
              <p class="subtitle">Welcome to the VidsReels family, ${customerName}!</p>
              
              ${isTestMode ? `
                <div class="test-mode">
                  <strong>TEST MODE:</strong> This email was originally intended for: ${customerEmail}
                </div>
              ` : ''}
            </div>

            <!-- Order Info -->
            <div class="order-info">
              <h3>Order Summary</h3>
              <div class="order-detail">
                <span><strong>Order ID:</strong></span>
                <span class="value">${orderId}</span>
              </div>
              <div class="order-detail">
                <span><strong>Total Paid:</strong></span>
                <span class="value">$29.00</span>
              </div>
              <div class="order-detail">
                <span><strong>You Saved:</strong></span>
                <span class="value savings">$258.00 (90% OFF)</span>
              </div>
            </div>

            <!-- Download Section -->
            <div class="download-section">
              <h2 class="section-title">Download Your Bundle</h2>
              
              <div class="download-grid">
                <!-- 15,000 Reels -->
                <div class="download-item reels">
                  <div class="download-header">
                    <span class="download-icon">🎬</span>
                    <div class="download-title">15,000 Viral Reels</div>
                    <div class="download-desc">Premium 4K luxury lifestyle content</div>
                  </div>
                  <a href="https://drive.google.com/drive/folders/12PJSdiD-iEjst_suZdVLwxwh-xVbUpKT?usp=drive_link" class="download-btn">
                    📥 Download Reels
                  </a>
                </div>

                <!-- 1,000 Animations -->
                <div class="download-item animations">
                  <div class="download-header">
                    <span class="download-icon">🎨</span>
                    <div class="download-title">1,000 Minimal Animations</div>
                    <div class="download-desc">Minimal motion graphics & transitions</div>
                  </div>
                  <a href="https://drive.google.com/drive/folders/1kbMmcUn42trZqo-zw8tzSvEIoOwsOzyD?usp=drive_link" class="download-btn purple">
                    📥 Download Animations
                  </a>
                </div>

                <!-- 70 LUTs -->
                <div class="download-item luts">
                  <div class="download-header">
                    <span class="download-icon">🎨</span>
                    <div class="download-title">70 Premium LUTs</div>
                    <div class="download-desc">Professional color grading presets</div>
                  </div>
                  <a href="https://drive.google.com/drive/folders/16VYaDmUhYHLeyX2nLCxRMWCs6LCm3ZCQ?usp=drive_link" class="download-btn orange">
                    📥 Download LUTs
                  </a>
                </div>
              </div>
            </div>

            <!-- Support Section -->
            <div class="support-section">
              <h3>Need Help? 🚀</h3>
              <p>Contact our support team at <a href="mailto:support@vidsreels.com">support@vidsreels.com</a></p>
              <p style="font-size: 12px; margin-top: 8px;">We typically respond within 24 hours</p>
            </div>

            <!-- Footer -->
            <div class="footer">
              <p>&copy; 2025 VidsReels. All rights reserved.</p>
              <p>This email was sent to ${isTestMode ? process.env.SMTP_USER : customerEmail} because you purchased our VidsReels Bundle.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email using Nodemailer
    const mailOptions = {
      from: `"VidsReels" <support@vidsreels.com>`,
      to: emailRecipient,
      subject: '🎉 Your VidsReels Bundle is Ready for Download!',
      html: emailHtml,
    }

    await sendEmailWithTimeout(mailOptions)

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