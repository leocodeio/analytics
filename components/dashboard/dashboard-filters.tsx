"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Website {
  id: string;
  name: string;
  domain: string;
}

interface DashboardFiltersProps {
  websites: Website[];
  selectedWebsite: Website;
  period: string;
}

export function DashboardFilters({
  websites,
  selectedWebsite,
  period,
}: DashboardFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(key, value);
      router.push(`/dashboard?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex items-center space-x-4">
      {websites.length > 1 && (
        <Select
          value={selectedWebsite.id}
          onValueChange={(value) => updateFilters("website", value)}
        >
          <SelectTrigger className="w-48">
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
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="24h">Last 24 hours</SelectItem>
          <SelectItem value="7d">Last 7 days</SelectItem>
          <SelectItem value="30d">Last 30 days</SelectItem>
          <SelectItem value="90d">Last 90 days</SelectItem>
        </SelectContent>
      </Select>

      <Button asChild>
        <a href="/dashboard/websites">
          Manage Sites
        </a>
      </Button>
    </div>
  );
}
