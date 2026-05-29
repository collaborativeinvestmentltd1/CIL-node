# Shared Ecosystem Infrastructure - Developer Checklist

Use this checklist when building any feature for CIL:

## Before You Start

- [ ] Read `/docs/ECOSYSTEM_ARCHITECTURE.md` (15 min)
- [ ] Review `/docs/DEVELOPER_QUICK_REFERENCE.md` (10 min)
- [ ] Check if your feature uses existing infrastructure

## Building a Feature

### Authentication & User Context
- [ ] Use `useAuth()` hook for user data
- [ ] Use `useAuth().login()` and `logout()` for auth actions
- [ ] Wrap protected pages with `<ProtectedRoute>`
- [ ] Check permissions with `hasPermission(user, 'action:resource')`

### Data Fetching
- [ ] Use `useFetch()` for GET requests
- [ ] Use `apiClient.post/put/patch/delete()` for mutations
- [ ] Handle `isLoading` state with `<LoadingState />`
- [ ] Handle error state with `<ErrorState />`
- [ ] Handle empty state with `<EmptyState />`

### Forms
- [ ] Use `useForm()` hook for form state
- [ ] Use `FormInput`, `FormSelect`, etc. components
- [ ] Add validation rules in `useForm`
- [ ] Show errors only when `touched[fieldName]`
- [ ] Use `form.getFieldProps(name)` to bind fields
- [ ] Call `form.handleSubmit` on form submit

### User Feedback
- [ ] Use `useNotification().success()` for success messages
- [ ] Use `useNotification().error()` for error messages
- [ ] Use `useNotification().info()` for info messages
- [ ] Use `useNotification().warning()` for warnings
- [ ] Use `useModal().confirm()` for destructive actions
- [ ] Use `useModal().alert()` for important notices

### UI Components
- [ ] Use `<Button>` for all buttons (don't create custom)
- [ ] Use `<Input>` for all text inputs
- [ ] Use `<Card>` for content containers
- [ ] Use `<Table>` for data tables
- [ ] Use `<Skeleton>` for loading placeholders
- [ ] Use `<Spinner>` for loading indicators

### Layouts
- [ ] Use `<DashboardLayout>` for dashboard pages
- [ ] Use `<SidebarItem>` for navigation items
- [ ] Use `<SidebarSection>` for navigation sections
- [ ] Add custom header content if needed

### Permissions
- [ ] Check role with `hasRole(user, UserRole.LANDLORD)`
- [ ] Check permission with `hasPermission(user, 'read:properties')`
- [ ] Use `getDashboardRoute(user.role)` for redirects
- [ ] Hide UI elements when user lacks permission
- [ ] Never rely on UI hiding for security (check backend too)

## After You Build

- [ ] Does it use shared components?
- [ ] Does it use shared hooks?
- [ ] Did you create any components that should be shared?
- [ ] Did you avoid duplicating API client code?
- [ ] Did you add proper error handling?
- [ ] Did you add loading states?
- [ ] Did you test with different user roles?
- [ ] Did you test mobile responsiveness?
- [ ] Did you document new APIs if needed?

## Common Anti-Patterns (Don't Do These)

### ❌ Creating custom buttons
```typescript
// DON'T
<button className="px-4 py-2 bg-blue-600...">Click</button>

// DO
<Button>Click</Button>
```

### ❌ Calling API without centralized client
```typescript
// DON'T
const response = await fetch('/api/properties');

// DO
const data = await apiClient.get('/api/properties');
```

### ❌ Managing form state manually
```typescript
// DON'T
const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});

// DO
const form = useForm({ initialValues: {}, onSubmit: () => {} });
```

### ❌ Creating custom notification system
```typescript
// DON'T
const [toasts, setToasts] = useState([]);

// DO
const { success, error } = useNotification();
```

### ❌ Manual permission checking in UI
```typescript
// DON'T
if (user?.role === 'admin') { /* show button */ }

// DO
if (hasPermission(user, 'manage:properties')) { /* show button */ }
```

### ❌ Custom error handling
```typescript
// DON'T
try {
  const res = await fetch(...);
  if (!res.ok) { /* handle */ }
} catch (err) { /* handle */ }

// DO
try {
  await apiClient.get(...);
} catch (err) {
  error('Failed to load', err.message);
}
```

### ❌ Duplicating layout code
```typescript
// DON'T - Create layout from scratch
function MyPage() {
  return (
    <div>
      <header>...</header>
      <aside>...</aside>
      <main>...</main>
    </div>
  );
}

// DO - Use DashboardLayout
function MyPage() {
  return (
    <DashboardLayout sidebar={<Nav />}>
      Content here
    </DashboardLayout>
  );
}
```

## File Organization

When adding a new feature:

```
src/components/[feature]/          # Feature components
├── [Feature]List.tsx              # List view
├── [Feature]Form.tsx              # Form component
├── [Feature]Card.tsx              # Card component
└── [Feature]Details.tsx           # Detail view

shared/[type]/                     # ONLY for truly shared items
├── ui/[Component].tsx             # Shared UI (used by 2+ features)
├── forms/...                      # Form system
├── api/...                        # API clients
└── permissions.ts                 # Permission system
```

## Quick Reference

| Need | Use | Location |
|------|-----|----------|
| Button | `<Button>` | `/shared/ui` |
| Text Input | `<Input>` or `<FormInput>` | `/shared/ui` |
| Form | `useForm()` | `/shared/forms` |
| Data Fetch | `useFetch()` | `/hooks` |
| API Call | `apiClient.get()` | `/shared/api` |
| Auth | `useAuth()` | `/hooks` |
| Toast | `useNotification()` | `/hooks` |
| Modal | `useModal()` | `/hooks` |
| Table | `<Table>` | `/shared/ui` |
| Dashboard | `<DashboardLayout>` | `/shared/layouts` |
| Protected Route | `<ProtectedRoute>` | `/shared/layouts` |
| Permission Check | `hasPermission()` | `/shared/permissions` |
| Card | `<Card>` | `/shared/ui` |
| Loading State | `<LoadingState>` | `/shared/ui` |
| Empty State | `<EmptyState>` | `/shared/ui` |
| Error State | `<ErrorState>` | `/shared/ui` |

## Getting Help

1. **Architecture Questions**: Read `ECOSYSTEM_ARCHITECTURE.md`
2. **Code Examples**: Check `DEVELOPER_QUICK_REFERENCE.md`
3. **Component API**: Read the component's JSDoc comments
4. **How to use X**: Search existing components in `/src/components/`
5. **Still stuck**: Check test files for usage examples

## Performance Tips

- [ ] Use `useFetch()` instead of `apiClient.get()` in components (auto-abort)
- [ ] Use `useCallback` for event handlers in forms
- [ ] Use `useMemo` for expensive computations
- [ ] Lazy load heavy components with `React.lazy()`
- [ ] Use `next/Image` instead of `<img>`
- [ ] Minimize re-renders (avoid inline functions)

## Security Tips

- [ ] Always check permissions on both frontend AND backend
- [ ] Never trust user input (validate on backend)
- [ ] Use `<ProtectedRoute>` for sensitive pages
- [ ] Don't store sensitive data in localStorage (except tokens)
- [ ] Use HTTPS in production
- [ ] Test with different user roles

## Testing Template

```typescript
import { renderHook, act } from '@testing-library/react';
import { render, screen } from '@testing-library/react';

// Test a hook
test('useAuth returns user after login', async () => {
  const { result } = renderHook(() => useAuth());
  
  act(() => {
    result.current.login('test@test.com', 'password');
  });
  
  expect(result.current.user).toBeDefined();
});

// Test a component
test('LoginForm submits on button click', () => {
  render(<LoginForm />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(screen.getByText(/logging in/i)).toBeInTheDocument();
});
```

## Deployment Checklist

- [ ] No console errors or warnings
- [ ] All API endpoints working
- [ ] Authentication working (login/logout)
- [ ] Error states properly handled
- [ ] Loading states showing
- [ ] Mobile responsive
- [ ] Permissions enforced
- [ ] No broken images
- [ ] No N+1 queries
- [ ] Performance acceptable (Lighthouse > 80)

---

**Last Updated**: May 29, 2026  
**Version**: 1.0
