'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { db } from '@/lib/database';
import { ShoppingBag, Menu, X, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';



export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(150);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for header background opacity transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync loyalty points reactively
  useEffect(() => {
    setLoyaltyPoints(db.getLoyaltyProfile().points);

    const handleLoyaltyUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setLoyaltyPoints(customEvent.detail.points);
      }
    };

    window.addEventListener('loyalty-update', handleLoyaltyUpdate);
    return () => window.removeEventListener('loyalty-update', handleLoyaltyUpdate);
  }, []);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Reservations', href: '/reservations' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled 
            ? 'py-4 bg-charcoal-black/90 backdrop-blur-md border-b border-cream-white/5 shadow-lg' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
  <img
    src="/images/logo.png"
    alt="Central Perk Logo"
    className="h-16 w-16 object-contain"
  />
  <span className="font-serif text-base md:text-lg font-bold tracking-wide text-cream-white group-hover:text-central-orange transition-colors duration-300">
    Central <span className="text-central-orange">Perk</span>
    <span className="text-[10px] font-sans tracking-widest block font-light text-cream-white/50 -mt-1 uppercase">Chennai</span>
  </span>
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-sans text-sm tracking-wider uppercase font-medium transition-colors duration-300 ${
                    isActive ? 'text-central-orange' : 'text-cream-white/70 hover:text-cream-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLink"
                      className="absolute left-0 right-0 bottom-[-6px] h-[2px] bg-central-orange rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Loyalty Perks Widget */}
            <Link 
              href="/loyalty"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-monica-purple/10 border border-monica-purple/30 hover:bg-monica-purple/20 transition-all duration-300 text-xs font-medium text-cream-white"
              title="View Loyalty Dashboard"
            >
              <Award className="w-4 h-4 text-monica-purple animate-pulse" />
              <span>{loyaltyPoints} Perks</span>
            </Link>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-coffee-brown/40 border border-cream-white/5 hover:border-central-orange/50 hover:bg-coffee-brown/70 text-cream-white transition-all duration-300"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-central-orange text-charcoal-black font-sans text-xs font-bold rounded-full border-2 border-charcoal-black animate-scaleIn">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-coffee-brown/40 border border-cream-white/5 hover:border-central-orange/30 text-cream-white md:hidden transition-all duration-300"
              aria-label="Toggle Mobile Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden border-b border-cream-white/5 bg-charcoal-black/95 backdrop-blur-lg overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`font-sans text-base tracking-wider uppercase font-medium transition-colors py-2 block ${
                        isActive ? 'text-central-orange' : 'text-cream-white/70 hover:text-cream-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-cream-white/5 flex items-center justify-between">
                  <Link
                    href="/loyalty"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-monica-purple/20 border border-monica-purple/30 text-sm font-medium"
                  >
                    <Award className="w-4 h-4 text-monica-purple" />
                    <span>Loyalty: {loyaltyPoints} Points</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer to push content below the navbar when not on the absolute Hero section page */}
      {pathname !== '/' && <div className="h-[88px]" />}
    </>
  );
};
export default Navbar;
