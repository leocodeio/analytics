import Link from "next/link";
import { HomeHeader } from "@/components/home-header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeHeader />

        {/* Hero */}
        <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
          <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl md:text-6xl">
            Simple Website Visit Counter
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            No vanity metrics. One number that matters right now: total visits to your site.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/auth/signup"
              className="px-8 py-4 rounded-md bg-primary text-primary-foreground font-medium text-base md:text-lg shadow hover:bg-primary/90 transition-colors"
            >
              Start Free
            </Link>
          </div>
        </section>

        {/* Single Feature */}
        <section className="py-10">
          <div className="bg-card border border-border rounded-2xl p-10 shadow-xl max-w-3xl mx-auto text-center">
            <div className="mx-auto w-16 h-16 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-2xl shadow-lg">
              🔢
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-foreground">Total Visits</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-base">
              We currently track and display total visits for your website. More metrics will be added over time.
            </p>
            <div className="mt-8 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/15 dark:to-primary/5 p-6 rounded-xl border">
              <div className="bg-background border rounded-lg p-5 text-left">
                <p className="text-sm font-medium text-muted-foreground mb-3">Minimal dashboard preview</p>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Total Visits</span>
                  <span className="text-2xl font-bold text-foreground">1,247</span>
                </div>
                <div className="mt-4 w-full h-2 rounded-full bg-muted">
                  <div className="h-2 bg-primary rounded-full" style={{ width: "55%" }}></div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground text-right">(Sample data)</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-3xl font-bold text-foreground mb-14">Get Started in 3 Steps</h2>
            <div className="space-y-20">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2 order-2 md:order-1">
                  <div className="flex items-center mb-5">
                    <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shadow">1</div>
                    <h3 className="ml-4 text-xl font-semibold">Create an Account</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Sign up and add your website domain. That's all you need to begin.
                  </p>
                </div>
                <div className="md:w-1/2 order-1 md:order-2 w-full">
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground mb-4">Example</p>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between bg-muted/40 px-4 py-2 rounded-lg">
                        <span className="text-muted-foreground">Name</span>
                        <span className="font-mono">My Blog</span>
                      </div>
                      <div className="flex justify-between bg-muted/40 px-4 py-2 rounded-lg">
                        <span className="text-muted-foreground">Domain</span>
                        <span className="font-mono">myblog.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-10">
                <div className="md:w-1/2">
                  <div className="flex items-center mb-5">
                    <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shadow">2</div>
                    <h3 className="ml-4 text-xl font-semibold">Install the Script</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Copy the small script we give you into your site's &lt;head&gt; once.
                  </p>
                </div>
                <div className="md:w-1/2 w-full">
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground mb-3">Snippet</p>
                    <pre className="bg-gray-900 dark:bg-gray-950 text-green-400 text-xs p-4 rounded-lg overflow-x-auto font-mono">
{`<script async src="/tracker.js" data-website-id="abc123"></script>`}
                    </pre>
                    <p className="mt-3 text-xs text-muted-foreground">Loads asynchronously. No performance drag.</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2 order-2 md:order-1">
                  <div className="flex items-center mb-5">
                    <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shadow">3</div>
                    <h3 className="ml-4 text-xl font-semibold">See Total Visits</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Open your dashboard to view the running total of visits to your site.
                  </p>
                </div>
                <div className="md:w-1/2 order-1 md:order-2 w-full">
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground mb-4">Dashboard sample</p>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">Total Visits</span>
                      <span className="text-xl font-bold">1,247</span>
                    </div>
                    <div className="mt-4 w-full h-2 bg-muted rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{ width: "55%" }}></div>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground text-right">(Sample data)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-24">
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-10 py-4 rounded-xl bg-primary text-primary-foreground font-medium text-base shadow hover:bg-primary/90 transition-transform hover:scale-[1.03]"
              >
                Create Free Account
              </Link>
              <p className="mt-4 text-xs text-muted-foreground">More metrics coming soon.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
