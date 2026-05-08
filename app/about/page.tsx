import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CTA } from '@/components/CTA';
import Image from 'next/image';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Journey } from '@/components/Journey';
import { Trainers } from '@/components/Trainers';

const AboutAnimations = dynamic(() => import('./AboutAnimations'));

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about FiTusion – founded in 2010, our 30,000 sq.ft facility with 50+ expert coaches offers a premium fitness experience for 12,000+ happy clients.',
};

export default function AboutPage() {
  return (
    <main className="relative bg-[#080808] text-[#F5F5F0] min-h-screen selection:bg-[#CCFF00] selection:text-black">
      <Navbar />
      
      {/* Hero Section for About */}
      <section className="relative w-full pt-24 pb-12 md:pt-48 md:pb-32 px-4 sm:px-6 md:px-12 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000"
            alt="FiTusion gym interior"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-20 grayscale mix-blend-overlay"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]"></div>
        
        <div className="relative text-center max-w-4xl mx-auto z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 md:mb-6">Our <span className="text-[#CCFF00]">Story</span></h1>
          <p className="text-white/60 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Founded in 2010, FiTusion is more than a gym; it&apos;s a sanctuary for those who demand excellence and are unrelenting in their pursuit of physical mental evolution.
          </p>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-10 md:py-24 px-4 sm:px-6 md:px-12 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 md:mb-8">Redefining the <br /> <span className="text-white/40">Fitness Experience</span></h2>
          <div className="space-y-4 md:space-y-6 text-white/70 text-base md:text-lg leading-relaxed">
            <p>At FiTusion, we realized that standard gyms were falling short. They offered machines but lacked atmosphere. They provided space, but lacked community. They gave you access, but no guidance.</p>
            <p>We solved this by creating a highly-cultivated environment where industrial architecture meets high-end biomechanical engineering. Every inch of our 30,000 sq.ft facility has been purposefully designed to maximize focus and results.</p>
            <p>Whether you are an elite athlete pushing your genetic limits, or a beginner finding your footing, our ecosystem adapts to your ambition. Our trainers are biomechanics experts, providing a holistic approach covering training regimen, nutrition strategy, and active recovery.</p>
          </div>
          
          <AboutAnimations />
        </div>

        <div className="relative h-[350px] sm:h-[450px] md:h-[600px] w-full rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#111]">
          <Image
            src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000"
            alt="Athlete training at FiTusion"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center opacity-80 grayscale contrast-125"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black to-transparent opacity-80"></div>
          <div className="absolute bottom-10 left-10 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
            <p className="text-white/80 italic">&quot;The best environment I&apos;ve ever trained in. Period.&quot;</p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-24 px-4 sm:px-6 md:px-12 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-10 items-center">
          <div className="flex flex-col opacity-100">
            <h3 className="text-2xl md:text-4xl font-black mb-6 tracking-tight uppercase">Our <span className="text-[#CCFF00]">Philosophy</span></h3>
            <p className="text-white/70 leading-relaxed mb-6">
              At FiTusion, we believe that fitness is not just about lifting weights; it is a holistic approach to elevating your entire lifestyle. We combine cutting-edge science, world-class equipment, and an unwavering community to forge elite athletes and transform everyday lives.
            </p>
            <p className="text-white/70 leading-relaxed">
              Our mission is to break down the barriers of traditional fitness. Whether you are stepping into a gym for the first time or training for a professional competition, our ecosystem is designed to adapt, challenge, and inspire you to shatter your limitations.
            </p>
          </div>
          
          <div className="relative h-[400px] w-full rounded-[30px] overflow-hidden group border border-white/10 opacity-100">
            <Image 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000"
              alt="Gym interior and community"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
              <div className="text-[#CCFF00] font-black text-5xl mb-2">10K+</div>
              <div className="text-white font-bold text-xl uppercase tracking-wider">Lives Transformed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Render the new Journey animated scroll section here */}
      <Journey />

      {/* Trainers Section */}
      <section className="py-10 md:py-24 px-4 sm:px-6 md:px-12 w-full max-w-7xl mx-auto">
        <Trainers />
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
