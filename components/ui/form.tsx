import * as React from "react";
import { cn } from "@/lib/utils";

export const Form = ({ children, ...props }: React.FormHTMLAttributes<HTMLFormElement>) => <form {...props}>{children}</form>;
export const FormItem = ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={cn("space-y-1", className)}>{children}</div>;
export const FormLabel = ({ children }: { children: React.ReactNode }) => <label className="text-sm font-medium">{children}</label>;
export const FormMessage = ({ children }: { children?: React.ReactNode }) => children ? <p className="text-xs text-destructive">{children}</p> : null;
