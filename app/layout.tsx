import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
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
