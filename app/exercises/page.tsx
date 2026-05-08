import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CTA } from '@/components/CTA';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const ExercisesList = dynamic(() => import('./ExercisesList'));

export const metadata: Metadata = {
  title: 'Exercises & Training Intel',
  description: 'Deep dives into biomechanics, training philosophies, and exercise execution. Master deadlifts, hypertrophy, kettlebells, and calisthenics.',
};

export default function ExercisesPage() {
  return (
    <main className="relative bg-[#080808] text-[#F5F5F0] min-h-screen selection:bg-[#CCFF00] selection:text-black">
      <Navbar />
      
      <section className="pt-24 pb-10 md:pt-40 md:pb-20 px-4 sm:px-6 md:px-12 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
          Training <span className="text-[#CCFF00]">Intel</span>
        </h1>
        <p className="text-white/60 text-base sm:text-lg md:text-xl font-medium leading-relaxed">
          Deep dives into biomechanics, training philosophies, and exercise execution. Real science for real results.
        </p>
      </section>

      <ExercisesList />

      <CTA />
      <Footer />
    </main>
  );
}
