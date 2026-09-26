import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Check, Plus, Minus, Sparkles, Coffee, Leaf, Droplet, Snowflake } from 'lucide-react';
import { MenuItem, DrinkCustomization } from '../../types';
import { useApp } from '../../context/AppContext';

const MILK_OPTIONS = [
  { id: 'Fresh Milk', name: 'Farm Fresh Dairy Milk', extraPrice: 0 },
  { id: 'Oat Milk', name: 'Barista Grade Oat Milk (Oatly)', extraPrice: 8000 },
  { id: 'Soy Milk', name: 'Organic Japanese Soy Milk', extraPrice: 6000 },
  { id: 'Almond Milk', name: 'Roasted Califia Almond Milk', extraPrice: 8000 },
];

const TOPPING_OPTIONS = [
  { id: 'Cream', name: 'Sweet Vanilla Heavy Cream', price: 6000 },
  { id: 'Matcha Foam', name: 'Hand-Whipped Uji Matcha Sea Salt Foam', price: 8000 },
  { id: 'Boba', name: 'Slow-Cooked Brown Sugar Boba Pearls', price: 5000 },
  { id: 'Strawberry', name: 'Chunky Organic Strawberry Compote', price: 8000 },
  { id: 'Espresso Shot', name: 'Single Origin Espresso Float Shot', price: 7000 },
];

export const DrinksCustomizationModal: React.FC = () => {
  const { selectedDrink, setSelectedDrink, addToCart } = useApp();

  const [size, setSize] = useState<DrinkCustomization['size']>('Regular');
  const [milk, setMilk] = useState<DrinkCustomization['milk']>('Fresh Milk');
  const [sweetness, setSweetness] = useState<DrinkCustomization['sweetness']>('50%');
  const [ice, setIce] = useState<DrinkCustomization['ice']>('Normal Ice');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!selectedDrink) return null;

  // Realtime Price Calculations
  const sizePrice = size === 'Large' ? 6000 : 0;
  const milkPrice = MILK_OPTIONS.find((m) => m.id === milk)?.extraPrice || 0;
  const toppingsTotal = selectedToppings.reduce((sum, topName) => {
    const found = TOPPING_OPTIONS.find((t) => t.id === topName);
    return sum + (found ? found.price : 0);
  }, 0);

  const unitPrice = selectedDrink.price + sizePrice + milkPrice + toppingsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleTopping = (toppingId: string) => {
    if (selectedToppings.includes(toppingId)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== toppingId));
    } else {
      setSelectedToppings([...selectedToppings, toppingId]);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);

    const toppingPricesMap: Record<string, number> = {};
    selectedToppings.forEach((topId) => {
      const t = TOPPING_OPTIONS.find((item) => item.id === topId);
      if (t) toppingPricesMap[t.name] = t.price;
    });

    setTimeout(() => {
      addToCart({
        itemType: 'drink',
        name: selectedDrink.name,
        image: selectedDrink.image,
        unitPrice,
        quantity,
        totalPrice,
        drinkCustomization: {
          size,
          milk,
          sweetness,
          ice,
          toppings: selectedToppings.map(
            (id) => TOPPING_OPTIONS.find((t) => t.id === id)?.name || id
          ),
          toppingPrices: toppingPricesMap
        }
      });
      setIsAdding(false);
      setSelectedDrink(null);
    }, 400);
  };

  return (
    <AnimatePresence>
      <div 
        id="drinks-customization-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#121e17] border border-[#263e30] rounded-3xl overflow-hidden shadow-2xl text-[#f4eee5] flex flex-col md:flex-row max-h-[92vh]"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedDrink(null)}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Large Aesthetic Image & Japanese Details */}
          <div className="md:w-1/2 relative bg-[#0a130e] shrink-0 min-h-[260px] md:min-h-full">
            <img
              src={selectedDrink.image}
              alt={selectedDrink.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121e17] via-transparent to-transparent md:hidden" />
            
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="px-3 py-1 rounded-full bg-[#3e6f4f] text-white text-xs font-bold uppercase tracking-wider self-start shadow-md">
                {selectedDrink.category}
              </span>
              {selectedDrink.japaneseName && (
                <span className="font-japanese px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[#a3d9b4] text-xs border border-white/10 self-start">
                  {selectedDrink.japaneseName}
                </span>
              )}
            </div>

            {selectedDrink.origin && (
              <div className="absolute bottom-4 left-4 right-4 hidden md:block p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-xs text-stone-300">
                <span className="text-[10px] font-mono text-[#a3d9b4] uppercase tracking-wider block">
                  Origin &amp; Harvest
                </span>
                {selectedDrink.origin}
              </div>
            )}
          </div>

          {/* Right Column: Customization Controls */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[70vh] md:max-h-[85vh]">
            <div className="space-y-6">
              
              {/* Header Info */}
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
                  <div className="flex items-center gap-1 text-[#f5c69b]">
                    <Star className="w-3.5 h-3.5 fill-[#f5c69b]" />
                    <span className="font-semibold text-white">{selectedDrink.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{selectedDrink.reviewsCount} reviews</span>
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#f4eee5]">
                  {selectedDrink.name}
                </h3>

                <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
                  {selectedDrink.description}
                </p>

                <div className="mt-3 font-mono text-xl sm:text-2xl font-bold text-[#a3d9b4]">
                  Rp {selectedDrink.price.toLocaleString('id-ID')}
                </div>
              </div>

              {/* 1. Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#a3d9b4] font-semibold">
                    Cup Size
                  </label>
                  <span className="text-[11px] text-stone-400">Regular (12oz) / Large (16oz)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['Regular', 'Large'] as const).map((s) => {
                    const isSelected = size === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-[#3e6f4f]/30 border-[#3e6f4f] text-white font-medium'
                            : 'bg-[#0e1712] border-white/5 text-stone-300 hover:border-white/20'
                        }`}
                      >
                        <span className="block text-xs font-medium">{s}</span>
                        <span className="text-[10px] text-stone-400 font-mono block mt-0.5">
                          {s === 'Large' ? '+Rp 6.000' : 'Included'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Milk Options */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#a3d9b4] font-semibold">
                    Milk Selection
                  </label>
                  <span className="text-[11px] text-stone-400">Plant-based available</span>
                </div>
                <div className="space-y-1.5">
                  {MILK_OPTIONS.map((m) => {
                    const isSelected = milk === m.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setMilk(m.id as any)}
                        className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                          isSelected
                            ? 'bg-[#21372a] border-[#3e6f4f] text-white font-medium'
                            : 'bg-[#0e1712] border-white/5 text-stone-300 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#3e6f4f] bg-[#3e6f4f]' : 'border-stone-500'
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <span>{m.name}</span>
                        </div>
                        {m.extraPrice > 0 && (
                          <span className="text-xs font-mono text-[#a3d9b4]">
                            +Rp {m.extraPrice.toLocaleString('id-ID')}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Sweetness Slider / Buttons */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#a3d9b4] font-semibold">
                    Sweetness Level
                  </label>
                  <span className="text-[11px] text-stone-400">Natural cane sugar</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {(['0%', '25%', '50%', '75%', '100%'] as const).map((lvl) => {
                    const isSelected = sweetness === lvl;
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSweetness(lvl)}
                        className={`py-2 px-1 rounded-lg border text-center transition-all ${
                          isSelected
                            ? 'bg-[#3e6f4f] border-[#3e6f4f] text-white font-bold'
                            : 'bg-[#0e1712] border-white/5 text-stone-300 hover:border-white/20'
                        }`}
                      >
                        <span className="block text-xs">{lvl}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Ice Preference */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#a3d9b4] font-semibold">
                    Ice Amount
                  </label>
                  <span className="text-[11px] text-stone-400">Temperature</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['No Ice', 'Less Ice', 'Normal Ice', 'Extra Ice'] as const).map((iceOpt) => {
                    const isSelected = ice === iceOpt;
                    return (
                      <button
                        key={iceOpt}
                        type="button"
                        onClick={() => setIce(iceOpt)}
                        className={`py-2 px-1 rounded-lg border text-center transition-all ${
                          isSelected
                            ? 'bg-[#3e6f4f] border-[#3e6f4f] text-white font-semibold'
                            : 'bg-[#0e1712] border-white/5 text-stone-300 hover:border-white/20'
                        }`}
                      >
                        <span className="block text-[11px] truncate">{iceOpt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Toppings Customization */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#a3d9b4] font-semibold block mb-2">
                  Artisanal Toppings &amp; Floats
                </label>
                <div className="space-y-2">
                  {TOPPING_OPTIONS.map((top) => {
                    const isChecked = selectedToppings.includes(top.id);
                    return (
                      <div
                        key={top.id}
                        onClick={() => toggleTopping(top.id)}
                        className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          isChecked
                            ? 'bg-[#21372a] border-[#3e6f4f] text-white'
                            : 'bg-[#0e1712] border-white/5 text-stone-300 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center ${
                              isChecked ? 'bg-[#3e6f4f] border-[#3e6f4f]' : 'border-stone-500'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-xs">{top.name}</span>
                        </div>
                        <span className="text-xs font-mono text-[#a3d9b4]">
                          +Rp {top.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Bottom: Quantity & Add to Cart */}
            <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Quantity
                </span>
                <div className="flex items-center gap-3 bg-[#0e1712] px-3 py-1.5 rounded-full border border-white/10">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 text-stone-300"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-sm font-bold w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 text-stone-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Big CTA */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full py-4 rounded-2xl bg-[#3e6f4f] hover:bg-[#325a40] text-white font-medium tracking-wide flex items-center justify-between px-6 shadow-xl shadow-[#3e6f4f]/30 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-2">
                  {isAdding ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    {isAdding ? 'Preparing Brew...' : 'Add to Cart'}
                  </span>
                </div>

                <span className="font-mono text-base font-bold">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
