import React from 'react';
import Link from 'next/link';
import { Coffee, MapPin, Phone, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-black border-t border-cream-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative radial gradient for atmosphere */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-coffee-brown/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-monica-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Column 1: Brand Info */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-coffee-brown/50 border border-central-orange/30">
              <Coffee className="w-5 h-5 text-central-orange" />
            </span>
            <span className="font-serif text-xl font-bold tracking-wide text-cream-white">
              Central <span className="text-central-orange">Perk</span>
              <span className="text-xs font-sans tracking-widest block font-light text-cream-white/50 -mt-1 uppercase">Chennai</span>
            </span>
          </Link>
          <p className="text-sm text-cream-white/60 font-sans italic mt-2 leading-relaxed">
            &quot;Where Every Meal Feels Like an Episode.&quot;
          </p>
          <div className="flex items-center gap-4 mt-4 text-cream-white/50">
            <a href="#" className="hover:text-central-orange transition-colors duration-300" aria-label="Instagram">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="#" className="hover:text-central-orange transition-colors duration-300" aria-label="Facebook">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-central-orange transition-colors duration-300" aria-label="Twitter">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Hours & Details */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-lg font-bold text-cream-white tracking-wide border-b border-cream-white/10 pb-2">
            Hours &amp; Contact
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-cream-white/70">
            <li className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-central-orange shrink-0 mt-0.5" />
              <div>
                <span className="block font-medium text-cream-white">Open Daily</span>
                <span className="text-xs text-cream-white/50">10:00 AM – 11:00 PM</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-central-orange shrink-0 mt-0.5" />
              <div>
                <span className="block font-medium text-cream-white">Call Us</span>
                <span className="text-xs text-cream-white/50">+91 98765 43210</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 3: Location */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-lg font-bold text-cream-white tracking-wide border-b border-cream-white/10 pb-2">
            Address
          </h3>
          <p className="flex items-start gap-3 text-sm text-cream-white/70 leading-relaxed">
            <MapPin className="w-4 h-4 text-central-orange shrink-0 mt-0.5" />
            <span>
              Central Perk Chennai<br />
              142, OMR Main Road,<br />
              Thoraipakkam, Chennai,<br />
              Tamil Nadu 600097
            </span>
          </p>
        </div>

        {/* Column 4: Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-lg font-bold text-cream-white tracking-wide border-b border-cream-white/10 pb-2">
            Explore
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-sm text-cream-white/70">
            <li>
              <Link href="/" className="hover:text-central-orange transition-colors duration-300">Home</Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-central-orange transition-colors duration-300">Menu</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-central-orange transition-colors duration-300">Our Story</Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-central-orange transition-colors duration-300">Gallery</Link>
            </li>
            <li>
              <Link href="/reservations" className="hover:text-central-orange transition-colors duration-300">Book Table</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-central-orange transition-colors duration-300">Contact</Link>
            </li>
            <li>
              <Link href="/loyalty" className="hover:text-central-orange transition-colors duration-300">Loyalty</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-cream-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-white/40 font-sans">
        <p>&copy; {currentYear} Central Perk Chennai. All rights reserved.</p>
        <p className="mt-2 sm:mt-0 tracking-wider">
          THE ONE WITH THE EXTRAORDINARY FLAVORS
        </p>
      </div>
    </footer>
  );
};
export default Footer;
