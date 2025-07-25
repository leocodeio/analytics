import { prisma } from "@/lib/prisma";

export interface AnalyticsData {
  totalPageViews: number;
  uniqueVisitors: number;
  totalEvents: number;
  bounceRate: number;
  averageSessionDuration: number;
  topPages: Array<{ path: string; views: number }>;
  topReferrers: Array<{ referrer: string; count: number }>;
  deviceBreakdown: Array<{ device: string; count: number }>;
  dailyPageViews: Array<{ date: string; views: number }>;
  realtimeVisitors: number;
}

export interface TimeRange {
  start: Date;
  end: Date;
}

export function getTimeRange(period: "24h" | "7d" | "30d" | "90d"): TimeRange {
  const end = new Date();
  const start = new Date();

  switch (period) {
    case "24h":
      start.setHours(start.getHours() - 24);
      break;
    case "7d":
      start.setDate(start.getDate() - 7);
      break;
    case "30d":
      start.setDate(start.getDate() - 30);
      break;
    case "90d":
      start.setDate(start.getDate() - 90);
      break;
  }

  return { start, end };
}

export async function getAnalyticsData(
  websiteId: string,
  timeRange: TimeRange
): Promise<AnalyticsData> {
  const { start, end } = timeRange;

  // Get all events for the time range
  const events = await prisma.event.findMany({
    where: {
      websiteId,
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Calculate basic metrics
  const pageViews = events.filter((e) => e.eventType === "pageview");
  const uniqueVisitors = new Set(events.map((e) => e.sessionId)).size;
  const totalEvents = events.length;

  // Calculate bounce rate (sessions with only one pageview)
  const sessionPageViews = new Map<string, number>();
  pageViews.forEach((event) => {
    const count = sessionPageViews.get(event.sessionId) || 0;
    sessionPageViews.set(event.sessionId, count + 1);
  });

  const singlePageSessions = Array.from(sessionPageViews.values()).filter(
    (count) => count === 1
  ).length;
  const bounceRate =
    uniqueVisitors > 0 ? (singlePageSessions / uniqueVisitors) * 100 : 0;

  // Calculate average session duration (simplified)
  const sessionDurations = new Map<string, { start: Date; end: Date }>();
  events.forEach((event) => {
    const session = sessionDurations.get(event.sessionId);
    if (!session) {
      sessionDurations.set(event.sessionId, {
        start: event.createdAt,
        end: event.createdAt,
      });
    } else {
      if (event.createdAt < session.start) session.start = event.createdAt;
      if (event.createdAt > session.end) session.end = event.createdAt;
    }
  });

  const totalDuration = Array.from(sessionDurations.values()).reduce(
    (sum, { start, end }) => sum + (end.getTime() - start.getTime()),
    0
  );
  const averageSessionDuration =
    uniqueVisitors > 0 ? totalDuration / uniqueVisitors / 1000 : 0;

  // Top pages
  const pageViewCounts = new Map<string, number>();
  pageViews.forEach((event) => {
    const path = event.path || event.eventName;
    pageViewCounts.set(path, (pageViewCounts.get(path) || 0) + 1);
  });
  const topPages = Array.from(pageViewCounts.entries())
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  // Top referrers
  const referrerCounts = new Map<string, number>();
  events.forEach((event) => {
    if (event.referrer && event.referrer !== "") {
      const referrer = new URL(event.referrer).hostname;
      referrerCounts.set(referrer, (referrerCounts.get(referrer) || 0) + 1);
    }
  });
  const topReferrers = Array.from(referrerCounts.entries())
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Device breakdown (simplified based on screen width)
  const deviceCounts = new Map<string, number>();
  events.forEach((event) => {
    if (event.screenWidth) {
      let device = "Desktop";
      if (event.screenWidth < 768) device = "Mobile";
      else if (event.screenWidth < 1024) device = "Tablet";

      deviceCounts.set(device, (deviceCounts.get(device) || 0) + 1);
    }
  });
  const deviceBreakdown = Array.from(deviceCounts.entries()).map(
    ([device, count]) => ({ device, count })
  );

  // Daily page views (last 30 days)
  const dailyViews = new Map<string, number>();
  pageViews.forEach((event) => {
    const date = event.createdAt.toISOString().split("T")[0];
    dailyViews.set(date, (dailyViews.get(date) || 0) + 1);
  });
  const dailyPageViews = Array.from(dailyViews.entries())
    .map(([date, views]) => ({ date, views }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Real-time visitors (last 5 minutes)
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const recentEvents = await prisma.event.findMany({
    where: {
      websiteId,
      createdAt: {
        gte: fiveMinutesAgo,
      },
    },
  });
  const realtimeVisitors = new Set(recentEvents.map((e) => e.sessionId)).size;

  return {
    totalPageViews: pageViews.length,
    uniqueVisitors,
    totalEvents,
    bounceRate: Math.round(bounceRate * 100) / 100,
    averageSessionDuration: Math.round(averageSessionDuration),
    topPages,
    topReferrers,
    deviceBreakdown,
    dailyPageViews,
    realtimeVisitors,
  };
}

export async function getRealtimeData(websiteId: string) {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const oneMinuteAgo = new Date(Date.now() - 1 * 60 * 1000);

  const recentEvents = await prisma.event.findMany({
    where: {
      websiteId,
      createdAt: {
        gte: fiveMinutesAgo,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });

  const activeVisitors = new Set(recentEvents.map((e) => e.sessionId)).size;
  const newVisitors = new Set(
    recentEvents
      .filter((e) => e.createdAt >= oneMinuteAgo)
      .map((e) => e.sessionId)
  ).size;

  return {
    activeVisitors,
    newVisitors,
    recentEvents: recentEvents.slice(0, 10),
  };
}
