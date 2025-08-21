import { RegisterUser } from '@/types/user';
import { create } from 'zustand';

interface AuthStore {
  user: RegisterUser | null;
  isAuthenticated: boolean;
  setUser: (user: RegisterUser) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: RegisterUser) => set(() => ({ user, isAuthenticated: true })),
  clearIsAuthenticated: () => set(() => ({ user: null, isAuthenticated: false })),
}));
