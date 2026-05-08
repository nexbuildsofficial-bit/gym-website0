'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const exercises = [
  {
    title: 'The Perfect Deadlift',
    slug: 'the-perfect-deadlift',
    category: 'Strength',
    image: '/deadlift_1777833115581.png',
    desc: 'Master the king of all exercises. Discover biomechanical cues to protect your spine while maximizing glute and hamstring engagement.',
  },
  {
    title: 'Advanced Hypertrophy',
    slug: 'advanced-hypertrophy',
    category: 'Bodybuilding',
    image: '/hypertrophy_1777833129631.png',
    desc: 'Understanding time-under-tension and metabolic stress. How to build serious muscle mass through strategic failure and drop sets.',
  },
  {
    title: 'Kettlebell Flow Dynamics',
    slug: 'kettlebell-flow-dynamics',
    category: 'Functional',
    image: '/kettlebell_1777833143238.png',
    desc: 'Blend strength and cardiovascular endurance. The ultimate guide to Turkish get-ups, snatches, and fluid kettlebell combinations.',
  },
  {
    title: 'Calisthenics Mastery',
    slug: 'calisthenics-mastery',
    category: 'Bodyweight',
    image: '/calisthenics_1777833158785.png',
    desc: 'From your first strict pull-up to human flags. The progressive overload strategy for elite bodyweight strength.',
  },
  {
    title: 'Olympic Weightlifting',
    slug: 'olympic-weightlifting',
    category: 'Power',
    image: '/olympic_lift_1777833177149.png',
    desc: 'Master the snatch and the clean & jerk. Develop explosive power, speed, and supreme athletic coordination.',
  },
  {
    title: 'Mobility & Recovery',
    slug: 'mobility-and-recovery',
    category: 'Recovery',
    image: '/mobility_1777833190450.png',
    desc: 'Optimize your tissue health. Learn advanced stretching, foam rolling, and contrast therapy techniques to prevent injuries.',
  },
  {
    title: 'Core Crusher',
    slug: 'core-crusher',
    category: 'Core',
    image: '/core_crusher.png',
    desc: 'Build a bulletproof core. From anti-rotation exercises to explosive medicine ball throws for functional stability.',
  },
  {
    title: 'Advanced Plyometrics',
    slug: 'advanced-plyometrics',
    category: 'Power',
    image: '/advanced_plyometrics.png',
    desc: 'Increase your vertical leap and sprinting speed. A deep dive into box jumps, depth drops, and reactive training.',
  },
  {
    title: 'HIIT Intensive',
    slug: 'hiit-intensive',
    category: 'Conditioning',
    image: '/hiit_intensive.png',
    desc: 'Maximize fat loss without sacrificing muscle. The science behind intervals, work-to-rest ratios, and heart rate zones.',
  },
  {
    title: 'Yoga for Lifters',
    slug: 'yoga-for-lifters',
    category: 'Flexibility',
    image: '/yoga_lifters.png',
    desc: 'Unlock tight hips and frozen shoulders. Specific flows designed to complement heavy barbell training and accelerate recovery.',
  },
  {
    title: 'Powerlifting Prep',
    slug: 'powerlifting-prep',
    category: 'Strength',
    image: '/powerlifting_prep.png',
    desc: 'Peaking for competition. How to run a peaking cycle, manage central nervous system fatigue, and hit new 1RMs safely.',
  },
] as const;

interface ExerciseItem {
  title: string;
  slug: string;
  category: string;
  image: string;
  desc: string;
}

import Link from 'next/link';

function ExerciseCard({ item, index }: { item: ExerciseItem; index: number }) {
  const cardRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['0 1', '0.5 0.5'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-5 md:gap-12 items-center group cursor-pointer`}
    >
      <div className="w-full md:w-1/2 h-[280px] sm:h-[350px] md:h-[500px] relative rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#111]">
        <motion.div
          initial={isMobile ? { filter: 'grayscale(100%)' } : undefined}
          whileInView={isMobile ? { filter: 'grayscale(0%)' } : undefined}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src={item.image}
            alt={`${item.title} exercise demonstration`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover contrast-125 transition-all duration-700 group-hover:scale-105 ${!isMobile ? 'grayscale group-hover:grayscale-0' : ''}`}
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>
        <div className="absolute top-6 left-6 bg-[#CCFF00] text-black text-[10px] uppercase tracking-widest font-black py-2 px-4 rounded-full">
          {item.category}
        </div>
      </div>

      <div className="w-full md:w-1/2 space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight group-hover:text-[#CCFF00] transition-colors duration-300">
          {item.title}
        </h2>
        <p className="text-white/60 text-base md:text-lg leading-relaxed font-medium max-w-lg">
          {item.desc}
        </p>
        <Link href={`/exercises/${item.slug}`} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white mt-8 group-hover:text-[#CCFF00] transition-colors" aria-label={`Read guide for ${item.title}`}>
          Read Guide <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ExercisesList() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="py-8 md:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-16 md:space-y-32">
      {exercises.map((item, i) => (
        <ExerciseCard key={item.title} item={item} index={i} />
      ))}
    </section>
  );
}
