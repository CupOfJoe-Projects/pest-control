/** Every link on the site that points to another page on the site must work. */
import { expect, test } from "@playwright/test";

const START = ["/", "/pricing", "/about", "/press", "/contact", "/services", "/pests", "/areas"];

test("internal links all resolve", async ({ request }) => {
  test.setTimeout(120_000);
  const found = new Map<string, string>(); // link -> page it was found on
  for (const page of START) {
    const html = await (await request.get(page)).text();
    for (const [, href] of html.matchAll(/<a[^>]+href="(\/[^"#?]*)/g)) {
      if (!found.has(href)) found.set(href, page);
    }
  }
  expect(found.size).toBeGreaterThan(20);

  const broken: string[] = [];
  for (const [href, from] of found) {
    const res = await request.get(href);
    if (res.status() >= 400) broken.push(`${href} (linked from ${from}) -> ${res.status()}`);
  }
  expect(broken, "broken internal links").toEqual([]);
});
