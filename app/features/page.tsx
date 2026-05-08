import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CTA } from '@/components/CTA';
import Image from 'next/image';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const FeaturesAnimations = dynamic(() => import('./FeaturesAnimations'));

export const metadata: Metadata = {
  title: 'Features',
  description: 'Explore FiTusion\'s unrivaled facilities – state-of-the-art equipment, climate control, body composition lab, and premium recovery zones.',
};

const amenities = [
  { name: 'Towel Service', desc: 'Fresh towels available 24/7' },
  { name: 'Protein Bar', desc: 'Pre and post-workout shakes' },
  { name: 'Private Showers', desc: 'Luxurious grooming products' },
  { name: 'Lockers', desc: 'Secure fingerprint access' },
  { name: 'Valet Parking', desc: 'Complimentary for members' },
  { name: 'Wi-Fi', desc: 'High-speed internet access' },
  { name: 'Lounge Area', desc: 'Work or relax post-workout' },
  { name: 'Pro Shop', desc: 'Exclusive apparel and gear' },
];

export default function FeaturesPage() {
  return (
    <main className="relative bg-[#080808] text-[#F5F5F0] min-h-screen selection:bg-[#CCFF00] selection:text-black">
      <Navbar />
      
      <section className="pt-24 pb-10 md:pt-40 md:pb-20 px-4 sm:px-6 md:px-12 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 md:mb-6 uppercase">Unrivaled <span className="text-[#CCFF00]">Facilities</span></h1>
        <p className="text-white/60 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
          The finest equipment, elite recovery zones, and an uncompromising standard of excellence.
        </p>
      </section>

      <section className="py-8 md:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-start">
          <FeaturesAnimations />
          <div className="relative h-[350px] sm:h-[500px] md:h-[600px] lg:h-[800px] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden lg:sticky top-24 bg-[#111]">
            <Image 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200" 
              alt="FiTusion gym equipment" 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center grayscale contrast-125 opacity-80"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-24 px-4 sm:px-6 md:px-12 bg-[#111]/50 border-y border-white/5" aria-label="Premium amenities">
        <div className="max-w-7xl mx-auto text-center">
           <h2 className="text-3xl sm:text-4xl font-black mb-8 md:mb-16">Premium <span className="text-[#CCFF00]">Amenities</span></h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {amenities.map((amenity) => (
                <div key={amenity.name} className="bg-[#080808] p-6 rounded-3xl border border-white/5 hover:border-[#CCFF00]/30 transition-colors text-center">
                  <h4 className="text-lg font-bold text-white mb-2">{amenity.name}</h4>
                  <p className="text-white/50 text-xs font-medium">{amenity.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
