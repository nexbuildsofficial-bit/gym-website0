'use client';

import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Instagram, Twitter } from 'lucide-react';
import { useState, useCallback, useRef } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  goal: string;
  services: string[];
  age: number;
  gender: string;
  height: number;
  weight: number;
  experience: string;
  message: string;
}

const availableServices = [
  'Personal Training', 'Group Classes', 'Nutrition Coaching', 'Open Gym', 'Sports Massage', 'Online Coaching'
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    goal: '',
    services: [],
    age: 25,
    gender: 'male',
    height: 66,
    weight: 70,
    experience: 'beginner',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playTick = useCallback(() => {
    try {
      if (typeof window === 'undefined') return;
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtxRef.current = new AudioContextClass();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Ignore audio errors (e.g. strict autoplay policies)
    }
  }, []);

  const handleChange = useCallback((field: keyof FormData, value: string | number | string[]) => {
    if (['age', 'height', 'weight'].includes(field as string)) {
      playTick();
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, [playTick]);

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service) 
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would POST to an API endpoint
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  }, []);

  const getSliderStyle = (value: number, min: number, max: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, #CCFF00 ${percentage}%, rgba(255,255,255,0.05) ${percentage}%)`
    };
  };

  const sliderThumbClasses = "appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#CCFF00] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(204,255,0,0.5)] [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-[#CCFF00] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-[0_0_15px_rgba(204,255,0,0.5)]";

  return (
    <section className="pt-24 pb-10 md:pt-40 md:pb-20 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto">
      <div className="text-center mb-10 md:mb-20">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 md:mb-6 uppercase">
          Let&apos;s Get to <span className="text-[#CCFF00]">Work</span>
        </h1>
        <p className="text-white/60 text-base sm:text-lg md:text-xl font-medium max-w-xl mx-auto">
          Ready to commit? Fill out the form below. We screen all potential members to strictly maintain our training environment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12 xl:gap-24">

        {/* Contact Form - Made Broader by spanning 2 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 p-6 sm:p-8 md:p-12 rounded-[40px] bg-[#111] border border-white/5 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CCFF00]/5 blur-[120px] rounded-full pointer-events-none" aria-hidden="true"></div>

          {submitted ? (
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="w-20 h-20 rounded-full bg-[#CCFF00] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(204,255,0,0.3)]">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 className="text-3xl font-black mb-3 text-white">Application Submitted!</h3>
              <p className="text-white/60 text-lg">Our head coach will be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10 space-y-8" noValidate>
              
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-[10px] uppercase font-bold tracking-widest text-white/50">Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="John Doe"
                    autoComplete="name"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#CCFF00] transition-colors shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-[10px] uppercase font-bold tracking-widest text-white/50">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="john@example.com"
                    autoComplete="email"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#CCFF00] transition-colors shadow-inner"
                  />
                </div>
              </div>

              {/* Phone & Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-phone" className="text-[10px] uppercase font-bold tracking-widest text-white/50">Phone Number</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#CCFF00] transition-colors shadow-inner"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label htmlFor="contact-age" className="text-[10px] uppercase font-bold tracking-widest text-white/50">Age</label>
                    <span className="text-[#CCFF00] font-black text-xl leading-none">{formData.age} <span className="text-[10px] text-white/50 uppercase">yrs</span></span>
                  </div>
                  <div className="flex items-center h-[26px]">
                    <input
                      id="contact-age"
                      type="range"
                      min="16"
                      max="80"
                      value={formData.age}
                      onChange={(e) => handleChange('age', parseInt(e.target.value))}
                      style={getSliderStyle(formData.age, 16, 80)}
                      className={`w-full h-3 rounded-full outline-none transition-all ${sliderThumbClasses}`}
                    />
                  </div>
                </div>
              </div>

              {/* Custom Sliders for Height & Weight */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label htmlFor="contact-height" className="text-[10px] uppercase font-bold tracking-widest text-white/50">Height</label>
                    <span className="text-[#CCFF00] font-black text-2xl leading-none">{Math.floor(formData.height / 12)}&apos; {formData.height % 12}&quot; <span className="text-[10px] text-white/50 uppercase">ft/in</span></span>
                  </div>
                  <div className="h-[26px] flex items-center">
                    <input
                      id="contact-height"
                      type="range"
                      min="48"
                      max="90"
                      value={formData.height}
                      onChange={(e) => handleChange('height', parseInt(e.target.value))}
                      style={getSliderStyle(formData.height, 48, 90)}
                      className={`w-full h-3 rounded-full outline-none transition-all ${sliderThumbClasses}`}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label htmlFor="contact-weight" className="text-[10px] uppercase font-bold tracking-widest text-white/50">Weight</label>
                    <span className="text-[#CCFF00] font-black text-2xl leading-none">{formData.weight} <span className="text-[10px] text-white/50 uppercase">kg</span></span>
                  </div>
                  <div className="h-[26px] flex items-center">
                    <input
                      id="contact-weight"
                      type="range"
                      min="40"
                      max="150"
                      value={formData.weight}
                      onChange={(e) => handleChange('weight', parseInt(e.target.value))}
                      style={getSliderStyle(formData.weight, 40, 150)}
                      className={`w-full h-3 rounded-full outline-none transition-all ${sliderThumbClasses}`}
                    />
                  </div>
                </div>
              </div>

              {/* Gender & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <fieldset className="space-y-3">
                  <legend className="text-[10px] uppercase font-bold tracking-widest text-white/50 mb-2">Gender</legend>
                  <div className="flex gap-3">
                    {['Male', 'Female', 'Others'].map((g) => (
                      <label key={g} className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={g.toLowerCase()}
                          checked={formData.gender === g.toLowerCase()}
                          onChange={(e) => handleChange('gender', e.target.value)}
                          className="sr-only"
                        />
                        <div className={`text-center py-3 rounded-xl border text-[11px] font-bold uppercase tracking-widest transition-all ${formData.gender === g.toLowerCase() ? 'bg-[#CCFF00] border-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.2)]' : 'bg-black/50 border-white/10 text-white/50 hover:border-white/30 hover:bg-white/5'}`}>
                          {g}
                        </div>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="space-y-3">
                  <legend className="text-[10px] uppercase font-bold tracking-widest text-white/50 mb-2">Training Experience</legend>
                  <div className="flex gap-3">
                    {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                      <label key={level} className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="experience"
                          value={level.toLowerCase()}
                          checked={formData.experience === level.toLowerCase()}
                          onChange={(e) => handleChange('experience', e.target.value)}
                          className="sr-only"
                        />
                        <div className={`text-center py-3 rounded-xl border text-[11px] font-bold uppercase tracking-widest transition-all ${formData.experience === level.toLowerCase() ? 'bg-[#CCFF00] border-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.2)]' : 'bg-black/50 border-white/10 text-white/50 hover:border-white/30 hover:bg-white/5'}`}>
                          {level}
                        </div>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Services Selector */}
              <div className="space-y-3 pt-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/50">Services of Interest</label>
                <div className="flex flex-wrap gap-3">
                  {availableServices.map((service) => {
                    const isSelected = formData.services.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${isSelected ? 'bg-[#CCFF00] text-black border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.3)] scale-105' : 'bg-black/50 text-white/70 border-white/10 hover:border-white/40 hover:bg-white/5'}`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label htmlFor="contact-goal" className="text-[10px] uppercase font-bold tracking-widest text-white/50">Primary Goal</label>
                <select
                  id="contact-goal"
                  value={formData.goal}
                  onChange={(e) => handleChange('goal', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#CCFF00] transition-colors appearance-none shadow-inner"
                >
                  <option value="" disabled className="text-white/50 bg-[#111]">Select your primary objective...</option>
                  <option value="hypertrophy" className="text-black bg-white">Muscle Hypertrophy (Mass)</option>
                  <option value="strength" className="text-black bg-white">Power &amp; Strength</option>
                  <option value="fatloss" className="text-black bg-white">Fat Loss &amp; Conditioning</option>
                  <option value="athletics" className="text-black bg-white">Athletic Performance</option>
                </select>
              </div>

              <div className="space-y-2 pt-2">
                <label htmlFor="contact-message" className="text-[10px] uppercase font-bold tracking-widest text-white/50">Additional Details / Injury History</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#CCFF00] transition-colors resize-none shadow-inner"
                  placeholder="Tell us anything else we should know before taking you on..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full py-5 mt-6 bg-[#CCFF00] text-black rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_40px_rgba(204,255,0,0.5)] transition-all"
              >
                Submit Application
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Contact Details - lg:col-span-1 */}
        <div className="flex flex-col justify-start lg:justify-center space-y-12 lg:pl-4">
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-8 md:mb-12">Location &amp; <br/>Contact</h3>

            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black transition-all flex-shrink-0 shadow-[0_0_20px_rgba(204,255,0,0)] group-hover:shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                  <MapPin size={24} aria-hidden="true" />
                </div>
                <div className="pt-1">
                  <h5 className="font-bold text-xl mb-2 text-white group-hover:text-[#CCFF00] transition-colors">The Facility</h5>
                  <address className="text-white/50 leading-relaxed font-medium not-italic text-sm">108 Iron District,<br/>Industrial Area, Phase 4<br/>Mumbai, India 400072</address>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black transition-all flex-shrink-0 shadow-[0_0_20px_rgba(204,255,0,0)] group-hover:shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                  <Phone size={24} aria-hidden="true" />
                </div>
                <div className="pt-1">
                  <h5 className="font-bold text-xl mb-2 text-white group-hover:text-[#CCFF00] transition-colors">Direct Line</h5>
                  <a href="tel:+919876543210" className="text-white/50 leading-relaxed font-medium hover:text-white transition-colors text-sm">+91 98765 43210</a>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black transition-all flex-shrink-0 shadow-[0_0_20px_rgba(204,255,0,0)] group-hover:shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                  <Mail size={24} aria-hidden="true" />
                </div>
                <div className="pt-1">
                  <h5 className="font-bold text-xl mb-2 text-white group-hover:text-[#CCFF00] transition-colors">General Inquiries</h5>
                  <a href="mailto:intake@fitusion.com" className="text-white/50 leading-relaxed font-medium hover:text-white transition-colors text-sm">intake@fitusion.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10">
            <p className="text-[10px] uppercase font-bold tracking-widest text-white/50 mb-5">Follow The Movement</p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow on Instagram" className="w-14 h-14 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] transition-all hover:scale-110">
                <Instagram size={22} aria-hidden="true" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Follow on X" className="w-14 h-14 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] transition-all hover:scale-110">
                <Twitter size={22} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
