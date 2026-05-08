'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const milestones = [
  { year: '2018', title: 'The Genesis', desc: 'Started in a small garage with just 3 barbells and a vision to build a community of dedicated lifters.' },
  { year: '2020', title: 'Expanding Horizons', desc: 'Moved to our first commercial space, surviving the global pandemic by shifting to outdoor bootcamps.' },
  { year: '2022', title: 'Elite Status', desc: 'Introduced state-of-the-art machinery and launched our renowned Elite Coaching program.' },
  { year: '2024', title: 'The Mega Facility', desc: 'Opened our current 20,000 sq.ft headquarters, setting a new standard for fitness centers in the city.' },
  { year: 'Beyond', title: 'Global Ambition', desc: 'Pioneering digital fitness solutions and preparing to launch our first international franchise.' },
];

export function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"]
  });

  // Height of the glowing line
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="mt-20 md:mt-32 w-full relative" ref={containerRef}>
      <div className="text-center mb-16">
        <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4">
          Our <span className="text-[#CCFF00]">Journey</span>
        </h3>
        <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto font-medium">
          From humble beginnings to a fitness empire. Every drop of sweat built this legacy.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 md:px-0">
        {/* Timeline background track */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 md:-translate-x-1/2 rounded-full" />
        
        {/* Animated glowing progress line */}
        <motion.div 
          className="absolute left-6 md:left-1/2 top-0 w-1 bg-[#CCFF00] md:-translate-x-1/2 rounded-full shadow-[0_0_15px_#CCFF00]"
          style={{ height: lineHeight }}
        />

        <div className="flex flex-col gap-12 md:gap-24">
          {milestones.map((milestone, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={milestone.year} className="relative flex items-center w-full">
                {/* Node dot on the line */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
                  whileInView={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", damping: 15, delay: 0.2 }}
                  className="absolute left-6 md:left-1/2 top-0 w-4 h-4 rounded-full bg-[#CCFF00] border-4 border-[#080808] z-10 shadow-[0_0_10px_rgba(204,255,0,0.5)]"
                />

                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.1 }}
                  className={`pl-16 md:pl-0 w-full md:w-1/2 ${isEven ? 'md:pr-16 md:text-right md:ml-0' : 'md:pl-16 md:ml-auto'}`}
                >
                  <div className="bg-[#111] border border-white/5 p-6 md:p-8 rounded-2xl hover:border-[#CCFF00]/30 transition-colors duration-300">
                    <span className="text-[#CCFF00] font-black text-xl md:text-2xl mb-2 block tracking-wider">
                      {milestone.year}
                    </span>
                    <h4 className="text-white font-bold text-lg md:text-xl mb-3">
                      {milestone.title}
                    </h4>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
