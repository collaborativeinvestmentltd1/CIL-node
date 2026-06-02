# CIL Architecture Audit

## Overview

This document describes the actual architecture implemented in the repository as of the current audit.

The CIL platform combines a Next.js frontend, a NestJS backend, and shared API utilities. The current implementation supports demo workflows and authentication, but persistence and many production-grade features remain incomplete.

## System architecture

- `frontend/`: Next.js 14 App Router web client
- `backend/`: NestJS API server
- `shared/`: shared API client, authentication helpers, permission utilities, and shared types
- `docs/`: documentation and audit artifacts

## Frontend architecture

### Routing

- Public routes live under `frontend/src/app/(public)`.
- Dashboard routes live under `frontend/src/app/(dashboard)`.
- Route protection is enforced by `frontend/middleware.ts`, which redirects unauthenticated users to `/auth/login`.
- Dashboard layout is rendered by `frontend/src/app/(dashboard)/layout.tsx`.

### State management

- Auth state is managed in `frontend/src/store/authStore.ts` with Zustand.
- Local storage persistence is used for auth state, access tokens, and user profile data.
- The frontend also uses local state hooks like `useState` for forms and UI controls.
- The app includes a custom navigation loader via `frontend/src/components/providers/NavigationProvider.tsx`.

### API integration

- Shared HTTP client in `shared/api/client.ts` handles requests, retries, and auth headers.
- Auth service lives in `shared/api/authService.ts`.
- Landlord APIs are implemented in `frontend/src/services/landlordApi.ts`.
- Some frontend components still use hardcoded demo data from `frontend/src/data/propertyCatalog.ts`.

### Middleware and auth

- `frontend/middleware.ts` checks for the `cil_token` cookie before allowing access to protected routes.
- `frontend/src/lib/auth.ts` manages token and user session storage in both localStorage and a browser cookie.
- The auth flow is partially inconsistent: backend sets `cil_access_token` in some endpoints while frontend expects `cil_token`.

## Backend architecture

### Modules

Implemented modules:
- `backend/src/auth` — authentication and JWT handling
- `backend/src/users` — in-memory user storage and validation
- `backend/src/landlord` — landlord portfolio and tenant relationship services
- `backend/src/tenants` — tenant profile data and messaging support
- `backend/src/payments` — Paystack webhook verification and payment recording
- `backend/src/documents` — document presign and upload endpoints

### Authentication

- JWT strategy implemented in `backend/src/auth/jwt.strategy.ts`.
- `backend/src/auth/auth.module.ts` configures `JwtModule` with `process.env.JWT_SECRET`.
- Role-based authorization uses `backend/src/auth/roles.decorator.ts` and `backend/src/auth/roles.guard.ts`.
- `backend/src/auth/auth.controller.ts` provides `/auth/register`, `/auth/login`, `/auth/logout`, and `/auth/me`.

### Data services

- `backend/src/users/users.service.ts` stores users in memory.
- `backend/src/landlord/landlord.service.ts` stores tenants, properties, payments, messages, agreements, and requests in in-memory maps.
- `backend/src/tenants/tenants.service.ts` stores tenant profiles in memory.
- Demo seed accounts are created in `backend/src/main.ts` on startup.

### External integrations

- Paystack webhook signature validation in `backend/src/payments/payments.controller.ts`.
- AWS S3 presigned uploads via `backend/src/documents/s3.service.ts`.
- Security headers and rate limiting are configured in `backend/src/main.ts`.

## Shared utilities

- `shared/api/client.ts` is the centralized HTTP client for frontend and shared code.
- `shared/api/authService.ts` defines auth endpoints and payloads.
- `shared/permissions.ts` includes role and permission utilities, though these are not yet wired consistently across the frontend.
- `shared/types/index.ts` defines common user, property, payment, and application types.

## Data flow

### Auth flow

- Frontend login uses `frontend/src/services/authApi.ts`.
- Backend login issues a JWT and sets an HTTP-only cookie in `backend/src/auth/auth.controller.ts`.
- The frontend also stores a token in localStorage and in a separate cookie.
- Protected dashboard routes rely on the frontend `cil_token` cookie.

### Landlord workflow

- Dashboard UI pages request landlord data from `/landlords/:landlordId/*` endpoints.
- `LandlordService` returns demo properties, tenants, payments, and messages.
- Create/update property endpoints modify in-memory state only.

### Tenant workflow

- Tenant dashboard UI uses `getTenantLandlords`, `getTenantPayments`, and tenant-focused APIs.
- Tenant messaging sends requests through `backend/src/tenants/tenants.controller.ts`.

### Payment workflow

- Paystack sends webhook events to `/payments/webhook`.
- Backend verifies the signed payload and records payment data in memory.

## Service boundaries

- Frontend is responsible for UI, auth state, navigation, and calling APIs.
- Backend is responsible for auth verification, role enforcement, payment webhook processing, and upload presigned URL generation.
- Shared module provides API client and type contracts.

## Constraints and gaps

- The backend does not persist data; it currently uses in-memory storage.
- Some backend imports reference missing DTO files.
- The frontend references refresh tokens, but backend does not implement a refresh endpoint.
- Several dashboard pages are placeholders rather than full features.
- The frontend package includes unused dependencies such as `@tanstack/react-query`.

## Deployment and build configuration

- Frontend uses Next.js App Router, Tailwind, and additional security headers in `next.config.js`.
- Backend uses NestJS, `helmet`, `express-rate-limit`, and cookie parsing.
- `.env.example` suggests production services like PostgreSQL, Cloudinary, and Paystack, but backend support is not complete.

## Recommended next steps

- Implement backend persistence and remove demo-only state.
- Fix auth cookie and refresh token contract mismatches.
- Add missing DTO validation classes and align backend validation with frontend requests.
- Remove or implement unused documentation and dependencies.
- Complete placeholder dashboard screens with real API-backed data.
