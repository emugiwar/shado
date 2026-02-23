"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/lib/store/use-booking-store";
import { formatJalaliDate } from "@/lib/jalali";

export default function DashboardPage() {
  const bookings = useBookingStore((s) => s.bookings.filter((b) => b.status === "confirmed"));
  const today = new Date();
  const todayList = bookings.filter((b) => new Date(b.startISO).toDateString() === today.toDateString());

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle>خلاصه رزروهای امروز</CardTitle></CardHeader>
        <CardContent>
          {todayList.length === 0 ? <p className="text-muted-foreground">برای امروز رزروی ثبت نشده است.</p> : (
            <ul className="space-y-2">
              {todayList.map((b) => <li key={b.id} className="rounded-md border p-3">{b.title} - {formatJalaliDate(b.startISO, "HH:mm")} تا {formatJalaliDate(b.endISO, "HH:mm")}</li>)}
            </ul>
          )}
          <Link href="/scheduler" className="mt-4 inline-block"><Button>رزرو سریع</Button></Link>
        </CardContent>
      </Card>
    </div>
  );
}
