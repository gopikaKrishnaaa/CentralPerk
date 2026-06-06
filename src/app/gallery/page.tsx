'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Camera, Heart, Eye } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: "The Iconic Orange Couch",
    description: "The cozy centerpiece of our lounge, set against rustic brick walls and warm, ambient Edison bulbs.",
    image: "/images/central_perk_couch.png",
    category: "Interior",
  },
  {
    id: 'gal-2',
    title: "The Signature Purple Door",
    description: "Our nostalgic entry corner complete with the classic golden frame hanging around the peephole.",
    image: "/images/purple_door.png",
    category: "Interior",
  },
  {
    id: 'gal-3',
    title: "Rustic New York Brick Walls",
    description: "Authentic textured bricks creating a moody, comforting Greenwich Village atmosphere.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    category: "Details",
  },
  {
    id: 'gal-4',
    title: "Warm Neon Signage",
    description: "Vintage neon glow lighting up the bistro for perfect Instagram-worthy snapshots.",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80",
    category: "Atmosphere",
  },
  {
    id: 'gal-5',
    title: "Artisan Coffee Station",
    description: "Where Gunther draws our rich double-shot espressos and froths silky velvety milk.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
    category: "Coffee",
  },
  {
    id: 'gal-6',
    title: "Bistro Dining Room",
    description: "Elegant, cozy velvet seating arrangements designed for group conversations and laughter.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80",
    category: "Interior",
  }
];

const CATEGORIES = ["All", "Interior", "Atmosphere", "Coffee", "Details"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(item => 
    selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <div className="brick-wall-bg min-h-screen py-16 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        
        {/* Header Title */}
        <div className="text-center flex flex-col gap-4 max-w-xl mx-auto">
          <span className="text-xs font-semibold text-central-orange uppercase tracking-widest">Visual Tour</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream-white leading-tight">
            Every Corner Is Instagram-Worthy
          </h1>
          <p className="text-sm text-cream-white/70 leading-relaxed font-sans">
            Take a look inside Central Perk Chennai. Explore our cozy lounges, retro brick layouts, character corners, and custom details.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-2 justify-center border-b border-cream-white/5 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-central-orange text-charcoal-black border-central-orange scale-[1.02]'
                  : 'bg-coffee-brown/20 border-cream-white/5 hover:border-cream-white/20 text-cream-white/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={item.id}
              className="break-inside-avoid relative rounded-2xl overflow-hidden border border-cream-white/5 bg-coffee-brown/10 group cursor-pointer"
              onClick={() => setLightboxIndex(GALLERY_ITEMS.findIndex(gi => gi.id === item.id))}
            >
              {/* Image */}
              <div className="relative w-full h-auto min-h-[220px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="object-cover w-full rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-charcoal-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-central-orange bg-central-orange/10 border border-central-orange/20 px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                    <div className="flex gap-2">
                      <span className="p-2 rounded-lg bg-charcoal-black/50 text-cream-white border border-cream-white/5">
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-base font-bold text-cream-white flex items-center gap-2">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-cream-white/60 mt-1 font-sans line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Viewing Overlay */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal-black/95 backdrop-blur-md z-50 flex items-center justify-center p-6"
            >
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-coffee-brown/40 border border-cream-white/10 hover:bg-coffee-brown/70 text-cream-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="max-w-4xl w-full flex flex-col items-center gap-6">
                {/* Lightbox Image Container */}
                <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden border border-cream-white/10 shadow-2xl">
                  <Image
                    src={GALLERY_ITEMS[lightboxIndex].image}
                    alt={GALLERY_ITEMS[lightboxIndex].title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Lightbox Description */}
                <div className="text-center max-w-xl flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-central-orange mx-auto">
                    {GALLERY_ITEMS[lightboxIndex].category} Photo
                  </span>
                  <h3 className="font-serif text-xl font-bold text-cream-white">
                    {GALLERY_ITEMS[lightboxIndex].title}
                  </h3>
                  <p className="text-xs text-cream-white/70 leading-relaxed font-sans">
                    {GALLERY_ITEMS[lightboxIndex].description}
                  </p>

                  {/* Lightbox Navigation Buttons */}
                  <div className="flex gap-4 mx-auto mt-4">
                    <button
                      onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null))}
                      className="px-4 py-2 rounded-xl bg-coffee-brown/20 border border-cream-white/5 hover:border-cream-white/20 text-xs font-semibold"
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null))}
                      className="px-4 py-2 rounded-xl bg-coffee-brown/20 border border-cream-white/5 hover:border-cream-white/20 text-xs font-semibold"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
