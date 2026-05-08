'use client';
import { motion } from 'motion/react';

export function CTA() {
  return (
    <section className="py-8 md:py-24 px-4 sm:px-6 md:px-12 max-w-[1200px] mx-auto" aria-label="Call to action">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-[#CCFF00] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] p-8 sm:p-12 md:p-24 text-center relative overflow-hidden text-black z-10 w-full transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(204,255,0,0.15)] cursor-default"
      >
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '20px 20px' }} aria-hidden="true"></div>
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black tracking-tight mb-4 md:mb-6">
            Connect Engage Transform
          </h2>
          <p className="text-black/70 text-xs md:text-sm font-semibold mb-6 md:mb-12 max-w-xl mx-auto tracking-wide">
            Join A Vibrant Community For Fuel Motivation, Engagement Drives Progress, And Transformation
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="cta-email" className="sr-only">Email address</label>
            <input 
              id="cta-email"
              type="email" 
              placeholder="Your Email" 
              className="flex-1 rounded-full px-8 py-4 border-none outline-none text-black font-semibold text-sm bg-white/90 placeholder:text-black/40 focus:bg-white transition-colors"
              required
              autoComplete="email"
              aria-label="Enter your email to join"
            />
            <button type="submit" className="bg-[#080808] text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors shrink-0">
              Join Now
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
