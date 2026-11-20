/**
 * Guard rails for content edits. These catch the mistakes that are easy to
 * make when editing the files in content/ by hand: a duplicate URL slug, a
 * link to a pest page that does not exist, a coupon with no questions, a
 * broken phone number.
 */
import { describe, expect, it } from "vitest";
import { areas } from "@/content/areas";
import { pests } from "@/content/pests";
import { services } from "@/content/services";
import { priceGroups, PRICE_NOTE } from "@/content/pricing";
import { pressItems } from "@/content/press";
import { faqs } from "@/content/faq";
import { GOOGLE_RATING, mainNav, site } from "@/content/site";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const dupes = (list: string[]) => list.filter((v, i) => list.indexOf(v) !== i);
const pestSlugs = new Set(pests.map((p) => p.slug));
const serviceSlugs = new Set(services.map((s) => s.slug));
const allPrices = priceGroups.flatMap((g) => g.items);

describe("business details", () => {
  it("has a 10 digit phone number that matches the tap to call link", () => {
    const digits = site.phone.replace(/\D/g, "");
    expect(digits).toHaveLength(10);
    expect(site.phoneHref.replace(/\D/g, "")).toMatch(new RegExp(`${digits}$`));
  });

  it("has a valid email and a 5 digit ZIP", () => {
    expect(site.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i);
    expect(site.address.zip).toMatch(/^\d{5}$/);
  });

  it("links to social profiles over https, without tracking codes", () => {
    for (const url of [site.googleBusiness, ...Object.values(site.social)]) {
      expect(url).toMatch(/^https:\/\//);
      expect(url).not.toMatch(/fbclid|utm_|igsh/);
    }
  });

  it("has a believable Google rating, if one is shown", () => {
    if (!GOOGLE_RATING) return;
    expect(GOOGLE_RATING.value).toBeGreaterThanOrEqual(1);
    expect(GOOGLE_RATING.value).toBeLessThanOrEqual(5);
    expect(GOOGLE_RATING.countLabel.replace(/\D/g, "")).toBe(String(GOOGLE_RATING.count));
  });

  it("only links the main menu to pages on this site", () => {
    for (const item of mainNav) expect(item.href).toMatch(/^\/[a-z-]*$/);
  });
});

describe.each([
  ["service areas", areas.map((a) => a.slug)],
  ["pests", pests.map((p) => p.slug)],
  ["services", services.map((s) => s.slug)],
  ["coupons", allPrices.map((p) => p.id)],
  ["press items", pressItems.map((p) => p.id)],
])("%s", (_, slugs) => {
  it("have unique, URL safe slugs", () => {
    expect(dupes(slugs)).toEqual([]);
    for (const slug of slugs) expect(slug).toMatch(slugPattern);
  });
});

describe("service areas", () => {
  it("only list pests that have a pest page", () => {
    for (const a of areas) for (const p of a.pests) expect(pestSlugs, `${a.name} lists "${p}"`).toContain(p);
  });

  it("have map coordinates in Polk County", () => {
    for (const a of areas) {
      const [lat, lon] = a.coords;
      expect(lat, a.name).toBeGreaterThan(27.5);
      expect(lat, a.name).toBeLessThan(28.4);
      expect(lon, a.name).toBeGreaterThan(-82.2);
      expect(lon, a.name).toBeLessThan(-81.1);
    }
  });

  it("have a blurb and intro text", () => {
    for (const a of areas) {
      expect(a.blurb.trim(), a.name).not.toBe("");
      expect(a.intro.length, a.name).toBeGreaterThan(0);
    }
  });
});

describe("services", () => {
  it("only cover pests that have a pest page", () => {
    for (const s of services) for (const p of s.pests) expect(pestSlugs, `${s.name} covers "${p}"`).toContain(p);
  });
});

describe("coupons", () => {
  it("each have a price, a description, and at least one question", () => {
    for (const item of allPrices) {
      expect(item.headline.amount.trim(), item.name).not.toBe("");
      expect(item.description.trim(), item.name).not.toBe("");
      expect(item.faqs.length, item.name).toBeGreaterThan(0);
      for (const f of item.faqs) {
        expect(f.q.trim(), item.name).not.toBe("");
        expect(f.a.trim(), `${item.name}: ${f.q}`).not.toBe("");
      }
    }
  });

  it("only appear on pest and service pages that exist", () => {
    for (const item of allPrices) {
      for (const p of item.pests ?? []) expect(pestSlugs, `${item.name} -> pest "${p}"`).toContain(p);
      for (const s of item.services ?? []) expect(serviceSlugs, `${item.name} -> service "${s}"`).toContain(s);
    }
  });

  it("never promise a monthly fee (owner's rule: one time prices only)", () => {
    const text = JSON.stringify(priceGroups) + PRICE_NOTE;
    expect(text).not.toMatch(/\/\s?mo\b|per month|a month|monthly fee(?!s)/i);
  });
});

describe("press", () => {
  it("has dates as YYYY or YYYY-MM-DD and links over https", () => {
    for (const item of pressItems) {
      if (item.date) expect(item.date, item.id).toMatch(/^\d{4}(-\d{2}-\d{2})?$/);
      if (item.href) expect(item.href, item.id).toMatch(/^https:\/\//);
      expect(item.image.alt.trim(), item.id).not.toBe("");
    }
  });
});

describe("FAQ", () => {
  it("has no empty or duplicate questions", () => {
    const qs = faqs.map((f) => f.q);
    expect(dupes(qs)).toEqual([]);
    for (const f of faqs) expect(f.a.trim(), f.q).not.toBe("");
  });
});
