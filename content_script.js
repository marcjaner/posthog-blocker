// content_script.js
(async () => {
  // 1. Load the blocked‐domain list
  const { blocked = [] } = await chrome.storage.sync.get({ blocked: [] });
  const host = location.hostname;

  // 2. Check exact or subdomain match
  const isBlocked = blocked.some(
    (domain) => host === domain || host.endsWith("." + domain)
  );

  if (!isBlocked) return;

  console.log("🛡️ PostHog Self-Blocker active on", host);

  // 3. Define a no-op stub
  const stub = {
    capture: () => {},
    identify: () => {},
    alias: () => {},
    reset: () => {},
    people: { set: () => {}, set_once: () => {} },
  };

  // 4. Intercept any get/set of window.posthog
  Object.defineProperty(window, "posthog", {
    configurable: true,
    enumerable: true,
    get: () => stub,
    set: (newVal) => {
      console.log("🔒 Blocked assignment of real posthog:", newVal);
      // swallow it
    },
  });

  // 5. In case PostHog attaches via another global
  // this ensures subsequent references pick up our stub
  window.posthog = stub;
})();
