'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Instagram, ArrowRight } from 'lucide-react';

const trainers = [
  {
    name: 'Marcus Thorne',
    specialty: 'Lead Strength Coach',
    image: '/trainer_marcus.png',
    social: '@marcus_strength',
  },
  {
    name: 'Elena Rostova',
    specialty: 'HIIT & Conditioning',
    image: '/trainer_elena.png',
    social: '@elena.fit',
  },
  {
    name: 'David Chen',
    specialty: 'Mobility & Recovery',
    image: '/trainer_david.png',
    social: '@chen_move',
  },
  {
    name: 'Sarah Jenkins',
    specialty: 'Endurance Specialist',
    image: '/trainer_sarah.png',
    social: '@sarah.run',
  }
];

export function Trainers() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 md:mb-4 leading-tight">
          Your Fitness<br/>
          <span className="text-[#CCFF00]">Goals, Their Expertise</span>
        </h2>
        <p className="text-white/50 text-xs md:text-sm max-w-xl mx-auto font-medium">
          Our Team Of Certified Trainers Brings Unparalleled Expertise To Help You Achieve Your Fitness Goals.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" id="trainers">
        {trainers.map((trainer, idx) => (
          <Link key={trainer.name} href="/about#trainers" className="block outline-none" aria-label={`View more details about ${trainer.name}`}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-[30px] overflow-hidden bg-[#111] aspect-[3/4] cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <motion.div
                  initial={isMobile ? { filter: 'grayscale(100%)' } : undefined}
                  whileInView={isMobile ? { filter: 'grayscale(0%)' } : undefined}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image 
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={`object-cover transition-all duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-90 mix-blend-lighten ${!isMobile ? 'grayscale group-hover:grayscale-0' : ''}`}
                  />
                </motion.div>
              </div>
              
              {/* Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-[#CCFF00]/0 group-hover:bg-[#CCFF00]/10 transition-colors duration-500 mix-blend-overlay"></div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <motion.div 
                  className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#CCFF00] transition-colors">{trainer.name}</h3>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-4 group-hover:translate-x-0">
                      <ArrowRight size={14} className="text-[#CCFF00]" />
                    </div>
                  </div>
                  <p className="text-white/60 text-xs font-medium tracking-wider uppercase mb-3">{trainer.specialty}</p>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <Instagram size={14} className="text-white/40" />
                    <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{trainer.social}</span>
                  </div>
                </motion.div>
              </div>
              
              {/* Animated Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#CCFF00]/30 rounded-[30px] transition-colors duration-500 pointer-events-none"></div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
