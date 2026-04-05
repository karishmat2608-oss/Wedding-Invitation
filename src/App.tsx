/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Heart, Clock, Send, ChevronDown } from 'lucide-react';

// --- Wedding Configuration ---
// PASTE YOUR IMAGE LINKS HERE
const WEDDING_IMAGES = {
  welcomeBackground: "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/a1259de4-7fa4-4710-849b-8467672ce94d.png",
  bridePhoto: "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/0189874e-6ad9-4183-87e1-d3888f761f0a.png",
  groomPhoto: "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/4dabfee4-cef2-4746-a8a2-7618ca5f2920.png",
  memories: [
    "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/e2253787-d3db-4aa2-ad28-c6e0ee1f25a2.png",
    "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/699b4499-c129-402c-a7b6-687c310cd1ff.png",
    "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/b145b85c-4097-4712-80b5-22a188387e26.png",
    "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/9928de3e-fa6c-4b35-a6ae-dcf8e8d883fc.png",
  ]
};

// --- Types ---
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// --- Components ---

const Section = ({ 
  children, 
  bgImage, 
  className = "" 
}: { 
  children: React.ReactNode; 
  bgImage: string; 
  className?: string;
}) => (
  <section 
    className={`relative min-h-screen flex flex-col items-center justify-center text-center p-6 bg-cover bg-center ${className}`}
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    <div className="absolute inset-0 bg-black/50 z-0" />
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative z-10 w-full max-w-4xl"
    >
      {children}
    </motion.div>
  </section>
);

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showFab, setShowFab] = useState(false);

  const weddingDate = useMemo(() => new Date("May 14, 2026 00:00:00").getTime(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const gap = weddingDate - now;

      if (gap < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(gap / (1000 * 60 * 60 * 24)),
        hours: Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((gap % (1000 * 60)) / 1000),
      });
    }, 1000);

    const handleScroll = () => {
      setShowFab(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [weddingDate]);

  const openMap = () => {
    window.open("https://www.google.com/maps/search/?api=1&query=RRR+Convention+Hall+Anantapur", "_blank");
  };

  const openValimaMap = () => {
    window.open("https://www.google.com/maps/search/?api=1&query=N+S+Grand+Anantapur", "_blank");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Wedding Invitation | Rizwana & Noor Mohammed',
          text: 'You are cordially invited to the wedding of Rizwana & Noor Mohammed.',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="relative selection:bg-wedding-gold selection:text-wedding-maroon">
      {/* Curtain Overlay */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            className="fixed inset-0 z-[100] flex overflow-hidden touch-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1] }}
          >
            <motion.div 
              initial={{ x: 0 }}
              animate={isOpen ? { x: "-100%" } : { x: 0 }}
              transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1] }}
              className="w-1/2 h-full bg-wedding-maroon flex items-center justify-end border-r border-wedding-gold/30 shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
            />
            <motion.div 
              initial={{ x: 0 }}
              animate={isOpen ? { x: "100%" } : { x: 0 }}
              transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1] }}
              className="w-1/2 h-full bg-wedding-maroon flex items-center justify-start border-l border-wedding-gold/30 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]"
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center z-50 text-white p-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-center"
              >
                <Heart className="w-16 h-16 text-wedding-gold mx-auto mb-6 animate-pulse" />
                <h1 className="font-serif text-4xl md:text-6xl mb-4 tracking-wider leading-tight">
                  Welcome to our <br /> Ghar Ki Pehli Shaadi
                </h1>
                <p className="text-wedding-cream/80 text-lg md:text-xl mb-12 font-light tracking-[0.2em] uppercase">Wedding Invitation</p>
                <button 
                  onClick={() => setIsOpen(true)}
                  className="px-10 py-5 bg-wedding-gold text-wedding-maroon font-bold rounded-full hover:bg-white active:scale-95 transition-all duration-300 shadow-[0_10px_30px_rgba(212,175,55,0.3)] uppercase tracking-widest text-sm min-h-[56px]"
                >
                  Open Invitation
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <AnimatePresence>
        {isOpen && showFab && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-8 right-6 z-[90] flex flex-col gap-4"
          >
            <button 
              onClick={handleShare}
              className="w-14 h-14 bg-white text-wedding-maroon rounded-full shadow-2xl flex items-center justify-center border border-wedding-gold/20 active:scale-90 transition-transform"
            >
              <Send size={24} className="-rotate-45" />
            </button>
            <button 
              onClick={openMap}
              className="w-14 h-14 bg-wedding-gold text-wedding-maroon rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform"
            >
              <MapPin size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`${!isOpen ? 'h-screen overflow-hidden' : 'scroll-smooth'}`}>
        
        {/* Welcome Section */}
        <Section bgImage={WEDDING_IMAGES.welcomeBackground} className="snap-start">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-wedding-gold font-serif italic text-2xl md:text-3xl mb-4">Bismillah-ir-Rahman-ir-Rahim</h2>
            <p className="text-wedding-cream/90 text-lg md:text-xl mb-6 font-light tracking-wide">Wedding Of</p>
            <h1 className="font-serif text-5xl md:text-8xl text-white mb-8 leading-tight drop-shadow-2xl">
              Rizwana <br />
              <span className="text-wedding-gold">&</span> <br />
              Noor Mohammed
            </h1>
            <div className="mt-12 animate-bounce opacity-50">
              <ChevronDown className="w-8 h-8 text-wedding-gold mx-auto" />
            </div>
          </motion.div>
        </Section>

        {/* Meet the Couple Section */}
        <Section bgImage="https://picsum.photos/seed/couple-bg/1920/1080" className="snap-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto px-4">
            {/* The Bride */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white/10 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-wedding-gold/30 shadow-2xl relative"
            >
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-6 border-2 border-wedding-gold/20">
                <img 
                  src={WEDDING_IMAGES.bridePhoto} 
                  alt="The Bride" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wedding-maroon/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                  <span className="text-wedding-gold font-serif text-2xl md:text-3xl tracking-widest uppercase">The Bride</span>
                </div>
              </div>
              <h3 className="font-serif text-wedding-gold text-3xl md:text-4xl mb-2">Rizwana</h3>
              <p className="text-wedding-cream/70 italic text-sm md:text-base">Daughter of Mr. Rajak Vali & Mrs. Mahaboob Bee</p>
            </motion.div>

            {/* The Groom */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white/10 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-wedding-gold/30 shadow-2xl relative"
            >
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-6 border-2 border-wedding-gold/20">
                <img 
                  src={WEDDING_IMAGES.groomPhoto} 
                  alt="The Groom" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wedding-maroon/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                  <span className="text-wedding-gold font-serif text-2xl md:text-3xl tracking-widest uppercase">The Groom</span>
                </div>
              </div>
              <h3 className="font-serif text-wedding-gold text-3xl md:text-4xl mb-2">Noor Mohammed</h3>
              <p className="text-wedding-cream/70 italic text-sm md:text-base">Son of Mr. Fakruddin & Mrs. Hazara Begum</p>
            </motion.div>
          </div>
        </Section>

        {/* Invitation Section */}
        <Section bgImage="https://picsum.photos/seed/wedding2/1920/1080" className="snap-start">
          <div className="border-2 border-wedding-gold/30 p-6 md:p-16 rounded-sm inline-block mx-4">
            <h2 className="font-serif text-wedding-gold text-3xl md:text-5xl mb-8">Invitation</h2>
            <p className="text-white text-base md:text-2xl leading-relaxed max-w-2xl mx-auto font-light">
              With the blessings of Allah and our beloved parents, 
              we cordially invite you to celebrate the Nikah and Valima 
              of our beloved children.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Heart className="text-wedding-gold w-5 h-5 md:w-6 md:h-6" />
              <Heart className="text-wedding-gold w-5 h-5 md:w-6 md:h-6" />
              <Heart className="text-wedding-gold w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
        </Section>

        {/* Details Section */}
        <Section bgImage="https://picsum.photos/seed/wedding3/1920/1080" className="snap-start">
          <h2 className="font-serif text-wedding-gold text-3xl md:text-5xl mb-12">Wedding Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 text-white w-full max-w-5xl px-4">
            <div className="bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl">
              <Calendar className="w-8 h-8 md:w-10 md:h-10 text-wedding-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl md:text-3xl mb-4 text-wedding-gold">Nikah</h3>
              <p className="text-lg md:text-xl mb-2">Thursday, 14th May 2026</p>
              <p className="text-wedding-cream/70 mb-6 text-sm md:text-base">RRR Convention Hall, Anantapur</p>
              <button 
                onClick={openMap}
                className="flex items-center gap-2 mx-auto px-8 py-3 bg-transparent border-2 border-wedding-gold text-wedding-gold rounded-full hover:bg-wedding-gold hover:text-wedding-maroon active:scale-95 transition-all font-bold text-sm uppercase tracking-widest min-h-[48px]"
              >
                <MapPin size={18} />
                Open Location
              </button>
            </div>

            <div className="bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl">
              <Clock className="w-8 h-8 md:w-10 md:h-10 text-wedding-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl md:text-3xl mb-4 text-wedding-gold">Valima</h3>
              <p className="text-lg md:text-xl mb-2">Friday, 15th May 2026</p>
              <p className="text-wedding-cream/70 text-sm md:text-base">7:00 PM Onwards</p>
               <p className="text-wedding-cream/70 mb-6 text-sm md:text-base">N S Grand, Anantapur</p>
               <button 
                onClick={openValimaMap}
                className="flex items-center gap-2 mx-auto px-8 py-3 bg-transparent border-2 border-wedding-gold text-wedding-gold rounded-full hover:bg-wedding-gold hover:text-wedding-maroon active:scale-95 transition-all font-bold text-sm uppercase tracking-widest min-h-[48px]"
              >
                <MapPin size={18} />
                Open Location
              </button>
            </div>
          </div>
        </Section>

        {/* Countdown Section */}
        <Section bgImage="https://picsum.photos/seed/wedding4/1920/1080" className="snap-start">
          <h2 className="font-serif text-wedding-gold text-3xl md:text-4xl mb-12 px-4">Counting Down to Forever</h2>
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-8 px-4">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="bg-wedding-maroon/90 backdrop-blur-md w-full md:w-32 h-24 md:h-32 flex flex-col items-center justify-center rounded-2xl border border-wedding-gold/30 shadow-2xl">
                <span className="text-3xl md:text-5xl font-bold text-wedding-gold">{item.value}</span>
                <span className="text-[10px] md:text-sm uppercase tracking-widest text-wedding-cream/80 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Memories Section */}
        <Section bgImage="https://picsum.photos/seed/wedding6/1920/1080" className="snap-start">
          <h2 className="font-serif text-wedding-gold text-3xl md:text-4xl mb-12">Our Memories</h2>
          <div className="w-full max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 gap-3 md:gap-8">
              {WEDDING_IMAGES.memories.map((img, i) => (
                <motion.div 
                  key={i}
                  className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-wedding-gold/20 relative group"
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src={img} 
                    alt={`Memory ${i + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
          <p className="text-wedding-cream/60 mt-8 italic flex items-center justify-center gap-2 text-sm">
            <Heart size={14} className="text-wedding-gold" />
            Our beautiful journey together
            <Heart size={14} className="text-wedding-gold" />
          </p>
        </Section>

        {/* Blessings Section */}
        <Section bgImage="https://picsum.photos/seed/wedding5/1920/1080" className="snap-start">
          <div className="max-w-xl mx-auto w-full px-4">
            <h2 className="font-serif text-wedding-gold text-3xl md:text-4xl mb-8">Send Your Blessings</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-wedding-gold transition-colors text-base"
              />
              <textarea 
                placeholder="Your Blessings & Wishes" 
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-wedding-gold transition-colors text-base"
              />
              <button className="w-full py-5 bg-wedding-gold text-wedding-maroon font-bold rounded-xl hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest text-sm min-h-[56px]">
                <Send size={18} />
                Submit Wishes
              </button>
            </form>
          </div>
        </Section>

        {/* Footer */}
        <footer className="bg-wedding-maroon text-wedding-cream py-16 px-6 text-center border-t border-wedding-gold/20">
          <div className="max-w-4xl mx-auto">
            <Heart className="w-8 h-8 text-wedding-gold mx-auto mb-4" />
            <p className="font-serif text-2xl mb-2">Rizwana & Noor Mohammed</p>
            <p className="text-wedding-cream/60 text-xs tracking-widest uppercase mb-8">May 14-15, 2026</p>
            <div className="h-px bg-wedding-gold/20 w-24 mx-auto mb-8" />
            <p className="text-wedding-cream/40 text-[10px] leading-relaxed">
              Made with ❤️ by Karishma <br />
              © 2026 Wedding Invitation
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
