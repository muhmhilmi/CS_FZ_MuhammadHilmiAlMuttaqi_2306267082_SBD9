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

// Mock login function - in a real app, this would call an API
const mockLogin = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password') {
        resolve({
          id: '1',
          name: 'John Doe',
          email: 'user@example.com',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500);
  });
};

// Mock register function
const mockRegister = async (name: string, email: string, password: string): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        name,
        email,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      });
    }, 500);
  });
};

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
      // Ambil data pengguna dari localStorage
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
  
      // Cari pengguna berdasarkan email dan password
      const user = users.find(
        (user: any) => user.email === email && user.password === password
      );
  
      if (!user) {
        throw new Error('Invalid email or password');
      }
  
      // Simpan pengguna ke state
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
      // Ambil data pengguna dari localStorage
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
  
      // Cek apakah email sudah digunakan
      const emailExists = users.some((user: any) => user.email === email);
      if (emailExists) {
        throw new Error('Email already in use');
      }
  
      // Tambahkan pengguna baru
      const newUser = {
        id: Date.now().toString(), // ID unik
        name,
        email,
        password, // Simpan password langsung (tidak aman, hanya untuk demo)
      };
      users.push(newUser);
  
      // Simpan kembali ke localStorage
      localStorage.setItem('users', JSON.stringify(users));
  
      // Simpan pengguna ke state
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