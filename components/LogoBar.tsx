'use client';
import { motion } from 'motion/react';
import React from 'react';

export function LogoBar() {
  return (
    <div className="w-full py-8 md:py-16 flex flex-wrap justify-center items-center gap-5 sm:gap-8 md:gap-20 opacity-50 grayscale transition-all duration-300 hover:grayscale-0 px-4 mt-6 md:mt-12 bg-gradient-to-b from-transparent to-[#080808]">
      <span className="font-black text-xl md:text-3xl tracking-tighter">UNDER ARMOUR</span>
      <span className="font-black text-xl md:text-3xl tracking-tighter italic">Reebok</span>
      <span className="font-black text-xl md:text-3xl tracking-tighter lowercase">adidas</span>
      <span className="font-black text-xl md:text-3xl tracking-tighter">PUMA</span>
      <span className="font-black text-base md:text-xl tracking-tight leading-[0.9] text-center">THE<br/>NORTH<br/>FACE</span>
      <span className="font-black text-xl md:text-3xl tracking-tighter italic pr-2">NIKE</span>
    </div>
  );
}
