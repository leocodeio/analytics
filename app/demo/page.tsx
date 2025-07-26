export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Analytics Demo
          </h1>
          <p className="text-xl text-gray-600">
            This page demonstrates how our analytics tracking works
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Interactive Elements</h2>
          <p className="text-gray-600 mb-6">
            Click on any of these elements to see custom event tracking in
            action:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <button
                data-analytics="demo-button-click"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Track Button Click
              </button>

              <button
                data-analytics="signup-demo"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Sign Up Demo
              </button>

              <button
                data-analytics="download-demo"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Download Demo
              </button>
            </div>

            <div className="space-y-4">
              <a
                href="#features"
                data-analytics="features-link"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                View Features
              </a>

              <a
                href="#pricing"
                data-analytics="pricing-link"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                See Pricing
              </a>

              <a
                href="#contact"
                data-analytics="contact-link"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8" id="features">
          <h2 className="text-2xl font-semibold mb-6">What Gets Tracked</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Automatic Tracking
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Page views</li>
                <li>• Session duration</li>
                <li>• Screen resolution</li>
                <li>• Referrer information</li>
                <li>• User agent</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Custom Events
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Button clicks</li>
                <li>• Form submissions</li>
                <li>• Link clicks</li>
                <li>• Custom interactions</li>
                <li>• Goal conversions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Ready to start tracking your website?
          </p>
          <a
            href="/auth/signup"
            data-analytics="demo-signup-cta"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Get Started Free
          </a>
        </div>
      </div>

      {/* Demo tracking script - replace with your actual website ID */}
      <script
        async
        src="/tracker.js"
        data-website-id="cmdj67aog00034qvarrmjx0tr"
        data-debug="true"
      ></script>
    </div>
  );
}
