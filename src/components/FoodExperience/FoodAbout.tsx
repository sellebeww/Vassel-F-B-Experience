import React from 'react';
import { ChefHat, Flame, Sparkles, HeartHandshake } from 'lucide-react';

export const FoodAbout: React.FC = () => {
  return (
    <section 
      id="about"
      className="py-24 bg-[#120d0a] text-[#f8f4eb] border-t border-[#251812] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Editorial Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80"
                alt="Chef preparing artisanal burger in kitchen"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120d0a] via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-[#221611]/90 backdrop-blur-md border border-white/10 shadow-2xl max-w-xs">
              <span className="font-serif-display text-2xl font-bold text-[#e28c61] block">
                “Crafted with Passion”
              </span>
              <p className="text-xs text-stone-300 mt-1">
                We believe exceptional comfort food stems from uncompromised technique and heartfelt hospitality.
              </p>
            </div>
          </div>

          {/* Right Column: Culinary Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c95d2c]/15 text-[#e28c61] text-xs font-semibold uppercase tracking-wider">
              <ChefHat className="w-3.5 h-3.5" />
              <span>Our Culinary Philosophy</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#faf7f2] leading-tight">
              Honest ingredients, fire-kissed textures, and time-honored dashi.
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              At Craving Studio Bistro, every sauce is simmered from scratch, our burger patties are double-ground daily from chilled prime cuts, and our fresh tagliatelle is hand-extruded to hold every drop of rich parmesan emulsion.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-4 rounded-xl bg-[#1b130e] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#c95d2c]/20 text-[#e28c61] flex items-center justify-center mb-3">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="font-serif-display text-base font-bold text-[#faf7f2]">
                  Cast-Iron Searing
                </h4>
                <p className="text-xs text-stone-400 mt-1">
                  High heat creates deep caramelized crusts while locking in natural juiciness.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1b130e] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#c95d2c]/20 text-[#e28c61] flex items-center justify-center mb-3">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="font-serif-display text-base font-bold text-[#faf7f2]">
                  Local Artisanal Sourcing
                </h4>
                <p className="text-xs text-stone-400 mt-1">
                  Free-range farm eggs, Hokkaido milk brioche buns, and hydroponic greens.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-stone-400 font-mono">
              <div>📍 Senopati &amp; Menteng Kitchens</div>
              <div>⏰ 10:00 AM – 10:00 PM Daily</div>
              <div>📞 +62 21 555-CRAVE</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
