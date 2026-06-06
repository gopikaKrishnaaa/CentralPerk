// Centralized image mapping for the entire application.
// Uses local assets generated via AI or premium SVG placeholders.
// This ensures zero external 404 dependencies.

// ===== FOOD IMAGES =====
// We have 4 AI-generated images and the rest use elegant inline data-URI SVG placeholders.

function makePlaceholder(label: string, emoji: string, hue: number = 25): string {
  // Generate a premium dark-themed SVG placeholder with label and emoji
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="hsl(${hue}, 30%, 8%)"/>
        <stop offset="100%" stop-color="hsl(${hue}, 20%, 14%)"/>
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="url(#bg)"/>
    <text x="300" y="170" text-anchor="middle" font-size="64" fill="none">${emoji}</text>
    <text x="300" y="250" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="rgba(255,248,240,0.6)" letter-spacing="2">${label}</text>
    <rect x="250" y="270" width="100" height="2" rx="1" fill="rgba(242,140,40,0.4)"/>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// ===== IMAGE REGISTRY =====
// Maps a unique key to a local path or data URI

export const IMAGES = {
  // -- Hero  --
  hero_couch: "/images/central_perk_couch.png",
  purple_door: "/images/purple_door.png",

  // -- Food:  --
  burger: "/images/burger.png",
  pasta: "/images/pasta.png",
  cold_brew: "/images/cold_brew.png",
  cheesecake: "/images/cheesecake.png",
  chocolate_shake: '/images/chocolate_shake.png',
  vegan_bowl: '/images/vegan_bowl.png',

  // -- Food: SVG Placeholders --
  fries: makePlaceholder("Loaded NYC Fries", "🍟", 35),
  pizza: makePlaceholder("Pepperoni Pizza", "🍕", 15),
  chicken_burger: makePlaceholder("Crispy Chicken Burger", "🍔", 28),
  chicken_steak: makePlaceholder("Grilled Chicken Steak", "🥩", 10),
  mac_cheese: makePlaceholder("Mac & Cheese", "🧀", 40),
  caesar_salad: makePlaceholder("Caesar Salad", "🥗", 120),
  brownie_sundae: makePlaceholder("Brownie Sundae", "🍫", 20),
  red_velvet: makePlaceholder("Red Velvet Cake", "🎂", 350),
  waffles: makePlaceholder("Belgian Waffles", "🧇", 38),
  cappuccino: makePlaceholder("Cappuccino", "☕", 25),
  caramel_latte: makePlaceholder("Caramel Latte", "☕", 30),
  americano: makePlaceholder("Americano", "☕", 18),
  

  // -- Gallery: SVG Placeholders --
  brick_walls: makePlaceholder("Rustic Brick Walls", "🧱", 12),
  neon_sign: makePlaceholder("Neon Signage", "💡", 45),
  coffee_station: makePlaceholder("Coffee Station", "☕", 25),
  dining_room: makePlaceholder("Bistro Dining", "🍽️", 30),
} as const;

export type ImageKey = keyof typeof IMAGES;
