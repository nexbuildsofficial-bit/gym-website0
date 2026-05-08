'use client';

import { motion } from 'motion/react';

const stats = [
  { value: '30k', label: 'Sq. Ft Facility', delay: 0.2 },
  { value: '50+', label: 'Expert Coaches', delay: 0.3 },
  { value: '24/7', label: 'Member Access', delay: 0.4 },
  { value: '12k+', label: 'Happy Clients', delay: 0.5 },
];

export default function AboutAnimations() {
  return (
    <div className="grid grid-cols-2 gap-8 mt-12">
      {stats.map((stat) => (
        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: stat.delay }}>
          <h4 className="text-4xl font-black text-[#CCFF00] mb-2">{stat.value}</h4>
          <p className="tracking-widest uppercase text-xs font-bold text-white/50">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
