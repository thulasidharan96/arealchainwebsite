import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to concatenate class names conditionally
export function cn(...classes: (string | undefined | false | null)[]): string {
  return twMerge(clsx(...classes));
}
