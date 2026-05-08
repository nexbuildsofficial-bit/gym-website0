'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { Activity, Dumbbell, Flame, Zap, UserCheck, Utensils, HeartHandshake, Laptop } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const cards = [
  { icon: Activity, title: 'Cardio Training', desc: 'Boost endurance and heart health with high-energy cardio sessions designed to keep you moving.' },
  { icon: Dumbbell, title: 'Strength Build', desc: 'Develop power and resilience through expert-guided strength training tailored to all fitness levels.' },
  { icon: Flame, title: 'Fat Loss', desc: 'Shed unwanted fat with dynamic workout routines and fat-burning strategies that deliver lasting results.' },
  { icon: Zap, title: 'HIIT Workouts', desc: 'Maximize calorie burn and improve fitness with short, intense high-intensity interval training sessions.' },
  { icon: UserCheck, title: 'Personal Training', desc: 'Get 1-on-1 expert coaching, biomechanical analysis, and a fully customized roadmap to success.' },
  { icon: Utensils, title: 'Nutrition Plans', desc: 'Fuel your workouts with macro-calculated meal plans tailored to your specific metabolic needs.' },
  { icon: HeartHandshake, title: 'Sports Massage', desc: 'Accelerate recovery and prevent injuries with deep tissue massage and active release techniques.' },
  { icon: Laptop, title: 'Online Coaching', desc: 'Train anywhere in the world with our elite digital programming and weekly progress check-ins.' },
] as const;

export function Discover() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  
  // Transform scroll progress (0-1) to the thumb's translation offset
  // Assuming the thumb is 33.33% width, it needs to move 200% of its own width to reach the end
  const thumbX = useTransform(scrollXProgress, [0, 1], ["0%", "200%"]);

  return (
    <section id="features" className="py-10 md:py-24 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden" aria-label="Features">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-3 md:mb-4 leading-tight">
          Discover<br/>
          <span className="text-[#CCFF00]">What Sets Us Apart</span>
        </h2>
        <p className="text-white/50 text-xs md:text-sm max-w-xl mx-auto font-medium">
          We Deliver A Fitness Experience That&apos;s Truly One-Of-A-Kind. Explore How We Help You Achieve Your Goals Faster And Smarter.
        </p>
      </div>

      {/* Buttery smooth horizontal scroller */}
      <div 
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-4 -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-12 md:px-12 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div 
              key={card.title}
              whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(204,255,0,0.15)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 100 }}
              className="bg-[#111111] rounded-[30px] p-6 pt-8 flex flex-col items-start border border-white/5 relative overflow-hidden group transition-all duration-300 hover:border-[#CCFF00]/40 min-w-[280px] sm:min-w-[320px] max-w-[320px] shrink-0 snap-center md:snap-start"
            >
              <div className="flex bg-[#1A1A1A] px-4 py-2.5 rounded-full items-center gap-3 mb-6 border border-white/5 group-hover:border-[#CCFF00]/30 group-hover:bg-[#CCFF00]/10 transition-colors">
                <Icon size={18} className="text-[#CCFF00]" aria-hidden="true" />
                <span className="text-[13px] font-bold text-white tracking-widest uppercase">{card.title}</span>
              </div>
              <p className="text-white/40 text-xs leading-loose mb-12 font-medium">
                {card.desc}
              </p>
              <Link 
                href={`/services/${card.title.toLowerCase().replace(' ', '-')}`} 
                className="mt-auto self-end px-6 py-2.5 bg-[#1A1A1A] group-hover:bg-[#CCFF00] group-hover:text-black transition-colors rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white" 
                aria-label={`See plan for ${card.title}`}
              >
                See Plan
              </Link>
            </motion.div>
          );
        })}
      </div>
      
      {/* Animated Custom Scroller */}
      <div className="flex justify-center mt-6 md:mt-12" aria-hidden="true">
        <div className="w-24 md:w-32 h-2 rounded-full bg-white/10 relative overflow-hidden shadow-inner">
          <motion.div 
            className="absolute top-0 left-0 h-full w-1/3 bg-[#CCFF00] rounded-full shadow-[0_0_10px_rgba(204,255,0,0.8)]"
            style={{ x: thumbX }}
          />
        </div>
      </div>
    </section>
  );
}
