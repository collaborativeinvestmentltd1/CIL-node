# CIL Database Audit

## Current database status

- The backend does not persist data to a database.
- `backend/src/database/` is empty.
- `backend/.env.example` declares PostgreSQL and TypeORM variables, but no TypeORM entities or migrations are implemented.
- The codebase currently uses in-memory stores for users, landlords, tenants, properties, payments, agreements, requests, and messages.

## Actual data model in code

### Users
Stored in memory as `AppUser` objects in `backend/src/users/users.service.ts`.
Fields:
- id
- firstName
- lastName
- email
- passwordHash
- role
- createdAt

### Landlord profile
Stored in `LandlordService.profiles`.
Fields:
- id
- userId
- email
- firstName
- lastName
- createdAt

### Tenant profile
Stored in `TenantsService.tenants`.
Fields:
- userId
- id
- firstName
- lastName
- email
- createdAt
- balance
- documents

### Properties
Stored in `LandlordService.properties` as a record keyed by landlord ID.
Fields:
- id
- title
- location
- description
- price
- type
- units
- status

### Payments
Stored in `LandlordService.payments` and updated by `PaymentsService`.
Fields:
- id
- landlordId
- tenantId
- propertyId
- amount
- date
- reference
- status

### Agreements
Stored in `LandlordService.tenantAgreements`.
Fields:
- id
- tenantId
- landlordId
- title
- status
- summary
- updatedAt

### Requests
Stored in `LandlordService.tenantRequests`.
Fields:
- id
- tenantId
- landlordId
- subject
- message
- createdAt
- status

### Messages
Stored in `LandlordService.messages`.
Fields:
- id
- audience
- tenantId?
- title
- message
- createdAt
- expiresAt?

## Planned database model

Based on the repo documentation and `.env.example`, the intended database schema likely includes:
- `users`
- `properties`
- `tenant_profiles`
- `landlord_profiles`
- `payments`
- `agreements`
- `requests`
- `documents`
- `service_requests`

## Suggested relational schema

### users
- id PK
- first_name
- last_name
- email UNIQUE
- password_hash
- role
- created_at
- updated_at

### landlord_profiles
- id PK
- user_id FK -> users.id
- email
- first_name
- last_name
- created_at
- updated_at

### tenant_profiles
- id PK
- user_id FK -> users.id
- email
- first_name
- last_name
- balance
- created_at
- updated_at

### properties
- id PK
- landlord_id FK -> landlord_profiles.user_id
- title
- description
- location
- price
- type
- units
- status
- created_at
- updated_at

### payments
- id PK
- landlord_id FK -> landlord_profiles.user_id
- tenant_id FK -> tenant_profiles.user_id
- property_id FK -> properties.id
- amount
- date
- reference
- status
- created_at
- updated_at

### agreements
- id PK
- tenant_id FK -> tenant_profiles.user_id
- landlord_id FK -> landlord_profiles.user_id
- title
- status
- summary
- updated_at

### requests
- id PK
- tenant_id FK -> tenant_profiles.user_id
- landlord_id FK -> landlord_profiles.user_id
- subject
- message
- status
- created_at
- updated_at

### documents
- id PK
- landlord_id FK -> landlord_profiles.user_id
- tenant_id FK -> tenant_profiles.user_id
- key
- url
- original_name
- created_at

## Relationship summary

- One landlord has many properties
- One landlord has many tenants through tenant-landlord assignments
- One tenant may relate to many landlords
- Payments are tied to landlord, tenant, and optional property
- Agreements and requests connect tenants and landlords
- Document uploads may belong to tenants and landlords

## Constraints and indexes

- `users.email` should be unique and indexed
- `properties.landlord_id` should be indexed
- `payments.tenant_id` and `payments.landlord_id` should be indexed
- `tenant_profiles.user_id` and `landlord_profiles.user_id` should be unique
- `agreements.tenant_id` and `agreements.landlord_id` should be indexed
- `requests.tenant_id` and `requests.landlord_id` should be indexed

## Future recommendations

- Add `created_at` and `updated_at` timestamps to all tables
- Enforce referential integrity with foreign keys
- Add soft-delete flags if archive behavior is needed
- Use a migration system such as TypeORM or Prisma to manage schema changes
- Migrate in-memory demo state to persistent storage before any production deployment
- Avoid storing JWT refresh secrets in code; use environment variables
