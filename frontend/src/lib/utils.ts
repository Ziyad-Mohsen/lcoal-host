import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from "luxon";

export type FileSizeUnit = "B" | "KB" | "MB" | "GB" | "TB";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(
  bytes: number,
  decimalCount = 2,
  unit?: FileSizeUnit,
) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return `0 ${unit || "B"}`;
  }

  const units: FileSizeUnit[] = ["B", "KB", "MB", "GB", "TB"];
  const base = 1024;

  let unitIndex = 0;

  if (unit) {
    unitIndex = units.indexOf(unit);
  } else {
    unitIndex = Math.floor(Math.log(bytes) / Math.log(base));
  }

  unitIndex = Math.min(unitIndex, units.length - 1);

  const value = bytes / Math.pow(base, unitIndex);

  return `${value.toFixed(decimalCount)} ${units[unitIndex]}`;
}

export const formatRelativeDate = (timeStamp: number) =>
  DateTime.fromMillis(timeStamp).toRelative();

export const joinPath = (segments: string[], relative: boolean = false) => {
  return (relative ? "" : "/") + segments.join("/");
};
