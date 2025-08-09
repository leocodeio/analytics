import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getVisitSeries } from "@/lib/analytics";
import { VisitsChart } from "@/components/charts/page-views-chart";
import { DashboardFilters } from "@/components/dashboard/dashboard-filters";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center text-2xl">
              📊
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-6">
            Welcome to Analytics
          </h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Get started by adding your first website to track visits and analytics data.
          </p>
          <Link href="/dashboard/websites">
            <Button size="lg" className="px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Your First Website
            </Button>
          </Link>
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
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            {selectedWebsite.name}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m2.828-2.828l4-4a4 4 0 00-5.656-5.656l-1.102 1.102m0 2.828l2.828 2.828" />
            </svg>
            <span className="font-medium">{selectedWebsite.domain}</span>
          </div>
        </div>
        <DashboardFilters
          websites={websites}
          selectedWebsite={selectedWebsite}
          period={period}
          includeEvents={includeEvents}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Visits{includeEvents && ' (with custom events)'}
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {visitSeries.totalVisits.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {period === 'day' ? 'Last 30 days' : period === 'month' ? 'Last 12 months' : 'Last 5 years'}
            </p>
          </CardContent>
        </Card>

        {/* Placeholder cards for future metrics */}
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 opacity-60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unique Visitors
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-muted/30 text-muted-foreground flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-muted-foreground">
              Coming Soon
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Unique visitor tracking
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 opacity-60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bounce Rate
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-muted/30 text-muted-foreground flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-muted-foreground">
              Coming Soon
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Engagement analytics
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="space-y-6">
        <VisitsChart data={visitSeries.buckets} title={`Visits Over Time (${period})`} />
      </div>
    </div>
  );
}
