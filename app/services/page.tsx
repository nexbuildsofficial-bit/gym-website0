import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const ServicesPricing = dynamic(() => import('./ServicesPricing'));
import Link from 'next/link';
import Image from 'next/image';

const allPlans = [
  { slug: 'cardio-training', title: 'Cardio Training', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800' },
  { slug: 'strength-build', title: 'Strength Build', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800' },
  { slug: 'fat-loss', title: 'Fat Loss', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800' },
  { slug: 'hiit-workouts', title: 'HIIT Workouts', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800' },
  { slug: 'barbell-basics', title: 'Barbell Basics', img: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=800' },
  { slug: 'kettlebell-masterclass', title: 'Kettlebell Masterclass', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800' },
];

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description: 'FiTusion membership plans starting from ₹2,999/month. Choose Base, Pro Athlete, or Elite Coaching plans with transparent pricing.',
};

import { FAQ } from './FAQ';

export default function ServicesPage() {
  return (
    <main className="relative bg-[#080808] text-[#F5F5F0] min-h-screen selection:bg-[#CCFF00] selection:text-black">
      <Navbar />
      
      <section className="pt-24 pb-12 md:pt-40 md:pb-32 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#CCFF00]/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true"></div>
        <div className="text-center mb-10 md:mb-24 relative z-10 text-white">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 md:mb-6 uppercase">Membership <span className="text-[#CCFF00]">Tiers</span></h1>
          <p className="text-white/60 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Transparent pricing in INR. Select the plan that aligns with your ambition and commit to your transformation.
          </p>
        </div>
        <ServicesPricing />
      </section>

      {/* Specialized Training Programs */}
      <section className="py-10 md:py-24 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/5">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 md:mb-4 tracking-tighter uppercase">Specialized <span className="text-[#CCFF00]">Programs</span></h2>
          <p className="text-white/60 max-w-xl mx-auto">Explore our dedicated training regimens tailored for specific fitness goals. Click on any plan to read detailed information.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {allPlans.map((plan) => (
            <Link key={plan.slug} href={`/services/${plan.slug}`} className="group block">
              <div className="relative h-64 rounded-3xl overflow-hidden bg-[#111] border border-white/5 group-hover:border-[#CCFF00]/50 transition-colors">
                <Image src={plan.img} alt={plan.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-xl font-black text-white uppercase tracking-widest group-hover:text-[#CCFF00] transition-colors">{plan.title}</h3>
                  <p className="text-[#CCFF00] text-xs font-bold uppercase mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">View Details &rarr;</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 md:py-24 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto bg-[#111]/30 rounded-[24px] sm:rounded-[32px] md:rounded-[40px] mb-12 md:mb-24 border border-white/5" aria-label="Frequently asked questions">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-3 md:mb-4">Frequently Asked <span className="text-[#CCFF00]">Questions</span></h2>
          <p className="text-white/60">Everything you need to know about our memberships and services.</p>
        </div>
        <FAQ />
      </section>

      <Footer />
    </main>
  );
}
