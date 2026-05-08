'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Heart, Award, TrendingUp, Crown, Users, Maximize } from 'lucide-react';

const features = [
  { icon: Heart, title: 'Nutrition Guidance' },
  { icon: Award, title: 'Expert Trainers' },
  { icon: TrendingUp, title: 'Progress Tracking' },
  { icon: Crown, title: 'Premium Membership' },
  { icon: Users, title: 'Community Support' },
  { icon: Maximize, title: 'Next-Level Fitness Space' },
];

export function Inspired() {
  return (
    <section id="about" className="py-10 md:py-24 px-4 sm:px-6 md:px-12 max-w-[1200px] mx-auto" aria-label="About FiTusion">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-3 md:mb-4 leading-tight">
          Inspired to<br/>
          <span className="text-[#CCFF00]">Inspire Your Best Self</span>
        </h2>
        <p className="text-white/50 text-xs md:text-sm max-w-xl mx-auto font-medium">
          We&apos;re Your Partner In Achieving A Healthier, Stronger, And More Confident You.
        </p>
      </div>

      <div className="bg-[#111111] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] px-5 sm:px-8 md:px-16 py-8 md:py-12 flex items-center justify-between relative overflow-hidden border border-white/5 mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-5 md:gap-y-10 relative z-10 w-full md:w-2/3">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div key={feat.title} className="flex items-center gap-4 group cursor-pointer" whileHover={{ x: 5 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#CCFF00]/30 flex items-center justify-center text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black transition-colors"
                >
                  <Icon size={18} aria-hidden="true" />
                </motion.div>
                <span className="font-semibold text-sm md:text-base tracking-wide text-white/80 group-hover:text-white transition-colors">{feat.title}</span>
              </motion.div>
            );
          })}
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-[40%] hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-transparent to-transparent z-10"></div>
          <Image
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop"
            alt="Bodybuilder training at FiTusion"
            fill
            sizes="40vw"
            className="object-cover object-right opacity-50 mix-blend-lighten grayscale contrast-125"
            loading="lazy"
          />
        </div>
      </div>

    </section>
  );
}
