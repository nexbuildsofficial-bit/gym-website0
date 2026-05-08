'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { BlogPost } from '@/lib/blogData';

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, i) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 80 }}
          className="group rounded-[30px] bg-[#111] border border-white/5 overflow-hidden flex flex-col hover:border-[#CCFF00]/50 transition-all hover:shadow-[0_0_40px_rgba(204,255,0,0.15)]"
        >
          <Link href={`/blog/${post.slug}`} className="flex flex-col h-full outline-none block">
            <div className="relative w-full h-60 overflow-hidden">
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
            <div className="p-6 flex-1 flex flex-col justify-between z-10 -mt-4">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-[#CCFF00] transition-colors mb-3">
                  {post.title}
                </h3>
                <p className="text-white/50 text-sm font-medium leading-relaxed line-clamp-3">
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
  );
}
