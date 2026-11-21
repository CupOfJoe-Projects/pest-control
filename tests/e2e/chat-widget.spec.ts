/** GoHighLevel chat bubble: loads on every page, and on phones sits above the Call / Text / Quote bar. */
import { expect, GHL_WIDGET_ID, test } from "./fixtures";

/**
 * The chat loader waits until the page has fully loaded and the browser is idle
 * (`lazyOnload`), so it comes last. The homepage is the heaviest page: about 2s
 * on a quiet computer, over 11s when the computer is busy running every browser
 * test at once. Playwright's usual 5s wait made these tests fail at random.
 */
const CHAT_TIMEOUT = 20_000;

for (const path of ["/", "/contact", "/pricing"]) {
  test(`chat widget loads on ${path}`, async ({ page }) => {
    await page.goto(path);
    const script = page.locator(`script[src="https://widgets.leadconnectorhq.com/loader.js"]`);
    await expect(script).toHaveAttribute("data-widget-id", GHL_WIDGET_ID, { timeout: CHAT_TIMEOUT });
    await expect(script).toHaveAttribute(
      "data-resources-url",
      "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
    );
    await expect(page.locator("chat-widget")).toHaveCount(1, { timeout: CHAT_TIMEOUT });
  });
}

test("chat bubble does not cover the phone action bar", async ({ page, isMobile }) => {
  await page.goto("/");
  const bubble = page.locator("chat-widget").locator(".lc_text-widget--bubble");
  await expect(bubble).toBeVisible({ timeout: CHAT_TIMEOUT });
  const box = (await bubble.boundingBox())!;
  const viewport = page.viewportSize()!;

  if (isMobile) {
    const bar = (await page.getByRole("navigation", { name: "Quick actions" }).boundingBox())!;
    expect(box.y + box.height).toBeLessThanOrEqual(bar.y);
  } else {
    // Desktop keeps GHL's own spot, 20px from the bottom.
    expect(Math.round(viewport.height - (box.y + box.height))).toBe(20);
  }
});
