/**
 * Authentication API service
 * Handles login, registration, token refresh, and user info
 */

import { apiClient, ApiError } from './client';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'tenant' | 'landlord' | 'agent' | 'realEstate' | 'corporate';
  phone?: string;
  companyName?: string;
  companyWebsite?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    avatar?: string;
    phone?: string;
    companyName?: string;
  };
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  phone?: string;
  companyName?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Auth service
 */
export const authService = {
  /**
   * Login user
   */
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    return apiClient.post('/auth/login', payload, { skipAuth: true });
  },

  /**
   * Register new user
   */
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    return apiClient.post('/auth/register', payload, { skipAuth: true });
  },

  /**
   * Get current user info
   */
  getMe: async (): Promise<User> => {
    return apiClient.get('/auth/me');
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    return apiClient.post(
      '/auth/refresh',
      { refreshToken },
      { skipAuth: true }
    );
  },

  /**
   * Logout
   */
  logout: async (): Promise<{ message: string }> => {
    return apiClient.post('/auth/logout', {});
  },

  /**
   * Request password reset
   */
  requestPasswordReset: async (email: string): Promise<{ message: string }> => {
    return apiClient.post(
      '/auth/request-password-reset',
      { email },
      { skipAuth: true }
    );
  },

  /**
   * Reset password with token
   */
  resetPassword: async (
    token: string,
    newPassword: string
  ): Promise<{ message: string }> => {
    return apiClient.post(
      '/auth/reset-password',
      { token, newPassword },
      { skipAuth: true }
    );
  },

  /**
   * Change password (authenticated user)
   */
  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string }> => {
    return apiClient.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  },

  /**
   * Update profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    return apiClient.patch('/auth/profile', data);
  },
};
