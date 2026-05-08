'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, Bot, ArrowRight } from 'lucide-react';

interface Message { role: 'bot' | 'user'; text: string; options?: string[]; }
interface FormState { step: 'idle' | 'name' | 'email' | 'phone' | 'goal' | 'done'; name: string; email: string; phone: string; goal: string; }

const KB: Record<string, string> = {
  plans: "We have 3 membership tiers:\n\n💪 **Base Package** — ₹2,999/mo\n• Basic equipment, locker, 1 free PT session, off-peak hours\n\n🔥 **Pro Athlete** — ₹5,499/mo (Most Popular)\n• 24/7 access, elite machinery, group classes, sauna & cold plunge, weekly body scan\n\n👑 **Elite Coaching** — ₹14,999/mo\n• Everything in Pro + 3 PT sessions/week, custom nutrition, monthly physiotherapy, priority booking",
  price: "Our plans start at ₹2,999/month for Base, ₹5,499/month for Pro Athlete, and ₹14,999/month for Elite Coaching. We also offer a day pass for ₹999.",
  hours: "We're open Monday–Sunday, 8:00 AM – 5:00 PM. Pro Athlete and Elite members enjoy 24/7 access!",
  location: "We're at 108 Iron District, Industrial Area, Phase 4, Mumbai, India 400072.",
  contact: "📞 +91 98765 43210\n📧 intake@fitusion.com\n💬 WhatsApp: +91 9591978558",
  trainers: "Our elite coaches include specialized trainers in strength, HIIT, yoga, and sports conditioning. Every trainer is certified and has 5+ years of experience.",
  features: "Our facilities include:\n• State-of-the-art equipment\n• Climate-controlled environment\n• Body composition lab\n• Premium recovery zones\n• Towel service, protein bar, private showers, lockers, valet parking, Wi-Fi, lounge, pro shop",
  services: "We offer: Cardio Training, Strength Build, Fat Loss, HIIT Workouts, Barbell Basics, Kettlebell Masterclass, Personal Training, Group Classes, Nutrition Coaching, Online Coaching, Sports Massage.",
  exercises: "Check out our exercise library with guides on: The Perfect Deadlift, Advanced Hypertrophy, Kettlebell Flow Dynamics, Olympic Weightlifting, Calisthenics Mastery, and Mobility & Recovery.",
  freeze: "Yes! Elite Coaching and Pro Athlete members can freeze memberships for up to 2 months/year at no extra charge.",
  cancel: "You can cancel anytime with 30-day notice. No hidden cancellation fees.",
  daypass: "We offer a one-time day pass for ₹999 — full facility access + one group class included.",
  tips: "💡 Quick fitness tips:\n• Always warm up 5-10 mins before lifting\n• Protein intake: aim for 1.6-2.2g per kg of body weight\n• Sleep 7-9 hours for optimal recovery\n• Progressive overload is key to muscle growth\n• Stay hydrated — drink 3-4L of water daily",
  nutrition: "🥗 Nutrition basics:\n• Eat protein with every meal (chicken, eggs, paneer, whey)\n• Complex carbs before workout (oats, rice, sweet potato)\n• Healthy fats: nuts, avocado, olive oil\n• Post-workout: protein shake within 30 mins\n• Our Elite plan includes a custom nutrition plan!",
  beginner: "🏋️ Beginner tips:\n• Start with compound movements (squat, bench, deadlift)\n• Focus on form over weight\n• Train 3-4 days/week with rest days\n• Our Base Package (₹2,999/mo) is perfect for beginners with 1 free PT session included!",
};

const KEYWORDS: [string[], string][] = [
  [['plan', 'membership', 'tier', 'package', 'subscribe', 'join'], 'plans'],
  [['price', 'cost', 'fee', 'charge', 'rate', 'afford', 'rupee', '₹', 'how much', 'pricing'], 'price'],
  [['hour', 'time', 'open', 'close', 'when', 'schedule', 'timing'], 'hours'],
  [['where', 'location', 'address', 'direction', 'map', 'find you', 'situated'], 'location'],
  [['contact', 'call', 'phone', 'email', 'reach', 'whatsapp', 'number'], 'contact'],
  [['trainer', 'coach', 'instructor', 'staff', 'team'], 'trainers'],
  [['feature', 'facility', 'amenity', 'equipment', 'shower', 'locker', 'sauna', 'towel', 'parking'], 'features'],
  [['service', 'program', 'class', 'cardio', 'strength', 'hiit', 'kettlebell', 'barbell', 'yoga'], 'services'],
  [['exercise', 'workout', 'deadlift', 'hypertrophy', 'calisthenics', 'olympic', 'mobility'], 'exercises'],
  [['freeze', 'pause', 'hold', 'suspend'], 'freeze'],
  [['cancel', 'stop', 'quit', 'leave', 'end'], 'cancel'],
  [['day pass', 'trial', 'one day', 'single day', 'try'], 'daypass'],
  [['tip', 'advice', 'suggest', 'recommend', 'help me'], 'tips'],
  [['nutrition', 'diet', 'food', 'eat', 'protein', 'meal', 'calorie'], 'nutrition'],
  [['beginner', 'start', 'new', 'first time', 'never been', 'newbie'], 'beginner'],
];

function matchQuery(input: string): string | null {
  const lower = input.toLowerCase();
  for (const [keywords, key] of KEYWORDS) {
    if (keywords.some(kw => lower.includes(kw))) return key;
  }
  return null;
}

const QUICK_OPTIONS = ['💰 Plans & Pricing', '🏋️ Services', '🏢 Features', '📍 Location & Hours', '💡 Fitness Tips', '📝 Register / Enquiry'];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hey there! 💪 I'm **FitBot**, your FiTusion assistant.\n\nHow can I help you today?", options: QUICK_OPTIONS },
  ]);
  const [input, setInput] = useState('');
  const [formState, setFormState] = useState<FormState>({ step: 'idle', name: '', email: '', phone: '', goal: '' });
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const addBot = useCallback((text: string, options?: string[]) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text, options }]);
    }, 600);
  }, []);

  const handleFormStep = useCallback((userText: string) => {
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    const s = formState;
    if (s.step === 'name') {
      setFormState(prev => ({ ...prev, name: userText, step: 'email' }));
      addBot("Great! Now, what's your **email address**?");
    } else if (s.step === 'email') {
      if (!userText.includes('@')) { addBot("That doesn't look like a valid email. Please try again."); return; }
      setFormState(prev => ({ ...prev, email: userText, step: 'phone' }));
      addBot("And your **phone number**?");
    } else if (s.step === 'phone') {
      setFormState(prev => ({ ...prev, phone: userText, step: 'goal' }));
      addBot("Last one! What's your **fitness goal**? (e.g., Muscle Building, Fat Loss, General Fitness, Strength)");
    } else if (s.step === 'goal') {
      setFormState(prev => ({ ...prev, goal: userText, step: 'done' }));
      addBot(`✅ **Registration complete!**\n\n📋 Here's what we got:\n• Name: ${s.name}\n• Email: ${s.email}\n• Phone: ${s.phone}\n• Goal: ${userText}\n\nOur team will reach out to you within 24 hours! 🎉\n\nAnything else I can help with?`, QUICK_OPTIONS);
      setFormState({ step: 'idle', name: '', email: '', phone: '', goal: '' });
    }
  }, [formState, addBot]);

  const handleSend = useCallback((text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput('');

    if (formState.step !== 'idle') { handleFormStep(msg); return; }

    setMessages(prev => [...prev, { role: 'user', text: msg }]);

    const clean = msg.replace(/[💰🏋️🏢📍💡📝]/g, '').trim().toLowerCase();

    if (clean.includes('register') || clean.includes('enquiry') || clean.includes('sign up') || clean.includes('enroll') || clean.includes('form')) {
      setFormState(prev => ({ ...prev, step: 'name' }));
      addBot("Let's get you registered! 📝\n\nFirst, what's your **full name**?");
      return;
    }

    const key = matchQuery(clean);
    if (key && KB[key]) {
      addBot(KB[key], QUICK_OPTIONS);
    } else if (clean.includes('thank') || clean.includes('bye') || clean.includes('ok')) {
      addBot("You're welcome! 😊 Feel free to ask anytime. See you at FiTusion! 💪");
    } else if (clean.includes('hi') || clean.includes('hello') || clean.includes('hey')) {
      addBot("Hey! 👋 Welcome to FiTusion! What would you like to know?", QUICK_OPTIONS);
    } else {
      addBot("I'm not sure about that, but I can help with:\n• Plans & pricing\n• Services & programs\n• Gym features & amenities\n• Location & hours\n• Fitness tips & nutrition\n• Registration\n\nTry asking about any of these! 😊", QUICK_OPTIONS);
    }
  }, [input, formState, handleFormStep, addBot]);

  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} className="text-[#CCFF00] font-bold">{part.slice(2, -2)}</strong>
            : part
        )}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => { setOpen(!open); setTimeout(() => inputRef.current?.focus(), 300); }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-[#CCFF00] text-black flex items-center justify-center shadow-[0_4px_20px_rgba(204,255,0,0.4)] hover:shadow-[0_4px_30px_rgba(204,255,0,0.6)] transition-shadow"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={24} strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={24} strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Notification dot */}
      {!open && (
        <div className="fixed bottom-[72px] right-6 z-[9999] pointer-events-none">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
        </div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-[9999] w-[360px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-120px)] rounded-[24px] bg-[#0A0A0A] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-[#111] to-[#0A0A0A] border-b border-white/10 flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#CCFF00] flex items-center justify-center">
                <Bot size={20} className="text-black" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">FitBot</h3>
                <p className="text-[#CCFF00] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" /> Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-[#CCFF00]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={14} className="text-[#CCFF00]" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#CCFF00] text-black font-medium rounded-br-md'
                        : 'bg-[#1A1A1A] text-white/90 border border-white/5 rounded-bl-md'
                    }`}>
                      {renderText(msg.text)}
                    </div>
                    {msg.options && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.options.map(opt => (
                          <button
                            key={opt}
                            onClick={() => handleSend(opt)}
                            className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/5 text-white/70 border border-white/10 hover:bg-[#CCFF00]/10 hover:border-[#CCFF00]/30 hover:text-[#CCFF00] transition-all"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <User size={14} className="text-white/60" />
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex gap-2 items-center">
                  <div className="w-7 h-7 rounded-full bg-[#CCFF00]/20 flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-[#CCFF00]" />
                  </div>
                  <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-[#0A0A0A] flex-shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder={formState.step !== 'idle' ? 'Type your answer...' : 'Ask me anything...'}
                  className="flex-1 bg-[#1A1A1A] border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#CCFF00]/50 transition-colors"
                />
                <motion.button
                  onClick={() => handleSend()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-[#CCFF00] flex items-center justify-center text-black flex-shrink-0"
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
