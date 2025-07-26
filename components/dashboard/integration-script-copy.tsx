"use client";

import { useState } from "react";

interface IntegrationScriptCopyProps {
  websiteId: string;
  websiteName: string;
}

export function IntegrationScriptCopy({ websiteId, websiteName }: IntegrationScriptCopyProps) {
  const [copied, setCopied] = useState(false);

  const scriptCode = `<script 
  async 
  src="${typeof window !== "undefined" ? window.location.origin : "https://yourapp.com"}/tracker.js" 
  data-website-id="${websiteId}">
</script>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scriptCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="bg-secondary rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-secondary-foreground">
          Tracking script for {websiteName}
        </span>
        <button
          onClick={handleCopy}
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="text-sm text-secondary-foreground overflow-x-auto">
        <code>{scriptCode}</code>
      </pre>
    </div>
  );
}