"use client";

import { useState, useRef, useEffect } from "react";
import { ShoppingBag, X, ArrowRight, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useQuotationStore } from "@/store/quotationStore";

export function QuotationCartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { items, removeItem, count } = useQuotationStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-[#e8f0f9]"
        aria-label="Quotation Cart"
      >
        <ShoppingBag size={20} className="text-[#3c74ae]" />
        {count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#3c74ae] text-xs font-bold text-white"
          >
            {count > 9 ? "9+" : count}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onMouseLeave={() => setIsOpen(false)}
            className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-[#dde2e8] bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#dde2e8] px-4 py-3">
              <h3 className="text-sm font-semibold text-[#1a1a2e]">
                Quotation Cart ({count} {count === 1 ? "item" : "items"})
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8f8b8f] transition-colors hover:text-[#1a1a2e]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                  <Package size={32} className="mb-3 text-[#dde2e8]" />
                  <p className="text-sm text-[#8f8b8f]">
                    Your quotation cart is empty
                  </p>
                  <p className="mt-1 text-xs text-[#8f8b8f]">
                    Browse products and add items
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#dde2e8]">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[#f5f7fa]"
                    >
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-[#dde2e8]">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div
                            className="h-full w-full"
                            style={{
                              backgroundColor: item.colorHex || "#3c74ae",
                            }}
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-[#1a1a2e]">
                          {item.name}
                        </p>
                        <p className="text-xs text-[#8f8b8f]">
                          {item.origin} • {item.shape}
                        </p>
                        {item.price && (
                          <p className="text-xs font-semibold text-[#3c74ae]">
                            ${item.price.toLocaleString()}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[#8f8b8f] transition-colors hover:bg-red-50 hover:text-red-500"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[#dde2e8] bg-[#f5f7fa] px-4 py-3">
                <Link
                  href="/quotation"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3c74ae] py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#2d5f96]"
                >
                  Submit Quotation
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
