'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight, Dumbbell } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/features' },
  { label: 'Service', href: '/services' },
  { label: 'Exercise', href: '/exercises' },
  { label: 'Blog', href: '/blog' },
] as const;

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileHovered, setMobileHovered] = useState<number | null>(null);

  const handleMouseEnter = useCallback((i: number) => setHoveredIndex(i), []);
  const handleMouseLeave = useCallback(() => setHoveredIndex(null), []);
  const toggleMobile = useCallback(() => setMobileOpen((p) => !p), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-4 md:px-8 md:py-6 bg-transparent"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo — always visible */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer z-50" aria-label="FiTusion home">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4 12L8 4H20L16 12H4Z" fill="#CCFF00" />
            <path d="M5 13L8 20H15L11 13H5Z" fill="#CCFF00" fillOpacity="0.8" />
          </svg>
          <span className="text-xl font-bold text-[#F5F5F0]">FiTusion</span>
        </Link>

        {/* Desktop nav links — hidden on mobile */}
        <div className="hidden lg:flex gap-8 items-center z-50" role="menubar">
          {navLinks.map((link, i) => (
            <Link
              href={link.href}
              key={link.label}
              className="relative text-sm font-medium text-gray-400 transition-colors hover:text-[#F5F5F0]"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              role="menuitem"
            >
              {link.label}
              {hoveredIndex === i && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#CCFF00]"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs + Mobile hamburger */}
        <div className="flex gap-2 md:gap-4 items-center z-50">
          {/* Contact Us — hidden on mobile, visible on desktop */}
          <motion.div whileHover={{ scale: 1.05 }} className="hidden lg:block">
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-2 bg-[#CCFF00] text-black rounded-full text-sm font-semibold">
              Contact Us
            </Link>
          </motion.div>

          {/* Get Started — black bordered pill button */}
          <motion.div whileHover={{ scale: 1.05 }} className="hidden lg:block">
            <Link href="/services" className="inline-flex items-center justify-center px-5 py-2 md:px-6 bg-transparent text-[#F5F5F0] border-2 border-white/20 hover:border-[#CCFF00]/60 hover:text-[#CCFF00] transition-all duration-300 rounded-full text-xs md:text-sm font-semibold">
              Get Started
            </Link>
          </motion.div>

          {/* Mobile hamburger button — visible only on mobile */}
          <button
            onClick={toggleMobile}
            className="lg:hidden relative flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 text-[#CCFF00] hover:bg-[#CCFF00]/10 hover:border-[#CCFF00]/30 transition-all shadow-[0_0_15px_rgba(204,255,0,0.1)]"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  className="absolute"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <X size={22} strokeWidth={2.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  className="absolute"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: -45, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Dumbbell size={22} strokeWidth={2.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ═══ Mobile Menu Overlay — Glassmorphism ═══ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-40 bg-black/80 lg:hidden"
              onClick={closeMobile}
              aria-hidden="true"
            />

            {/* Glassmorphism Panel */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="fixed top-[72px] left-3 right-3 z-50 lg:hidden shadow-[0_24px_80px_-12px_rgba(0,0,0,0.9),0_0_40px_rgba(204,255,0,0.04)]"
            >
              {/* Glass background layers */}
              <div className="relative bg-[#080808]/80 supports-[backdrop-filter]:bg-[#111111]/40 supports-[backdrop-filter]:backdrop-blur-2xl border border-white/[0.08] overflow-hidden rounded-[28px] transform-gpu">
                {/* Subtle top highlight */}
                <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />
                
                {/* Ambient glow */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-[#CCFF00]/[0.03] rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

                <div className="relative z-10 p-5 pt-4">
                  {/* Nav Links */}
                  <div className="flex flex-col gap-0.5">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.16, 1, 0.3, 1],
                          delay: mobileOpen ? 0.04 + i * 0.05 : 0,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeMobile}
                          onMouseEnter={() => setMobileHovered(i)}
                          onMouseLeave={() => setMobileHovered(null)}
                          className="group relative flex items-center justify-between py-3.5 px-4 rounded-2xl text-[17px] font-semibold text-white/90 hover:text-white transition-all duration-200"
                        >
                          {/* Hover background glow */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl bg-white/[0.06]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: mobileHovered === i ? 1 : 0 }}
                            transition={{ duration: 0.2 }}
                          />

                          <div className="relative flex items-center gap-3">
                            {/* Number index */}
                            <span className="text-[11px] font-mono text-[#CCFF00]/50 tabular-nums w-4">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            {/* Green accent bar on hover */}
                            <motion.div
                              className="w-[3px] h-5 rounded-full bg-[#CCFF00]"
                              initial={{ scaleY: 0, opacity: 0 }}
                              animate={{
                                scaleY: mobileHovered === i ? 1 : 0,
                                opacity: mobileHovered === i ? 1 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            />
                            <span>{link.label}</span>
                          </div>

                          <ChevronRight
                            size={16}
                            className="relative text-white/20 group-hover:text-[#CCFF00]/70 transition-colors duration-200"
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Divider with glow */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="my-4 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  />

                  {/* Mobile CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="flex flex-col gap-3"
                  >
                    <Link
                      href="/contact"
                      onClick={closeMobile}
                      className="group relative flex items-center justify-center py-3.5 bg-[#CCFF00] text-black rounded-2xl text-sm font-bold uppercase tracking-[0.08em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(204,255,0,0.25)]"
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">Contact Us</span>
                    </Link>
                    <Link
                      href="/services"
                      onClick={closeMobile}
                      className="flex items-center justify-center py-3.5 bg-white/[0.04] text-white/90 border border-white/[0.12] rounded-2xl text-sm font-bold uppercase tracking-[0.08em] hover:border-[#CCFF00]/30 hover:text-[#CCFF00] hover:bg-[#CCFF00]/[0.04] transition-all duration-300"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
