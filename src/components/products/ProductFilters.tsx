"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

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
    <div className="space-y-3 rounded-xl border border-white/10 bg-dark-surface p-4">
      <h3 className="font-semibold text-gold">Filters</h3>
      <Input placeholder="Gemstone name" defaultValue={search.get("name") ?? ""} onBlur={(e) => setParam("name", e.target.value)} />
      <Select
        value={search.get("shape") ?? ""}
        onChange={(v) => setParam("shape", v)}
        options={[
          { value: "", label: "All Shapes" },
          { value: "Round", label: "Round" },
          { value: "Oval", label: "Oval" },
          { value: "Cushion", label: "Cushion" },
          { value: "Emerald Cut", label: "Emerald Cut" },
          { value: "Pear", label: "Pear" },
          { value: "Marquise", label: "Marquise" },
          { value: "Cabochon", label: "Cabochon" },
          { value: "Baguette", label: "Baguette" },
          { value: "Bead", label: "Bead" },
        ]}
      />
      <Select
        value={search.get("condition") ?? ""}
        onChange={(v) => setParam("condition", v)}
        options={[
          { value: "", label: "All Conditions" },
          { value: "NATURAL", label: "Natural" },
          { value: "SEMI_PRESSURE", label: "Semi Pressure" },
          { value: "HEATED", label: "Heated" },
          { value: "SYNTHETIC", label: "Synthetic" },
        ]}
      />
    </div>
  );
}

