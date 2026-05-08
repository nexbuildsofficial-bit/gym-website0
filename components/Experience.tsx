'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Activity, Footprints, Instagram, ArrowRight } from 'lucide-react';

import { Trainers } from './Trainers';

export function Experience() {
  return (
    <section id="service" className="py-10 md:py-24 px-4 sm:px-6 md:px-12 max-w-[1200px] mx-auto" aria-label="Experience section">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-3 md:mb-4 leading-tight">
          Experience<br/>
          <span className="text-[#CCFF00]">Fitness Like Never Before</span>
        </h2>
        <p className="text-white/50 text-xs md:text-sm max-w-xl mx-auto font-medium">
          Transform The Way You Train With Innovative Workouts, Expert Guidance, And State-Of-The-Art Facilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-[#111] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] p-5 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden flex flex-col min-h-[350px] md:min-h-[500px] border border-white/5 cursor-pointer">
          <div className="relative z-20 md:w-[60%] ml-auto text-right mb-auto">
            <h3 className="text-2xl font-bold text-[#CCFF00] mb-4">Endurance Evolution</h3>
            <p className="text-white/50 text-xs leading-loose mb-8 font-medium">
              Boost Your Stamina And Resilience With Tailored Cardio And Endurance Workouts Designed To Keep You Moving Stronger For Longer.
            </p>
            <button className="px-6 py-2.5 bg-[#CCFF00] text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform" aria-label="Read more about Endurance Evolution">
              Read More
            </button>
          </div>
          
          <div className="absolute left-0 bottom-0 w-[60%] h-full z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111] z-20 mix-blend-multiply"></div>
             <Image 
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800"
                alt="Athlete performing endurance exercise"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover object-left opacity-70 grayscale contrast-125"
                loading="lazy"
             />
          </div>
          <div className="absolute left-8 bottom-8 md:right-auto md:left-auto md:right-10 md:bottom-10 z-20 flex flex-col items-center bg-[#CCFF00]/10 border border-[#CCFF00]/30 backdrop-blur-md rounded-3xl p-6 w-32 shadow-2xl">
             <Activity className="text-[#CCFF00] w-8 h-8" aria-hidden="true" />
             <span className="text-3xl text-white font-black mt-3">95</span>
             <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase mt-1">BPM</span>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-[#111] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] p-5 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden flex flex-col min-h-[350px] md:min-h-[500px] border border-white/5 cursor-pointer">
          <div className="relative z-20 md:w-[60%] mb-auto">
            <h3 className="text-2xl font-bold text-[#CCFF00] mb-4">Speed Surge</h3>
            <p className="text-white/50 text-xs leading-loose mb-8 font-medium">
              Boost Your Agility And Explosiveness With High-Intensity Sprint And Movement Drills. Speed Surge Is Designed To Take Your Performance To The Next Level.
            </p>
            <button className="px-6 py-2.5 bg-[#CCFF00] text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform" aria-label="Read more about Speed Surge">
              Read More
            </button>
          </div>
          
          <div className="absolute right-0 bottom-0 w-[60%] h-full z-10">
             <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#111] z-20 mix-blend-multiply"></div>
             <Image 
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800"
                alt="Athlete performing sprint drill"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover object-right opacity-70 grayscale contrast-125"
                loading="lazy"
             />
          </div>
          <div className="absolute right-8 bottom-8 md:left-10 md:bottom-10 z-20 flex flex-col items-center bg-[#CCFF00]/10 border border-[#CCFF00]/30 backdrop-blur-md rounded-full w-32 h-32 justify-center shadow-2xl">
             <Footprints className="text-[#CCFF00] w-8 h-8" aria-hidden="true" />
             <span className="text-xl text-white font-black mt-2">1024</span>
             <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase mt-1">Steps</span>
          </div>
        </motion.div>
      </div>
      
      <div className="mt-12 md:mt-32">
        <Trainers />
      </div>
    </section>
  );
}
