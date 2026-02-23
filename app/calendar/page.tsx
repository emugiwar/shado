"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { formatJalaliMonth, jalaliMonthDays, startOfJalaliMonth, weekdaysFa } from "@/lib/jalali";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function CalendarPage() {
  const [cursor, setCursor] = useState(new Date());
  const monthStart = useMemo(() => startOfJalaliMonth(cursor), [cursor]);
  const days = useMemo(() => jalaliMonthDays(cursor), [cursor]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <Button variant="outline" onClick={() => setCursor(monthStart.subtract(1, "month").toDate())}>ماه قبل</Button>
        <CardTitle>{formatJalaliMonth(cursor)}</CardTitle>
        <Button variant="outline" onClick={() => setCursor(monthStart.add(1, "month").toDate())}>ماه بعد</Button>
      </CardHeader>
      <CardContent>
        <div className="mb-2 grid grid-cols-7 gap-2">{weekdaysFa.map((w) => <div key={w} className="text-center text-sm font-medium">{w}</div>)}</div>
        <TooltipProvider>
          <div className="grid grid-cols-7 gap-2">
            {days.map((d) => {
              const iso = d.calendar("gregory").format("YYYY-MM-DD");
              return (
                <Tooltip key={iso}>
                  <TooltipTrigger asChild>
                    <Link href={`/scheduler?day=${iso}`} className="rounded-lg border p-3 text-center hover:bg-muted">
                      {d.format("D")}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>رفتن به زمان‌بندی این روز</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
