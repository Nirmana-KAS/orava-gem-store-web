export interface ShapeDef {
  name: string;
  icon: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface PresetDef {
  id: string;
  label: string;
  emoji: string;
  filter: PresetFilter;
}

export interface PresetFilter {
  name?: string;
  origin?: string;
  shape?: string;
  colorName?: string;
  condition?: string;
  weightMin?: number;
  weightMax?: number;
  priceMin?: number;
  priceMax?: number;
}

export interface BirthstoneDef {
  m: string;
  name: string;
  color: string;
}

export const SHAPES: ShapeDef[] = [
  { name: "Round", icon: "M50 8 A 42 42 0 1 0 50 92 A 42 42 0 1 0 50 8 Z" },
  {
    name: "Oval",
    icon: "M50 8 C 30 8 18 28 18 50 C 18 72 30 92 50 92 C 70 92 82 72 82 50 C 82 28 70 8 50 8 Z",
  },
  {
    name: "Cushion",
    icon: "M30 10 L 70 10 Q 90 10 90 30 L 90 70 Q 90 90 70 90 L 30 90 Q 10 90 10 70 L 10 30 Q 10 10 30 10 Z",
  },
  { name: "Square", icon: "M14 14 H 86 V 86 H 14 Z" },
  {
    name: "Princess Cut",
    icon: "M14 14 H 86 V 86 H 14 Z M 14 14 L 86 86 M 86 14 L 14 86",
  },
  {
    name: "Emerald Cut",
    icon: "M30 8 H 70 L 92 30 V 70 L 70 92 H 30 L 8 70 V 30 Z",
  },
  {
    name: "Octagon",
    icon: "M32 8 H 68 L 92 32 V 68 L 68 92 H 32 L 8 68 V 32 Z",
  },
  { name: "Pentagon", icon: "M50 8 L 90 38 L 75 88 L 25 88 L 10 38 Z" },
  {
    name: "Pear",
    icon: "M50 6 C 32 18 14 40 14 62 C 14 80 30 94 50 94 C 70 94 86 80 86 62 C 86 40 68 18 50 6 Z",
  },
  {
    name: "Marquise",
    icon: "M6 50 Q 30 14 50 10 Q 70 14 94 50 Q 70 86 50 90 Q 30 86 6 50 Z",
  },
  {
    name: "Heart",
    icon: "M50 90 C 18 70 8 48 8 32 C 8 18 20 8 32 8 C 42 8 48 16 50 24 C 52 16 58 8 68 8 C 80 8 92 18 92 32 C 92 48 82 70 50 90 Z",
  },
  { name: "Triangle", icon: "M50 8 L 94 86 L 6 86 Z" },
  {
    name: "Star",
    icon: "M50 6 L 61 38 L 94 38 L 67 58 L 78 90 L 50 70 L 22 90 L 33 58 L 6 38 L 39 38 Z",
  },
  { name: "Baguette", icon: "M18 30 H 82 V 70 H 18 Z" },
  { name: "Taper Baguette", icon: "M28 30 H 72 L 84 70 H 16 Z" },
  { name: "Half Round", icon: "M10 70 Q 10 18 50 18 Q 90 18 90 70 Z" },
  {
    name: "Bullet",
    icon: "M18 18 H 60 Q 90 18 90 50 Q 90 82 60 82 H 18 Z",
  },
  {
    name: "Crescent",
    icon: "M28 14 A 38 38 0 1 0 28 86 A 28 28 0 1 1 28 14 Z",
  },
  {
    name: "Cross",
    icon: "M38 8 H 62 V 38 H 92 V 62 H 62 V 92 H 38 V 62 H 8 V 38 H 38 Z",
  },
  {
    name: "Sun",
    icon: "M50 22 A 24 24 0 1 0 50 78 A 24 24 0 1 0 50 22 Z M50 4 L 54 16 L 46 16 Z M50 96 L 54 84 L 46 84 Z M4 50 L 16 46 L 16 54 Z M96 50 L 84 46 L 84 54 Z M16 16 L 26 22 L 22 26 Z M84 16 L 74 22 L 78 26 Z M16 84 L 26 78 L 22 74 Z M84 84 L 74 78 L 78 74 Z",
  },
];

export const COLOR_SWATCHES: ColorSwatch[] = [
  { name: "Colorless", hex: "#e9eef5" },
  { name: "White", hex: "#f3e7d1" },
  { name: "Yellow", hex: "#e8b327" },
  { name: "Gold", hex: "#c79436" },
  { name: "Orange", hex: "#f97356" },
  { name: "Peach", hex: "#f0a988" },
  { name: "Red", hex: "#b91239" },
  { name: "Pink", hex: "#e87aa6" },
  { name: "Violet", hex: "#5a3fb0" },
  { name: "Purple", hex: "#7d4a9c" },
  { name: "Navy", hex: "#1f3a8a" },
  { name: "Blue", hex: "#3c74ae" },
  { name: "Sky", hex: "#6aa3d6" },
  { name: "Teal", hex: "#1d6b78" },
  { name: "Green", hex: "#127a4a" },
  { name: "Mint", hex: "#7cc7a3" },
  { name: "Brown", hex: "#7a4a26" },
  { name: "Black", hex: "#1a1a1f" },
];

export const PRESETS: PresetDef[] = [
  {
    id: "ceylon-sapphires",
    label: "Ceylon Sapphires",
    emoji: "★",
    filter: { name: "Sapphire", origin: "Sri Lanka" },
  },
  {
    id: "under-1-5ct",
    label: "Under 1.5 ct",
    emoji: "◇",
    filter: { weightMax: 1.5 },
  },
  {
    id: "investment-grade",
    label: "Investment Grade ($5k+)",
    emoji: "✦",
    filter: { priceMin: 5000 },
  },
  {
    id: "natural-unheated",
    label: "Natural (Unheated)",
    emoji: "✿",
    filter: { condition: "NATURAL" },
  },
];

export const BIRTHSTONES: BirthstoneDef[] = [
  { m: "Jan", name: "Garnet", color: "#9a1c3a" },
  { m: "Feb", name: "Amethyst", color: "#7d5ba6" },
  { m: "Mar", name: "Aquamarine", color: "#7cc8d6" },
  { m: "Apr", name: "Diamond", color: "#e5e7eb" },
  { m: "May", name: "Emerald", color: "#127a4a" },
  { m: "Jun", name: "Pearl", color: "#f3e7d1" },
  { m: "Jul", name: "Ruby", color: "#b91239" },
  { m: "Aug", name: "Spinel", color: "#e25a8e" },
  { m: "Sep", name: "Sapphire", color: "#3c74ae" },
  { m: "Oct", name: "Tourmaline", color: "#d36b8a" },
  { m: "Nov", name: "Topaz", color: "#e8b327" },
  { m: "Dec", name: "Tanzanite", color: "#5a3fb0" },
];

export const ACTIVITY_MESSAGES: string[] = [
  "New parcel arrived: Ceylon Sapphires restocked",
  "Lab-grade Royal Blue added to the collection",
  "Master cutter completed re-polish on featured lot",
  "Padparadscha Sapphire viewed by a buyer in Geneva",
  "Tsavorite Garnet added to a client quotation",
  "Fresh inventory: 12 new gemstones from Tanzania",
  "Auction-grade Pigeon Blood Ruby restocked",
];

export const TAGLINES: string[] = [
  "Your next masterpiece starts here.",
  "Cut by hand. Verified to the milligram.",
  "Sri Lanka to your atelier in 24 hours.",
  "Stones with provenance, prices with proof.",
  "Discover gemstones crafted to perfection.",
];

export const STATS = [
  { v: "7", k: "Origins" },
  { v: "8", k: "Cuts" },
  { v: "20", k: "Shapes" },
  { v: "100%", k: "Certified" },
  { v: "24h", k: "Worldwide" },
];

export function shadeHex(hex: string, percent: number): string {
  const h = hex.replace("#", "");
  const r = Math.max(0, Math.min(255, parseInt(h.substr(0, 2), 16) + percent));
  const g = Math.max(0, Math.min(255, parseInt(h.substr(2, 2), 16) + percent));
  const b = Math.max(0, Math.min(255, parseInt(h.substr(4, 2), 16) + percent));
  return (
    "#" +
    [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")
  );
}
