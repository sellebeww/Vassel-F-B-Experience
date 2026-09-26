import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, QrCode, CreditCard, Wallet, Clock, MapPin, Sparkles, Receipt, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderReceipt } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    subtotal,
    serviceFee,
    totalAmount,
    setLatestReceipt,
    experience
  } = useApp();

  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in');
  const [tableNumber, setTableNumber] = useState('Table 07');
  const [address, setAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'card' | 'cash'>('qris');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  if (!isCheckoutOpen) return null;

  const isFood = experience === 'food';

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName) {
      alert('Please enter your name');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `CRV-${Math.floor(1000 + Math.random() * 9000)}`;
      const newReceipt: OrderReceipt = {
        orderId,
        customerName,
        orderType,
        tableOrAddress: orderType === 'dine-in' ? tableNumber : orderType === 'takeaway' ? 'Pickup Counter' : address || 'Delivery Address',
        paymentMethod,
        items: [...cart],
        subtotal,
        serviceFee,
        tax: 0,
        total: totalAmount,
        estimatedTime: orderType === 'dine-in' ? '12-15 mins' : orderType === 'takeaway' ? '15 mins' : '30-40 mins',
        createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };

      setReceipt(newReceipt);
      setLatestReceipt(newReceipt);
      clearCart();
      setIsProcessing(false);
    }, 1000);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setReceipt(null);
  };

  return (
    <AnimatePresence>
      <div 
        id="checkout-modal"
        className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border ${
            isFood ? 'bg-[#1b130e] border-[#38261e] text-[#f8f4eb]' : 'bg-[#101c15] border-[#253b2d] text-[#f4eee5]'
          } max-h-[92vh] flex flex-col`}
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-[#e28c61]" />
              <h3 className="font-serif-display text-xl font-bold">
                {receipt ? 'Order Confirmed' : 'Checkout & Settlement'}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-8 overflow-y-auto flex-1">
            {receipt ? (
              /* Receipt Confirmation Screen */
              <div className="text-center py-4 space-y-6">
                <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#a3d9b4] block mb-1">
                    Order Received • {receipt.orderId}
                  </span>
                  <h4 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                    Thank you, Vassel!
                  </h4>
                  <p className="text-xs text-stone-300 mt-2 max-w-sm mx-auto">
                    Your gastronomy order is being handcrafted with care. Estimated wait: <span className="font-semibold text-white">{receipt.estimatedTime}</span>.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-left text-xs space-y-3 font-mono">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-stone-400">Order Ref</span>
                    <span className="text-white font-bold">{receipt.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Dining Mode</span>
                    <span className="text-white uppercase">{receipt.orderType} ({receipt.tableOrAddress})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Payment</span>
                    <span className="text-white uppercase">{receipt.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-bold">
                    <span className="text-stone-300">Total Paid</span>
                    <span className="text-[#f5c69b]">Rp {receipt.total.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="px-8 py-3 rounded-full bg-[#c95d2c] hover:bg-[#b24f22] text-white font-semibold text-xs uppercase tracking-wider shadow-lg"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Checkout Form */
              <form onSubmit={handleCompleteOrder} className="space-y-6">
                {/* 1. Dining Type */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#e28c61] font-semibold block mb-2">
                    Dining Mode
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['dine-in', 'takeaway', 'delivery'] as const).map((type) => {
                      const isSelected = orderType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setOrderType(type)}
                          className={`py-2.5 px-2 rounded-xl border text-xs capitalize transition-all ${
                            isSelected
                              ? 'bg-[#c95d2c]/20 border-[#c95d2c] text-white font-bold'
                              : 'bg-black/20 border-white/5 text-stone-300 hover:border-white/20'
                          }`}
                        >
                          {type.replace('-', ' ')}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Dining Location details */}
                {orderType === 'dine-in' && (
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                      Select Table Number
                    </label>
                    <select
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#c95d2c]"
                    >
                      <option value="Table 01">Table 01 — Garden Window</option>
                      <option value="Table 04">Table 04 — Bar Counter</option>
                      <option value="Table 07">Table 07 — Center Dining Room</option>
                      <option value="Table 12">Table 12 — Tatami Corner</option>
                    </select>
                  </div>
                )}

                {orderType === 'delivery' && (
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Street, Building, Unit Number, City"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#c95d2c]"
                    />
                  </div>
                )}

                {/* 3. Customer Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Pratama"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#c95d2c]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                      WhatsApp Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="0812-xxxx-xxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#c95d2c]"
                    />
                  </div>
                </div>

                {/* 4. Payment Method Selection */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#e28c61] font-semibold block mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('qris')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        paymentMethod === 'qris'
                          ? 'bg-[#c95d2c]/20 border-[#c95d2c] text-white'
                          : 'bg-black/20 border-white/5 text-stone-300 hover:border-white/20'
                      }`}
                    >
                      <QrCode className="w-5 h-5 mb-1 text-[#f5c69b]" />
                      <span className="text-xs font-bold">QRIS Instant</span>
                      <span className="text-[10px] text-stone-400">Gopay, OVO, BCA</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-[#c95d2c]/20 border-[#c95d2c] text-white'
                          : 'bg-black/20 border-white/5 text-stone-300 hover:border-white/20'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mb-1 text-[#f5c69b]" />
                      <span className="text-xs font-bold">Card</span>
                      <span className="text-[10px] text-stone-400">Visa / Mastercard</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        paymentMethod === 'cash'
                          ? 'bg-[#c95d2c]/20 border-[#c95d2c] text-white'
                          : 'bg-black/20 border-white/5 text-stone-300 hover:border-white/20'
                      }`}
                    >
                      <Wallet className="w-5 h-5 mb-1 text-[#f5c69b]" />
                      <span className="text-xs font-bold">Counter</span>
                      <span className="text-[10px] text-stone-400">Pay at cashier</span>
                    </button>
                  </div>
                </div>

                {/* 5. Order Summary Card */}
                <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-400">
                    <span>Subtotal ({cart.length} items)</span>
                    <span className="font-mono text-white">Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Service &amp; Packaging Fee (5%)</span>
                    <span className="font-mono text-white">Rp {serviceFee.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm text-white">
                    <span>Total Payment</span>
                    <span className="font-mono text-base text-[#f5c69b]">
                      Rp {totalAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl bg-[#c95d2c] hover:bg-[#b24f22] text-white font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#c95d2c]/30 transition-all active:scale-[0.99]"
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                  <span>{isProcessing ? 'Confirming Order...' : 'Confirm & Place Order'}</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
