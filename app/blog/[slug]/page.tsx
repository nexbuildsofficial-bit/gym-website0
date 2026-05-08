import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CTA } from '@/components/CTA';
import { blogPosts } from '@/lib/blogData';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const post = blogPosts.find(p => p.slug === resolvedParams.slug);
  if (!post) return { title: 'Not Found' };
  
  return {
    title: `${post.title} | Fitusion Intel`,
    description: post.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const post = blogPosts.find(p => p.slug === resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#CCFF00] selection:text-black overflow-hidden pt-24">
      <Navbar />
      
      <article className="py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#CCFF00] text-xs font-bold uppercase tracking-widest mb-10 hover:text-white transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Intel
        </Link>
        
        <div className="mb-10">
          <div className="inline-block px-4 py-1.5 bg-white/10 text-[#CCFF00] text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
            {post.category}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-white/50 text-xs font-bold uppercase tracking-widest">
            <span>{post.date}</span>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-video rounded-[30px] md:rounded-[40px] overflow-hidden mb-16 border border-white/10 shadow-[0_0_50px_rgba(204,255,0,0.05)]">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill 
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
            priority
          />
        </div>

        <div className="prose prose-invert max-w-3xl mx-auto prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-p:text-white/80 prose-p:leading-[1.8] prose-p:text-[17px] md:prose-p:text-[19px] prose-a:text-[#CCFF00] prose-strong:text-white prose-strong:font-semibold prose-li:text-white/80 prose-li:text-[17px] md:prose-li:text-[19px] prose-li:leading-[1.8] prose-li:marker:text-white/40 prose-ul:mt-6 prose-ul:mb-10 prose-ul:space-y-3 font-sans">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>

      <CTA />
      <Footer />
    </main>
  );
}
