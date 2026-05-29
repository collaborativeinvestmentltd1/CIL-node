/**
 * Protected Route Component
 * Wraps routes that require authentication or specific roles
 */

'use client';

import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import { hasRole, hasPermission, UserRole, Permission } from '@/shared/permissions';
import { LoadingState } from '@/shared/ui/LoadingStates';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole | UserRole[];
  requiredPermission?: Permission | Permission[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

export function ProtectedRoute({
  children,
  requiredRole,
  requiredPermission,
  requireAll = false,
  fallback,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Still loading
    if (isLoading) return;

    // Not authenticated
    if (!isAuthenticated || !user) {
      router.push('/auth/login');
      return;
    }

    // Check role requirement
    if (requiredRole && !hasRole(user, requiredRole)) {
      router.push('/dashboard');
      return;
    }

    // Check permission requirement
    if (requiredPermission) {
      const permissions = Array.isArray(requiredPermission)
        ? requiredPermission
        : [requiredPermission];

      const hasRequiredPermission = requireAll
        ? permissions.every((p) => hasPermission(user, p))
        : permissions.some((p) => hasPermission(user, p));

      if (!hasRequiredPermission) {
        router.push('/dashboard');
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRole, requiredPermission, router, requireAll]);

  // Show loading state
  if (isLoading) {
    return fallback || <LoadingState fullScreen />;
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  // Check access
  if (requiredRole && !hasRole(user, requiredRole)) {
    return fallback || null;
  }

  if (requiredPermission) {
    const permissions = Array.isArray(requiredPermission)
      ? requiredPermission
      : [requiredPermission];

    const hasRequiredPermission = requireAll
      ? permissions.every((p) => hasPermission(user, p))
      : permissions.some((p) => hasPermission(user, p));

    if (!hasRequiredPermission) {
      return fallback || null;
    }
  }

  return <>{children}</>;
}
