'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { useState, useCallback, useRef } from 'react';

const plans = [
  {
    id: 'starter',
    name: 'Base Package',
    price: '₹2,999',
    period: '/month',
    desc: 'Perfect for beginners starting their journey.',
    features: ['Access to basic gym equipment', 'Locker access', '1 Free PT Session', 'Access during off-peak hours'],
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro Athlete',
    price: '₹5,499',
    period: '/month',
    desc: 'Our most popular plan for dedicated lifters.',
    features: ['24/7 Unlimited Access', 'Access to Elite Machinery', 'Group Classes included', 'Sauna & Cold Plunge access', 'Weekly Body Composition Scan'],
    popular: true,
  },
  {
    id: 'elite',
    name: 'Elite Coaching',
    price: '₹14,999',
    period: '/month',
    desc: 'Comprehensive plan with personal coaching.',
    features: ['Everything in Pro Athlete', '3 PT Sessions per week', 'Custom Nutrition Plan', 'Physiotherapy once a month', 'Priority Class Booking'],
    popular: false,
  },
] as const;

function PricingCard({ plan, index }: { plan: typeof plans[number]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isPopular = plan.popular;

  // Mouse position for fluid 3D tilt (desktop only)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), springConfig);

  // Shine gradient position
  const shineX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const shineY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);
  const shineLeftStr = useTransform(shineX, (v) => `${v}%`);
  const shineTopStr = useTransform(shineY, (v) => `${v}%`);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    // Only apply 3D effect on desktop (lg: 1024px+)
    if (window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onViewportEnter={() => setHasEntered(true)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -16 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        type: 'spring', 
        damping: 20, 
        stiffness: 250, 
        delay: hasEntered ? 0 : index * 0.15 
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative flex-1 rounded-[24px] sm:rounded-[28px] md:rounded-[32px] p-6 sm:p-8 md:p-10 flex flex-col border transition-shadow duration-500 ${
        isPopular
          ? 'bg-gradient-to-b from-[#151515] to-[#0A0A0A] border-[#CCFF00]/40 shadow-[0_0_50px_rgba(204,255,0,0.08)]'
          : 'bg-[#111] border-white/[0.07]'
      } ${isHovered && !isPopular ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(204,255,0,0.05)]' : ''} ${isHovered && isPopular ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(204,255,0,0.15)]' : ''}`}
      role="article"
      aria-label={`${plan.name} plan at ${plan.price}${plan.period}`}
    >
      {/* Fluid hover shine overlay — always rendered, opacity controlled */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-[1] overflow-hidden"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute w-[200px] h-[200px] rounded-full"
          style={{
            left: shineLeftStr,
            top: shineTopStr,
            transform: 'translate(-50%, -50%)',
            background: isPopular
              ? 'radial-gradient(circle, rgba(204,255,0,0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Hover border glow */}
      <motion.div
        className={`absolute inset-0 rounded-[inherit] pointer-events-none border ${
          isPopular ? 'border-[#CCFF00]/60' : 'border-white/[0.12]'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {isPopular && (
        <div className="absolute -top-4 right-6 sm:right-10 bg-[#CCFF00] text-black text-[10px] sm:text-xs font-black uppercase tracking-widest py-1.5 px-4 sm:py-2 sm:px-6 rounded-full shadow-[0_0_20px_rgba(204,255,0,0.3)]">
          Most Popular
        </div>
      )}

      <div className="relative z-[2] mb-6 md:mb-8">
        <h3 className="text-2xl font-bold tracking-tighter mb-2">{plan.name}</h3>
        <p className="text-white/50 text-sm mb-6 h-10">{plan.desc}</p>
        <div className="flex items-end gap-1">
          <motion.span
            className="text-4xl md:text-5xl font-black"
            animate={{ scale: isHovered ? 1.03 : 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          >
            {plan.price}
          </motion.span>
          <span className="text-white/40 font-bold mb-1">{plan.period}</span>
        </div>
      </div>

      <div className="relative z-[2] w-full h-[1px] bg-white/10 mb-6 md:mb-8"></div>

      <ul className="relative z-[2] flex-1 space-y-3 md:space-y-4 mb-8 md:mb-10">
        {plan.features.map((feat, fi) => (
          <motion.li
            key={feat}
            className="flex items-start gap-4 text-white/80 text-sm font-medium"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + fi * 0.05, duration: 0.4 }}
          >
            <div className={`mt-0.5 rounded-full p-1 flex-shrink-0 ${isPopular ? 'bg-[#CCFF00]/20 text-[#CCFF00]' : 'bg-white/10 text-white'}`}>
              <Check size={14} strokeWidth={3} aria-hidden="true" />
            </div>
            {feat}
          </motion.li>
        ))}
      </ul>

      <motion.button
        className={`relative z-[2] w-full py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 group overflow-hidden ${
          isPopular
            ? 'bg-[#CCFF00] text-black'
            : 'bg-white/5 text-white border border-white/10 hover:border-white/20'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={`Select ${plan.name} plan`}
      >
        {/* Button shine sweep on hover */}
        {isPopular && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        )}
        <span className="relative">Select Plan</span>
        <ArrowRight size={16} className="relative transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" aria-hidden="true" />
      </motion.button>
    </motion.div>
  );
}

export default function ServicesPricing() {
  return (
    <div className="w-full max-w-6xl mx-auto" style={{ perspective: '2000px' }}>
      <div className="flex flex-col lg:flex-row gap-5 md:gap-8 justify-center items-stretch">
        {plans.map((plan, i) => (
          <PricingCard key={plan.id} plan={plan} index={i} />
        ))}
      </div>
    </div>
  );
}
