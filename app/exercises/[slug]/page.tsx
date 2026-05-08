import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const exercisesData = {
  'the-perfect-deadlift': {
    title: 'The Perfect Deadlift',
    category: 'Strength',
    image: '/deadlift_1777833115581.png',
    author: 'Coach Marcus',
    date: 'OCT 12, 2023',
    content: `
      <h2>The King of All Exercises</h2>
      <p>The deadlift is the undisputed king of all exercises. It works more muscles simultaneously than any other movement, including the squat. However, it is also the exercise most commonly performed incorrectly, leading to severe lumbar spine injuries. The key to a perfect deadlift lies not in the pull, but in the setup.</p>
      
      <h3>Step 1: The Setup</h3>
      <p>Approach the bar so that it cuts your foot in half. Your shins should be about an inch away from the bar. Grab the bar just outside your legs. Do not move the bar. Drop your shins to the bar, squeeze your chest up to set your back in rigid extension, and take a massive breath into your belly to brace your core.</p>

      <h3>Step 2: The Pull</h3>
      <p>Do not yank the bar. Instead, "pull the slack" out of the bar. You should hear a distinct click before the plates ever leave the ground. Leg press the floor away from you while simultaneously driving your hips forward. Keep the bar dragging up your shins and thighs. If you are bleeding from the shins, you are doing it right.</p>

      <h3>Step 3: The Lockout</h3>
      <p>Lock your hips and knees simultaneously. Do not hyperextend your lower back at the top. Stand tall, proud, and squeeze your glutes. Return the bar to the floor by breaking at the hips first, sliding the bar down your thighs, and then bending your knees once the bar passes them.</p>
    `,
  },
  'advanced-hypertrophy': {
    title: 'Advanced Hypertrophy',
    category: 'Bodybuilding',
    image: '/hypertrophy_1777833129631.png',
    author: 'Dr. Sarah Jenkins',
    date: 'NOV 04, 2023',
    content: `
      <h2>The Science of Muscle Growth</h2>
      <p>Hypertrophy (muscle growth) is not about lifting the heaviest weight possible. It is about maximizing mechanical tension, metabolic stress, and muscle damage. Advanced lifters must move beyond simple 3 sets of 10 to continue seeing growth.</p>
      
      <h3>Time Under Tension (TUT)</h3>
      <p>The amount of time your muscle is working during a set matters. Instead of dropping the weight quickly, control the eccentric (lowering) phase for 3-4 seconds. This maximizes microscopic muscle tears, which your body repairs to build larger, stronger fibers.</p>

      <h3>Strategic Failure</h3>
      <p>You must train close to absolute muscular failure. If you can do 12 reps with a weight, but stop at 10, you have left the most hypertrophic reps on the table. The last 2-3 grueling reps where the bar speed slows down significantly are where all the growth occurs.</p>

      <h3>Drop Sets and Rest-Pause</h3>
      <p>To accumulate more volume and metabolic stress, incorporate drop sets. After reaching failure on a machine press, immediately drop the weight by 20% and crank out another 5-8 reps. Alternatively, use rest-pause: hit failure, rack the weight, take 10 deep breaths, and unrack it to get 3 more reps.</p>
    `,
  },
  'kettlebell-flow-dynamics': {
    title: 'Kettlebell Flow Dynamics',
    category: 'Functional',
    image: '/kettlebell_1777833143238.png',
    author: 'Coach Leo',
    date: 'JAN 18, 2024',
    content: `
      <h2>Fluid Power and Coordination</h2>
      <p>Kettlebell flows are sequences of movements seamlessly linked together without putting the bell down. This type of training challenges your grip, cardiovascular system, and central nervous system in ways traditional weightlifting cannot.</p>
      
      <h3>The Foundation: The Swing</h3>
      <p>Everything in kettlebell training starts with the hip hinge. The Russian kettlebell swing is a ballistic movement driven entirely by the glutes and hamstrings. Your arms are merely ropes connecting your body to the bell. Master the aggressive hip snap before moving to flows.</p>

      <h3>Building a Flow</h3>
      <p>A simple flow could consist of: Swing -> Clean -> Squat -> Press. The transition between these movements must be smooth. When the bell is in the rack position (resting on the forearm and chest), you must brace your core as if preparing for a punch. This absorbs the impact and transfers power effectively.</p>

      <h3>The Turkish Get-Up</h3>
      <p>While often performed slowly and methodically, the TGU is the ultimate test of shoulder stability and core strength. Incorporating a TGU at the beginning or end of a flow tests your concentration when fatigued. Keep your eyes on the bell at all times during the ascent.</p>
    `,
  },
  'calisthenics-mastery': {
    title: 'Calisthenics Mastery',
    category: 'Bodyweight',
    image: '/calisthenics_1777833158785.png',
    author: 'Alex "Gravity" Chen',
    date: 'FEB 22, 2024',
    content: `
      <h2>Defying Gravity</h2>
      <p>Calisthenics is the purest form of strength training, utilizing only your bodyweight to build relative strength, incredible core control, and aesthetic, dense muscle. The journey from a basic push-up to a planche requires absolute dedication.</p>
      
      <h3>Progressive Overload in Bodyweight Training</h3>
      <p>Unlike weightlifting where you simply add plates to a bar, calisthenics requires you to change the leverage. To make a push-up harder, you elevate your feet. To make it even harder, you lean forward into a pseudo-planche push-up. The physics of levers dictate your progression.</p>

      <h3>The Pull-up Paradigm</h3>
      <p>A strict, dead-hang pull-up with hollow body positioning is the foundation of pulling strength. Once you can perform 15 strict pull-ups, the progression moves towards the muscle-up. The key to the muscle-up is the explosive false grip and the transition over the bar, pulling down to your hips rather than just your chest.</p>

      <h3>Static Holds</h3>
      <p>Skills like the Front Lever and Human Flag require isometric strength. Training these involves holding easier variations (like the tuck front lever) for time, usually aiming for 15-20 second holds across multiple sets to condition the tendons before extending the leverage.</p>
    `,
  },
  'olympic-weightlifting': {
    title: 'Olympic Weightlifting',
    category: 'Power',
    image: '/olympic_lift_1777833177149.png',
    author: 'Coach Elena',
    date: 'MAR 05, 2024',
    content: `
      <h2>Speed, Power, and Precision</h2>
      <p>Olympic weightlifting consists of two contested lifts: the Snatch, and the Clean and Jerk. These movements require the highest level of explosive power, mobility, and technical precision of any strength sport in the world.</p>
      
      <h3>The Snatch</h3>
      <p>The snatch is a symphony of violence and grace. It involves taking the barbell from the floor to overhead in one continuous motion. The key is triple extension—the simultaneous explosive extension of the hips, knees, and ankles. You must aggressively jump the weight up, shrug violently, and then actively pull yourself under the bar into a deep overhead squat in the blink of an eye.</p>

      <h3>The Clean and Jerk</h3>
      <p>The clean and jerk allows you to move heavier weight than the snatch. The clean pulls the bar to the front rack position on the shoulders. After standing up the clean, you must re-brace and perform the jerk, utilizing a powerful leg dip and drive to launch the bar overhead, splitting your legs to drop under it rapidly.</p>

      <h3>Mobility is Non-Negotiable</h3>
      <p>You cannot be an Olympic weightlifter if you are tight. You need elite ankle dorsiflexion, hip external rotation, thoracic extension, and shoulder flexion. Without these, you will physically be unable to receive the bar in the correct, safe positions.</p>
    `,
  },
  'mobility-and-recovery': {
    title: 'Mobility & Recovery',
    category: 'Recovery',
    image: '/mobility_1777833190450.png',
    author: 'Dr. James Thorne',
    date: 'APR 11, 2024',
    content: `
      <h2>The Unsung Hero of Performance</h2>
      <p>You do not get stronger during your workout; you get stronger recovering from your workout. Elite athletes understand that tissue quality, nervous system regulation, and joint mobility dictate their ceiling for strength and power.</p>
      
      <h3>Active vs. Passive Mobility</h3>
      <p>Passive stretching (holding a stretch for 30 seconds) temporarily lengthens tissue but does not teach your nervous system how to control that new range of motion. Active mobility, such as PAILs/RAILs (Progressive and Regressive Angular Isometric Loading), strengthens the muscle at its end range, preventing injuries when you are under a heavy barbell.</p>

      <h3>Contrast Therapy</h3>
      <p>Alternating between a 180°F dry sauna and a 40°F cold plunge forces your blood vessels to rapidly dilate and constrict. This creates a "pumping" mechanism that flushes metabolic waste (lactic acid) out of your muscles and rushes oxygen-rich blood back in, significantly reducing DOMS (Delayed Onset Muscle Soreness).</p>

      <h3>Sleep: The Ultimate PED</h3>
      <p>There is no supplement, ice bath, or massage gun that can replace 8 hours of deep sleep. During slow-wave sleep, your pituitary gland releases the majority of your daily human growth hormone (HGH), which is directly responsible for tissue repair. Prioritize a cool, dark room and cut off screen time an hour before bed.</p>
    `,
  },
};

export function generateStaticParams() {
  return Object.keys(exercisesData).map((slug) => ({
    slug,
  }));
}

export default async function ExerciseGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = exercisesData[resolvedParams.slug as keyof typeof exercisesData];

  if (!data) {
    notFound();
  }

  return (
    <main className="relative bg-[#080808] text-[#F5F5F0] min-h-screen selection:bg-[#CCFF00] selection:text-black">
      <Navbar />
      
      <article className="pt-40 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <Link href="/exercises" className="inline-flex items-center gap-2 text-white/50 hover:text-[#CCFF00] transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Exercises
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-[#CCFF00] text-black text-[10px] uppercase tracking-widest font-black py-1.5 px-3 rounded-full">
              {data.category}
            </span>
            <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{data.date}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">{data.title}</h1>
          <p className="text-[#CCFF00] font-bold text-sm tracking-widest uppercase">By {data.author}</p>
        </header>

        <div className="relative w-full aspect-[21/9] rounded-[30px] overflow-hidden mb-16 bg-[#111] border border-white/5">
          <Image 
            src={data.image} 
            alt={data.title} 
            fill 
            className="object-cover" 
          />
        </div>

        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-white prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h3:text-xl prose-h3:text-[#CCFF00] prose-p:text-white/70 prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
        
        <div className="mt-20 pt-10 border-t border-white/10 flex justify-center">
          <Link href="/contact" className="px-8 py-4 bg-[#CCFF00] text-black font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform">
            Book a Session
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
