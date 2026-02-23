"use client";
import { useMemo, useState } from "react";
import { useBookingStore } from "@/lib/store/use-booking-store";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RoomDialog } from "@/components/features/room-dialog";

export default function RoomsPage() {
  const rooms = useBookingStore((s) => s.rooms);
  const [search, setSearch] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const filtered = useMemo(() => rooms.filter((r) => {
    return r.name.includes(search) && (!capacity || r.capacity >= Number(capacity)) && (!location || r.location.includes(location));
  }), [rooms, search, capacity, location]);

  return <Card>
    <CardHeader className="flex flex-row items-center justify-between gap-3">
      <CardTitle>مدیریت اتاق‌ها</CardTitle>
      <RoomDialog />
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="grid gap-2 md:grid-cols-3">
        <Input placeholder="جستجو نام اتاق" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Input placeholder="حداقل ظرفیت" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        <Input placeholder="فیلتر موقعیت" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <Table><TableHeader><TableRow><TableHead>نام</TableHead><TableHead>ظرفیت</TableHead><TableHead>تجهیزات</TableHead><TableHead>موقعیت</TableHead><TableHead>عملیات</TableHead></TableRow></TableHeader>
      <TableBody>{filtered.map((r) => <TableRow key={r.id}><TableCell>{r.name}</TableCell><TableCell>{r.capacity}</TableCell><TableCell><div className="flex flex-wrap gap-1">{r.equipment.map((e) => <Badge key={e}>{e}</Badge>)}</div></TableCell><TableCell>{r.location}</TableCell><TableCell><RoomDialog room={r} triggerLabel="ویرایش" /></TableCell></TableRow>)}</TableBody></Table>
    </CardContent>
  </Card>;
}
