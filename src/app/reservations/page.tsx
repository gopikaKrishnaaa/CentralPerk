'use client';

import React, { useState } from 'react';
import { db, Reservation } from '@/lib/database';
import { Calendar, Clock, Users, Mail, Phone, User, AlignLeft, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReservationsPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Reservation | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !date || !time) return;

    setIsSubmitting(true);
    
    // Simulate API submission delay
    setTimeout(() => {
      const res = db.addReservation({
        name,
        phone,
        email,
        date,
        time,
        guests,
        specialRequests
      });
      setCreatedBooking(res);
      setIsSubmitting(false);
      
      // Reset form
      setName('');
      setPhone('');
      setEmail('');
      setDate('');
      setTime('');
      setGuests(2);
      setSpecialRequests('');
    }, 1500);
  };

  return (
    <div className="brick-wall-bg min-h-screen py-16 px-6 relative z-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        
        {/* Header Title */}
        <div className="text-center flex flex-col gap-4 max-w-xl mx-auto">
          <span className="text-xs font-semibold text-central-orange uppercase tracking-widest">Table Booking</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream-white leading-tight">
            Reserve Your Couch Spot
          </h1>
          <p className="text-sm text-cream-white/70 leading-relaxed font-sans">
            Secure your spot in our vintage New York-inspired café. Please fill out the details below to book a table.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!createdBooking ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-6 md:p-10 rounded-2xl border border-cream-white/5 relative overflow-hidden"
            >
              {/* Form decor */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-monica-purple/5 rounded-full blur-[80px]" />
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-cream-white/60 uppercase tracking-wider flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-central-orange" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Monica Geller"
                      className="px-4 py-3 rounded-xl bg-charcoal-black/50 border border-cream-white/10 text-sm focus:border-central-orange outline-none transition-colors text-cream-white placeholder:text-cream-white/20"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-cream-white/60 uppercase tracking-wider flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-central-orange" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210 (10 digit)"
                      className="px-4 py-3 rounded-xl bg-charcoal-black/50 border border-cream-white/10 text-sm focus:border-central-orange outline-none transition-colors text-cream-white placeholder:text-cream-white/20"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-cream-white/60 uppercase tracking-wider flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-central-orange" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. monica@apartment20.com"
                      className="px-4 py-3 rounded-xl bg-charcoal-black/50 border border-cream-white/10 text-sm focus:border-central-orange outline-none transition-colors text-cream-white placeholder:text-cream-white/20"
                    />
                  </div>

                  {/* Number of Guests */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-cream-white/60 uppercase tracking-wider flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-central-orange" />
                      Number of Guests
                    </label>
                    <div className="relative">
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-charcoal-black/50 border border-cream-white/10 text-sm focus:border-central-orange outline-none transition-colors text-cream-white appearance-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num} className="bg-charcoal-black text-cream-white">
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cream-white/40 text-xs">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-cream-white/60 uppercase tracking-wider flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-central-orange" />
                      Reservation Date
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="px-4 py-3 rounded-xl bg-charcoal-black/50 border border-cream-white/10 text-sm focus:border-central-orange outline-none transition-colors text-cream-white cursor-pointer"
                    />
                  </div>

                  {/* Time */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-cream-white/60 uppercase tracking-wider flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-central-orange" />
                      Reservation Time
                    </label>
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="px-4 py-3 rounded-xl bg-charcoal-black/50 border border-cream-white/10 text-sm focus:border-central-orange outline-none transition-colors text-cream-white cursor-pointer"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-cream-white/60 uppercase tracking-wider flex items-center gap-2">
                    <AlignLeft className="w-3.5 h-3.5 text-central-orange" />
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Describe any dietary restrictions, high chair needs, or corner couch preferences..."
                    className="px-4 py-3 rounded-xl bg-charcoal-black/50 border border-cream-white/10 text-sm focus:border-central-orange outline-none transition-colors text-cream-white placeholder:text-cream-white/20 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-central-orange text-charcoal-black font-sans text-sm font-bold shadow-lg shadow-central-orange/15 hover:bg-central-orange/95 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? 'Booking Couch Spot...' : 'Confirm Table Booking'}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-8 md:p-12 rounded-2xl border border-cream-white/5 text-center flex flex-col items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="font-serif text-2xl font-bold text-cream-white">The One with the Reserved Table!</h2>
                <p className="text-sm text-cream-white/70 max-w-md mx-auto">
                  Your table reservation has been recorded successfully. We can&apos;t wait to serve you in Monica&apos;s style!
                </p>
              </div>

              {/* Receipt details */}
              <div className="w-full max-w-md p-6 rounded-xl bg-coffee-brown/15 border border-cream-white/5 text-left flex flex-col gap-3">
                <div className="flex justify-between border-b border-cream-white/5 pb-2.5 text-xs text-cream-white/60">
                  <span>Reservation ID</span>
                  <span className="font-mono font-bold text-central-orange">{createdBooking.id}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-cream-white/60">Reserved For</span>
                  <span className="text-cream-white font-medium">{createdBooking.name}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-cream-white/60">Date &amp; Time</span>
                  <span className="text-cream-white font-medium">{createdBooking.date} at {createdBooking.time}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-cream-white/60">Guests Count</span>
                  <span className="text-cream-white font-medium">{createdBooking.guests} {createdBooking.guests === 1 ? 'Person' : 'People'}</span>
                </div>
              </div>

              {/* Loyalty Alert */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-monica-purple/15 border border-monica-purple/25 text-left max-w-md">
                <Sparkles className="w-5 h-5 text-monica-purple shrink-0" />
                <p className="text-xs text-cream-white/80">
                  🎉 Loyalty perk unlocked! **+50 Points** have been credited to your rewards dashboard.
                </p>
              </div>

              <div className="flex gap-4 w-full max-w-xs mt-4">
                <button
                  onClick={() => setCreatedBooking(null)}
                  className="flex-1 py-3.5 rounded-xl bg-coffee-brown/40 border border-cream-white/10 hover:border-cream-white/30 text-xs font-bold text-cream-white"
                >
                  Book Another Table
                </button>
                <button
                  onClick={() => window.location.href = '/menu'}
                  className="flex-1 py-3.5 rounded-xl bg-central-orange text-charcoal-black text-xs font-bold shadow-lg shadow-central-orange/10 flex items-center justify-center gap-1 group"
                >
                  Browse Menu
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
