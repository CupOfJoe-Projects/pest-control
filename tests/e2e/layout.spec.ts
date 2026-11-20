/** Nothing should scroll sideways. Long words or wide images added in an edit can cause it. */
import { expect, test } from "./fixtures";

const pages = ["/", "/pricing", "/about", "/press", "/contact", "/services", "/pests", "/areas"];

for (const path of pages) {
  test(`${path} does not scroll sideways`, async ({ page }) => {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
