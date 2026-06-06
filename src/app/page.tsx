'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { IMAGES } from '@/lib/images';
import { Award, Star, ArrowRight, ShoppingCart, Users, Heart, Sparkles, Utensils } from 'lucide-react';

const CHARACTER_SPECIALS = [
  {
    id: 'spec-joey',
    name: "Joey's Double Cheeseburger",
    price: 399,
    description: "Double smash beef patty, caramelized onions, melted cheddar cheese, house pickles, served on a buttery toasted brioche bun with secret garlic aioli.",
    image: IMAGES.burger,
    badge: "Joey's Favorite",
    rating: 4.9,
  },
  {
    id: 'spec-monica',
    name: "Monica's Alfredo Pasta",
    price: 349,
    description: "Creamy Parmigiano-Reggiano white sauce cooked with roasted garlic, fresh herbs, tossed in imported Italian fettuccine.",
    image: IMAGES.pasta,
    badge: "Monica's Special",
    rating: 5.0,
  },
  {
    id: 'spec-chandler',
    name: "Chandler's Cold Brew",
    price: 199,
    description: "Slow-steeped craft cold brew using single-origin beans, served over block ice with a signature hint of orange peel zest.",
    image: IMAGES.cold_brew,
    badge: "Chandler's Choice",
    rating: 4.8,
  },
  {
    id: 'spec-rachel',
    name: "Rachel's NYC Cheesecake",
    price: 249,
    description: "Classic dense, velvety cheesecake with a rich buttery graham cracker crust and fresh strawberry compote.",
    image: IMAGES.cheesecake,
    badge: "Rachel's Delight",
    rating: 4.9,
  },
  {
    id: 'spec-ross',
    name: "Ross's Dino Chocolate Shake",
    price: 229,
    description: "Decadent dark chocolate milkshake topped with crushed cookies, whipped cream, and a dinosaur waffle biscuit.",
    image: IMAGES.chocolate_shake,
    badge: "Ross's Dino Special",
    rating: 4.7,
  },
  {
    id: 'spec-phoebe',
    name: "Phoebe's Vegan Bowl",
    price: 219,
    description: "Quinoa, warm sweet potato cubes, avocado slices, fresh baby spinach, organic edamame, and a creamy lemon-tahini dressing.",
    image: IMAGES.vegan_bowl,
    badge: "Phoebe's Vegan",
    rating: 4.8,
  }
];

const TESTIMONIALS = [
  {
    text: "Best American-style café in Chennai. The atmosphere is cozy, coffee is spot-on, and the nostalgia is handled with perfect elegance.",
    author: "Aditya R.",
    role: "Regular Guest",
    rating: 5,
  },
  {
    text: "The details here are incredible. From the brick walls to the couch, it feels straight out of a New York sitcom. Great food, too!",
    author: "Pooja K.",
    role: "Food Blogger",
    rating: 5,
  },
  {
    text: "Monica's Alfredo Pasta is actually chef-level. Incredible quality and wonderful warm hospitality. Definitely coming back.",
    author: "Rohan S.",
    role: "Chennai Foodie",
    rating: 5,
  }
];

export default function Home() {
  const { addToCart } = useCart();
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen brick-wall-bg">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <video
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-full object-cover object-center scale-105 select-none"
>
  <source src="/images/hero.webm" type="video/webm" />
  <source src="/images/hero.gif" type="image/gif" />
</video>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-black/60 via-charcoal-black/85 to-charcoal-black z-10" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-20 flex flex-col items-center gap-6 mt-10 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-central-orange/10 border border-central-orange/30 text-central-orange text-xs font-semibold uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chennai meets Manhattan</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-cream-white leading-tight"
          >
            The One Where <br />
            <span className="text-central-orange neon-text-orange animate-neon-pulse font-normal italic">Chennai</span> Meets New York
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-cream-white/70 max-w-2xl font-light leading-relaxed font-sans"
          >
            Experience premium American comfort food, masterfully crafted artisan coffees, and a cozy coffeehouse atmosphere designed for unforgettable friendships.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
          >
            <Link
              href="/reservations"
              className="px-8 py-4 rounded-xl bg-central-orange text-charcoal-black font-sans text-sm font-bold shadow-lg shadow-central-orange/15 hover:shadow-central-orange/35 hover:bg-central-orange/95 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 btn-premium"
            >
              <Utensils className="w-4 h-4" />
              Book a Table
            </Link>
            <Link
              href="/menu"
              className="px-8 py-4 rounded-xl bg-coffee-brown/30 backdrop-blur-md border border-cream-white/10 hover:border-central-orange/50 hover:bg-coffee-brown/50 text-cream-white font-sans text-sm font-semibold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Explore our Menu</span>
              <ArrowRight className="w-4 h-4 text-central-orange" />
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-cream-white/20 flex justify-center p-1.5 cursor-pointer"
            onClick={() => {
              document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="w-1.5 h-1.5 bg-central-orange rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* 2. BRAND CONNECTION SECTION */}
      <section id="intro" className="py-24 max-w-7xl mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <span className="text-sm font-semibold text-monica-purple uppercase tracking-widest block">
              Cozy Sitcom Nostalgia
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-cream-white leading-tight">
              An Upscale New York Bistro with a Friendly Touch
            </h2>
            <p className="text-sm text-cream-white/70 leading-relaxed font-sans">
              Welcome to Central Perk Chennai, an elegant dining experience bringing the warmth of Greenwich Village coffee houses to the heart of Chennai.
            </p>
            <p className="text-sm text-cream-white/70 leading-relaxed font-sans">
              We focus on premium culinary execution—handcrafted double smash patties, slow-steeped citrus cold brews, and authentic cheesecakes—in a cozy, brick-walled atmosphere complete with velvet upholstery, subtle neon accents, and private corners designed for laughter and connection.
            </p>
            <div className="flex gap-8 mt-4">
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-bold text-central-orange">10k+</span>
                <span className="text-xs text-cream-white/50 uppercase tracking-wider mt-1 font-sans">Daily Brews</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-bold text-monica-purple">4.9</span>
                <span className="text-xs text-cream-white/50 uppercase tracking-wider mt-1 font-sans">Guest Rating</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-bold text-luxury-gold">100%</span>
                <span className="text-xs text-cream-white/50 uppercase tracking-wider mt-1 font-sans">Freshly Cooked</span>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] rounded-2xl overflow-hidden border border-cream-white/5 shadow-2xl">
            <Image
              src="/images/purple_door.png"
              alt="Cozy Interior Detail"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl glass-panel border border-cream-white/10 flex items-center justify-between">
              <div>
                <h4 className="font-serif text-base font-bold text-cream-white">Visit Our Photo Corner</h4>
                <p className="text-xs text-cream-white/60 mt-1">Reserve a slot at our iconic purple door backdrop.</p>
              </div>
              <Link
                href="/gallery"
                className="p-3 rounded-lg bg-central-orange text-charcoal-black hover:bg-central-orange/90 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CHARACTER SPECIALS SECTION */}
      <section className="py-24 border-t border-cream-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-semibold text-central-orange uppercase tracking-widest">
              The Specials Board
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-cream-white">
              Curated Culinary Episodes
            </h2>
            <p className="text-sm text-cream-white/60">
              Dishes inspired by classic characters, executed with premium culinary craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CHARACTER_SPECIALS.map((dish) => (
              <div
                key={dish.id}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-charcoal-black/80 backdrop-blur-md border border-cream-white/10 text-xs font-semibold text-central-orange">
                    {dish.badge}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="font-serif text-lg font-bold text-cream-white">{dish.name}</h3>
                      <span className="font-sans text-lg font-bold text-central-orange whitespace-nowrap">₹{dish.price}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-central-orange text-central-orange" />
                      ))}
                      <span className="text-xs text-cream-white/40 ml-1">({dish.rating})</span>
                    </div>
                    <p className="text-xs text-cream-white/60 leading-relaxed font-sans line-clamp-3 mb-6">
                      {dish.description}
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart({ id: dish.id, name: dish.name, price: dish.price, image: dish.image })}
                    className="w-full py-3 rounded-xl bg-coffee-brown/40 border border-cream-white/10 hover:border-central-orange hover:bg-central-orange hover:text-charcoal-black transition-all duration-300 font-sans text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
      <section className="py-24 bg-charcoal-black/40 border-t border-b border-cream-white/5 relative z-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8 relative">
          <div className="p-3 rounded-full bg-monica-purple/10 border border-monica-purple/20 text-monica-purple">
            <Star className="w-6 h-6 fill-monica-purple" />
          </div>

          <div className="h-[180px] md:h-[140px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeReview}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="font-serif text-lg md:text-2xl italic leading-relaxed text-cream-white"
              >
                &ldquo;{TESTIMONIALS[activeReview].text}&rdquo;
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-sans text-sm font-bold text-cream-white tracking-wide">
              {TESTIMONIALS[activeReview].author}
            </h4>
            <span className="text-xs text-central-orange mt-1 uppercase tracking-widest font-sans font-medium">
              {TESTIMONIALS[activeReview].role}
            </span>
          </div>

          <div className="flex gap-2.5">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveReview(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeReview === index ? 'bg-central-orange w-6' : 'bg-cream-white/20'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. MINI FEATURES BOARD */}
      <section className="py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-semibold text-monica-purple uppercase tracking-widest">
              Club Experiences
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-cream-white">
              Beyond the Menu
            </h2>
            <p className="text-sm text-cream-white/60">
              Dive into our interactive community features. Earn perks, test sitcom trivia, and book snapshot booths.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between gap-6 border border-cream-white/5">
              <div className="flex flex-col gap-3">
                <div className="p-3 rounded-xl bg-monica-purple/10 border border-monica-purple/20 text-monica-purple w-fit">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-cream-white">Which Friend Are You?</h3>
                <p className="text-xs text-cream-white/60 leading-relaxed font-sans">
                  Answer a few playful multiple-choice questions to find out which iconic character matches your dining personality.
                </p>
              </div>
              <Link
                href="/quiz"
                className="py-3 rounded-xl bg-monica-purple text-cream-white hover:bg-monica-purple/90 transition-colors font-sans text-xs font-bold flex items-center justify-center gap-2 group"
              >
                <span>Take Personality Quiz</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between gap-6 border border-cream-white/5">
              <div className="flex flex-col gap-3">
                <div className="p-3 rounded-xl bg-central-orange/10 border border-central-orange/20 text-central-orange w-fit">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-cream-white">Loyalty Perks Program</h3>
                <p className="text-xs text-cream-white/60 leading-relaxed font-sans">
                  Earn points on every table reservation and online order. Redeem rewards, unlocked levels, and enjoy free beverages.
                </p>
              </div>
              <Link
                href="/loyalty"
                className="py-3 rounded-xl bg-central-orange text-charcoal-black hover:bg-central-orange/90 transition-colors font-sans text-xs font-bold flex items-center justify-center gap-2 group"
              >
                <span>Open Loyalty Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between gap-6 border border-cream-white/5">
              <div className="flex flex-col gap-3">
                <div className="p-3 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold w-fit">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-cream-white">Photo Booth Scheduler</h3>
                <p className="text-xs text-cream-white/60 leading-relaxed font-sans">
                  Secure your session in our photobooth. Choose themes, select frames, and capture memories that feel like a sitcom intro.
                </p>
              </div>
              <Link
                href="/photobooth"
                className="py-3 rounded-xl bg-coffee-brown text-cream-white hover:bg-coffee-brown/80 transition-colors border border-cream-white/5 font-sans text-xs font-bold flex items-center justify-center gap-2 group"
              >
                <span>Book Photo Session</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}