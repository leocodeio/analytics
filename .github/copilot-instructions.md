# Web Analytics Platform - AI Coding Agent Instructions

## Project Overview

This is a **web analytics platform** built as a full-stack TypeScript application. The system tracks user engagement through an embedded JavaScript snippet and displays analytics in a dashboard.

## Architecture & Key Components

### Core Data Flow

1. **Tracker Script** (`public/tracker.js`) → embedded on client websites, sends events to `/api/collect`
2. **Collection API** (`app/api/collect/route.ts`) → validates and stores events via Prisma
3. **Dashboard** (`app/dashboard/`) → React Server Components fetching data directly with Prisma
4. **Database** → PostgreSQL with Prisma schema defining User → Website → Event relationships

### Technology Stack Specifics

- **Next.js 14+ with App Router** - Use React Server Components for data fetching
- **Prisma ORM** - Direct database queries in server components, no separate API layer needed
- **pnpm** - Package manager (not npm/yarn)
- **PostgreSQL via Docker** - Local development database
- **NextAuth.js** - Authentication with Prisma adapter

## Development Patterns

### Database & Prisma Workflows

```bash
# Essential Prisma commands after schema changes
npx prisma migrate dev --name <migration-name>
npx prisma generate
```

### Event Tracking Implementation

- Events have two types: `pageview` (automatic) and `custom` (manual via `data-analytics` attributes)
- Session tracking uses `sessionStorage` with `crypto.randomUUID()`
- Use `sendBeacon` API for reliability, fallback to `fetch` with `keepalive: true`

### Next.js App Router Patterns

- **Server Components**: Fetch data directly with Prisma (see `app/dashboard/page.tsx` example)
- **Client Components**: Mark with `'use client'` for interactivity (e.g., Recharts visualizations)
- **API Routes**: Use Route Handlers (`route.ts`) in `app/api/` directory

### Authentication Flow

- NextAuth.js with Prisma adapter extends User model with Account/Session tables
- Server components: Use `getServerSession()` for auth checks
- Keep credential provider support alongside OAuth

## Project Setup Commands

```bash
# Initial project setup
npx create-next-app@latest web-analytics-app --typescript --tailwind --eslint --app
pnpm install prisma @prisma/client next-auth @auth/prisma-adapter

# Database setup
docker-compose up -d  # Starts PostgreSQL
npx prisma init --datasource-provider postgresql
npx prisma migrate dev --name init
```

## File Structure Conventions

- `app/api/collect/route.ts` - Single endpoint for all event collection
- `public/tracker.js` - Vanilla JS tracker (no build step needed)
- `prisma/schema.prisma` - Single source of truth for data models
- `app/dashboard/` - Protected dashboard pages
- `components/` - Reusable UI components (client-side)

## Key Environment Variables

```bash
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/analytics_db"
NEXTAUTH_SECRET=<generated-secret>
NEXTAUTH_URL=http://localhost:3000
```

## Deployment Options

- **Vercel** (preferred) - Automatic deployments with environment variables
- **Docker** - Multi-stage build with standalone Next.js output

## Critical Implementation Notes

- Use `cuid()` for all database IDs (already configured in Prisma schema)
- API responses use 202 status for accepted events (fire-and-forget pattern)
- Chart components receive data as props from server components
- Track screen dimensions (`screenWidth`, `screenHeight`) for device analytics
