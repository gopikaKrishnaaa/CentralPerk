'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { db, Order } from '@/lib/database';
import { X, Plus, Minus, Trash2, ShoppingBag, MapPin, Phone, CreditCard, CheckCircle2, Truck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartSidebar: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<'cart' | 'checkout' | 'success' | 'tracking'>('cart');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delivery conditions
  const deliveryFee = cartTotal > 500 ? 0 : 40;
  const gst = Math.round(cartTotal * 0.05);
  const total = cartTotal + deliveryFee + gst;

  // Sync active order status if we are on the tracking step
  useEffect(() => {
    if (!activeOrder) return;

    const handleStatusUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.id === activeOrder.id) {
        // Fetch fresh copy from DB
        const updated = db.getOrder(activeOrder.id);
        if (updated) {
          setActiveOrder(updated);
        }
      }
    };

    window.addEventListener('order-status-update', handleStatusUpdate);
    return () => window.removeEventListener('order-status-update', handleStatusUpdate);
  }, [activeOrder]);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || !phone) return;

    setIsSubmitting(true);
    
    // Simulate payment/order generation delay
    setTimeout(() => {
      const dbItems = cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity }));
      const order = db.createOrder(dbItems, total, { address, phone, paymentMethod });
      
      setActiveOrder(order);
      clearCart();
      setIsSubmitting(false);
      setStep('success');
    }, 1500);
  };

  const getStatusStep = (status: Order['status']) => {
    switch (status) {
      case 'Received': return 1;
      case 'Preparing': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      default: return 1;
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-charcoal-black/70 backdrop-blur-sm z-50"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-charcoal-black border-l border-cream-white/5 shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-cream-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-central-orange" />
                <h2 className="font-serif text-lg font-bold text-cream-white">
                  {step === 'cart' && 'Your Order'}
                  {step === 'checkout' && 'Checkout Details'}
                  {step === 'success' && 'Order Confirmed'}
                  {step === 'tracking' && 'Track Order'}
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  // Reset steps on close
                  setTimeout(() => setStep('cart'), 300);
                }}
                className="p-1.5 rounded-lg bg-coffee-brown/30 hover:bg-coffee-brown/60 text-cream-white/70 hover:text-cream-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* STEP 1: CART VIEW */}
              {step === 'cart' && (
                <>
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                      <div className="p-4 rounded-full bg-coffee-brown/20 text-cream-white/30 border border-cream-white/5">
                        <ShoppingBag className="w-12 h-12" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-medium text-cream-white">Your Cart is Empty</h3>
                        <p className="text-sm text-cream-white/50 mt-1">Add some signature items from our menu to get started!</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-coffee-brown/10 border border-cream-white/5">
                          <div className="flex-1">
                            <h4 className="font-serif text-sm font-semibold text-cream-white">{item.name}</h4>
                            <p className="text-xs text-central-orange mt-1">₹{item.price}</p>
                            
                            {/* Quantity Editors */}
                            <div className="flex items-center gap-3 mt-3">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded-md bg-coffee-brown/50 hover:bg-coffee-brown text-cream-white transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-sans text-xs font-semibold text-cream-white w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-md bg-coffee-brown/50 hover:bg-coffee-brown text-cream-white transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between items-end">
                            <span className="font-sans text-sm font-medium text-cream-white">₹{item.price * item.quantity}</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-cream-white/40 hover:text-red-400 transition-colors p-1"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* STEP 2: CHECKOUT FORM */}
              {step === 'checkout' && (
                <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-cream-white/60 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Monica Geller"
                      className="px-4 py-3 rounded-xl bg-coffee-brown/20 border border-cream-white/10 text-sm focus:border-central-orange outline-none transition-colors text-cream-white placeholder:text-cream-white/20"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-cream-white/60 uppercase tracking-wider">Delivery Address</label>
                    <textarea
                      required
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street name, landmark, building detail..."
                      className="px-4 py-3 rounded-xl bg-coffee-brown/20 border border-cream-white/10 text-sm focus:border-central-orange outline-none transition-colors text-cream-white placeholder:text-cream-white/20 resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-cream-white/60 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="px-4 py-3 rounded-xl bg-coffee-brown/20 border border-cream-white/10 text-sm focus:border-central-orange outline-none transition-colors text-cream-white placeholder:text-cream-white/20"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-cream-white/60 uppercase tracking-wider">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Cash on Delivery', 'UPI / Card'].map((method) => {
                        const isSelected = paymentMethod === method;
                        return (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            className={`px-4 py-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                              isSelected
                                ? 'bg-central-orange/10 border-central-orange text-central-orange'
                                : 'bg-coffee-brown/10 border-cream-white/5 text-cream-white/60 hover:border-cream-white/20'
                            }`}
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            {method}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </form>
              )}

              {/* STEP 3: SUCCESS BLOCK */}
              {step === 'success' && activeOrder && (
                <div className="h-full flex flex-col items-center justify-center text-center gap-6 py-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 animate-pulse">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-cream-white">The One with the Successful Order!</h3>
                    <p className="text-sm text-cream-white/60 mt-2">Your order has been placed. We are preparing it fresh in Monica&apos;s kitchen!</p>
                  </div>
                  <div className="w-full p-4 rounded-xl bg-coffee-brown/20 border border-cream-white/5 text-left flex flex-col gap-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-cream-white/50">Order ID:</span>
                      <span className="font-mono font-bold text-central-orange">{activeOrder.id}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-cream-white/50">Delivery to:</span>
                      <span className="text-cream-white font-medium max-w-[200px] truncate">{activeOrder.address}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-cream-white/50">Total Paid:</span>
                      <span className="text-cream-white font-semibold">₹{activeOrder.total}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep('tracking')}
                    className="w-full py-3.5 rounded-xl bg-central-orange text-charcoal-black font-sans text-sm font-bold shadow-lg shadow-central-orange/15 hover:shadow-central-orange/25 hover:bg-central-orange/90 transition-all flex items-center justify-center gap-2"
                  >
                    <Truck className="w-4 h-4" />
                    Track Live Delivery
                  </button>
                </div>
              )}

              {/* STEP 4: TRACKING TIMELINE */}
              {step === 'tracking' && activeOrder && (
                <div className="flex flex-col gap-8 py-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-coffee-brown/10 border border-cream-white/5">
                    <div>
                      <span className="text-xs text-cream-white/40 block uppercase">Order ID</span>
                      <span className="text-sm font-semibold font-mono text-central-orange">{activeOrder.id}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-cream-white/40 block uppercase">Estimated Delivery</span>
                      <span className="text-sm font-semibold text-cream-white">35 mins</span>
                    </div>
                  </div>

                  {/* Status Steps */}
                  <div className="flex flex-col gap-6 pl-4 relative border-l-2 border-coffee-brown">
                    {[
                      { status: 'Received', label: 'Order Received', desc: 'Monica has accepted your order.', step: 1 },
                      { status: 'Preparing', label: 'Kitchen Prep', desc: 'Fresh ingredients are being combined.', step: 2 },
                      { status: 'Out for Delivery', label: 'Out for Delivery', desc: 'Chandler is speeding over on his scooter!', step: 3 },
                      { status: 'Delivered', label: 'Delivered', desc: 'Enjoy your meal! Ding-dong.', step: 4 }
                    ].map((s) => {
                      const activeStep = getStatusStep(activeOrder.status);
                      const isCompleted = activeStep >= s.step;
                      const isCurrent = activeStep === s.step;

                      return (
                        <div key={s.status} className="relative flex flex-col gap-1 pl-6">
                          {/* Indicator Circle */}
                          <div className={`absolute left-[-27px] top-1 w-[12px] h-[12px] rounded-full border-2 transition-all ${
                            isCompleted 
                              ? 'bg-central-orange border-central-orange scale-125 shadow-lg shadow-central-orange/50' 
                              : 'bg-charcoal-black border-coffee-brown'
                          }`} />
                          
                          <h4 className={`text-sm font-bold font-serif ${isCompleted ? 'text-cream-white' : 'text-cream-white/40'} ${isCurrent && 'text-central-orange font-semibold'}`}>
                            {s.label}
                            {isCurrent && s.status !== 'Delivered' && (
                              <Loader2 className="w-3.5 h-3.5 inline ml-2 animate-spin text-central-orange" />
                            )}
                          </h4>
                          <p className={`text-xs ${isCompleted ? 'text-cream-white/60' : 'text-cream-white/20'}`}>
                            {s.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-monica-purple/5 border border-monica-purple/10 text-center">
                    <p className="text-xs text-cream-white/70 italic">
                      💡 Tip: Every order boosts your loyalty status! Keep an eye on your perks dashboard.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Panel */}
            {cart.length > 0 && (step === 'cart' || step === 'checkout') && (
              <div className="p-6 border-t border-cream-white/5 bg-coffee-brown/5 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm text-cream-white/60">
                    <span>Subtotal:</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-cream-white/60">
                    <span>GST (5%):</span>
                    <span>₹{gst}</span>
                  </div>
                  <div className="flex justify-between text-sm text-cream-white/60">
                    <span>Delivery Fee:</span>
                    <span>{deliveryFee === 0 ? <span className="text-green-400">FREE</span> : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-cream-white border-t border-cream-white/5 pt-2 mt-1">
                    <span>Grand Total:</span>
                    <span className="text-central-orange">₹{total}</span>
                  </div>
                </div>

                {step === 'cart' ? (
                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full py-3.5 rounded-xl bg-central-orange text-charcoal-black font-sans text-sm font-bold shadow-lg shadow-central-orange/15 hover:shadow-central-orange/25 hover:bg-central-orange/90 transition-all flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <button
                    onClick={handleCheckoutSubmit}
                    disabled={isSubmitting || !name || !address || !phone}
                    className="w-full py-3.5 rounded-xl bg-central-orange text-charcoal-black font-sans text-sm font-bold shadow-lg shadow-central-orange/15 hover:shadow-central-orange/25 hover:bg-central-orange/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      'Confirm & Place Order'
                    )}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default CartSidebar;
