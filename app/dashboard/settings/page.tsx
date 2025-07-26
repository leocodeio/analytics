import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      websites: {
        include: {
          _count: {
            select: {
              events: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account and website settings
        </p>
      </div>

      <div className="space-y-8">
        {/* Profile Section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <div className="p-3 bg-secondary rounded-md text-foreground">
                {user.name || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <div className="p-3 bg-secondary rounded-md text-foreground">
                {user.email}
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Profile information is managed through your Google account.
          </p>
        </div>

        {/* Website Management */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Website Statistics
            </h2>
            <a
              href="/dashboard/websites"
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
            >
              Manage Websites
            </a>
          </div>

          {user.websites.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="mb-4">No websites added yet</p>
              <a
                href="/dashboard/websites"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Add Your First Website
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.websites.map((website) => (
                <div
                  key={website.id}
                  className="border border-border rounded-lg p-4"
                >
                  <h3 className="font-medium text-foreground mb-1">
                    {website.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{website.domain}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      {website._count.events.toLocaleString()} events
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(website.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Data Management */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Data Management
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h3 className="font-medium text-foreground">Data Retention</h3>
                <p className="text-sm text-muted-foreground">
                  Analytics data is retained for 13 months by default
                </p>
              </div>
              <span className="text-sm text-muted-foreground">13 months</span>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h3 className="font-medium text-foreground">Export Data</h3>
                <p className="text-sm text-muted-foreground">
                  Export your analytics data in CSV format
                </p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 border border-indigo-300 rounded-md hover:bg-indigo-50">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Privacy & Security
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h3 className="font-medium text-foreground">Data Processing</h3>
                <p className="text-sm text-muted-foreground">
                  All data is processed in compliance with GDPR and privacy laws
                </p>
              </div>
              <span className="text-sm text-green-600 font-medium">
                ✓ Compliant
              </span>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h3 className="font-medium text-foreground">
                  IP Address Anonymization
                </h3>
                <p className="text-sm text-muted-foreground">
                  IP addresses are anonymized before storage
                </p>
              </div>
              <span className="text-sm text-green-600 font-medium">
                ✓ Enabled
              </span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-900 mb-4">
            Danger Zone
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-card">
              <div>
                <h3 className="font-medium text-red-900">Delete Account</h3>
                <p className="text-sm text-red-600">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-300 rounded-md hover:bg-red-50">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
