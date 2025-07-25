"use client";

import { useState } from "react";

interface Website {
  id: string;
  name: string;
  domain: string;
  createdAt: Date;
  _count: {
    events: number;
  };
}

interface WebsiteListProps {
  websites: Website[];
}

export function WebsiteList({ websites }: WebsiteListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyTrackingCode = (websiteId: string) => {
    const trackingCode = `<script async src="${window.location.origin}/tracker.js" data-website-id="${websiteId}"></script>`;
    navigator.clipboard.writeText(trackingCode);
    setCopiedId(websiteId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyWebsiteId = (websiteId: string) => {
    navigator.clipboard.writeText(websiteId);
    setCopiedId(websiteId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (websites.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No websites yet
          </h3>
          <p className="text-gray-600">
            Add your first website to start tracking analytics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Your Websites</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {websites.map((website) => (
          <div key={website.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {website.name}
                </h3>
                <p className="text-sm text-gray-600">{website.domain}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {website._count.events} events • Added{" "}
                  {new Date(website.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website ID
                </label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                    {website.id}
                  </code>
                  <button
                    onClick={() => copyWebsiteId(website.id)}
                    className="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    {copiedId === website.id ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tracking Code
                </label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono break-all">
                    {`<script async src="${
                      typeof window !== "undefined"
                        ? window.location.origin
                        : ""
                    }/tracker.js" data-website-id="${website.id}"></script>`}
                  </code>
                  <button
                    onClick={() => copyTrackingCode(website.id)}
                    className="px-3 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                  >
                    {copiedId === website.id ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Add this script to your website's &lt;head&gt; section
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
