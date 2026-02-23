"use client";
import { useToastStore } from "@/lib/hooks/use-toast";
import { cn } from "@/lib/utils";

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  return (
    <div className="fixed bottom-4 left-4 z-50 space-y-2">
      {toasts.map((t) => (
        <div key={t.id} className={cn("min-w-72 rounded-lg border bg-white p-3 shadow-lg", t.variant === "destructive" && "border-destructive") }>
          <p className="font-medium">{t.title}</p>
          {t.description && <p className="text-sm text-muted-foreground">{t.description}</p>}
        </div>
      ))}
    </div>
  );
}
