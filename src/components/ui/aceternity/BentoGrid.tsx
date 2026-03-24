"use client";

import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoGridItemProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  title,
  description,
  icon,
  className,
  header,
}: BentoGridItemProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-[#dde2e8] bg-[#f5f7fa] p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-md",
        className,
      )}
    >
      {header}
      {icon ? (
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f0f9] text-[#3c74ae]">
          {icon}
        </div>
      ) : null}
      <h3 className="text-xl font-semibold text-[#1a1a2e]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[#4a4a6a]">
        {description}
      </p>
    </article>
  );
}
