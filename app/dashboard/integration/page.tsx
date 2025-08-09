import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { IntegrationScriptCopy } from "@/components/dashboard/integration-script-copy";

export default async function IntegrationPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/signin');

  const websites = await prisma.website.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: 'desc' } });
  const firstWebsite = websites[0];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Integration</h1>
        <p className="text-muted-foreground mt-2">Add the script below to start tracking page views and custom events.</p>
      </div>

      {websites.length === 0 ? (
        <div className="border rounded-lg p-6 bg-card">
          <p className="mb-4 text-sm text-muted-foreground">You need to add a website before integrating the tracking script.</p>
          <a href="/dashboard/websites" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">Add Website</a>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4">Tracking Script</h2>
            <p className="text-sm text-muted-foreground mb-4">Place this inside the <code>&lt;head&gt;</code> of your site.</p>
            {firstWebsite && (
              <IntegrationScriptCopy websiteId={firstWebsite.id} websiteName={firstWebsite.name} />
            )}
          </div>

          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4">Custom Events (Optional)</h2>
            <p className="text-sm text-muted-foreground mb-4">Add a <code className="bg-secondary px-1 rounded">data-analytics</code> attribute to any element. Clicks / submissions will be tracked.</p>
            <div className="bg-secondary rounded-md p-4 text-sm overflow-auto">
              <pre><code>{`<button data-analytics="signup-button">Sign Up</button>
<a href="/pricing" data-analytics="pricing-link">View Pricing</a>
<form data-analytics="newsletter-form">
  <input type="email" placeholder="Email" />
  <button type="submit">Subscribe</button>
</form>`}</code></pre>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4">Verifying</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Deploy or run your site locally with the script installed.</li>
              <li>Visit a few pages and interact with elements with <code className="bg-secondary px-1 rounded">data-analytics</code>.</li>
              <li>Open the dashboard to see visits update (toggle include custom events if desired).</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
