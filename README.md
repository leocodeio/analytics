# 📊 Web Analytics Platform

A modern, privacy-focused web analytics platform built with Next.js, TypeScript, and PostgreSQL. Track visitor behavior, analyze traffic patterns, and gain insights into your website's performance with a clean, intuitive dashboard.

## ✨ Features

### 🎯 Core Analytics
- **Real-time visitor tracking** - Monitor live activity as it happens
- **Page view analytics** - Track which pages are most popular
- **Session tracking** - Understand user behavior and session duration
- **Custom event tracking** - Track specific user interactions
- **Bounce rate analysis** - Measure engagement quality
- **Device & screen resolution tracking** - Understand your audience's setup

### � Advanced Analytics
- **Conversion funnel analysis** - Track user journey through your site
- **Geographic distribution** - See where your visitors come from
- **Traffic source analysis** - Understand how users find your site
- **User flow mapping** - Visualize navigation patterns
- **Performance metrics** - Track page load times and performance

### 🛡️ Privacy & Compliance
- **GDPR compliant** - Privacy-focused design
- **IP anonymization** - User privacy protection
- **No cookies required** - Uses localStorage and sessionStorage
- **Data retention controls** - Manage how long data is stored

### 🔧 Technical Features
- **Lightweight tracking script** - Minimal performance impact
- **Real-time dashboard** - Live updates without page refresh
- **Data export** - CSV and JSON export capabilities
- **Google OAuth integration** - Secure authentication
- **Responsive design** - Works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- Google OAuth credentials (for authentication)

### 1. Clone and Install

```bash
git clone https://github.com/leocodeio/analytics.git
cd analytics
pnpm install
```

### 2. Environment Setup

Create a `.env` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/analytics_db"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. Database Setup

```bash
# Create and migrate database
pnpm db:migrate

# Generate Prisma client
pnpm db:generate
```

### 4. Start Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` and sign in with Google to get started!

### 5. Add Demo Data (Optional)

```bash
# First sign in via the web interface, then:
pnpm db:seed
```

## 📋 Integration Guide

### Basic Setup

Add this script to your website's `<head>` section:

```html
<script 
  async 
  src="https://your-analytics-domain.com/tracker.js" 
  data-website-id="your-website-id">
</script>
```

### Custom Event Tracking

Track specific user interactions by adding `data-analytics` attributes:

```html
<!-- Button clicks -->
<button data-analytics="signup-button">Sign Up</button>

<!-- Link clicks -->
<a href="/pricing" data-analytics="pricing-link">View Pricing</a>

<!-- Form submissions -->
<form data-analytics="newsletter-signup">
  <input type="email" placeholder="Your email" />
  <button type="submit">Subscribe</button>
</form>
```

### Manual Event Tracking

Use the JavaScript API for custom tracking:

```javascript
// Track custom events
window.analytics.track('video-play', {
  videoTitle: 'Product Demo',
  duration: 120
});

// Track page views (for SPAs)
window.analytics.trackPageview('/virtual-page');
```

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js with Google OAuth
- **Charts**: Recharts
- **Tracking**: Vanilla JavaScript (no dependencies)

### Dashboard Features

- **Overview Page** - Real-time metrics and key insights
- **Real-time Page** - Live visitor activity monitoring
- **Reports Page** - Advanced analytics and funnel analysis
- **Websites Management** - Multi-site support
- **Events Page** - Custom event analysis
- **Integration Guide** - Easy setup instructions

## 🔧 Development

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm db:migrate   # Run database migrations
pnpm db:generate  # Generate Prisma client
pnpm db:seed      # Seed demo data
```

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

## 🔒 Privacy & Security

- **No PII collection** - We don't store personal information
- **IP anonymization** - IP addresses are hashed before storage
- **GDPR compliance** - Built with privacy regulations in mind
- **Secure authentication** - OAuth 2.0 with Google

## 📝 License

MIT License - see LICENSE file for details.

---

Made with ❤️ for the developer community
