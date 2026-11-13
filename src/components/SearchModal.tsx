import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Star, Utensils, Coffee, Package, ArrowRight, Clock } from 'lucide-react';
import { FOOD_MENU_ITEMS } from '../data/foodData';
import { DRINKS_MENU_ITEMS } from '../data/drinksData';
import { FOOD_SETS } from '../data/setsData';
import { useApp } from '../context/AppContext';
import { MenuItem, FoodSet } from '../types';
import { searchItems } from '../lib/search';
import { formatNumberId } from '../lib/format';
import { useDialog } from '../hooks/useDialog';

const RECENT_SEARCHES = [
  'Truffle Beef Burger',
  'Ceremonial Matcha Latte',
  'Curated Lunch Set',
  'Dirty Coffee',
  'Wagyu Gyudon',
  'Basque Cheesecake'
];

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    setSelectedFood, 
    setSelectedDrink,
    setExperience 
  } = useApp();
  
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const dialogRef = useDialog(isSearchOpen, () => setIsSearchOpen(false));

  if (!isSearchOpen) return null;

  const q = query.trim();

  const matchingFood = searchItems(FOOD_MENU_ITEMS, query);
  const matchingDrinks = searchItems(DRINKS_MENU_ITEMS, query);
  const matchingSets = searchItems(FOOD_SETS, query);

  const hasResults = matchingFood.length > 0 || matchingDrinks.length > 0 || matchingSets.length > 0;

  const handleSelectFood = (item: MenuItem) => {
    setExperience('food');
    setSelectedFood(item);
    setIsSearchOpen(false);
  };

  const handleSelectDrink = (item: MenuItem) => {
    setExperience('drinks');
    setSelectedDrink(item);
    setIsSearchOpen(false);
  };

  const handleSelectSet = (set: FoodSet) => {
    setExperience('food');
    setIsSearchOpen(false);
    setTimeout(() => {
      document.getElementById('sets')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <AnimatePresence>
      <div 
        id="fullscreen-search-overlay"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search the menu"
        tabIndex={-1}
        className="outline-none fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex flex-col p-4 sm:p-8"
      >
        <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col">
          
          {/* Search Header */}
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="relative flex-1 flex items-center">
              <Search className="w-6 h-6 text-stone-400 shrink-0 mr-4" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search food, coffee, matcha and sets"
                placeholder="Search food, coffee, matcha, sets..."
                className="w-full bg-transparent text-xl sm:text-2xl font-serif-display text-white placeholder-stone-500 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="p-1 rounded-full hover:bg-white/10 text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
              className="p-2.5 rounded-full bg-white/10 text-stone-300 hover:text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 py-6 overflow-y-auto space-y-8">
            {/* If no search typed yet, show recent searches */}
            {!q && (
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-400 mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Popular &amp; Recent Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {RECENT_SEARCHES.map((item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-stone-300 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Categorized Search Results */}
            {q && (
              <>
                {!hasResults && (
                  <div className="py-12 text-center text-stone-400">
                    <p className="text-base">No items found matching "{query}"</p>
                    <p className="text-xs mt-1">Try searching for "burger", "matcha", "coffee", or "pasta".</p>
                  </div>
                )}

                {/* 1. Food Results */}
                {matchingFood.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#e28c61] mb-3">
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Food ({matchingFood.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {matchingFood.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectFood(item)}
                          className="cursor-pointer p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between gap-3 group transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="text-sm font-medium text-white group-hover:text-[#e28c61] transition-colors">
                                {item.name}
                              </h4>
                              <span className="text-xs text-stone-400">
                                {item.category} • Rp {formatNumberId(item.price)}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-white transition-colors shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Drinks Results */}
                {matchingDrinks.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#a3d9b4] mb-3">
                      <Coffee className="w-3.5 h-3.5" />
                      <span>Drinks ({matchingDrinks.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {matchingDrinks.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectDrink(item)}
                          className="cursor-pointer p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between gap-3 group transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="text-sm font-medium text-white group-hover:text-[#a3d9b4] transition-colors">
                                {item.name}
                              </h4>
                              <span className="text-xs text-stone-400">
                                {item.category} • Rp {formatNumberId(item.price)}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-white transition-colors shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Packages Results */}
                {matchingSets.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#f5c69b] mb-3">
                      <Package className="w-3.5 h-3.5" />
                      <span>Curated Packages ({matchingSets.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {matchingSets.map((set) => (
                        <div
                          key={set.id}
                          onClick={() => handleSelectSet(set)}
                          className="cursor-pointer p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between gap-3 group transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={set.image}
                              alt={set.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="text-sm font-medium text-white group-hover:text-[#f5c69b] transition-colors">
                                {set.name}
                              </h4>
                              <span className="text-xs text-stone-400">
                                From Rp {formatNumberId(set.basePrice)}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-white transition-colors shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Quick Keyboard hint */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-500">
            <span>Press ESC or click close to return</span>
            <span>Live filtering active</span>
          </div>

        </div>
      </div>
    </AnimatePresence>
  );
};
