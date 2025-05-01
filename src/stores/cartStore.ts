import { create } from 'zustand';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  initialize: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  initialize: () => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        set({ items: JSON.parse(storedCart) });
      }
    } catch (error) {
      console.error('Failed to restore cart state:', error);
    }
  },

  addItem: (newItem) => {
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === newItem.productId
      );

      let updatedItems;

      if (existingItemIndex !== -1) {
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
        };
      } else {
        updatedItems = [...state.items, newItem];
      }

      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return { items: updatedItems, isOpen: true };
    });
  },

  removeItem: (productId) => {
    set((state) => {
      const updatedItems = state.items.filter((item) => item.productId !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return { items: updatedItems };
    });
  },

  updateQuantity: (productId, quantity) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return { items: updatedItems };
    });
  },

  clearCart: () => {
    localStorage.removeItem('cart');
    set({ items: [] });
  },

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  
  closeCart: () => set({ isOpen: false }),

  getItemCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => {
      const price = item.salePrice || item.price;
      return total + price * item.quantity;
    }, 0);
  },

  getTotalItems: () => {
    return get().items.length;
  },
}));