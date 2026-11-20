import { describe, expect, it, vi } from "vitest";
import { localBusinessJsonLd, pageMetadata, pageTitle } from "@/lib/seo";
import { GOOGLE_RATING, IS_DEMO, site } from "@/content/site";
import { areas } from "@/content/areas";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("page metadata", () => {
  it("builds the title pattern, canonical URL, and social cards", () => {
    const m = pageMetadata({ topic: "Ant Control", description: "Ants, gone.", path: "/pests/ants" });
    expect(m.title).toEqual({ absolute: `Ant Control | ${site.name} | ${site.region}` });
    expect(m.alternates?.canonical).toBe("/pests/ants");
    expect(m.description).toBe("Ants, gone.");
    expect(m.openGraph).toMatchObject({ url: "/pests/ants", siteName: site.name });
    expect(pageTitle("X")).toContain(site.name);
  });
});

describe("LocalBusiness structured data", () => {
  const data = localBusinessJsonLd();

  it("uses the same phone number as the rest of the site", () => {
    expect(data.telephone.replace(/\D/g, "")).toBe(`1${site.phone.replace(/\D/g, "")}`);
  });

  it("has the office address and every service area", () => {
    expect(data.address).toMatchObject({ streetAddress: site.address.street, postalCode: site.address.zip });
    for (const a of areas) expect(data.areaServed).toContainEqual({ "@type": "City", name: `${a.name}, FL` });
  });

  it("matches the Google rating shown on the page", () => {
    if (GOOGLE_RATING) expect(data.aggregateRating).toMatchObject({ reviewCount: GOOGLE_RATING.count });
    else expect(data).not.toHaveProperty("aggregateRating");
  });

  it("links the social profiles", () => {
    expect(data.sameAs).toEqual(expect.arrayContaining(Object.values(site.social)));
  });
});

describe("robots and sitemap", () => {
  it("match the demo switch", () => {
    if (IS_DEMO) {
      expect(robots().rules).toEqual({ userAgent: "*", disallow: "/" });
      expect(sitemap()).toEqual([]);
    } else {
      expect(robots().sitemap).toBe(`${site.url}/sitemap.xml`);
    }
  });

  it("list every public page once the site is live", async () => {
    vi.resetModules();
    vi.doMock("@/content/site", async (orig) => ({ ...(await orig<object>()), IS_DEMO: false }));
    const { default: liveSitemap } = await import("@/app/sitemap");
    const urls = liveSitemap().map((e) => e.url.replace(site.url, ""));
    for (const path of ["", "/pricing", "/contact", "/about", "/press", "/areas", "/pests", "/services"]) {
      expect(urls).toContain(path);
    }
    for (const a of areas) expect(urls).toContain(`/areas/${a.slug}`);
    vi.doUnmock("@/content/site");
  });
});
