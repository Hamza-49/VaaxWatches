import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabase';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [watches, setWatches] = useState({});
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const watch = watches[item.watch_id];
    return sum + (watch?.price || 0) * item.quantity;
  }, 0);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart();
    }
  }, [isAuthenticated, user]);

  const loadCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Load cart items
      const { data: items, error: itemsError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (itemsError) throw itemsError;
      setCartItems(items || []);

      // Load watch details for cart items
      if (items && items.length > 0) {
        const watchIds = [...new Set(items.map(item => item.watch_id))];
        const { data: watchData, error: watchError } = await supabase
          .from('watches')
          .select('*')
          .in('id', watchIds);

        if (watchError) throw watchError;
        const watchMap = {};
        watchData?.forEach(watch => {
          watchMap[watch.id] = watch;
        });
        setWatches(watchMap);
      }
    } catch (error) {
      console.error('Error loading cart:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (watchId, quantity = 1) => {
    if (!user) return;

    try {
      // Check if item already exists
      const existingItem = cartItems.find(item => item.watch_id === watchId);

      if (existingItem) {
        await updateQuantity(existingItem.id, existingItem.quantity + quantity);
      } else {
        const { data, error } = await supabase
          .from('cart_items')
          .insert([{
            user_id: user.id,
            watch_id: watchId,
            quantity
          }])
          .select()
          .single();

        if (error) throw error;

        // Load watch data if not already loaded
        if (!watches[watchId]) {
          const { data: watch, error: watchError } = await supabase
            .from('watches')
            .select('*')
            .eq('id', watchId)
            .single();

          if (!watchError && watch) {
            setWatches(prev => ({ ...prev, [watchId]: watch }));
          }
        }

        setCartItems(prev => [...prev, data]);
      }
    } catch (error) {
      console.error('Error adding to cart:', error.message);
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing from cart:', error.message);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(itemId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId);

      if (error) throw error;
      setCartItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error.message);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error.message);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      watches,
      loading,
      totalItems,
      totalPrice,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      loadCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
