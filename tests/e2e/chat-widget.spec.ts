/** GoHighLevel chat bubble: loads on every page, and on phones sits above the Call / Text / Quote bar. */
import { expect, GHL_WIDGET_ID, test } from "./fixtures";

for (const path of ["/", "/contact", "/pricing"]) {
  test(`chat widget loads on ${path}`, async ({ page }) => {
    await page.goto(path);
    const script = page.locator(`script[src="https://widgets.leadconnectorhq.com/loader.js"]`);
    await expect(script).toHaveAttribute("data-widget-id", GHL_WIDGET_ID);
    await expect(script).toHaveAttribute(
      "data-resources-url",
      "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
    );
    await expect(page.locator("chat-widget")).toHaveCount(1);
  });
}

test("chat bubble does not cover the phone action bar", async ({ page, isMobile }) => {
  await page.goto("/");
  const bubble = page.locator("chat-widget").locator(".lc_text-widget--bubble");
  await expect(bubble).toBeVisible();
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
