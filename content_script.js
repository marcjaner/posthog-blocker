(async () => {
  const { blocked = [] } = await chrome.storage.sync.get({ blocked: [] });
  const host = location.hostname;

  const isBlocked = blocked.some(
    (domain) => host === domain || host.endsWith("." + domain)
  );

  if (!isBlocked) return;

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
    set: (newVal) => {},
  });

  window.posthog = stub;
})();
