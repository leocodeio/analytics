interface StatsCardsProps {
  totalEvents: number;
  todayEvents: number;
  pageViews: number;
  uniqueSessions: number;
}

export function StatsCards({
  totalEvents,
  todayEvents,
  pageViews,
  uniqueSessions,
}: StatsCardsProps) {
  const stats = [
    {
      name: "Total Events",
      value: totalEvents.toLocaleString(),
      icon: "📊",
      color: "bg-blue-500",
    },
    {
      name: "Today's Events",
      value: todayEvents.toLocaleString(),
      icon: "📅",
      color: "bg-green-500",
    },
    {
      name: "Page Views",
      value: pageViews.toLocaleString(),
      icon: "👁️",
      color: "bg-purple-500",
    },
    {
      name: "Unique Sessions",
      value: uniqueSessions.toLocaleString(),
      icon: "👥",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div
                  className={`inline-flex items-center justify-center h-8 w-8 rounded-md ${stat.color} text-white`}
                >
                  {stat.icon}
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
