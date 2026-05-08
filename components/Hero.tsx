'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Clock, Activity, Flame, Dumbbell } from 'lucide-react';
import Link from 'next/link';

const floatingAnimation = (delay: number) => ({
  y: [0, -10, 0],
  transition: {
    repeat: Infinity,
    duration: 3.5,
    ease: "easeInOut" as const,
    delay: delay,
  }
});

/*
 * Bubbles positioned to hug the athlete closely.
 * Mobile: tuck in tightly around the man.
 * Desktop: spread out to match original layout.
 */
const STAT_BUBBLES = [
  {
    icon: Clock, label: 'Hours', value: '1.5', delay: 0,
    position: 'top-[36%] sm:top-[36%] md:top-[38%] left-[2%] sm:left-[4%] md:left-[8%] lg:left-1/2 lg:-ml-[380px] xl:-ml-[450px]',
    rotate: -12, initialRotate: -20, animDelay: 0.6,
  },
  {
    icon: Activity, label: 'Poses', value: '20', delay: 0.5,
    position: 'top-[30%] sm:top-[30%] md:top-[32%] right-[2%] sm:right-[4%] md:right-[8%] lg:right-auto lg:left-1/2 lg:ml-[280px] xl:ml-[350px]',
    rotate: 12, initialRotate: 20, animDelay: 0.8,
  },
  {
    icon: Flame, label: 'Kcal', value: '550', delay: 1,
    position: 'bottom-[14%] sm:bottom-[18%] md:bottom-[20%] left-[2%] sm:left-[4%] md:left-[8%] lg:left-1/2 lg:-ml-[360px] xl:-ml-[430px]',
    rotate: -8, initialRotate: -20, animDelay: 1.0,
  },
  {
    icon: Dumbbell, label: 'Sets', value: '5', delay: 1.5,
    position: 'bottom-[18%] sm:bottom-[22%] md:bottom-[24%] right-[2%] sm:right-[4%] md:right-[8%] lg:right-auto lg:left-1/2 lg:ml-[260px] xl:ml-[330px]',
    rotate: 8, initialRotate: 20, animDelay: 1.2,
  },
] as const;

const AVATAR_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=150&auto=format&fit=crop', alt: 'FiTusion member working out' },
  { src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=150&auto=format&fit=crop', alt: 'FiTusion member training with weights' },
  { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=150&auto=format&fit=crop', alt: 'FiTusion gym equipment' },
];

export function Hero() {
  return (
    <section
      className="relative h-screen bg-[#080808] overflow-hidden flex flex-col font-sans"
      aria-label="Hero section"
    >
      <div className="relative flex-1 w-full">

        {/* ═══ BG: Subtle grid + ambient glow ═══ */}
        <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200%] bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:rotateX(75deg)_translateY(-100px)] opacity-25 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_40%,transparent_100%)]" />
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#CCFF00]/[0.04] rounded-full blur-[160px]" />
        </div>

        {/* ═══ LAYER 1: Title text — positioned at top, BEHIND athlete ═══ */}
        <div
          className="absolute top-[10%] sm:top-[10%] md:top-[6%] left-0 right-0 z-[2] text-center px-4 pointer-events-none"
        >
          <h1 className="text-[64px] sm:text-[68px] md:text-[90px] lg:text-[120px] xl:text-[145px] font-black leading-[0.88] tracking-[-0.04em] text-[#e8e8d8]">
            {[
              { text: 'Sculpt ', highlight: false },
              { text: 'Your', highlight: true },
              { text: ' Body,', highlight: false },
              { text: '\n', highlight: false },
              { text: 'Elevate ', highlight: false },
              { text: 'Your', highlight: true },
              { text: ' Spirit', highlight: false },
            ].map((word, i) => {
              if (word.text === '\n') return <br key={i} />;
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block ${word.highlight ? 'text-[#CCFF00] drop-shadow-[0_0_30px_rgba(204,255,0,0.35)]' : ''}`}
                >
                  {word.text}
                </motion.span>
              );
            })}
          </h1>
        </div>

        {/* ═══ LAYER 2: Athlete Cutout — large, centered, overlapping text ═══ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.3, ease: "easeOut", delay: 0.2 }}
          className="absolute inset-0 z-[3] flex items-end justify-center pointer-events-none"
        >
          {/* Backlight glow behind athlete */}
          <div
            className="absolute bottom-[5%] md:bottom-[8%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] sm:w-[420px] sm:h-[420px] md:w-[550px] md:h-[550px] lg:w-[650px] lg:h-[650px] rounded-full blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(204,255,0,0.06) 0%, rgba(204,255,0,0.02) 40%, transparent 70%)' }}
            aria-hidden="true"
          />

          {/* Athlete image
              Mobile: large container so the athlete fills the viewport prominently
                      (head visible from just below title, torso fills frame).
              Desktop: original height-based sizing preserved with bottom alignment */}
          <div className="relative w-[800px] h-[110vh] -translate-y-[12%] sm:w-[700px] sm:h-[90vh] sm:-translate-y-[8%] md:w-[580px] md:h-[80vh] md:-translate-y-[4%] lg:translate-y-0 lg:w-[800px] lg:h-[1000px] xl:w-[950px] xl:h-[1150px]">
            <Image
              src="/bodybuilder.png"
              alt="Muscular athlete showcasing peak fitness"
              fill
              sizes="(max-width: 640px) 800px, (max-width: 768px) 700px, (max-width: 1024px) 580px, (max-width: 1280px) 800px, 950px"
              className="object-contain object-bottom drop-shadow-2xl"
              priority
            />
            {/* Bottom gradient to blend into page bg */}
            <div className="absolute bottom-0 left-[-20%] right-[-20%] h-[60px] sm:h-[80px] md:h-[140px] bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent" aria-hidden="true" />
          </div>
        </motion.div>

        {/* ═══ LAYER 3: Stat Bubbles — floating around athlete body ═══ */}
        {STAT_BUBBLES.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5, rotate: stat.initialRotate }}
              animate={{ opacity: 1, scale: 1, rotate: stat.rotate }}
              transition={{ type: "spring", bounce: 0.5, delay: stat.animDelay }}
              className={`absolute ${stat.position} z-[4]`}
            >
              <motion.div
                animate={floatingAnimation(stat.delay)}
                className="flex flex-col items-center justify-center gap-0.5 sm:gap-1 p-2.5 pb-3 sm:p-3 sm:pb-4 md:p-4 md:pb-5 bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl bg-[#1A1A1A]/80 rounded-2xl sm:rounded-3xl border border-white/15 w-[60px] sm:w-[72px] md:w-[100px] shadow-[0_20px_40px_-8px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.25),0_0_15px_rgba(204,255,0,0.08)]"
              >
                <div className="text-[#CCFF00] mb-0.5 drop-shadow-[0_0_6px_rgba(204,255,0,0.5)]">
                  <Icon size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" strokeWidth={2.5} aria-hidden="true" />
                </div>
                <p className="text-[6px] sm:text-[7px] md:text-[10px] font-semibold tracking-wider text-gray-400 uppercase">{stat.label}</p>
                <p className="text-xs sm:text-sm md:text-xl font-bold tracking-tight text-white leading-none">{stat.value}</p>
              </motion.div>
            </motion.div>
          );
        })}

        {/* ═══ LAYER 4: Peripheral UI ═══ */}

        {/* PREV — Left side */}
        <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-[5]" aria-hidden="true">
          <p
            className="text-gray-600 hover:text-white uppercase text-xs tracking-[0.7em] font-bold cursor-pointer transition-colors duration-300"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            P R E V
          </p>
        </div>

        {/* NEXT — Right side */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-[5]" aria-hidden="true">
          <p
            className="text-gray-600 hover:text-white uppercase text-xs tracking-[0.7em] font-bold cursor-pointer transition-colors duration-300"
            style={{ writingMode: 'vertical-rl' }}
          >
            N E X T
          </p>
        </div>

        {/* Bottom Left: Avatars + count */}
        <div className="absolute bottom-3 left-3 sm:bottom-8 sm:left-8 md:bottom-10 md:left-12 z-[5] flex items-center gap-2 sm:gap-3">
          <div className="flex -space-x-2 sm:-space-x-3">
            {AVATAR_IMAGES.map((img) => (
              <div key={img.alt} className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full border-2 border-[#080808] overflow-hidden relative">
                <Image src={img.src} alt={img.alt} fill sizes="44px" className="object-cover grayscale" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm sm:text-base md:text-lg leading-tight">12k+</span>
            <span className="text-gray-500 text-[8px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-wider">Happy Spirits</span>
          </div>
        </div>

        {/* Bottom Right: CTA Button */}
        <div className="absolute bottom-3 right-3 sm:bottom-8 sm:right-8 md:bottom-10 md:right-12 z-[5]">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/services"
              className="group flex items-center gap-1.5 sm:gap-2.5 bg-[#CCFF00] text-black px-4 py-2 sm:px-5 sm:py-2.5 md:px-7 md:py-3.5 rounded-full font-bold text-[10px] sm:text-[11px] md:text-sm uppercase tracking-[0.1em] sm:tracking-[0.15em]"
              aria-label="Get started with FiTusion services"
            >
              Let&apos;s Start
              <motion.span
                className="flex font-black text-[10px] sm:text-xs md:text-sm"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                aria-hidden="true"
              >
                &gt;&gt;&gt;
              </motion.span>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
