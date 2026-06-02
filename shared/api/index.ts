/**
 * Shared API types and utilities for ecosystem
 * This is the foundation for all API communication
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Standard API response format used across the ecosystem
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
  timestamp?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T = any> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Standard error response
 */
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  details?: Record<string, any>;
}

/**
 * Request configuration
 */
export interface RequestConfig extends RequestInit {
  skipAuth?: boolean;
  timeout?: number;
  retries?: number;
}

/**
 * User context attached to requests
 */
export interface AuthContext {
  token?: string;
  refreshToken?: string;
  user?: any;
  isAuthenticated: boolean;
}
