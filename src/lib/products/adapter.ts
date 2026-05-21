import type { Gem, GemCondition } from "./data";

const TREATMENT_MAP: Record<string, string> = {
  NATURAL: "None",
  SEMI_PRESSURE: "Pressure",
  HEATED: "Heat",
  SYNTHETIC: "Synthetic",
};

interface RawProduct {
  id: string;
  name: string;
  origin?: string | null;
  shape?: string | null;
  size?: string | null;
  colorName?: string | null;
  colorHex?: string | null;
  clarityType?: string | null;
  weight?: number | null;
  condition?: string | null;
  price?: number | null;
  availability?: boolean | null;
  images?: string[] | null;
}

function parseDimensions(size: string | null | undefined): {
  length: number;
  width: number;
  height: number;
} {
  if (!size) return { length: 0, width: 0, height: 0 };
  const matches = size.match(/(\d+\.?\d*)/g);
  if (!matches) return { length: 0, width: 0, height: 0 };
  const nums = matches.map(Number);
  return {
    length: nums[0] || 0,
    width: nums[1] || nums[0] || 0,
    height: nums[2] || 0,
  };
}

function formatProductId(id: string): string {
  const last4 = id.replace(/-/g, "").slice(-4).toUpperCase();
  return `ORV-${last4}`;
}

function extractVariety(name: string): string {
  const known = [
    "Sapphire", "Ruby", "Emerald", "Spinel", "Garnet",
    "Tanzanite", "Aquamarine", "Chrysoberyl", "Tourmaline",
    "Topaz", "Amethyst", "Pearl", "Diamond",
  ];
  for (const v of known) {
    if (name.includes(v)) return v;
  }
  return name.split(" ").pop() || "Gemstone";
}

function deriveCondition(p: RawProduct): GemCondition {
  if (p.availability === false) return "Sold";
  return "Available";
}

export function productToGem(p: RawProduct): Gem {
  const dims = parseDimensions(p.size);
  const colorHex = p.colorHex && /^#[0-9a-f]{6}$/i.test(p.colorHex) ? p.colorHex : "#3c74ae";
  return {
    id: formatProductId(p.id),
    _realId: p.id,
    name: p.name,
    variety: extractVariety(p.name),
    origin: p.origin || "Unknown",
    shape: p.shape || "Round",
    color: colorHex,
    colorName: p.colorName || "Blue",
    carat: p.weight ?? 0,
    clarity: p.clarityType || "VS",
    cut: "Brilliant",
    condition: deriveCondition(p),
    certified: "GIA",
    price: p.price ?? 0,
    ri: 1.762,
    treated: p.condition ? (TREATMENT_MAP[p.condition] || "Heat") : "Heat",
    length: dims.length,
    width: dims.width,
    height: dims.height,
    images: p.images ?? [],
    featured: false,
  };
}

export function productsToGems(products: RawProduct[]): Gem[] {
  return products.map(productToGem);
}
