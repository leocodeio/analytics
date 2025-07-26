import { Eye, Target, FileText } from "lucide-react";

interface Event {
  id: string;
  eventType: string;
  eventName: string;
  path?: string | null;
  createdAt: Date;
  websiteName?: string;
}

interface RecentEventsProps {
  events: Event[];
}

export function RecentEvents({ events }: RecentEventsProps) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">No recent events</div>
    );
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "pageview":
        return <Eye className="w-4 h-4" />;
      case "custom":
        return <Target className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-3 max-h-80 overflow-y-auto">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex items-center p-3 bg-secondary rounded-lg"
        >
          <div className="flex-shrink-0 mr-3 text-muted-foreground">
            {getEventIcon(event.eventType)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {event.eventName}
            </p>
            <p className="text-xs text-muted-foreground">
              {event.websiteName} • {event.eventType}
              {event.path && ` • ${event.path}`}
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="text-xs text-muted-foreground">
              {formatTime(event.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
