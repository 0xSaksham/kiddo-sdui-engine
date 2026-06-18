import { create } from "zustand";

interface CartState {
  cart: Record<string, number>;
  totalCount: number;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: {},
  totalCount: 0,
  addToCart: (productId) =>
    set((state) => {
      const currentQty = state.cart[productId] ?? 0;
      return {
        cart: { ...state.cart, [productId]: currentQty + 1 },
        totalCount: state.totalCount + 1,
      };
    }),
  removeFromCart: (productId) =>
    set((state) => {
      const currentQty = state.cart[productId] ?? 0;
      if (currentQty <= 0) return {};
      return {
        cart: { ...state.cart, [productId]: Math.max(0, currentQty - 1) },
        totalCount: Math.max(0, state.totalCount - 1),
      };
    }),
}));
