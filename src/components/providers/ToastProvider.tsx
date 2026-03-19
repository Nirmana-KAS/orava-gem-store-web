"use client";

import * as Toast from "@radix-ui/react-toast";
import { ReactNode, useState } from "react";

interface ToastProviderProps {
  children: ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");

  if (typeof window !== "undefined") {
    (window as Window & { __oravaToast?: (msg: string) => void }).__oravaToast = (msg: string) => {
      setMessage(msg);
      setOpen(true);
    };
  }

  return (
    <Toast.Provider swipeDirection="right">
      {children}
      <Toast.Root
        className="rounded-md border border-gold bg-dark-elevated px-4 py-3 text-sm text-white shadow-lg"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Description>{message}</Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-4 right-4 z-50 flex w-96 max-w-[95vw] flex-col gap-2 outline-none" />
    </Toast.Provider>
  );
}

