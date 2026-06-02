# CIL Roadmap

## Current state

- Public-facing marketing site is implemented in `frontend/src/app/(public)`
- Authentication UI exists for login and signup
- Tenant and landlord dashboard shells are available
- Landlord property management pages and tenant landlord messaging exist in the frontend
- Backend supports JWT auth, role guards, Paystack webhook verification, and AWS S3 presigned upload generation
- Data is currently held in memory in backend services rather than persistent storage

## Immediate priorities (next 1-2 weeks)

1. Fix auth contract mismatches
   - Implement `/auth/refresh` or remove refresh flow from frontend
   - Align cookie names between backend and frontend (`cil_access_token` vs `cil_token`)
2. Repair backend compilation issues
   - Add missing `LoginDto` and `RegisterDto` files or remove invalid imports
3. Add persistent storage
   - Implement database entities and migrations
   - Remove or isolate in-memory state from production code
4. Validate current routes
   - Ensure middleware and controllers use a consistent auth/token strategy
   - Harden role-based access for dashboard routes
5. Sync documentation with code
   - Update docs to reflect implemented features and planned work

## Short-term roadmap (next 30 days)

- Implement full backend persistence for users, properties, tenants, payments, requests, and documents
- Build tenant application workflows and service-request APIs
- Complete landlord pages for tenants, payments, messages, and property CRUD
- Finish frontend dashboards for admin, agent, corporate, and real estate roles
- Add server-side validation with DTOs and class-validator
- Standardize API responses and error handling across frontend and backend

## Mid-term roadmap (next 90 days)

- Deliver production-ready payment flows
  - integrate Paystack payment initiation and verification
  - connect payment records to tenant and landlord accounts
- Add document upload file metadata storage and retrieval
- Add reporting and analytics dashboards for corporate and admin roles
- Implement user onboarding workflows and tenant verification
- Add email notifications or in-app alerts for workflow events
- Introduce caching and performance improvements for database queries

## Long-term roadmap

- Expand ecosystem modules beyond property management
  - workforce management
  - hotels and hospitality
  - investment management
- Add real-time notifications and chat for tenant-landlord communication
- Add marketplace matching and listing promotion features
- Build mobile-first or native mobile applications using shared API and type contracts
- Add audit logging, transaction history, and compliance workflows

## Recommended milestones

1. MVP stabilization
   - Auth flow, persistence, API contract, dashboard completion
2. Core product launch
   - Landlord portfolio, tenant application, payment, document workflows
3. Ecosystem expansion
   - Agent/corporate/real-estate roles, reports, service requests
4. Scale and platform maturity
   - Real-time communication, analytics, mobile clients
