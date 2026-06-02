/**
 * Auth Store - Zustand store for authentication state
 * Manages user session, tokens, and authentication status across the app
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@/shared/api/authService';
import { apiClient } from '@/shared/api/client';
import { setSession, clearSession, type SessionUser } from '@/lib/auth';

export interface AuthState {
  // State
  user: SessionUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (payload: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: SessionUser | null) => void;
  clearError: () => void;
  hydrate: () => Promise<void>;
}

/**
 * Create auth store
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login({ email, password });
          const { user, accessToken, refreshToken } = response;

          set({
            user,
            accessToken,
            refreshToken: refreshToken ?? null,
            isAuthenticated: true,
            isLoading: false,
          });

          setSession(accessToken, user as SessionUser);
          apiClient.setAuthContext({
            token: accessToken,
            refreshToken,
            user,
            isAuthenticated: true,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error?.message || 'Login failed',
            isAuthenticated: false,
            user: null,
          });
          throw error;
        }
      },

      // Register action
      register: async (payload: any) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(payload);
          const { user, accessToken, refreshToken } = response;

          set({
            user,
            accessToken,
            refreshToken: refreshToken ?? null,
            isAuthenticated: true,
            isLoading: false,
          });

          setSession(accessToken, user as SessionUser);
          apiClient.setAuthContext({
            token: accessToken,
            refreshToken,
            user,
            isAuthenticated: true,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error?.message || 'Registration failed',
            isAuthenticated: false,
          });
          throw error;
        }
      },

      // Logout action
      logout: async () => {
        try {
          await authService.logout();
        } catch {
          // Logout even if API call fails
        }

        clearSession();
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });

        apiClient.setAuthContext({
          token: undefined,
          refreshToken: undefined,
          user: undefined,
          isAuthenticated: false,
        });
      },

      // Refresh access token
      refreshAccessToken: async () => {
        const { refreshToken } = get();
        if (!refreshToken) return false;

        try {
          const response = await authService.refreshToken(refreshToken);
          const { accessToken, refreshToken: newRefreshToken, user } = response;

          set({
            accessToken,
            refreshToken: newRefreshToken,
            user,
          });

          apiClient.setAuthContext({
            token: accessToken,
            refreshToken: newRefreshToken,
            user,
            isAuthenticated: true,
          });

          return true;
        } catch (error) {
          // Refresh failed, clear auth
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
          });
          return false;
        }
      },

      // Set tokens directly
      setTokens: (accessToken: string, refreshToken: string) => {
        set({ accessToken, refreshToken });
        apiClient.setAuthContext({
          token: accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },

      // Set user
      setUser: (user: SessionUser | null) => {
        set({ user });
        if (user) {
          apiClient.setAuthContext({ user, isAuthenticated: true });
        }
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Hydrate from storage and validate token
      hydrate: async () => {
        const { accessToken, refreshToken, user } = get();

        if (!accessToken) {
          set({ isAuthenticated: false });
          return;
        }

        // Set up API client with stored tokens
        apiClient.setAuthContext({
          token: accessToken,
          refreshToken: refreshToken || undefined,
          user: user || undefined,
          isAuthenticated: true,
        });

        // Try to validate token by fetching user data
        try {
          const currentUser = await authService.getMe();
          set({ user: currentUser, isAuthenticated: true });
        } catch (error) {
          // Token is invalid, try to refresh
          if (refreshToken) {
            const refreshed = await get().refreshAccessToken();
            if (!refreshed) {
              set({
                accessToken: null,
                refreshToken: null,
                user: null,
                isAuthenticated: false,
              });
            }
          } else {
            set({
              accessToken: null,
              refreshToken: null,
              user: null,
              isAuthenticated: false,
            });
          }
        }
      },
    }),
    {
      name: 'cil_auth_store',
      storage: typeof window !== 'undefined'
        ? {
            getItem: (name: string) => {
              const item = localStorage.getItem(name);
              return item ? JSON.parse(item) : null;
            },
            setItem: (name: string, value: any) => {
              localStorage.setItem(name, JSON.stringify(value));
            },
            removeItem: (name: string) => {
              localStorage.removeItem(name);
            },
          }
        : undefined,
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
