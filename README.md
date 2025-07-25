# Web Analytics Platform

A modern, privacy-focused web analytics platform built with Next.js 14, Prisma, and PostgreSQL.

## Features

- 🚀 **Real-time Analytics**: Track page views, custom events, and user behavior
- 🔒 **Privacy Focused**: GDPR compliant, no cookies, minimal data collection
- ⚡ **Lightweight**: Minimal impact on website performance
- 📊 **Beautiful Dashboard**: Clean, intuitive interface with charts and insights
- 🌐 **Multi-website Support**: Manage multiple websites from one dashboard

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React Server Components
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **UI**: Tailwind CSS, Recharts for visualizations
- **TypeScript**: Full type safety throughout

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/leocodeio/analytics.git
cd analytics
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your database credentials and secrets
```

4. Set up the database:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### 1. Create an Account

Sign up for a new account or sign in to your existing account.

### 2. Add a Website

In the dashboard, go to "Websites" and add your website domain.

### 3. Install Tracking Script

Copy the provided tracking script and add it to your website's `<head>` section:

```html
<script
  async
  src="http://localhost:3000/tracker.js"
  data-website-id="your-website-id"
></script>
```

### 4. Track Custom Events

Add `data-analytics` attributes to elements you want to track:

```html
<button data-analytics="signup-click">Sign Up</button>
<a href="/pricing" data-analytics="pricing-link">View Pricing</a>
```

## License

MIT License - see LICENSE file for details.
