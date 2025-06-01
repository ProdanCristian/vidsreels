# Gmail + ImprovMX Email Setup Guide

## Step 1: ImprovMX Setup (Email Forwarding)

### 1.1 Create ImprovMX Account
- Go to [ImprovMX.com](https://improvmx.com)
- Sign up for free account
- Add domain: `vidsreels.com`

### 1.2 DNS Configuration
Add these MX records to your domain registrar:

```
Type: MX
Name: @ (or leave blank)
Value: mx1.improvmx.com
Priority: 10

Type: MX
Name: @ (or leave blank)  
Value: mx2.improvmx.com
Priority: 20
```

### 1.3 Create Email Alias
- In ImprovMX dashboard: Add alias
- Alias: `support@vidsreels.com`
- Forward to: `your-personal-gmail@gmail.com`

## Step 2: Gmail Configuration

### 2.1 Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com)
2. Security → 2-Step Verification → Turn on
3. Follow the setup process

### 2.2 Generate App Password
1. Security → App passwords
2. Select app: "Mail"
3. Select device: "Other" → type "VidsReels App"
4. **SAVE THE 16-CHARACTER PASSWORD!**

### 2.3 Configure "Send As" in Gmail
1. Gmail → Settings → "See all settings"
2. "Accounts and Import" tab
3. "Send mail as" → "Add another email address"
4. Fill in:
   ```
   Name: VidsReels Support
   Email: support@vidsreels.com
   ☑️ Treat as an alias
   ```
5. SMTP Settings:
   ```
   SMTP Server: smtp.gmail.com
   Port: 587
   Username: your-personal-gmail@gmail.com
   Password: your-16-character-app-password
   ☑️ Secured connection using TLS
   ```

## Step 3: Update App Configuration

Replace your `.env.local` SMTP settings with:

```env
# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-personal-gmail@gmail.com
SMTP_PASS=your-16-character-app-password
EMAIL_TEST_MODE=true
```

## Step 4: Test the Setup

1. **Test Email Forwarding:**
   - Send test email to `support@vidsreels.com`
   - Should arrive in your Gmail inbox

2. **Test App Email Sending:**
   - Make a test purchase on your site
   - Email should be sent from `support@vidsreels.com`
   - You should receive it in Gmail (due to test mode)

3. **Test Replying:**
   - Reply to any email in Gmail
   - Choose "From: support@vidsreels.com"
   - Recipient sees reply from support@vidsreels.com

## Step 5: Production Mode

When ready for production:
1. Set `EMAIL_TEST_MODE=false` in `.env.local`
2. Emails will go to customers with BCC to support@vidsreels.com
3. You'll still receive copies for monitoring

## Troubleshooting

### Common Issues:
1. **"Authentication failed"** → Check app password is correct
2. **"Less secure app access"** → Use app password, not regular password
3. **DNS not propagating** → Wait 24-48 hours for MX records
4. **Emails not forwarding** → Check ImprovMX alias configuration

### Support:
- ImprovMX: [support@improvmx.com](mailto:support@improvmx.com)
- Gmail: [Google Support](https://support.google.com/gmail) 