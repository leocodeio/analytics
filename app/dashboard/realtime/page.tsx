import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getRealtimeData } from "@/lib/analytics";
import { RealtimeDashboard } from "@/components/dashboard/realtime-dashboard";
import { redirect } from "next/navigation";

export default async function RealtimePage({
  searchParams,
}: {
  searchParams: Promise<{ website?: string }>;
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Real-time Analytics
          </h1>
          <p className="text-gray-600 mb-8">
            Monitor live visitor activity on your websites.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-yellow-800 mb-4">
              You need to add a website first to view real-time analytics.
            </p>
            <a
              href="/dashboard/websites"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium"
            >
              Add Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Use the selected website or the first one
  const selectedWebsiteId = params.website || websites[0].id;
  const selectedWebsite =
    websites.find((w) => w.id === selectedWebsiteId) || websites[0];

  // Get initial real-time data
  const initialRealtimeData = await getRealtimeData(selectedWebsite.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Real-time Analytics
            </h1>
            <p className="text-gray-600 mt-2">
              Monitor live activity on {selectedWebsite.name}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Website Selector */}
            {websites.length > 1 && (
              <select
                defaultValue={selectedWebsite.id}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => {
                  window.location.href = `/dashboard/realtime?website=${e.target.value}`;
                }}
              >
                {websites.map((website) => (
                  <option key={website.id} value={website.id}>
                    {website.name}
                  </option>
                ))}
              </select>
            )}

            <a
              href="/dashboard"
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-md font-medium transition-colors"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>

      {/* Real-time Dashboard */}
      <RealtimeDashboard
        websiteId={selectedWebsite.id}
        initialData={initialRealtimeData}
      />

      {/* Instructions */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-blue-900 mb-2">
          💡 How Real-time Analytics Work
        </h2>
        <div className="text-blue-700 space-y-2">
          <p>
            • <strong>Active Visitors:</strong> Users who have been active in
            the last 5 minutes
          </p>
          <p>
            • <strong>New Visitors:</strong> First-time visitors in the last
            minute
          </p>
          <p>
            • <strong>Recent Events:</strong> All page views and custom events
            from the last 10 minutes
          </p>
          <p>
            • <strong>Auto-refresh:</strong> Data updates automatically every 30
            seconds
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-sm text-blue-600">
            <strong>Tip:</strong> Keep this page open to monitor live traffic
            during campaigns, launches, or important events.
          </p>
        </div>
      </div>
    </div>
  );
}
