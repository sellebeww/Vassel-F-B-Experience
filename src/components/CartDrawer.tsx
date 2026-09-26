import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    serviceFee,
    totalAmount,
    setIsCheckoutOpen,
    addToCart,
    experience
  } = useApp();

  if (!isCartOpen) return null;

  const isFood = experience === 'food';

  const handleQuickUpsell = (type: 'matcha' | 'fries') => {
    if (type === 'matcha') {
      addToCart({
        itemType: 'drink',
        name: 'Ceremonial Matcha Latte',
        image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80',
        unitPrice: 35000,
        quantity: 1,
        totalPrice: 35000,
        drinkCustomization: {
          size: 'Regular',
          milk: 'Fresh Milk',
          sweetness: '50%',
          ice: 'Normal Ice',
          toppings: [],
          toppingPrices: {}
        }
      });
    } else {
      addToCart({
        itemType: 'food',
        name: 'Crispy Truffle Fries',
        image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=400&q=80',
        unitPrice: 20000,
        quantity: 1,
        totalPrice: 20000,
        foodCustomization: {
          size: 'Regular',
          spiceLevel: 'Mild',
          selectedAddons: [],
          addonPrices: {}
        }
      });
    }
  };

  return (
    <AnimatePresence>
      <div 
        id="cart-drawer-overlay"
        className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className={`relative w-full max-w-md h-full shadow-2xl flex flex-col justify-between z-10 ${
            isFood ? 'bg-[#1a120e] text-[#f8f4eb]' : 'bg-[#101c15] text-[#f4eee5]'
          } border-l ${isFood ? 'border-[#38261e]' : 'border-[#243a2d]'}`}
        >
          {/* Cart Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isFood ? 'bg-[#c95d2c]/20 text-[#e99a77]' : 'bg-[#3e6f4f]/30 text-[#a3d9b4]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-display text-lg font-bold">Your Order</h3>
                <span className="text-xs text-stone-400">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-stone-400 hover:text-red-400 px-2 py-1 transition-colors"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <ShoppingBag className="w-7 h-7 text-stone-500" />
                </div>
                <div>
                  <h4 className="font-serif-display text-lg font-bold text-white">Your cart is empty</h4>
                  <p className="text-xs text-stone-400 mt-1 max-w-xs">
                    Explore our menu and add your favorite comfort food or handcrafted matcha beverage.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className={`mt-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white ${
                    isFood ? 'bg-[#c95d2c]' : 'bg-[#3e6f4f]'
                  }`}
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex gap-3 group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-black/40"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-sm text-white line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-stone-400 hover:text-red-400 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Details */}
                      {item.foodCustomization && (
                        <div className="text-[11px] text-stone-400 space-y-0.5 mt-0.5">
                          <p>
                            {item.foodCustomization.size} • {item.foodCustomization.spiceLevel}
                          </p>
                          {item.foodCustomization.selectedAddons.length > 0 && (
                            <p className="text-[10px] text-[#e28c61]">
                              + {item.foodCustomization.selectedAddons.join(', ')}
                            </p>
                          )}
                        </div>
                      )}

                      {item.drinkCustomization && (
                        <div className="text-[11px] text-stone-400 space-y-0.5 mt-0.5">
                          <p>
                            {item.drinkCustomization.size} • {item.drinkCustomization.milk} • {item.drinkCustomization.sweetness} sweet • {item.drinkCustomization.ice}
                          </p>
                          {item.drinkCustomization.toppings.length > 0 && (
                            <p className="text-[10px] text-[#a3d9b4]">
                              + {item.drinkCustomization.toppings.join(', ')}
                            </p>
                          )}
                        </div>
                      )}

                      {item.setSelections && (
                        <div className="text-[11px] text-stone-400 space-y-0.5 mt-0.5">
                          <p className="line-clamp-1">Main: {item.setSelections.main}</p>
                          <p className="line-clamp-1">Side: {item.setSelections.side}</p>
                          <p className="line-clamp-1">Drink: {item.setSelections.drink}</p>
                          {item.setSelections.addons.length > 0 && (
                            <p className="text-[10px] text-[#e28c61]">
                              + {item.setSelections.addons.join(', ')}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Quantity Adjustment & Item Total */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded-lg border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="text-stone-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs w-4 text-center font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="text-stone-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-xs sm:text-sm font-bold text-[#f5c69b]">
                        Rp {item.totalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Recommendation Upsell: "Complete Your Order" */}
            {cart.length > 0 && (
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#e28c61]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Complete Your Order</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-black/30 border border-white/5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=120&q=80"
                        alt="Matcha"
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <span className="text-xs font-medium text-white block">
                          Ceremonial Matcha Latte
                        </span>
                        <span className="text-[11px] font-mono text-[#a3d9b4]">
                          +Rp 35.000 (Special Add-on)
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleQuickUpsell('matcha')}
                      className="px-2.5 py-1 rounded-lg bg-[#3e6f4f] hover:bg-[#325a40] text-white text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-black/30 border border-white/5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=120&q=80"
                        alt="Fries"
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <span className="text-xs font-medium text-white block">
                          Crispy Truffle Fries
                        </span>
                        <span className="text-[11px] font-mono text-[#f5c69b]">
                          +Rp 20.000 (Special Add-on)
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleQuickUpsell('fries')}
                      className="px-2.5 py-1 rounded-lg bg-[#c95d2c] hover:bg-[#b24f22] text-white text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cart Footer / Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-white/10 space-y-3 bg-black/20">
              <div className="space-y-1.5 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">
                    Rp {subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee (5%)</span>
                  <span className="font-mono text-white">
                    Rp {serviceFee.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                  <span>Total</span>
                  <span className="font-mono text-base text-[#f5c69b]">
                    Rp {totalAmount.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className={`w-full py-3.5 rounded-2xl text-white font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all duration-300 hover:gap-3 ${
                  isFood
                    ? 'bg-[#c95d2c] hover:bg-[#b24f22] shadow-[#c95d2c]/30'
                    : 'bg-[#3e6f4f] hover:bg-[#325a40] shadow-[#3e6f4f]/30'
                }`}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
