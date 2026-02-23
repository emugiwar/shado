"use client";
import { useState } from "react";
import { Room } from "@/lib/types/models";
import { useBookingStore } from "@/lib/store/use-booking-store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const equipmentOptions = ["ویدئو پروژکتور", "وایت‌برد", "نمایشگر 4K", "سیستم کنفرانس", "تلویزیون"];

export function RoomDialog({ room, triggerLabel = "افزودن اتاق" }: { room?: Room; triggerLabel?: string }) {
  const upsertRoom = useBookingStore((s) => s.upsertRoom);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(room?.name ?? "");
  const [capacity, setCapacity] = useState(room?.capacity?.toString() ?? "");
  const [location, setLocation] = useState(room?.location ?? "");
  const [equipment, setEquipment] = useState<string[]>(room?.equipment ?? []);
  const [error, setError] = useState("");

  const toggleEq = (item: string) => setEquipment((prev) => prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant={room ? "outline" : "default"}>{triggerLabel}</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{room ? "ویرایش اتاق" : "ایجاد اتاق جدید"}</DialogTitle></DialogHeader>
        <Form onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim() || !capacity) return setError("نام اتاق و ظرفیت الزامی است.");
          upsertRoom({ id: room?.id, name, capacity: Number(capacity), location, equipment, isActive: true });
          setOpen(false);
        }} className="space-y-3">
          <FormItem><FormLabel>نام اتاق</FormLabel><Input value={name} onChange={(e) => setName(e.target.value)} /></FormItem>
          <FormItem><FormLabel>ظرفیت</FormLabel><Input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} /></FormItem>
          <FormItem><FormLabel>موقعیت</FormLabel><Input value={location} onChange={(e) => setLocation(e.target.value)} /></FormItem>
          <FormItem>
            <FormLabel>تجهیزات</FormLabel>
            <div className="flex flex-wrap gap-2">
              {equipmentOptions.map((item) => (
                <button type="button" key={item} onClick={() => toggleEq(item)}><Badge className={equipment.includes(item) ? "bg-primary text-white" : ""}>{item}</Badge></button>
              ))}
            </div>
          </FormItem>
          <FormMessage>{error}</FormMessage>
          <Button type="submit">ذخیره</Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
