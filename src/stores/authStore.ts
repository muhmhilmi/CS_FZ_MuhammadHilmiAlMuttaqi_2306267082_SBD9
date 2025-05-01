import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  initialize: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initialize: () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Failed to restore auth state:', error);
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
  
      const user = users.find(
        (user: any) => user.email === email && user.password === password
      );
  
      if (!user) {
        throw new Error('Invalid email or password');
      }
  
      set({ user, isAuthenticated: true, isLoading: false });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      });
      throw error;
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
  
      const emailExists = users.some((user: any) => user.email === email);
      if (emailExists) {
        throw new Error('Email already in use');
      }
  
      const newUser = {
        id: Date.now().toString(), 
        name,
        email,
        password, 
      };
      users.push(newUser);
  
      localStorage.setItem('users', JSON.stringify(users));
  
      set({ user: newUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },

  updateProfile: (data) => {
    set((state) => {
      if (!state.user) return state;
      
      const updatedUser = { ...state.user, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { user: updatedUser };
    });
  },
}));