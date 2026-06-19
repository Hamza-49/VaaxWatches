import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu, X, Sun, Moon } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { useTheme } from '@/lib/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';

const navLinks = [
  { label: 'Collection', path: '/shop' },
  { label: 'About', path: '/#philosophy' },
];

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isDark = theme === 'dark';

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          backgroundColor: scrolled
            ? isDark ? 'rgba(5,5,5,0.9)' : 'rgba(250,250,250,0.9)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)'
            : '1px solid transparent',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="mx-auto px-[8vw] h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-2xl tracking-[0.2em] text-text-primary hover:text-gold transition-colors duration-500"
          >
            VAAX
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-500"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-text-secondary hover:text-gold transition-colors duration-500"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            </button>

            <Link
              to="/wishlist"
              className="text-text-secondary hover:text-text-primary transition-colors duration-500"
            >
              <Heart size={18} strokeWidth={1.5} />
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-text-secondary hover:text-text-primary transition-colors duration-500"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-void text-[9px] font-body font-semibold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <Link
              to={user ? '/account' : '/login'}
              className="text-text-secondary hover:text-text-primary transition-colors duration-500"
            >
              <User size={18} strokeWidth={1.5} />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-text-secondary hover:text-text-primary transition-colors duration-500"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-12"
            style={{
              backgroundColor: isDark ? '#050505' : '#FAFAFA',
            }}
          >
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="font-display text-3xl tracking-[0.15em] text-text-secondary hover:text-text-primary transition-colors duration-500"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/wishlist"
              className="font-display text-3xl tracking-[0.15em] text-text-secondary hover:text-text-primary transition-colors duration-500"
            >
              Wishlist
            </Link>
            <Link
              to={user ? '/account' : '/login'}
              className="font-display text-3xl tracking-[0.15em] text-text-secondary hover:text-text-primary transition-colors duration-500"
            >
              {user ? 'Account' : 'Login'}
            </Link>

            {/* Theme toggle in mobile menu */}
            <button
              onClick={toggleTheme}
              className="mt-8 flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-gold transition-colors duration-500"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
