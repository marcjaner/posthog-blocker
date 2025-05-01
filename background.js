async function syncRules() {
  const { blocked = [] } = await chrome.storage.sync.get({ blocked: [] });

  const existing = await chrome.declarativeNetRequest.getDynamicRules();
  const removeRuleIds = existing.map((rule) => rule.id);
  if (removeRuleIds.length) {
    await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds });
  }

  const addRules = blocked.map((host, i) => ({
    id: i + 1,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||eu.i.posthog.com/",
      resourceTypes: ["xmlhttprequest", "ping"],
      initiatorDomains: [host],
    },
  }));

  if (addRules.length) {
    await chrome.declarativeNetRequest.updateDynamicRules({ addRules });
  }
}

syncRules().catch(console.error);

chrome.runtime.onStartup.addListener(syncRules);
chrome.runtime.onInstalled.addListener(syncRules);
chrome.storage.onChanged.addListener((changes) => {
  if (changes.blocked) syncRules();
});
