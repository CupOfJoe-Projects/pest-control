/** Google Tag Manager (which carries Google Analytics) loads on every page with our container ID. */
import { GTM_ID } from "@/content/site";
import { expect, test } from "./fixtures";

for (const path of ["/", "/contact", "/pricing"]) {
  test(`Google Tag Manager loads on ${path}`, async ({ page }) => {
    test.skip(!GTM_ID, "GTM_ID is turned off in content/site.ts");
    // Third parties are blocked in tests, so check that the page asks for the right container.
    const gtmRequest = page.waitForRequest(
      (req) => req.url().startsWith("https://www.googletagmanager.com/gtm.js") && req.url().includes(`id=${GTM_ID}`),
    );
    await page.goto(path);
    await gtmRequest;
    const dataLayer = await page.evaluate(() => (window as unknown as { dataLayer?: unknown[] }).dataLayer);
    expect(Array.isArray(dataLayer)).toBe(true);
  });
}
