import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "default" | "success" | "danger" | "warning";
}

const tones = {
  default: "bg-white/10 text-white",
  success: "bg-green-600/20 text-green-400 border border-green-500/40",
  danger: "bg-red-600/20 text-red-400 border border-red-500/40",
  warning: "bg-yellow-600/20 text-yellow-300 border border-yellow-500/40",
};

export default function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return <span className={cn("inline-flex rounded-full px-2 py-1 text-xs", tones[tone], className)} {...props} />;
}

