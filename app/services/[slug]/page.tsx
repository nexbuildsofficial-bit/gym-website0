import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const plans = {
  'cardio-training': {
    title: 'Cardio Training',
    desc: 'Boost endurance and heart health with high-energy cardio sessions designed to keep you moving.',
    longDesc: 'Our Cardio Training program is engineered to push your cardiovascular system to its absolute limits, ensuring maximum endurance and stamina. Whether you are training for a marathon or just want to improve your daily energy levels, this program incorporates a mix of steady-state and interval training. We use top-of-the-line treadmills, rowers, and assault bikes to guarantee a sweat-drenching, heart-pumping session every time. Burn calories, improve lung capacity, and feel unstoppable.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200'
  },
  'strength-build': {
    title: 'Strength Build',
    desc: 'Develop power and resilience through expert-guided strength training tailored to all fitness levels.',
    longDesc: 'The Strength Build plan is the ultimate pathway to gaining raw power and muscle density. We focus on compound movements like squats, deadlifts, and bench presses, paired with accessory exercises to ensure balanced muscular development. Our coaches provide precise programming, tracking your progressive overload week by week. This isn\'t just about lifting heavy; it\'s about lifting right. Build a bulletproof body, increase your bone density, and develop functional strength that translates to real-world power.',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1200'
  },
  'fat-loss': {
    title: 'Fat Loss',
    desc: 'Shed unwanted fat with dynamic workout routines and fat-burning strategies that deliver lasting results.',
    longDesc: 'Our Fat Loss program is a comprehensive, science-backed approach to shedding body fat while preserving lean muscle mass. This plan combines metabolic conditioning, resistance training, and tailored nutritional guidance to turn your body into a calorie-burning machine. We don\'t believe in crash diets; we focus on sustainable, long-term habits. Expect high-energy circuits, core-blasting movements, and a supportive community to keep you accountable every step of the way.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200'
  },
  'hiit-workouts': {
    title: 'HIIT Workouts',
    desc: 'Maximize calorie burn and improve fitness with short, intense high-intensity interval training sessions.',
    longDesc: 'Short on time but want maximum results? Our HIIT (High-Intensity Interval Training) Workouts are exactly what you need. These 30 to 45-minute sessions alternate between bursts of all-out effort and brief recovery periods. This method is scientifically proven to boost your metabolism for up to 24 hours post-workout. From kettlebell swings to plyometric jumps, every session is uniquely designed to challenge your limits, torch fat, and build explosive athletic power.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200'
  },
  'barbell-basics': {
    title: 'Barbell Basics',
    desc: 'Master the fundamental barbell lifts with perfect form and technique.',
    longDesc: 'Barbell Basics is a foundational course designed for both beginners and intermediate lifters looking to perfect their technique. The barbell is the most effective tool in the gym for building total-body strength, but it requires precision. In this program, you will learn the exact mechanics of the squat, deadlift, overhead press, and bench press. Our coaches will break down every movement, fix your imbalances, and teach you how to brace your core safely so you can lift heavier and injury-free.',
    image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=1200'
  },
  'kettlebell-masterclass': {
    title: 'Kettlebell Masterclass',
    desc: 'Learn advanced kettlebell flows, swings, and snatches for functional power.',
    longDesc: 'The kettlebell is the ultimate tool for functional, full-body power. In this masterclass, you will go beyond the basic swing. We will teach you the Turkish get-up, the snatch, the clean and press, and complex fluid flows. Kettlebell training improves grip strength, core stability, and cardiovascular endurance all at once. Whether you are an athlete looking for an edge or a fitness enthusiast wanting to spice up your routine, this class will forge an unbreakable, athletic physique.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200'
  },
  'cardio-power-boost': {
    title: 'Cardio Power Boost',
    desc: 'An elite endurance class designed to push your aerobic capacity to the next level.',
    longDesc: 'Cardio Power Boost takes traditional cardio and flips it on its head. This isn\'t about jogging endlessly on a treadmill; it\'s about athletic conditioning. Using a combination of sled pushes, battle ropes, assault bikes, and rowing intervals, you will train your body to recover faster and perform harder. This program is heavily favored by combat athletes and functional fitness competitors who need to maintain power output even when completely exhausted.',
    image: 'https://images.unsplash.com/photo-1526506114867-2708aeb9f270?q=80&w=1200'
  },
  'hypertrophy': {
    title: 'Hypertrophy',
    desc: 'Maximize muscle growth with science-backed bodybuilding techniques.',
    longDesc: 'Hypertrophy is a targeted program for those looking to build significant muscle mass. Utilizing time-under-tension, progressive overload, and high-volume training methodologies, we isolate and fatigue muscle groups to force adaptation and growth. This isn\'t about functional fitness; it\'s about pure muscle building and aesthetic body sculpting. We cover everything from advanced drop-sets to blood flow restriction training to ensure you break past any plateaus.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200'
  },
  'rope-climbing': {
    title: 'Rope Climbing',
    desc: 'Master the art of rope climbing and build elite upper body strength.',
    longDesc: 'Rope climbing is one of the most physically demanding exercises, testing your grip, back, and core simultaneously. In this specialized class, we break down the technique of the J-hook and Spanish wrap, allowing you to use your legs to ascend efficiently. Once the technique is mastered, we move onto legless rope climbs to build elite upper-body pulling strength. This class is essential for OCR (Obstacle Course Racing) athletes and CrossFit competitors.',
    image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=1200'
  },
  'trx-suspension': {
    title: 'TRX Suspension',
    desc: 'Leverage gravity and your own bodyweight for a comprehensive full-body workout.',
    longDesc: 'TRX Suspension Training was born in the Navy SEALs, and it remains one of the most effective ways to build core stability and functional strength using only your bodyweight. By adjusting the angle of your body, you can instantly increase or decrease the difficulty of any movement. This class focuses on total body integration, ensuring that your core is engaged in every single exercise, leading to better balance, flexibility, and a rock-solid midsection.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200'
  },
  'personal-training': {
    title: 'Personal Training',
    desc: 'Get 1-on-1 expert coaching, biomechanical analysis, and a fully customized roadmap to success.',
    longDesc: 'Our elite Personal Training service provides you with a dedicated coach who will analyze your biomechanics, understand your goals, and build a fully customized training roadmap. You will receive 1-on-1 attention during every single session to ensure your form is flawless and you are pushing to the optimal intensity. We track every metric, from your lifting volume to your body fat percentage, ensuring guaranteed results.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200'
  },
  'nutrition-plans': {
    title: 'Nutrition Plans',
    desc: 'Fuel your workouts with macro-calculated meal plans tailored to your specific metabolic needs.',
    longDesc: 'You cannot out-train a bad diet. Our Nutrition Plans are engineered by certified sports nutritionists to complement your training perfectly. Whether your goal is to shred body fat, pack on lean muscle, or perform at an elite athletic level, we provide you with exact macro-nutrient breakdowns and meal timing strategies. We remove the guesswork so you can focus entirely on executing in the gym.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200'
  },
  'sports-massage': {
    title: 'Sports Massage',
    desc: 'Accelerate recovery and prevent injuries with deep tissue massage and active release techniques.',
    longDesc: 'Recovery is where the growth happens. Our in-house sports massage therapists specialize in deep tissue manipulation, myofascial release, and trigger point therapy. This service is designed to break down scar tissue, increase blood flow to fatigued muscles, and dramatically improve your joint mobility. Essential for anyone training at a high intensity who wants to remain injury-free.',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1200'
  },
  'online-coaching': {
    title: 'Online Coaching',
    desc: 'Train anywhere in the world with our elite digital programming and weekly progress check-ins.',
    longDesc: 'Take the FiTusion experience with you anywhere in the world. Our Online Coaching platform gives you direct access to our elite programming and nutritional protocols through a digital portal. You will receive customized weekly workout plans, form-check video analysis, and a direct line to your coach for ongoing support. It is the perfect solution for busy professionals and remote athletes.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200'
  }
};

export function generateStaticParams() {
  return Object.keys(plans).map((slug) => ({
    slug,
  }));
}

export default async function PlanPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const planData = plans[resolvedParams.slug as keyof typeof plans];

  if (!planData) {
    notFound();
  }

  return (
    <main className="relative bg-[#080808] text-[#F5F5F0] min-h-screen selection:bg-[#CCFF00] selection:text-black">
      <Navbar />
      
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="relative w-full h-[300px] md:h-[500px] rounded-[40px] overflow-hidden mb-12 border border-white/10">
          <Image 
            src={planData.image} 
            alt={planData.title} 
            fill 
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#CCFF00] uppercase drop-shadow-xl">{planData.title}</h1>
          </div>
        </div>

        <div className="bg-[#111] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-white uppercase tracking-widest border-b border-white/10 pb-4">Program Overview</h2>
          <p className="text-xl md:text-2xl text-white/80 font-medium leading-relaxed mb-8">
            {planData.desc}
          </p>
          <div className="prose prose-invert max-w-none">
            <p className="text-white/60 text-lg leading-loose">
              {planData.longDesc}
            </p>
          </div>

          <div className="mt-12 flex gap-6">
            <a href="/contact" className="px-8 py-4 bg-[#CCFF00] text-black font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform">
              Join This Program
            </a>
            <a href="/services" className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-[0.2em] rounded-full hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors">
              View All Plans
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
