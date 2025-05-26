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
```

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

### Test Cards
Use these test card numbers in development:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- Use any future expiry date and any 3-digit CVC

### Test the Flow
1. Start your development server: `npm run dev`
2. Click any "Get Bundle" button
3. You should be redirected to Stripe Checkout
4. Use a test card to complete the purchase
5. You should be redirected to the success page

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
```

### 3. Verify Domain
- Add your production domain to Stripe's allowed domains
- Test the complete flow in production

## Features Included

✅ **Stripe Checkout Integration**
- Secure payment processing
- Automatic tax calculation
- Mobile-optimized checkout

✅ **Success Page**
- Order confirmation
- Download instructions
- Customer support info

✅ **Error Handling**
- User-friendly error messages
- Automatic retry logic
- Fallback mechanisms

✅ **Security**
- SSL encryption
- PCI compliance through Stripe
- Secure API endpoints

## Support

If you need help with the Stripe integration:
1. Check the [Stripe Documentation](https://stripe.com/docs)
2. Review the [Next.js Stripe Guide](https://stripe.com/docs/payments/checkout/nextjs)
3. Contact support if issues persist 