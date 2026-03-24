"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

const EMPTY_SENTINEL = "__empty__";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

export default function Select({ value, onChange, options }: SelectProps) {
  const hasEmptyOption = options.some((option) => option.value === "");
  const emptyOptionLabel = options.find((option) => option.value === "")?.label;
  const internalValue = value === "" && hasEmptyOption ? EMPTY_SENTINEL : value;

  return (
    <RadixSelect.Root
      value={internalValue || undefined}
      onValueChange={(nextValue) =>
        onChange(nextValue === EMPTY_SENTINEL ? "" : nextValue)
      }
    >
      <RadixSelect.Trigger className="inline-flex min-w-[160px] items-center justify-between rounded-md border border-[#dde2e8] bg-white px-3 py-2 text-sm text-[#1a1a2e]">
        <RadixSelect.Value placeholder={emptyOptionLabel} />
        <ChevronDown size={16} />
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="z-50 rounded-md border border-[#dde2e8] bg-white p-1 shadow-md">
          <RadixSelect.Viewport>
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value === "" ? EMPTY_SENTINEL : option.value}
                className="cursor-pointer rounded px-3 py-2 text-sm text-[#1a1a2e] outline-none hover:bg-brand-blue-light"
              >
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
