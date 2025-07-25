"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PageViewsChartProps {
  data: Array<{
    date: string;
    views: number;
    visitors: number;
  }>;
}

export function PageViewsChart({ data }: PageViewsChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No data to display
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#4f46e5"
            strokeWidth={2}
            name="Page Views"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
