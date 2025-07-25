"use client";

import { useState, useEffect } from "react";

interface RealtimeStats {
  activeVisitors: number;
  newVisitors: number;
  recentEvents: Array<{
    id: string;
    eventType: string;
    eventName: string;
    path?: string | null;
    createdAt: Date;
  }>;
}

interface RealtimeDashboardProps {
  websiteId: string;
  initialData: RealtimeStats;
}

export function RealtimeDashboard({
  websiteId,
  initialData,
}: RealtimeDashboardProps) {
  const [data, setData] = useState<RealtimeStats>(initialData);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate real-time updates (in production, you'd use WebSockets or Server-Sent Events)
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/realtime?websiteId=${websiteId}`);
        if (response.ok) {
          const newData = await response.json();
          setData(newData);
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Realtime update error:", error);
        setIsConnected(false);
      }
    }, 30000); // Update every 30 seconds

    setIsConnected(true);

    return () => clearInterval(interval);
  }, [websiteId]);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(date));
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

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Live Activity</h2>
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`}
          ></div>
          <span className="text-sm text-gray-600">
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>

      {/* Active Visitors */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Active Visitors
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {data.activeVisitors}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">New in last minute</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              +{data.newVisitors}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Events Stream */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Events
        </h3>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {data.recentEvents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No recent activity</p>
              <p className="text-sm mt-2">
                Events will appear here as users interact with your website
              </p>
            </div>
          ) : (
            data.recentEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-shrink-0 mr-3">
                  <span className="text-lg">
                    {getEventIcon(event.eventType)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {event.eventName || event.path || "Page View"}
                    </p>
                    <p className="text-xs text-gray-500 ml-2">
                      {formatTime(event.createdAt)}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">
                    {event.eventType === "pageview"
                      ? "Page View"
                      : "Custom Event"}
                    {event.path && ` • ${event.path}`}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Activity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <span className="text-lg">📊</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Page Views</p>
              <p className="text-lg font-semibold text-gray-900">
                {
                  data.recentEvents.filter((e) => e.eventType === "pageview")
                    .length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <span className="text-lg">🎯</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Custom Events</p>
              <p className="text-lg font-semibold text-gray-900">
                {
                  data.recentEvents.filter((e) => e.eventType === "custom")
                    .length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <span className="text-lg">⚡</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Events/Min</p>
              <p className="text-lg font-semibold text-gray-900">
                {Math.round(data.recentEvents.length / 5)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
