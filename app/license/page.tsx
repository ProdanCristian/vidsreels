'use client'

import React from 'react'
import { FaShieldAlt, FaStore, FaRocket, FaCertificate, FaCheck } from 'react-icons/fa'

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-full px-6 py-3 mb-6">
            <FaCertificate className="w-5 h-5 text-green-400" />
            <span className="text-lg font-bold text-green-400">LICENSING AGREEMENT</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Commercial License & Rights
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your purchase includes comprehensive commercial rights to use, rebrand, and resell our luxury lifestyle content bundle.
          </p>
        </div>

        {/* License Types Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Distribution Rights */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center">
                <FaStore className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Distribution Rights</h2>
                <p className="text-green-400 font-semibold">Full Rebranding Allowed</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">YOU CAN CHOOSE TO REBRAND THIS PRODUCT ALONG WITH ITS ASSOCIATED CONTENT BUNDLES FOR SALE IN YOUR STORE AS A DIGITAL PRODUCT.</strong>
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaCheck className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Rebrand with your own logo and branding</span>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheck className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Create custom packaging and presentation</span>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheck className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Sell as your own digital product</span>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheck className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Set your own pricing and terms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Private Label Rights */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
                <FaRocket className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Private Label Rights</h2>
                <p className="text-blue-400 font-semibold">Ready-to-Sell Solution</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">YOU HAVE THE FREEDOM TO UTILIZE THIS PRODUCT AND ITS ASSOCIATED CONTENT AS THEY ARE, SELLING THEM IN YOUR STORE. THIS IS IDEAL IF YOU WISH TO SWIFTLY ENTER THE SELLING ARENA WITHOUT INVESTING TIME IN BRANDING OR PRODUCT CREATION.</strong>
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaCheck className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Sell immediately without modifications</span>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheck className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">No time investment in product creation</span>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheck className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Quick entry into digital product sales</span>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheck className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Use existing sales materials</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-secondary/20 border border-border/50 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <FaShieldAlt className="w-6 h-6 text-yellow-400" />
            What&apos;s Included in Your License
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground text-lg">Content Assets</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  15,000+ Luxury Lifestyle Reels
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  70+ Professional Cinematic LUTs
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  1000+ Minimalist Animations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Video Editing Presets & Templates
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground text-lg">Commercial Rights</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Personal & Commercial Use
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Client Work & Freelancing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Social Media & YouTube
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Resale & Distribution Rights
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Important License Terms</h3>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <strong className="text-foreground">✓ Unlimited Usage:</strong> Use these assets in unlimited projects without additional fees.
            </p>
            <p>
              <strong className="text-foreground">✓ Resale Rights:</strong> You may resell this product bundle with full commercial rights.
            </p>
            <p>
              <strong className="text-foreground">✓ Modification Allowed:</strong> Edit, customize, and rebrand all content as needed.
            </p>
            <p>
              <strong className="text-foreground">⚠ Attribution:</strong> No attribution required, but you cannot claim original creation of the base content.
            </p>
            <p>
              <strong className="text-foreground">⚠ Redistribution:</strong> You cannot give away or share the original source files for free.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Questions About Licensing?
          </h3>
          <p className="text-muted-foreground mb-6">
            Need clarification on what you can do with your license? Contact our support team.
          </p>
          <a 
            href="mailto:support@vidsreels.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
} 