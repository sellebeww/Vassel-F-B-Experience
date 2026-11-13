import React from 'react';
import { DrinksHero } from './DrinksHero';
import { DrinksMenu } from './DrinksMenu';
import { DrinksStory } from './DrinksStory';
import { DrinksPhilosophy } from './DrinksPhilosophy';
import { useApp } from '../../context/AppContext';
import { Coffee, ArrowRight, MapPin, Phone, Leaf } from 'lucide-react';

export const DrinksExperienceView: React.FC = () => {
  const { toggleExperience, setExperience } = useApp();

  return (
    <div id="drinks-experience-view" className="w-full bg-[#0c1510] text-[#f4eee5]">
      {/* 1. Drinks Hero */}
      <DrinksHero />

      {/* 2. Drinks Menu */}
      <DrinksMenu />

      {/* 3. The Matcha & Coffee Ritual Story */}
      <DrinksStory />

      {/* 4. Our Philosophy */}
      <DrinksPhilosophy />

      {/* Experience Transition Banner */}
      <div className="py-16 bg-[#132219] border-t border-[#1f3729] px-4 sm:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#a3d9b4]">
            Hungry for comfort food?
          </span>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#f4eee5]">
            Explore our artisanal burgers, wagyu bowls &amp; handcrafted pasta.
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 font-light">
            Switch over to the Bistro to discover our curated lunch sets, family feasts, and flame-seared meats.
          </p>
          <div className="pt-2">
            <button
              onClick={toggleExperience}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#c95d2c] hover:bg-[#b24f22] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg shadow-[#c95d2c]/30 transition-all hover:scale-105"
            >
              <span>Switch to Food Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#090f0b] border-t border-white/5 py-12 px-4 sm:px-8 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-serif-display text-lg font-bold">
              <Coffee className="w-4 h-4 text-[#3e6f4f]" />
              <span>CRAVING MATCHA BAR</span>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              Minimalist Japanese tea room and specialty coffee bar dedicated to mindful rituals, Uji ceremonial matcha, and smooth extractions.
            </p>
          </div>

          <div>
            <h5 className="text-white font-mono uppercase text-[11px] tracking-wider mb-3">
              Tea Rooms
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#3e6f4f]" />
                <span>Senopati Matcha Bar, Jakarta</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#3e6f4f]" />
                <span>Dharmawangsa Zen Pavilion, Jakarta</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-mono uppercase text-[11px] tracking-wider mb-3">
              Hours &amp; Contact
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li>Mon – Sun: 08:00 AM – 09:00 PM</li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#3e6f4f]" />
                <span>+62 21 555-MATCHA (62824)</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-mono uppercase text-[11px] tracking-wider mb-3">
              Portal Return
            </h5>
            <button
              onClick={() => setExperience('landing')}
              className="text-xs text-[#a3d9b4] hover:underline block mb-2"
            >
              ← Back to Main Experience Selector
            </button>
            <p className="text-[11px] text-stone-400">
              © 2026 Craving Studio by Vassel Goleyu. Uji Ceremonial Tencha &amp; Specialty Arabica.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
