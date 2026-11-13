import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Star, Sparkles, Clock, Flame } from 'lucide-react';
import { FOOD_MENU_ITEMS } from '../../data/foodData';
import { FoodCategory, MenuItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatNumberId } from '../../lib/format';
import { withImageWidth } from '../../lib/image';

const CATEGORIES: FoodCategory[] = [
  'All',
  'Rice & Bowls',
  'Burger',
  'Pasta',
  'Chicken',
  'Steak',
  'Snacks',
  'Dessert',
];

export const FoodMenu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('All');
  const { setSelectedFood, addToCart } = useApp();

  const filteredItems = selectedCategory === 'All'
    ? FOOD_MENU_ITEMS
    : FOOD_MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    addToCart({
      itemType: 'food',
      name: item.name,
      image: item.image,
      unitPrice: item.price,
      quantity: 1,
      totalPrice: item.price,
      foodCustomization: {
        size: 'Regular',
        spiceLevel: 'Mild',
        selectedAddons: [],
        addonPrices: {}
      }
    });
  };

  return (
    <section 
      id="menu"
      className="py-20 bg-[#17120e] text-[#f8f4eb] border-t border-[#291d17] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c95d2c]/15 text-[#e28c61] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A La Carte Selection</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#faf7f2]">
              Artisanal Food Menu
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-lg">
              Each dish is prepared to order using prime ingredients, slow-simmered dashi, and authentic woodfire touches.
            </p>
          </div>

          <div className="text-xs text-stone-400 font-mono">
            Showing {filteredItems.length} curated dishes
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={isSelected}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#c95d2c] text-white shadow-md shadow-[#c95d2c]/30 font-semibold'
                    : 'bg-[#221812] text-stone-300 hover:text-white hover:bg-[#2e2019] border border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedFood(item)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-[#1f1612] border border-[#332219] hover:border-[#c95d2c]/60 shadow-lg hover:shadow-2xl hover:shadow-black/60 transition-all duration-500 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#120c09]">
                  <img
                    src={withImageWidth(item.image, 640)}
                    alt={item.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy" decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f1612] via-transparent to-black/20" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.isPopular && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#c95d2c] text-white text-[10px] font-bold tracking-wider uppercase shadow">
                        Popular
                      </span>
                    )}
                    {item.tags?.slice(0, 1).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-stone-200 text-[10px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Rating & Prep Time */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                    <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10">
                      <Star className="w-3 h-3 text-[#f5c69b] fill-[#f5c69b]" />
                      <span className="font-semibold">{item.rating}</span>
                      <span className="text-[10px] text-stone-400">({item.reviewsCount})</span>
                    </div>

                    {item.prepTime && (
                      <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10 text-[11px] text-stone-300">
                        <Clock className="w-3 h-3 text-[#e28c61]" />
                        <span>{item.prepTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Add Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <button
                      onClick={(e) => handleQuickAdd(e, item)}
                      className="px-4 py-2.5 rounded-full bg-[#c95d2c] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-xl hover:bg-[#b54f20] transition-transform hover:scale-105"
                    >
                      <Plus className="w-4 h-4" />
                      Quick Add
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#e28c61]">
                        {item.category}
                      </span>
                      {item.calories && (
                        <span className="text-[11px] text-stone-400">
                          {item.calories}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif-display text-lg font-bold text-[#faf7f2] mt-1 group-hover:text-[#f8d7b7] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-stone-300 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 mt-4 border-t border-[#332219] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                        Price
                      </span>
                      <span className="font-mono text-base sm:text-lg font-bold text-[#faf7f2]">
                        Rp {formatNumberId(item.price)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFood(item);
                      }}
                      className="px-3.5 py-1.5 rounded-full border border-[#c95d2c]/50 text-[#e99a77] hover:bg-[#c95d2c] hover:text-white text-xs font-medium transition-colors duration-200 flex items-center gap-1"
                    >
                      Customize
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
