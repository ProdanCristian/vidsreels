# Stripe Integration Setup Guide

## Environment Variables Required

Create a `.env.local` file in your project root with the following variables:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
NEXT_PUBLIC_STRIPE_PRICE_ID=price_your_stripe_price_id_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email Configuration (SMTP)
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_USER=support@vidsreels.com
SMTP_PASS=your_zoho_email_password
```

## Email Service Setup (Nodemailer with Zoho)

### 1. Zoho Mail Setup
- Your `support@vidsreels.com` email should already be configured in Zoho
- Use your regular Zoho email password for `SMTP_PASS`
- No app password needed for Zoho (unlike Gmail)

### 2. Zoho SMTP Settings
```bash
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_USER=support@vidsreels.com
SMTP_PASS=your_zoho_password
```

### 3. Alternative SMTP Providers
You can also use other SMTP providers by updating the environment variables:

**For Gmail:**
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your_16_character_app_password
```

**For Outlook/Hotmail:**
```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your_password
```

**For Custom Domain (cPanel/WHM):**
```bash
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=support@vidsreels.com
SMTP_PASS=your_email_password
```

### 4. Email From Address
The system is configured to send emails from `support@vidsreels.com`. If you want to change this, update the `from` field in `app/api/send-email/route.ts`.

## Stripe Dashboard Setup

### 1. Create a Stripe Account
- Go to [stripe.com](https://stripe.com) and create an account
- Complete the account verification process

### 2. Get API Keys
- In your Stripe Dashboard, go to **Developers > API keys**
- Copy the **Publishable key** and **Secret key** (use test keys for development)
- Add them to your `.env.local` file

### 3. Create a Product and Price
- Go to **Products** in your Stripe Dashboard
- Click **Add product**
- Fill in the product details:
  - **Name**: VidsReels - 15,000 Viral Reels Bundle
  - **Description**: 15,000+ luxury lifestyle reels, LUTs, and animations for content creators
- Set the price to **$29.00** (one-time payment)
- Copy the **Price ID** (starts with `price_`) and add it to your `.env.local` file

### 4. Configure Webhooks (Optional)
- Go to **Developers > Webhooks**
- Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
- Select events: `checkout.session.completed`, `payment_intent.succeeded`

## Testing

### Test Email Flow
1. Start your development server: `npm run dev`
2. Complete a test purchase using Stripe test cards
3. Check the browser console for email sending logs
4. Verify the email is sent to the customer

### Test Cards
Use these test card numbers in development:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- Use any future expiry date and any 3-digit CVC

### Test the Complete Flow
1. Start your development server: `npm run dev`
2. Click any "Get Bundle" button
3. You should be redirected to Stripe Checkout
4. Use a test card to complete the purchase
5. You should be redirected to the success page
6. An email with download links should be automatically sent
7. Check the success page for email status confirmation

## Production Setup

### 1. Switch to Live Mode
- In Stripe Dashboard, toggle from **Test mode** to **Live mode**
- Get your live API keys and update your production environment variables

### 2. Update Environment Variables
```bash
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
NEXT_PUBLIC_STRIPE_PRICE_ID=price_your_live_price_id
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_USER=support@vidsreels.com
SMTP_PASS=your_zoho_email_password
```

### 3. Verify Domain
- Add your production domain to Stripe's allowed domains
- Test the complete flow in production
- Ensure your email provider allows sending from your domain

## Features Included

✅ **Stripe Checkout Integration**
- Secure payment processing
- Automatic tax calculation
- Mobile-optimized checkout

✅ **Success Page**
- Order confirmation
- Download instructions
- Customer support info

✅ **Automated Email Delivery**
- Beautiful HTML email template
- Download links included
- Customer name personalization
- Order details and summary

✅ **Error Handling**
- User-friendly error messages
- Automatic retry logic
- Fallback mechanisms
- Email status indicators

✅ **Security**
- SSL encryption
- PCI compliance through Stripe
- Secure API endpoints

## Email Template Features

✅ **Professional Design**
- Responsive HTML email template
- Brand-consistent styling
- Mobile-optimized layout

✅ **Complete Information**
- Order confirmation details
- All download links included
- Customer support information
- Professional branding

✅ **User Experience**
- Automatic sending on purchase
- Real-time status updates
- Fallback download options
- Clear call-to-action buttons

## Troubleshooting

### Email Not Sending
1. Check your Zoho SMTP credentials are correct
2. Verify your Zoho email password is correct
3. Check the browser console for error messages
4. Ensure the Stripe session ID is valid
5. Test SMTP connection manually

### Email Going to Spam
1. Use a verified email address as sender
2. Set up SPF, DKIM, and DMARC records for your domain
3. Avoid spam trigger words in subject lines
4. Include unsubscribe links (for marketing emails)
5. Use a reputable SMTP provider

### Common SMTP Issues
- **Zoho**: Use your regular email password, no app password needed
- **Gmail**: Make sure 2FA is enabled and you're using an app password
- **Outlook**: May require OAuth2 for better deliverability
- **Custom Domain**: Ensure your hosting provider allows SMTP

## Support

If you need help with the integration:
1. Check the [Stripe Documentation](https://stripe.com/docs)
2. Review the [Nodemailer Documentation](https://nodemailer.com/about/)
3. Review the [Next.js Stripe Guide](https://stripe.com/docs/payments/checkout/nextjs)
4. Contact support if issues persist 