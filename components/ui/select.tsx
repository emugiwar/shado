"use client";
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;
export const SelectTrigger = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) => <SelectPrimitive.Trigger className={cn("flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm", className)} {...props} />;
export const SelectContent = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content dir="rtl" className={cn("z-50 rounded-md border bg-white p-1 shadow-md", className)} {...props} />
  </SelectPrimitive.Portal>
);
export const SelectItem = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) => <SelectPrimitive.Item className={cn("cursor-pointer rounded px-2 py-1.5 text-sm hover:bg-muted", className)} {...props} />;
