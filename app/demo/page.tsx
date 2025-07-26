export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Analytics Demo
          </h1>
          <p className="text-xl text-muted-foreground">
            This page demonstrates how our analytics tracking works
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 mb-8 border border-border">
          <h2 className="text-2xl font-semibold mb-6 text-card-foreground">Interactive Elements</h2>
          <p className="text-muted-foreground mb-6">
            Click on any of these elements to see custom event tracking in
            action:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <button
                data-analytics="demo-button-click"
                className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Track Button Click
              </button>

              <button
                data-analytics="signup-demo"
                className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Sign Up Demo
              </button>

              <button
                data-analytics="download-demo"
                className="w-full bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Download Demo
              </button>
            </div>

            <div className="space-y-4">
              <a
                href="#features"
                data-analytics="features-link"
                className="block w-full text-center bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground font-medium py-3 px-6 rounded-lg transition-colors"
              >
                View Features
              </a>

              <a
                href="#pricing"
                data-analytics="pricing-link"
                className="block w-full text-center bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground font-medium py-3 px-6 rounded-lg transition-colors"
              >
                See Pricing
              </a>

              <a
                href="#contact"
                data-analytics="contact-link"
                className="block w-full text-center bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 border border-border" id="features">
          <h2 className="text-2xl font-semibold mb-6 text-card-foreground">What Gets Tracked</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Automatic Tracking
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Page views</li>
                <li>• Session duration</li>
                <li>• Screen resolution</li>
                <li>• Referrer information</li>
                <li>• User agent</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Custom Events
              </h3>
              <ul className="space-y-2 text-muted-foreground">
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
          <p className="text-muted-foreground mb-4">
            Ready to start tracking your website?
          </p>
          <a
            href="/auth/signup"
            data-analytics="demo-signup-cta"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
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
