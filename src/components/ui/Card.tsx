import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#dde2e8] bg-white p-4 shadow-sm transition hover:shadow-md",
        className,
      )}
      {...props}
    />
  );
}
