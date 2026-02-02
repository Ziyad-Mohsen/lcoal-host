import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function bytesToGb(bytes: number, decimalCount: number = 2) {
  return (bytes / Math.pow(1024, 3)).toFixed(decimalCount);
}
