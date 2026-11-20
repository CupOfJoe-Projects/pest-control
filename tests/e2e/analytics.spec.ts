/** Google Analytics and Google Tag Manager load on every page with our IDs. */
import { GA_MEASUREMENT_ID, GTM_ID } from "@/content/site";
import { expect, test } from "./fixtures";

// Third parties are blocked in tests, so each check confirms the page asks Google for the right ID.
const tags = [
  { name: "Google Analytics", id: GA_MEASUREMENT_ID, url: "https://www.googletagmanager.com/gtag/js" },
  { name: "Google Tag Manager", id: GTM_ID, url: "https://www.googletagmanager.com/gtm.js" },
];

for (const tag of tags) {
  for (const path of ["/", "/contact", "/pricing"]) {
    test(`${tag.name} loads on ${path}`, async ({ page }) => {
      test.skip(!tag.id, `${tag.name} is turned off in content/site.ts`);
      const request = page.waitForRequest((req) => req.url().startsWith(tag.url) && req.url().includes(`id=${tag.id}`));
      await page.goto(path);
      await request;
      const dataLayer = await page.evaluate(() => (window as unknown as { dataLayer?: unknown[] }).dataLayer);
      expect(Array.isArray(dataLayer)).toBe(true);
    });
  }
}
