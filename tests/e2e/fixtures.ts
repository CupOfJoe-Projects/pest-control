import { test as base, expect } from "@playwright/test";

export const GHL_WIDGET_ID = "68cf3025f6dad85ecdf9c863";

/**
 * Stand-in for the GHL chat loader: draws a bubble inside a shadow root at the
 * same spot and with the same class names as the real widget, so tests can
 * check our code without talking to GoHighLevel.
 */
const fakeChatLoader = `
  const host = document.createElement("chat-widget");
  const root = host.attachShadow({ mode: "open" });
  root.innerHTML = '<div class="lc_text-widget" style="position:fixed;right:20px;bottom:20px;width:58px;height:58px">'
    + '<button class="lc_text-widget--bubble" style="position:fixed;right:20px;bottom:20px;width:58px;height:58px">Chat</button></div>';
  document.body.appendChild(host);
`;

/**
 * Every test runs offline from third parties: the chat loader is faked and
 * other outside requests (Google Maps, fonts CDN, etc.) are blocked.
 */
export const test = base.extend({
  page: async ({ page, baseURL }, provide) => {
    await page.route("**/*", (route) => {
      const url = route.request().url();
      if (url.startsWith(baseURL!) || url.startsWith("data:")) return route.continue();
      if (url.startsWith("https://widgets.leadconnectorhq.com/loader.js")) {
        return route.fulfill({ contentType: "text/javascript", body: fakeChatLoader });
      }
      return route.abort();
    });
    await provide(page);
  },
});

export { expect };
