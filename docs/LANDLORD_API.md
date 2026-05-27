# CIL Landlord API Spec

Version: 1.0

Summary
- Purpose: backend API endpoints required to fully support the Landlord portal (tenants, properties, payments, documents, billboards, ranking, and real-time sync).
- Auth: JWT (Bearer) with role-based access: `tenant`, `landlord`, `admin`.

Base URL
- Production: `https://api.cil.example.com`
- Local dev: `http://localhost:4000`

Common headers
- `Authorization: Bearer <jwt>`
- `Content-Type: application/json` (or `multipart/form-data` for uploads)

Errors
- Standard JSON error: { "error": "message", "code": "ERROR_CODE" }

Auth
- POST /auth/login
  - body: { email, password }
  - resp: { token, user: { id, role } }

Landlord endpoints

Tenants
- GET /landlords/:landlordId/tenants
  - query: ?propertyId=&page=&limit=
  - resp: { tenants: [{ id, name, unit, tenantId, lastPaymentDate }], meta }

- GET /landlords/:landlordId/tenants/:tenantId
  - resp includes tenant profile and uploaded documents references

- GET /landlords/:landlordId/tenants/:tenantId/payments
  - resp: list of payment records (amount, date, method, reference)

Properties
- GET /landlords/:landlordId/properties
  - resp: list of properties (id, title, location, units, status, rankTag)

- POST /landlords/:landlordId/properties
  - body: { title, description, location, price, type, units, amenities }
  - resp: created property

- GET /properties/:propertyId
  - public property detail used by tenant listing pages

- PATCH /landlords/:landlordId/properties/:propertyId
  - update property fields

- DELETE /landlords/:landlordId/properties/:propertyId
  - soft delete (archive) recommended

Payments
- GET /landlords/:landlordId/payments?from=&to=&propertyId=
  - aggregated payments, per-tenant breakdown

- POST /payments/webhook
  - external payment provider posts here to confirm settlement
  - validate signature; update tenant and landlord balances

Documents (uploads)
- POST /landlords/:landlordId/documents
  - multipart form: file, type (id|lease|guarantor|other), tenantId (optional)
  - returns storage URL and doc id

- GET /documents/:documentId
  - returns presigned URL or streaming endpoint (auth required)

Billboards / Messages
- POST /landlords/:landlordId/messages
  - body: { audience: "all" | "tenant", tenantId?, title, message, expiresAt? }
  - creates a message visible to tenants (global or specific)

- GET /landlords/:landlordId/messages?audience=&tenantId=
  - list of messages

- GET /tenants/:tenantId/messages
  - tenant-visible messages (filters applied server-side)

Ranking
- GET /landlords/:landlordId/rank
  - resp: { rank: "House Owner"|"Portfolio Owner"|"Property Manager", propertiesCount }

- POST /admin/rerank
  - admin-only job trigger to recompute ranks for all landlords (for scheduled/recompute use-case)

Realtime
- WebSocket namespace: `/ws` or server-sent-events
- Events
  - `tenant.payment.updated` — payload includes payment record and affected tenant/landlord IDs
  - `message.created` — new billboard/message for tenant or landlord
  - `property.updated` — property created/updated/archived

Security and RBAC notes
- Only landlords can create/edit their own properties and messages.
- Tenants can view messages targeted at them or global messages for their landlord.
- Documents: sensitive, stored in S3-compatible storage with presigned URLs; access check required.

Sample: GET landlord tenants
Request:
  GET /landlords/abc123/tenants
Response:
  {
    "tenants": [
      { "id": "t1", "name": "Jane Doe", "unit": "Unit 3A", "lastPaymentDate": "2026-05-02" }
    ],
    "meta": { "total": 1 }
  }

Notes & next steps
- Implement server validation, rate limits, logging, and background jobs for ranking.
- Use webhooks and a job queue for payment reconciliation and rank recomputation.
