import { Navbar } from '@/components/Navbar';
import { FloatingGymElements } from '@/components/FloatingGymElements';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('./ContactForm'));

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with FiTusion. Fill out our membership application form or visit us at 108 Iron District, Mumbai.',
};

export default function ContactPage() {
  return (
    <main className="relative bg-[#080808] text-[#F5F5F0] min-h-screen selection:bg-[#CCFF00] selection:text-black">
      <Navbar />
      <FloatingGymElements />
      <ContactForm />
      <Footer />
    </main>
  );
}
