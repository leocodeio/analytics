import Link from "next/link";
import { HomeHeader } from "@/components/home-header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeHeader />

        {/* Hero */}
        <section className="pt-20 pb-24 sm:pt-32 sm:pb-32 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-5xl font-bold text-foreground sm:text-6xl md:text-7xl tracking-tight">
              Simple Website Visit Counter
            </h1>
            <p className="mt-8 max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
              No vanity metrics. One number that matters right now: total visits to your site.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/auth/signup"
                className="px-10 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors"
              >
                <span className="flex items-center gap-2">
                  Start Free
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
              <Link
                href="#how-it-works"
                className="px-8 py-4 rounded-lg border border-border text-foreground font-medium text-lg hover:bg-muted/50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Single Feature */}
        <section className="py-16">
          <div className="bg-card border border-border rounded-2xl p-12 max-w-4xl mx-auto text-center">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-3xl">
              🔢
            </div>
            <h2 className="mt-8 text-3xl font-bold text-foreground">Total Visits</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed text-lg max-w-2xl mx-auto">
              We currently track and display total visits for your website. More metrics will be added over time.
            </p>
            <div className="mt-10 bg-accent/20 p-8 rounded-2xl border border-border">
              <div className="bg-background/90 backdrop-blur-sm border-2 border-border/50 rounded-xl p-6 text-left shadow-lg">
                <p className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">Dashboard Preview</p>
                <div className="flex items-center justify-between py-3 border-b border-border/30">
                  <span className="text-base text-muted-foreground font-medium">Total Visits</span>
                  <span className="text-3xl font-bold text-foreground">1,247</span>
                </div>
                <div className="mt-6 w-full h-3 rounded-full bg-muted/50 overflow-hidden">
                  <div className="h-3 bg-primary rounded-full animate-pulse" style={{ width: "55%" }}></div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground text-right font-medium">(Sample data)</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-32">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-foreground mb-6">Get Started in 3 Steps</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Simple setup, immediate results</p>
            </div>
            <div className="space-y-32">
              {/* Step 1 */}
              <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2 order-2 lg:order-1">
                  <div className="flex items-center mb-8">
                    <div className="w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">1</div>
                    <h3 className="ml-6 text-2xl font-bold">Create an Account</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Sign up and add your website domain. That&apos;s all you need to begin tracking visits.
                  </p>
                </div>
                <div className="lg:w-1/2 order-1 lg:order-2 w-full">
                  <div className="bg-card/80 backdrop-blur-sm border-2 border-border/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <p className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wide">Example Setup</p>
                    <div className="space-y-4 text-base">
                      <div className="flex justify-between bg-muted/50 px-6 py-4 rounded-xl border border-border/30">
                        <span className="text-muted-foreground font-medium">Name</span>
                        <span className="font-mono text-foreground font-semibold">My Blog</span>
                      </div>
                      <div className="flex justify-between bg-muted/50 px-6 py-4 rounded-xl border border-border/30">
                        <span className="text-muted-foreground font-medium">Domain</span>
                        <span className="font-mono text-foreground font-semibold">myblog.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                <div className="lg:w-1/2">
                  <div className="flex items-center mb-8">
                    <div className="w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">2</div>
                    <h3 className="ml-6 text-2xl font-bold">Install the Script</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Copy the small script we give you into your site&apos;s &lt;head&gt; once. Zero performance impact.
                  </p>
                </div>
                <div className="lg:w-1/2 w-full">
                  <div className="bg-card/80 backdrop-blur-sm border-2 border-border/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <p className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wide">Code Snippet</p>
                     <pre className="bg-gray-900 dark:bg-gray-950/90 text-green-400 dark:text-purple-300 text-sm p-6 rounded-xl overflow-x-auto font-mono border-2 border-green-500/20 dark:border-primary/30 shadow-inner dark:shadow-lg">{`<script async src="/tracker.js" 
        data-website-id="abc123">
</script>`}
                    </pre>
                    <p className="mt-4 text-sm text-muted-foreground font-medium">Loads asynchronously. No performance drag.</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2 order-2 lg:order-1">
                  <div className="flex items-center mb-8">
                    <div className="w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">3</div>
                    <h3 className="ml-6 text-2xl font-bold">See Total Visits</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Open your dashboard to view the running total of visits to your site in real-time.
                  </p>
                </div>
                <div className="lg:w-1/2 order-1 lg:order-2 w-full">
                  <div className="bg-card/80 backdrop-blur-sm border-2 border-border/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <p className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wide">Dashboard Sample</p>
                    <div className="flex items-center justify-between py-4 border-b border-border/30">
                      <span className="text-base text-muted-foreground font-medium">Total Visits</span>
                      <span className="text-2xl font-bold text-foreground">1,247</span>
                    </div>
                    <div className="mt-6 w-full h-3 bg-muted/50 rounded-full overflow-hidden">
<div className="h-3 bg-primary rounded-full animate-pulse" style={{ width: "55%" }}></div>                    </div>
                    <p className="mt-4 text-sm text-muted-foreground text-right font-medium">(Sample data)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-32">
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-3 px-12 py-5 rounded-xl bg-primary text-primary-foreground font-semibold text-xl hover:bg-primary/90 transition-colors"
              >
                Create Free Account
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <p className="mt-6 text-base text-muted-foreground font-medium">More metrics coming soon.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
