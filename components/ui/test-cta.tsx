'use client'

import React from 'react'

const TestCTA = () => {
  return (
    <div 
      className="fixed bottom-4 right-4 z-[9999] bg-red-500 text-white p-4 rounded-lg shadow-lg"
      style={{ 
        position: 'fixed', 
        bottom: '16px', 
        right: '16px', 
        zIndex: 9999,
        backgroundColor: 'red',
        color: 'white',
        padding: '16px',
        borderRadius: '8px'
      }}
    >
      <div>TEST CTA BUTTON</div>
      <div>This should be visible!</div>
    </div>
  )
}

export default TestCTA 