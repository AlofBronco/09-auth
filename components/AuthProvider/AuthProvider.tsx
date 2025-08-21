'use client';

import { getMe, getSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect, useState } from 'react';
import css from './AuthProvider.module.css';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(state => state.clearIsAuthenticated);
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      isLoading(true);
      const isAuthenticated = await getSession();

      if (isAuthenticated) {
        const user = await getMe();
        if (user) {
          setUser(user);
          isLoading(false);
        }
      } else {
        clearIsAuthenticated();
        isLoading(false);
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (loading) return <div className={css.loading}>Loading...</div>;

  return children;
};

export default AuthProvider;
