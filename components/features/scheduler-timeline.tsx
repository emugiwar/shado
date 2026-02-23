"use client";
import { useMemo, useState } from "react";
import { useBookingStore } from "@/lib/store/use-booking-store";
import { BookingDialog } from "@/components/features/booking-dialog";
import { formatJalaliDate } from "@/lib/jalali";
import { Badge } from "@/components/ui/badge";

const DAY_START = 0;
const DAY_END = 24;

export function SchedulerTimeline({ date }: { date: Date }) {
  const rooms = useBookingStore((s) => s.rooms);
  const bookings = useBookingStore((s) => s.bookings.filter((b) => b.status === "confirmed"));
  const [draft, setDraft] = useState<{ roomId: string; startHour: number; endHour: number } | null>(null);
  const [dragging, setDragging] = useState<{ roomId: string; startHour: number } | null>(null);

  const todayBookings = useMemo(() => bookings.filter((b) => new Date(b.startISO).toDateString() === date.toDateString()), [bookings, date]);
  const hourMarkers = Array.from({ length: 25 }).map((_, i) => i);

  const hourToISO = (hour: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), Math.floor(hour), (hour % 1) * 60).toISOString();

  const nowPercent = (() => {
    const now = new Date();
    if (now.toDateString() !== date.toDateString()) return null;
    return ((now.getHours() + now.getMinutes() / 60) / 24) * 100;
  })();

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{formatJalaliDate(date)} — رزرو در ۳ گام: انتخاب بازه، تکمیل فرم، ذخیره.</p>
      <div className="overflow-auto rounded-lg border">
        <div className="min-w-[980px]">
          <div className="relative grid grid-cols-[180px_1fr] border-b bg-muted/40">
            <div className="p-2 font-medium">اتاق / ساعت</div>
            <div className="grid" style={{ gridTemplateColumns: "repeat(24, minmax(0,1fr))" }}>{hourMarkers.slice(0, 24).map((h) => <div key={h} className="border-r p-2 text-xs">{`${h}:00`}</div>)}</div>
          </div>
          {rooms.map((room) => {
            const roomBookings = todayBookings.filter((b) => b.roomId === room.id);
            return (
              <div key={room.id} className="relative grid grid-cols-[180px_1fr] border-b">
                <div className="p-2"><p className="font-medium">{room.name}</p><p className="text-xs text-muted-foreground">{room.location}</p></div>
                <div
                  className="timeline-grid relative h-20"
                  onMouseDown={(e) => {
                    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                    const hour = ((rect.right - e.clientX) / rect.width) * 24;
                    setDragging({ roomId: room.id, startHour: Math.max(DAY_START, Math.min(DAY_END, hour)) });
                  }}
                  onMouseMove={(e) => {
                    if (!dragging || dragging.roomId !== room.id) return;
                    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                    const hour = ((rect.right - e.clientX) / rect.width) * 24;
                    const startHour = Math.min(dragging.startHour, hour);
                    const endHour = Math.max(dragging.startHour, hour);
                    setDraft({ roomId: room.id, startHour, endHour });
                  }}
                  onMouseUp={() => setDragging(null)}
                  onMouseLeave={() => setDragging(null)}
                >
                  {roomBookings.map((b) => {
                    const s = new Date(b.startISO);
                    const e = new Date(b.endISO);
                    const left = ((s.getHours() + s.getMinutes() / 60) / 24) * 100;
                    const width = (((e.getTime() - s.getTime()) / 3600000) / 24) * 100;
                    return <BookingDialog key={b.id} room={room} booking={b} trigger={<button className="absolute top-2 h-12 rounded bg-primary/90 px-2 text-right text-xs text-white" style={{ left: `${left}%`, width: `${width}%` }}><p>{b.title}</p><p>{formatJalaliDate(b.startISO, "HH:mm")} - {formatJalaliDate(b.endISO, "HH:mm")}</p></button>} />;
                  })}
                  {draft?.roomId === room.id && (
                    <div className="absolute top-2 h-12 rounded border-2 border-dashed border-primary/70 bg-primary/20" style={{ left: `${(draft.startHour / 24) * 100}%`, width: `${((draft.endHour - draft.startHour) / 24) * 100}%` }} />
                  )}
                  {draft?.roomId === room.id && !dragging && (draft.endHour - draft.startHour > 0.2) && (
                    <div className="absolute bottom-1 left-1">
                      <BookingDialog
                        room={room}
                        initialStart={hourToISO(draft.startHour)}
                        initialEnd={hourToISO(draft.endHour)}
                        trigger={<Badge className="cursor-pointer bg-primary text-white">ثبت رزرو این بازه</Badge>}
                      />
                    </div>
                  )}
                  {nowPercent !== null && <div className="absolute bottom-0 top-0 w-0.5 bg-destructive" style={{ left: `${nowPercent}%` }} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
