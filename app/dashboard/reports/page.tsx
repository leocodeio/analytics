import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAnalyticsData, getTimeRange } from "@/lib/analytics";
import { redirect } from "next/navigation";

interface AdvancedAnalyticsData {
  conversionFunnel: Array<{
    step: string;
    visitors: number;
    conversionRate: number;
  }>;
  userFlow: Array<{
    from: string;
    to: string;
    count: number;
  }>;
  sessionDuration: Array<{
    range: string;
    count: number;
    percentage: number;
  }>;
  geographicData: Array<{
    country: string;
    count: number;
    percentage: number;
  }>;
}

async function getAdvancedAnalytics(websiteId: string, timeRange: { start: Date; end: Date }): Promise<AdvancedAnalyticsData> {
  // Conversion funnel analysis (mock data for demo)
  const conversionFunnel = [
    { step: "Landing Page", visitors: 1000, conversionRate: 100 },
    { step: "Product Page", visitors: 750, conversionRate: 75 },
    { step: "Add to Cart", visitors: 300, conversionRate: 30 },
    { step: "Checkout", visitors: 150, conversionRate: 15 },
    { step: "Purchase", visitors: 75, conversionRate: 7.5 },
  ];

  // User flow analysis (simplified)
  const userFlow = [
    { from: "/", to: "/about", count: 45 },
    { from: "/", to: "/products", count: 120 },
    { from: "/products", to: "/product/1", count: 80 },
    { from: "/product/1", to: "/cart", count: 25 },
    { from: "/about", to: "/contact", count: 15 },
  ];

  // Session duration distribution
  const sessionDuration = [
    { range: "0-30s", count: 120, percentage: 40 },
    { range: "30s-1m", count: 75, percentage: 25 },
    { range: "1-3m", count: 60, percentage: 20 },
    { range: "3-10m", count: 30, percentage: 10 },
    { range: "10m+", count: 15, percentage: 5 },
  ];

  // Geographic data (mock)
  const geographicData = [
    { country: "United States", count: 150, percentage: 50 },
    { country: "United Kingdom", count: 60, percentage: 20 },
    { country: "Germany", count: 45, percentage: 15 },
    { country: "Canada", count: 30, percentage: 10 },
    { country: "Others", count: 15, percentage: 5 },
  ];

  return {
    conversionFunnel,
    userFlow,
    sessionDuration,
    geographicData,
  };
}

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: "24h" | "7d" | "30d" | "90d"; website?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

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
            Advanced Reports
          </h1>
          <p className="text-muted-foreground mb-8">
            Get detailed insights about your website performance.
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
  const advancedData = await getAdvancedAnalytics(selectedWebsite.id, timeRange);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Advanced Reports
            </h1>
            <p className="text-muted-foreground mt-2">
              Detailed analytics for {selectedWebsite.name}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Website Selector */}
            {websites.length > 1 && (
              <select
                defaultValue={selectedWebsite.id}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              >
                {websites.map((website) => (
                  <option key={website.id} value={website.id}>
                    {website.name}
                  </option>
                ))}
              </select>
            )}

            {/* Period Selector */}
            <select
              defaultValue={period}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Conversion Funnel */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Conversion Funnel
          </h2>
          <div className="space-y-4">
            {advancedData.conversionFunnel.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {index + 1}. {step.step}
                  </span>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">
                      {step.visitors.toLocaleString()} visitors
                    </span>
                    <span className="ml-2 text-sm font-medium text-indigo-600">
                      {step.conversionRate}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div
                    className="bg-indigo-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${step.conversionRate}%` }}
                  ></div>
                </div>
                {index < advancedData.conversionFunnel.length - 1 && (
                  <div className="flex justify-center mt-2">
                    <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Flow */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Top User Flows
            </h2>
            <div className="space-y-4">
              {advancedData.userFlow.map((flow, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground truncate">{flow.from}</span>
                      <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-muted-foreground truncate">{flow.to}</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-foreground ml-4">
                    {flow.count} users
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Session Duration */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Session Duration
            </h2>
            <div className="space-y-4">
              {advancedData.sessionDuration.map((duration) => (
                <div key={duration.range} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{duration.range}</span>
                  <div className="flex items-center space-x-3 flex-1 ml-4">
                    <div className="flex-1 bg-secondary rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${duration.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {duration.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Geographic Distribution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advancedData.geographicData.map((country) => (
              <div key={country.country} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {country.country}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {country.percentage}%
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${country.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {country.count.toLocaleString()} visitors
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-secondary border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Export Data
          </h2>
          <p className="text-muted-foreground mb-4">
            Download your analytics data for further analysis or reporting.
          </p>
          <div className="flex space-x-4">
            <a
              href={`/api/export?websiteId=${selectedWebsite.id}&format=csv&startDate=${timeRange.start.toISOString()}&endDate=${timeRange.end.toISOString()}`}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              Export as CSV
            </a>
            <a
              href={`/api/export?websiteId=${selectedWebsite.id}&format=json&startDate=${timeRange.start.toISOString()}&endDate=${timeRange.end.toISOString()}`}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              Export as JSON
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
