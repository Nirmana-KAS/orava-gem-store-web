"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <span className="text-2xl">⚠️</span>
      </div>
      <h2 className="mb-2 font-heading text-3xl text-[#1a1a2e]">Something went wrong</h2>
      <p className="mb-6 max-w-md text-sm text-[#4a4a6a]">
        An unexpected error occurred. Please try again or contact support if the problem persists.
      </p>
      <Button onClick={() => reset()}>Try Again</Button>
    </div>
  );
}
