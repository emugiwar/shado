export type Room = {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  location: string;
  isActive: boolean;
};

export type BookingStatus = "confirmed" | "cancelled";

export type Booking = {
  id: string;
  roomId: string;
  title: string;
  description?: string;
  startISO: string;
  endISO: string;
  status: BookingStatus;
};
