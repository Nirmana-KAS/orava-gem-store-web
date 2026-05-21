"use client";

import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

interface DropdownProps {
  label: string;
  value: string | null;
  options: readonly string[];
  onChange: (v: string | null) => void;
  placeholder: string;
}

export function Dropdown({ label, value, options, onChange, placeholder }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const hasValue = !!value;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          data-state={open ? "open" : "closed"}
          className={`group relative w-full rounded-[10px] border px-3.5 py-2 text-left shadow-sm transition-colors
            ${hasValue ? "border-primary bg-primary-softer" : "border-line bg-white hover:border-primary"}
            data-[state=open]:border-primary data-[state=open]:shadow-[0_0_0_3px_rgba(60,116,174,0.12)]`}
        >
          <span
            className={`block text-[10px] font-semibold uppercase tracking-[0.14em] ${
              hasValue ? "text-primary" : "text-muted"
            }`}
          >
            {label}
          </span>
          <span className="flex items-center justify-between gap-2">
            <span
              className={`truncate text-sm ${hasValue ? "font-medium text-navy" : "text-muted"}`}
            >
              {value ?? placeholder}
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                open ? "rotate-180 text-primary" : "text-muted"
              }`}
            />
          </span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          className="z-50 max-h-[280px] w-[var(--radix-popover-trigger-width)] overflow-y-auto rounded-[10px] border border-line bg-white p-1.5 shadow-[0_30px_60px_-25px_rgba(28,52,90,.25),0_8px_20px_-10px_rgba(28,52,90,.12)]"
        >
          <DropdownOption
            label={placeholder}
            active={!hasValue}
            onClick={() => {
              onChange(null);
              setOpen(false);
            }}
          />
          {options.map((opt) => (
            <DropdownOption
              key={opt}
              label={opt}
              active={value === opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            />
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function DropdownOption({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-[13px] transition-colors
        ${active ? "bg-primary-soft font-semibold text-primary" : "text-navy hover:bg-primary-softer"}`}
    >
      <span>{label}</span>
      {active && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
    </button>
  );
}
