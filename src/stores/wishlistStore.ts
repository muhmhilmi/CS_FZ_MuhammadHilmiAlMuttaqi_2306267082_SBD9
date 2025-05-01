import { create } from 'zustand';
import { WishlistItem } from '../types';

interface WishlistState {
  items: WishlistItem[];
  initialize: () => void;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
  getCount: () => number;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],

  initialize: () => {
    try {
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        set({ items: JSON.parse(storedWishlist) });
      }
    } catch (error) {
      console.error('Failed to restore wishlist state:', error);
    }
  },

  addItem: (productId) => {
    set((state) => {
      if (state.items.some(item => item.productId === productId)) {
        return state; // Item already exists
      }
      
      const updatedItems = [...state.items, { productId }];
      localStorage.setItem('wishlist', JSON.stringify(updatedItems));
      return { items: updatedItems };
    });
  },

  removeItem: (productId) => {
    set((state) => {
      const updatedItems = state.items.filter(item => item.productId !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedItems));
      return { items: updatedItems };
    });
  },

  hasItem: (productId) => {
    return get().items.some(item => item.productId === productId);
  },

  getCount: () => {
    return get().items.length;
  }
}));