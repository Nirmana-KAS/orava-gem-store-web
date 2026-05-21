// =============================================================
// Types + static data for the redesigned Products page.
// Real product data is fetched from /api/products and mapped
// to the Gem interface via lib/products/adapter.ts.
// =============================================================

export type GemCondition = "Available" | "Sold" | "Reserved";

export interface Gem {
  id: string;
  _realId?: string;
  name: string;
  variety: string;
  origin: string;
  shape: string;
  color: string;
  colorName: string;
  carat: number;
  clarity: string;
  cut: string;
  condition: GemCondition;
  certified: string;
  price: number;
  ri: number;
  treated: string;
  length: number;
  width: number;
  height: number;
  images?: string[];
  featured?: boolean;
  star?: boolean;
  catEye?: boolean;
}

export interface ShapeDef {
  name: string;
  icon: string;
}

export const SHAPES: ShapeDef[] = [
  { name: "Round",         icon: "M50 8 A 42 42 0 1 0 50 92 A 42 42 0 1 0 50 8 Z" },
  { name: "Oval",          icon: "M50 8 C 30 8 18 28 18 50 C 18 72 30 92 50 92 C 70 92 82 72 82 50 C 82 28 70 8 50 8 Z" },
  { name: "Cushion",       icon: "M30 10 L 70 10 Q 90 10 90 30 L 90 70 Q 90 90 70 90 L 30 90 Q 10 90 10 70 L 10 30 Q 10 10 30 10 Z" },
  { name: "Square",        icon: "M14 14 H 86 V 86 H 14 Z" },
  { name: "Princess Cut",  icon: "M14 14 H 86 V 86 H 14 Z M 14 14 L 86 86 M 86 14 L 14 86" },
  { name: "Emerald Cut",   icon: "M30 8 H 70 L 92 30 V 70 L 70 92 H 30 L 8 70 V 30 Z" },
  { name: "Octagon",       icon: "M32 8 H 68 L 92 32 V 68 L 68 92 H 32 L 8 68 V 32 Z" },
  { name: "Pentagon",      icon: "M50 8 L 90 38 L 75 88 L 25 88 L 10 38 Z" },
  { name: "Pear",          icon: "M50 6 C 32 18 14 40 14 62 C 14 80 30 94 50 94 C 70 94 86 80 86 62 C 86 40 68 18 50 6 Z" },
  { name: "Marquise",      icon: "M6 50 Q 30 14 50 10 Q 70 14 94 50 Q 70 86 50 90 Q 30 86 6 50 Z" },
  { name: "Heart",         icon: "M50 90 C 18 70 8 48 8 32 C 8 18 20 8 32 8 C 42 8 48 16 50 24 C 52 16 58 8 68 8 C 80 8 92 18 92 32 C 92 48 82 70 50 90 Z" },
  { name: "Triangle",      icon: "M50 8 L 94 86 L 6 86 Z" },
  { name: "Star",          icon: "M50 6 L 61 38 L 94 38 L 67 58 L 78 90 L 50 70 L 22 90 L 33 58 L 6 38 L 39 38 Z" },
  { name: "Baguette",      icon: "M18 30 H 82 V 70 H 18 Z" },
  { name: "Taper Baguette",icon: "M28 30 H 72 L 84 70 H 16 Z" },
  { name: "Half Round",    icon: "M10 70 Q 10 18 50 18 Q 90 18 90 70 Z" },
  { name: "Bullet",        icon: "M18 18 H 60 Q 90 18 90 50 Q 90 82 60 82 H 18 Z" },
  { name: "Crescent",      icon: "M28 14 A 38 38 0 1 0 28 86 A 28 28 0 1 1 28 14 Z" },
  { name: "Cross",         icon: "M38 8 H 62 V 38 H 92 V 62 H 62 V 92 H 38 V 62 H 8 V 38 H 38 Z" },
  { name: "Sun",           icon: "M50 22 A 24 24 0 1 0 50 78 A 24 24 0 1 0 50 22 Z M50 4 L 54 16 L 46 16 Z M50 96 L 54 84 L 46 84 Z M4 50 L 16 46 L 16 54 Z M96 50 L 84 46 L 84 54 Z M16 16 L 26 22 L 22 26 Z M84 16 L 74 22 L 78 26 Z M16 84 L 26 78 L 22 74 Z M84 84 L 74 78 L 78 74 Z" },
];

export interface ColorSwatch {
  name: string;
  hex: string;
}

export const COLOR_SWATCHES: ColorSwatch[] = [
  { name: "Colorless", hex: "#e9eef5" },
  { name: "White",     hex: "#f3e7d1" },
  { name: "Yellow",    hex: "#e8b327" },
  { name: "Gold",      hex: "#c79436" },
  { name: "Orange",    hex: "#f97356" },
  { name: "Peach",     hex: "#f0a988" },
  { name: "Red",       hex: "#b91239" },
  { name: "Pink",      hex: "#e87aa6" },
  { name: "Violet",    hex: "#5a3fb0" },
  { name: "Purple",    hex: "#7d4a9c" },
  { name: "Navy",      hex: "#1f3a8a" },
  { name: "Blue",      hex: "#3c74ae" },
  { name: "Sky",       hex: "#6aa3d6" },
  { name: "Teal",      hex: "#1d6b78" },
  { name: "Green",     hex: "#127a4a" },
  { name: "Mint",      hex: "#7cc7a3" },
  { name: "Brown",     hex: "#7a4a26" },
  { name: "Black",     hex: "#1a1a1f" },
];

export const ORIGINS = [
  "Sri Lanka", "Burma", "Mozambique", "Colombia",
  "Tanzania", "Madagascar", "Brazil",
];

export const VARIETIES = [
  "Sapphire","Ruby","Emerald","Spinel","Garnet","Tanzanite",
  "Aquamarine","Chrysoberyl","Tourmaline","Topaz","Amethyst","Pearl","Diamond",
];

export const CLARITIES = ["IF","VVS","VS","SI","I","Opaque","Translucent"];
export const CONDITIONS: GemCondition[] = ["Available","Sold","Reserved"];
export const CERTIFICATIONS = ["GIA","GRS","GUBELIN","AIGS","IGI"];

export const SORT_OPTIONS = [
  { value: "latest",      label: "Latest Added" },
  { value: "oldest",      label: "Oldest First" },
  { value: "price-asc",   label: "Price: Low → High" },
  { value: "price-desc",  label: "Price: High → Low" },
  { value: "carat-desc",  label: "Carat: High → Low" },
  { value: "name-asc",    label: "Name A → Z" },
] as const;

export type SortKey = (typeof SORT_OPTIONS)[number]["value"];

export function shade(hex: string, amount: number): string {
  const h = hex.replace("#", "");
  const r = Math.max(0, Math.min(255, parseInt(h.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(h.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(h.substr(4, 2), 16) + amount));
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

export function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substr(0, 2), 16),
    g: parseInt(h.substr(2, 2), 16),
    b: parseInt(h.substr(4, 2), 16),
  };
}

export function colorMatches(gemHex: string, colorName: string): boolean {
  const swatch = COLOR_SWATCHES.find((c) => c.name === colorName);
  if (!swatch) return true;
  const a = hexToRgb(gemHex);
  const b = hexToRgb(swatch.hex);
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2) < 120;
}
