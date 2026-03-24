"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "w-full rounded-md border border-[#dde2e8] bg-white px-3 py-2 text-sm text-[#1a1a2e] placeholder:text-[#8f8b8f] focus:border-brand-blue focus:outline-none",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";

export default Input;
