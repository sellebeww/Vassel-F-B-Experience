import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNumberId } from '../lib/format';

export const FloatingCartBar: React.FC = () => {
  const {
    experience,
    cart,
    cartCount,
    subtotal,
    isCartOpen,
    isCheckoutOpen,
    setIsCartOpen
  } = useApp();

  const isFood = experience === 'food';
  const isVisible = experience !== 'landing' && cartCount > 0 && !isCartOpen && !isCheckoutOpen;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="floating-cart-bar"
          onClick={() => setIsCartOpen(true)}
          initial={{ opacity: 0, y: 40, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 40, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className={`fixed bottom-5 sm:bottom-6 left-1/2 z-40 flex items-center gap-3 pl-2.5 pr-4 sm:pr-5 py-2 sm:py-2.5 rounded-full shadow-2xl border backdrop-blur-xl transition-colors max-w-[calc(100vw-2rem)] ${
            isFood
              ? 'bg-[#c95d2c] hover:bg-[#b24f22] border-[#e8a381]/50 shadow-[#c95d2c]/40'
              : 'bg-[#3e6f4f] hover:bg-[#325a40] border-[#a3d9b4]/50 shadow-[#3e6f4f]/40'
          } text-white`}
        >
          {/* Stacked thumbnails of items currently in the cart */}
          <div className="flex items-center -space-x-3 shrink-0">
            {cart.slice(0, 3).map((item, idx) => (
              <img
                key={item.cartItemId}
                src={item.image}
                alt={item.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-white/90 shadow-md"
                style={{ zIndex: 3 - idx }}
              />
            ))}
            {cart.length > 3 && (
              <div className="w-9 h-9 rounded-full bg-black/40 border-2 border-white/90 flex items-center justify-center text-[11px] font-bold">
                +{cart.length - 3}
              </div>
            )}
          </div>

          <div className="text-left leading-tight min-w-0">
            <div className="text-[13px] font-semibold whitespace-nowrap">
              {cartCount} item{cartCount > 1 ? 's' : ''} in cart
            </div>
            <div className="text-[11px] text-white/80 font-mono whitespace-nowrap">
              Rp {formatNumberId(subtotal)}
            </div>
          </div>

          <div className="flex items-center gap-1 pl-3 border-l border-white/25 text-xs font-semibold uppercase tracking-wide shrink-0">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Cart</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
