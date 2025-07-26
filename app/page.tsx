import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold text-gray-900">
            Analytics Platform
          </h1>
          <div className="space-x-4">
            <Link
              href="/auth/signin"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="py-20">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Modern Web</span>
              <span className="block text-indigo-600">Analytics Platform</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Track user engagement, analyze website performance, and gain
              insights with our privacy-focused analytics solution.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/auth/signup"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Start tracking for free
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                📊
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Real-time Analytics
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Monitor your website traffic and user behavior in real-time with
                detailed insights.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                🔒
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Privacy Focused
              </h3>
              <p className="mt-2 text-base text-gray-500">
                GDPR compliant analytics without compromising user privacy.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                ⚡
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Lightweight
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Minimal impact on your website performance with our optimized
                tracking script.
              </p>
            </div>
          </div>
        </div>

        {/* How to Add Your Website Section */}
        <div className="py-20 bg-white rounded-2xl shadow-xl mx-4 my-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Get Started in 3 Simple Steps
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Add analytics to your website in less than 5 minutes
              </p>
            </div>

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="lg:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold mr-4">
                      1
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Sign Up & Add Your Website
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Create your free account and add your website domain to
                    start tracking.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 font-medium mb-2">
                      Example:
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        Website Name:
                      </span>
                      <span className="bg-white px-2 py-1 rounded text-sm font-mono">
                        My Blog
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-600">Domain:</span>
                      <span className="bg-white px-2 py-1 rounded text-sm font-mono">
                        myblog.com
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg border">
                    <div className="bg-white rounded-lg shadow-sm p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">
                          Add Website
                        </h4>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">
                            Website Name
                          </label>
                          <div className="bg-gray-50 rounded px-2 py-1 text-sm">
                            My Blog
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">
                            Domain
                          </label>
                          <div className="bg-gray-50 rounded px-2 py-1 text-sm">
                            myblog.com
                          </div>
                        </div>
                        <button className="w-full bg-indigo-600 text-white text-sm py-2 rounded hover:bg-indigo-700">
                          Add Website
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
                <div className="lg:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold mr-4">
                      2
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Copy the Tracking Script
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    We&apos;ll generate a unique tracking script for your website.
                    Just copy and paste it.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 font-medium mb-2">
                      Your tracking script:
                    </p>
                    <div className="bg-gray-900 p-3 rounded text-xs text-green-400 font-mono overflow-x-auto">
                      {'<script async src="...tracker.js"'}
                      <br />
                      {'  data-website-id="abc123">'}
                      <br />
                      {"</script>"}
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border">
                    <div className="bg-white rounded-lg shadow-sm p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">
                          Integration Code
                        </h4>
                        <button className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                          Copy
                        </button>
                      </div>
                      <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono">
                        <div>{"<script async"}</div>
                        <div className="ml-2">
                          {'src="https://analytics.com/tracker.js"'}
                        </div>
                        <div className="ml-2">
                          {'data-website-id="abc123">'}
                        </div>
                        <div>{"</script>"}</div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Paste this in your website&apos;s &lt;head&gt; section
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="lg:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold mr-4">
                      3
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Start Tracking & View Analytics
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Once installed, you&apos;ll immediately start seeing visitor data
                    in your dashboard.
                  </p>
                  <div className="flex space-x-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span>Real-time tracking</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span>Historical data</span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border">
                    <div className="bg-white rounded-lg shadow-sm p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">
                          Analytics Dashboard
                        </h4>
                        <div className="flex items-center text-xs text-green-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                          Live
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Page Views
                          </span>
                          <span className="font-semibold">1,247</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Unique Visitors
                          </span>
                          <span className="font-semibold">892</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Active Now
                          </span>
                          <span className="font-semibold text-green-600">
                            23
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: "68%" }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500">
                          Traffic trend: +12% this week
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <Link
                href="/demo"
                className="inline-flex items-center px-6 py-3 border border-indigo-300 text-base font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 mr-4"
              >
                View Live Demo
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
