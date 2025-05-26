'use client'

import { useState, useEffect } from 'react'

export const useSimpleScrollTrigger = (targetId: string) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggered) return

      const element = document.getElementById(targetId)
      if (!element) return

      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Trigger when element is 30% visible from the top
      const triggerPoint = windowHeight * 0.7

      if (rect.top <= triggerPoint) {
        setIsVisible(true)
        setHasTriggered(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [targetId, hasTriggered])

  return { isVisible }
} 