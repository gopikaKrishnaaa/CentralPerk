'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Search, Star, ShoppingCart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MENU_DATA = [
  // Joey's Favorites
  {
    id: 'joey-1',
    category: "Joey's Favorites",
    name: "Joey's Double Cheeseburger",
    price: 399,
    description: "Double smash beef patty, caramelized onions, melted cheddar cheese, house pickles, served on a buttery toasted brioche bun with secret garlic aioli.",
    image: "/images/burger.png",
    rating: 4.9,
    featured: true,
  },
  {
    id: 'joey-2',
    category: "Joey's Favorites",
    name: "Loaded NYC Fries",
    price: 249,
    description: "Crispy double-cooked skin-on fries drizzled with aromatic white truffle oil, melted aged cheddar cheese, and fresh chives.",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
  },
  {
    id: 'joey-3',
    category: "Joey's Favorites",
    name: "Tribbiani Pepperoni Pizza",
    price: 499,
    description: "Artisanal hand-stretched sourdough base loaded with premium spicy pepperoni, rich tomato marinara, and fresh mozzarella cheese.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    featured: true,
  },
  {
    id: 'joey-4',
    category: "Joey's Favorites",
    name: "Crispy Chicken Burger",
    price: 349,
    description: "Buttermilk fried crispy chicken thigh, crunchy shredded iceberg lettuce, dill pickles, and signature house mayo.",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
  },

  // Monica's Kitchen
  {
    id: 'monica-1',
    category: "Monica's Kitchen",
    name: "Grilled Chicken Steak",
    price: 499,
    description: "Herb-marinated flame-grilled chicken breast served with smooth garlic mashed potatoes, buttered asparagus, and rich black pepper jus.",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    featured: true,
  },
  {
    id: 'monica-2',
    category: "Monica's Kitchen",
    name: "Monica's Mac & Cheese",
    price: 299,
    description: "Macaroni baked in a velvety four-cheese mornay sauce (cheddar, gruyere, parmesan, fontina) topped with toasted panko crumbs.",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
  },
  {
    id: 'monica-3',
    category: "Monica's Kitchen",
    name: "Alfredo Fettuccine Pasta",
    price: 349,
    description: "Imported Italian fettuccine tossed in a rich, creamy Parmigiano-Reggiano sauce with slow-roasted garlic and chopped parsley.",
    image: "/images/pasta.png",
    rating: 5.0,
    featured: true,
  },
  {
    id: 'monica-4',
    category: "Monica's Kitchen",
    name: "Classic Caesar Salad",
    price: 279,
    description: "Crisp organic romaine hearts tossed in signature creamy Caesar dressing with herb croutons and thick parmesan shavings.",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
  },

  // Rachel's Desserts
  {
    id: 'rachel-1',
    category: "Rachel's Desserts",
    name: "Classic New York Cheesecake",
    price: 249,
    description: "Dense, velvety, classic New York baked cream cheese dessert with a crunchy graham cracker crust and house strawberry compote.",
    image: "/images/cheesecake.png",
    rating: 4.9,
    featured: true,
  },
  {
    id: 'rachel-2',
    category: "Rachel's Desserts",
    name: "Chocolate Brownie Sundae",
    price: 229,
    description: "Warm fudgy dark chocolate brownie chunks served over double vanilla bean gelato, hot fudge sauce, and toasted walnuts.",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
  },
  {
    id: 'rachel-3',
    category: "Rachel's Desserts",
    name: "Red Velvet Slice",
    price: 199,
    description: "Layers of incredibly moist cocoa-infused red sponge cake bound together with smooth vanilla bean cream cheese icing.",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
  },
  {
    id: 'rachel-4',
    category: "Rachel's Desserts",
    name: "Warm Belgian Waffles",
    price: 249,
    description: "Golden buttermilk waffles served hot with whipped cinnamon butter, organic maple syrup, and fresh blueberries.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
  },

  // Central Perk Coffee
  {
    id: 'coffee-1',
    category: "Central Perk Coffee",
    name: "Gunther's Cappuccino",
    price: 189,
    description: "A double shot of single-origin espresso with steamed milk and a velvety layer of microfoam.",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    featured: true,
  },
  {
    id: 'coffee-2',
    category: "Central Perk Coffee",
    name: "Chandler's Cold Brew",
    price: 199,
    description: "Slow-steeped craft cold brew using single-origin beans, served over block ice with a signature hint of orange peel zest.",
    image: "/images/cold_brew.png",
    rating: 4.8,
  },
  {
    id: 'coffee-3',
    category: "Central Perk Coffee",
    name: "Phoebe's Caramel Latte",
    price: 219,
    description: "Rich espresso combined with steamed milk, sweet salted caramel syrup, finished with a golden caramel lattice.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
  },
  {
    id: 'coffee-4',
    category: "Central Perk Coffee",
    name: "Ross's Caffe Americano",
    price: 179,
    description: "Signature double espresso shots pulled carefully over purified hot water for a smooth, bold profile.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
  },
];

const CATEGORIES = ["All", "Joey's Favorites", "Monica's Kitchen", "Rachel's Desserts", "Central Perk Coffee"];

export default function MenuPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMenu = MENU_DATA.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="brick-wall-bg min-h-screen py-16 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <div className="text-center flex flex-col gap-4 max-w-xl mx-auto">
          <span className="text-xs font-semibold text-central-orange uppercase tracking-widest">Gourmet Selection</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream-white">
            The Central Perk Menu
          </h1>
          <p className="text-sm text-cream-white/70 leading-relaxed font-sans">
            Explore premium comfort meals, signature character favorites, and expertly brewed beverages crafted daily in Monica&apos;s kitchen.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center bg-coffee-brown/10 p-4 md:p-6 rounded-2xl border border-cream-white/5 backdrop-blur-md">
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or ingredients..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-charcoal-black/50 border border-cream-white/10 text-sm focus:border-central-orange outline-none transition-colors placeholder:text-cream-white/30 text-cream-white"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-center">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    isSelected
                      ? 'bg-central-orange text-charcoal-black shadow-lg shadow-central-orange/15 scale-[1.02]'
                      : 'bg-coffee-brown/30 hover:bg-coffee-brown/60 text-cream-white/70 hover:text-cream-white border border-cream-white/5'
                  }`}
                >
                  {cat.replace("'s Favorites", "").replace("'s Kitchen", "").replace("'s Desserts", "")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/logo.png';
                    }}
                  />
                  {item.featured && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-monica-purple/90 backdrop-blur-sm text-[10px] font-bold text-cream-white flex items-center gap-1 uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-luxury-gold fill-luxury-gold" />
                      Popular
                    </span>
                  )}
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="font-serif text-base font-bold text-cream-white">{item.name}</h3>
                      <span className="font-sans text-base font-bold text-central-orange">₹{item.price}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-central-orange text-central-orange" />
                      ))}
                      <span className="text-[10px] text-cream-white/45 ml-1">({item.rating})</span>
                    </div>
                    <p className="text-xs text-cream-white/60 leading-relaxed font-sans line-clamp-3 mb-6">
                      {item.description}
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                    className="w-full py-3 rounded-xl bg-coffee-brown/40 border border-cream-white/10 hover:border-central-orange hover:bg-central-orange hover:text-charcoal-black transition-all duration-300 font-sans text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-20 flex flex-col items-center gap-4 bg-coffee-brown/5 rounded-2xl border border-cream-white/5">
            <p className="text-cream-white/40 text-sm font-sans">No dishes matched your filters or query.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="text-xs font-bold text-central-orange underline underline-offset-4"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}