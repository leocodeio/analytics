import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AddWebsiteForm } from "@/components/websites/add-website-form";
import { WebsiteList } from "@/components/websites/website-list";

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
    return <div>Loading...</div>;
  }

  const websites = await getUserWebsites(session.user.id);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Websites</h1>
        <p className="text-gray-600">
          Manage your tracked websites and get tracking codes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <AddWebsiteForm />
        </div>

        <div className="lg:col-span-2">
          <WebsiteList websites={websites} />
        </div>
      </div>
    </div>
  );
}
