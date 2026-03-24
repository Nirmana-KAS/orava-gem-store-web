import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({
  src,
  alt = "ORAVA GEMS",
  className,
  width = 140,
  height = 40,
}: LogoProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn("h-auto w-auto object-contain", className)}
        priority
      />
    );
  }

  return (
    <span
      className={cn(
        "font-heading text-2xl font-semibold tracking-[0.2em] text-brand-blue",
        className,
      )}
    >
      ORAVA
    </span>
  );
}
