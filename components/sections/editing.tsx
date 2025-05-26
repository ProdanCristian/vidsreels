'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FaDownload, FaEdit, FaShare, FaPlay, FaCheck } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'

const Editing = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const steps = [
    {
      number: "01",
      title: "Download",
      subtitle: "Get Your Content",
      description: "Access 15,000 premium viral reels instantly",
      icon: FaDownload,
      gradient: "from-cyan-400 via-blue-500 to-purple-600"
    },
    {
      number: "02", 
      title: "Select",
      subtitle: "Choose Your Vibe",
      description: "Pick from luxury, lifestyle, or motivation categories",
      icon: HiSparkles,
      gradient: "from-purple-400 via-pink-500 to-red-500"
    },
    {
      number: "03",
      title: "Customize",
      subtitle: "Make It Yours",
      description: "Add your branding or use the content as-is",
      icon: FaEdit,
      gradient: "from-green-400 via-emerald-500 to-teal-600"
    },
    {
      number: "04",
      title: "Publish",
      subtitle: "Go Viral",
      description: "Upload to social media and watch engagement soar",
      icon: FaShare,
      gradient: "from-yellow-400 via-orange-500 to-red-600"
    }
  ]

  // Scroll-based progress that activates when section is properly in viewport
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate how much of the section is visible
      const sectionTop = Math.max(0, -rect.top)
      const sectionBottom = Math.min(rect.height, windowHeight - rect.top)
      const visibleHeight = Math.max(0, sectionBottom - sectionTop)
      const visibilityRatio = visibleHeight / rect.height
      
      // Start activating when section is at least 20% visible
      if (visibilityRatio < 0.2) {
        setCurrentStep(0)
        return
      }
      
      // Calculate progress based on scroll through the visible section
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight * 0.5 - rect.top) / (rect.height + windowHeight * 0.5)
      ))
      
      const newStep = Math.min(steps.length - 1, Math.floor(scrollProgress * steps.length))
      if (newStep !== currentStep) {
        setCurrentStep(newStep)
      }
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', throttledScroll)
  }, [currentStep, steps.length])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Simplified background elements */}
      <div className="absolute top-10 md:top-20 left-5 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-pink-500/5 to-orange-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Simplified Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-primary/10 border border-primary/20 rounded-full mb-6 md:mb-8">
            <FaPlay className="w-3 md:w-4 h-3 md:h-4 text-primary" />
            <span className="text-primary font-semibold text-sm md:text-base">Simple Process</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6 leading-tight px-2">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">
              From Zero to
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              Viral Hero
            </span>
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Transform your social media presence with our streamlined 4-step process. 
            No experience required, maximum results guaranteed.
          </p>
        </div>

        {/* Simplified Timeline Steps */}
        <div className="relative max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === currentStep
            const isLeft = index % 2 === 0
            
            return (
              <div
                key={index}
                className={`relative flex items-center mb-8 md:mb-12 lg:mb-24 transition-all duration-300 ${
                  isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Step Content */}
                <div className={`flex-1 pl-16 lg:pl-0 ${isLeft ? 'lg:pr-16' : 'lg:pl-16'}`}>
                  <div
                    className={`relative p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/40 shadow-lg' 
                        : 'bg-secondary/30 border-border'
                    }`}
                  >
                    {/* Step Number */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-r ${step.gradient} text-white font-black text-lg md:text-xl mb-4 md:mb-6 shadow-lg`}>
                      {step.number}
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">{step.title}</h3>
                        <p className="text-sm md:text-base lg:text-lg text-primary font-semibold">{step.subtitle}</p>
                      </div>
                      
                      <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed">
                        {step.description}
                      </p>
                      
                      {isActive && (
                        <div className="flex items-center gap-2 text-green-500 font-medium text-sm md:text-base">
                          <FaCheck className="w-3 h-3 md:w-4 md:h-4" />
                          <span>Currently Active</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Simplified glow effect */}
                    {isActive && (
                      <div className={`absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-r ${step.gradient} opacity-10 blur-xl -z-10`}></div>
                    )}
                  </div>
                </div>

                {/* Center Icon - Desktop */}
                <div className="relative z-20 hidden lg:block">
                  <div
                    className={`w-16 md:w-20 h-16 md:h-20 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center shadow-xl border-4 border-background transition-transform duration-300 ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    <Icon className="w-6 md:w-8 h-6 md:h-8 text-white" />
                  </div>
                </div>

                {/* Mobile Icon */}
                <div className="lg:hidden absolute left-0 top-4 md:top-6 z-30">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.gradient} flex items-center justify-center shadow-lg border-2 border-background transition-transform duration-300 ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Editing
