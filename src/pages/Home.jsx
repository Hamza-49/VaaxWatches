import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/home/HeroSection';
import FeaturedGrid from '@/components/home/FeaturedGrid';
import PhilosophySection from '@/components/home/PhilosophySection';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('watches')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setWatches(data || []);
      } catch (error) {
        console.error('Error loading home watches:', error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const featuredWatches = watches.filter(w => w.is_featured);
  const featuredWatch = featuredWatches[0] || watches[0];

  if (loading) {
    return (
      <div className="h-screen bg-void flex items-center justify-center">
        <div className="w-5 h-5 border border-text-secondary/30 border-t-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-void">
      <HeroSection featuredWatch={featuredWatch} />
      <FeaturedGrid watches={featuredWatches.length > 0 ? featuredWatches : watches} />
      <PhilosophySection />
    </div>
  );
}
