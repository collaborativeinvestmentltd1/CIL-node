# CIL Ecosystem - Developer Quick Reference

## Quick Start Guide

### 1. Authentication

```typescript
// In any component
import { useAuth } from '@/hooks';

export function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated && <p>Hello {user?.firstName}</p>}
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
```

### 2. Data Fetching

```typescript
import { useFetch } from '@/hooks';

export function PropertyList() {
  const { data: properties, isLoading, error, refetch } = useFetch('/api/properties');

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} action={<Button onClick={refetch}>Retry</Button>} />;

  return <Table columns={columns} data={properties} />;
}
```

### 3. Forms

```typescript
import { useForm, FormInput, FormSelect, Button } from '@/shared';

export function PropertyForm() {
  const form = useForm({
    initialValues: {
      title: '',
      price: '',
      type: 'apartment',
    },
    onSubmit: async (values) => {
      await apiClient.post('/api/properties', values);
      success('Property created!');
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <FormInput
        {...form.getFieldProps('title')}
        label="Property Title"
        error={form.errors.title}
        touched={form.touched.title}
        validations={[{ type: 'required', message: 'Required' }]}
      />
      
      <FormSelect
        {...form.getFieldProps('type')}
        label="Type"
        options={[
          { label: 'Apartment', value: 'apartment' },
          { label: 'House', value: 'house' },
        ]}
      />

      <Button type="submit" isLoading={form.isSubmitting}>
        Create
      </Button>
    </form>
  );
}
```

### 4. Notifications

```typescript
import { useNotification } from '@/hooks';

export function SaveButton() {
  const { success, error, info } = useNotification();

  const handleSave = async () => {
    try {
      await save();
      success('Saved!', 'Your changes have been saved');
    } catch (err) {
      error('Error', 'Failed to save');
    }
  };

  return <Button onClick={handleSave}>Save</Button>;
}
```

### 5. Modals

```typescript
import { useModal } from '@/hooks';

export function DeleteButton() {
  const { confirm } = useModal();

  const handleDelete = () => {
    confirm({
      title: 'Delete Property?',
      message: 'This action cannot be undone.',
      onConfirm: async () => {
        await apiClient.delete('/api/properties/123');
        success('Deleted!');
      },
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });
  };

  return <Button variant="danger" onClick={handleDelete}>Delete</Button>;
}
```

### 6. Dashboard Layout

```typescript
import { DashboardLayout, SidebarSection, SidebarItem } from '@/shared';
import { FaHome, FaUser } from 'react-icons/fa';

export default function TenantDashboard() {
  return (
    <DashboardLayout
      sidebar={
        <SidebarSection title="Main">
          <SidebarItem href="/dashboard/tenant/properties" icon={<FaHome />} label="Browse Properties" />
          <SidebarItem href="/dashboard/tenant/applications" icon={<FaFileAlt />} label="My Applications" />
          <SidebarItem href="/dashboard/tenant/profile" icon={<FaUser />} label="Profile" />
        </SidebarSection>
      }
    >
      <h1>Welcome to Tenant Dashboard</h1>
      {/* Your content here */}
    </DashboardLayout>
  );
}
```

### 7. Protected Routes

```typescript
import { ProtectedRoute } from '@/shared/layouts';
import { UserRole } from '@/shared/permissions';

export function AdminOnlyPage() {
  return (
    <ProtectedRoute requiredRole={UserRole.ADMIN}>
      <AdminDashboard />
    </ProtectedRoute>
  );
}

// With permission check
import { ProtectedRoute } from '@/shared/layouts';

export function PropertyManagement() {
  return (
    <ProtectedRoute requiredPermission="manage:properties">
      <PropertyManager />
    </ProtectedRoute>
  );
}
```

### 8. Permissions

```typescript
import { hasPermission, hasRole, UserRole } from '@/shared/permissions';
import { useAuth } from '@/hooks';

export function MyComponent() {
  const { user } = useAuth();

  return (
    <div>
      {hasRole(user, UserRole.LANDLORD) && (
        <Button>Manage Properties</Button>
      )}

      {hasPermission(user, 'delete:properties') && (
        <Button variant="danger">Delete</Button>
      )}
    </div>
  );
}
```

### 9. API Client

```typescript
import { apiClient } from '@/shared';

// GET
const properties = await apiClient.get('/api/properties');

// POST
const newProperty = await apiClient.post('/api/properties', {
  title: 'New Property',
  price: 5000000,
});

// PATCH
const updated = await apiClient.patch('/api/properties/123', { title: 'Updated' });

// DELETE
await apiClient.delete('/api/properties/123');

// Upload file
const response = await apiClient.uploadFile('/api/properties/123/image', file);
```

### 10. UI Components

```typescript
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Skeleton,
  Spinner,
  LoadingState,
  EmptyState,
  ErrorState,
  Checkbox,
} from '@/shared/ui';

// Button variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Input
<Input label="Email" type="email" placeholder="your@email.com" error="Invalid email" />

// Card
<Card>
  <CardHeader title="Property Details" />
  <CardBody>Content here</CardBody>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>

// Table
const columns = [
  { key: 'title', label: 'Property', render: (val) => <strong>{val}</strong> },
  { key: 'price', label: 'Price', align: 'right' as const },
  { key: 'beds', label: 'Beds' },
];
<Table columns={columns} data={properties} rowKey="id" />

// Loading states
<Skeleton width="100%" height="20px" />
<Spinner size="md" />
<LoadingState message="Loading properties..." />
<EmptyState title="No properties" description="Create your first property to get started" />
<ErrorState title="Error loading" message="Please try again" />
```

## Import Patterns

### From Shared Infrastructure
```typescript
// All from one place
import {
  Button,
  Input,
  useAuth,
  useFetch,
  DashboardLayout,
  hasPermission,
  UserRole,
} from '@/shared';

// Or specific imports
import { Button, Input } from '@/shared/ui';
import { useAuth, useFetch } from '@/hooks';
import { UserRole, hasPermission } from '@/shared/permissions';
```

### API Services
```typescript
import { authService, apiClient } from '@/shared';

await authService.login({ email, password });
const users = await apiClient.get('/api/users');
```

### State Stores (Direct)
```typescript
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { useModalStore } from '@/store/modalStore';
```

## Common Patterns

### Loading with Error Handling
```typescript
export function DataDisplay() {
  const { data, isLoading, error } = useFetch('/api/data');

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (!data) return <EmptyState title="No data" />;

  return <div>{/* render data */}</div>;
}
```

### Form with Submission
```typescript
export function UserForm() {
  const { success, error } = useNotification();

  const form = useForm({
    initialValues: { name: '', email: '' },
    validate: (values) => {
      const err = {};
      if (!values.name) err.name = 'Required';
      return err;
    },
    onSubmit: async (values) => {
      try {
        await apiClient.post('/api/users', values);
        success('User created!');
        form.resetForm();
      } catch (err) {
        error('Failed to create user');
      }
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <FormInput
        {...form.getFieldProps('name')}
        label="Name"
        error={form.errors.name}
        touched={form.touched.name}
      />
      <Button type="submit" isLoading={form.isSubmitting}>
        Create
      </Button>
    </form>
  );
}
```

### Protected Dashboard
```typescript
export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole={UserRole.ADMIN}>
      <DashboardLayout
        sidebar={
          <SidebarSection>
            <SidebarItem href="/admin/users" icon={<FaUsers />} label="Users" />
            <SidebarItem href="/admin/reports" icon={<FaChart />} label="Reports" />
          </SidebarSection>
        }
      >
        <AdminContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
```

## File Size & Performance

- API Client: ~4kb gzipped
- UI Components: ~8kb gzipped
- Hooks: ~2kb gzipped
- Forms: ~3kb gzipped
- Permissions: ~1kb gzipped

**Total Ecosystem Overhead**: ~18kb gzipped (negligible)

## Testing Example

```typescript
import { renderHook, act } from '@testing-library/react';
import { useForm } from '@/shared/forms';

test('form submission works', async () => {
  const onSubmit = jest.fn();
  const { result } = renderHook(() =>
    useForm({
      initialValues: { name: '' },
      onSubmit,
    })
  );

  act(() => {
    result.current.setFieldValue('name', 'John');
  });

  await act(async () => {
    await result.current.handleSubmit(new Event('submit'));
  });

  expect(onSubmit).toHaveBeenCalledWith({ name: 'John' });
});
```

## Troubleshooting

### Auth not persisting
- Check if browser allows localStorage
- Check if tokens are being set in authStore
- Clear localStorage and login again

### API calls failing
- Check network tab in DevTools
- Verify API base URL in env variables
- Check authentication status (401?)

### Modals/Toasts not showing
- Ensure `ToastContainer` and `ModalContainer` are in root layout
- Check if components are using correct hooks

### Form not submitting
- Check if form validation is passing
- Verify `onSubmit` function is not throwing
- Check if `handleSubmit` is properly bound to form

---

**For full documentation, see**: [ECOSYSTEM_ARCHITECTURE.md](./ECOSYSTEM_ARCHITECTURE.md)
