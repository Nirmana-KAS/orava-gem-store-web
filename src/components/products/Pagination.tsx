"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

function pageList(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "...")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push("...");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push("...");
  out.push(total);
  return out;
}

export function Pagination({ current, total, onChange }: PaginationProps) {
  if (total <= 1) return null;
  const pages = pageList(current, total);

  return (
    <nav className="mx-auto flex max-w-[1300px] justify-center gap-1.5 px-8 pb-16 pt-3" aria-label="Pagination">
      <PageBtn disabled={current === 1} onClick={() => onChange(current - 1)}>
        <ChevronLeft className="h-3.5 w-3.5" />
      </PageBtn>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`e${i}`} className="grid h-10 min-w-[38px] place-items-center text-sm text-muted">
            ...
          </span>
        ) : (
          <PageBtn key={p} active={p === current} onClick={() => onChange(p)}>
            {p}
          </PageBtn>
        ),
      )}
      <PageBtn disabled={current === total} onClick={() => onChange(current + 1)}>
        <ChevronRight className="h-3.5 w-3.5" />
      </PageBtn>
    </nav>
  );
}

function PageBtn({
  children,
  active,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`grid h-10 min-w-[38px] place-items-center rounded-lg border px-2.5 text-sm font-medium transition-colors
        ${active
          ? "border-primary bg-primary text-white"
          : "border-line bg-white text-navy-2 hover:border-primary hover:text-primary"}
        disabled:pointer-events-none disabled:opacity-40`}
    >
      {children}
    </button>
  );
}
