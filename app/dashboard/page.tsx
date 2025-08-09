import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getVisitSeries } from "@/lib/analytics";
import { VisitsChart } from "@/components/charts/page-views-chart";
import { DashboardFilters } from "@/components/dashboard/dashboard-filters";
import { redirect } from "next/navigation";

interface ParamsShape {
  period?: string;
  website?: string;
  include?: string; // '1' to include custom events
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<ParamsShape>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  const params = await searchParams;

  const websites = await prisma.website.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
  });

  if (websites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Welcome to Analytics</h1>
          <p className="text-muted-foreground mb-8">Get started by adding your first website to track.</p>
          <a href="/dashboard/websites" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium">Add Website</a>
        </div>
      </div>
    );
  }

  const selectedWebsiteId = params.website || websites[0].id;
  const selectedWebsite = websites.find(w => w.id === selectedWebsiteId) || websites[0];
  const period = (params.period === 'day' || params.period === 'month' || params.period === 'year') ? params.period : 'day';
  const includeEvents = params.include === '1';

  const visitSeries = await getVisitSeries(selectedWebsite.id, period, includeEvents);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{selectedWebsite.name}</h1>
          <p className="text-muted-foreground mt-1">{selectedWebsite.domain}</p>
        </div>
        <DashboardFilters
          websites={websites}
          selectedWebsite={selectedWebsite}
          period={period}
          includeEvents={includeEvents}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg shadow border">
          <p className="text-sm font-medium text-muted-foreground">Total Visits{includeEvents && ' (with custom events)'}</p>
            <p className="text-3xl font-semibold text-foreground">{visitSeries.totalVisits.toLocaleString()}</p>
        </div>
      </div>

      <div>
        <VisitsChart data={visitSeries.buckets} title={`Visits (${period})`} />
      </div>
    </div>
  );
}
