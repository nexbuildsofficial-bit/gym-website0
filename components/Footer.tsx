'use client';
import Link from 'next/link';
import { Facebook, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-[#CCFF00]/5 to-transparent pt-16 md:pt-32 pb-8 md:pb-12 border-t border-white/5 relative z-10" role="contentinfo">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row justify-between gap-8 md:gap-12 lg:gap-16 items-center md:items-start text-center md:text-left">
        
        <div className="max-w-[280px] flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-6 cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-[#CCFF00]" aria-hidden="true"></div>
            <span className="text-2xl font-black tracking-tighter uppercase text-[#F5F5F0]">FiTusion</span>
          </div>
          <p className="text-white/50 text-xs leading-loose font-medium">
            Your Go-To For Personalized Workouts, Meal Plans, And Expert Fitness Advice
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-8">
          <p className="text-[#CCFF00] font-bold text-xs tracking-widest uppercase">Follow Us On</p>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow FiTusion on Facebook" className="w-12 h-12 rounded-[14px] bg-white text-black flex items-center justify-center hover:bg-[#CCFF00] hover:scale-105 transition-all"><Facebook size={20} className="fill-current stroke-none" aria-hidden="true" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Follow FiTusion on LinkedIn" className="w-12 h-12 rounded-[14px] bg-white text-black flex items-center justify-center hover:bg-[#CCFF00] hover:scale-105 transition-all"><Linkedin size={20} className="fill-current stroke-none" aria-hidden="true" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow FiTusion on Instagram" className="w-12 h-12 rounded-[14px] bg-white text-black flex items-center justify-center hover:bg-[#CCFF00] hover:scale-105 transition-all"><Instagram size={20} aria-hidden="true" /></a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Follow FiTusion on X" className="w-12 h-12 rounded-[14px] bg-white text-black flex items-center justify-center hover:bg-[#CCFF00] hover:scale-105 transition-all"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.08H5.078z"/></svg></a>
          </div>
          <nav aria-label="Footer navigation" className="flex gap-4 md:gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mt-4 flex-wrap justify-center">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/exercises" className="hover:text-white transition-colors">Exercises</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>

        <div className="flex flex-col gap-2 text-[10px] text-white/50 font-medium items-center md:items-end">
          <h4 className="text-[#CCFF00] font-bold text-xs tracking-widest uppercase mb-4">Contact</h4>
          <p>Monday-Sunday</p>
          <p>8:00 AM - 5:00 PM</p>
          <p className="mt-4 text-white uppercase tracking-wider font-bold">E-mail</p>
          <a href="mailto:Fitfusion@gmail.com" className="hover:text-[#CCFF00] transition-colors">Fitfusion@gmail.com</a>
        </div>
      </div>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 mt-8 md:mt-16 pt-6 md:pt-8 border-t border-white/5 text-center">
        <p className="text-white/30 text-xs">&copy; {new Date().getFullYear()} FiTusion. All rights reserved.</p>
      </div>
    </footer>
  );
}
