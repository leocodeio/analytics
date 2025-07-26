# 🤖 AGENTS.md - Automated Systems & Background Processes

This document outlines the various automated agents, background processes, and intelligent systems within the Web Analytics Platform, focusing only on technologies actually used in this project.

## 📊 Analytics Collection Agents

### 1. Client-Side Tracking Agent (`public/tracker.js`)

**Purpose**: Autonomous data collection from user interactions on client websites.

**Agent Characteristics**:

- **Self-initializing**: Automatically starts when script loads
- **Session management**: Generates and manages unique session IDs
- **Retry logic**: Built-in error handling with exponential backoff
- **Event-driven**: Responds to user interactions and page lifecycle events

**Autonomous Behaviors**:

- First-visit detection and storage
- Session ID generation and persistence
- Automatic pageview tracking
- Custom event capturing via `data-analytics` attributes
- Page visibility change monitoring
- Page unload event tracking

---

### 2. Real-time Data Processing Agent (`lib/analytics.ts`)

**Purpose**: Background analytics computation and real-time visitor tracking.

**Agent Characteristics**:

- **Data aggregation**: Processes raw events into meaningful metrics
- **Time-based analysis**: Automatically categorizes data by time periods
- **Device classification**: Intelligent device type detection
- **Session analysis**: Groups events by session for behavior analysis

**Key Metrics Computed**:

- Unique visitor counting
- Bounce rate calculation
- Session duration analysis
- Device breakdown (Mobile/Tablet/Desktop)
- Geographic distribution
- Top pages and referrers ranking

---

### 3. Event Collection API Agent (`app/api/collect/route.ts`)

**Purpose**: Server-side event ingestion and validation agent.

**Agent Characteristics**:

- **Request validation**: Automatically validates incoming event data
- **IP processing**: Extracts and processes client IP addresses
- **Header parsing**: Intelligent user agent and header analysis
- **Data normalization**: Standardizes event data before storage

---

## 🔄 Real-time Update Agents

### 4. Dashboard Auto-refresh Agent (`components/dashboard/realtime-dashboard.tsx`)

**Purpose**: Client-side polling agent for live dashboard updates.

**Agent Characteristics**:

- **Polling mechanism**: 30-second automatic refresh cycle
- **Connection monitoring**: Tracks connection health
- **Error recovery**: Automatic retry on failed requests
- **State management**: Maintains real-time data consistency

---

## 🗄️ Data Management Agents

### 5. Demo Data Seeding Agent (`scripts/seed-demo-data.ts`)

**Purpose**: Automated test data generation for development and demonstration.

**Agent Characteristics**:

- **Data generation**: Creates realistic analytics events
- **Batch processing**: Handles large data insertions efficiently
- **Distribution simulation**: Mimics real user behavior patterns
- **Time-based events**: Generates historical data across time periods

---

## 🛠️ Technology Stack Used

### Core Framework

#### Next.js 15.4.4

**Purpose**: React framework with App Router and API routes.

- **App Router**: File-based routing with layouts
- **React Server Components**: Server-side rendering
- **API Routes**: Built-in serverless functions
- **Turbopack**: Fast development bundler

#### React 19.1.0 & React DOM 19.1.0

**Purpose**: UI library for building interactive interfaces.

- Component-based architecture
- Hooks for state management
- Server components support

#### TypeScript 5.8.3

**Purpose**: Type safety and enhanced developer experience.

- Compile-time error detection
- IntelliSense and auto-completion
- Interface definitions for API contracts

---

### Database & ORM

#### Prisma 6.12.0 & @prisma/client 6.12.0

**Purpose**: Type-safe database access and schema management.

- Database schema definition
- Type-safe queries
- Migration management
- Connection pooling

**Essential Commands**:

```bash
pnpm db:generate  # Generate Prisma client
pnpm db:migrate   # Run database migrations
```

---

### Authentication

#### NextAuth.js 4.24.11 & @next-auth/prisma-adapter 1.0.7

**Purpose**: Complete authentication solution with OAuth providers.

- Google OAuth integration
- Session management
- Database adapter for user storage
- JWT strategy

---

### UI Framework & Components

#### Tailwind CSS 4.1.11 & @tailwindcss/postcss 4.1.11

**Purpose**: Utility-first CSS framework.

- Rapid UI development
- Responsive design utilities
- Custom design system

#### Shadcn/ui Components (Radix UI)

**Purpose**: Accessible, pre-built UI components.

**Components Used**:

- `@radix-ui/react-dialog` 1.1.14 - Modal dialogs
- `@radix-ui/react-dropdown-menu` 2.1.15 - Dropdown menus
- `@radix-ui/react-label` 2.1.7 - Form labels
- `@radix-ui/react-navigation-menu` 1.2.13 - Navigation
- `@radix-ui/react-select` 2.2.5 - Select dropdowns
- `@radix-ui/react-separator` 1.1.7 - Visual separators
- `@radix-ui/react-slot` 1.2.3 - Component composition
- `@radix-ui/react-tabs` 1.1.12 - Tab interfaces
- `@radix-ui/react-tooltip` 1.2.7 - Tooltips

#### Supporting UI Libraries

- `class-variance-authority` 0.7.1 - Component variant management
- `clsx` 2.1.1 - Conditional CSS class names
- `tailwind-merge` 3.3.1 - Tailwind class merging
- `lucide-react` 0.525.0 - Icon library

---

### Data Visualization

#### Recharts 3.1.0

**Purpose**: React charting library for analytics visualization.

- Line charts for page views
- Bar charts for device breakdown
- Responsive chart containers
- Interactive tooltips

---

### Form Management

#### React Hook Form 7.61.1 & @hookform/resolvers 5.2.0

**Purpose**: Form handling with validation.

- Form state management
- Validation integration
- Performance optimization

#### Zod 4.0.10

**Purpose**: TypeScript-first schema validation.

- Runtime type checking
- Form validation schemas
- API request validation

---

### Development Tools

#### pnpm (Package Manager)

**Purpose**: Fast, disk space efficient package manager.

**Workspace Configuration**:

```yaml
# pnpm-workspace.yaml
packages:
  - "."
```

**Available Scripts**:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:migrate": "prisma migrate dev",
    "db:generate": "prisma generate",
    "db:seed": "tsx scripts/seed-demo-data.ts"
  }
}
```

#### TSX 4.20.3

**Purpose**: TypeScript execution for scripts.

- Direct TypeScript file execution
- Used for database seeding scripts

#### ESLint 9.32.0 & eslint-config-next 15.4.4

**Purpose**: Code quality and consistency.

- Next.js specific linting rules
- Code style enforcement

#### Development Dependencies

- `@types/node` 20.19.9 - Node.js type definitions
- `@types/react` 19.1.8 - React type definitions
- `@types/react-dom` 19.1.6 - React DOM type definitions
- `tw-animate-css` 1.3.6 - Tailwind CSS animations

---

## 📦 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (NextAuth, collect, export, realtime, websites)
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Protected dashboard pages
│   ├── demo/              # Public demo page
│   └── globals.css        # Tailwind CSS styles
├── components/            # React components
│   ├── charts/           # Recharts components
│   ├── dashboard/        # Dashboard-specific components
│   ├── ui/               # Shadcn/ui components
│   └── websites/         # Website management
├── lib/                  # Utility libraries
│   ├── analytics.ts      # Analytics functions
│   ├── auth.ts          # NextAuth configuration
│   ├── prisma.ts        # Prisma client
│   └── utils.ts         # Helper utilities
├── prisma/              # Prisma schema and migrations
├── public/              # Static assets including tracker.js
├── scripts/             # TSX scripts (seed-demo-data.ts)
└── types/               # TypeScript definitions
```

---

## 🚀 Key Features & Usage

### Package Manager (pnpm ONLY)

**Important**: This project uses `pnpm` exclusively. Do not use `npm` or `yarn`.

```bash
# Install dependencies
pnpm install

# Development server with Turbopack
pnpm dev

# Database operations
pnpm db:migrate
pnpm db:generate
pnpm db:seed

# Build for production
pnpm build
```

### Authentication Flow

- Google OAuth via NextAuth.js
- Prisma adapter for database storage
- JWT session strategy
- Protected dashboard routes

### Analytics Pipeline

1. **tracker.js** → Collects events from client websites
2. **API routes** → Validate and store events via Prisma
3. **Analytics engine** → Process data into metrics
4. **Dashboard** → Display insights with Recharts

### UI Component System

- Shadcn/ui components built on Radix UI primitives
- Tailwind CSS for styling
- Lucide React for icons
- Form validation with React Hook Form + Zod

---

**Note**: This platform focuses on using proven, stable technologies with excellent TypeScript support and modern React patterns. All dependencies are carefully selected for performance, developer experience, and long-term maintainability.
