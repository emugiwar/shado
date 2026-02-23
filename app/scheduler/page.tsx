"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SchedulerTimeline } from "@/components/features/scheduler-timeline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SchedulerPage() {
  const searchParams = useSearchParams();
  const [day, setDay] = useState(new Date());

  useEffect(() => {
    const q = searchParams.get("day");
    if (q) setDay(new Date(q));
  }, [searchParams]);
  const localISO = useMemo(() => day.toISOString().slice(0, 10), [day]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => setDay((d) => new Date(d.getTime() - 86400000))}>روز قبل</Button>
        <Input type="date" value={localISO} onChange={(e) => setDay(new Date(e.target.value))} className="max-w-44" />
        <Button variant="outline" onClick={() => setDay((d) => new Date(d.getTime() + 86400000))}>روز بعد</Button>
      </div>
      <SchedulerTimeline date={day} />
    </div>
  );
}
