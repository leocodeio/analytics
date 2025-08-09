import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AddWebsiteForm } from "@/components/websites/add-website-form";
import { WebsiteList } from "@/components/websites/website-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getUserWebsites(userId: string) {
  return await prisma.website.findMany({
    where: { userId },
    include: {
      _count: {
        select: { events: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function WebsitesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span className="text-lg font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  const websites = await getUserWebsites(session.user.id);

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Your Websites
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Manage your tracked websites, get tracking codes, and monitor your analytics setup.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Websites
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {websites.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active tracking sites
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Events
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {websites.reduce((total, website) => total + website._count.events, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Tracked interactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Most Active Site
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {websites.length > 0 
                ? websites.reduce((max, website) => 
                    website._count.events > max._count.events ? website : max
                  )?.name || 'N/A'
                : 'N/A'
              }
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Highest event count
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-1 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Add New Website</h2>
            <AddWebsiteForm />
          </div>
        </div>

        <div className="xl:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Manage Websites</h2>
            <WebsiteList websites={websites} />
          </div>
        </div>
      </div>
    </div>
  );
}
