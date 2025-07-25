import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageViewsChart } from "@/components/charts/page-views-chart";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentEvents } from "@/components/dashboard/recent-events";

async function getDashboardData(userId: string) {
  // Get user's websites
  const websites = await prisma.website.findMany({
    where: { userId },
    include: {
      events: {
        orderBy: { createdAt: "desc" },
        take: 100,
      },
    },
  });

  if (websites.length === 0) {
    return null;
  }

  const allEvents = websites.flatMap((website) =>
    website.events.map((event) => ({
      ...event,
      websiteName: website.name,
    }))
  );

  // Calculate stats
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const todayEvents = allEvents.filter((event) => event.createdAt >= yesterday);

  const weekEvents = allEvents.filter((event) => event.createdAt >= weekAgo);

  const pageViews = allEvents.filter((event) => event.eventType === "pageview");
  const uniqueSessions = new Set(allEvents.map((event) => event.sessionId))
    .size;

  return {
    websites,
    totalEvents: allEvents.length,
    todayEvents: todayEvents.length,
    weekEvents: weekEvents.length,
    pageViews: pageViews.length,
    uniqueSessions,
    recentEvents: allEvents.slice(0, 10),
    chartData: pageViews.slice(0, 30).map((event, index) => ({
      date: event.createdAt.toISOString().split("T")[0],
      views: 1,
      visitors: 1,
    })),
  };
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Loading...</div>;
  }

  const data = await getDashboardData(session.user.id);

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Analytics Dashboard
          </h1>
          <p className="text-gray-600 mb-8">
            You haven't added any websites yet. Let's get started!
          </p>
          <a
            href="/dashboard/websites"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Your First Website
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">
          Monitor your website analytics and user engagement
        </p>
      </div>

      <StatsCards
        totalEvents={data.totalEvents}
        todayEvents={data.todayEvents}
        pageViews={data.pageViews}
        uniqueSessions={data.uniqueSessions}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Page Views Over Time</h2>
          <PageViewsChart data={data.chartData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
          <RecentEvents events={data.recentEvents} />
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Websites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.websites.map((website) => (
            <div key={website.id} className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900">{website.name}</h3>
              <p className="text-sm text-gray-600">{website.domain}</p>
              <p className="text-sm text-gray-500 mt-2">
                {website.events.length} total events
              </p>
              <p className="text-xs text-gray-400 mt-1">ID: {website.id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
