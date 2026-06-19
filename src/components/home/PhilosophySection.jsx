import React from 'react';
import { motion } from 'framer-motion';

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="px-[8vw] py-32 bg-void relative">
      {/* Temporal marker */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-stroke" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-text-secondary mb-12">Philosophy</p>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-[-0.01em] text-text-primary mb-8">
            In the void between seconds,
            <br />
            <span className="italic font-light text-text-secondary">precision becomes poetry</span>
          </h2>

          <p className="text-sm text-text-secondary leading-relaxed max-w-xl mx-auto">
            Every VAAX timepiece is born from the silence of absolute precision.
            We strip away the unnecessary, the decorative, the expected — until only
            the essential remains. A mechanical heart, suspended in darkness,
            measuring the immeasurable.
          </p>
        </motion.div>
      </div>
    </section>
  );
}