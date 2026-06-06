'use client';

import React, { useState, useEffect } from 'react';
import { db, LoyaltyProfile } from '@/lib/database';
import { Award, Sparkles, CheckCircle2, AlertCircle, ShoppingBag, Calendar, Camera, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoyaltyPage() {
  const [profile, setProfile] = useState<LoyaltyProfile | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Sync profile details
  const syncProfile = () => {
    setProfile(db.getLoyaltyProfile());
  };

  useEffect(() => {
    syncProfile();

    const handleLoyaltyUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setProfile(customEvent.detail);
      }
    };

    window.addEventListener('loyalty-update', handleLoyaltyUpdate);
    return () => window.removeEventListener('loyalty-update', handleLoyaltyUpdate);
  }, []);

  const handleRedeem = (voucherId: string) => {
    const res = db.redeemVoucher(voucherId);
    if (res.success) {
      setToastMessage({ type: 'success', text: res.message });
      syncProfile();
    } else {
      setToastMessage({ type: 'error', text: res.message });
    }

    // Clear toast
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Compile history logs dynamically from local database
  const getActivityLog = () => {
    const logs: { id: string; title: string; points: string; date: string; icon: 'order' | 'res' | 'photo' | 'rsvp' }[] = [];
    
    // Reservations
    db.getReservations().forEach(r => {
      logs.push({
        id: r.id,
        title: `Reserved Table (Party of ${r.guests})`,
        points: "+50 pts",
        date: r.date,
        icon: 'res'
      });
    });

    // Orders
    db.getOrders().forEach(o => {
      logs.push({
        id: o.id,
        title: `Online Food Order placed`,
        points: `+${Math.floor(o.total / 10)} pts`,
        date: o.createdAt.substring(0, 10),
        icon: 'order'
      });
    });

    // Photo Booth
    db.getPhotoBoothBookings().forEach(p => {
      logs.push({
        id: p.id,
        title: `Photo Booth booking (${p.theme} theme)`,
        points: "+40 pts",
        date: p.date,
        icon: 'photo'
      });
    });

    // RSVPs
    db.getRSVPs().forEach(v => {
      logs.push({
        id: v.id,
        title: `RSVP: ${v.eventName}`,
        points: "+20 pts",
        date: v.createdAt.substring(0, 10),
        icon: 'rsvp'
      });
    });

    // Sort logs by date (newest first)
    return logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  if (!profile) return null;

  const activityList = getActivityLog();

  return (
    <div className="brick-wall-bg min-h-screen py-16 px-6 relative z-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        
        {/* Header Title */}
        <div className="text-center flex flex-col gap-4 max-w-xl mx-auto">
          <span className="text-xs font-semibold text-monica-purple uppercase tracking-widest">Rewards Club</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream-white leading-tight">
            Central Perk Perks
          </h1>
          <p className="text-sm text-cream-white/70 leading-relaxed font-sans">
            Welcome to the Central Perk Chennai Loyalty Program. Earn points automatically for reserving tables, ordering online, or visiting the photobooth.
          </p>
        </div>

        {/* 1. VISUAL GLOWING MEMBERSHIP VIP CARD */}
        <div className="relative w-full max-w-md mx-auto aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl border border-cream-white/10 glass-panel flex flex-col justify-between p-6 md:p-8">
          {/* Neon lights backdrop */}
          <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-central-orange/20 rounded-full blur-[70px] pointer-events-none" />
          <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-monica-purple/20 rounded-full blur-[70px] pointer-events-none" />

          {/* Card Top */}
          <div className="flex justify-between items-start z-10">
            <div>
              <span className="text-[10px] tracking-widest text-cream-white/50 uppercase block">Loyalty Membership</span>
              <span className="font-serif text-lg font-bold text-cream-white mt-1 block">
                Central <span className="text-central-orange">Perk</span> Chennai
              </span>
            </div>
            <div className="px-3.5 py-1 rounded-full bg-monica-purple text-[10px] font-bold text-cream-white uppercase tracking-wider shadow-lg shadow-monica-purple/15">
              {profile.tier}
            </div>
          </div>

          {/* Card Middle - Points */}
          <div className="z-10 flex flex-col gap-1 mt-4">
            <span className="text-[10px] tracking-widest text-cream-white/50 uppercase block">Available Balance</span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-4xl md:text-5xl font-bold text-central-orange neon-text-orange">{profile.points}</span>
              <span className="text-sm font-semibold text-cream-white/70 font-sans">Points</span>
            </div>
          </div>

          {/* Card Bottom - Name */}
          <div className="flex justify-between items-end border-t border-cream-white/5 pt-4 z-10 text-xs">
            <div>
              <span className="text-[8px] tracking-widest text-cream-white/40 uppercase block">Member Name</span>
              <span className="font-semibold text-cream-white mt-0.5 block">{profile.name}</span>
            </div>
            <div className="text-right">
              <span className="text-[8px] tracking-widest text-cream-white/40 uppercase block">Since</span>
              <span className="text-cream-white/80 font-medium mt-0.5 block">{profile.memberSince}</span>
            </div>
          </div>
        </div>

        {/* 2. VOUCHERS CATALOG SECTION */}
        <div className="flex flex-col gap-6">
          <h2 className="font-serif text-2xl font-bold text-cream-white border-b border-cream-white/10 pb-3">
            Available Vouchers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profile.vouchers.map((voucher) => {
              const canRedeem = profile.points >= voucher.pointsCost && !voucher.redeemed;
              return (
                <div
                  key={voucher.id}
                  className={`glass-panel p-6 rounded-2xl border flex flex-col justify-between gap-5 relative overflow-hidden transition-all duration-300 ${
                    voucher.redeemed 
                      ? 'border-green-500/20 bg-green-500/[0.02]' 
                      : 'border-cream-white/5 hover:border-central-orange/30'
                  }`}
                >
                  {/* Decor tag */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-coffee-brown/10 rounded-full blur-[10px]" />
                  
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-central-orange uppercase tracking-wider block">
                      {voucher.pointsCost} Points
                    </span>
                    <h3 className="font-serif text-sm font-bold text-cream-white leading-snug">
                      {voucher.title}
                    </h3>
                    <p className="text-[10px] text-cream-white/50">
                      Save ₹{voucher.discount} off your next menu order.
                    </p>
                  </div>

                  {voucher.redeemed ? (
                    <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-center flex flex-col gap-1 items-center">
                      <span className="text-[9px] font-bold uppercase text-green-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Redeemed
                      </span>
                      <span className="font-mono text-xs font-bold text-cream-white select-all">{voucher.code}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRedeem(voucher.id)}
                      disabled={!canRedeem}
                      className="w-full py-2.5 rounded-xl bg-coffee-brown/50 hover:bg-central-orange disabled:hover:bg-coffee-brown/50 text-cream-white hover:text-charcoal-black disabled:hover:text-cream-white/50 disabled:opacity-40 transition-colors font-sans text-xs font-bold flex items-center justify-center gap-2"
                    >
                      Redeem Reward
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. LOYALTY HISTORY LOG */}
        <div className="flex flex-col gap-6">
          <h2 className="font-serif text-2xl font-bold text-cream-white border-b border-cream-white/10 pb-3">
            Activity Feed
          </h2>

          <div className="flex flex-col gap-4">
            {activityList.length === 0 ? (
              <div className="text-center py-10 rounded-2xl bg-coffee-brown/5 border border-cream-white/5 text-xs text-cream-white/40">
                No active loyalty updates. Book a table or order online to earn points!
              </div>
            ) : (
              activityList.map((log, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-coffee-brown/10 border border-cream-white/5 text-xs font-sans"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-charcoal-black/40 text-central-orange border border-cream-white/5">
                      {log.icon === 'order' && <ShoppingBag className="w-3.5 h-3.5" />}
                      {log.icon === 'res' && <Calendar className="w-3.5 h-3.5" />}
                      {log.icon === 'photo' && <Camera className="w-3.5 h-3.5" />}
                      {log.icon === 'rsvp' && <Key className="w-3.5 h-3.5" />}
                    </span>
                    <div>
                      <h4 className="font-semibold text-cream-white">{log.title}</h4>
                      <p className="text-[10px] text-cream-white/40 mt-0.5">{log.date}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-central-orange neon-text-orange whitespace-nowrap">
                    {log.points}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Toast Alert */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={`fixed bottom-8 right-8 p-4 rounded-xl font-sans text-xs font-bold border flex items-center gap-2.5 shadow-2xl z-50 max-w-sm ${
                toastMessage.type === 'success' 
                  ? 'bg-green-500 text-charcoal-black border-green-600/30' 
                  : 'bg-red-500 text-cream-white border-red-600/30'
              }`}
            >
              {toastMessage.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <div>
                <span className="block font-bold">Voucher Redemption</span>
                <span className="font-normal opacity-90 block mt-0.5">{toastMessage.text}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
