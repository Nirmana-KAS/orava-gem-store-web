import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface QuotationItem {
  id: string;
  name: string;
  origin: string;
  shape: string;
  colorName: string;
  colorHex: string;
  size: string;
  weight: number;
  price?: number | null;
  image?: string;
}

interface QuotationStore {
  items: QuotationItem[];
  addItem: (item: QuotationItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  count: number;
}

export const useQuotationStore = create<QuotationStore>()(
  persist(
    (set, get) => ({
      items: [],
      count: 0,
      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (!existing) {
          set((state) => ({
            items: [...state.items, item],
            count: state.items.length + 1,
          }));
        }
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
          count: state.items.filter((i) => i.id !== id).length,
        })),
      clearCart: () => set({ items: [], count: 0 }),
      isInCart: (id) => get().items.some((i) => i.id === id),
    }),
    {
      name: "orava-quotation-cart",
    },
  ),
);
