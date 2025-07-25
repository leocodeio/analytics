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
      </div>
    </div>
  );
}
