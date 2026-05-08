'use client';
import { motion } from 'motion/react';
import { Dumbbell, Activity, Timer, Medal } from 'lucide-react';

export function FloatingGymElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Element 1: Dumbbell Top Left */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] left-[10%] text-white/5"
      >
        <Dumbbell size={120} strokeWidth={1} />
      </motion.div>

      {/* Element 2: Activity Monitor Middle Right */}
      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[45%] right-[8%] text-[#CCFF00]/5"
      >
        <Activity size={180} strokeWidth={1} />
      </motion.div>

      {/* Element 3: Timer Bottom Left */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[20%] left-[15%] text-white/5"
      >
        <Timer size={140} strokeWidth={1} />
      </motion.div>

      {/* Element 4: Medal Top Right */}
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-[25%] right-[20%] text-white/5"
      >
        <Medal size={100} strokeWidth={1} />
      </motion.div>

      {/* Subtle abstract gradient shapes for depth */}
      <div className="absolute top-[20%] left-[30%] w-[400px] h-[400px] bg-[#CCFF00]/[0.02] rounded-full blur-[120px]" />
      <div className="absolute bottom-[10%] right-[30%] w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[150px]" />
    </div>
  );
}
