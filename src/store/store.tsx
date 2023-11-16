import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { cartItem } from "@/types";

interface cartState {
  cart: cartItem[] | [];
  addItemToCart: (item: cartItem) => void;
  deleteItemFromCart: (newArray: cartItem[]) => void;
  setNewCart: (newArray: cartItem[]) => void;
}

export const useCartStore = create<cartState>()((set) => ({
  cart: [],
  addItemToCart: (by) => set((state) => ({ cart: [...state.cart, by] })),
  deleteItemFromCart: (by) => set((state) => ({ cart: by })),
  setNewCart: (by) => set((state) => ({ cart: [...by] })),
}));
