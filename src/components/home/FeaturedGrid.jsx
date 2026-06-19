import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FeaturedGrid({ watches }) {
  if (!watches || watches.length === 0) return null;

  return (
    <section className="px-[8vw] py-32 bg-void">
      {/* Section header */}
      <div className="flex items-center gap-6 mb-20">
        <div className="w-12 h-px bg-gold" />
        <p className="text-xs tracking-[0.3em] uppercase text-text-secondary">Featured Timepieces</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stroke">
        {watches.slice(0, 6).map((watch, i) => (
          <motion.div
            key={watch.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to={`/watch/${watch.id}`}
              className="group block bg-void p-8 md:p-12 relative overflow-hidden"
            >
              {/* Label */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-[10px] tracking-[0.2em] uppercase text-text-secondary">{watch.series}</p>
                {watch.is_new && (
                  <span className="text-[9px] tracking-[0.2em] uppercase text-gold">New</span>
                )}
              </div>

              {/* Image */}
              <div className="aspect-square flex items-center justify-center mb-8">
                <img
                  src={watch.image_url}
                  alt={watch.name}
                  className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform duration-700"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
              </div>

              {/* Info */}
              <div>
                <p className="font-display text-lg tracking-wide text-text-primary">{watch.name}</p>
                <p className="text-xs text-text-secondary mt-1">{watch.case_material} · {watch.movement}</p>
              </div>

              {/* Price — only on hover */}
              <div className="mt-4 overflow-hidden h-5">
                <p className="text-sm text-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                   style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  ${watch.price?.toLocaleString()}
                </p>
              </div>

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                   style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}