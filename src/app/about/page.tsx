'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Heart, Users, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="brick-wall-bg min-h-screen py-16 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        
        {/* Section 1: Hero Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold text-central-orange uppercase tracking-widest"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-cream-white"
          >
            The One with Our Beginning
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-[2px] bg-central-orange mx-auto my-2"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm text-cream-white/70 leading-relaxed font-sans"
          >
            Welcome to Central Perk Chennai, a premium dining experience bringing the warmth, humor, and connection of New York coffeehouses to the heart of South India.
          </motion.p>
        </div>

        {/* Section 2: Story & Brand Mission split columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
         <motion.div
  initial={{ opacity: 0, x: -25 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="relative h-[480px] rounded-2xl overflow-hidden border border-cream-white/5 shadow-2xl"
>
  <img
    src="/images/hero.gif"
    alt="Central Perk Lounge"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black/80 via-transparent to-transparent" />
</motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-cream-white">
              Bringing Manhattan Cozy to Chennai Coastal
            </h2>
            <p className="text-sm text-cream-white/70 leading-relaxed font-sans">
              Founded in 2024, Central Perk Chennai is the result of a simple dream: to create an upscale café experience that respects original sitcom details while executing a professional-grade American comfort menu.
            </p>
            <p className="text-sm text-cream-white/70 leading-relaxed font-sans">
              From signature burgers and loaded truffle fries to handcrafted artisan espressos and premium NYC cheesecakes, every detail is engineered for fans, food connoisseurs, and groups looking to make lifelong memories.
            </p>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-coffee-brown/15 border border-cream-white/5">
                <Coffee className="w-5 h-5 text-central-orange shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-cream-white">Artisan Coffee Selection</h4>
                  <p className="text-xs text-cream-white/60 mt-1">We source 100% Arabica beans roasted locally and brewed using state-of-the-art espresso machines.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-coffee-brown/15 border border-cream-white/5">
                <Heart className="w-5 h-5 text-monica-purple shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-cream-white">Warm SITCOM Nostalgia</h4>
                  <p className="text-xs text-cream-white/60 mt-1">A curated environment showing subtle details, brickwork, cozy couches, and friendly service.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section 3: Atmosphere details */}
        <div className="glass-panel p-8 md:p-12 rounded-2xl border border-cream-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-monica-purple/5 rounded-full blur-[80px]" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-central-orange/10 border border-central-orange/20 text-central-orange">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-cream-white">Community First</h3>
              <p className="text-xs text-cream-white/60 leading-relaxed font-sans px-4">
                We believe dining is about shared stories. We built Central Perk to serve as a meeting point for friends.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 border-y md:border-y-0 md:border-x border-cream-white/5 py-8 md:py-0">
              <div className="p-3 rounded-full bg-monica-purple/10 border border-monica-purple/20 text-monica-purple">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-cream-white">Monica&apos;s Standard</h3>
              <p className="text-xs text-cream-white/60 leading-relaxed font-sans px-4">
                Kitchen cleanliness, ingredient selection, and plating precision are maintained at the highest luxury standards.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-cream-white">Gunther&apos;s Welcome</h3>
              <p className="text-xs text-cream-white/60 leading-relaxed font-sans px-4">
                Warm greetings, cozy velvet seating, and smooth ambient music make you feel comfortable the moment you arrive.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Founder Note */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center bg-coffee-brown/10 p-8 md:p-12 rounded-2xl border border-cream-white/5">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="text-xs font-semibold text-luxury-gold uppercase tracking-widest">A Note from the Founder</span>
            <h3 className="font-serif text-2xl font-bold text-cream-white">
              &quot;The One where We Serve with Pride&quot;
            </h3>
            <p className="text-xs md:text-sm text-cream-white/70 leading-relaxed font-sans italic">
              &quot;We wanted to build something beyond standard fan merchandise café spaces. Our goal is to make Central Perk Chennai a flagship brand experience where the food is as premium as the design. Every coffee cup, burger bun, and cheesecake recipe is tested endlessly until it meets Monica&apos;s level of absolute culinary perfection. We hope this place becomes your second home.&quot;
            </p>
            <span className="font-serif text-sm font-bold text-cream-white mt-2 block">
              — Chef Ananth Krishnan, Co-Founder
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href="/reservations"
              className="py-4 rounded-xl bg-central-orange text-charcoal-black font-sans text-xs font-bold shadow-lg shadow-central-orange/10 hover:bg-central-orange/95 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              Book Your Table Spot
            </Link>
            <Link
              href="/menu"
              className="py-4 rounded-xl bg-transparent text-cream-white border border-cream-white/10 hover:border-central-orange transition-colors font-sans text-xs font-bold flex items-center justify-center gap-2"
            >
              Browse Menu Catalog
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
