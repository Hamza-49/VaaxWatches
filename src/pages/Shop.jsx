import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

const FILTERS = {
  material: ['All', 'Titanium', 'Stainless Steel', 'Ceramic', 'Carbon Fiber', 'Rose Gold'],
  movement: ['All', 'Automatic', 'Manual', 'Quartz', 'Tourbillon'],
  series: ['All', 'Void', 'Horizon', 'Apex', 'Eclipse', 'Genesis']
};

export default function Shop() {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [material, setMaterial] = useState('All');
  const [movement, setMovement] = useState('All');
  const [series, setSeries] = useState('All');
  const [activeFilter, setActiveFilter] = useState(null);

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
        console.error('Error loading watches:', error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredWatches = watches.filter(watch => {
    if (material !== 'All' && watch.case_material !== material) return false;
    if (movement !== 'All' && watch.movement !== movement) return false;
    if (series !== 'All' && watch.series !== series) return false;
    return true;
  });

  return (
    <div className="bg-void min-h-screen pt-32 pb-20">
      {/* Header */}
      <div className="px-[8vw] mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl tracking-[-0.02em] text-text-primary"
        >
          Collection
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm text-text-secondary mt-4"
        >
          {filteredWatches.length} timepiece{filteredWatches.length !== 1 ? 's' : ''}
        </motion.p>
      </div>

      {/* Filter Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-surface/90 backdrop-blur-xl border border-stroke px-2 py-2 flex items-center gap-1">
          {['material', 'movement', 'series'].map(filter => {
            const isOpen = activeFilter === filter;
            const currentValue = filter === 'material' ? material : filter === 'movement' ? movement : series;

            return (
              <div key={filter} className="relative">
                <button
                  onClick={() => setActiveFilter(isOpen ? null : filter)}
                  className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                    currentValue !== 'All' ? 'text-gold' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {filter}
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-surface border border-stroke p-3 min-w-[160px]"
                  >
                    {FILTERS[filter].map(option => {
                      const isSelected = (filter === 'material' ? material : filter === 'movement' ? movement : series) === option;
                      return (
                        <button
                          key={option}
                          onClick={() => {
                            if (filter === 'material') setMaterial(option);
                            else if (filter === 'movement') setMovement(option);
                            else setSeries(option);
                            setActiveFilter(null);
                          }}
                          className={`block w-full text-left px-3 py-2 text-xs transition-colors duration-300 ${
                            isSelected ? 'text-gold' : 'text-text-secondary hover:text-text-primary'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="px-[8vw]">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-5 h-5 border border-text-secondary/30 border-t-gold animate-spin" />
          </div>
        ) : filteredWatches.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-text-secondary text-sm">No timepieces match your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stroke">
            {filteredWatches.map((watch, i) => (
              <motion.div
                key={watch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={`/watch/${watch.id}`}
                  className="group block bg-void p-8 md:p-10 relative"
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-text-secondary">{watch.series}</p>
                    {watch.is_new && (
                      <span className="text-[9px] tracking-[0.2em] uppercase text-gold">New</span>
                    )}
                  </div>

                  <div className="aspect-square flex items-center justify-center mb-6">
                    <img
                      src={watch.image_url}
                      alt={watch.name}
                      className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform duration-700"
                      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                  </div>

                  <div>
                    <p className="font-display text-lg tracking-wide">{watch.name}</p>
                    <p className="text-xs text-text-secondary mt-1">
                      {watch.case_material} · {watch.movement}
                    </p>
                  </div>

                  <div className="mt-3 overflow-hidden h-5">
                    <p
                      className="text-sm text-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                    >
                      ${watch.price?.toLocaleString()}
                    </p>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
