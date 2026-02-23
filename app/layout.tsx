import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { Toaster } from "@/components/ui/toaster";

const vazirmatn = Vazirmatn({ subsets: ["arabic"], variable: "--font-vazir" });

export const metadata: Metadata = {
  title: "رزرو اتاق جلسه",
  description: "سامانه RTL رزرو اتاق جلسه با تقویم جلالی"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable} font-sans`}>
        <AppShell>{children}</AppShell>
        <Toaster />
      </body>
    </html>
  );
}
