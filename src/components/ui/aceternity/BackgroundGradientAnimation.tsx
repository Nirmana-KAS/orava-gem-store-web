"use client";

import { cn } from "@/lib/utils";

interface BackgroundGradientAnimationProps {
  children: React.ReactNode;
  className?: string;
}

export function BackgroundGradientAnimation({
  children,
  className,
}: BackgroundGradientAnimationProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl", className)}
      style={{
        background: "linear-gradient(120deg, #3c74ae, #2d5f96, #1a4a7a)",
        backgroundSize: "200% 200%",
        animation: "gradientShift 10s ease infinite",
      }}
    >
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      {children}
    </div>
  );
}
