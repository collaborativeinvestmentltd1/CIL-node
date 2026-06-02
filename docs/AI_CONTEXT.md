# CIL Project AI Context

## Project overview

CIL is a property ecosystem MVP built to connect landlords, tenants, agents, real estate partners, and administrators around leasing, payments, documents, and portfolio operations.

This repository contains:
- `frontend/`: Next.js public site and dashboard portals
- `backend/`: NestJS API with authentication, landlord services, tenant services, payment webhook handling, and document upload support
- `shared/`: shared API client, auth types, permission utilities, and shared UI/data type definitions
- `docs/`: architecture, design, and project-focused documentation

## Business vision

CIL aims to reduce friction in property management by enabling digital tenant onboarding, landlord portfolio tracking, secure rent payments, and communication between tenants and property owners.

The platform is positioned for Nigerian real estate workflows and is built for future expansion into agents, corporate property management, and broader ecosystem modules.

## Product goals

- Provide a public marketing site for the platform
- Enable user registration and login for tenant and landlord roles
- Allow landlords to manage properties and track tenant relationships
- Allow tenants to view landlord relationships, send requests, and access rental information
- Support payment verification via Paystack webhooks
- Support document uploads through presigned AWS S3 URLs
- Provide a modular foundation for admin, agent, corporate, and real estate partner workflows

## User roles

The codebase currently defines these actual roles:
- `tenant`
- `landlord`
- `agent`
- `realEstate`
- `admin`

The frontend also references a `corporate` role in the route structure, but its backend support is limited or placeholder in current implementation.

## Core workflows

- User registration and login via `frontend/src/app/(public)/auth`
- JWT authentication with role-based access through `backend/src/auth`
- Landlord property listing and portfolio APIs in `backend/src/landlord`
- Tenant landlord relationship views and messaging in `backend/src/tenants`
- Paystack webhook verification in `backend/src/payments`
- Document upload presign support in `backend/src/documents`
- Client-side route protection using `frontend/middleware.ts`
- Session and auth state managed by `frontend/src/store/authStore.ts`

## Architecture summary

### Frontend
- Next.js App Router with route groups: `(public)` and `(dashboard)`
- Client-side auth store using Zustand
- Route protection enforced by middleware cookie checks
- API wrappers in `shared/api/client.ts` and `shared/api/authService.ts`
- Static and dynamic dashboard pages for landlord and tenant experiences

### Backend
- NestJS module structure with feature modules for auth, users, landlord, tenants, payments, and documents
- JWT auth using `@nestjs/jwt` and Passport
- Role-based guards using `@Roles()` and `RolesGuard`
- In-memory data storage with hardcoded/demo state in `backend/src/landlord/landlord.service.ts` and `backend/src/users/users.service.ts`
- Payment webhook verification using Paystack signature HMAC
- AWS S3 presigned upload URL generation via `@aws-sdk/s3-request-presigner`

## Database summary

The current backend implementation does not persist data to a database.
- `backend/src/database/` is empty
- `backend/.env.example` declares PostgreSQL and TypeORM configuration, but no TypeORM entities exist
- User state, landlord profiles, properties, payments, agreements, and tenant requests are stored in memory

Future database design should include users, properties, tenants, landlords, payments, agreements, requests, and documents as normalized tables.

## Key integrations

- Paystack webhook verification for payment events
- AWS S3 for presigned upload URLs
- Cookie/Authorization header JWT authentication
- Helmet and rate limiting in `backend/src/main.ts`
- Cloudinary support implied by frontend config and docs, but not fully implemented in backend code

## Security model

- `backend/src/auth/jwt.strategy.ts` validates JWTs from `cil_access_token` cookie or Authorization bearer token
- `backend/src/auth/roles.guard.ts` enforces role checks on protected controllers
- `backend/src/main.ts` enables Helmet, CORS whitelisting, rate limiting, and production HTTPS redirect
- Frontend middleware enforces token presence before dashboard routes

## Coding standards

- TypeScript throughout frontend and backend
- Modular NestJS controllers/services
- Tailwind CSS styling on frontend
- Shared API client for consistent request handling
- Validation pipes enabled on backend

## Development rules

- Keep backend and frontend docs in sync with actual implementation
- Prefer explicit typings and avoid `any`
- Keep mock/demo state separate from production persistence
- Use route groups and layouts consistently in the frontend
- Validate all API inputs and protect backend routes with guard middleware

## Important constraints

- Backend persistence is not implemented yet
- Auth refresh token flow is referenced in frontend but missing in backend
- Several frontend dashboard pages are placeholders
- Some documentation claims are ahead of implementation
- Backend code imports nonexistent DTO files for auth validation

## Known issues

- Cookie name mismatch: backend sets `cil_access_token` but middleware expects `cil_token`
- `frontend/src/store/authStore.ts` calls `/auth/refresh`, but backend lacks that endpoint
- `backend/src/auth/auth.controller.ts` imports `LoginDto` and `RegisterDto` from missing files
- `backend/src/database/` is empty while `.env.example` claims PostgreSQL/TypeORM support
- Frontend package includes `@tanstack/react-query`, but it is not currently used
- Shared permissions utilities exist but are not consistently wired into the UI

## Current project status

- Public marketing landing pages are implemented
- Tenant and landlord dashboards exist in UI form
- Auth login/register flows are partly implemented but not fully consistent across code paths
- Backend is working in a demo/mock mode, not production-ready
- Payment webhook and upload presign support are present, but full payment and upload workflows are incomplete

## Active priorities

1. Stabilize authentication and session flow
2. Implement durable database persistence
3. Fix backend/frontend environment and auth contract mismatches
4. Complete placeholder dashboard pages
5. Align documentation with actual code
6. Harden security and remove unused dependencies
