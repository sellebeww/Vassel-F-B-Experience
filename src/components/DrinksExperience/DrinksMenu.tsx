import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Star, Sparkles, Sliders, Coffee, Leaf } from 'lucide-react';
import { DRINKS_MENU_ITEMS } from '../../data/drinksData';
import { DrinkCategory, MenuItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatNumberId } from '../../lib/format';
import { withImageWidth } from '../../lib/image';

const DRINK_CATEGORIES: DrinkCategory[] = [
  'All',
  'Matcha',
  'Coffee',
  'Tea',
  'Non-Coffee',
  'Signature',
  'Cold Drinks',
];

export const DrinksMenu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<DrinkCategory>('All');
  const { setSelectedDrink, addToCart } = useApp();

  const filteredDrinks = selectedCategory === 'All'
    ? DRINKS_MENU_ITEMS
    : DRINKS_MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    addToCart({
      itemType: 'drink',
      name: item.name,
      image: item.image,
      unitPrice: item.price,
      quantity: 1,
      totalPrice: item.price,
      drinkCustomization: {
        size: 'Regular',
        milk: 'Fresh Milk',
        sweetness: '50%',
        ice: 'Normal Ice',
        toppings: [],
        toppingPrices: {}
      }
    });
  };

  return (
    <section 
      id="menu"
      className="py-20 bg-[#0f1a14] text-[#f4eee5] border-t border-[#1d3226] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3e6f4f]/25 text-[#a3d9b4] text-xs font-medium uppercase tracking-widest mb-2 border border-[#3e6f4f]/30">
              <Leaf className="w-3.5 h-3.5" />
              <span>Artisanal Beverage Menu</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f4eee5]">
              Matcha, Coffee &amp; Infusions
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-lg font-light">
              Crafted with single-origin teas and coffee beans. Fully customizable for your personal taste, sweetness, and milk preference.
            </p>
          </div>

          <div className="text-xs text-[#8fa684] font-mono">
            12 Handcrafted Beverages Available
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {DRINK_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={isSelected}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#3e6f4f] text-white shadow-md shadow-[#3e6f4f]/30 font-semibold'
                    : 'bg-[#15241c] text-stone-300 hover:text-white hover:bg-[#1a2e23] border border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Drinks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDrinks.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedDrink(item)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-[#13221a] border border-[#22392c] hover:border-[#3e6f4f] shadow-lg hover:shadow-2xl hover:shadow-black/60 transition-all duration-500 flex flex-col"
              >
                {/* Image Container with Elegant Ratio */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#0a120e]">
                  <img
                    src={withImageWidth(item.image, 640)}
                    alt={item.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy" decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13221a] via-transparent to-black/25" />

                  {/* Japanese Name & Origin Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {item.japaneseName && (
                      <span className="font-japanese px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#a3d9b4] text-[11px] border border-white/10">
                        {item.japaneseName}
                      </span>
                    )}
                    {item.origin && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-stone-300 backdrop-blur-sm">
                        {item.origin}
                      </span>
                    )}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 text-xs font-semibold text-[#f5c69b]">
                    <Star className="w-3 h-3 fill-[#f5c69b]" />
                    <span>{item.rating}</span>
                  </div>

                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                    <button
                      onClick={(e) => handleQuickAdd(e, item)}
                      className="px-4 py-2.5 rounded-full bg-[#3e6f4f] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-xl hover:bg-[#325a40] transition-transform hover:scale-105"
                    >
                      <Plus className="w-4 h-4" />
                      Quick Add
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDrink(item);
                      }}
                      className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 border border-white/20"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      Customize
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#8fa684]">
                        {item.category}
                      </span>
                      {item.isPopular && (
                        <span className="text-[10px] font-semibold text-[#a3d9b4] uppercase tracking-wider">
                          Signature
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif-display text-lg font-bold text-[#f4eee5] mt-1 group-hover:text-[#a3d9b4] transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-stone-300 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Tasting Notes Chips */}
                    {item.tastingNotes && item.tastingNotes.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.tastingNotes.map((note) => (
                          <span
                            key={note}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-[#1c3025] text-[#b5e0c3] border border-[#2b4b39]"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Customize */}
                  <div className="pt-4 mt-4 border-t border-[#22392c] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                        Base Price
                      </span>
                      <span className="font-mono text-base sm:text-lg font-bold text-[#a3d9b4]">
                        Rp {formatNumberId(item.price)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDrink(item);
                      }}
                      className="px-3.5 py-1.5 rounded-full border border-[#3e6f4f]/60 text-[#a3d9b4] hover:bg-[#3e6f4f] hover:text-white text-xs font-medium transition-colors duration-200 flex items-center gap-1.5"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>Options</span>
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
