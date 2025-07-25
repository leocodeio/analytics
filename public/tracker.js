(() => {
  const scriptElement = document.currentScript;
  if (!scriptElement) return;

  const websiteId = scriptElement.getAttribute("data-website-id");
  const apiEndpoint = "/api/collect"; // Relative path to our Next.js API

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
      ...data,
    };

    // Use sendBeacon for reliability, fallback to fetch
    if (navigator.sendBeacon) {
      const headers = { type: "application/json" };
      const blob = new Blob([JSON.stringify(payload)], headers);
      navigator.sendBeacon(apiEndpoint, blob);
    } else {
      fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch((error) => {
        console.error("Analytics error:", error);
      });
    }
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
