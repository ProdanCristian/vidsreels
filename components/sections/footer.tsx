'use client'

import Link from 'next/link'
import React from 'react'
import {  FaEnvelope, FaHeart } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-secondary/20 to-secondary/40 border-t border-border/50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-6 md:mb-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 md:col-span-2 text-center sm:text-left">
            <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">
            <span className="text-3xl md:text-4xl major-mono-display-regular">VidsReels</span>
            </h3>
            <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base max-w-md leading-relaxed mx-auto sm:mx-0">
              The ultimate collection of viral luxury lifestyle reels. 
              Transform your social media presence and build your brand with proven viral content.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3 text-sm">
              <li><Link href="/preview" className="text-muted-foreground hover:text-foreground transition-colors block py-1">Browse Reels</Link></li>
              <li><Link href="/license" className="text-muted-foreground hover:text-foreground transition-colors block py-1">License</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Legal</h4>
            <ul className="space-y-2 md:space-y-3 text-sm">
                      <li><Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors block py-1">Terms of Service</Link></li>
                      <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors block py-1">Privacy Policy</Link></li>
                      <li><Link href="/refund" className="text-muted-foreground hover:text-foreground transition-colors block py-1">Refund Policy</Link></li>
                </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-border/50 pt-6 md:pt-8 mb-6 md:mb-8">
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm md:text-base">
              <FaEnvelope className="w-4 h-4 flex-shrink-0" />
              <span className="break-all">support@vidsreels.com</span>
            </div>
            <div className="text-muted-foreground text-xs md:text-sm text-center">
              Response time: Within 24 hours
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-6 md:pt-8">
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:justify-between md:gap-4 text-xs md:text-sm text-muted-foreground">
            <div className="flex flex-col items-center gap-1 md:flex-row text-center">
              <span>© 2025 VidsReels. Made with</span>
              <div className="flex items-center gap-1">
                <FaHeart className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                <span>for creators worldwide.</span>
              </div>
            </div>
            <div className="text-center">
              <span>All rights reserved</span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 md:mt-8 grid grid-cols-2 md:flex md:flex-row items-center justify-center gap-3 md:gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 justify-center">
            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
            <span>30-Day Guarantee</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
            <span>Instant Download</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
            <span>Commercial License</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer