import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/AuthContext';
import { useCart } from '@/lib/cartContext';
import { toast } from '@/components/ui/use-toast';

export default function WatchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('watches')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        setWatch(data);
        setSelectedImage(data.image_url);

        // Check wishlist status
        if (user) {
          const { data: wishlistData, error: wishlistError } = await supabase
            .from('wishlist_items')
            .select('*')
            .eq('watch_id', id)
            .eq('user_id', user.id);

          if (!wishlistError && wishlistData && wishlistData.length > 0) {
            setIsWishlisted(true);
          }
        }
      } catch (error) {
        console.error('Error loading watch:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, user]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to add items to your cart."
      });
      navigate('/login');
      return;
    }

    try {
      setAddingToCart(true);
      await addToCart(watch.id);
      setTimeout(() => setAddingToCart(false), 1000);
    } catch (error) {
      console.error('Error adding to cart:', error.message);
      setAddingToCart(false);
      toast({
        variant: "destructive",
        title: "Cart error",
        description: "Could not add this item to your cart."
      });
    }
  };

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to add items to your wishlist."
      });
      navigate('/login');
      return;
    }

    try {
      if (isWishlisted) {
        await supabase
          .from('wishlist_items')
          .delete()
          .eq('watch_id', id)
          .eq('user_id', user.id);
        setIsWishlisted(false);
      } else {
        await supabase
          .from('wishlist_items')
          .insert([{ watch_id: id, user_id: user.id }]);
        setIsWishlisted(true);
        toast({
          title: "Added to Wishlist",
          description: `${watch.name} has been saved to your wishlist.`
        });
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-void flex items-center justify-center">
        <div className="w-5 h-5 border border-text-secondary/30 border-t-gold animate-spin" />
      </div>
    );
  }

  if (!watch) {
    return (
      <div className="h-screen bg-void flex items-center justify-center flex-col gap-4">
        <p className="text-text-secondary text-sm">Timepiece not found</p>
        <Link
          to="/shop"
          className="text-xs text-text-secondary hover:text-gold transition-colors duration-500 tracking-[0.2em] uppercase"
        >
          Return to Collection
        </Link>
      </div>
    );
  }

  const specs = [
    { label: 'Reference', value: watch.reference_number || '—' },
    { label: 'Case Material', value: watch.case_material },
    { label: 'Movement', value: watch.movement },
    { label: 'Diameter', value: watch.case_diameter || '—' },
    { label: 'Water Resistance', value: watch.water_resistance || '—' },
    { label: 'Power Reserve', value: watch.power_reserve || '—' }
  ];

  const galleryImages = Array.isArray(watch.gallery_urls)
    ? watch.gallery_urls
    : Array.isArray(watch.gallery)
      ? watch.gallery
      : [];

  const allImages = [watch.image_url, ...galleryImages].filter(Boolean);

  return (
    <div className="bg-void min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="px-[8vw] py-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-500"
        >
          <ArrowLeft size={14} />
          Collection
        </Link>
      </div>

      {/* Main Content */}
      <div className="px-[8vw] pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 flex flex-col items-center lg:sticky lg:top-20"
          >
            <div className="w-full max-w-xl aspect-square flex items-center justify-center p-8 mb-6 border border-stroke/50 bg-surface/20">
              <img
                src={selectedImage}
                alt={watch.name}
                className="w-full h-full object-contain"
              />
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-4 w-full overflow-x-auto pb-4 justify-center hide-scrollbar">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 border flex-shrink-0 p-2 transition-all duration-300 ${
                      selectedImage === img
                        ? 'border-gold scale-105'
                        : 'border-stroke opacity-50 hover:opacity-100 hover:border-text-secondary'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${watch.name} view ${i + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 py-8 lg:py-4"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-text-secondary mb-4">
              {watch.series} Series
            </p>

            <h1 className="font-display text-3xl sm:text-4xl tracking-[-0.01em] text-text-primary leading-tight">
              {watch.name}
            </h1>

            {watch.short_description && (
              <p className="text-sm text-text-secondary mt-3 leading-relaxed">
                {watch.short_description}
              </p>
            )}

            <p className="text-2xl font-display text-gold mt-8">
              ${watch.price?.toLocaleString()}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex-1 h-12 border border-stroke text-text-primary text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-gold hover:text-void hover:border-gold transition-all duration-500"
              >
                {addingToCart ? (
                  <>
                    <Check size={14} />
                    Added
                  </>
                ) : (
                  'Acquire'
                )}
              </button>

              <button
                onClick={handleToggleWishlist}
                className={`w-12 h-12 border flex items-center justify-center transition-all duration-500 ${
                  isWishlisted
                    ? 'border-gold text-gold'
                    : 'border-stroke text-text-secondary hover:border-gold hover:text-gold'
                }`}
              >
                <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="h-px bg-stroke my-12" />

            {/* Description */}
            {watch.description && (
              <div className="mb-12">
                <p className="text-xs tracking-[0.2em] uppercase text-text-secondary mb-4">
                  Description
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {watch.description}
                </p>
              </div>
            )}

            {/* Specifications */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-text-secondary mb-6">
                Specifications
              </p>

              <div className="space-y-0">
                {specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-stroke"
                  >
                    <span className="text-xs text-text-secondary">{spec.label}</span>
                    <span className="text-sm text-text-primary">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
