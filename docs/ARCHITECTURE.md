# CIL MVP Architecture

## Overview

Clean, modular architecture designed for production deployment and future scaling.

## Core Principles

1. **Separation of Concerns** - Each module handles one responsibility
2. **Modularity** - Features are self-contained and loosely coupled
3. **Scalability** - Database schema and API design support growth
4. **Security** - JWT authentication, input validation, error handling
5. **Performance** - Query optimization, image caching, pagination
6. **Type Safety** - Full TypeScript throughout

## Backend Architecture (NestJS)

```
src/
├── auth/              # Authentication logic (JWT, password reset)
├── users/             # User management, profiles
├── properties/        # Property CRUD, search, filtering
├── applications/      # Tenant applications
├── payments/          # Payment processing (Paystack integration)
├── service-requests/  # Maintenance/support requests
├── common/            # Shared middleware, guards, interceptors
├── database/          # TypeORM entities, migrations
└── config/            # Environment, database config
```

### Module Pattern

Each module (auth, users, properties, etc.) contains:
- **Controller** - HTTP endpoints
- **Service** - Business logic
- **Repository** - Data access (TypeORM)
- **DTO** - Request/response validation
- **Entity** - Database schema

### Authentication Flow

1. User POST /auth/signup or /auth/login
2. Backend validates credentials (bcryptjs for passwords)
3. Issues JWT (short-lived) + Refresh Token (long-lived)
4. Frontend stores tokens in localStorage (secure httpOnly in production)
5. All subsequent requests include JWT in Authorization header
6. Expired JWT → frontend uses refresh token to get new JWT

### Database Schema

**Users**
- id, email, password, firstName, lastName, role, createdAt, updatedAt

**Properties**
- id, title, description, type, price, location, beds, baths, images, status, ownerId, createdAt, updatedAt

**Applications**
- id, tenantId, propertyId, status, personalInfo, employmentInfo, identificationUrl, createdAt, updatedAt

**Payments**
- id, tenantId, propertyId, amount, status, paystackRef, createdAt, updatedAt

**ServiceRequests**
- id, tenantId, propertyId, description, images, status, createdAt, updatedAt

## Frontend Architecture (Next.js)

```
src/
├── app/               # Next.js App Router
│   ├── (public)/      # Unauthenticated pages (layout wrapper)
│   └── (dashboard)/   # Protected pages (auth layout wrapper)
├── components/        # Reusable UI components
├── services/          # API client functions
├── hooks/             # Custom React hooks
├── store/             # Zustand global state
├── types/             # TypeScript types
└── utils/             # Helper functions
```

### Routing Strategy

**Public Routes (no auth required)**
- / (homepage)
- /about
- /services
- /blog
- /contact
- /auth/login
- /auth/signup

**Protected Routes (auth required)**
- /dashboard/tenant/** (tenant portal)
- /dashboard/admin/** (admin portal)
- /dashboard/corporate/** (corporate portal)

### State Management

**Global State (Zustand)**
- Auth state (user, tokens, isAuthenticated)
- UI state (sidebar open, theme)

**Server State (TanStack Query)**
- Properties list, user profile, applications, payments
- Automatic caching, refetching, synchronization

**Local State (React useState)**
- Form inputs, UI toggles

### Component Structure

- UI components in `/components/ui` (buttons, inputs, cards)
- Feature components in `/components/{feature}` (property cards, tenant forms)
- Layout components in `/components/layout` (header, sidebar, footer)

## Data Flow

### Happy Path: Tenant Viewing Properties

1. User visits `/` (public)
2. Clicks "Browse Properties"
3. Frontend calls `/properties` API with filters
4. Backend queries database, returns paginated results
5. TanStack Query caches results
6. Components render with data
7. User clicks property → view details

### Happy Path: Tenant Applying for Property

1. Tenant clicks "Apply"
2. Form component captures data
3. React Hook Form validates inputs
4. User submits → POST `/applications`
5. Backend validates, stores in database
6. Frontend redirects to `/dashboard/tenant/applications`
7. Applications list refreshes via TanStack Query

### Happy Path: Admin Approving Application

1. Admin logs in → `/dashboard/admin`
2. Views pending applications
3. Reviews tenant details, income, identification
4. Clicks "Approve" → PATCH `/applications/{id}/approve`
5. Backend updates status, sends notification email
6. Frontend refetches applications list

## Security Considerations

1. **Authentication** - JWT with short expiration + refresh tokens
2. **Authorization** - Role-based guards (tenant, admin, corporate)
3. **Validation** - Class-validator on DTOs (backend + frontend)
4. **Password** - bcryptjs hashing, salt rounds = 10
5. **CORS** - Whitelist frontend origin
6. **Rate Limiting** - Prevent brute force attacks
7. **Image Upload** - Cloudinary (CDN, secure URLs)
8. **Payment** - Paystack handles sensitive data, backend verifies references

## Performance Optimizations

1. **Image Loading** - Cloudinary with responsive transforms
2. **Pagination** - Default 12 items per page
3. **Caching** - TanStack Query with stale-while-revalidate
4. **Database Indexing** - Indexes on email, propertyId, tenantId for fast queries
5. **API Response** - Lean payloads, no unnecessary data
6. **Code Splitting** - Next.js automatic route-based splitting

## Deployment Strategy (Render)

1. **Frontend** - Render Static Site or Web Service (Next.js)
2. **Backend** - Render Web Service (Node.js)
3. **Database** - Render PostgreSQL or external provider
4. **Environment Variables** - Stored in Render dashboard
5. **CI/CD** - GitHub webhooks trigger auto-deploy on push

## Future Considerations

1. **Mobile App** - React Native with shared types from `/shared`
2. **caching** - Redis for session/token blacklisting
3. **Microservices** - Separate payment, notification, file upload services
4. **Real-time** - WebSocket for live notifications
5. **Analytics** - Tenant engagement, conversion metrics
