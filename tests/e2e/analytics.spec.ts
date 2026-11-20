/** Google Analytics and Google Tag Manager load on every page with our IDs. */
import { GA_MEASUREMENT_ID, GOOGLE_ADS_ID, GOOGLE_ADS_LEAD_CONVERSION, GTM_ID, META_PIXEL_ID } from "@/content/site";
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
      // The setup script can run just after the request starts, so wait for it.
      await expect.poll(() => page.evaluate(() => Array.isArray(window.dataLayer))).toBe(true);
    });
  }
}

test("the Google tag is set up for Analytics and Google Ads", async ({ page }) => {
  await page.goto("/");
  const configured = () =>
    page.evaluate(() =>
      (window.dataLayer ?? [])
        .map((entry) => Array.from(entry as ArrayLike<unknown>))
        .filter((args) => args[0] === "config")
        .map((args) => args[1]),
    );
  await expect.poll(configured).toEqual(expect.arrayContaining([GA_MEASUREMENT_ID, GOOGLE_ADS_ID].filter(Boolean)));
});

test("Meta Pixel sends a PageView on load and on each page change", async ({ page }) => {
  test.skip(!META_PIXEL_ID, "META_PIXEL_ID is turned off in content/site.ts");
  const request = page.waitForRequest("https://connect.facebook.net/en_US/fbevents.js");
  await page.goto("/");
  await request;
  // Meta's script is blocked in tests, so its queue keeps every call made.
  const calls = () =>
    page.evaluate(() =>
      ((window.fbq as unknown as { queue?: ArrayLike<unknown>[] })?.queue ?? []).map((c) => Array.from(c).slice(0, 2).join(" ")),
    );
  await expect.poll(calls).toEqual([`init ${META_PIXEL_ID}`, "track PageView"]);
  await page.locator("footer a[href='/contact']").first().click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect.poll(calls).toEqual([`init ${META_PIXEL_ID}`, "track PageView", "track PageView"]);
});

/** Lead events sent to Google Analytics, as [event name, params]. */
async function events(page: import("@playwright/test").Page) {
  return page.evaluate(() =>
    (window.dataLayer ?? [])
      .map((entry) => Array.from(entry as ArrayLike<unknown>))
      .filter((args) => args[0] === "event")
      .map((args) => [args[1], args[2]] as [string, Record<string, string>]),
  );
}

/** Opens a page and waits until it is interactive (Analytics has started), so clicks are tracked. */
async function open(page: import("@playwright/test").Page, path: string) {
  await page.goto(path);
  await expect.poll(() => page.evaluate(() => Array.isArray(window.dataLayer))).toBe(true);
}

test.describe("lead events", () => {
  // Stop link clicks from leaving the page, so the test can read what was recorded.
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() =>
      document.addEventListener("click", (e) => {
        if ((e.target as Element).closest?.('a[href^="tel:"], a[href^="mailto:"], a[target="_blank"], a[href^="/services/"]')) e.preventDefault();
      }),
    );
  });

  test("call, text, and email clicks", async ({ page }) => {
    await open(page, "/contact");
    await page.locator("main a[href^='tel:']").first().click();
    await page.locator("main a[href^='mailto:']").first().click();
    await page.locator("main a[href^='https://mcdexterminators.h.trustco.ai']").first().click();
    const sent = await events(page);
    expect(sent.filter(([e]) => e === "contact_click").map(([, p]) => p.method)).toEqual(["call", "email", "text"]);
  });

  test("chat bubble opens are counted once per page", async ({ page }) => {
    await open(page, "/");
    const bubble = page.locator("chat-widget").locator(".lc_text-widget--bubble");
    await bubble.click();
    await bubble.click();
    expect((await events(page)).filter(([e]) => e === "chat_open")).toHaveLength(1);
  });

  test("service link clicks name the service", async ({ page }) => {
    await open(page, "/");
    await page.locator("footer a[href^='/services/']").first().click();
    const click = (await events(page)).find(([e]) => e === "service_click");
    expect(click?.[1]).toMatchObject({ location: "footer" });
    expect(click?.[1].service).toMatch(/^[a-z0-9-]+$/);
  });

  test("coupon claims and finished quote forms", async ({ page }) => {
    await page.route("**/api/quote", (route) => route.fulfill({ json: { ok: true } }));
    await open(page, "/");
    await page.getByRole("tab", { name: "Rodents" }).click();
    const panel = page.getByRole("tabpanel", { name: "Rodents" });
    await panel.getByRole("article", { name: "Rat Control", exact: true }).getByRole("link", { name: /Claim This Coupon/ }).click();
    const form = page.locator("form", { has: page.locator("#starter-title") });
    await form.getByText("Rodents", { exact: true }).click();
    await form.locator("#starter-zip").fill("33830");
    await form.locator("#starter-phone").fill("8635550123");
    await form.getByRole("button", { name: "Claim my free quote" }).click();
    await expect(page.getByRole("status")).toBeVisible();

    const sent = await events(page);
    expect(sent.find(([e]) => e === "claim_coupon")?.[1]).toEqual({ coupon: "Rat Control" });
    expect(sent.find(([e]) => e === "generate_lead")?.[1]).toMatchObject({ form: "homepage bar", service: "Rat Control" });
    // A saved lead also counts as a Google Ads conversion.
    if (GOOGLE_ADS_ID && GOOGLE_ADS_LEAD_CONVERSION) {
      expect(sent.filter(([e]) => e === GOOGLE_ADS_LEAD_CONVERSION)).toHaveLength(1);
    }
  });
});
