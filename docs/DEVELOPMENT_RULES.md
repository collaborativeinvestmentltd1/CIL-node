# CIL Development Rules

## Mandatory rules

- Use TypeScript for all frontend and backend code.
- Avoid `any` in new code. Prefer explicit types, interfaces, and `unknown` when necessary.
- Keep backend and frontend documentation synchronized with actual implementation.
- Reuse shared components and services when available.
- Validate API inputs on the backend using DTOs and class-validator.
- Protect routes with authentication and role-based authorization.
- Optimize performance for frontend routes and backend query logic.
- Maintain consistency in naming, file structure, and module boundaries.

## Project-specific rules

- Do not deploy the backend with in-memory data stores. Implement persistent storage before production.
- Keep user authentication storage aligned across backend and frontend.
  - Use a single cookie name for auth flow.
  - Avoid redundant token storage strategies that diverge between app layers.
- Use environment variables only for features that are implemented.
  - Remove or implement unused `.env.example` entries.
- Keep stub and placeholder pages clearly marked and avoid shipping them as working features.
- Separate demo data from production logic.
- Prefer `AuthGuard` and `RolesGuard` patterns for backend authorization.
- Keep the shared API client and auth services consistent with frontend state management.
- Ensure public routes and protected dashboard routes are managed through the frontend App Router and middleware.
- Document every new feature in `/docs` as part of the development workflow.

## Coding conventions

- Use `app/` route groups in Next.js for `public` and `dashboard` layouts.
- Use `frontend/src/lib` for route helper and auth utilities.
- Use `frontend/src/store` for app-wide state with Zustand.
- Use `shared/api` for cross-project HTTP client and service contracts.
- Keep backend modules focused: controllers handle HTTP, services contain logic.
- Avoid importing files that do not exist, especially DTOs and service types.
- Prefer server-side validation and safe defaults over trusting client input.
- Keep security configuration explicit: CORS, CSP, rate limiting, and HTTPS behavior.
