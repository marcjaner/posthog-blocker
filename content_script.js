(async () => {
  const { blocked = [] } = await chrome.storage.sync.get({ blocked: [] });
  const host = location.hostname;

  const isBlocked = blocked.some(
    (domain) => host === domain || host.endsWith("." + domain)
  );

  if (!isBlocked) return;

  console.log("🛡️ PostHog Self-Blocker active on", host);

  const stub = {
    capture: () => {},
    identify: () => {},
    alias: () => {},
    reset: () => {},
    people: { set: () => {}, set_once: () => {} },
  };

  Object.defineProperty(window, "posthog", {
    configurable: true,
    enumerable: true,
    get: () => stub,
    set: (newVal) => {
      console.log("🔒 Blocked assignment of real posthog:", newVal);
    },
  });

  window.posthog = stub;
})();
