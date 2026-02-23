"use client";

import { useMemo, useState } from "react";
import { useBookingStore } from "@/lib/store/use-booking-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatJalaliDate } from "@/lib/jalali";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { BookingDialog } from "@/components/features/booking-dialog";
import { Input } from "@/components/ui/input";

export default function BookingsPage() {
  const rooms = useBookingStore((s) => s.rooms);
  const bookings = useBookingStore((s) => s.bookings);
  const cancelBooking = useBookingStore((s) => s.cancelBooking);
  const [roomId, setRoomId] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = useMemo(() => bookings.filter((b) => {
    const start = new Date(b.startISO).getTime();
    const f = from ? new Date(from).getTime() : -Infinity;
    const t = to ? new Date(to).getTime() : Infinity;
    return (roomId === "all" || b.roomId === roomId) && start >= f && start <= t;
  }), [bookings, roomId, from, to]);

  return (
    <Card>
      <CardHeader><CardTitle>لیست رزروها</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">همه</TabsTrigger>
            <TabsTrigger value="confirmed">تاییدشده</TabsTrigger>
            <TabsTrigger value="cancelled">لغوشده</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-3">
            <div className="grid gap-2 md:grid-cols-4">
              <Select value={roomId} onValueChange={setRoomId}>
                <SelectTrigger><SelectValue placeholder="اتاق" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه اتاق‌ها</SelectItem>
                  {rooms.map((r) => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
              <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
            <Separator />
            <Table>
              <TableHeader><TableRow><TableHead>عنوان</TableHead><TableHead>اتاق</TableHead><TableHead>تاریخ</TableHead><TableHead>وضعیت</TableHead><TableHead>عملیات</TableHead></TableRow></TableHeader>
              <TableBody>
                {filtered.map((b) => {
                  const room = rooms.find((r) => r.id === b.roomId);
                  return <TableRow key={b.id}><TableCell>{b.title}</TableCell><TableCell>{room?.name}</TableCell><TableCell>{formatJalaliDate(b.startISO, "YYYY/MM/DD HH:mm")}</TableCell><TableCell>{b.status === "confirmed" ? "تاییدشده" : "لغوشده"}</TableCell><TableCell><div className="flex gap-2"><BookingDialog room={room!} booking={b} trigger={<Button size="sm" variant="outline">ویرایش</Button>} /><Button size="sm" variant="destructive" onClick={() => cancelBooking(b.id)}>لغو</Button></div></TableCell></TableRow>;
                })}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="confirmed" />
          <TabsContent value="cancelled" />
        </Tabs>
      </CardContent>
    </Card>
  );
}
