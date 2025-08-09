import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EventsTable } from "@/components/events/events-table";
import { redirect } from "next/navigation";

function getPeriodRange(period: 'day'|'month'|'year') {
  const now = new Date();
  if (period === 'day') { const d = new Date(); d.setHours(0,0,0,0); return { start: d, end: now }; }
  if (period === 'month') { const d = new Date(); d.setDate(1); d.setHours(0,0,0,0); return { start: d, end: now }; }
  const d = new Date(); d.setMonth(0,1); d.setHours(0,0,0,0); return { start: d, end: now };
}

async function getUserEvents(userId: string, opts: { websiteId?: string; period: 'day'|'month'|'year'; }) {
  const { websiteId, period } = opts;
  const websites = await prisma.website.findMany({ where: { userId }, select: { id: true, name: true } });
  if (websites.length === 0) return [];
  const websiteIds = websites.map(w => w.id);
  const websiteMap = new Map(websites.map(w => [w.id, w.name] as const));
  const { start, end } = getPeriodRange(period);
  const events = await prisma.event.findMany({
    where: {
      websiteId: websiteId ? websiteId : { in: websiteIds },
      createdAt: { gte: start, lte: end },
    },
    orderBy: { createdAt: 'desc' },
    take: 200,
  });
  return events.map(e => ({ ...e, websiteName: websiteMap.get(e.websiteId) || 'Unknown' }));
}

interface EventsParams { period?: string; website?: string; }

export default async function EventsPage({ searchParams }: { searchParams: Promise<EventsParams>; }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/signin');
  const params = await searchParams;
  const period = (params.period === 'day' || params.period === 'month' || params.period === 'year') ? params.period : 'day';
  const websiteId = params.website;
  const events = await getUserEvents(session!.user.id, { websiteId, period });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Events</h1>
        <p className="text-muted-foreground">Recent tracked events (period: {period})</p>
      </div>
      <div className="bg-card border rounded-lg shadow">
        <EventsTable events={events} />
      </div>
    </div>
  );
}
