import crypto from 'crypto'

/**
 * Hash a string using SHA-256 (for server-side use)
 */
export function hashSHA256Server(input: string): string {
  return crypto.createHash('sha256').update(input.toLowerCase().trim()).digest('hex')
}

/**
 * Hash a string using SHA-256 (for client-side use)
 */
export async function hashSHA256Client(input: string): Promise<string> {
  if (typeof window === 'undefined') {
    // Fallback for SSR
    return hashSHA256Server(input)
  }

  const encoder = new TextEncoder()
  const data = encoder.encode(input.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Generate a unique event ID for tracking
 */
export function generateEventId(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `${timestamp}_${random}`
} 