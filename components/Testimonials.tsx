'use client';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';

const reviews = [
  { id: 1, name: 'James T.', location: 'LA, USA', text: 'I Love The Variety Of Workouts On Fit Fusion. Whether It\'s HIIT, Yoga, Or Strength Training, There\'s Always Something New To Try. The Progress Tracking Tools Keep Me Motivated!', rating: 5, image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800' },
  { id: 2, name: 'Ryan Blaze', location: 'NYC, USA', text: 'The trainers here are absolutely incredible. They push you to your limits while ensuring your form is perfect. I\'ve seen more progress in 3 months than in 3 years of working out alone.', rating: 5, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600' },
  { id: 3, name: 'Ethan Maxx', location: 'London, UK', text: 'Cleanest facility I\'ve ever been to with state-of-the-art equipment. The community is so supportive and inspiring. Joining was the best decision for my health.', rating: 5, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600' },
  { id: 4, name: 'Sarah Jenkins', location: 'Austin, TX', text: 'I never thought I would look forward to going to the gym. The group classes are so energetic and the music is always on point. Highly recommend!', rating: 5, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600' },
  { id: 5, name: 'Marcus Doe', location: 'Toronto, CA', text: 'The personalized nutrition plan combined with the strength training completely transformed my physique. Worth every penny!', rating: 5, image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=600' },
  { id: 6, name: 'Chloe Smith', location: 'Sydney, AU', text: 'Great atmosphere and serious lifters. If you want to put in the work and see real results, this is the place to be.', rating: 4, image: 'https://images.unsplash.com/photo-1526506114867-2708aeb9f270?q=80&w=600' },
  { id: 7, name: 'David Kim', location: 'Seoul, KR', text: 'The recovery amenities are top notch. Sauna and cold plunges right after an intense workout make all the difference.', rating: 5, image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600' },
  { id: 8, name: 'Elena Rossi', location: 'Rome, IT', text: 'Fantastic trainers who adapt the exercises to fit my previous injuries. I feel safe and challenged at the same time.', rating: 5, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600' },
  { id: 9, name: "Liam O'Connor", location: 'Dublin, IE', text: 'The best gym community I\'ve been a part of. The monthly challenges keep everyone engaged and motivated.', rating: 4, image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600' },
  { id: 10, name: 'Aisha Patel', location: 'Mumbai, IN', text: 'Yoga classes are a perfect balance to the heavy lifting. The instructors really focus on breathing and mindfulness.', rating: 5, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600' },
] as const;

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  const currentReview = reviews[activeIndex];
  
  // Keep the images static so the layout doesn't jump
  const mainImage = reviews[0].image;
  const rightImg1 = reviews[1];
  const rightImg2 = reviews[2];

  return (
    <section className="py-10 md:py-24 px-4 sm:px-6 md:px-12 max-w-[1200px] mx-auto overflow-hidden" aria-label="Testimonials">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-3 md:mb-4 leading-tight">
          Your Success<br/>
          <span className="text-[#CCFF00]">Stories, Our Inspiration</span>
        </h2>
        <p className="text-white/50 text-xs md:text-sm max-w-xl mx-auto font-medium">
          See How Our Customers Have Achieved Their Goals And Let Their Journeys Inspire Yours!
        </p>
      </div>

      <div className="relative flex flex-col lg:flex-row gap-6 md:gap-12 mt-10 md:mt-20 items-end">
        {/* Main static image container */}
        <div className="relative w-full lg:w-3/5 h-[400px] sm:h-[500px] md:h-[600px]">
          <div className="absolute inset-x-0 top-0 bottom-12 md:right-12 z-10 overflow-hidden rounded-[40px] bg-[#111]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent z-10 mix-blend-multiply"></div>
            <Image 
              src={mainImage}
              alt="Gym environment"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top grayscale contrast-125 mix-blend-lighten"
              loading="lazy"
            />
          </div>
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div 
              key={`card-${currentReview.id}`}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute bottom-0 right-0 w-[90%] md:w-[450px] bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/5 rounded-[30px] p-8 z-20 shadow-2xl"
            >
              <blockquote className="text-white/80 text-sm md:text-base leading-relaxed mb-8 font-medium italic min-h-[100px]">
                &quot;{currentReview.text}&quot;
              </blockquote>
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="text-[#CCFF00] font-bold text-lg mb-1">– {currentReview.name}</h4>
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">{currentReview.location}</p>
                </div>
                <div className="flex gap-1 text-[#CCFF00]" role="img" aria-label={`${currentReview.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={i < currentReview.rating ? "currentColor" : "transparent"} strokeWidth={i < currentReview.rating ? 0 : 1.5} color="currentColor" aria-hidden="true" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Static thumbnails / Navigation */}
        <div className="w-full lg:w-2/5 flex flex-col justify-end gap-8 pb-12">
          <div className="flex gap-4 self-end mb-4">
             <button
               onClick={prevSlide}
               aria-label="Previous testimonial"
               className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#CCFF00] hover:text-black hover:border-transparent transition-all"
             >
               <ChevronLeft size={24} strokeWidth={2.5} aria-hidden="true" />
             </button>
             <button
               onClick={nextSlide}
               aria-label="Next testimonial"
               className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#CCFF00] hover:text-black hover:border-transparent transition-all"
             >
               <ChevronRight size={24} strokeWidth={2.5} aria-hidden="true" />
             </button>
          </div>
          <div className="flex gap-4 sm:gap-6 h-[250px] sm:h-[300px] md:h-[400px]">
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              initial={isMobile ? { filter: 'grayscale(100%)', opacity: 0.5 } : undefined}
              whileInView={isMobile ? { filter: 'grayscale(0%)', opacity: 1 } : undefined}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className={`flex-1 rounded-[30px] overflow-hidden relative shadow-lg border border-white/5 bg-[#111] ${!isMobile ? 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500' : ''}`}
            >
              <Image src={rightImg1.image} fill sizes="(max-width: 1024px) 50vw, 20vw" className="object-cover object-top" alt="Gym detail" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <p className="absolute bottom-6 right-6 text-[#CCFF00] vertical-text transform rotate-180 uppercase tracking-[0.3em] text-xs font-bold" style={{writingMode: 'vertical-rl'}}>{rightImg1.name}</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }} 
              initial={isMobile ? { filter: 'grayscale(100%)', opacity: 0.5 } : undefined}
              whileInView={isMobile ? { filter: 'grayscale(0%)', opacity: 1 } : undefined}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className={`flex-1 rounded-[30px] overflow-hidden relative shadow-lg border border-white/5 bg-[#111] ${!isMobile ? 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500' : ''}`}
            >
              <Image src={rightImg2.image} fill sizes="(max-width: 1024px) 50vw, 20vw" className="object-cover object-top" alt="Gym detail" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <p className="absolute bottom-6 right-6 text-[#CCFF00] vertical-text transform rotate-180 uppercase tracking-[0.3em] text-xs font-bold" style={{writingMode: 'vertical-rl'}}>{rightImg2.name}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
