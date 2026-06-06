'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { db, PhotoBoothBooking } from '@/lib/database';
import { Camera, Calendar, Clock, Sparkles, CheckCircle2, ArrowRight, Upload, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const THEMES = [
  { id: 'theme-perk', name: "Central Perk Lounge", bgClass: "bg-[#2A1715] brick-wall-bg", desc: "Warm lighting, brick walls, and orange couch vibes." },
  { id: 'theme-monica', name: "Monica's Living Room", bgClass: "bg-[#3D224E] bg-radial", desc: "Bright violet walls, vintage posters, and eccentric decor." },
  { id: 'theme-ross', name: "Ross's Planetarium", bgClass: "bg-[#0B132B]", desc: "Deep space blue with star projections and scientific maps." }
];

const FRAMES = [
  { id: 'frame-polaroid', name: "Vintage Polaroid", borderClass: "border-[16px] border-b-[60px] border-cream-white shadow-xl text-charcoal-black", text: "The One with the Photo Booth 📸" },
  { id: 'frame-purple', name: "Sitcom Purple Door", borderClass: "border-[20px] border-monica-purple shadow-xl text-cream-white", text: "Friends Forever" },
  { id: 'frame-wood', name: "Mahogany Wood", borderClass: "border-[16px] border-amber-950 shadow-xl text-luxury-gold", text: "Central Perk Chennai" }
];

export default function PhotoBoothPage() {
  // Builder states
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [selectedFrame, setSelectedFrame] = useState(FRAMES[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  // Scheduler states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<PhotoBoothBooking | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !time) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const booking = db.addPhotoBoothBooking({
        name,
        email,
        date,
        time,
        theme: selectedTheme.name
      });
      setConfirmedBooking(booking);
      setIsSubmitting(false);

      // Reset
      setName('');
      setEmail('');
      setDate('');
      setTime('');
      setUploadedImage(null);
    }, 1500);
  };

  return (
    <div className="brick-wall-bg min-h-screen py-16 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        
        {/* Header Title */}
        <div className="text-center flex flex-col gap-4 max-w-xl mx-auto">
          <span className="text-xs font-semibold text-luxury-gold uppercase tracking-widest flex items-center gap-1.5 justify-center">
            <Camera className="w-4 h-4 text-luxury-gold animate-pulse" />
            Interactive Booth
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream-white leading-tight">
            Photo Booth Experience
          </h1>
          <p className="text-sm text-cream-white/70 leading-relaxed font-sans">
            Build your custom sitcom snapshot and schedule a premium, physical photo-booth session at our café location in Chennai.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!confirmedBooking ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            >
              {/* Left Column: Live Frame Builder */}
              <div className="flex flex-col gap-6">
                <h3 className="font-serif text-xl font-bold text-cream-white border-b border-cream-white/10 pb-2 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-central-orange" />
                  1. Snapshot Builder
                </h3>

                {/* Booth Display Area */}
                <div 
                  className={`w-full aspect-[4/5] max-w-sm mx-auto rounded-2xl overflow-hidden border border-cream-white/10 flex items-center justify-center p-6 transition-all duration-500 relative ${selectedTheme.bgClass}`}
                >
                  {/* Subtle lighting overlay for atmosphere */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-charcoal-black/20 via-transparent to-white/5 pointer-events-none" />

                  {/* Custom Styled Frame Wrapper */}
                  <div 
                    className={`w-full h-full flex flex-col justify-between items-center transition-all duration-300 relative ${selectedFrame.borderClass}`}
                  >
                    {/* Render Image or Upload Box */}
                    <div className="w-full flex-grow relative overflow-hidden bg-charcoal-black/80 flex items-center justify-center border border-charcoal-black/10">
                      {uploadedImage ? (
                        <img 
                          src={uploadedImage} 
                          alt="Boothing snapshot upload" 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:bg-charcoal-black/90 transition-colors h-full w-full gap-3"
                        >
                          <div className="p-3.5 rounded-full bg-coffee-brown/20 text-cream-white/40 border border-cream-white/5">
                            <Upload className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-cream-white block">Upload Demo Photo</span>
                            <span className="text-[10px] text-cream-white/40 block mt-1">PNG, JPG up to 5MB</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Invisible file input */}
                      <input 
                        type="file" 
                        accept="image/*" 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                        className="hidden" 
                      />
                    </div>

                    {/* Frame Footer Caption */}
                    <div className="h-[44px] flex items-center justify-center text-center font-serif text-[11px] tracking-wide font-bold uppercase select-none">
                      {selectedFrame.text}
                    </div>
                  </div>
                </div>

                {/* Theme & Frame Controls */}
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-cream-white/50 uppercase tracking-widest block mb-2">Select Theme Backdrop</label>
                    <div className="grid grid-cols-3 gap-3">
                      {THEMES.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => setSelectedTheme(theme)}
                          className={`p-3 rounded-xl border text-[11px] font-semibold text-center transition-all ${
                            selectedTheme.id === theme.id 
                              ? 'bg-central-orange/15 border-central-orange text-central-orange' 
                              : 'bg-coffee-brown/10 border-cream-white/5 text-cream-white/60 hover:border-cream-white/10'
                          }`}
                        >
                          {theme.name.replace(" Lounge", "").replace("'s Living Room", "").replace("'s Planetarium", "")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-cream-white/50 uppercase tracking-widest block mb-2">Select Frame Border</label>
                    <div className="grid grid-cols-3 gap-3">
                      {FRAMES.map((frame) => (
                        <button
                          key={frame.id}
                          onClick={() => setSelectedFrame(frame)}
                          className={`p-3 rounded-xl border text-[11px] font-semibold text-center transition-all ${
                            selectedFrame.id === frame.id 
                              ? 'bg-monica-purple/15 border-monica-purple text-monica-purple' 
                              : 'bg-coffee-brown/10 border-cream-white/5 text-cream-white/60 hover:border-cream-white/10'
                          }`}
                        >
                          {frame.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Scheduler Form */}
              <div className="glass-panel p-6 md:p-8 rounded-2xl border border-cream-white/5 flex flex-col gap-6">
                <h3 className="font-serif text-xl font-bold text-cream-white border-b border-cream-white/10 pb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-monica-purple" />
                  2. Session Booking
                </h3>

                <form onSubmit={handleBookSession} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-cream-white/60 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Joey Tribbiani"
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
                      placeholder="e.g. joey@tribbiani.com"
                      className="px-4 py-3 rounded-xl bg-charcoal-black/50 border border-cream-white/10 text-sm focus:border-central-orange outline-none transition-colors text-cream-white placeholder:text-cream-white/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-cream-white/60 uppercase tracking-wider flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-central-orange" />
                        Session Date
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="px-4 py-3 rounded-xl bg-charcoal-black/50 border border-cream-white/10 text-sm focus:border-central-orange outline-none transition-colors text-cream-white cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-cream-white/60 uppercase tracking-wider flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-central-orange" />
                        Session Time
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

                  <div className="p-4 rounded-xl bg-coffee-brown/15 border border-cream-white/5">
                    <p className="text-[11px] text-cream-white/60 leading-relaxed">
                      📸 **BOOTH INFO:** Booth sessions are scheduled for 15 minutes. High-resolution digital copies are automatically synced to your email, and 3 vintage prints are printed on-site.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-central-orange text-charcoal-black font-sans text-sm font-bold shadow-lg shadow-central-orange/15 hover:bg-central-orange/95 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {isSubmitting ? 'Scheduling Session...' : 'Book Photo Booth Session'}
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel p-8 md:p-12 rounded-2xl border border-cream-white/5 text-center flex flex-col items-center gap-6 max-w-xl mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="font-serif text-2xl font-bold text-cream-white">The One with the Scheduled Session!</h2>
                <p className="text-sm text-cream-white/70">
                  Your photo booth session has been booked. We will have the booth warmed up and set to the **{confirmedBooking.theme}** backdrop!
                </p>
              </div>

              <div className="w-full p-6 rounded-xl bg-coffee-brown/15 border border-cream-white/5 text-left flex flex-col gap-3">
                <div className="flex justify-between border-b border-cream-white/5 pb-2.5 text-xs text-cream-white/60">
                  <span>Booking ID</span>
                  <span className="font-mono font-bold text-central-orange">{confirmedBooking.id}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-cream-white/60">Booked For</span>
                  <span className="text-cream-white font-medium">{confirmedBooking.name}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-cream-white/60">Scheduled Date</span>
                  <span className="text-cream-white font-medium">{confirmedBooking.date} at {confirmedBooking.time}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-cream-white/60">Selected Theme</span>
                  <span className="text-cream-white font-medium">{confirmedBooking.theme}</span>
                </div>
              </div>

              {/* Loyalty reward highlight */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-monica-purple/15 border border-monica-purple/25 text-left w-full">
                <Sparkles className="w-5 h-5 text-monica-purple shrink-0" />
                <p className="text-xs text-cream-white/80">
                  🎉 Loyalty perk unlocked! **+40 Points** have been credited to your rewards dashboard.
                </p>
              </div>

              <div className="flex gap-4 w-full mt-4">
                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="flex-1 py-3.5 rounded-xl bg-coffee-brown/40 border border-cream-white/10 hover:border-cream-white/30 text-xs font-bold text-cream-white"
                >
                  Book Another Session
                </button>
                <Link
                  href="/loyalty"
                  className="flex-grow py-3.5 rounded-xl bg-central-orange text-charcoal-black text-xs font-bold shadow-lg shadow-central-orange/10 flex items-center justify-center gap-1 group"
                >
                  View Rewards
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
