'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const courses = [
  { img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800', title: 'Barbell Basics' },
  { img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800', title: 'Kettlebell Masterclass' },
  { img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800', title: 'Cardio Power Boost' },
  { img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800', title: 'Hypertrophy' },
  { img: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=800', title: 'Rope Climbing' },
  { img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800', title: 'TRX Suspension' },
] as const;

export function Courses() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="exercise" className="py-10 md:py-24 px-4 sm:px-6 md:px-12 max-w-[1200px] mx-auto" aria-label="Training courses">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-3 md:mb-4 leading-tight">
          Train Smarter<br/>
          <span className="text-[#CCFF00]">Unleash Your Potential</span>
        </h2>
        <p className="text-white/50 text-xs md:text-sm max-w-xl mx-auto font-medium">
          Unlock Your Full Potential With Our Expertly Designed Courses, Tailored To Help You Maximize Results In Less Time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-16">
        {courses.map((course) => (
          <Link
            href={`/services/${course.title.toLowerCase().replace(' ', '-')}`}
            key={course.title} 
            className="block"
          >
            <motion.div 
              className="flex flex-col items-center gap-6 group cursor-pointer"
              whileHover={{ y: -5 }}
            >
              <div className="relative w-full aspect-[4/5] rounded-[30px] overflow-hidden bg-[#111]">
                <motion.div
                  initial={isMobile ? { filter: 'grayscale(100%)' } : undefined}
                  whileInView={isMobile ? { filter: 'grayscale(0%)' } : undefined}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image 
                    src={course.img}
                    alt={`${course.title} training course at FiTusion`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover transition-all duration-500 rounded-[30px] ${!isMobile ? 'grayscale group-hover:grayscale-0' : ''}`}
                    loading="lazy"
                  />
                </motion.div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#CCFF00] rounded-bl-[30px] translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" aria-hidden="true"></div>
                {/* Corner cut effect using CSS */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#080808] rotate-45 translate-x-8 -translate-y-8" aria-hidden="true"></div>
              </div>
              <h3 className="text-lg font-bold text-[#CCFF00] tracking-wide">{course.title}</h3>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
