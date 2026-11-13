import React from 'react';
import { Leaf, Award, Heart, Sparkles } from 'lucide-react';

export const DrinksStory: React.FC = () => {
  return (
    <section 
      id="ritual"
      className="py-24 bg-[#0c1510] text-[#f4eee5] border-t border-[#1a2e22] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80"
                alt="Japanese Matcha Whisking Ceremony"
                className="w-full h-full object-cover"
                loading="lazy" decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1510] via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-[#17271e]/90 backdrop-blur-md border border-white/10 shadow-2xl max-w-xs">
              <span className="font-japanese text-sm text-[#a3d9b4] block mb-1">
                一期一会 • Ichigo Ichie
              </span>
              <span className="font-serif-display text-xl font-bold text-white block">
                “Treasure Every Sip”
              </span>
              <p className="text-xs text-stone-300 mt-1">
                A reminder that each cup of tea and coffee is a unique, fleeting moment of serenity.
              </p>
            </div>
          </div>

          {/* Right Column: Story & Process */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3e6f4f]/25 text-[#a3d9b4] text-xs font-medium uppercase tracking-widest border border-[#3e6f4f]/30">
              <Leaf className="w-3.5 h-3.5" />
              <span>The Matcha &amp; Coffee Ritual</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4eee5] leading-tight">
              Honoring centuries of Japanese tea culture &amp; modern barista artistry.
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              We source our ceremonial tencha directly from single-family estates in Uji, Kyoto. Shaded for 30 days prior to spring harvest, the leaves develop intense natural L-theanine and vibrant jade hues before being stone-ground into silky powder.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-4 rounded-2xl bg-[#14221a] border border-[#22392c]">
                <div className="w-8 h-8 rounded-lg bg-[#3e6f4f]/30 text-[#a3d9b4] flex items-center justify-center mb-3">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-serif-display text-base font-bold text-[#f4eee5]">
                  Chasen Bamboo Whisking
                </h4>
                <p className="text-xs text-stone-300 mt-1 font-light">
                  Whisked at 78°C to yield a dense, velvety crema that preserves aromatic antioxidants.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#14221a] border border-[#22392c]">
                <div className="w-8 h-8 rounded-lg bg-[#3e6f4f]/30 text-[#a3d9b4] flex items-center justify-center mb-3">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="font-serif-display text-base font-bold text-[#f4eee5]">
                  16-Hour Kyoto Cold Drip
                </h4>
                <p className="text-xs text-stone-300 mt-1 font-light">
                  Gravity-fed drop by drop extraction capturing high florals without bitter astringency.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#8fa684] font-mono">
              <div>🍵 Single-Origin Uji Ceremonial Grade</div>
              <div>☕ Specialty Arabica 84+ SCA Score</div>
              <div>🌱 Oatly &amp; Soy Dairy-Free Options</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
