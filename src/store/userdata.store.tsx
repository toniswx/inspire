import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
type items = {
  id: string;
  object: string;
  amount_discount: number;
  amount_subtotal: number;
  amount_tax: number;
  amount_total: number;
  currency: string;
  description: string;
  price: {
    id: string;
    object: string;
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    custom_unit_amount: null;
    livemode: boolean;
    lookup_key: null;
    metadata: object;
    nickname: null;
    product: string;
    recurring: null;
    tax_behavior: string;
    tiers_mode: null;
    transform_quantity: null;
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
  };
  quantity: number;
};

export interface Order {
  id: string;
  date: string;
  total: number;
  adress: {
    address: {
      city: string;
      country: string;
      line1: string;
      line2: string;
      postal_code: string;
      state: string;
    };
    name: string;
  };
  status: "complete" | "pending" | "canceled";
  items: items[];
  // Update with possible status values
}

export type UserDataType = {
  name: string;
  email: string;
  invoices: Order[];
};

interface User {
  user: UserDataType | undefined;
  isLoading: boolean;
  openModaltoLogin: boolean;
  switchLoadingState: (isLoading: boolean) => void;
  setUserData: (userData: UserDataType | undefined) => void;
}

export const useUserData = create<User>((set) => ({
  user: undefined,
  isLoading: false,
  openModaltoLogin: false,
  switchLoadingState: (isLoading) => set({ isLoading }),
  setUserData: (userData) => set({ user: userData }),
}));
