import React, { useEffect, useState } from 'react';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase';
import { X, Minus, Plus, ArrowRight, ArrowLeft, User, MapPin, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";

export default function CartDrawer() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const {
    isCartOpen, setIsCartOpen, cartItems, watches, loading,
    loadCart, removeFromCart, updateQuantity, totalPrice, clearCart
  } = useCart();

  const [step, setStep] = useState('cart');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    phone_number: '',
    whatsapp_number: ''
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isCartOpen) loadCart();
  }, [isCartOpen, loadCart]);

  useEffect(() => {
    if (!isCartOpen) {
      setStep('cart');
      setFormData({
        first_name: '',
        last_name: '',
        address: '',
        phone_number: '',
        whatsapp_number: ''
      });
      setFormErrors({});
    }
  }, [isCartOpen]);

  const validateForm = () => {
    const errors = {};
    if (!formData.first_name.trim()) errors.first_name = 'First name is required';
    if (!formData.last_name.trim()) errors.last_name = 'Last name is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.phone_number.trim()) errors.phone_number = 'Phone number is required';
    else if (!/^[\d\s\-+()]+$/.test(formData.phone_number)) errors.phone_number = 'Invalid phone format';
    if (formData.whatsapp_number && !/^[\d\s\-+()]+$/.test(formData.whatsapp_number)) {
      errors.whatsapp_number = 'Invalid phone format';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;

    if (!isAuthenticated || !user) {
      setIsCartOpen(false);
      navigate('/login');
      return;
    }

    setStep('checkout');
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setSubmitting(true);

    const orderItems = cartItems.map(item => {
      const watch = watches[item.watch_id];
      return {
        watch_id: item.watch_id,
        watch_name: watch?.name || 'Unknown',
        price: watch?.price || 0,
        price_at_time: watch?.price || 0,
        quantity: item.quantity,
        image_url: watch?.image_url || ''
      };
    });

    try {
      const { error } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          items: orderItems,
          total: totalPrice,
          status: 'processing',
          payment_method: 'cash_on_delivery',
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          address: formData.address.trim(),
          phone_number: formData.phone_number.trim(),
          whatsapp_number: formData.whatsapp_number.trim() || formData.phone_number.trim()
        }]);

      if (error) throw error;

      await clearCart();
      setIsCartOpen(false);
      toast({
        title: "Order placed successfully",
        description: "We will contact you shortly to confirm your order.",
      });
    } catch (error) {
      console.error("Error placing order:", error.message);
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description: error.message || "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full bg-void border ${formErrors[field] ? 'border-red-500' : 'border-stroke'} px-4 py-3 text-sm text-text-primary placeholder-text-secondary/50 focus:border-gold focus:outline-none transition-colors duration-500`;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] z-50 bg-surface border-l border-stroke flex flex-col"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-stroke">
              <div className="flex items-center gap-4">
                {step === 'checkout' && (
                  <button
                    onClick={() => setStep('cart')}
                    className="text-text-secondary hover:text-text-primary transition-colors duration-500"
                  >
                    <ArrowLeft size={18} strokeWidth={1.5} />
                  </button>
                )}
                <h2 className="font-display text-xl tracking-[0.15em]">
                  {step === 'cart' ? 'Your Selection' : 'Checkout'}
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-text-secondary hover:text-text-primary transition-colors duration-500"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {step === 'cart' ? (
                <div className="px-8 py-6">
                  {loading ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="w-5 h-5 border border-text-secondary border-t-gold animate-spin" />
                    </div>
                  ) : cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
                      <p className="text-text-secondary text-sm tracking-wide">Your collection is empty</p>
                      <Link
                        to="/shop"
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-gold transition-colors duration-500"
                      >
                        Explore Collection
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cartItems.map(item => {
                        const watch = watches[item.watch_id];
                        if (!watch) return null;
                        return (
                          <div key={item.id} className="flex gap-5 group">
                            <div className="w-20 h-20 bg-void flex-shrink-0 flex items-center justify-center overflow-hidden">
                              <img src={watch.image_url} alt={watch.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-body tracking-wide text-text-primary truncate">{watch.name}</p>
                              <p className="text-xs text-text-secondary mt-0.5">{watch.series} Series</p>
                              <p className="text-sm text-gold mt-2 font-body">${watch.price?.toLocaleString()}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 border border-stroke flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-500"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="text-xs text-text-primary w-4 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 border border-stroke flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-500"
                                >
                                  <Plus size={12} />
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-auto text-text-secondary hover:text-text-primary transition-colors duration-500"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div className="px-8 py-6 space-y-6">
                  <div className="p-4 bg-void/50 border border-stroke">
                    <p className="text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">Payment Method</p>
                    <p className="text-sm text-text-primary">Cash on Delivery</p>
                    <p className="text-xs text-text-secondary mt-1">Pay when you receive your order</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <User size={14} />
                      <p className="text-xs tracking-[0.2em] uppercase">Personal Information</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block">First Name *</label>
                        <input
                          className={inputClass('first_name')}
                          placeholder="John"
                          value={formData.first_name}
                          onChange={(e) => handleInputChange('first_name', e.target.value)}
                        />
                        {formErrors.first_name && <p className="text-xs text-red-500 mt-1">{formErrors.first_name}</p>}
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block">Last Name *</label>
                        <input
                          className={inputClass('last_name')}
                          placeholder="Doe"
                          value={formData.last_name}
                          onChange={(e) => handleInputChange('last_name', e.target.value)}
                        />
                        {formErrors.last_name && <p className="text-xs text-red-500 mt-1">{formErrors.last_name}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block flex items-center gap-2">
                        <MapPin size={10} />
                        Delivery Address *
                      </label>
                      <textarea
                        className={`${inputClass('address')} resize-none h-24`}
                        placeholder="Full address including city and postal code"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                      {formErrors.address && <p className="text-xs text-red-500 mt-1">{formErrors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block flex items-center gap-2">
                          <Phone size={10} />
                          Phone Number *
                        </label>
                        <input
                          className={inputClass('phone_number')}
                          placeholder="+1 234 567 8900"
                          value={formData.phone_number}
                          onChange={(e) => handleInputChange('phone_number', e.target.value)}
                        />
                        {formErrors.phone_number && <p className="text-xs text-red-500 mt-1">{formErrors.phone_number}</p>}
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block flex items-center gap-2">
                          <MessageCircle size={10} />
                          WhatsApp Number
                        </label>
                        <input
                          className={inputClass('whatsapp_number')}
                          placeholder="+1 234 567 8900"
                          value={formData.whatsapp_number}
                          onChange={(e) => handleInputChange('whatsapp_number', e.target.value)}
                        />
                        {formErrors.whatsapp_number && <p className="text-xs text-red-500 mt-1">{formErrors.whatsapp_number}</p>}
                        <p className="text-[10px] text-text-secondary/60 mt-1">Optional - for order updates</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-void/50 border border-stroke">
                    <p className="text-xs tracking-[0.2em] uppercase text-text-secondary mb-3">Order Summary</p>
                    {cartItems.map(item => {
                      const watch = watches[item.watch_id];
                      if (!watch) return null;
                      return (
                        <div key={item.id} className="flex justify-between text-xs text-text-secondary mb-2">
                          <span>{watch.name} x{item.quantity}</span>
                          <span>${(watch.price * item.quantity).toLocaleString()}</span>
                        </div>
                      );
                    })}
                    <div className="border-t border-stroke mt-3 pt-3 flex justify-between">
                      <span className="text-xs tracking-[0.2em] uppercase text-text-secondary">Total</span>
                      <span className="text-base font-display text-gold">${totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="px-8 py-6 border-t border-stroke">
                {step === 'cart' ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs tracking-[0.2em] uppercase text-text-secondary">Total</span>
                      <span className="text-lg font-display text-gold">${totalPrice.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={handleProceedToCheckout}
                      disabled={cartItems.length === 0}
                      className="w-full h-12 border border-stroke text-text-primary text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-gold hover:text-void hover:border-gold transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Proceed to Checkout
                      <ArrowRight size={14} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={submitting}
                    className="w-full h-12 border border-stroke text-text-primary text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-gold hover:text-void hover:border-gold transition-all duration-500 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border border-text-secondary/30 border-t-gold animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order
                        <ArrowRight size={14} />
                      </>
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
}
