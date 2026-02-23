import { cn } from "@/lib/utils";
import { HTMLAttributes, TableHTMLAttributes } from "react";

export const Table = (props: TableHTMLAttributes<HTMLTableElement>) => <table {...props} className={cn("w-full text-sm", props.className)} />;
export const TableHead = (props: HTMLAttributes<HTMLTableCellElement>) => <th {...props} className={cn("px-3 py-2 text-right font-medium text-muted-foreground", props.className)} />;
export const TableRow = (props: HTMLAttributes<HTMLTableRowElement>) => <tr {...props} className={cn("border-b", props.className)} />;
export const TableCell = (props: HTMLAttributes<HTMLTableCellElement>) => <td {...props} className={cn("px-3 py-2", props.className)} />;
export const TableHeader = (props: HTMLAttributes<HTMLTableSectionElement>) => <thead {...props} />;
export const TableBody = (props: HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />;
