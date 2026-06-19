import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroSection({ featuredWatch }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-void">
      {/* Subtle vertical temporal markers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[25%] top-0 bottom-0 w-px bg-stroke" />
        <div className="absolute left-[75%] top-0 bottom-0 w-px bg-stroke" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-[8vw] max-w-5xl mx-auto">
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs tracking-[0.4em] uppercase text-text-secondary mb-8"
        >
          Swiss Precision · Void Luxury
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[110px] tracking-[-0.02em] leading-[0.9] text-text-primary"
        >
          Time
          <br />
          <span className="italic font-light">Reimagined</span>
        </motion.h1>

        {/* Watch Image */}
        {featuredWatch && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={loaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="my-12 flex justify-center"
          >
            <img
              src={featuredWatch.image_url}
              alt={featuredWatch.name}
              className="w-64 h-64 sm:w-80 sm:h-80 object-contain"
            />
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/shop"
            className="group inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-gold transition-colors duration-500"
          >
            <span className="w-8 h-px bg-text-secondary group-hover:w-12 group-hover:bg-gold transition-all duration-500" />
            Enter Collection
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-500" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-8 bg-text-secondary/30 relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-x-0 h-1/2 bg-text-secondary"
          />
        </div>
      </motion.div>
    </section>
  );
}