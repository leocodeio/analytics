"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

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
      {/* Website Selector */}
      {websites.length > 1 && (
        <select
          value={selectedWebsite.id}
          onChange={(e) => updateFilters("website", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {websites.map((website) => (
            <option key={website.id} value={website.id}>
              {website.name}
            </option>
          ))}
        </select>
      )}

      {/* Period Selector */}
      <select
        value={period}
        onChange={(e) => updateFilters("period", e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="24h">Last 24 hours</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
      </select>

      {/* Add Website Button */}
      <a
        href="/dashboard/websites"
        className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md font-medium transition-colors"
      >
        Manage Sites
      </a>
    </div>
  );
}
