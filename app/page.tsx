import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import dynamic from 'next/dynamic';

// Lazy load all below-the-fold sections to reduce initial bundle size
const Inspired = dynamic(() => import('@/components/Inspired').then(mod => ({ default: mod.Inspired })));
const Discover = dynamic(() => import('@/components/Discover').then(mod => ({ default: mod.Discover })));
const Courses = dynamic(() => import('@/components/Courses').then(mod => ({ default: mod.Courses })));
const Experience = dynamic(() => import('@/components/Experience').then(mod => ({ default: mod.Experience })));
const Testimonials = dynamic(() => import('@/components/Testimonials').then(mod => ({ default: mod.Testimonials })));
const CTA = dynamic(() => import('@/components/CTA').then(mod => ({ default: mod.CTA })));
const Footer = dynamic(() => import('@/components/Footer').then(mod => ({ default: mod.Footer })));
const BlogSection = dynamic(() => import('@/components/BlogSection').then(mod => ({ default: mod.BlogSection })));
const ScrollReveal = dynamic(
  () => import('@/components/ScrollReveal').then(mod => ({ default: mod.ScrollReveal }))
);

export default function Home() {
  return (
    <main className="relative bg-[#080808] text-[#F5F5F0] min-h-screen selection:bg-[#CCFF00] selection:text-black overflow-clip">
      <Navbar />
      <Hero />
      <ScrollReveal><Inspired /></ScrollReveal>
      <ScrollReveal><Discover /></ScrollReveal>
      <ScrollReveal><Courses /></ScrollReveal>
      <ScrollReveal><Experience /></ScrollReveal>
      <ScrollReveal><BlogSection /></ScrollReveal>
      <ScrollReveal><Testimonials /></ScrollReveal>
      <ScrollReveal><CTA /></ScrollReveal>
      <Footer />
    </main>
  );
}
