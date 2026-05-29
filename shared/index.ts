/**
 * CIL Shared Ecosystem Infrastructure
 * Central hub for all shared utilities, components, and systems
 */

// API & Services
export { apiClient, type RequestConfig, type AuthContext } from './api/client';
export type { ApiResponse, PaginatedResponse, ApiError } from './api/index';
export { authService } from './api/authService';
export type { AuthResponse, User, LoginPayload, RegisterPayload } from './api/authService';

// Store & State
export { useAuthStore } from '@/store/authStore';
export { useNotificationStore } from '@/store/notificationStore';
export { useModalStore } from '@/store/modalStore';

// Hooks
export { useAuth, useFetch, useNotification, useModal } from '@/hooks';

// UI Components
export {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ToastContainer,
  ModalContainer,
  Skeleton,
  Spinner,
  LoadingState,
  EmptyState,
  ErrorState,
  Table,
} from './ui';

// Forms
export { useForm, FormInput, FormTextarea, FormSelect, FormCheckbox } from './forms';

// Permissions
export {
  UserRole,
  RoleDisplayNames,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  getRolePermissions,
  hasRole,
  getDashboardRoute,
  canAccessDashboard,
  getPermissionLabel,
  type Permission,
  type PermissionAction,
  type PermissionResource,
} from './permissions';

// Types & Constants
export { type NotificationType } from '@/store/notificationStore';
export { type ModalConfig } from '@/store/modalStore';
