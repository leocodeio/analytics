# Web Analytics Platform - Technical Understanding

## Overview

This is a Next.js-based web analytics platform that provides comprehensive website tracking and data visualization capabilities. The platform captures user interactions, processes them into meaningful analytics, and presents insights through an intuitive dashboard.

## Core Architecture

### Technology Stack
- **Frontend/Backend**: Next.js 15.4.4 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **UI Framework**: Tailwind CSS with Shadcn/ui components
- **Charts**: Recharts for data visualization
- **Package Manager**: pnpm

## Data Collection Flow

### 1. Client-Side Tracking (`public/tracker.js`)

The analytics journey begins with a lightweight JavaScript tracker that gets embedded on client websites.

**Key Components:**
- **Session Management**: Generates unique session IDs using `crypto.randomUUID()` and stores them in `sessionStorage`
- **First Visit Detection**: Uses `localStorage` to track if this is a user's first visit
- **Event Collection**: Captures multiple types of events automatically

**Events Tracked:**
- **Pageviews**: Automatic tracking when the script loads (`tracker.js:84`)
- **Custom Events**: Click tracking on elements with `data-analytics` attributes (`tracker.js:87-103`)
- **Page Visibility**: Tracks when users switch tabs or minimize windows (`tracker.js:106-112`)
- **Page Unload**: Captures when users leave the page (`tracker.js:115-117`)

**Data Payload Structure:**
```javascript
{
  websiteId,        // Unique identifier for the website
  sessionId,        // User session identifier
  eventType,        // 'pageview' or 'custom'
  eventName,        // Specific event name (e.g., button click)
  path,             // Current page path
  referrer,         // Source URL
  screenWidth,      // Device screen dimensions
  screenHeight,
  timestamp,        // ISO timestamp
  isFirstVisit,     // Boolean flag
  ...data           // Additional event-specific data
}
```

**Robust Transmission:**
- **Primary Method**: Uses `navigator.sendBeacon` for reliable delivery (`tracker.js:52-59`)
- **Fallback**: Falls back to `fetch` with `keepalive: true` (`tracker.js:61-77`)
- **Retry Logic**: Implements exponential backoff with up to 3 attempts (`tracker.js:51-80`)

### 2. Server-Side Collection (`app/api/collect/route.ts`)

The collection API endpoint receives and validates all tracking data.

**Validation Pipeline:**
1. **Request Parsing**: Extracts event data from JSON body (`route.ts:6-18`)
2. **Required Field Validation**: Ensures `websiteId`, `eventType`, and `eventName` are present (`route.ts:21-33`)
3. **Website Verification**: Confirms the website exists in the database (`route.ts:36-49`)
4. **IP Extraction**: Captures client IP from headers for geolocation (`route.ts:52-55`)

**Data Enhancement:**
- Extracts `User-Agent` for device/browser detection
- Processes IP address (takes first IP if multiple)
- Handles geographic data (country, city) if provided

**Error Handling:**
- Foreign key constraint violations for invalid website IDs
- JSON parsing errors
- Comprehensive error responses with helpful hints

### 3. Database Schema (`prisma/schema.prisma`)

The platform uses a well-structured PostgreSQL schema with Prisma ORM.

**Core Models:**

**Website Model** (`schema.prisma:69-80`)
```prisma
model Website {
  id        String   @id @default(cuid())
  name      String   // Display name
  domain    String   // Website domain
  userId    String   // Owner reference
  events    Event[]  // Related events
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Event Model** (`schema.prisma:82-100`)
```prisma
model Event {
  id           String   @id @default(cuid())
  websiteId    String   // Website reference
  sessionId    String   // User session
  eventType    String   // 'pageview' or 'custom'
  eventName    String   // Event identifier
  path         String?  // Page path
  referrer     String?  // Referrer URL
  userAgent    String?  // Browser info
  screenWidth  Int?     // Device dimensions
  screenHeight Int?
  country      String?  // Geographic data
  city         String?
  ip           String?  // Client IP
  createdAt    DateTime @default(now())
}
```

### 4. Analytics Processing (`lib/analytics.ts`)

The analytics engine transforms raw events into meaningful insights.

**Core Processing Functions:**

**Time Range Calculation** (`analytics.ts:21-41`)
- Supports 24h, 7d, 30d, 90d periods
- Provides consistent date range handling

**Main Analytics Engine** (`analytics.ts:43-180`)
The `getAnalyticsData` function processes events into comprehensive metrics:

**Basic Metrics:**
- **Total Page Views**: Filters events by type 'pageview' (`analytics.ts:64`)
- **Unique Visitors**: Uses `Set` to count unique session IDs (`analytics.ts:65`)
- **Total Events**: Counts all events in time range (`analytics.ts:66`)

**Advanced Calculations:**

**Bounce Rate** (`analytics.ts:68-79`)
```javascript
// Sessions with only one pageview are considered bounces
const sessionPageViews = new Map()
pageViews.forEach(event => {
  const count = sessionPageViews.get(event.sessionId) || 0
  sessionPageViews.set(event.sessionId, count + 1)
})
const singlePageSessions = Array.from(sessionPageViews.values())
  .filter(count => count === 1).length
const bounceRate = (singlePageSessions / uniqueVisitors) * 100
```

**Session Duration** (`analytics.ts:82-101`)
```javascript
// Tracks start and end times for each session
const sessionDurations = new Map()
events.forEach(event => {
  const session = sessionDurations.get(event.sessionId)
  if (!session) {
    sessionDurations.set(event.sessionId, {
      start: event.createdAt,
      end: event.createdAt
    })
  } else {
    if (event.createdAt < session.start) session.start = event.createdAt
    if (event.createdAt > session.end) session.end = event.createdAt
  }
})
```

**Content Analytics:**
- **Top Pages**: Aggregates page views by path (`analytics.ts:104-112`)
- **Top Referrers**: Processes referrer URLs and extracts domains (`analytics.ts:115-129`)

**Device Analytics** (`analytics.ts:132-144`)
```javascript
// Classifies devices based on screen width
events.forEach(event => {
  if (event.screenWidth) {
    let device = "Desktop"
    if (event.screenWidth < 768) device = "Mobile"
    else if (event.screenWidth < 1024) device = "Tablet"
    deviceCounts.set(device, (deviceCounts.get(device) || 0) + 1)
  }
})
```

**Real-time Analytics** (`analytics.ts:156-166`)
```javascript
// Active visitors in last 5 minutes
const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
const recentEvents = await prisma.event.findMany({
  where: {
    websiteId,
    createdAt: { gte: fiveMinutesAgo }
  }
})
const realtimeVisitors = new Set(recentEvents.map(e => e.sessionId)).size
```

### 5. Real-time Data Processing (`lib/analytics.ts:182-211`)

Provides live visitor tracking and recent activity monitoring:

```javascript
export async function getRealtimeData(websiteId: string) {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
  const oneMinuteAgo = new Date(Date.now() - 1 * 60 * 1000)
  
  // Recent activity analysis
  const recentEvents = await prisma.event.findMany({
    where: { websiteId, createdAt: { gte: fiveMinutesAgo } },
    orderBy: { createdAt: "desc" },
    take: 50
  })
  
  // Active vs new visitor calculation
  const activeVisitors = new Set(recentEvents.map(e => e.sessionId)).size
  const newVisitors = new Set(
    recentEvents
      .filter(e => e.createdAt >= oneMinuteAgo)
      .map(e => e.sessionId)
  ).size
}
```

## Data Flow Conceptual Overview

```
[Client Website] 
       ↓ (tracker.js embeds)
[JavaScript Tracker]
       ↓ (collects events)
[Event Payload]
       ↓ (HTTP POST with retry)
[/api/collect Route Handler]
       ↓ (validates & enriches)
[PostgreSQL Database]
       ↓ (queries & processes)
[Analytics Engine]
       ↓ (computes metrics)
[Dashboard UI]
       ↓ (visualizes with Recharts)
[User Insights]
```

## Key Features & Capabilities

### Automatic Tracking
- Zero-configuration pageview tracking
- Custom event tracking via HTML attributes
- Session and visitor identification
- Device and browser detection

### Data Processing
- Real-time visitor counting (5-minute windows)
- Historical trend analysis
- Device classification (Mobile/Tablet/Desktop)
- Geographic analysis support
- Bounce rate and session duration calculations

### Dashboard Features
- Multiple time period analysis (24h, 7d, 30d, 90d)
- Interactive charts and visualizations
- Real-time visitor monitoring
- Top pages and referrer analysis
- Device breakdown insights

### Performance & Reliability
- Efficient Prisma ORM with connection pooling
- Retry logic for failed event submissions
- Cached analytics computations
- Real-time updates with 30-second polling
- Proper error handling and validation

## Security & Privacy
- User authentication via NextAuth.js
- Website ownership verification
- IP address processing for analytics
- No personally identifiable information stored
- Secure session management

This architecture provides a robust, scalable analytics platform that can handle high-volume event collection while delivering real-time insights through an intuitive dashboard interface.