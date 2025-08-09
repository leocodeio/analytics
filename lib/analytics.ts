import { prisma } from "@/lib/prisma";

// ------------------------------------------------------------------------------------
// Legacy (full) analytics functions kept temporarily during refactor. These will be
// removed once the dashboard no longer depends on them. New minimal visit series
// API is appended below.
// ------------------------------------------------------------------------------------

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

  const events = await prisma.event.findMany({
    where: {
      websiteId,
      createdAt: { gte: start, lte: end },
    },
    orderBy: { createdAt: "asc" },
  });

  const pageViews = events.filter((e) => e.eventType === "pageview");
  const uniqueVisitors = new Set(events.map((e) => e.sessionId)).size;
  const totalEvents = events.length;

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

  const pageViewCounts = new Map<string, number>();
  pageViews.forEach((event) => {
    const path = event.path || event.eventName;
    pageViewCounts.set(path, (pageViewCounts.get(path) || 0) + 1);
  });
  const topPages = Array.from(pageViewCounts.entries())
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  const referrerCounts = new Map<string, number>();
  events.forEach((event) => {
    if (event.referrer && event.referrer !== "") {
      try {
        const referrer = new URL(event.referrer).hostname;
        referrerCounts.set(referrer, (referrerCounts.get(referrer) || 0) + 1);
      } catch {
        // skip invalid URL
      }
    }
  });
  const topReferrers = Array.from(referrerCounts.entries())
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

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

  const dailyViews = new Map<string, number>();
  pageViews.forEach((event) => {
    const date = event.createdAt.toISOString().split("T")[0];
    dailyViews.set(date, (dailyViews.get(date) || 0) + 1);
  });
  const dailyPageViews = Array.from(dailyViews.entries())
    .map(([date, views]) => ({ date, views }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const recentEvents = await prisma.event.findMany({
    where: {
      websiteId,
      createdAt: { gte: fiveMinutesAgo },
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
      createdAt: { gte: fiveMinutesAgo },
    },
    orderBy: { createdAt: "desc" },
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

// ------------------------------------------------------------------------------------
// New Minimal Visit Series API
// ------------------------------------------------------------------------------------
export interface VisitSeriesBucket {
  label: string; // hour (00-23), day (1-31), or month short name
  count: number;
}
export interface VisitSeriesResult {
  totalVisits: number;
  buckets: VisitSeriesBucket[];
  period: 'day' | 'month' | 'year';
  includeEvents: boolean;
}

function startOfToday() { const d = new Date(); d.setHours(0,0,0,0); return d; }
function startOfMonth() { const d = new Date(); d.setDate(1); d.setHours(0,0,0,0); return d; }
function startOfYear() { const d = new Date(); d.setMonth(0,1); d.setHours(0,0,0,0); return d; }

export function getPeriodRange(period: 'day'|'month'|'year') {
  const now = new Date();
  if (period === 'day') return { start: startOfToday(), end: now };
  if (period === 'month') return { start: startOfMonth(), end: now };
  return { start: startOfYear(), end: now };
}

export async function getVisitSeries(websiteId: string, period: 'day'|'month'|'year', includeEvents: boolean): Promise<VisitSeriesResult> {
  const { start, end } = getPeriodRange(period);
  const whereEventType = includeEvents ? undefined : 'pageview';
  const events = await prisma.event.findMany({
    where: {
      websiteId,
      createdAt: { gte: start, lte: end },
      ...(whereEventType ? { eventType: whereEventType } : {})
    },
    select: { createdAt: true },
  });

  const buckets: VisitSeriesBucket[] = [];
  if (period === 'day') {
    for (let h=0; h<24; h++) buckets.push({ label: h.toString().padStart(2,'0'), count: 0 });
    events.forEach(e => { buckets[e.createdAt.getHours()].count++; });
  } else if (period === 'month') {
    const daysInMonth = new Date(start.getFullYear(), start.getMonth()+1, 0).getDate();
    for (let d=1; d<=daysInMonth; d++) buckets.push({ label: d.toString(), count: 0 });
    events.forEach(e => { buckets[e.createdAt.getDate()-1].count++; });
  } else { // year
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    for (let m=0; m<12; m++) buckets.push({ label: monthNames[m], count: 0 });
    events.forEach(e => { buckets[e.createdAt.getMonth()].count++; });
  }

  return { totalVisits: events.length, buckets, period, includeEvents };
}
