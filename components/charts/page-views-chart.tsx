"use client";

import { useEffect, useState, memo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider"; // your existing theme context

interface VisitsChartProps {
  data: Array<{ label: string; count: number; uniqueViewers?: number }>;
  title?: string;
  showToggle?: boolean;
}

export const VisitsChart = memo(function VisitsChart({ data, title = "Visits", showToggle = false }: VisitsChartProps) {
  const { theme } = useTheme();
  const [showUniqueViewers, setShowUniqueViewers] = useState(false);
  const [vars, setVars] = useState({
    primary: "",
    border: "",
    mutedFg: "",
    card: "",
    background: "",
    chartOpacity: "",
  });

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    setVars({
      primary: styles.getPropertyValue("--primary").trim(),
      border: styles.getPropertyValue("--border").trim(),
      mutedFg: styles.getPropertyValue("--muted-foreground").trim(),
      card: styles.getPropertyValue("--card").trim(),
      background: styles.getPropertyValue("--background").trim(),
      chartOpacity: styles.getPropertyValue("--chart-area-start-opacity").trim(),
    });
  }, [theme]); // re-run when theme changes

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg border-2 border-dashed border-border/30">
            <div className="text-center">
              <div className="text-lg font-medium mb-2">No data to display</div>
              <div className="text-sm text-muted-foreground">
                Data will appear here once visits are recorded
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Debug: Log the data structure
  console.log("Chart data:", data);

  const currentDataKey = showUniqueViewers && data[0]?.uniqueViewers !== undefined ? 'uniqueViewers' : 'count';
  const currentLabel = showUniqueViewers && data[0]?.uniqueViewers !== undefined ? 'Unique Viewers' : 'Visits';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: `linear-gradient(to right, ${vars.primary}, ${vars.primary} / 0.7)`,
              }}
            />
            {title}
          </CardTitle>
          {showToggle && data[0]?.uniqueViewers !== undefined && (
            <div className="flex gap-2">
              <Button
                variant={!showUniqueViewers ? "default" : "outline"}
                size="sm"
                onClick={() => setShowUniqueViewers(false)}
              >
                All Visits
              </Button>
              <Button
                variant={showUniqueViewers ? "default" : "outline"}
                size="sm"
                onClick={() => setShowUniqueViewers(true)}
              >
                Unique Viewers
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 sm:h-72 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 12, right: 24, left: 12, bottom: 8 }}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={vars.primary} stopOpacity={Number(vars.chartOpacity) || 0.35} />
                  <stop offset="95%" stopColor={vars.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={`${vars.border} / 0.3`} />
              <XAxis
                dataKey="label"
                fontSize={12}
                axisLine={false}
                tickLine={false}
                tick={{ fill: vars.mutedFg }}
                dy={4}
              />
              <YAxis
                fontSize={12}
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                width={40}
                tick={{ fill: vars.mutedFg }}
              />
              <Tooltip
                cursor={{
                  stroke: vars.primary,
                  strokeOpacity: 0.15,
                  strokeWidth: 50,
                }}
                contentStyle={{
                  backgroundColor: vars.card,
                  border: `1px solid ${vars.border}`,
                  borderRadius: "10px",
                  boxShadow: "0 6px 18px -6px rgb(0 0 0 / 0.3)",
                  backdropFilter: "blur(6px)",
                }}
                itemStyle={{ color: "var(--foreground)", fontSize: 12 }}
                labelStyle={{
                  color: vars.mutedFg,
                  fontWeight: 500,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              />
              <Line
                type="monotone"
                dataKey={currentDataKey}
                stroke={vars.primary}
                strokeWidth={2.5}
                name={currentLabel}
                dot={{
                  fill: vars.primary,
                  strokeWidth: 1.5,
                  r: 3.5,
                  stroke: vars.card,
                }}
                activeDot={{
                  r: 5,
                  fill: vars.primary,
                  strokeWidth: 2,
                  stroke: vars.background,
                }}
                fill="url(#colorGradient)"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
});
