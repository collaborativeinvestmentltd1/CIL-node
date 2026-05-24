# CIL Backend - NestJS API

Production-grade NestJS backend for CIL MVP.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Architecture

- **Modular structure**: Each feature (auth, users, properties, etc.) is a self-contained module
- **Separation of concerns**: Controllers, services, repositories
- **Database**: TypeORM with PostgreSQL
- **Authentication**: JWT with refresh tokens
- **Validation**: class-validator for DTO validation

## Modules

- **auth/** - Authentication, login, password reset
- **users/** - User management, profiles
- **properties/** - Property CRUD, listing
- **applications/** - Tenant applications
- **payments/** - Payment processing with Paystack
- **service-requests/** - Maintenance requests
- **common/** - Shared guards, filters, interceptors, utilities

## API Endpoints

See [docs/api-design.md](../docs/api-design.md) for full API specification.

## Database Migrations

```bash
npm run migration:run
```

## Development

- Watch mode: `npm run dev`
- Build: `npm run build`
- Test: `npm run test`
- Lint: `npm run lint`
