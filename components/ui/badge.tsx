import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs", className)} {...props} />;
}
