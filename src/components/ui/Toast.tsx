"use client";

export function toast(message: string): void {
  const handler = (window as Window & { __oravaToast?: (msg: string) => void }).__oravaToast;
  if (handler) handler(message);
}

