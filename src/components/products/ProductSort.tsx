"use client";

import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "createdAt:desc", label: "Newest" },
  { value: "price:asc", label: "Price Low-High" },
  { value: "price:desc", label: "Price High-Low" },
  { value: "weight:asc", label: "Weight Low-High" },
  { value: "weight:desc", label: "Weight High-Low" },
  { value: "lotQuantity:desc", label: "Lot Qty" },
];

export default function ProductSort() {
  const search = useSearchParams();
  const router = useRouter();
  const current = `${search.get("sortField") ?? "createdAt"}:${search.get("sortOrder") ?? "desc"}`;

  const changeSort = (value: string) => {
    const [field, order] = value.split(":");
    const params = new URLSearchParams(search.toString());
    params.set("sortField", field);
    params.set("sortOrder", order);
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = current === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => changeSort(option.value)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${active ? "border-brand-blue bg-brand-blue text-white" : "border-[#c9d9ec] bg-white text-brand-blue hover:bg-brand-blue-light"}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
