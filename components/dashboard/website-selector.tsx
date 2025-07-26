"use client";

import { useRouter } from "next/navigation";

interface Website {
  id: string;
  name: string;
}

interface WebsiteSelectorProps {
  websites: Website[];
  selectedWebsiteId: string;
}

export function WebsiteSelector({ websites, selectedWebsiteId }: WebsiteSelectorProps) {
  const router = useRouter();

  const handleWebsiteChange = (websiteId: string) => {
    router.push(`/dashboard/realtime?website=${websiteId}`);
  };

  if (websites.length <= 1) {
    return null;
  }

  return (
    <select
      value={selectedWebsiteId}
      onChange={(e) => handleWebsiteChange(e.target.value)}
      className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
    >
      {websites.map((website) => (
        <option key={website.id} value={website.id}>
          {website.name}
        </option>
      ))}
    </select>
  );
}