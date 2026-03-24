"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/ui/Input";

const shapeOptions = [
  "Round",
  "Oval",
  "Cushion",
  "Emerald Cut",
  "Pear",
  "Marquise",
];
const conditionOptions = [
  { value: "NATURAL", label: "Natural" },
  { value: "SEMI_PRESSURE", label: "Semi Pressure" },
  { value: "HEATED", label: "Heated" },
  { value: "SYNTHETIC", label: "Synthetic" },
];

export default function ProductFilters() {
  const search = useSearchParams();
  const router = useRouter();

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(search.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  const toggleArrayParam = (key: string, value: string) => {
    const params = new URLSearchParams(search.toString());
    const current = params.get(key)?.split(",").filter(Boolean) ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    if (next.length) params.set(key, next.join(","));
    else params.delete(key);

    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  const hasArrayValue = (key: string, value: string) =>
    (search.get(key)?.split(",").filter(Boolean) ?? []).includes(value);

  return (
    <div className="space-y-4 rounded-xl border border-[#dde2e8] bg-white p-4">
      <h3 className="font-semibold text-brand-blue">Filters</h3>
      <Input
        placeholder="Gemstone name"
        defaultValue={search.get("name") ?? ""}
        onBlur={(e) => setParam("name", e.target.value)}
      />
      <Input
        placeholder="Size"
        defaultValue={search.get("size") ?? ""}
        onBlur={(e) => setParam("size", e.target.value)}
      />
      <Input
        placeholder="Color name"
        defaultValue={search.get("colorName") ?? ""}
        onBlur={(e) => setParam("colorName", e.target.value)}
      />
      <Input
        placeholder="Origin"
        defaultValue={search.get("origin") ?? ""}
        onBlur={(e) => setParam("origin", e.target.value)}
      />

      <div className="space-y-2">
        <p className="text-sm font-medium text-[#1a1a2e]">Shapes</p>
        {shapeOptions.map((shape) => (
          <label
            key={shape}
            className="flex items-center gap-2 text-sm text-[#4a4a6a]"
          >
            <input
              type="checkbox"
              checked={hasArrayValue("shape", shape)}
              onChange={() => toggleArrayParam("shape", shape)}
              className="h-4 w-4 rounded border-[#c9d9ec] accent-[#3c74ae]"
            />
            {shape}
          </label>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-[#1a1a2e]">Condition</p>
        {conditionOptions.map((condition) => (
          <label
            key={condition.value}
            className="flex items-center gap-2 text-sm text-[#4a4a6a]"
          >
            <input
              type="checkbox"
              checked={hasArrayValue("condition", condition.value)}
              onChange={() => toggleArrayParam("condition", condition.value)}
              className="h-4 w-4 rounded border-[#c9d9ec] accent-[#3c74ae]"
            />
            {condition.label}
          </label>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-[#1a1a2e]">Availability</p>
        <label className="flex items-center gap-2 text-sm text-[#4a4a6a]">
          <input
            type="checkbox"
            checked={search.get("availability") === "true"}
            onChange={() =>
              setParam(
                "availability",
                search.get("availability") === "true" ? "" : "true",
              )
            }
            className="h-4 w-4 rounded border-[#c9d9ec] accent-[#3c74ae]"
          />
          Available only
        </label>
      </div>

      <button
        type="button"
        onClick={() => router.push("/products")}
        className="w-full rounded-md border border-[#c9d9ec] px-3 py-2 text-sm text-brand-blue hover:bg-brand-blue-light"
      >
        Reset Filters
      </button>
    </div>
  );
}
