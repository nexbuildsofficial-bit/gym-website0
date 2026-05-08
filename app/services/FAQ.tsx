'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';

const faqs = [
  { q: 'Can I freeze my membership?', a: 'Yes, Elite Coaching and Pro Athlete members can freeze their memberships for up to 2 months per year without any additional charges.' },
  { q: 'Are personal training sessions included?', a: 'The Base Package includes 1 complimentary session. Elite Coaching includes 3 sessions per week. Additional sessions can be purchased separately.' },
  { q: 'Do you offer a day pass?', a: 'We offer a one-time day pass for ₹999 which gives you access to all facilities and one group class.' },
  { q: 'What is the cancellation policy?', a: 'You can cancel your membership at any time with a 30-day notice. There are no hidden cancellation fees.' },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <div key={faq.q} className="bg-[#080808] rounded-2xl border border-white/5 overflow-hidden transition-colors hover:border-white/10">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full text-left p-6 flex justify-between items-center outline-none"
            aria-expanded={openIndex === i}
          >
            <h4 className={`text-lg font-bold transition-colors duration-300 ${openIndex === i ? 'text-[#CCFF00]' : 'text-white'}`}>
              {faq.q}
            </h4>
            <motion.div
              animate={{ rotate: openIndex === i ? 45 : 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className={`flex-shrink-0 ml-4 rounded-full p-1 ${openIndex === i ? 'bg-[#CCFF00] text-black' : 'bg-white/10 text-white'}`}
            >
              <Plus size={18} strokeWidth={3} />
            </motion.div>
          </button>
          
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <div className="px-6 pb-6 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
