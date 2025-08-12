"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Website {
  id: string;
  name: string;
  domain: string;
}

interface DashboardFiltersProps {
  websites: Website[];
  selectedWebsite: Website;
  period: string; // day | month | year
  includeEvents: boolean;
}

export function DashboardFilters({
  websites,
  selectedWebsite,
  period,
  includeEvents,
}: DashboardFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateFilters = useCallback(
    (key: string, value: string) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams);
        if (value === "" || value === undefined) params.delete(key); else params.set(key, value);
        router.push(`/dashboard?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      {websites.length > 1 && (
        <Select
          value={selectedWebsite.id}
          onValueChange={(value) => updateFilters("website", value)}
          disabled={isPending}
        >
          <SelectTrigger className="min-w-[10rem] w-full sm:w-48">
            <SelectValue placeholder="Select website" />
          </SelectTrigger>
          <SelectContent>
            {websites.map((website) => (
              <SelectItem key={website.id} value={website.id}>
                {website.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Select
        value={period}
        onValueChange={(value) => updateFilters("period", value)}
        disabled={isPending}
      >
        <SelectTrigger className="min-w-[8.5rem] w-full xs:w-auto sm:w-40">
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Today</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
          <SelectItem value="year">This Year</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center space-x-2">
        <Switch
          id="include-events"
          checked={includeEvents}
          onCheckedChange={(checked) => updateFilters("include", checked ? "1" : "0")}
          disabled={isPending}
        />
        <Label htmlFor="include-events" className="text-sm">Include custom events</Label>
      </div>

      <Button asChild disabled={isPending}>
        <a href="/dashboard/websites">
          {isPending ? "Loading..." : "Manage Sites"}
        </a>
      </Button>
    </div>
  );
}
