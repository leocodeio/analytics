import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  getAnalyticsData,
  getTimeRange,
  getRealtimeData,
} from "@/lib/analytics";
import { PageViewsChart } from "@/components/charts/page-views-chart";
import { RecentEvents } from "@/components/dashboard/recent-events";
import { DashboardFilters } from "@/components/dashboard/dashboard-filters";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    period?: "24h" | "7d" | "30d" | "90d";
    website?: string;
  }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  // Await searchParams
  const params = await searchParams;

  // Get user's websites
  const websites = await prisma.website.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  if (websites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Welcome to Analytics
          </h1>
          <p className="text-muted-foreground mb-8">
            Get started by adding your first website to track.
          </p>
          <a
            href="/dashboard/websites"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium"
          >
            Add Website
          </a>
        </div>
      </div>
    );
  }

  // Use the selected website or the first one
  const selectedWebsiteId = params.website || websites[0].id;
  const selectedWebsite =
    websites.find((w) => w.id === selectedWebsiteId) || websites[0];
  const period = params.period || "7d";
  const timeRange = getTimeRange(period);

  // Get analytics data
  const analyticsData = await getAnalyticsData(selectedWebsite.id, timeRange);
  const realtimeData = await getRealtimeData(selectedWebsite.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {selectedWebsite.name}
            </h1>
            <p className="text-muted-foreground mt-1">{selectedWebsite.domain}</p>
          </div>
          <div className="flex items-center space-x-4">
            <DashboardFilters
              websites={websites}
              selectedWebsite={selectedWebsite}
              period={period}
            />
          </div>
        </div>
      </div>

      {/* Realtime Stats */}
      <div className="mb-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
            <span className="text-green-800 font-medium">
              {realtimeData.activeVisitors} visitors online now
            </span>
            {realtimeData.newVisitors > 0 && (
              <span className="ml-2 text-green-600 text-sm">
                ({realtimeData.newVisitors} new in last minute)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                <p className="text-2xl font-semibold text-foreground">
                  {analyticsData.totalPageViews.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Unique Visitors
                </p>
                <p className="text-2xl font-semibold text-foreground">
                  {analyticsData.uniqueVisitors.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Bounce Rate</p>
                <p className="text-2xl font-semibold text-foreground">
                  {analyticsData.bounceRate.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Avg. Session
                </p>
                <p className="text-2xl font-semibold text-foreground">
                  {Math.floor(analyticsData.averageSessionDuration / 60)}m{" "}
                  {analyticsData.averageSessionDuration % 60}s
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Page Views Chart */}
        <div className="bg-card p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Page Views Over Time
          </h2>
          <PageViewsChart
            data={analyticsData.dailyPageViews.map((item) => ({
              ...item,
              visitors: Math.floor(item.views * 0.7), // Approximation for unique visitors
            }))}
          />
        </div>

        {/* Top Pages */}
        <div className="bg-card p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Top Pages
          </h2>
          <div className="space-y-3">
            {analyticsData.topPages.slice(0, 8).map((page, index) => (
              <div
                key={page.path}
                className="flex items-center justify-between"
              >
                <div className="flex items-center min-w-0">
                  <span className="text-sm font-medium text-muted-foreground mr-3">
                    {index + 1}
                  </span>
                  <span className="text-sm text-foreground truncate">
                    {page.path || "/"}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {page.views.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-card p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Device Breakdown
          </h2>
          <div className="space-y-3">
            {analyticsData.deviceBreakdown.map((device) => {
              const total = analyticsData.deviceBreakdown.reduce(
                (sum, d) => sum + d.count,
                0
              );
              const percentage = total > 0 ? (device.count / total) * 100 : 0;

              return (
                <div
                  key={device.device}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-indigo-500 mr-3"></div>
                    <span className="text-sm text-foreground">
                      {device.device}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">
                      {percentage.toFixed(1)}%
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {device.count.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Referrers */}
        <div className="bg-card p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Top Referrers
          </h2>
          <div className="space-y-3">
            {analyticsData.topReferrers.slice(0, 8).map((referrer, index) => (
              <div
                key={referrer.referrer}
                className="flex items-center justify-between"
              >
                <div className="flex items-center min-w-0">
                  <span className="text-sm font-medium text-muted-foreground mr-3">
                    {index + 1}
                  </span>
                  <span className="text-sm text-foreground truncate">
                    {referrer.referrer || "Direct"}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {referrer.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-card p-6 rounded-lg shadow border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Recent Activity
        </h2>
        <RecentEvents events={realtimeData.recentEvents} />
      </div>
    </div>
  );
}
