/**
 * useAuth hook
 * Provides authentication state and actions throughout the app
 */

import { useAuthStore } from '@/store/authStore';
import { useEffect, useCallback } from 'react';

export function useAuth() {
  const auth = useAuthStore();

  // Hydrate on mount
  useEffect(() => {
    auth.hydrate();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      return auth.login(email, password);
    },
    [auth]
  );

  const register = useCallback(
    async (payload: any) => {
      return auth.register(payload);
    },
    [auth]
  );

  const logout = useCallback(async () => {
    return auth.logout();
  }, [auth]);

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    login,
    register,
    logout,
    setTokens: auth.setTokens,
    setUser: auth.setUser,
    clearError: auth.clearError,
  };
}
