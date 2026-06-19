import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-stroke bg-void">
      <div className="px-[8vw] py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-display text-2xl tracking-[0.2em] text-text-primary mb-4">VAAX</p>
            <p className="text-xs text-text-secondary leading-relaxed max-w-[240px]">
              Void Luxury. Timepieces that emerge from the infinite, crafted for those who understand that time is not measured — it is experienced.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-text-secondary mb-6">Navigate</p>
            <div className="space-y-3">
              <Link to="/shop" className="block text-sm text-text-secondary hover:text-text-primary transition-colors duration-500">Collection</Link>
              <Link to="/wishlist" className="block text-sm text-text-secondary hover:text-text-primary transition-colors duration-500">Wishlist</Link>
              <Link to="/account" className="block text-sm text-text-secondary hover:text-text-primary transition-colors duration-500">Account</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-text-secondary mb-6">Services</p>
            <div className="space-y-3">
              <p className="text-sm text-text-secondary">Concierge</p>
              <p className="text-sm text-text-secondary">Warranty</p>
              <p className="text-sm text-text-secondary">Servicing</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-text-secondary mb-6">Contact</p>
            <div className="space-y-3">
              <p className="text-sm text-text-secondary">concierge@vaax.com</p>
              <p className="text-sm text-text-secondary">+41 22 000 0000</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-stroke flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary/60">© 2025 VAAX Watches. All rights reserved.</p>
          <p className="text-xs text-text-secondary/40 tracking-[0.1em]">Swiss Made</p>
        </div>
      </div>
    </footer>
  );
}