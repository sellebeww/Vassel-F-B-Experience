import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Sparkles, 
  Sun, 
  Clock, 
  ShieldCheck, 
  Heart, 
  Feather, 
  CheckCircle2, 
  Compass, 
  Coffee 
} from 'lucide-react';

interface PhilosophyPillar {
  kanji: string;
  romaji: string;
  title: string;
  subtitle: string;
  description: string;
  stat: string;
  statLabel: string;
  icon: React.ElementType;
}

const PILLARS: PhilosophyPillar[] = [
  {
    kanji: '遮光',
    romaji: 'Shako Saibai',
    title: '30-Day Shade Cultivation',
    subtitle: 'Harvesting Pure Chlorophyll & L-Theanine',
    description: 'A month before the spring harvest (Ichibancha), our tea fields in Uji are cloaked under traditional black straw reed screens. Depriving the leaves of direct sunlight halts the conversion of theanine into tannins, yielding deep jade hues and an extraordinarily smooth, naturally sweet umami note with zero bitterness.',
    stat: '30 Days',
    statLabel: 'Traditional Tana Shading',
    icon: Sun
  },
  {
    kanji: '石臼',
    romaji: 'Ishi-Usu',
    title: 'Slow Granite Stone Milling',
    subtitle: '30 Grams per Hour of Pure Velvet',
    description: 'High-speed industrial blenders create friction heat that oxidizes and destroys delicate tea antioxidants. We adhere to time-honored granite stone mills operating in temperature-controlled chambers, grinding at a patient 30g per hour into a microscopic 5-micron powder that creates cloud-like suspensions in water.',
    stat: '30g/hr',
    statLabel: 'Friction-Free Stone Mill Speed',
    icon: Clock
  },
  {
    kanji: '和敬',
    romaji: 'Wakei Seijaku',
    title: 'Harmony, Respect & Purity',
    subtitle: 'The Soul of Japanese Chado',
    description: 'We embody the four sacred tenets of Japanese tea ceremony: Harmony with nature (Wa), mutual respect for guests and farmers (Kei), absolute purity of ingredients (Sei), and inner tranquility (Jaku). Every cup is prepared with conscious intention, treating your beverage as a mindful pause.',
    stat: '4 Pillars',
    statLabel: 'Sacred Zen Tea Tenets',
    icon: Heart
  },
  {
    kanji: '調和',
    romaji: 'Chowa',
    title: 'Sustained Calm Energy',
    subtitle: 'Clear Mental Focus Without the Crash',
    description: 'Unlike the rapid caffeine spike and subsequent jittery crash of standard espresso, matcha releases caffeine steadily through the bloodstream over 4 to 6 hours when bonded with natural L-theanine. It produces calming alpha brainwaves for laser-sharp yet serene focus.',
    stat: '4-6 Hrs',
    statLabel: 'Clean, Sustained Brainwave Flow',
    icon: Sparkles
  }
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Hand-Picking Ichibancha',
    japanese: '一番茶手摘み',
    desc: 'Only the tender topmost two leaves are hand-plucked during the prime first harvest in early May from single-family Kyoto estates.'
  },
  {
    step: '02',
    title: 'Deep Steam & Tencha Cooling',
    japanese: '蒸熱と乾燥',
    desc: 'Leaves are immediately steamed for 30 seconds to arrest oxidation, preserving natural antioxidants, vivid jade green pigments, and clean aroma.'
  },
  {
    step: '03',
    title: 'Precision De-veining',
    japanese: '葉脈選別',
    desc: 'All stems, veins, and coarse fibers are meticulously separated, leaving only the softest pure leaf flesh, known as Tencha (碾茶).'
  },
  {
    step: '04',
    title: 'Granite Wheel Grinding',
    japanese: '天然石臼挽き',
    desc: 'Slowly milled under historic granite stones into silky, velvety ceremonial powder ready for immediate nitrogen-sealed preservation.'
  }
];

export const DrinksPhilosophy: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  const activePillar = PILLARS[activePillarIndex];
  const ActiveIcon = activePillar.icon;

  return (
    <section 
      id="about" 
      className="py-24 bg-[#0a120e] text-[#f4eee5] border-t border-[#1a2c20] relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-[#3e6f4f]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#8fa684]/10 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#203929] border border-[#3e6f4f]/40 text-[#a3d9b4] text-xs font-semibold uppercase tracking-widest">
            <Leaf className="w-3.5 h-3.5 text-[#a3d9b4]" />
            <span>Our Matcha Philosophy • 茶の理念</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f4eee5] leading-tight">
            The Art of Mindful Sipping &amp; Generational Craft.
          </h2>

          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            We believe a bowl of matcha is an antidote to the hurry of modern life. Rooted in centuries of Japanese tea culture and elevated by specialty coffee precision, our craft celebrates patience, honest terroirs, and unhurried human connection.
          </p>
        </div>

        {/* Interactive 4 Pillars Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Pillar Selector Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#8fa684] mb-1">
              Select A Pillar of Our Craft
            </div>
            
            {PILLARS.map((pillar, idx) => {
              const isSelected = activePillarIndex === idx;
              const IconComp = pillar.icon;
              return (
                <button
                  key={pillar.title}
                  onClick={() => setActivePillarIndex(idx)}
                  className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#18291f] border-[#3e6f4f] shadow-lg shadow-black/40 scale-[1.01]'
                      : 'bg-[#101b15]/60 border-white/5 hover:border-white/20 hover:bg-[#132219]'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected 
                          ? 'bg-[#3e6f4f] text-white shadow-md shadow-[#3e6f4f]/40' 
                          : 'bg-[#182b20] text-[#a3d9b4]'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-japanese text-xs text-[#a3d9b4] font-medium">
                          {pillar.kanji}
                        </span>
                        <span className="text-[11px] font-mono text-stone-400">
                          {pillar.romaji}
                        </span>
                      </div>
                      <h3 className={`text-sm sm:text-base font-bold mt-0.5 ${isSelected ? 'text-white' : 'text-stone-300'}`}>
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right hidden sm:block">
                    <span className={`text-xs font-mono font-bold block ${isSelected ? 'text-[#a3d9b4]' : 'text-stone-500'}`}>
                      {pillar.stat}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Highlight Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillarIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="h-full rounded-3xl bg-[#14231b] border border-[#2d4937] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl"
              >
                {/* Background Kanji Watermark */}
                <div className="absolute top-4 right-6 text-9xl font-japanese font-bold text-white/[0.03] select-none pointer-events-none">
                  {activePillar.kanji}
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3e6f4f]/30 border border-[#3e6f4f]/40 text-[#a3d9b4] text-xs font-mono uppercase tracking-wider">
                      <ActiveIcon className="w-3.5 h-3.5" />
                      <span>{activePillar.romaji}</span>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-2xl sm:text-3xl font-bold text-[#a3d9b4]">
                        {activePillar.stat}
                      </span>
                      <span className="text-[11px] text-stone-400 block">
                        {activePillar.statLabel}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug">
                      {activePillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#a3d9b4] font-medium mt-1">
                      {activePillar.subtitle}
                    </p>
                  </div>

                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                    {activePillar.description}
                  </p>

                  <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2.5 text-xs text-stone-300">
                      <CheckCircle2 className="w-4 h-4 text-[#a3d9b4] shrink-0 mt-0.5" />
                      <span>100% First-Harvest Ichibancha from single-family Uji estates</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-stone-300">
                      <CheckCircle2 className="w-4 h-4 text-[#a3d9b4] shrink-0 mt-0.5" />
                      <span>Zero artificial dyes, corn syrups, or synthetic aromas</span>
                    </div>
                  </div>
                </div>

                {/* Micro quote banner */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8fa684]">
                  <span className="font-japanese text-sm">一期一会 • Ichigo Ichie</span>
                  <span>Cherish this singular brew</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* 4-Step Journey: From Tencha to Bowl */}
        <div className="bg-[#111e17] rounded-3xl border border-[#22392c] p-6 sm:p-10 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#a3d9b4]">
                The Craft Timeline
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1">
                From Kyoto Soil to Your Ceramic Bowl
              </h3>
            </div>
            <span className="text-xs text-stone-400 font-mono">
              Pure Traditional Processing
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-[#16271e] border border-white/5 flex flex-col justify-between space-y-4 relative group hover:border-[#3e6f4f]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-2xl font-bold text-[#3e6f4f]">
                      {step.step}
                    </span>
                    <span className="font-japanese text-xs text-[#a3d9b4] px-2 py-0.5 rounded bg-black/40 border border-white/5">
                      {step.japanese}
                    </span>
                  </div>
                  <h4 className="font-serif-display text-base font-bold text-white mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Master Artisan Quote & Terroir Verification */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center rounded-3xl bg-gradient-to-r from-[#17291f] to-[#101d16] border border-[#2b4b37] p-6 sm:p-10">
          
          <div className="md:col-span-4 rounded-2xl overflow-hidden shadow-xl aspect-square bg-[#0c1510] border border-white/10 relative">
            <img
              src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80"
              alt="Artisan Tea Ceremony Whisking"
              className="w-full h-full object-cover"
              loading="lazy" decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1510] via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/70 backdrop-blur-sm border border-white/10 text-center">
              <span className="font-japanese text-xs text-[#a3d9b4] block">京都府宇治市</span>
              <span className="text-[11px] text-white font-medium">Uji River Valley, Kyoto Prefecture</span>
            </div>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-[#a3d9b4]">
              <Feather className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-widest">
                Our Commitment to Authenticity
              </span>
            </div>

            <blockquote className="font-serif-display text-xl sm:text-2xl lg:text-3xl font-light text-[#f4eee5] leading-relaxed italic">
              “When we whisk matcha, we do not simply mix green powder and water. We invite the breeze of the Uji hills, the patience of stone carvers, and stillness of this present moment into your day.”
            </blockquote>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-serif-display text-base font-bold text-white">
                  Kento Takahashi &amp; The Craving Beverage Lab
                </h4>
                <p className="text-xs text-stone-400">
                  Head of Beverage Craft &amp; Tea Sommelier, Senopati &amp; Dharmawangsa
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono px-3 py-1.5 rounded-full bg-[#243e2f] text-[#b4e6c6] border border-[#3e6f4f]">
                  Ceremonial Grade Certified
                </span>
                <span className="text-[11px] font-mono px-3 py-1.5 rounded-full bg-[#243e2f] text-[#b4e6c6] border border-[#3e6f4f]">
                  Single Farm Provenance
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
