import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, Plus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { FOOD_SETS } from '../../data/setsData';
import { FoodSet } from '../../types';
import { useApp } from '../../context/AppContext';

export const FoodSets: React.FC = () => {
  const { addToCart, setCustomizingSet } = useApp();
  const [activeSetId, setActiveSetId] = useState<string>(FOOD_SETS[0].id);

  // Active set customization state for the embedded builder
  const activeSet = FOOD_SETS.find((s) => s.id === activeSetId) || FOOD_SETS[0];

  const [selectedMainId, setSelectedMainId] = useState<string>(activeSet.mains[0]?.id || '');
  const [selectedSideId, setSelectedSideId] = useState<string>(activeSet.sides[0]?.id || '');
  const [selectedDrinkId, setSelectedDrinkId] = useState<string>(activeSet.drinks[0]?.id || '');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Update builder choices whenever activeSetId switches
  const handleSwitchSet = (set: FoodSet) => {
    setActiveSetId(set.id);
    setSelectedMainId(set.mains[0]?.id || '');
    setSelectedSideId(set.sides[0]?.id || '');
    setSelectedDrinkId(set.drinks[0]?.id || '');
    setSelectedAddons([]);
  };

  // Calculate dynamic price
  const chosenMain = activeSet.mains.find((m) => m.id === selectedMainId);
  const chosenSide = activeSet.sides.find((s) => s.id === selectedSideId);
  const chosenDrink = activeSet.drinks.find((d) => d.id === selectedDrinkId);

  const mainExtra = chosenMain?.extraPrice || 0;
  const sideExtra = chosenSide?.extraPrice || 0;
  const drinkExtra = chosenDrink?.extraPrice || 0;
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const found = activeSet.addons.find((a) => a.id === addonId);
    return sum + (found ? found.price : 0);
  }, 0);

  const calculatedTotal = activeSet.basePrice + mainExtra + sideExtra + drinkExtra + addonsTotal;

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleAddCustomSetToCart = () => {
    const addonNames = selectedAddons
      .map((id) => activeSet.addons.find((a) => a.id === id)?.name)
      .filter(Boolean) as string[];

    addToCart({
      itemType: 'set',
      name: activeSet.name,
      image: activeSet.image,
      unitPrice: calculatedTotal,
      quantity: 1,
      totalPrice: calculatedTotal,
      setSelections: {
        main: chosenMain?.name || 'Chef Choice Main',
        side: chosenSide?.name || 'Chef Choice Side',
        drink: chosenDrink?.name || 'Chef Choice Drink',
        addons: addonNames
      }
    });
  };

  return (
    <section 
      id="sets"
      className="py-24 bg-[#140e0b] text-[#f8f4eb] border-t border-[#291c16] relative overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-[#c95d2c]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c95d2c]/15 border border-[#c95d2c]/30 text-[#e28c61] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#c95d2c]" />
            <span>Complete Your Meal</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#faf7f2]">
            Curated Dining Sets &amp; Combos
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300 font-light max-w-xl mx-auto">
            Pair your main course with crisp artisanal sides and signature beverages. Customize each element to match your craving.
          </p>
        </div>

        {/* Set Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {FOOD_SETS.map((set) => {
            const isSelected = activeSet.id === set.id;
            return (
              <div
                key={set.id}
                onClick={() => handleSwitchSet(set)}
                className={`group cursor-pointer rounded-2xl p-5 transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#251913] border-[#c95d2c] shadow-xl shadow-[#c95d2c]/20 ring-1 ring-[#c95d2c]'
                    : 'bg-[#1a120e] border-[#302018] hover:border-white/20 hover:bg-[#201511]'
                }`}
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-black/40">
                    <img
                      src={set.image}
                      alt={set.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {set.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#c95d2c] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                        {set.badge}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-[#e28c61] uppercase tracking-wider block">
                    {set.subtitle}
                  </span>
                  <h3 className="font-serif-display text-lg font-bold text-[#faf7f2] mt-1">
                    {set.name}
                  </h3>

                  <ul className="mt-3 space-y-1.5 text-xs text-stone-300">
                    {set.itemsIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-[#c95d2c] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block line-through">
                      Rp {set.originalPrice.toLocaleString('id-ID')}
                    </span>
                    <span className="font-mono text-base font-bold text-[#f5c69b]">
                      From Rp {set.basePrice.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                      isSelected
                        ? 'bg-[#c95d2c] text-white'
                        : 'bg-white/5 text-stone-300 group-hover:bg-white/10'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Customize'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive "Customize Your Set" Studio Box */}
        <div 
          id="customize-set-builder"
          className="rounded-3xl bg-[#1d1410] border border-[#3b281f] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#e28c61]">
                <Tag className="w-3.5 h-3.5" />
                <span>Interactive Package Builder</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#faf7f2] mt-1">
                Customize: {activeSet.name}
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl">
                {activeSet.description}
              </p>
            </div>

            <div className="flex items-center gap-4 bg-[#140e0b] px-5 py-3 rounded-2xl border border-white/10 self-start lg:self-auto">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                  Package Total
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#f5c69b]">
                  Rp {calculatedTotal.toLocaleString('id-ID')}
                </span>
              </div>
              <button
                onClick={handleAddCustomSetToCart}
                className="px-5 py-3 rounded-xl bg-[#c95d2c] hover:bg-[#b54f20] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg shadow-[#c95d2c]/30 flex items-center gap-2 transition-all hover:scale-105"
              >
                <span>Add Set To Cart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Builder Step Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8">
            
            {/* Step 1: Main Course */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#e28c61] uppercase tracking-wider">
                  STEP 01
                </span>
                <span className="text-xs text-stone-400">Choose 1 Main</span>
              </div>
              <h4 className="font-serif-display text-base font-bold text-[#faf7f2]">
                Select Main Dish
              </h4>

              <div className="space-y-2">
                {activeSet.mains.map((main) => {
                  const isSelected = selectedMainId === main.id;
                  return (
                    <div
                      key={main.id}
                      onClick={() => setSelectedMainId(main.id)}
                      className={`cursor-pointer p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#291b15] border-[#c95d2c] text-white font-medium shadow-sm'
                          : 'bg-[#160f0c] border-white/5 text-stone-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-[#c95d2c] bg-[#c95d2c]'
                              : 'border-stone-500'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span>{main.name}</span>
                      </div>
                      {main.extraPrice > 0 && (
                        <span className="text-[11px] font-mono text-[#f5c69b]">
                          +Rp {main.extraPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Side Dish */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#e28c61] uppercase tracking-wider">
                  STEP 02
                </span>
                <span className="text-xs text-stone-400">Choose 1 Side</span>
              </div>
              <h4 className="font-serif-display text-base font-bold text-[#faf7f2]">
                Select Crispy Side
              </h4>

              <div className="space-y-2">
                {activeSet.sides.map((side) => {
                  const isSelected = selectedSideId === side.id;
                  return (
                    <div
                      key={side.id}
                      onClick={() => setSelectedSideId(side.id)}
                      className={`cursor-pointer p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#291b15] border-[#c95d2c] text-white font-medium shadow-sm'
                          : 'bg-[#160f0c] border-white/5 text-stone-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-[#c95d2c] bg-[#c95d2c]'
                              : 'border-stone-500'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span>{side.name}</span>
                      </div>
                      {side.extraPrice > 0 && (
                        <span className="text-[11px] font-mono text-[#f5c69b]">
                          +Rp {side.extraPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Drink Beverage */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#e28c61] uppercase tracking-wider">
                  STEP 03
                </span>
                <span className="text-xs text-stone-400">Choose 1 Beverage</span>
              </div>
              <h4 className="font-serif-display text-base font-bold text-[#faf7f2]">
                Select Drink
              </h4>

              <div className="space-y-2">
                {activeSet.drinks.map((drink) => {
                  const isSelected = selectedDrinkId === drink.id;
                  return (
                    <div
                      key={drink.id}
                      onClick={() => setSelectedDrinkId(drink.id)}
                      className={`cursor-pointer p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#291b15] border-[#c95d2c] text-white font-medium shadow-sm'
                          : 'bg-[#160f0c] border-white/5 text-stone-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-[#c95d2c] bg-[#c95d2c]'
                              : 'border-stone-500'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span>{drink.name}</span>
                      </div>
                      {drink.extraPrice > 0 && (
                        <span className="text-[11px] font-mono text-[#f5c69b]">
                          +Rp {drink.extraPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Add-ons selection */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-3">
              Gourmet Add-Ons (Optional)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {activeSet.addons.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                      isChecked
                        ? 'bg-[#291b15] border-[#c95d2c] text-white'
                        : 'bg-[#160f0c] border-white/5 text-stone-300 hover:border-white/20'
                    }`}
                  >
                    <span>{addon.name}</span>
                    <span className="font-mono text-[11px] text-[#f5c69b] font-semibold">
                      +Rp {addon.price.toLocaleString('id-ID')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
