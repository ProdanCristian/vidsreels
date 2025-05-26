'use client'

import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa'

const mainFaqData = [
  {
    question: "What exactly do I get with the video editing bundle?",
    answer: "You get an incredible collection of 15,000+ luxury lifestyle reels, 70+ professional cinematic LUTs, 1000+ minimalist animations, video editing presets, templates, and digital assets. All files are delivered digitally and can be used immediately after purchase to create viral content."
  },
  {
    question: "Can I use these luxury reels and assets for commercial projects?",
    answer: "Absolutely! Your purchase includes a commercial license that allows you to use all 15,000+ luxury reels, LUTs, and animations for personal projects, client work, social media content, YouTube videos, and any commercial purposes. Perfect for YouTube, TikTok, Instagram, and all platforms."
  },
  {
    question: "What video editing software works with these reels and LUTs?",
    answer: "The luxury reels work with any video editing software that supports standard video formats (MP4, MOV). The LUTs and presets are compatible with all major editing software including DaVinci Resolve, Adobe Premiere Pro, Final Cut Pro, CapCut, Filmora, and Adobe After Effects."
  },
  {
    question: "Are these luxury reels and assets suitable for beginners?",
    answer: "Yes! The luxury reels are ready-to-use video clips that require no editing experience. Simply drag and drop into your project. LUTs can be applied with one click, and animations are pre-made. We also provide tutorials to help you create professional luxury lifestyle content."
  }
]

export default function FAQMain() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (index: number) => {
    const itemId = index.toString()
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(item => item !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full px-6 py-3 mb-6">
            <FaQuestionCircle className="w-5 h-5 text-yellow-400" />
            <span className="text-lg font-bold text-yellow-400">FREQUENTLY ASKED QUESTIONS</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Got Questions? We&apos;ve Got Answers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our luxury lifestyle bundle with 15,000+ reels, LUTs, and animations to create viral content.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {mainFaqData.map((faq, index) => {
            const isOpen = openItems.includes(index.toString())
            
            return (
              <div key={index} className="bg-secondary/20 border border-border/50 rounded-xl overflow-hidden backdrop-blur-sm">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 text-left hover:bg-secondary/30 transition-colors flex items-center justify-between group"
                >
                  <span className="font-semibold text-foreground pr-4 group-hover:text-yellow-400 transition-colors">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <FaChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-yellow-400 transition-colors" />
                    ) : (
                      <FaChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-yellow-400 transition-colors" />
                    )}
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-6 py-5 bg-background/50 border-t border-border/50">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-foreground mb-3">
            Still Have Questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help you with any questions about our products or technical issues.
          </p>
          <a 
            href="mailto:support@vidsreels.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  )
} 