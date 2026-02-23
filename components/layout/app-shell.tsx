"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  ["/", "داشبورد"],
  ["/rooms", "اتاق‌ها"],
  ["/scheduler", "زمان‌بندی"],
  ["/calendar", "تقویم جلالی"],
  ["/bookings", "لیست رزروها"]
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <header className="mb-6 rounded-xl border bg-white p-4">
        <h1 className="mb-3 text-xl font-bold">سامانه رزرو اتاق جلسه</h1>
        <nav className="flex flex-wrap gap-2">
          {items.map(([href, label]) => (
            <Link key={href} href={href} className={cn("rounded-md px-3 py-2 text-sm", pathname === href ? "bg-primary text-white" : "bg-muted")}>{label}</Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
