/**
 * Permissions and Role Utilities
 * Provides utilities for checking roles and permissions across the ecosystem
 */

import { User } from '@/shared/api/authService';

/**
 * Enum of all possible user roles in the ecosystem
 */
export enum UserRole {
  ADMIN = 'admin',
  CORPORATE = 'corporate',
  LANDLORD = 'landlord',
  TENANT = 'tenant',
  AGENT = 'agent',
  REAL_ESTATE = 'realEstate',
}

/**
 * Map of roles to their display names
 */
export const RoleDisplayNames: Record<UserRole | string, string> = {
  [UserRole.ADMIN]: 'Administrator',
  [UserRole.CORPORATE]: 'Corporate',
  [UserRole.LANDLORD]: 'Landlord',
  [UserRole.TENANT]: 'Tenant',
  [UserRole.AGENT]: 'Agent',
  [UserRole.REAL_ESTATE]: 'Real Estate',
};

/**
 * Permission types
 */
export type PermissionAction =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'approve'
  | 'reject'
  | 'manage';

export type PermissionResource =
  | 'properties'
  | 'tenants'
  | 'applications'
  | 'payments'
  | 'service_requests'
  | 'users'
  | 'reports'
  | 'settings';

export type Permission = `${PermissionAction}:${PermissionResource}`;

/**
 * Role-based permission matrix
 */
const RolePermissions: Record<UserRole | string, Permission[]> = {
  [UserRole.ADMIN]: [
    'create:properties',
    'read:properties',
    'update:properties',
    'delete:properties',
    'create:tenants',
    'read:tenants',
    'update:tenants',
    'delete:tenants',
    'create:applications',
    'read:applications',
    'update:applications',
    'approve:applications',
    'reject:applications',
    'create:payments',
    'read:payments',
    'update:payments',
    'approve:payments',
    'reject:payments',
    'create:service_requests',
    'read:service_requests',
    'update:service_requests',
    'approve:service_requests',
    'reject:service_requests',
    'read:users',
    'update:users',
    'manage:users',
    'read:reports',
    'manage:settings',
  ],
  [UserRole.CORPORATE]: [
    'create:properties',
    'read:properties',
    'update:properties',
    'create:applications',
    'read:applications',
    'create:payments',
    'read:payments',
    'read:users',
  ],
  [UserRole.LANDLORD]: [
    'create:properties',
    'read:properties',
    'update:properties',
    'read:tenants',
    'read:applications',
    'approve:applications',
    'reject:applications',
    'read:payments',
    'create:service_requests',
    'read:service_requests',
    'update:service_requests',
  ],
  [UserRole.TENANT]: [
    'read:properties',
    'create:applications',
    'read:applications',
    'read:payments',
    'create:service_requests',
    'read:service_requests',
    'update:service_requests',
  ],
  [UserRole.AGENT]: [
    'read:properties',
    'read:applications',
    'read:tenants',
  ],
  [UserRole.REAL_ESTATE]: [
    'read:properties',
    'read:tenants',
    'read:applications',
  ],
};

/**
 * Check if a user has a specific permission
 */
export function hasPermission(user: User | null, permission: Permission): boolean {
  if (!user) return false;

  const permissions = RolePermissions[user.role] || [];
  return permissions.includes(permission);
}

/**
 * Check if a user has any of multiple permissions
 */
export function hasAnyPermission(
  user: User | null,
  permissions: Permission[]
): boolean {
  if (!user) return false;

  const userPermissions = RolePermissions[user.role] || [];
  return permissions.some((p) => userPermissions.includes(p));
}

/**
 * Check if a user has all of multiple permissions
 */
export function hasAllPermissions(
  user: User | null,
  permissions: Permission[]
): boolean {
  if (!user) return false;

  const userPermissions = RolePermissions[user.role] || [];
  return permissions.every((p) => userPermissions.includes(p));
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: string): Permission[] {
  return RolePermissions[role] || [];
}

/**
 * Check if user has a specific role
 */
export function hasRole(user: User | null, role: UserRole | UserRole[]): boolean {
  if (!user) return false;

  const roles = Array.isArray(role) ? role : [role];
  return roles.includes(user.role as UserRole);
}

/**
 * Get user's dashboard route based on role
 */
export function getDashboardRoute(role: string): string {
  switch (role) {
    case UserRole.ADMIN:
      return '/admin';
    case UserRole.CORPORATE:
      return '/corporate';
    case UserRole.LANDLORD:
      return '/landlord';
    case UserRole.TENANT:
      return '/tenant';
    case UserRole.AGENT:
      return '/agent/profile';
    case UserRole.REAL_ESTATE:
      return '/real-estate/profile';
    default:
      return '/tenant';
  }
}

/**
 * Check if user can access a dashboard
 */
export function canAccessDashboard(user: User | null): boolean {
  return user != null;
}

/**
 * Get a readable string for a permission
 */
export function getPermissionLabel(permission: Permission): string {
  const [action, resource] = permission.split(':');
  return `${action.charAt(0).toUpperCase() + action.slice(1)} ${resource
    .replace(/_/g, ' ')
    .toLowerCase()}`;
}
