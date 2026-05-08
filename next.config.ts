import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Fully static HTML export — no server required
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true, // Required for static export — no server to optimize images
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['motion'],
  // Note: Security headers (HSTS, X-Frame-Options, etc.) should be configured
  // at the hosting provider level (e.g. Netlify _headers, Vercel vercel.json,
  // Cloudflare Pages _headers, or nginx config) since static exports
  // cannot set response headers at build time.
  webpack: (config, { dev }) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
