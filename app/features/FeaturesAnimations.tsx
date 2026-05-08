'use client';

import { motion } from 'motion/react';
import { Dumbbell, Wind, ShieldCheck, Activity, HeartPulse } from 'lucide-react';

const features = [
  { icon: Dumbbell, title: "State-of-the-art Equipment", desc: "Equipped with Eleiko barbells, prime fitness machines, and calibrated plates. We spare no expense on biomechanics, providing tools that minimize joint stress while maximizing muscle recruitment. Our facility features custom-built lifting platforms, specialized machines for isolated training, and an extensive range of free weights to cater to both powerlifters and bodybuilders alike." },
  { icon: Wind, title: "Climate Control Matrix", desc: "Advanced HVAC systems keep the air fresh and temperature optimal even during peak hour heavy lifting sessions. We maintain a strict 68°F (20°C) environment with humidity control to ensure you stay cool. Our intelligent air circulation system continuously cycles in fresh outdoor air, removing CO2 and odors to keep your lungs filled with crisp oxygen during intense cardio bursts." },
  { icon: ShieldCheck, title: "Immaculate Hygiene", desc: "Hospital-grade air filtration and hourly deep-cleaning protocols ensure a spotless training environment. Our staff utilizes electrostatic sprayers and medical-grade disinfectants on all touchpoints. We supply endless antibacterial wipes and strictly enforce equipment wiping policies, giving you the peace of mind to focus entirely on your workout without health concerns." },
  { icon: Activity, title: "Body Composition Lab", desc: "In-house DEXA scans and metabolic testing to keep your metrics accurate and progress strictly data-driven. We move beyond simple scales by measuring your precise muscle mass, fat percentage, and bone density. Our sports scientists will walk you through your results and adjust your macros and training volume to overcome any stubborn plateaus." },
  { icon: HeartPulse, title: "Recovery Zone", desc: "Features ice baths, infrared saunas, and normatec compression boots to accelerate your recovery. Muscle growth happens when you rest, which is why our recovery suite is unparalleled. Contrast therapy between our 40°F cold plunges and 180°F dry saunas reduces inflammation and flushes lactic acid, allowing you to train harder, more frequently, and completely injury-free." },
];

export default function FeaturesAnimations() {
  return (
    <div className="space-y-8 md:space-y-12">
      {features.map((feat, i) => {
        const Icon = feat.icon;
        return (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4 md:gap-6 group"
          >
            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black transition-all">
              <Icon size={22} className="md:w-7 md:h-7" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1 md:mb-2 group-hover:text-[#CCFF00] transition-colors">{feat.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm md:text-base max-w-md">{feat.desc}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
