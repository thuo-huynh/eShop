import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../../sanity.types';

// Core types
export interface CartItem {
  product: Product;
  quantity: number;
}

// Actions interface
interface CartActions {
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  deleteCartProduct: (productId: string) => void;
  resetCart: () => void;
}

// Selectors interface
interface CartSelectors {
  getTotalPrice: () => number;
  getSubtotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];
}

// Combined state interface
interface CartState extends CartActions, CartSelectors {
  items: CartItem[];
}

// Helper functions for price calculations
const calculateItemPrice = (item: CartItem): number => {
  const basePrice = item.product.price ?? 0;
  return basePrice * item.quantity;
};

const calculateItemSubtotal = (item: CartItem): number => {
  const basePrice = item.product.price ?? 0;
  const discount = ((item.product.discount ?? 0) * basePrice) / 100;
  const discountedPrice = basePrice + discount;
  return discountedPrice * item.quantity;
};

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // State
      items: [],

      // Actions
      addItem: (product) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product._id === product._id,
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += 1;
            return { items: newItems };
          }

          return { items: [...state.items, { product, quantity: 1 }] };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce<CartItem[]>((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, []),
        })),

      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== productId),
        })),

      resetCart: () => set({ items: [] }),

      // Selectors
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + calculateItemPrice(item), 0);
      },

      getSubtotalPrice: () => {
        return get().items.reduce((total, item) => total + calculateItemSubtotal(item), 0);
      },

      getItemCount: (productId) => {
        return get().items.find((item) => item.product._id === productId)?.quantity ?? 0;
      },

      getGroupedItems: () => get().items,
    }),
    {
      name: 'cart-store',
      version: 1,
    },
  ),
);

export default useCartStore;
