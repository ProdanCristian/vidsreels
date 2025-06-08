import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { Header } from "@/components/header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "15,000 Viral Reels Bundle - VidsReels",
  description: "Get 15,000 viral luxury lifestyle reels for just $29. Proven content for TikTok, Instagram Reels & YouTube Shorts. Commercial license included.",
  icons: {
    icon: [
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { url: '/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  manifest: '/icons/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Facebook Pixel Code - Only for Facebook ad traffic */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            // Check if user came from Facebook ad
            function isFromFacebookAd() {
              const urlParams = new URLSearchParams(window.location.search);
              const referrer = document.referrer;
              
              // Check for Facebook UTM parameters
              const hasFacebookUTM = urlParams.get('utm_source')?.toLowerCase().includes('facebook') ||
                                     urlParams.get('utm_medium')?.toLowerCase().includes('facebook') ||
                                     urlParams.get('utm_campaign') !== null;
              
              // Check for Facebook referrer
              const hasFacebookReferrer = referrer.includes('facebook.com') || 
                                          referrer.includes('fb.com') ||
                                          referrer.includes('instagram.com');
              
              // Check for Facebook click ID (fbclid)
              const hasFbclid = urlParams.get('fbclid') !== null;
              
              // For testing purposes, also allow localhost
              const isLocalhost = window.location.hostname === 'localhost';
              
              return hasFacebookUTM || hasFacebookReferrer || hasFbclid || isLocalhost;
            }

            // Only load Facebook Pixel if user came from Facebook ad
            if (isFromFacebookAd()) {
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '690110657249043');
              fbq('track', 'PageView');
            } else {
              console.log('Facebook Pixel not loaded - user did not come from Facebook ad');
            }
          `}
        </Script>

        {/* TikTok Pixel Code */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
            var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
            ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

            ttq.load('D12M6FBC77U53580S2M0');
            ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
        
        <ThemeProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
