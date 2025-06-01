# Email Setup Guide

## Quick Setup

1. **Install Nodemailer** (already done):
   ```bash
   npm install nodemailer @types/nodemailer
   ```

2. **Setup Zoho Email Credentials**:
   - Use your existing `support@vidsreels.com` Zoho email
   - Use your regular Zoho email password (no app password needed)

3. **Add to Environment Variables**:
   ```bash
   # Add to your .env.local file
   SMTP_HOST=smtp.zoho.com
   SMTP_PORT=587
   SMTP_USER=support@vidsreels.com
   SMTP_PASS=your_zoho_email_password
   ```

4. **Zoho SMTP Benefits**:
   - No app password required (unlike Gmail)
   - Excellent deliverability for business emails
   - Simple authentication with regular password
   - Professional business email service

## How It Works

1. Customer completes Stripe checkout
2. They're redirected to `/success?session_id=xxx`
3. Success page automatically calls `/api/send-email`
4. API retrieves customer email from Stripe session
5. Beautiful HTML email is sent via Zoho SMTP using your `support@vidsreels.com` email
6. Customer sees confirmation on success page

## Email Template Features

- ✅ Professional HTML design
- ✅ Responsive for mobile
- ✅ Customer name personalization
- ✅ Order details and ID
- ✅ All download links included
- ✅ Support contact information
- ✅ Sent from your actual Zoho business email

## SMTP Provider Options

### Zoho (Recommended for Business)
```bash
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_USER=support@vidsreels.com
SMTP_PASS=your_zoho_password
```

### Gmail
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=support@vidsreels.com
SMTP_PASS=your_16_character_app_password
```

### Outlook/Hotmail
```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=support@vidsreels.com
SMTP_PASS=your_password
```

### Custom Domain (cPanel/WHM)
```bash
SMTP_HOST=mail.vidsreels.com
SMTP_PORT=587
SMTP_USER=support@vidsreels.com
SMTP_PASS=your_email_password
```

## Testing

1. Use Stripe test cards (4242 4242 4242 4242)
2. Complete checkout flow
3. Check success page for email status
4. Verify email arrives in customer's inbox

## Production Checklist

- [ ] Add production Zoho SMTP credentials
- [ ] Test with real email addresses
- [ ] Verify emails don't go to spam
- [ ] Set up SPF/DKIM records (optional but recommended)
- [ ] Monitor email delivery rates

## Troubleshooting

**Email not sending?**
- Check Zoho SMTP credentials are correct
- Verify your Zoho email password is correct
- Check browser console for errors
- Test SMTP connection manually
- Verify firewall/hosting allows SMTP

**Zoho "535 Authentication Failed" Error?**
This is common with Zoho. Try these solutions:

1. **Enable Less Secure Apps** (Quick fix):
   - Login to Zoho Mail → Settings → Security
   - Enable "Allow less secure apps"
   - Use your regular password

2. **Use App Password** (Recommended):
   - Login to Zoho Mail → Settings → Security → App Passwords
   - Generate new app password for "Mail"
   - Use this app password instead of regular password

3. **Try SSL instead of TLS**:
   ```bash
   SMTP_HOST=smtp.zoho.com
   SMTP_PORT=465
   SMTP_USER=support@vidsreels.com
   SMTP_PASS=your_password
   ```

**Emails going to spam?**
- Use your actual business email as sender
- Set up proper DNS records (SPF, DKIM, DMARC)
- Avoid spam trigger words
- Use reputable SMTP provider (Zoho is excellent)
- Include unsubscribe link for marketing emails

**Zoho specific advantages:**
- No 2FA or app password complications (once configured)
- Excellent business email deliverability
- Simple password authentication
- Professional email service designed for business

## Advantages of Zoho SMTP

✅ **Business-Focused**: Designed specifically for business email
✅ **Simple Setup**: No app passwords or complex authentication
✅ **Excellent Deliverability**: High inbox delivery rates
✅ **Professional**: Emails from your actual business domain
✅ **Reliable**: Enterprise-grade email infrastructure
✅ **Cost Effective**: No additional service fees beyond your Zoho plan

## Files Modified

- `app/api/send-email/route.ts` - Email sending API with Nodemailer + Zoho
- `app/success/page.tsx` - Auto-send email on page load
- `package.json` - Added Nodemailer dependency
- `STRIPE_SETUP.md` - Updated setup instructions 