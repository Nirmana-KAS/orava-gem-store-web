"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Select from "@/components/ui/Select";

const options = [
  { value: "createdAt:desc", label: "Newest First" },
  { value: "price:asc", label: "Price: Low to High" },
  { value: "price:desc", label: "Price: High to Low" },
  { value: "weight:asc", label: "Weight: Low to High" },
  { value: "weight:desc", label: "Weight: High to Low" },
  { value: "lotQuantity:desc", label: "Lot Quantity" },
];

export default function ProductSort() {
  const search = useSearchParams();
  const router = useRouter();
  const current = `${search.get("sortField") ?? "createdAt"}:${search.get("sortOrder") ?? "desc"}`;
  return (
    <Select
      value={current}
      onChange={(value) => {
        const [field, order] = value.split(":");
        const params = new URLSearchParams(search.toString());
        params.set("sortField", field);
        params.set("sortOrder", order);
        router.push(`/products?${params.toString()}`);
      }}
      options={options}
    />
  );
}

