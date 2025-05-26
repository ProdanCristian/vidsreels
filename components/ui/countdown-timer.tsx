'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Set countdown to 24 hours from now
    const targetDate = new Date()
    targetDate.setHours(targetDate.getHours() + 24)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      } else {
        // Reset to 24 hours when countdown reaches zero
        const newTarget = new Date()
        newTarget.setHours(newTarget.getHours() + 24)
        targetDate.setTime(newTarget.getTime())
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <motion.div 
      className="bg-black/30 rounded-lg p-4 text-center backdrop-blur-sm border border-red-400/20"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div 
        className="text-3xl md:text-4xl font-bold text-white mb-1"
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <div className="text-red-200 text-sm uppercase tracking-wider">{label}</div>
    </motion.div>
  )

  return (
    <div className="flex justify-center items-center space-x-4 mb-8">
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="text-red-300 text-2xl font-bold">:</div>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <div className="text-red-300 text-2xl font-bold">:</div>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  )
} 