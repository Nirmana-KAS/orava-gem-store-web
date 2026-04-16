"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon";
  className?: string;
  height?: number;
  width?: number;
  sizes?: string;
}

export function Logo({
  variant = "full",
  className,
  height = 40,
  width,
  sizes,
}: LogoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      {!failed ? (
        <Image
          src="https://res.cloudinary.com/dafsnkkux/image/upload/v1776302247/orava-logo_ft6zps.png"
          alt="ORAVA Gems"
          width={width ?? (variant === "icon" ? 40 : 140)}
          height={height}
          sizes={
            sizes ??
            (variant === "icon" ? "40px" : "(max-width: 640px) 120px, 140px")
          }
          className="object-contain"
          priority
          onError={() => setFailed(true)}
        />
      ) : null}
      {failed ? (
        <span className="font-heading text-2xl font-bold text-[#3c74ae]">
          ORAVA
          <span className="text-lg font-normal text-[#8f8b8f]"> GEMS</span>
        </span>
      ) : null}
    </Link>
  );
}

export default Logo;
