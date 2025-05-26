'use client'

import { Video } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  }

  const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6', 
    lg: 'h-10 w-10'
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className="bg-red-600 p-2 rounded-lg">
        <Video className={`${iconSizes[size]} text-white`} />
      </div>

      {/* Logo Text */}
      <div>
        <h1 
          className={`font-mono font-bold text-white ${sizeClasses[size]} leading-none`}
          style={{ fontFamily: "'Major Mono Display', monospace" }}
        >
          VIDS<span className="text-red-400">REELS</span>
        </h1>
        {size !== 'sm' && (
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            Viral Content
          </p>
        )}
      </div>
    </div>
  )
} 