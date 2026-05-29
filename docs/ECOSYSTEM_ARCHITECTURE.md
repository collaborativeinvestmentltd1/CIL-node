# CIL Ecosystem Architecture - Shared Infrastructure

## Overview

The CIL platform is restructured as a **scalable economic ecosystem** where multiple modules (Properties, Hotels, Workforce, etc.) share centralized infrastructure while maintaining independent business logic.

This document describes the **Phase 1 Shared Infrastructure** - the foundation that all ecosystem modules will plug into.

## Architecture Principles

1. **Separation of Concerns** - Infrastructure vs Business Logic
2. **Modularity** - Each module is self-contained
3. **Scalability** - Add new modules without changing core infrastructure
4. **Type Safety** - Full TypeScript throughout
5. **Security** - Centralized auth, role-based access
6. **User Experience** - Consistent UI/UX across all modules
7. **Performance** - Optimized data fetching and caching

## Directory Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js app router
│   ├── components/             # Feature-specific components (domain-organized)
│   ├── hooks/                  # Shared custom hooks
│   ├── store/                  # Zustand stores (auth, notifications, modals)
│   └── styles/                 # Global styles
│
└── shared/                     # ECOSYSTEM INFRASTRUCTURE (NOT part of Next.js)
    ├── api/                    # Centralized API client & services
    │   ├── client.ts           # Main API client with interceptors
    │   ├── authService.ts      # Auth API wrapper
    │   └── index.ts            # API types
    │
    ├── ui/                     # Reusable UI components
    │   ├── Button.tsx
    │   ├── Input.tsx
    │   ├── Card.tsx
    │   ├── Table.tsx
    │   ├── ToastContainer.tsx
    │   ├── ModalContainer.tsx
    │   ├── LoadingStates.tsx
    │   └── index.ts
    │
    ├── forms/                  # Form building system
    │   ├── useForm.ts          # Form state management
    │   ├── FormFields.tsx      # Form components
    │   └── index.ts
    │
    ├── layouts/                # Shared layout components
    │   ├── DashboardLayout.tsx # Main dashboard shell
    │   ├── ProtectedRoute.tsx  # Route protection
    │   └── index.ts
    │
    ├── permissions.ts          # Role & permission utilities
    ├── index.ts                # Main export (everything)
    │
    └── constants/              # System constants
    └── types/                  # Shared types

backend/
├── src/
│   ├── auth/                   # Authentication (JWT, roles, guards)
│   ├── common/                 # Middleware, pipes, interceptors
│   ├── modules/                # Feature modules
│   │   ├── properties/         # Properties module
│   │   ├── tenants/            # Tenants module
│   │   ├── payments/           # Payments module
│   │   ├── applications/       # Applications module
│   │   └── service-requests/   # Service requests module
│   │   # Future: hotels/, workforce/, agriculture/, etc.
    │
    ├── shared/                 # Shared backend infrastructure
    │   ├── dto/                # Shared DTOs
    │   ├── entities/           # Shared entity base classes
    │   └── services/           # Shared services
    │
    └── config/                 # Environment & database config
```

## Core Layers

### 1. API Client Layer (`/shared/api`)

**Purpose**: Centralized HTTP communication with auth, retries, interceptors

**Components**:
- `ApiClient` - Main client class
- `authService` - Auth API endpoints wrapper
- Interceptors for token refresh, error handling
- Built-in retry logic with exponential backoff

**Usage**:
```typescript
import { apiClient, authService } from '@/shared';

const user = await authService.login({ email, password });
const data = await apiClient.get('/api/properties');
```

### 2. State Management (`/frontend/src/store`)

**Zustand Stores**:
- `useAuthStore` - Authentication state
- `useNotificationStore` - Toast/notification queue
- `useModalStore` - Modal/dialog management

**Why Zustand**:
- Lightweight (~2kb)
- Simple API (no boilerplate)
- Built-in middleware (persist, devtools)
- Perfect for ecosystem-wide state

### 3. Custom Hooks (`/frontend/src/hooks`)

**Available Hooks**:
- `useAuth()` - Access auth state + actions
- `useFetch()` - Data fetching with loading/error states
- `useNotification()` - Show toasts/notifications
- `useModal()` - Open dialogs/modals

**Example**:
```typescript
function MyComponent() {
  const { user } = useAuth();
  const { data, isLoading } = useFetch('/api/properties');
  const { success } = useNotification();
  
  return <div>...</div>;
}
```

### 4. UI Component System (`/shared/ui`)

**Base Components**:
- `Button` - Variant system (primary, secondary, danger, ghost, outline)
- `Input` - With validation states
- `Card` - Container with header/body/footer
- `Table` - Data table with sorting, selection
- `Skeleton`, `Spinner` - Loading states
- `EmptyState`, `ErrorState` - State messaging

**Container Components**:
- `ToastContainer` - Displays notification queue
- `ModalContainer` - Displays modal stack

### 5. Form System (`/shared/forms`)

**Components**:
- `useForm()` - Form state + validation hook
- `FormInput`, `FormTextarea`, `FormSelect`, `FormCheckbox` - Field components

**Features**:
- Built-in validation (required, email, min/max, pattern, custom)
- Error messaging
- Touch tracking
- Submit handling

**Example**:
```typescript
function LoginForm() {
  const form = useForm({
    initialValues: { email: '', password: '' },
    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <FormInput
        {...form.getFieldProps('email')}
        label="Email"
        type="email"
        error={form.errors.email}
        touched={form.touched.email}
      />
      <FormInput
        {...form.getFieldProps('password')}
        label="Password"
        type="password"
        error={form.errors.password}
        touched={form.touched.password}
      />
      <Button type="submit" isLoading={form.isSubmitting}>
        Login
      </Button>
    </form>
  );
}
```

### 6. Permission System (`/shared/permissions.ts`)

**Roles**:
- Admin, Corporate, Landlord, Tenant, Agent, Real Estate

**Utilities**:
- `hasPermission(user, 'read:properties')`
- `hasRole(user, UserRole.LANDLORD)`
- `getDashboardRoute(user.role)`

**Permission Format**: `action:resource`
- Actions: create, read, update, delete, approve, reject, manage
- Resources: properties, tenants, applications, payments, service_requests, users, reports, settings

### 7. Dashboard Shell (`/shared/layouts/DashboardLayout.tsx`)

**Features**:
- Responsive layout (mobile-optimized)
- Integrated header with user profile
- Sidebar navigation (collapsible on mobile)
- Built-in toast & modal containers
- User dropdown menu

**Usage**:
```typescript
export default function TenantDashboard() {
  return (
    <DashboardLayout
      sidebar={
        <SidebarSection title="Navigation">
          <SidebarItem href="/dashboard/tenant/properties" icon={<FaHome />} label="Browse" />
          <SidebarItem href="/dashboard/tenant/applications" icon={<FaFileAlt />} label="Applications" />
        </SidebarSection>
      }
    >
      <YourContent />
    </DashboardLayout>
  );
}
```

## Data Flow

### Authentication Flow
```
1. User submits login form
2. Form validation (useForm hook)
3. API call (authService.login)
4. AuthStore updates with tokens & user
5. API client receives new auth context
6. Automatic token injection in all requests
7. Redirect to dashboard (getDashboardRoute)
```

### API Communication
```
1. Component calls API (apiClient.get, useFetch)
2. Request interceptor adds auth token
3. Request sent with retries & timeout
4. Response interceptor handles success/error
5. Error interceptor logs out if 401
6. Data returned to component
```

### UI Notifications
```
1. Component calls useNotification().success()
2. Notification added to store
3. ToastContainer renders notification
4. Auto-removes after duration
5. Or user dismisses manually
```

## Integration with Modules

### Properties Module
```
frontend/src/components/property/
  ├── PropertyCard.tsx          # Domain component
  ├── PropertyForm.tsx          # Uses shared FormInput, useForm
  └── PropertyTable.tsx         # Uses shared Table

backend/src/modules/properties/
  ├── properties.controller.ts
  ├── properties.service.ts
  └── property.entity.ts
```

### Adding New Module (e.g., Hotels)
```
1. Create backend module: src/modules/hotels/
2. Create frontend components: src/components/hotel/
3. Use existing shared infrastructure:
   - authService for user data
   - apiClient for API calls
   - useForm for forms
   - Table for listings
   - DashboardLayout for pages
4. No infrastructure changes needed!
```

## Security

### Authentication
- JWT with access + refresh tokens
- Automatic token refresh
- Logout on 401
- Protected routes with role checks

### Authorization
- Role-based access control (RBAC)
- Permission matrix system
- API-level validation (backend)
- UI-level checks (useFetch guards)

### Data
- HTTPS enforced (production)
- Secure token storage (localStorage → secure in production)
- CORS configured
- Input validation (form hooks)

## Performance Optimizations

1. **API Client**
   - Request/response caching
   - Automatic retries with exponential backoff
   - Timeout handling
   - Connection pooling

2. **Components**
   - Code-splitting by route
   - Lazy loading via Next.js
   - Memoization via useCallback/useMemo
   - Image optimization

3. **State**
   - Zustand persists only needed data
   - Modal/notification stacks cleanup
   - Automatic token cleanup

## Future Phases

### Phase 2: Ecosystem Modules
- Hotels module
- Workforce module
- Agriculture module
- Facility Management module
- Construction module

### Phase 3: Advanced Features
- Real-time notifications (WebSocket)
- File uploads (S3 integration)
- Advanced analytics/reports
- Multi-language support
- Advanced search/filtering

### Phase 4: Enterprise
- API documentation (OpenAPI)
- Mobile apps
- Desktop clients
- Third-party integrations

## Development Guidelines

### When Building a New Feature

1. **Check if shared component exists** → Use it
2. **Need form handling** → Use `useForm` + `FormInput`
3. **Need data fetching** → Use `useFetch` or `apiClient`
4. **Need to show message** → Use `useNotification().success()`
5. **Need to confirm action** → Use `useModal().confirm()`
6. **Need table layout** → Use shared `Table` component
7. **Need page layout** → Use `DashboardLayout`
8. **Need protected route** → Wrap with `ProtectedRoute`

### When Adding Backend Endpoint

1. Add API route
2. Add TypeORM entity if needed
3. Create service method
4. Add auth guard if needed
5. Test with Postman/curl
6. Create `authService` or `apiClient` wrapper on frontend
7. Create form component using shared form system

## Testing Strategy

- **Unit tests**: Hooks, utilities, permissions
- **Integration tests**: API client, forms, stores
- **E2E tests**: Full user flows (login, create, etc.)
- **Performance tests**: API response times, bundle size

## Monitoring & Logging

- Auth failures logged
- API errors tracked
- Performance metrics collected
- Error boundaries catch React errors
- Toast notifications for user feedback

---

**Last Updated**: May 29, 2026  
**Version**: 1.0 - Infrastructure Foundation
