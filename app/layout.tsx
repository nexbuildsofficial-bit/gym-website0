import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles
import { SmoothScrolling } from '@/components/SmoothScrolling';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'FiTusion | Sculpt Your Body, Elevate Your Spirit',
    template: '%s | FiTusion',
  },
  description:
    'FiTusion is a premium fitness facility offering world-class training equipment, expert coaching, and a transformative gym experience. Join 12,000+ members today.',
  keywords: [
    'gym',
    'fitness',
    'personal training',
    'workout',
    'bodybuilding',
    'HIIT',
    'yoga',
    'strength training',
    'FiTusion',
  ],
  authors: [{ name: 'FiTusion' }],
  creator: 'FiTusion',
  metadataBase: new URL('https://fitusion.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fitusion.com',
    siteName: 'FiTusion',
    title: 'FiTusion | Sculpt Your Body, Elevate Your Spirit',
    description:
      'Premium gym website with world-class equipment, expert trainers, and transformative fitness programs.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FiTusion – Premium Fitness Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FiTusion | Sculpt Your Body, Elevate Your Spirit',
    description:
      'Premium gym website with world-class equipment, expert trainers, and transformative fitness programs.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inter.className} bg-[#080808] text-[#F5F5F0] antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
