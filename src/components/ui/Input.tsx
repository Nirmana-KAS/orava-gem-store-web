"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "w-full rounded-md border border-white/20 bg-dark-elevated px-3 py-2 text-sm text-white placeholder:text-zinc-400 focus:border-gold focus:outline-none",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";

export default Input;

