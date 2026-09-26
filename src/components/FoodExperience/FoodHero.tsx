import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Flame, Award, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FoodHero: React.FC = () => {
  const { setActiveNav } = useApp();

  const scrollTo = (id: string) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home"
      className="relative min-h-[90vh] bg-[#140e0b] text-[#f8f4eb] flex items-center overflow-hidden pt-6 pb-16"
    >
      {/* Editorial Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#24150e]/60 via-[#19100c]/30 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#c95d2c]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c95d2c]/15 border border-[#c95d2c]/30 text-[#e99a77] text-xs font-semibold uppercase tracking-wider"
            >
              <Flame className="w-3.5 h-3.5 text-[#c95d2c]" />
              <span>Modern Casual Dining &amp; Comfort Sets</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-1"
            >
              <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#faf7f2] leading-[0.98]">
                Good Food. <br />
                <span className="italic font-light text-[#e28c61]">Good Mood.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-stone-300 font-light max-w-xl leading-relaxed"
            >
              Discover meals made for every kind of craving. From 24-hour slow-cooked wagyu gyudon to hand-pressed black truffle smash burgers, crafted to delight every bite.
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
                className="px-7 py-3.5 rounded-full bg-[#c95d2c] hover:bg-[#b24f22] text-white font-medium text-sm sm:text-base tracking-wide shadow-xl shadow-[#c95d2c]/30 flex items-center gap-2 transition-all duration-300 hover:gap-3"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('sets')}
                className="px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-[#f8f4eb] border border-white/15 font-medium text-sm sm:text-base tracking-wide transition-colors duration-200 backdrop-blur-sm"
              >
                View Food Sets
              </button>
            </motion.div>

            {/* Editorial Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg"
            >
              <div>
                <span className="block font-serif-display text-2xl font-bold text-[#faf7f2]">
                  100%
                </span>
                <span className="text-xs text-stone-400">Prime Angus &amp; Wagyu</span>
              </div>
              <div>
                <span className="block font-serif-display text-2xl font-bold text-[#faf7f2]">
                  24h
                </span>
                <span className="text-xs text-stone-400">Slow Dashi Infusions</span>
              </div>
              <div>
                <span className="block font-serif-display text-2xl font-bold text-[#faf7f2]">
                  4.9★
                </span>
                <span className="text-xs text-stone-400">Over 3,000+ Reviews</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Hero Photography Montage */}
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
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85"
                  alt="Truffle Beef Gourmet Burger"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140e0b] via-transparent to-transparent opacity-80" />

                {/* Floating Dish Badge in Image */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#1c1410]/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#e28c61]">
                      Signature Dish
                    </span>
                    <h3 className="font-serif-display text-lg font-bold text-white">
                      Truffle Beef Burger
                    </h3>
                    <p className="text-xs text-stone-300">
                      Black pepper patty, gouda &amp; truffle sauce
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-semibold text-[#f5c69b]">
                      Rp 68.000
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Secondary Mini Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -top-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-[#241812]/90 backdrop-blur-md border border-white/15 shadow-xl"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=300&q=80"
                    alt="Gyudon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#e28c61]" />
                    <span className="text-xs font-bold text-white">Wagyu Bowl</span>
                  </div>
                  <span className="text-[10px] text-stone-400">Onsen Egg &amp; Truffle</span>
                </div>
              </motion.div>

              {/* Floating Chef Quote Pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-6 -right-4 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1e140f]/90 backdrop-blur-md border border-white/15 shadow-xl text-xs text-stone-300"
              >
                <Clock className="w-3.5 h-3.5 text-[#c95d2c]" />
                <span>Cooked fresh to order in 12 mins</span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
        <span className="text-[10px] uppercase tracking-widest text-stone-400">Scroll to explore</span>
        <ArrowDown className="w-3.5 h-3.5 text-stone-400 animate-bounce" />
      </div>
    </section>
  );
};
