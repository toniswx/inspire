import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { cartItem } from "@/types";
import { Tracing } from "trace_events";

interface cartState {
  cart: cartItem[] | [];
  loading: boolean;
  total: number;
  handleSetTotal: (s: number) => void;
  handleCartState: (Tracing: boolean) => void;
  addItemToCart: (item: cartItem) => void;
  deleteItemFromCart: (newArray: cartItem[]) => void;
  setNewCart: (newArray: cartItem[]) => void;
}

export const useCartStore = create<cartState>()((set) => ({
  cart: [],
  loading: true,
  total: 0,
  handleSetTotal: (by) => set(() => ({ total: by })),
  handleCartState: (by) => set(() => ({ loading: by })),
  addItemToCart: (by) => set((state) => ({ cart: [...state.cart, by] })),
  deleteItemFromCart: (by) => set((state) => ({ cart: by })),
  setNewCart: (by) => set((state) => ({ cart: [...by] })),
}));
