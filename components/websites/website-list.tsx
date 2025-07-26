"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

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
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <CardTitle className="mb-2">No websites yet</CardTitle>
            <p className="text-muted-foreground">
              Add your first website to start tracking analytics.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Websites</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {websites.map((website) => (
            <div key={website.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">{website.name}</h3>
                  <p className="text-sm text-muted-foreground">{website.domain}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">
                      {website._count.events} events
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Added {new Date(website.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Website ID</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="flex-1 bg-muted px-3 py-2 rounded text-sm font-mono">
                      {website.id}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyWebsiteId(website.id)}
                    >
                      {copiedId === website.id ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Tracking Code</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="flex-1 bg-muted px-3 py-2 rounded text-sm font-mono break-all">
                      {`<script async src="${
                        typeof window !== "undefined"
                          ? window.location.origin
                          : ""
                      }/tracker.js" data-website-id="${website.id}"></script>`}
                    </code>
                    <Button
                      size="sm"
                      onClick={() => copyTrackingCode(website.id)}
                    >
                      {copiedId === website.id ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Add this script to your website&apos;s &lt;head&gt; section
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
