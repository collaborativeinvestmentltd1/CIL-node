/**
 * useFetch hook
 * Provides data fetching with loading and error states
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { apiClient } from '@/shared/api/client';

export interface UseFetchOptions {
  skip?: boolean;
  retries?: number;
  timeout?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useFetch<T = any>(
  url: string | null,
  options: UseFetchOptions = {}
): UseFetchState<T> {
  const { skip = false, onSuccess, onError, ...fetchOptions } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(!skip && !!url);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (!url || skip) return;

    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiClient.get<T>(url, {
        ...fetchOptions,
        signal: abortControllerRef.current.signal,
      });
      setData(result);
      onSuccess?.(result);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err instanceof Error ? err : new Error(String(err)));
        onError?.(err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, skip, fetchOptions, onSuccess, onError]);

  useEffect(() => {
    fetchData();
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchData]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch };
}
