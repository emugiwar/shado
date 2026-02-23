"use client";
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogContent = ({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/30" />
    <DialogPrimitive.Content dir="rtl" className={cn("fixed left-1/2 top-1/2 w-[95vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-5 shadow-lg", className)} {...props} />
  </DialogPrimitive.Portal>
);
export const DialogHeader = (props: React.HTMLAttributes<HTMLDivElement>) => <div className="mb-4" {...props} />;
export const DialogTitle = DialogPrimitive.Title;
