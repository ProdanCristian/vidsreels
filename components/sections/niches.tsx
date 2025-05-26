'use client'

import React from 'react'
import Image from 'next/image'

const niches = [
  {
    id: 1,
    title: 'CARS',
    image: '/Cars.webp',
    description: 'Luxury supercars, hypercars & exotic vehicles',
  },
  {
    id: 2,
    title: 'WATCHES',
    image: '/Watches.webp',
    description: 'Premium timepieces & luxury watch collections',
  },
  {
    id: 3,
    title: 'JETS',
    image: '/Jets.webp',
    description: 'Private jets & aviation lifestyle content',
  },
  {
    id: 4,
    title: 'YACHTS',
    image: '/Yachts.webp',
    description: 'Mega yachts & luxury marine lifestyle',
  },
  {
    id: 5,
    title: 'VACATIONS',
    image: '/Vacations.webp',
    description: 'Exotic destinations & luxury travel',
  },
  {
    id: 6,
    title: 'WOMEN',
    image: '/Women.webp',
    description: 'Luxury fashion & lifestyle content',
  },
  {
    id: 7,
    title: 'LIFESTYLE',
    image: '/Lifestyle.webp',
    description: 'Premium lifestyle & luxury living',
  },
  {
    id: 8,
    title: 'AND MANY OTHERS',
    image: '/And many others.webp',
    description: 'Real estate, crypto, business & more',
  }
]

const Niches = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">10 Viral Niches</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Proven luxury lifestyle categories that consistently go viral and attract millions of views
          </p>
        </div>

        {/* Niches Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {niches.map((niche) => {
            return (
              <div
                key={niche.id}
                className="relative overflow-hidden rounded-2xl border border-border/50"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src={niche.image}
                    alt={niche.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Niches 