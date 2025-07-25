import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { IntegrationScriptCopy } from "@/components/dashboard/integration-script-copy";

export default async function IntegrationPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const websites = await prisma.website.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const firstWebsite = websites[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Integration Guide</h1>
        <p className="text-muted-foreground mt-2">
          Learn how to add analytics tracking to your website
        </p>
      </div>

      {websites.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium text-yellow-800 mb-2">
            No websites found
          </h2>
          <p className="text-yellow-700 mb-4">
            You need to add a website first before you can integrate tracking.
          </p>
          <a
            href="/dashboard/websites"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-yellow-800 bg-yellow-100 hover:bg-yellow-200"
          >
            Add Website
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Step 1: Copy the Script */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Step 1: Copy the Tracking Script
            </h2>
            <p className="text-muted-foreground mb-4">
              Add this script to the &lt;head&gt; section of your website, just
              before the closing &lt;/head&gt; tag:
            </p>

            {firstWebsite && (
              <IntegrationScriptCopy 
                websiteId={firstWebsite.id}
                websiteName={firstWebsite.name}
              />
            )}
          </div>

          {/* Step 2: Custom Events */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Step 2: Track Custom Events (Optional)
            </h2>
            <p className="text-muted-foreground mb-4">
              Add the{" "}
              <code className="bg-secondary px-2 py-1 rounded text-sm">
                data-analytics
              </code>{" "}
              attribute to any element you want to track:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Button Clicks
                </h3>
                <div className="bg-secondary rounded-lg p-4">
                  <pre className="text-sm text-secondary-foreground">
                    <code>{`<button data-analytics="signup-button">Sign Up</button>
<button data-analytics="download-demo">Download</button>`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Link Clicks
                </h3>
                <div className="bg-secondary rounded-lg p-4">
                  <pre className="text-sm text-secondary-foreground">
                    <code>{`<a href="/pricing" data-analytics="pricing-link">View Pricing</a>
<a href="/contact" data-analytics="contact-link">Contact Us</a>`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Form Submissions
                </h3>
                <div className="bg-secondary rounded-lg p-4">
                  <pre className="text-sm text-secondary-foreground">
                    <code>{`<form data-analytics="newsletter-signup">
  <input type="email" placeholder="Your email" />
  <button type="submit">Subscribe</button>
</form>`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Verify */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Step 3: Verify Installation
            </h2>
            <p className="text-muted-foreground mb-4">
              After adding the script to your website:
            </p>

            <ol className="list-decimal list-inside space-y-2 text-foreground">
              <li>Visit your website in a new browser tab</li>
              <li>Check your browser&apos;s developer console for any errors</li>
              <li>
                Return to your{" "}
                <a
                  href="/dashboard"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  analytics dashboard
                </a>{" "}
                to see live data
              </li>
              <li>
                Click on elements with{" "}
                <code className="bg-secondary px-1 rounded text-sm">
                  data-analytics
                </code>{" "}
                attributes to test custom events
              </li>
            </ol>
          </div>

          {/* Demo Link */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
              🎮 Try the Demo
            </h2>
            <p className="text-indigo-700 mb-4">
              See the tracking in action with our interactive demo page.
            </p>
            <a
              href="/demo"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View Demo
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
