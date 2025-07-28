# 📊 Web Analytics Platform

A comprehensive, privacy-focused web analytics platform that provides real-time insights into website performance and user behavior patterns.

---

## 1. Project Overview & Technology Stack

### Problem Statement
Modern businesses need to understand how users interact with their websites to make data-driven decisions. However, existing analytics solutions often come with privacy concerns, complex integration processes, or high costs. This project solves these challenges by providing:

- **Privacy-first analytics** that doesn't compromise user data
- **Simple integration** with just a single script tag
- **Real-time insights** for immediate business decisions
- **Multi-website management** for agencies and businesses with multiple properties
- **Customizable event tracking** for specific business metrics

### Core Technology Stack

#### Frontend Architecture
- **Next.js 15.4.4** - React framework with App Router for modern routing patterns
- **React 19.1.0** - Latest React with Server Components and concurrent features
- **TypeScript 5.8.3** - Type safety across the entire application
- **Tailwind CSS 4.1.11** - Utility-first CSS framework for rapid UI development
- **Shadcn/ui Components** - Accessible, pre-built components based on Radix UI primitives

#### Backend & Database
- **Next.js API Routes** - Serverless functions for backend logic
- **Prisma 6.12.0** - Type-safe ORM with PostgreSQL integration
- **PostgreSQL** - Robust relational database for analytics data storage
- **NextAuth.js 4.24.11** - Complete authentication solution with Google OAuth

#### Analytics & Visualization
- **Recharts 3.1.0** - Responsive charting library for data visualization
- **Vanilla JavaScript Tracker** - Lightweight client-side tracking script
- **Real-time Data Processing** - Live analytics computation and updates

#### Development Tools
- **pnpm** - Fast, disk-efficient package manager
- **ESLint** - Code quality and consistency enforcement
- **TSX** - TypeScript execution for database seeding scripts

---

## 2. Feature Set & Capabilities

### Core Analytics Features
- **Real-time Visitor Tracking** - Monitor live user activity with 5-minute precision
- **Page View Analytics** - Track page popularity and user navigation patterns
- **Session Analysis** - Understand user engagement through session duration and behavior
- **Bounce Rate Calculation** - Measure engagement quality with single-page session tracking
- **Device & Screen Resolution Tracking** - Categorize users by Mobile/Tablet/Desktop
- **Geographic Distribution** - Analyze visitor locations (when available)
- **Referrer Analysis** - Understand traffic sources and marketing effectiveness

### Advanced Analytics Capabilities
- **Custom Event Tracking** - Track specific user interactions (button clicks, form submissions, etc.)
- **Multi-website Management** - Single dashboard for multiple website properties
- **Time-based Analysis** - Filter data by 24h, 7d, 30d, or 90d periods
- **Export Functionality** - Download analytics data in CSV and JSON formats
- **Real-time Dashboard Updates** - Live data refresh every 30 seconds

### Privacy & Compliance Features
- **GDPR Compliant Design** - Privacy-focused data collection practices
- **IP Anonymization** - Hash IP addresses before storage
- **No Cookie Requirements** - Uses localStorage and sessionStorage only
- **Minimal Data Collection** - Only essential analytics data is stored
- **User-controlled Tracking** - Easy opt-out mechanisms

### Technical Features
- **Lightweight Tracking Script** - Minimal performance impact on tracked websites
- **Retry Logic** - Robust event delivery with exponential backoff
- **Error Handling** - Comprehensive error management and debugging features
- **Responsive Design** - Works seamlessly across all device types
- **Multi-user Support** - Each user manages their own website properties

---

## 3. Complete Codebase Understanding

### 3.1 Database Architecture & Data Modeling

#### Database Schema Design
The application uses a carefully designed PostgreSQL schema that supports both NextAuth.js requirements and analytics functionality:

**User Management Tables:**
- `users` - Core user information with Google OAuth integration
- `accounts` - OAuth provider account connections
- `sessions` - Active user sessions for authentication
- `verificationtokens` - Email verification and password reset tokens

**Analytics Tables:**
- `websites` - Website properties owned by users
- `events` - Core analytics events with comprehensive metadata

#### Event Data Model
Each analytics event captures comprehensive metadata:

```typescript
interface Event {
  id: string;           // Unique event identifier
  websiteId: string;    // Associated website
  sessionId: string;    // User session identifier
  eventType: string;    // 'pageview' or 'custom'
  eventName: string;    // Event identifier (/path or custom-event-name)
  path: string;         // URL path
  referrer: string;     // Traffic source
  userAgent: string;    // Browser/device information
  screenWidth: number;  // Screen resolution width
  screenHeight: number; // Screen resolution height
  country: string;      // Geographic location
  city: string;         // City-level location
  ip: string;           // Anonymized IP address
  createdAt: Date;      // Event timestamp
}
```

### 3.2 Client-Side Tracking System

#### Tracking Script Architecture (`public/tracker.js`)
The tracking script implements a sophisticated client-side analytics system:

**Initialization Process:**
1. **Script Parameter Extraction** - Reads `data-website-id` and configuration attributes
2. **Session Management** - Generates UUID-based session IDs stored in sessionStorage
3. **First-visit Detection** - Uses localStorage to track returning visitors
4. **Event Sending Infrastructure** - Implements retry logic with exponential backoff

**Event Collection Mechanisms:**
- **Automatic Pageview Tracking** - Captures initial page load
- **Click Event Monitoring** - Tracks elements with `data-analytics` attributes
- **Page Visibility Tracking** - Monitors when users switch tabs or minimize browser
- **Page Unload Detection** - Captures when users leave the page

**Advanced Features:**
- **Retry Logic** - Uses `navigator.sendBeacon` with fallback to `fetch`
- **Error Handling** - Graceful degradation when analytics endpoints are unavailable
- **Debug Mode** - Configurable logging for development and troubleshooting
- **Performance Optimization** - Minimal impact on host website performance

### 3.3 Backend API Architecture

#### Event Collection API (`app/api/collect/route.ts`)
The collection endpoint implements robust server-side event processing:

**Request Validation Pipeline:**
1. **JSON Parsing** - Validates request body format
2. **Required Field Validation** - Ensures websiteId, eventType, and eventName are present
3. **Website Verification** - Confirms website exists and is accessible
4. **Data Sanitization** - Processes and cleans incoming event data

**IP Address Processing:**
- Extracts real IP from `x-forwarded-for` or `x-real-ip` headers
- Handles proxy and CDN configurations
- Takes first IP from comma-separated lists

**Error Handling Strategies:**
- Foreign key constraint violations
- JSON parsing errors
- Database connection issues
- Development vs. production error disclosure

#### Authentication System (`lib/auth.ts`)
NextAuth.js configuration provides secure user management:

**OAuth Integration:**
- Google OAuth 2.0 provider configuration
- Prisma adapter for database session storage
- Custom session callbacks for user ID inclusion
- Database-based session strategy for security

### 3.4 Analytics Processing Engine

#### Core Analytics Engine (`lib/analytics.ts`)
The analytics engine transforms raw events into meaningful insights:

**Data Aggregation Functions:**

1. **Visitor Metrics Calculation:**
   ```typescript
   // Unique visitors from session IDs
   const uniqueVisitors = new Set(events.map(e => e.sessionId)).size;
   ```

2. **Bounce Rate Analysis:**
   ```typescript
   // Sessions with only one pageview
   const sessionPageViews = new Map<string, number>();
   const bounceRate = (singlePageSessions / uniqueVisitors) * 100;
   ```

3. **Session Duration Computation:**
   ```typescript
   // Time difference between first and last event per session
   const totalDuration = Array.from(sessionDurations.values())
     .reduce((sum, {start, end}) => sum + (end.getTime() - start.getTime()), 0);
   ```

4. **Device Classification Algorithm:**
   ```typescript
   // Based on screen width breakpoints
   let device = "Desktop";
   if (screenWidth < 768) device = "Mobile";
   else if (screenWidth < 1024) device = "Tablet";
   ```

**Time Range Processing:**
- Flexible date range calculations (24h, 7d, 30d, 90d)
- Real-time data filtering (last 5 minutes)
- Daily aggregation for trend analysis

### 3.5 Frontend Component Architecture

#### Dashboard Components Structure
The frontend implements a modular component architecture:

**Layout Components:**
- `app/dashboard/layout.tsx` - Protected route wrapper with authentication
- `components/dashboard/sidebar.tsx` - Navigation and website selection
- `components/dashboard/navbar.tsx` - Top navigation with user controls

**Data Visualization Components:**
- `components/charts/page-views-chart.tsx` - Recharts-based line chart for trends
- `components/dashboard/stats-cards.tsx` - Key metrics display cards
- `components/dashboard/realtime-dashboard.tsx` - Live visitor monitoring

**Interactive Components:**
- `components/dashboard/dashboard-filters.tsx` - Time period and website selection
- `components/dashboard/website-selector.tsx` - Multi-website switching interface
- `components/events/events-table.tsx` - Tabular event data display

#### State Management Patterns
The application uses modern React patterns for state management:

**Server State:**
- React Server Components for initial data loading
- `searchParams` for URL-based filter state
- Automatic revalidation on navigation

**Client State:**
- React hooks for component-level state
- Real-time updates via polling mechanism
- Form state management with React Hook Form

### 3.6 Data Flow Architecture

#### Request-Response Cycle
The complete data flow follows this pattern:

1. **Client-side Event Capture:**
   ```
   User Action → tracker.js → Event Object → API Request
   ```

2. **Server-side Processing:**
   ```
   API Endpoint → Validation → Database Storage → Response
   ```

3. **Dashboard Data Flow:**
   ```
   Database Query → Analytics Engine → Component Props → UI Render
   ```

#### Real-time Update Mechanism
Live dashboard updates use a polling-based approach:

1. **Client Polling** - 30-second intervals for dashboard updates
2. **Real-time Queries** - Last 5 minutes of data for live visitor counts
3. **Optimistic Updates** - Immediate UI feedback for user actions

### 3.7 Security & Privacy Implementation

#### Data Privacy Measures
- **IP Anonymization** - Hash IP addresses before database storage
- **Minimal Data Collection** - Only essential analytics metadata
- **Session-based Tracking** - No persistent user identification
- **GDPR Compliance** - User-controlled data retention and deletion

#### Security Features
- **Input Validation** - Comprehensive server-side data validation
- **SQL Injection Prevention** - Prisma ORM with parameterized queries
- **CSRF Protection** - NextAuth.js built-in security measures
- **Rate Limiting** - API endpoint protection (can be configured)

### 3.8 Performance Optimization

#### Client-side Optimizations
- **Lightweight Tracker** - Minimal JavaScript footprint (<5KB)
- **Async Loading** - Non-blocking script execution
- **Event Batching** - Efficient data transmission
- **Local Storage Caching** - Reduce redundant API calls

#### Server-side Optimizations
- **Database Indexing** - Optimized queries for analytics aggregation
- **Connection Pooling** - Efficient database connection management
- **Caching Strategies** - React Server Components with automatic caching
- **API Response Optimization** - Minimal JSON payloads

### 3.9 Development & Deployment Architecture

#### Development Workflow
- **pnpm Workspace** - Monorepo package management
- **TypeScript Compilation** - Type checking and build process
- **Prisma Migrations** - Database schema version control
- **ESLint Configuration** - Code quality enforcement

#### Production Deployment
- **Next.js Optimizations** - Automatic code splitting and optimization
- **Vercel Integration** - Seamless deployment pipeline
- **Environment Configuration** - Secure credential management
- **Database Migrations** - Production-safe schema updates

This comprehensive architecture provides a robust, scalable, and privacy-focused analytics platform that can handle enterprise-level traffic while maintaining simplicity for developers and end-users.
