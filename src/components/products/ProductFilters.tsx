"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/ui/Input";
import { SmartDropdown } from "@/components/ui/SmartDropdown";

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

  return (
    <div className="space-y-4 rounded-xl border border-[#dde2e8] bg-white p-4">
      <h3 className="font-semibold text-brand-blue">Filters</h3>
      <SmartDropdown
        fieldType="gemName"
        label="Gemstone Name"
        value={search.get("name") ?? ""}
        onChange={(val) => setParam("name", val)}
        placeholder="All Gemstones"
        showAllOption
        allOptionLabel="All Gemstones"
        readOnly
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

      <SmartDropdown
        fieldType="origin"
        label="Origin"
        value={search.get("origin") ?? ""}
        onChange={(val) => setParam("origin", val)}
        placeholder="All Origins"
        showAllOption
        allOptionLabel="All Origins"
        readOnly
      />
      <SmartDropdown
        fieldType="shape"
        label="Shape"
        value={search.get("shape") ?? ""}
        onChange={(val) => setParam("shape", val)}
        placeholder="All Shapes"
        showAllOption
        allOptionLabel="All Shapes"
        readOnly
      />
      <SmartDropdown
        fieldType="condition"
        label="Condition"
        value={search.get("condition") ?? ""}
        onChange={(val) => setParam("condition", val)}
        placeholder="All Conditions"
        showAllOption
        allOptionLabel="All Conditions"
        readOnly
      />
      <SmartDropdown
        fieldType="polishedType"
        label="Polish Type"
        value={search.get("polishedType") ?? ""}
        onChange={(val) => setParam("polishedType", val)}
        placeholder="All Polish Types"
        showAllOption
        allOptionLabel="All Polish Types"
        readOnly
      />
      <SmartDropdown
        fieldType="clarityType"
        label="Clarity Type"
        value={search.get("clarityType") ?? ""}
        onChange={(val) => setParam("clarityType", val)}
        placeholder="All Clarity Types"
        showAllOption
        allOptionLabel="All Clarity Types"
        readOnly
      />

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
