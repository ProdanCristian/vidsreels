import React, { useState } from 'react'
import Image from 'next/image'

const previewScreenshots = [
  '/previews/vidsreels_1.jpg',
  '/previews/vidsreels_2.jpg',
  '/previews/vidsreels_3.jpg',
  '/previews/vidsreels_4.jpg',
  '/previews/vidsreels_5.jpg',
  '/previews/vidsreels_6.jpg',
  '/previews/vidsreels_7.jpg',
  '/previews/vidsreels_8.jpg',
  '/previews/vidsreels_9.jpg',
  '/previews/vidsreels_10.jpg',
  '/previews/vidsreels_11.jpg',
]
const previewVideos = [
  '/previews/vidsreels_1.mp4',
  '/previews/vidsreels_2.mp4',
  '/previews/vidsreels_3.mp4',
  '/previews/vidsreels_4.mp4',
  '/previews/vidsreels_5.mp4',
  '/previews/vidsreels_6.mp4',
  '/previews/vidsreels_7.mp4',
  '/previews/vidsreels_8.mp4',
  '/previews/vidsreels_9.mp4',
  '/previews/vidsreels_10.mp4',
  '/previews/vidsreels_11.mp4',
]

const PreviewReels = () => {
  const [modalIdx, setModalIdx] = useState<number|null>(null)
  const [imgError, setImgError] = useState<{[key:number]:boolean}>({})

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (modalIdx !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [modalIdx])

  // Close modal on ESC
  React.useEffect(() => {
    if (modalIdx === null) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalIdx(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalIdx])

  // Duplicate the list for infinite marquee
  const items = [...previewScreenshots, ...previewScreenshots]

  return (
    <section className="relative py-20 md:py-28 bg-white dark:bg-background border-y border-border/40 shadow-xl rounded-3xl mx-auto max-w-7xl my-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">Preview Viral Reels</h2>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
            See the quality and variety you get – all reels are ready to edit and post instantly.
          </p>
        </div>
        <div className="relative">
          {/* Gradient fade left */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-white dark:from-background to-transparent" />
          {/* Gradient fade right */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-white dark:from-background to-transparent" />
          {/* Infinite Marquee */}
          <div className="overflow-x-hidden py-4">
            <div className="flex gap-8 animate-infinite-marquee w-max">
              {items.map((src, i) => (
                <div key={src + '-' + i} className="inline-block relative w-40 h-72 sm:w-48 sm:h-80 md:w-56 md:h-96 rounded-2xl overflow-hidden shadow-lg border border-border bg-black group transition-transform duration-300 hover:scale-105 cursor-pointer" onClick={() => setModalIdx(i % previewScreenshots.length)}>
                  {!imgError[i] ? (
                    <Image
                      src={src}
                      alt={`Preview Reel ${(i % previewScreenshots.length) + 1}`}
                      fill
                      className="object-cover w-full h-full"
                      sizes="(max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                      onError={() => setImgError(e => ({...e, [i]: true}))}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <svg className="w-16 h-16 text-white opacity-60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                  {/* Play Overlay - always visible */}
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black/40 group-hover:bg-black/60">
                    <svg className="w-14 h-14 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Modal for video playback */}
      {modalIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setModalIdx(null)}>
          <div className="relative w-[90vw] max-w-[420px] aspect-[9/16] max-h-[90vh] flex items-center justify-center bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#1e293b]" onClick={e => e.stopPropagation()}>
            <video
              src={previewVideos[modalIdx]}
              className="w-full h-full object-contain bg-black rounded-2xl"
              autoPlay
              controls
              playsInline
              style={{ maxHeight: '90vh', background: 'black', borderRadius: '1rem' }}
            />
            <button className="absolute top-2 right-2 bg-black/80 rounded-full p-3 text-white hover:bg-yellow-400 hover:text-black transition-colors shadow-lg z-10" onClick={() => setModalIdx(null)}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes infinite-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-marquee {
          animation: infinite-marquee 40s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}

export default PreviewReels 