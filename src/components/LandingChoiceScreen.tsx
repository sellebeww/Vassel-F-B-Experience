import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Utensils, Coffee, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';

/** Activates a role="button" element with Enter or Space, like a native button. */
const activateOnKey = (e: React.KeyboardEvent, action: () => void) => {
  if (e.target !== e.currentTarget) return;
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    action();
  }
};

export const LandingChoiceScreen: React.FC = () => {
  const { setExperience } = useApp();
  const [hoveredSide, setHoveredSide] = useState<'food' | 'drinks' | null>(null);

  return (
    <div 
      id="landing-choice-screen"
      className="relative w-full min-h-screen bg-[#0e0c0b] text-white flex flex-col justify-between select-none"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div
          animate={{
            x: hoveredSide === 'food' ? '-10%' : hoveredSide === 'drinks' ? '10%' : '0%',
            opacity: [0.3, 0.45, 0.3],
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[140px] bg-gradient-to-tr from-[#964724]/30 via-[#2f4838]/25 to-transparent pointer-events-none"
        />
      </div>

      {/* Top Floating Brand Badge */}
      <header className="relative z-30 w-full px-6 md:px-12 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md">
            <Compass className="w-4 h-4 text-white/80 animate-spin-slow" />
          </div>
          <div>
            <span className="font-serif-display text-lg tracking-widest uppercase font-semibold text-white/90">
              Craving Studio
            </span>
            <span className="hidden sm:inline-block ml-3 text-[11px] font-sans tracking-widest uppercase px-2 py-0.5 rounded-full border border-white/10 text-white/60">
              Est. 2026
            </span>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium">
            Curated Dual Gastronomy
          </p>
        </div>
      </header>

      {/* Center Prompt Headline */}
      <div className="relative z-30 text-center px-4 max-w-2xl mx-auto my-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#e6a875]" />
          <span className="text-xs uppercase tracking-widest font-medium text-white/80">
            Choose Your F&amp;B Experience
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md leading-[1.1]"
        >
          What are you craving today?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-3 text-sm sm:text-base text-white/70 font-light max-w-md mx-auto"
        >
          Step into our warm dining room or unwind in our serene matcha and specialty coffee sanctuary.
        </motion.p>
      </div>

      {/* Split Interactive Choice Screens */}
      <div
        id="split-experience-cards"
        className="relative z-20 w-full md:min-h-[420px] md:h-[62vh] flex flex-col md:flex-row px-4 md:px-8 pb-6 gap-4 md:gap-6"
      >
        {/* OPTION 01 — FOOD */}
        <motion.div
          id="choice-option-food"
          role="button"
          tabIndex={0}
          aria-label="Explore Food: meals, comfort food and curated food sets"
          onMouseEnter={() => setHoveredSide('food')}
          onMouseLeave={() => setHoveredSide(null)}
          onFocus={() => setHoveredSide('food')}
          onBlur={() => setHoveredSide(null)}
          onClick={() => setExperience('food')}
          onKeyDown={(e) => activateOnKey(e, () => setExperience('food'))}
          animate={{
            flex: hoveredSide === 'food' ? 1.25 : hoveredSide === 'drinks' ? 0.75 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="group relative cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl border border-white/15 bg-[#171210] flex-1 min-h-[420px] md:min-h-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-500"
        >
          {/* Background Photography with Zoom / Parallax */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85"
              alt="Artisanal Food Experience"
              animate={{
                scale: hoveredSide === 'food' ? 1.08 : 1.02,
                filter: hoveredSide === 'food' ? 'brightness(0.95)' : 'brightness(0.75)',
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full h-full object-cover object-center transition-transform duration-700"
              decoding="async"
            />
            {/* Rich Warm Vignette & Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140e0b] via-[#140e0b]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#8a3818]/25 via-transparent to-black/40 mix-blend-multiply" />
          </div>

          {/* Option Label Tag */}
          <div className="relative z-10 mb-auto flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-mono tracking-wider text-[#e6a875]">
              <Utensils className="w-3.5 h-3.5" />
              <span>OPTION 01</span>
            </div>
            <span className="text-xs uppercase tracking-widest text-white/50 font-mono hidden sm:inline-block">
              Culinary Dining
            </span>
          </div>

          {/* Editorial Content */}
          <div className="relative z-10 mt-6">
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white group-hover:text-[#f8d7b7] transition-colors duration-300">
              FOOD
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-200/90 font-light max-w-sm">
              Meals, comfort food &amp; curated food sets. Handcrafted burgers, slow-cooked bowls &amp; charcoal steaks.
            </p>

            {/* Visual Pills / Highlights */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['Wagyu Gyudon', 'Truffle Burger', 'Handmade Pasta', 'Family Feast'].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-stone-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c95d2c] hover:bg-[#b54f20] text-white text-sm font-semibold tracking-wide transition-all duration-300 group-hover:pr-6 shadow-lg shadow-[#c95d2c]/30">
                Explore Food
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="text-xs text-white/50 font-mono tracking-wider">
                12 Gourmet Items
              </span>
            </div>
          </div>
        </motion.div>

        {/* OPTION 02 — DRINKS */}
        <motion.div
          id="choice-option-drinks"
          role="button"
          tabIndex={0}
          aria-label="Explore Drinks: matcha, coffee and handcrafted beverages"
          onMouseEnter={() => setHoveredSide('drinks')}
          onMouseLeave={() => setHoveredSide(null)}
          onFocus={() => setHoveredSide('drinks')}
          onBlur={() => setHoveredSide(null)}
          onClick={() => setExperience('drinks')}
          onKeyDown={(e) => activateOnKey(e, () => setExperience('drinks'))}
          animate={{
            flex: hoveredSide === 'drinks' ? 1.25 : hoveredSide === 'food' ? 0.75 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="group relative cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl border border-white/15 bg-[#0f1712] flex-1 min-h-[420px] md:min-h-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-500"
        >
          {/* Background Photography with Subtle Floating Drift */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1600&q=85"
              alt="Japanese Matcha & Specialty Coffee Bar"
              animate={{
                scale: hoveredSide === 'drinks' ? 1.08 : 1.02,
                filter: hoveredSide === 'drinks' ? 'brightness(0.95)' : 'brightness(0.75)',
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full h-full object-cover object-center transition-transform duration-700"
              loading="lazy" decoding="async"
            />
            {/* Serene Japanese Matcha & Sage Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1713] via-[#0e1713]/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#284936]/30 via-transparent to-black/40 mix-blend-multiply" />
          </div>

          {/* Option Label Tag */}
          <div className="relative z-10 mb-auto flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-mono tracking-wider text-[#98c5a5]">
              <Coffee className="w-3.5 h-3.5" />
              <span>OPTION 02</span>
            </div>
            <span className="text-xs uppercase tracking-widest text-white/50 font-japanese hidden sm:inline-block">
              喫茶・茶室
            </span>
          </div>

          {/* Editorial Content */}
          <div className="relative z-10 mt-6">
            <div className="flex items-baseline gap-3">
              <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white group-hover:text-[#b4e0bf] transition-colors duration-300">
                DRINKS
              </h2>
              <span className="font-japanese text-sm text-white/60">
                抹茶・珈琲
              </span>
            </div>
            <p className="mt-2 text-sm sm:text-base text-stone-200/90 font-light max-w-sm">
              Matcha, coffee &amp; handcrafted beverages. Single-origin Uji green tea, Kyoto cold brew &amp; clouds.
            </p>

            {/* Visual Pills / Highlights */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['Ceremonial Uji', 'Dirty Coffee', 'Matcha Cloud', 'Spanish Latte'].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-stone-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#366848] hover:bg-[#2c553b] text-white text-sm font-semibold tracking-wide transition-all duration-300 group-hover:pr-6 shadow-lg shadow-[#366848]/30">
                Explore Drinks
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="text-xs text-white/50 font-mono tracking-wider">
                12 Specialty Brews
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Footer indicator */}
      <footer className="relative z-30 w-full px-6 md:px-12 py-3 flex items-center justify-between text-[11px] text-white/60 border-t border-white/5">
        <span>Click either card to enter the tailored gastronomy room</span>
        <span>Crafted by Vassel Goleyu</span>
      </footer>
    </div>
  );
};
