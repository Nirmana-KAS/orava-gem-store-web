import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SortKey } from "./data";

export type ViewMode = "grid4" | "grid3" | "list";

export interface FilterState {
  search: string;
  variety: string | null;
  origin: string | null;
  shape: string | null;
  color: string | null;
  clarity: string | null;
  certified: string | null;
  treated: string | null;
  phenomena: boolean;
  availability: "All" | "Available" | "Sold" | "Reserved";
  carat: [number, number];
  price: [number, number];
  length: [number, number];
  width: [number, number];
  height: [number, number];
  sort: SortKey;
  view: ViewMode;
  page: number;
}

const initialFilters: FilterState = {
  search: "",
  variety: null,
  origin: null,
  shape: null,
  color: null,
  clarity: null,
  certified: null,
  treated: null,
  phenomena: false,
  availability: "All",
  carat: [0, 10],
  price: [0, 15000],
  length: [0, 20],
  width: [0, 15],
  height: [0, 10],
  sort: "latest",
  view: "grid4",
  page: 1,
};

interface ProductsStore extends FilterState {
  set: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  reset: () => void;

  wishlist: Set<string>;
  toggleWishlist: (id: string) => void;

  compare: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
}

export const useProducts = create<ProductsStore>()(
  persist(
    (set, get) => ({
      ...initialFilters,
      wishlist: new Set<string>(),
      compare: [],

      set: (key, value) => set({ [key]: value, page: 1 } as Partial<ProductsStore>),
      reset: () => set({ ...initialFilters }),

      toggleWishlist: (id) => {
        const next = new Set(get().wishlist);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        set({ wishlist: next });
      },

      toggleCompare: (id) => {
        const cur = get().compare;
        if (cur.includes(id)) set({ compare: cur.filter((x) => x !== id) });
        else if (cur.length < 4) set({ compare: [...cur, id] });
      },
      clearCompare: () => set({ compare: [] }),
    }),
    {
      name: "orava-products",
      partialize: (s) => ({
        wishlist: Array.from(s.wishlist),
        compare: s.compare,
        view: s.view,
      }) as unknown as ProductsStore,
      merge: (persisted, current) => {
        const p = persisted as { wishlist?: string[]; compare?: string[]; view?: ViewMode } | undefined;
        return {
          ...current,
          ...(p ?? {}),
          wishlist: new Set<string>(p?.wishlist ?? []),
        };
      },
    },
  ),
);
