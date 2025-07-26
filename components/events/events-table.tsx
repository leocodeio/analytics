import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  eventType: string;
  eventName: string;
  path?: string | null;
  referrer?: string | null;
  userAgent?: string | null;
  screenWidth?: number | null;
  screenHeight?: number | null;
  createdAt: Date;
  websiteName: string;
}

interface EventsTableProps {
  events: Event[];
}

export function EventsTable({ events }: EventsTableProps) {
  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <CardTitle className="mb-2">No events yet</CardTitle>
            <p className="text-muted-foreground">
              Events will appear here once your tracking script is installed.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "pageview":
        return "👁️";
      case "custom":
        return "🎯";
      default:
        return "📝";
    }
  };

  const getBrowser = (userAgent: string | null) => {
    if (!userAgent) return "Unknown";

    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";

    return "Other";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Events</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Path</TableHead>
              <TableHead>Browser</TableHead>
              <TableHead>Screen</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-2">{getEventIcon(event.eventType)}</span>
                    <div>
                      <div className="font-medium">{event.eventName}</div>
                      <Badge variant="secondary" className="text-xs">
                        {event.eventType}
                      </Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{event.websiteName}</TableCell>
                <TableCell>{event.path || "-"}</TableCell>
                <TableCell>{getBrowser(event.userAgent || null)}</TableCell>
                <TableCell>
                  {event.screenWidth && event.screenHeight
                    ? `${event.screenWidth}×${event.screenHeight}`
                    : "-"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatTime(event.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
