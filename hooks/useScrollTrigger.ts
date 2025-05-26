'use client'

import { useState, useEffect, useRef } from 'react'

interface UseScrollTriggerOptions {
  threshold?: number
  rootMargin?: string
}

export const useScrollTrigger = (options: UseScrollTriggerOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  const { threshold = 0.1, rootMargin = '0px' } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) {
      const timeout = setTimeout(() => {
        // Retry logic without debug
      }, 100)
      return () => clearTimeout(timeout)
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setIsVisible(true)
          setHasTriggered(true)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, hasTriggered])

  return { elementRef, isVisible }
} 