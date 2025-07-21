import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: [
            "lh3.googleusercontent.com",
      'cdn.dummyjson.com'
    ],
  },

  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          fs: false,
        },
      }
    }
    return config
  },
}

export default nextConfig
