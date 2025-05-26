import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for video files and static assets
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
  // Add headers for video files
  async headers() {
    return [
      {
        source: '/(.*\\.mp4)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
        ],
      },
    ];
  },
  // Compress static files
  compress: true,
};

export default nextConfig;
