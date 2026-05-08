'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/blogData';

export function BlogSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="blog" className="py-12 md:py-24 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto" aria-label="Latest Articles">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-3 md:mb-4 leading-tight uppercase">
            Knowledge<br/>
            <span className="text-[#CCFF00]">Is Power</span>
          </h2>
          <p className="text-white/50 text-xs md:text-sm max-w-xl font-medium">
            Expert tips, training strategies, and nutrition guides straight from our elite coaching staff.
          </p>
        </div>
        <Link href="/blog" className="shrink-0 flex items-center gap-2 px-6 py-3 bg-[#111] hover:bg-[#CCFF00] hover:text-black transition-colors rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/10 hover:border-[#CCFF00] group">
          View All Intelligence
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.slice(0, 3).map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 80 }}
            className={`group rounded-[30px] overflow-hidden bg-[#111] border border-white/5 flex flex-col cursor-pointer transition-all hover:border-[#CCFF00]/40 hover:shadow-[0_0_30px_rgba(204,255,0,0.15)] ${i === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
          >
            <Link href={`/blog/${post.slug}`} className="flex flex-col h-full outline-none">
              <div className={`relative w-full ${i === 0 ? 'h-64 md:h-80' : 'h-64'} overflow-hidden`}>
                <motion.div
                  initial={isMobile ? { filter: 'grayscale(100%)' } : undefined}
                  whileInView={isMobile ? { filter: 'grayscale(0%)' } : undefined}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 ${!isMobile ? 'grayscale group-hover:grayscale-0' : ''}`} 
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80"></div>
                
                {/* Premium Index Number */}
                <div className="absolute -top-6 -right-4 text-white/[0.03] group-hover:text-[#CCFF00]/10 transition-colors duration-500 text-[180px] font-black leading-none tracking-tighter pointer-events-none select-none">
                  {(i + 1).toString().padStart(2, '0')}
                </div>

                <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#CCFF00] text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(204,255,0,0.4)]">
                  {post.category}
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between z-10 -mt-6">
                <div>
                  <h3 className={`font-black uppercase tracking-tight text-white group-hover:text-[#CCFF00] transition-colors mb-3 ${i === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                    {post.title}
                  </h3>
                  <p className="text-white/50 text-sm font-medium leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-2">
                    <Clock size={12} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
