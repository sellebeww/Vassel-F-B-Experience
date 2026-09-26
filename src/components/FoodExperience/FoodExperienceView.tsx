import React from 'react';
import { FoodHero } from './FoodHero';
import { FoodPopular } from './FoodPopular';
import { FoodSets } from './FoodSets';
import { FoodMenu } from './FoodMenu';
import { FoodAbout } from './FoodAbout';
import { useApp } from '../../context/AppContext';
import { Utensils, ArrowRight, Instagram, MapPin, Phone, Heart } from 'lucide-react';

export const FoodExperienceView: React.FC = () => {
  const { toggleExperience, setExperience } = useApp();

  return (
    <div id="food-experience-view" className="w-full bg-[#140e0b] text-[#f8f4eb]">
      {/* 1. Hero */}
      <FoodHero />

      {/* 2. Popular & Diners' Choice */}
      <FoodPopular />

      {/* 3. Food Sets / "Complete Your Meal" */}
      <FoodSets />

      {/* 4. A La Carte Menu */}
      <FoodMenu />

      {/* 5. About & Culinary Philosophy */}
      <FoodAbout />

      {/* Experience Transition Banner */}
      <div className="py-16 bg-[#1a110d] border-t border-[#301f16] px-4 sm:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#e28c61]">
            Craving something refreshing?
          </span>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#faf7f2]">
            Pair your meal with Japanese Ceremonial Matcha or Specialty Coffee.
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 font-light">
            Step into our serene drinks sanctuary featuring single-origin Uji matcha, Kyoto cold brews, and aesthetic clouds.
          </p>
          <div className="pt-2">
            <button
              onClick={toggleExperience}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3e6f4f] hover:bg-[#325a40] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg shadow-[#3e6f4f]/30 transition-all hover:scale-105"
            >
              <span>Switch to Drinks Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0e0a08] border-t border-white/5 py-12 px-4 sm:px-8 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-serif-display text-lg font-bold">
              <Utensils className="w-4 h-4 text-[#c95d2c]" />
              <span>CRAVING BISTRO</span>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              Modern casual dining dedicated to comforting, crave-worthy flavors, crafted patties, and slow dashi reductions.
            </p>
          </div>

          <div>
            <h5 className="text-white font-mono uppercase text-[11px] tracking-wider mb-3">
              Locations
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c95d2c]" />
                <span>Senopati Dining Room, Jakarta</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c95d2c]" />
                <span>Menteng Heritage Loft, Jakarta</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-mono uppercase text-[11px] tracking-wider mb-3">
              Hours &amp; Inquiries
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li>Mon – Sun: 10:00 AM – 10:00 PM</li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#c95d2c]" />
                <span>+62 21 555-CRAVE (27283)</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-mono uppercase text-[11px] tracking-wider mb-3">
              Experience Portal
            </h5>
            <button
              onClick={() => setExperience('landing')}
              className="text-xs text-[#e28c61] hover:underline block mb-2"
            >
              ← Back to Main Experience Selector
            </button>
            <p className="text-[11px] text-stone-500">
              © 2026 Craving Studio. Crafted by Vassel Goleyu for extraordinary culinary experiences.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
