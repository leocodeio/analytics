import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/signin');

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      websites: { include: { _count: { select: { events: true } } }, orderBy: { createdAt: 'desc' } }
    }
  });
  if (!user) redirect('/auth/signin');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Account details and website overview.</p>
      </div>

      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase text-muted-foreground mb-1">Name</p>
            <div className="p-3 bg-secondary rounded-md text-foreground">{user.name || 'Not provided'}</div>
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground mb-1">Email</p>
            <div className="p-3 bg-secondary rounded-md text-foreground">{user.email}</div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Profile details are managed via your Google account.</p>
      </div>

      <div className="bg-card border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Websites</h2>
          <a href="/dashboard/websites" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">Manage</a>
        </div>
        {user.websites.length === 0 ? (
          <p className="text-sm text-muted-foreground">No websites added yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {user.websites.map(site => (
              <div key={site.id} className="border rounded-md p-4">
                <p className="font-medium text-foreground">{site.name}</p>
                <p className="text-sm text-muted-foreground mb-2">{site.domain}</p>
                <p className="text-xs text-muted-foreground">{site._count.events} events • Added {new Date(site.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-sm text-muted-foreground">Additional settings (data export, privacy controls) will appear here in future iterations.</p>
      </div>
    </div>
  );
}
