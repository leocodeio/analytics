DEVELOPMENT.MD: Building a Modern Web Analytics Platform
This document provides a granular, end-to-end development plan for creating a web analytics application using a modern, full-stack TypeScript approach.

1. Prerequisites
Node.js and pnpm: Ensure you have Node.js (v18+) and pnpm installed.

Docker: Required for running a local PostgreSQL database.

Code Editor: A code editor like VS Code is recommended.

2. Project Overview
The goal is to build a web analytics platform that allows website owners to track user engagement by embedding a simple JavaScript snippet. The platform will collect data on page views, sessions, and custom events, and present this data in a user-friendly dashboard.

3. Technology Stack (Upgraded)
Full-Stack Framework: Next.js 14+ (with App Router)

ORM: Prisma for type-safe database access

Database: PostgreSQL

UI & Styling: React Server Components, Tailwind CSS

Data Visualization: Recharts

Authentication: NextAuth.js

Deployment: Docker / Vercel

4. System Architecture (Simplified)
By using a full-stack framework, we can significantly simplify the architecture:

Next.js Application: A single application that handles:

Dashboard Frontend: Built with React Server Components for fast, SEO-friendly pages.

API Layer: Built with Next.js Route Handlers (/api/...) to handle data collection, authentication, and analytics queries.

Tracker Script Hosting: The tracker.js file is served as a static asset from the public directory.

Prisma: Acts as the type-safe bridge between the Next.js application and the database.

PostgreSQL Database: The single source of truth for all user, website, and event data.

5. Granular End-to-End Development Steps
Phase 1: Project & Database Setup
1. Initialize Next.js Project:

npx create-next-app@latest web-analytics-app --typescript --tailwind --eslint --app
cd web-analytics-app

2. Set Up Database with Docker:
In the project root, create a docker-compose.yml:

version: '3.8'
services:
  db:
    image: postgres:14
    restart: always
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=analytics_db
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:

Run docker-compose up -d to start the database.

3. Set Up Prisma ORM:
Install Prisma and initialize it.

pnpm install prisma
pnpm install @prisma/client
npx prisma init --datasource-provider postgresql

This creates a prisma directory and a .env file. Update your .env with the database connection string:

# .env
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/analytics_db"

4. Define Prisma Schema:
Replace the contents of prisma/schema.prisma with your data models. This replaces the need for a separate .sql file.

// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(cuid())
  email     String    @unique
  password  String // We'll use NextAuth, but keep this for credential provider
  websites  Website[]
  createdAt DateTime  @default(now())
}

model Website {
  id        String   @id @default(cuid())
  name      String
  domain    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String
  events    Event[]
  createdAt DateTime @default(now())
}

model Event {
  id           String   @id @default(cuid())
  website      Website  @relation(fields: [websiteId], references: [id], onDelete: Cascade)
  websiteId    String
  sessionId    String
  eventType    String // 'pageview' or 'custom'
  eventName    String // e.g., '/', '/about', 'signup-click'
  path         String?
  referrer     String?
  userAgent    String?
  screenWidth  Int?
  screenHeight Int?
  createdAt    DateTime @default(now())
}

5. Sync Database with Schema:
Run your first migration to create the tables in your PostgreSQL database.

npx prisma migrate dev --name init

Phase 2: Data Collection
1. Create the Tracking Script (tracker.js):
Create the file public/tracker.js. Next.js will serve this file statically.

// public/tracker.js
(() => {
  const scriptElement = document.currentScript;
  if (!scriptElement) return;

  const websiteId = scriptElement.getAttribute('data-website-id');
  const apiEndpoint = '/api/collect'; // Relative path to our Next.js API

  if (!websiteId) {
    console.error('Analytics Tracker: data-website-id is missing.');
    return;
  }

  // Generate or retrieve a session ID
  let sessionId = sessionStorage.getItem('analytics-session-id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('analytics-session-id', sessionId);
  }

  const sendEvent = (eventType, eventName, data = {}) => {
    const payload = {
      websiteId,
      sessionId,
      eventType,
      eventName,
      path: window.location.pathname,
      referrer: document.referrer,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      ...data,
    };

    // Use sendBeacon for reliability, fallback to fetch
    if (navigator.sendBeacon) {
      const headers = { type: 'application/json' };
      const blob = new Blob([JSON.stringify(payload)], headers);
      navigator.sendBeacon(apiEndpoint, blob);
    } else {
      fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      });
    }
  };

  // 1. Track initial pageview
  sendEvent('pageview', window.location.pathname);

  // 2. Track clicks on designated elements
  document.body.addEventListener('click', (e) => {
    const element = e.target.closest('[data-analytics]');
    if (element) {
      const eventName = element.getAttribute('data-analytics');
      if (eventName) {
        sendEvent('custom', eventName, { ...element.dataset });
      }
    }
  }, true);
})();

2. Create the Data Collection API Endpoint:
Create the file app/api/collect/route.ts. This is a Next.js Route Handler.

// app/api/collect/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { websiteId, sessionId, eventType, eventName, path, referrer, screenWidth, screenHeight } = body;

    if (!websiteId || !eventType || !eventName) {
      return NextResponse.json({ message: 'Missing required event data.' }, { status: 400 });
    }

    await prisma.event.create({
      data: {
        websiteId,
        sessionId,
        eventType,
        eventName,
        path,
        referrer,
        userAgent: request.headers.get('user-agent'),
        screenWidth,
        screenHeight,
      },
    });

    return NextResponse.json({ message: 'Event received' }, { status: 202 });

  } catch (error) {
    console.error('Error collecting event:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

Phase 3: Full-Stack Dashboard
1. Implement User Authentication with NextAuth.js:
This is a more secure and robust way to handle users.

pnpm install next-auth @auth/prisma-adapter

Update prisma/schema.prisma to include NextAuth models (run npx prisma migrate dev after).

// Add these models to prisma/schema.prisma
model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String? @db.Text
  access_token       String? @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String? @db.Text
  session_state      String?
  user               User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// Modify User model
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  password      String? // Keep for credentials provider
  accounts      Account[]
  sessions      Session[]
  websites      Website[]
  createdAt     DateTime  @default(now())
}

Create the NextAuth configuration at app/api/auth/[...nextauth]/route.ts.

2. Build the Dashboard UI (React Server Components):
Structure your app directory with pages for authentication, a dashboard layout, and analytics views. Fetch data directly in your components using Prisma.

Example: app/dashboard/page.tsx

// app/dashboard/page.tsx
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // your auth config
import { PageViewsChart } from '@/components/page-views-chart';

const prisma = new PrismaClient();

async function getPageViews(websiteId: string) {
  // This is a simplified query. You'd likely group by day.
  const pageViews = await prisma.event.findMany({
    where: {
      websiteId: websiteId,
      eventType: 'pageview',
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  return pageViews;
}

export default async function DashboardPage() {
  // const session = await getServerSession(authOptions);
  // if (!session) { redirect('/login'); }

  // Fetch the user's first website for this example
  const website = await prisma.website.findFirst({ 
    // where: { userId: session.user.id } 
  });

  if (!website) {
    return <div>Please add a website to view analytics.</div>;
  }

  const data = await getPageViews(website.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard for {website.name}</h1>
      <p className="mb-4">Your tracking ID: {website.id}</p>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Page Views</h2>
        <PageViewsChart data={data} />
      </div>
    </div>
  );
}

The PageViewsChart would be a client component ('use client') that uses Recharts to render the data passed as props.

Phase 4: Deployment
Option 1: Deploy to Vercel (Recommended)

Push your code to a GitHub repository.

Go to vercel.com, sign up, and import your repository.

Configure environment variables (DATABASE_URL).

Vercel will automatically build and deploy your Next.js application.

Option 2: Deploy with Docker
Create a Dockerfile in your project root for a production-ready Next.js app.

# Dockerfile
# 1. Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# 2. Build the application
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN pnpm build

# 3. Production image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]

Update docker-compose.yml to use this Dockerfile for your app service. This provides a more robust deployment option for cloud providers other than Vercel.

## Responsive Design Guidelines (2025-08)
The application has been updated for improved mobile and small-screen responsiveness.

Key patterns:
- Containers: Use max-w-* with responsive horizontal padding (px-4 sm:px-6) and allow vertical stacking via flex-wrap as needed.
- Forms & Filters: Avoid hard fixed widths; use w-full with min-w-* plus breakpoint-specific widths (e.g., min-w-[10rem] w-full sm:w-48).
- Navigation: Desktop sidebar hidden on < md; mobile sheet menu (left slide-in) accessible via a menu button in Navbar.
- Tables: Wrapped in overflow-x-auto container with a sensible min-w (min-w-[640px]) to preserve layout and enable horizontal scroll on narrow screens.
- Charts: ResponsiveContainer plus adaptive fixed heights (h-64 sm:h-72 md:h-80) for better aspect on small devices.
- Landing Page Steps: Responsive gap utilities (gap-10 sm:gap-14 lg:gap-16) and reduced hero heading size on very small screens.
- Auth Pages: Headings scale (text-2xl sm:text-3xl) to prevent overflow; layout already centers with responsive padding.

When adding new UI:
1. Prefer flex/grid with gap utilities over margin chains.
2. Always test at 320px, 375px, 768px, 1024px, 1280px widths.
3. Use w-full for interactive controls inside constrained parents.
4. Provide horizontal scrolling for any data view that would otherwise squeeze below ~280px column width.
5. Avoid introducing fixed pixel heights unless also made responsive with breakpoint variants.

Follow these conventions to maintain consistency.