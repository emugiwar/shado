"use client";
import { useState } from "react";
import * as React from "react";
import { Booking, Room } from "@/lib/types/models";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useBookingStore } from "@/lib/store/use-booking-store";
import { useToast } from "@/lib/hooks/use-toast";

export function BookingDialog({ room, initialStart, initialEnd, booking, trigger }: { room: Room; initialStart?: string; initialEnd?: string; booking?: Booking; trigger?: React.ReactNode }) {
  const { toast } = useToast();
  const createBooking = useBookingStore((s) => s.createBooking);
  const updateBooking = useBookingStore((s) => s.updateBooking);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(booking?.title ?? "جلسه جدید");
  const [startISO, setStart] = useState(booking?.startISO ?? initialStart ?? new Date().toISOString());
  const [endISO, setEnd] = useState(booking?.endISO ?? initialEnd ?? new Date(Date.now() + 3600000).toISOString());
  const [error, setError] = useState("");

  const toLocal = (iso: string) => new Date(iso).toISOString().slice(0, 16);
  const fromLocal = (value: string) => new Date(value).toISOString();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(startISO) >= new Date(endISO)) {
      setError("پایان باید بعد از زمان شروع باشد.");
      return;
    }
    const payload = { title, roomId: room.id, startISO, endISO, status: booking?.status ?? "confirmed", description: booking?.description };
    const result = booking ? updateBooking({ ...payload, id: booking.id }) : createBooking(payload);
    if (!result.ok) {
      setError(result.error || "خطا در ثبت رزرو");
      toast({ title: "رزرو ناموفق", description: result.error, variant: "destructive" });
      return;
    }
    setOpen(false);
    toast({ title: "رزرو ذخیره شد", description: `اتاق ${room.name}` });
  };

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>{trigger ?? <Button>رزرو</Button>}</DialogTrigger>
    <DialogContent>
      <DialogHeader><DialogTitle>{booking ? "ویرایش رزرو" : "رزرو اتاق"}</DialogTitle></DialogHeader>
      <Form onSubmit={onSubmit} className="space-y-3">
        <FormItem><FormLabel>عنوان جلسه</FormLabel><Input value={title} onChange={(e) => setTitle(e.target.value)} /></FormItem>
        <FormItem><FormLabel>شروع</FormLabel><Input type="datetime-local" value={toLocal(startISO)} onChange={(e) => setStart(fromLocal(e.target.value))} /></FormItem>
        <FormItem><FormLabel>پایان</FormLabel><Input type="datetime-local" value={toLocal(endISO)} onChange={(e) => setEnd(fromLocal(e.target.value))} /></FormItem>
        <FormMessage>{error}</FormMessage>
        <Button type="submit">ذخیره رزرو</Button>
      </Form>
    </DialogContent>
  </Dialog>;
}
