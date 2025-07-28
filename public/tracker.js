(() => {
  const scriptElement = document.currentScript;
  if (!scriptElement) return;

  const websiteId = scriptElement.getAttribute("data-website-id");
  // Use the script's origin as the API endpoint
  const apiEndpoint = scriptElement.getAttribute("data-api-endpoint") || 
    (scriptElement.src ? new URL(scriptElement.src).origin + "/api/collect" : 
    window.location.origin + "/api/collect");
  const debug = scriptElement.getAttribute("data-debug") === "true";

  if (!websiteId) {
    console.error("Analytics Tracker: data-website-id is missing.");
    return;
  }

  // Generate or retrieve a session ID
  let sessionId = sessionStorage.getItem("analytics-session-id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("analytics-session-id", sessionId);
  }

  // Track if this is the user's first visit
  const isFirstVisit = !localStorage.getItem("analytics-visited");
  if (isFirstVisit) {
    localStorage.setItem("analytics-visited", "true");
  }

  // Enhanced sendEvent function with retry logic
  const sendEvent = (eventType, eventName, data = {}) => {
    const payload = {
      websiteId,
      sessionId,
      eventType,
      eventName,
      path: window.location.pathname,
      referrer: document.referrer,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      timestamp: new Date().toISOString(),
      isFirstVisit,
      ...data,
    };

    if (debug) {
      console.log("Analytics Event:", payload);
    }

    // Enhanced sending with retry logic
    const sendWithRetry = (attempt = 1) => {
      if (navigator.sendBeacon) {
        const headers = { type: "application/json" };
        const blob = new Blob([JSON.stringify(payload)], headers);
        const success = navigator.sendBeacon(apiEndpoint, blob);

        if (!success && attempt < 3) {
          setTimeout(() => sendWithRetry(attempt + 1), 1000);
        }
      } else {
        fetch(apiEndpoint, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
          keepalive: true,
          credentials: "omit", // Explicitly avoid sending credentials for analytics
        }).catch((error) => {
          if (debug) {
            console.error("Analytics error:", error);
          }
          if (attempt < 3) {
            setTimeout(() => sendWithRetry(attempt + 1), 1000);
          }
        });
      }
    };

    sendWithRetry();
  };

  // 1. Track initial pageview
  sendEvent("pageview", window.location.pathname);

  // 2. Track clicks on designated elements
  document.body.addEventListener(
    "click",
    (e) => {
      const element = e.target.closest("[data-analytics]");
      if (element) {
        const eventName = element.getAttribute("data-analytics");
        if (eventName) {
          sendEvent("custom", eventName, {
            elementText: element.textContent?.trim(),
            elementTag: element.tagName.toLowerCase(),
            ...element.dataset,
          });
        }
      }
    },
    true
  );

  // 3. Track page visibility changes (for session duration)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      sendEvent("custom", "page_hidden");
    } else {
      sendEvent("custom", "page_visible");
    }
  });

  // 4. Track page unload
  window.addEventListener("beforeunload", () => {
    sendEvent("custom", "page_unload");
  });
})();
