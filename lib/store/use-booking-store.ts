"use client";

import { create } from "zustand";
import { Booking, Room } from "@/lib/types/models";

const initialRooms: Room[] = [
  { id: "r1", name: "اتاق البرز", capacity: 8, equipment: ["ویدئو پروژکتور", "وایت‌برد"], location: "طبقه ۲", isActive: true },
  { id: "r2", name: "اتاق دماوند", capacity: 14, equipment: ["نمایشگر 4K", "سیستم کنفرانس"], location: "طبقه ۴", isActive: true },
  { id: "r3", name: "اتاق زاگرس", capacity: 6, equipment: ["تلویزیون"], location: "طبقه ۱", isActive: true }
];

const now = new Date();
const today8 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 30).toISOString();
const today10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0).toISOString();

const initialBookings: Booking[] = [
  { id: "b1", roomId: "r1", title: "جلسه برنامه‌ریزی", startISO: today8, endISO: today10, status: "confirmed", description: "هماهنگی تیم محصول" }
];

type BookingInput = Omit<Booking, "id">;

type State = {
  rooms: Room[];
  bookings: Booking[];
  upsertRoom: (room: Omit<Room, "id"> & { id?: string }) => void;
  createBooking: (booking: BookingInput) => { ok: boolean; error?: string };
  updateBooking: (booking: Booking) => { ok: boolean; error?: string };
  cancelBooking: (id: string) => void;
  hasOverlap: (roomId: string, startISO: string, endISO: string, ignoreId?: string) => boolean;
};

export const useBookingStore = create<State>((set, get) => ({
  rooms: initialRooms,
  bookings: initialBookings,
  upsertRoom: (room) =>
    set((state) => {
      if (room.id) {
        return { rooms: state.rooms.map((r) => (r.id === room.id ? { ...r, ...room } : r)) };
      }
      return { rooms: [...state.rooms, { ...room, id: crypto.randomUUID() }] };
    }),
  hasOverlap: (roomId, startISO, endISO, ignoreId) => {
    const start = new Date(startISO).getTime();
    const end = new Date(endISO).getTime();
    return get().bookings.some((b) => {
      if (b.status === "cancelled" || b.roomId !== roomId || b.id === ignoreId) return false;
      const existingStart = new Date(b.startISO).getTime();
      const existingEnd = new Date(b.endISO).getTime();
      return start < existingEnd && end > existingStart;
    });
  },
  createBooking: (booking) => {
    if (get().hasOverlap(booking.roomId, booking.startISO, booking.endISO)) {
      return { ok: false, error: "این بازه زمانی با رزرو دیگری هم‌پوشانی دارد." };
    }
    set((state) => ({ bookings: [...state.bookings, { ...booking, id: crypto.randomUUID() }] }));
    return { ok: true };
  },
  updateBooking: (booking) => {
    if (get().hasOverlap(booking.roomId, booking.startISO, booking.endISO, booking.id)) {
      return { ok: false, error: "زمان انتخابی با رزرو موجود تداخل دارد." };
    }
    set((state) => ({ bookings: state.bookings.map((b) => (b.id === booking.id ? booking : b)) }));
    return { ok: true };
  },
  cancelBooking: (id) => set((state) => ({ bookings: state.bookings.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)) }))
}));
