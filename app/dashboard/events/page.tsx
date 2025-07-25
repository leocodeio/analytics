import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EventsTable } from "@/components/events/events-table";

async function getUserEvents(userId: string) {
  const websites = await prisma.website.findMany({
    where: { userId },
    select: { id: true, name: true },
  });

  if (websites.length === 0) {
    return [];
  }

  const websiteIds = websites.map((w) => w.id);
  const websiteMap = new Map(websites.map((w) => [w.id, w.name]));

  const events = await prisma.event.findMany({
    where: {
      websiteId: { in: websiteIds },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return events.map((event) => ({
    ...event,
    websiteName: websiteMap.get(event.websiteId) || "Unknown",
  }));
}

export default async function EventsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Loading...</div>;
  }

  const events = await getUserEvents(session.user.id);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        <p className="text-gray-600">
          View all tracked events from your websites
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <EventsTable events={events} />
      </div>
    </div>
  );
}
