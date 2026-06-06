// Database utility for client-side state persistence
// Fallback for Supabase data structures, making the app fully interactive out-of-the-box.

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: 'Received' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  address: string;
  phone: string;
  paymentMethod: string;
  createdAt: string;
}

export interface LoyaltyProfile {
  points: number;
  tier: 'Friend' | 'regular' | 'VIP' | 'Central Perk Icon';
  memberSince: string;
  name: string;
  email: string;
  vouchers: { id: string; code: string; title: string; discount: number; pointsCost: number; redeemed: boolean }[];
}

export interface RSVP {
  id: string;
  eventName: string;
  name: string;
  email: string;
  guests: number;
  createdAt: string;
}

export interface PhotoBoothBooking {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  theme: string;
  createdAt: string;
}

// Helpers for localStorage
const isBrowser = typeof window !== 'undefined';

const getLocal = <T>(key: string, defaultValue: T): T => {
  if (!isBrowser) return defaultValue;
  const data = localStorage.getItem(`central_perk_${key}`);
  return data ? JSON.parse(data) : defaultValue;
};

const setLocal = <T>(key: string, value: T): void => {
  if (isBrowser) {
    localStorage.setItem(`central_perk_${key}`, JSON.stringify(value));
  }
};

// Initial state for loyalty
const INITIAL_LOYALTY: LoyaltyProfile = {
  points: 150, // Give them 150 points to start with so they can explore
  tier: 'regular',
  memberSince: 'June 2026',
  name: 'Rachel Green',
  email: 'rachel@centralperk.com',
  vouchers: [
    { id: '1', code: 'GUNTHER50', title: 'Free Gunther\'s Cappuccino', discount: 189, pointsCost: 100, redeemed: false },
    { id: '2', code: 'JOEYFEAST', title: '₹100 Off Joey\'s Double Cheeseburger', discount: 100, pointsCost: 150, redeemed: false },
    { id: '3', code: 'MONICATREAT', title: '20% Off Monica\'s Desserts', discount: 150, pointsCost: 200, redeemed: false },
  ]
};

export const db = {
  // RESERVATIONS
  getReservations: (): Reservation[] => getLocal<Reservation[]>('reservations', []),
  addReservation: (res: Omit<Reservation, 'id' | 'createdAt'>): Reservation => {
    const list = db.getReservations();
    const newRes: Reservation = {
      ...res,
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString()
    };
    list.unshift(newRes);
    setLocal('reservations', list);
    
    // Add loyalty points for booking a table!
    db.updateLoyaltyPoints(50, 'Table Reservation Bonus');
    
    return newRes;
  },

  // ORDERS
  getOrders: (): Order[] => getLocal<Order[]>('orders', []),
  createOrder: (items: OrderItem[], total: number, details: { address: string; phone: string; paymentMethod: string }): Order => {
    const list = db.getOrders();
    const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
    const tax = Math.round(subtotal * 0.05); // 5% GST
    const deliveryFee = subtotal > 500 ? 0 : 40; // Free delivery over ₹500
    
    const newOrder: Order = {
      id: `CP-${Math.floor(100000 + Math.random() * 900000)}`,
      items,
      subtotal,
      tax,
      deliveryFee,
      total: subtotal + tax + deliveryFee,
      status: 'Received',
      address: details.address,
      phone: details.phone,
      paymentMethod: details.paymentMethod,
      createdAt: new Date().toISOString()
    };
    
    list.unshift(newOrder);
    setLocal('orders', list);

    // Add loyalty points for ordering (1 point per ₹10 spent)
    const pointsEarned = Math.floor(newOrder.total / 10);
    db.updateLoyaltyPoints(pointsEarned, `Order ${newOrder.id} Reward`);

    // Simulate order progress
    if (isBrowser) {
      setTimeout(() => {
        db.updateOrderStatus(newOrder.id, 'Preparing');
        setTimeout(() => {
          db.updateOrderStatus(newOrder.id, 'Out for Delivery');
          setTimeout(() => {
            db.updateOrderStatus(newOrder.id, 'Delivered');
          }, 30000); // 30s to delivery
        }, 20000); // 20s to out for delivery
      }, 10000); // 10s to preparation
    }

    return newOrder;
  },
  getOrder: (id: string): Order | undefined => {
    return db.getOrders().find(o => o.id === id);
  },
  updateOrderStatus: (id: string, status: Order['status']): void => {
    const list = db.getOrders();
    const order = list.find(o => o.id === id);
    if (order) {
      order.status = status;
      setLocal('orders', list);
      // Dispatch custom event for real-time tracking update
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('order-status-update', { detail: { id, status } }));
      }
    }
  },

  // LOYALTY REWARDS
  getLoyaltyProfile: (): LoyaltyProfile => getLocal<LoyaltyProfile>('loyalty', INITIAL_LOYALTY),
  updateLoyaltyPoints: (amount: number, reason: string): LoyaltyProfile => {
    const profile = db.getLoyaltyProfile();
    profile.points = Math.max(0, profile.points + amount);
    
    // Recalculate Tier
    if (profile.points >= 500) {
      profile.tier = 'Central Perk Icon';
    } else if (profile.points >= 300) {
      profile.tier = 'VIP';
    } else if (profile.points >= 150) {
      profile.tier = 'regular';
    } else {
      profile.tier = 'Friend';
    }
    
    setLocal('loyalty', profile);
    
    // Dispatch custom event for real-time UI updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('loyalty-update', { detail: profile }));
    }
    
    return profile;
  },
  redeemVoucher: (voucherId: string): { success: boolean; code?: string; message: string } => {
    const profile = db.getLoyaltyProfile();
    const voucher = profile.vouchers.find(v => v.id === voucherId);
    
    if (!voucher) return { success: false, message: 'Voucher not found.' };
    if (voucher.redeemed) return { success: false, message: 'Voucher already redeemed.' };
    if (profile.points < voucher.pointsCost) return { success: false, message: 'Not enough loyalty points.' };
    
    profile.points -= voucher.pointsCost;
    voucher.redeemed = true;
    
    setLocal('loyalty', profile);
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('loyalty-update', { detail: profile }));
    }
    
    return { success: true, code: voucher.code, message: `Successfully redeemed! Use code ${voucher.code}.` };
  },

  // RSVPs
  getRSVPs: (): RSVP[] => getLocal<RSVP[]>('rsvps', []),
  addRSVP: (rsvp: Omit<RSVP, 'id' | 'createdAt'>): RSVP => {
    const list = db.getRSVPs();
    const newRsvp: RSVP = {
      ...rsvp,
      id: `RSVP-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString()
    };
    list.unshift(newRsvp);
    setLocal('rsvps', list);
    
    // Add loyalty points for RSVP
    db.updateLoyaltyPoints(20, `RSVP: ${rsvp.eventName}`);
    
    return newRsvp;
  },

  // PHOTO BOOTH
  getPhotoBoothBookings: (): PhotoBoothBooking[] => getLocal<PhotoBoothBooking[]>('photobooth', []),
  addPhotoBoothBooking: (booking: Omit<PhotoBoothBooking, 'id' | 'createdAt'>): PhotoBoothBooking => {
    const list = db.getPhotoBoothBookings();
    const newBooking: PhotoBoothBooking = {
      ...booking,
      id: `PB-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString()
    };
    list.unshift(newBooking);
    setLocal('photobooth', list);
    
    // Add loyalty points for photo booking
    db.updateLoyaltyPoints(40, 'Photo Booth Booking');
    
    return newBooking;
  }
};
