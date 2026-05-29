/**
 * Centralized API Client for the ecosystem
 * Handles all HTTP communication with consistent error handling,
 * request/response interceptors, auth token management, and retries.
 */

import {
  ApiResponse,
  ApiError,
  RequestConfig,
  AuthContext,
  PaginatedResponse,
  HttpMethod,
} from './index';

type RequestInterceptor = (config: {
  url: string;
  options: RequestInit;
  context: AuthContext;
}) => Promise<{ url: string; options: RequestInit }>;

type ResponseInterceptor = (response: {
  status: number;
  data: any;
  context: AuthContext;
}) => Promise<any>;

type ErrorInterceptor = (error: ApiError, context: AuthContext) => Promise<void>;

export class ApiClient {
  private baseURL: string;
  private authContext: AuthContext = { isAuthenticated: false };
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  constructor(baseURL: string = '') {
    this.baseURL = baseURL || (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_API_BASE : '');
  }

  /**
   * Set or update auth context
   */
  setAuthContext(context: Partial<AuthContext>): void {
    this.authContext = { ...this.authContext, ...context };
  }

  /**
   * Get current auth context
   */
  getAuthContext(): AuthContext {
    return this.authContext;
  }

  /**
   * Add request interceptor
   */
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * Add response interceptor
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * Add error interceptor
   */
  addErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.errorInterceptors.push(interceptor);
  }

  /**
   * Execute request interceptors
   */
  private async executeRequestInterceptors(
    url: string,
    options: RequestInit
  ): Promise<{ url: string; options: RequestInit }> {
    let result = { url, options };
    for (const interceptor of this.requestInterceptors) {
      result = await interceptor({
        ...result,
        context: this.authContext,
      });
    }
    return result;
  }

  /**
   * Execute response interceptors
   */
  private async executeResponseInterceptors(status: number, data: any): Promise<any> {
    let result = data;
    for (const interceptor of this.responseInterceptors) {
      result = await interceptor({
        status,
        data: result,
        context: this.authContext,
      });
    }
    return result;
  }

  /**
   * Execute error interceptors
   */
  private async executeErrorInterceptors(error: ApiError): Promise<void> {
    for (const interceptor of this.errorInterceptors) {
      await interceptor(error, this.authContext);
    }
  }

  /**
   * Make HTTP request with all interceptors and error handling
   */
  private async request<T = any>(
    method: HttpMethod,
    path: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const {
      skipAuth = false,
      timeout = 30000,
      retries = 3,
      ...options
    } = config;

    const url = this.buildUrl(path);
    let finalOptions: RequestInit = {
      method,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers as any),
      },
    };

    // Add auth token if available and not skipped
    if (!skipAuth && this.authContext.token) {
      (finalOptions.headers as any).Authorization = `Bearer ${this.authContext.token}`;
    }

    // Execute request interceptors
    try {
      const intercepted = await this.executeRequestInterceptors(url, finalOptions);
      url = intercepted.url;
      finalOptions = intercepted.options;
    } catch (error) {
      const apiError = this.handleError(error);
      await this.executeErrorInterceptors(apiError);
      throw apiError;
    }

    // Attempt request with retries
    let lastError: ApiError | null = null;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, finalOptions, timeout);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          lastError = {
            statusCode: response.status,
            message: errorData.message || response.statusText,
            error: errorData.error,
            details: errorData,
          };

          // Don't retry 4xx errors (except 429)
          if (response.status >= 400 && response.status < 500 && response.status !== 429) {
            break;
          }

          // For 5xx or 429, retry
          if (attempt < retries) {
            await this.delay(Math.pow(2, attempt) * 1000); // Exponential backoff
            continue;
          }
        } else {
          let data = await response.json().catch(() => ({}));
          
          // Execute response interceptors
          try {
            data = await this.executeResponseInterceptors(response.status, data);
          } catch (error) {
            const apiError = this.handleError(error);
            await this.executeErrorInterceptors(apiError);
            throw apiError;
          }

          return data;
        }
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }
        lastError = this.handleError(error);
        if (attempt < retries) {
          await this.delay(Math.pow(2, attempt) * 1000);
        }
      }
    }

    if (lastError) {
      await this.executeErrorInterceptors(lastError);
      throw lastError;
    }

    throw new ApiError('Unknown error occurred');
  }

  /**
   * GET request
   */
  get<T = any>(path: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('GET', path, config);
  }

  /**
   * POST request
   */
  post<T = any>(path: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>('POST', path, {
      ...config,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  put<T = any>(path: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>('PUT', path, {
      ...config,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH request
   */
  patch<T = any>(path: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>('PATCH', path, {
      ...config,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  delete<T = any>(path: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('DELETE', path, config);
  }

  /**
   * Upload file
   */
  uploadFile<T = any>(path: string, file: File, additionalData?: Record<string, any>): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    const options: RequestInit = {
      method: 'POST',
      body: formData,
      headers: {},
    };

    // Don't set Content-Type for FormData
    delete (options.headers as any)['Content-Type'];

    return this.request<T>('POST', path, options as RequestConfig);
  }

  /**
   * Build full URL
   */
  private buildUrl(path: string): string {
    if (path.startsWith('http')) return path;
    return `${this.baseURL}${path}`;
  }

  /**
   * Fetch with timeout
   */
  private fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout: number
  ): Promise<Response> {
    return Promise.race([
      fetch(url, options),
      new Promise<Response>((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), timeout)
      ),
    ]);
  }

  /**
   * Delay utility for retries
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Handle and normalize errors
   */
  private handleError(error: any): ApiError {
    if (error instanceof ApiError) {
      return error;
    }

    if (error instanceof Error) {
      return new ApiError(500, error.message);
    }

    return new ApiError(500, 'An unexpected error occurred');
  }
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number = 500,
    public message: string = 'An error occurred',
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      details: this.details,
    };
  }
}

/**
 * Create and export default API client instance
 */
const baseURL = typeof window !== 'undefined'
  ? process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'
  : 'http://localhost:4000';

export const apiClient = new ApiClient(baseURL);
