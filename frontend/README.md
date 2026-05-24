# CIL Frontend - Next.js Application

Production-grade Next.js frontend for CIL MVP.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Architecture

- **App Router**: Next.js 14 with folder-based routing
- **Route Groups**: Separate (public) and (dashboard) layouts
- **Components**: Modular, reusable UI components using Shadcn UI
- **State Management**: Zustand + TanStack Query
- **Forms**: React Hook Form with validation
- **Styling**: Tailwind CSS

## Project Structure

- **app/**: Page routes and layouts
  - **(public)**: Landing pages, blog, contact
  - **(dashboard)**: Protected routes for tenant, admin, corporate portals
- **components/**: Reusable React components
- **services/**: API client functions
- **hooks/**: Custom React hooks
- **store/**: Zustand stores
- **types/**: TypeScript types and interfaces
- **utils/**: Utility functions

## Key Features

- Mobile-first responsive design
- Fast image loading with Cloudinary
- JWT authentication with refresh tokens
- Protected routes per user role
- Real-time data sync with TanStack Query

## Development

- Watch mode: `npm run dev`
- Build: `npm run build`
- Production: `npm run start`
- Lint: `npm run lint`
