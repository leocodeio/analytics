import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
        <Card key={stat.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.name}
            </CardTitle>
            <Badge variant="secondary" className={`h-8 w-8 rounded-md ${stat.color} text-white flex items-center justify-center`}>
              {stat.icon}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
