import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/AuthContext';
import { useCart } from '@/lib/cartContext';

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('wishlist_items')
          .select(`
            id,
            watch_id,
            watches (*)
          `)
          .eq('user_id', user.id);

        if (error) throw error;
        setItems(data || []);
      } catch (error) {
        console.error('Error loading wishlist:', error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const handleRemove = async (itemId) => {
    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      setItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item:', error.message);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-void flex items-center justify-center">
        <div className="w-5 h-5 border border-text-secondary/30 border-t-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-void min-h-screen pt-32 pb-20 px-[8vw]">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-4xl sm:text-5xl tracking-[-0.02em] text-text-primary mb-4"
      >
        Private Collection
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-sm text-text-secondary mb-16"
      >
        {items.length} saved timepiece{items.length !== 1 ? 's' : ''}
      </motion.p>

      {items.length === 0 ? (
        <div className="text-center py-32">
          <Heart size={28} className="mx-auto mb-4 text-text-secondary/30" strokeWidth={1} />
          <p className="text-text-secondary text-sm mb-4">Your private collection is empty</p>
          <Link
            to="/shop"
            className="text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-gold transition-colors duration-500"
          >
            Explore Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stroke">
          {items.map((item, i) => {
            const watch = item.watches;
            if (!watch) return null;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="bg-void p-8 md:p-10 relative group"
              >
                <Link to={`/watch/${watch.id}`} className="block">
                  <div className="aspect-square flex items-center justify-center mb-6">
                    <img
                      src={watch.image_url}
                      alt={watch.name}
                      className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform duration-700"
                      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                  </div>

                  <p className="font-display text-lg tracking-wide">{watch.name}</p>
                  <p className="text-xs text-text-secondary mt-1">
                    {watch.case_material} · {watch.movement}
                  </p>

                  <p className="text-sm text-gold mt-3">
                    ${watch.price?.toLocaleString()}
                  </p>
                </Link>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => addToCart(watch.id)}
                    className="flex-1 h-10 border border-stroke text-text-secondary text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-gold hover:text-void hover:border-gold transition-all duration-500"
                  >
                    <ShoppingBag size={12} />
                    Acquire
                  </button>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="w-10 h-10 border border-stroke flex items-center justify-center text-gold hover:bg-gold hover:text-void transition-all duration-500"
                  >
                    <Heart size={14} fill="currentColor" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
