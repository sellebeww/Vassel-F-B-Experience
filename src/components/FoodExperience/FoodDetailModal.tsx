import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Flame, Plus, Minus, Check, Clock, Sparkles } from 'lucide-react';
import { MenuItem, FoodCustomization } from '../../types';
import { useApp } from '../../context/AppContext';
import { FOOD_SIZE_SURCHARGE, sumSelectedPrices } from '../../lib/pricing';
import { formatNumberId } from '../../lib/format';

const ADDONS_AVAILABLE = [
  { id: 'egg', name: '63°C Japanese Onsen Egg', price: 6000 },
  { id: 'cheese', name: 'Melted Gouda & Cheddar Blend', price: 8000 },
  { id: 'bacon', name: 'Crispy Smoked Beef Bacon Strips', price: 10000 },
  { id: 'truffle', name: 'Extra White Truffle Aioli Dip', price: 7000 },
  { id: 'caramelized_onions', name: 'Double Caramelized Onions', price: 5000 },
];

export const FoodDetailModal: React.FC = () => {
  const { selectedFood, setSelectedFood, addToCart } = useApp();

  const [size, setSize] = useState<FoodCustomization['size']>('Regular');
  const [spiceLevel, setSpiceLevel] = useState<FoodCustomization['spiceLevel']>('Mild');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!selectedFood) return null;

  // Pricing calculations
  const sizePriceMultiplier = FOOD_SIZE_SURCHARGE[size];
  const addonsTotal = sumSelectedPrices(selectedAddons, ADDONS_AVAILABLE);

  const unitPrice = selectedFood.price + sizePriceMultiplier + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);

    const addonPriceMap: Record<string, number> = {};
    selectedAddons.forEach((id) => {
      const a = ADDONS_AVAILABLE.find((item) => item.id === id);
      if (a) addonPriceMap[a.name] = a.price;
    });

    setTimeout(() => {
      addToCart({
        itemType: 'food',
        name: selectedFood.name,
        image: selectedFood.image,
        unitPrice,
        quantity,
        totalPrice,
        foodCustomization: {
          size,
          spiceLevel,
          selectedAddons: selectedAddons.map(
            (id) => ADDONS_AVAILABLE.find((a) => a.id === id)?.name || id
          ),
          addonPrices: addonPriceMap
        }
      });
      setIsAdding(false);
      setSelectedFood(null);
    }, 400);
  };

  return (
    <AnimatePresence>
      <div 
        id="food-detail-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#1c1410] border border-[#38261e] rounded-3xl overflow-hidden shadow-2xl text-[#f8f4eb] flex flex-col md:flex-row max-h-[92vh]"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedFood(null)}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Large Image */}
          <div className="md:w-1/2 relative bg-[#120d0a] shrink-0 min-h-[260px] md:min-h-full">
            <img
              src={selectedFood.image}
              alt={selectedFood.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1410] via-transparent to-transparent md:hidden" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#c95d2c] text-white text-xs font-bold uppercase tracking-wider">
                {selectedFood.category}
              </span>
              {selectedFood.isPopular && (
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-stone-200 text-xs">
                  Chef Choice
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Information & Interactive Customization */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[70vh] md:max-h-[85vh]">
            <div className="space-y-6">
              
              {/* Header Info */}
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
                  <div className="flex items-center gap-1 text-[#f5c69b]">
                    <Star className="w-3.5 h-3.5 fill-[#f5c69b]" />
                    <span className="font-semibold text-white">{selectedFood.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{selectedFood.reviewsCount} reviews</span>
                  {selectedFood.prepTime && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#e28c61]" />
                        {selectedFood.prepTime}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#faf7f2]">
                  {selectedFood.name}
                </h3>

                <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
                  {selectedFood.description}
                </p>

                <div className="mt-3 font-mono text-xl sm:text-2xl font-bold text-[#f5c69b]">
                  Rp {formatNumberId(selectedFood.price)}
                </div>
              </div>

              {/* Option: Size */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#e28c61] font-semibold">
                    Portion Size
                  </label>
                  <span className="text-[11px] text-stone-400">Required</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['Regular', 'Double Patty', 'Upsize'] as const).map((s) => {
                    const isSelected = size === s;
                    const priceNote = FOOD_SIZE_SURCHARGE[s] > 0 ? `+Rp ${formatNumberId(FOOD_SIZE_SURCHARGE[s])}` : 'Standard';
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-[#c95d2c]/20 border-[#c95d2c] text-white'
                            : 'bg-[#140e0b] border-white/5 text-stone-300 hover:border-white/20'
                        }`}
                      >
                        <span className="block text-xs font-medium">{s}</span>
                        <span className="text-[10px] text-stone-400 font-mono block mt-0.5">
                          {priceNote}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Option: Spice Level */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#e28c61] font-semibold">
                    Spice Level
                  </label>
                  <span className="text-[11px] text-stone-400">Select heat</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {(['Non-Spicy', 'Mild', 'Medium', 'Hot', 'Extra Spicy'] as const).map((lvl) => {
                    const isSelected = spiceLevel === lvl;
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSpiceLevel(lvl)}
                        className={`py-2 px-1 rounded-lg border text-center transition-all ${
                          isSelected
                            ? 'bg-[#c95d2c] border-[#c95d2c] text-white font-semibold'
                            : 'bg-[#140e0b] border-white/5 text-stone-300 hover:border-white/20'
                        }`}
                      >
                        <span className="block text-[10px] truncate">{lvl}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Option: Add-ons */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#e28c61] font-semibold block mb-2">
                  Gourmet Add-Ons
                </label>
                <div className="space-y-2">
                  {ADDONS_AVAILABLE.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          isChecked
                            ? 'bg-[#2b1c15] border-[#c95d2c] text-white'
                            : 'bg-[#140e0b] border-white/5 text-stone-300 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center ${
                              isChecked
                                ? 'bg-[#c95d2c] border-[#c95d2c]'
                                : 'border-stone-500'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-xs">{addon.name}</span>
                        </div>
                        <span className="text-xs font-mono text-[#f5c69b]">
                          +Rp {formatNumberId(addon.price)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Bottom Actions: Quantity & Add to Cart */}
            <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Quantity
                </span>
                <div className="flex items-center gap-3 bg-[#140e0b] px-3 py-1.5 rounded-full border border-white/10">
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

              {/* Big Action Button with Microinteraction */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full py-4 rounded-2xl bg-[#c95d2c] hover:bg-[#b24f22] text-white font-medium tracking-wide flex items-center justify-between px-6 shadow-xl shadow-[#c95d2c]/30 transition-all duration-200 active:scale-[0.99]"
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
                    {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
                  </span>
                </div>

                <span className="font-mono text-base font-bold">
                  Rp {formatNumberId(totalPrice)}
                </span>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
