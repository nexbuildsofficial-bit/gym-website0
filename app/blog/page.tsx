import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CTA } from '@/components/CTA';
import { blogPosts } from '@/lib/blogData';
import { BlogList } from './BlogList';

export const metadata = {
  title: 'Blog & Intel | Fitusion',
  description: 'Master your body with our library of elite training protocols, nutrition science, and recovery strategies.',
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#CCFF00] selection:text-black overflow-hidden pt-24">
      <Navbar />
      
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6">
            The <span className="text-[#CCFF00]">Intel</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Master your body with our library of elite training protocols, nutrition science, and recovery strategies.
          </p>
        </div>

        <BlogList posts={blogPosts} />
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
