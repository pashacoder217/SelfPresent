import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatBytes = (
  bytes: number,
  opts: {
    decimals?: number,
    sizeType?: "accurate" | "normal"
  } = {}
) => {
 const { decimals = 0, sizeType = "normal" } = opts;
 const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
 const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
 
 if (bytes === 0) return "0 Byte";

 const i = Math.floor(Math.log(bytes) / Math.log(1024));
 return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
  sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
 }`;
}

export const absoluteUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_SITE_URL}${path}`;
}
export const composeEventHandlers = <E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) => {
  return function handleEvent(event: E) {
    originalEventHandler?.(event)

    if (
      checkForDefaultPrevented === false ||
      !(event as unknown as Event).defaultPrevented
    ) {
      return ourEventHandler?.(event)
    }
  }
}