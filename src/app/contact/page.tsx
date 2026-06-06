'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      
      // Auto close toast after 5s
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="brick-wall-bg min-h-screen py-16 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* Header Title */}
        <div className="text-center flex flex-col gap-4 max-w-xl mx-auto">
          <span className="text-xs font-semibold text-central-orange uppercase tracking-widest">Get In Touch</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream-white leading-tight">
            Connect with Central Perk
          </h1>
          <p className="text-sm text-cream-white/70 leading-relaxed font-sans">
            Drop us a message, find our location, or ask about booking a private party. We are always here to help.
          </p>
        </div>

        {/* Contact Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Details & Map */}
          <div className="flex flex-col gap-8 w-full">
            <h2 className="font-serif text-2xl font-bold text-cream-white border-b border-cream-white/10 pb-3">
              Restaurant Details
            </h2>

            {/* Info List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-4 p-4 rounded-xl bg-coffee-brown/15 border border-cream-white/5">
                <MapPin className="w-5 h-5 text-central-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-cream-white">Visit Us</h4>
                  <p className="text-xs text-cream-white/60 mt-1 leading-relaxed">
                    142, OMR Main Road,<br />
                    Thoraipakkam, Chennai,<br />
                    Tamil Nadu 600097
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-coffee-brown/15 border border-cream-white/5">
                <Phone className="w-5 h-5 text-central-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-cream-white">Call Us</h4>
                  <p className="text-xs text-cream-white/60 mt-1">
                    +91 98765 43210
                  </p>
                  <span className="text-[10px] text-cream-white/30 block mt-1 uppercase">Table Reservation</span>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-coffee-brown/15 border border-cream-white/5">
                <Clock className="w-5 h-5 text-central-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-cream-white">Hours</h4>
                  <p className="text-xs text-cream-white/60 mt-1">
                    10:00 AM – 11:00 PM
                  </p>
                  <span className="text-[10px] text-cream-white/30 block mt-1 uppercase">Open Seven Days</span>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-coffee-brown/15 border border-cream-white/5">
                <Mail className="w-5 h-5 text-central-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-cream-white">Email Us</h4>
                  <p className="text-xs text-cream-white/60 mt-1">
                    hello@centralperk.com
                  </p>
                </div>
              </div>
            </div>

            {/* Dark Themed Map Embed */}
            <div className="relative h-[320px] w-full rounded-2xl overflow-hidden border border-cream-white/5 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.001602492542!2d80.22818507567848!3d12.971777087343467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d9c1b48b789%3A0xc07c30ee0e980838!2sOMR%20Food%20Street%20-%20Thoraipakkam!5e0!3m2!1sen!2sin!4v1717646549244!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.25) brightness(0.85)' }}
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
              {/* Elegant overlay to tint the inverted map with Monica Purple and Central Orange */}
              <div className="absolute inset-0 bg-gradient-to-tr from-monica-purple/25 via-transparent to-central-orange/15 mix-blend-color pointer-events-none" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel p-6 md:p-10 rounded-2xl border border-cream-white/5 w-full flex flex-col gap-6">
            <h2 className="font-serif text-2xl font-bold text-cream-white border-b border-cream-white/10 pb-3">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-cream-white/60 uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rachel Green"
                  className="px-4 py-3 rounded-xl bg-charcoal-black/50 border border-cream-white/10 text-sm focus:border-central-orange outline-none transition-colors text-cream-white placeholder:text-cream-white/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-cream-white/60 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rachel@centralperk.com"
                  className="px-4 py-3 rounded-xl bg-charcoal-black/50 border border-cream-white/10 text-sm focus:border-central-orange outline-none transition-colors text-cream-white placeholder:text-cream-white/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-cream-white/60 uppercase tracking-wider">Message</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your suggestions, party requests, or feedback..."
                  className="px-4 py-3 rounded-xl bg-charcoal-black/50 border border-cream-white/10 text-sm focus:border-central-orange outline-none transition-colors text-cream-white placeholder:text-cream-white/20 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-central-orange text-charcoal-black font-sans text-sm font-bold shadow-lg shadow-central-orange/15 hover:bg-central-orange/95 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending Message...' : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Floating Success Alert Toast */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed bottom-8 right-8 p-4 rounded-xl bg-green-500/90 text-charcoal-black font-sans text-xs font-bold border border-green-600/30 flex items-center gap-2.5 shadow-2xl z-50 max-w-sm"
            >
              <CheckCircle2 className="w-5 h-5 text-charcoal-black shrink-0" />
              <div>
                <span className="block font-bold">Message Sent Successfully!</span>
                <span className="font-normal opacity-80 block mt-0.5">We will get back to you within 24 hours.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
