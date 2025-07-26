import Link from "next/link";
import { HomeHeader } from "@/components/home-header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeHeader />

        {/* Hero Section */}
        <div className="pt-16 pb-20 sm:pt-24 sm:pb-32">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Modern Web</span>
              <span className="block text-primary mt-2">Analytics Platform</span>
            </h1>
            <p className="mt-6 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-8 md:text-xl md:max-w-3xl leading-relaxed">
              Track user engagement, analyze website performance, and gain
              insights with our privacy-focused analytics solution.
            </p>
            <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
              <div className="rounded-md shadow">
                <Link
                  href="/auth/signup"
                  className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 md:py-5 md:text-lg md:px-12 transition-all transform hover:scale-105"
                >
                  Start tracking for free
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 lg:py-24">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-primary text-primary-foreground mx-auto shadow-lg">
                📊
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                Real-time Analytics
              </h3>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                Monitor your website traffic and user behavior in real-time with
                detailed insights and live visitor tracking.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-primary text-primary-foreground mx-auto shadow-lg">
                🔒
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                Privacy Focused
              </h3>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                GDPR compliant analytics without compromising user privacy or collecting personal data.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-primary text-primary-foreground mx-auto shadow-lg">
                ⚡
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                Lightweight
              </h3>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                Minimal impact on your website performance with our optimized
                tracking script under 2KB.
              </p>
            </div>
          </div>
        </div>

        {/* How to Add Your Website Section */}
        <div className="py-24 lg:py-32">
          <div className="bg-card rounded-3xl shadow-2xl border border-border overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 py-16 lg:px-12 lg:py-24">
              <div className="text-center mb-20">
                <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
                  Get Started in 3 Simple Steps
                </h2>
                <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Add analytics to your website in less than 5 minutes
                </p>
              </div>

              <div className="space-y-20 lg:space-y-32">
                {/* Step 1 */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                  <div className="lg:w-1/2 order-2 lg:order-1">
                    <div className="flex items-center mb-6">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground font-bold mr-6 text-lg shadow-lg">
                        1
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Sign Up & Add Your Website
                      </h3>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      Create your free account and add your website domain to
                      start tracking visitor behavior and analytics.
                    </p>
                    <div className="bg-muted/50 p-6 rounded-xl border">
                      <p className="text-sm text-muted-foreground font-semibold mb-4">
                        Example:
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-muted-foreground min-w-[100px]">
                            Website Name:
                          </span>
                          <span className="bg-background px-3 py-2 rounded-lg text-sm font-mono border shadow-sm">
                            My Blog
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-muted-foreground min-w-[100px]">Domain:</span>
                          <span className="bg-background px-3 py-2 rounded-lg text-sm font-mono border shadow-sm">
                            myblog.com
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2 order-1 lg:order-2">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl border shadow-inner">
                      <div className="bg-card rounded-xl shadow-lg p-6 border">
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="text-lg font-semibold text-foreground">
                            Add Website
                          </h4>
                          <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-2">
                              Website Name
                            </label>
                            <div className="bg-muted rounded-lg px-3 py-3 text-sm font-medium">
                              My Blog
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-2">
                              Domain
                            </label>
                            <div className="bg-muted rounded-lg px-3 py-3 text-sm font-medium">
                              myblog.com
                            </div>
                          </div>
                          <button className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-lg hover:bg-primary/90 transition-all transform hover:scale-[1.02] shadow-lg">
                            Add Website
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
                  <div className="lg:w-1/2">
                    <div className="flex items-center mb-6">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground font-bold mr-6 text-lg shadow-lg">
                        2
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Copy the Tracking Script
                      </h3>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      We'll generate a unique tracking script for your website.
                      Just copy and paste it into your site's head section.
                    </p>
                    <div className="bg-muted/50 p-6 rounded-xl border">
                      <p className="text-sm text-muted-foreground font-semibold mb-4">
                        Your tracking script:
                      </p>
                      <div className="bg-gray-900 dark:bg-gray-950 p-4 rounded-lg text-xs text-green-400 font-mono overflow-x-auto shadow-inner">
                        {'<script async src="...tracker.js"'}
                        <br />
                        {'  data-website-id="abc123">'}
                        <br />
                        {"</script>"}
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-8 rounded-2xl border shadow-inner">
                      <div className="bg-card rounded-xl shadow-lg p-6 border">
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="text-lg font-semibold text-foreground">
                            Integration Code
                          </h4>
                          <button className="text-sm bg-primary/10 text-primary px-3 py-2 rounded-lg font-medium hover:bg-primary/20 transition-colors">
                            Copy
                          </button>
                        </div>
                        <div className="bg-gray-900 dark:bg-gray-950 text-green-400 p-4 rounded-lg text-xs font-mono shadow-inner">
                          <div>{"<script async"}</div>
                          <div className="ml-2">
                            {'src="https://analytics.com/tracker.js"'}
                          </div>
                          <div className="ml-2">
                            {'data-website-id="abc123">'}
                          </div>
                          <div>{"</script>"}</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                          Paste this in your website's &lt;head&gt; section
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                  <div className="lg:w-1/2 order-2 lg:order-1">
                    <div className="flex items-center mb-6">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground font-bold mr-6 text-lg shadow-lg">
                        3
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Start Tracking & View Analytics
                      </h3>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      Once installed, you'll immediately start seeing visitor data
                      in your dashboard with real-time insights and historical trends.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center bg-muted/50 px-4 py-2 rounded-lg border">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-foreground font-medium">Real-time tracking</span>
                      </div>
                      <div className="flex items-center bg-muted/50 px-4 py-2 rounded-lg border">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-foreground font-medium">Historical data</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2 order-1 lg:order-2">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-8 rounded-2xl border shadow-inner">
                      <div className="bg-card rounded-xl shadow-lg p-6 border">
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="text-lg font-semibold text-foreground">
                            Analytics Dashboard
                          </h4>
                          <div className="flex items-center text-sm text-green-600 bg-green-50 dark:bg-green-950/30 px-3 py-1 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                            Live
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                            <span className="text-sm text-muted-foreground font-medium">
                              Page Views
                            </span>
                            <span className="font-bold text-foreground text-lg">1,247</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                            <span className="text-sm text-muted-foreground font-medium">
                              Unique Visitors
                            </span>
                            <span className="font-bold text-foreground text-lg">892</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                            <span className="text-sm text-muted-foreground font-medium">
                              Active Now
                            </span>
                            <span className="font-bold text-green-600 text-lg">
                              23
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3 mt-4">
                            <div
                              className="bg-primary h-3 rounded-full shadow-sm"
                              style={{ width: "68%" }}
                            ></div>
                          </div>
                          <p className="text-sm text-muted-foreground text-center mt-3">
                            Traffic trend: +12% this week
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-20">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/demo"
                    className="inline-flex items-center px-8 py-4 border border-primary/30 text-base font-medium rounded-xl text-primary bg-primary/5 hover:bg-primary/10 transition-all transform hover:scale-105 shadow-lg"
                  >
                    View Live Demo
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-primary-foreground bg-primary hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Start Free Trial
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}