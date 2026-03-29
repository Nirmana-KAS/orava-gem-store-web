"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Loader2, Plus, X } from "lucide-react";

interface SmartDropdownProps {
  fieldType: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  showAllOption?: boolean;
  allOptionLabel?: string;
  readOnly?: boolean;
}

interface FieldValueItem {
  id: string;
  fieldType: string;
  value: string;
  createdAt: string;
}

export function SmartDropdown({
  fieldType,
  label,
  value,
  onChange,
  placeholder = "Select or add...",
  required = false,
  className = "",
  disabled = false,
  showAllOption = false,
  allOptionLabel = "All",
  readOnly = false,
}: SmartDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const [addingCustom, setAddingCustom] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);

  const fetchOptions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/field-values?field=${encodeURIComponent(fieldType)}`,
      );
      const data = (await response.json()) as {
        success: boolean;
        data?: FieldValueItem[];
      };

      if (data.success && Array.isArray(data.data)) {
        setOptions(data.data.map((item) => item.value));
      } else {
        setOptions([]);
      }
    } catch {
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, [fieldType]);

  useEffect(() => {
    void fetchOptions();
  }, [fetchOptions]);

  useEffect(() => {
    if (showCustomInput && customInputRef.current) {
      customInputRef.current.focus();
    }
  }, [showCustomInput]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closePanel();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function closePanel() {
    setIsOpen(false);
    setShowCustomInput(false);
    setCustomValue("");
    setSearchQuery("");
    setError("");
  }

  async function handleAddCustom() {
    if (readOnly) return;

    const trimmed = customValue.trim();
    if (!trimmed) {
      setError("Please enter a value");
      return;
    }

    if (trimmed.length > 100) {
      setError("Value too long - max 100 characters");
      return;
    }

    if (options.includes(trimmed)) {
      onChange(trimmed);
      closePanel();
      return;
    }

    setAddingCustom(true);
    setError("");
    try {
      const response = await fetch("/api/field-values", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fieldType, value: trimmed }),
      });
      const data = (await response.json()) as {
        success: boolean;
        data?: FieldValueItem;
        error?: string;
      };

      if (data.success) {
        setOptions((prev) => {
          if (prev.includes(trimmed)) return prev;
          return [...prev, trimmed];
        });
        onChange(trimmed);
        closePanel();
      } else {
        setError(data.error ?? "Failed to add value");
      }
    } catch {
      setError("Network error - please try again");
    } finally {
      setAddingCustom(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      void handleAddCustom();
    }
    if (event.key === "Escape") {
      setShowCustomInput(false);
      setCustomValue("");
      setError("");
    }
  }

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label ? (
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#1a1a2e]">
          {label}
          {required ? <span className="ml-1 text-red-500">*</span> : null}
        </label>
      ) : null}

      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          setIsOpen((prev) => !prev);
          setShowCustomInput(false);
          setCustomValue("");
          setError("");
          setSearchQuery("");
        }}
        className={`w-full flex items-center cursor-pointer rounded-xl border px-3 py-2.5 text-left text-sm transition-all duration-200 h-[38px] ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        } ${
          isOpen
            ? "border-[#3c74ae] bg-white ring-2 ring-[#3c74ae]/20"
            : "border-[#dde2e8] bg-white hover:border-[#3c74ae]/50"
        } ${!value ? "text-[#8f8b8f]" : "font-medium text-[#1a1a2e]"}`}
      >
        <span className="flex-1 truncate text-left">
          {loading ? "Loading..." : value || placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`ml-auto flex-shrink-0 text-[#8f8b8f] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-[200] mt-1 overflow-hidden rounded-xl border border-[#dde2e8] bg-white shadow-xl"
          >
            {options.length > 5 ? (
              <div className="border-b border-[#dde2e8] p-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full rounded-lg border border-[#dde2e8] bg-[#f5f7fa] px-3 py-1.5 text-sm text-[#1a1a2e] outline-none transition-colors placeholder:text-[#8f8b8f] focus:border-[#3c74ae]"
                />
              </div>
            ) : null}

            <div className="max-h-52 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 size={16} className="animate-spin text-[#3c74ae]" />
                </div>
              ) : (
                <>
                  {showAllOption ? (
                    <button
                      type="button"
                      onClick={() => {
                        onChange("");
                        setIsOpen(false);
                        setSearchQuery("");
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#e8f0f9] ${
                        !value
                          ? "bg-[#e8f0f9] font-semibold text-[#3c74ae]"
                          : "text-[#1a1a2e]"
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        <span>{allOptionLabel}</span>
                        {!value ? (
                          <Check size={14} className="text-[#3c74ae]" />
                        ) : null}
                      </span>
                    </button>
                  ) : null}

                  {filteredOptions.length === 0 && !showCustomInput ? (
                    <div className="px-4 py-4 text-center text-sm text-[#8f8b8f]">
                      No options yet
                      {readOnly ? "" : " - add a custom value below"}
                    </div>
                  ) : (
                    filteredOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          onChange(option);
                          setIsOpen(false);
                          setSearchQuery("");
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#e8f0f9] ${
                          value === option
                            ? "bg-[#e8f0f9] font-semibold text-[#3c74ae]"
                            : "text-[#1a1a2e]"
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span>{option}</span>
                          {value === option ? (
                            <Check size={14} className="text-[#3c74ae]" />
                          ) : null}
                        </span>
                      </button>
                    ))
                  )}
                </>
              )}
            </div>

            {!readOnly ? (
              <div className="border-t border-[#dde2e8]">
                {!showCustomInput ? (
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(true)}
                    className="flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold text-[#3c74ae] transition-colors hover:bg-[#e8f0f9]"
                  >
                    <Plus size={16} />
                    Add Custom Value
                  </button>
                ) : (
                  <div className="space-y-2 p-3">
                    <div className="flex items-center gap-2">
                      <input
                        ref={customInputRef}
                        type="text"
                        placeholder={`Enter custom ${label.toLowerCase()}...`}
                        value={customValue}
                        onChange={(event) => {
                          setCustomValue(event.target.value);
                          setError("");
                        }}
                        onKeyDown={handleKeyDown}
                        className="flex-1 rounded-lg border border-[#dde2e8] bg-[#f5f7fa] px-3 py-2 text-sm text-[#1a1a2e] outline-none transition-all placeholder:text-[#8f8b8f] focus:border-[#3c74ae] focus:ring-2 focus:ring-[#3c74ae]/20"
                      />
                      <button
                        type="button"
                        onClick={() => void handleAddCustom()}
                        disabled={addingCustom || !customValue.trim()}
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#3c74ae] text-white transition-colors hover:bg-[#2d5f96] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {addingCustom ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Check size={14} />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowCustomInput(false);
                          setCustomValue("");
                          setError("");
                        }}
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-[#dde2e8] text-[#8f8b8f] transition-colors hover:border-red-300 hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    {error ? (
                      <p className="px-1 text-xs text-red-500">{error}</p>
                    ) : null}
                    <p className="px-1 text-[10px] text-[#8f8b8f]">
                      Press Enter or click check to add
                    </p>
                  </div>
                )}
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
