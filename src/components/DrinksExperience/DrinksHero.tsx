import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ArrowDown, Leaf, Coffee } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DrinksHero: React.FC = () => {
  const { setActiveNav } = useApp();

  const scrollTo = (id: string) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home"
      className="relative min-h-[92vh] bg-[#0c1510] text-[#f4eee5] flex items-center overflow-hidden pt-6 pb-16"
    >
      {/* Serene Matcha & Sage Ambient Background Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#192b21]/70 via-[#101d16]/40 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#3e6f4f]/15 blur-[140px] pointer-events-none" />

      {/* Floating Ambient Steam / Cloud Animation */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-1/4 w-80 h-80 rounded-full bg-[#8fa684]/10 blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Zen Aesthetic Copy */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2a4d38]/40 border border-[#3e6f4f]/50 text-[#a3d9b4] text-xs font-medium uppercase tracking-widest"
            >
              <Leaf className="w-3.5 h-3.5 text-[#a3d9b4]" />
              <span>Japanese Matcha Bar × Specialty Coffee</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-1"
            >
              <div className="font-japanese text-xs tracking-[0.3em] uppercase text-[#8fa684] mb-1">
                京都宇治 抹茶 ＆ 特選珈琲
              </div>
              <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#f4eee5] leading-[0.98]">
                Slow Down. <br />
                <span className="italic font-light text-[#a3d9b4]">Sip Better.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-stone-300 font-light max-w-xl leading-relaxed"
            >
              Crafted matcha, specialty coffee, and drinks made for your everyday ritual. Stone-ground first harvest leaves from Uji, Kyoto and single-origin beans roasted with mindful precision.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => scrollTo('menu')}
                className="px-8 py-3.5 rounded-full bg-[#3e6f4f] hover:bg-[#325a40] text-white font-medium text-sm sm:text-base tracking-wide shadow-xl shadow-[#3e6f4f]/30 flex items-center gap-2 transition-all duration-300 hover:gap-3"
              >
                <span>Explore Drinks</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('ritual')}
                className="px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-[#f4eee5] border border-white/15 font-medium text-sm sm:text-base tracking-wide transition-colors duration-200 backdrop-blur-sm flex items-center gap-2"
              >
                <span>The Matcha Ritual</span>
              </button>
            </motion.div>

            {/* Aesthetic Stats & Origin Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg"
            >
              <div>
                <span className="block font-serif-display text-2xl font-bold text-[#f4eee5]">
                  100%
                </span>
                <span className="text-xs text-[#8fa684]">Ceremonial Uji Grade</span>
              </div>
              <div>
                <span className="block font-serif-display text-2xl font-bold text-[#f4eee5]">
                  16h
                </span>
                <span className="text-xs text-[#8fa684]">Kyoto Cold Drip Method</span>
              </div>
              <div>
                <span className="block font-serif-display text-2xl font-bold text-[#f4eee5]">
                  84+
                </span>
                <span className="text-xs text-[#8fa684]">SCA Specialty Score</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Serene Editorial Drink Photography */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Primary Large Editorial Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 aspect-[4/5] group">
                <img
                  src="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1200&q=85"
                  alt="Ceremonial Matcha Latte"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1510] via-transparent to-transparent opacity-85" />

                {/* Floating Drink Badge in Image */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#14231b]/85 backdrop-blur-md border border-white/15 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#a3d9b4]">
                        Signature Pour
                      </span>
                      <span className="font-japanese text-xs text-white/60">お濃茶</span>
                    </div>
                    <h3 className="font-serif-display text-lg font-bold text-white">
                      Ceremonial Matcha Latte
                    </h3>
                    <p className="text-xs text-stone-300">
                      Uji first harvest matcha &amp; silky farm milk
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-semibold text-[#a3d9b4]">
                      Rp 48.000
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Strawberry Matcha Mini Pill */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -top-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-[#192b21]/90 backdrop-blur-md border border-white/15 shadow-xl"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=300&q=80"
                    alt="Strawberry Matcha"
                    className="w-full h-full object-cover"
                    loading="lazy" decoding="async"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-japanese text-[#a3d9b4] block">苺抹茶ラテ</span>
                  <span className="text-xs font-bold text-white">Strawberry Matcha</span>
                </div>
              </motion.div>

              {/* Floating Dirty Coffee Pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-6 -right-4 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#16251d]/90 backdrop-blur-md border border-white/15 shadow-xl text-xs text-stone-300"
              >
                <Coffee className="w-3.5 h-3.5 text-[#a3d9b4]" />
                <span>Single Origin Kerinci Double Ristretto</span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
        <span className="text-[10px] uppercase tracking-widest text-[#8fa684]">Scroll to explore brews</span>
        <ArrowDown className="w-3.5 h-3.5 text-[#8fa684] animate-bounce" />
      </div>
    </section>
  );
};
