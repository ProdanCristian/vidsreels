'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const ResultsSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const results = [
    {
      id: 1,
      url: '/results/Prof 1.webp'
    },
    {
      id: 2,
      url: '/results/Prof 2.webp'
    },
    {
      id: 3,
      url: '/results/Prof 3.webp'
    },
  {
    id: 4,
    url: '/results/Prof 4.webp'
  },
    {
      id: 5,
      url: '/results/Prof 5.webp'
    }
  ]

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Results Speak for Themselves</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real creators, real results. See how our viral reels are generating millions of views 
            and building massive followings across all platforms.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {results.map((result, index) => (
            <div
              key={result.id}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => openModal(result.url)}
            >
              <Image src={result.url} alt={result.url} width={500} height={500} className='w-full h-full object-cover' />

              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
              
              {/* Click indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>      

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full text-green-400 font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>These results are from our actual customers</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image 
              src={selectedImage} 
              alt="Selected result" 
              width={800} 
              height={800} 
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default ResultsSection
