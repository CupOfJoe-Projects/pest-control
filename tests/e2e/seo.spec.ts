/**
 * SEO: every page must be fully rendered on the server, so search engines see
 * the content without running JavaScript. These requests do not run any JS.
 */
import { expect, test } from "@playwright/test";
import { IS_DEMO, site } from "@/content/site";
import { areas } from "@/content/areas";
import { pests } from "@/content/pests";
import { services } from "@/content/services";

const pages = [
  "/",
  "/pricing",
  "/contact",
  "/about",
  "/press",
  "/services",
  "/pests",
  "/areas",
  "/privacy",
  "/terms",
  `/areas/${areas[0].slug}`,
  `/pests/${pests[0].slug}`,
  `/services/${services[0].slug}`,
];

for (const path of pages) {
  test(`${path} is server rendered with SEO tags`, async ({ request }) => {
    const res = await request.get(path);
    expect(res.status()).toBe(200);
    const html = await res.text();

    expect(html.match(/<h1[\s>]/g) ?? [], "exactly one <h1>").toHaveLength(1);
    expect(html).toMatch(/<title>[^<]{10,}<\/title>/);
    expect(html).toMatch(/<meta name="description" content="[^"]{30,}"/);
    expect(html).toMatch(/<link rel="canonical" href="[^"]+"/);
    expect(html).toMatch(/<meta property="og:title"/);
    // Real text in the HTML, not an empty shell filled in by JavaScript.
    expect(html).toContain(site.phone);

    if (IS_DEMO) expect(html).toMatch(/<meta name="robots" content="noindex, nofollow"/);
    else expect(html).not.toMatch(/noindex/);
  });
}

test("homepage has valid LocalBusiness structured data", async ({ request }) => {
  const html = await (await request.get("/")).text();
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) =>
    JSON.parse(m[1]),
  );
  const business = blocks.find((b) => b["@type"] === "LocalBusiness");
  expect(business).toBeTruthy();
  expect(business.name).toBe(site.name);
  expect(business.address.postalCode).toBe(site.address.zip);
});

test("pricing page has offer and FAQ structured data", async ({ request }) => {
  const html = await (await request.get("/pricing")).text();
  const types = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => JSON.parse(m[1])["@type"],
  );
  expect(types).toContain("FAQPage");
});

test("robots.txt and sitemap.xml respond", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  if (IS_DEMO) expect(await robots.text()).toContain("Disallow: /");
  else expect(await sitemap.text()).toContain(`${site.url}/pricing`);
});

test("unknown pages return 404", async ({ request }) => {
  expect((await request.get("/this-page-does-not-exist")).status()).toBe(404);
});

test("old site URLs redirect to the new pages", async ({ request }) => {
  const res = await request.get("/lakeland-pest-control", { maxRedirects: 0 });
  expect([301, 308]).toContain(res.status());
  expect(res.headers().location).toContain("/areas/lakeland");
});
