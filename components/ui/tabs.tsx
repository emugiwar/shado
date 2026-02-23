"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";

export const Tabs = TabsPrimitive.Root;
export const TabsList = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) => <TabsPrimitive.List className={cn("inline-flex rounded-md bg-muted p-1", className)} {...props} />;
export const TabsTrigger = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) => <TabsPrimitive.Trigger className={cn("rounded-sm px-3 py-1.5 text-sm data-[state=active]:bg-white", className)} {...props} />;
export const TabsContent = TabsPrimitive.Content;
