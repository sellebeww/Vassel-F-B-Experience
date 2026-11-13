import React from 'react';
import { Star, Flame, Trophy, ArrowRight } from 'lucide-react';
import { FOOD_MENU_ITEMS } from '../../data/foodData';
import { useApp } from '../../context/AppContext';
import { formatNumberId } from '../../lib/format';
import { withImageWidth } from '../../lib/image';

export const FoodPopular: React.FC = () => {
  const { setSelectedFood } = useApp();
  const popularDishes = FOOD_MENU_ITEMS.filter((item) => item.isPopular).slice(0, 4);

  return (
    <section 
      id="popular"
      className="py-20 bg-[#17110d] text-[#f8f4eb] border-t border-[#2d1e17] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c95d2c]/15 text-[#e28c61] text-xs font-semibold uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>Diners' Choice</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#faf7f2]">
              Most Craved This Week
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-lg">
              The dishes our guests return for again and again. Exceptional textures and balanced umami profiles.
            </p>
          </div>

          <a
            href="#menu"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#e28c61] hover:text-[#f5c69b] font-mono transition-colors"
          >
            <span>Explore All 12 Dishes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDishes.map((dish, i) => (
            <div
              key={dish.id}
              onClick={() => setSelectedFood(dish)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#1f1611] border border-white/5 hover:border-[#c95d2c]/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-square overflow-hidden bg-black/40">
                <img
                  src={withImageWidth(dish.image, 640)}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy" decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f1611] via-transparent to-transparent opacity-80" />
                <span className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono font-bold flex items-center justify-center text-[#f5c69b]">
                  0{i + 1}
                </span>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-[#c95d2c] text-white text-[10px] font-bold uppercase tracking-wider">
                    {dish.tags?.[0] || 'Popular'}
                  </span>
                  <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded text-xs font-bold text-white">
                    <Star className="w-3 h-3 text-[#f5c69b] fill-[#f5c69b]" />
                    <span>{dish.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
                    {dish.category}
                  </span>
                  <h3 className="font-serif-display text-lg font-bold text-[#faf7f2] mt-1 group-hover:text-[#e28c61] transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-[#f5c69b]">
                    Rp {formatNumberId(dish.price)}
                  </span>
                  <span className="text-xs text-[#e28c61] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Order <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
