'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  id: string;          // ui id, e.g. `${productId}:${variationId}`
  productId?: string;
  variationId?: string; // <-- add this line
  name: string;
  price: number;        // dollars
  qty: number;
  note?: string;
  image?: string | null;
  currency?: string;
};

type CartState = {
  items: CartItem[];
  count: number;
  add: (item: CartItem) => void;  // pass { qty: 1 } to increment, { qty: -1 } to decrement
  remove: (id: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      count: 0,
      add: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          let next: CartItem[];

          if (existing) {
            const newQty = existing.qty + (item.qty ?? 1);
            next =
              newQty <= 0
                ? state.items.filter((i) => i.id !== item.id)
                : state.items.map((i) =>
                    i.id === item.id ? { ...i, qty: newQty } : i
                  );
          } else {
            next = [...state.items, { ...item, qty: item.qty ?? 1 }];
          }

          return { items: next, count: next.reduce((s, i) => s + i.qty, 0) };
        }),
      remove: (id) =>
        set((state) => {
          const next = state.items.filter((i) => i.id !== id);
          return { items: next, count: next.reduce((s, i) => s + i.qty, 0) };
        }),
      clear: () => set({ items: [], count: 0 }),
    }),
    { name: 'big-lous-cart' }
  )
);