// Business facts. NAP (name, address, phone) must match everywhere, so edit it here only.

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  name: "McDonald Exterminators",
  phone: "863-533-1294",
  phoneHref: "tel:+18635331294",
  email: "info@McDonaldExterminators.com",
  address: {
    street: "360 S. 1st Ave",
    city: "Bartow",
    state: "FL",
    zip: "33830",
  },
  foundingYear: 1959,
  foundingCity: "Lakeland",
  textUrl: "https://mcdexterminators.h.trustco.ai/",
  url: siteUrl,
  region: "Polk County, FL",
  tagline: "Proudly serving Polk County since 1959.",
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name} ${fullAddress}`,
)}`;

// ---------------------------------------------------------------------------
// Demo guardrail
// ---------------------------------------------------------------------------

// TODO(launch): Set to false only after sample reviews are replaced with real
// ones. While true: robots.txt disallows everything, every page is noindex,
// the sitemap is empty, and the reviews wall shows a "Sample reviews" label.
export const IS_DEMO = true;

// ---------------------------------------------------------------------------
// Placeholders. Every value below needs confirming with the owner.
// ---------------------------------------------------------------------------

// TODO(owner): Is termite service offered? Flip to true to show the termite
// service page, the termite pest page, and their links everywhere.
export const SHOW_TERMITES = false;

// TODO(owner): Confirm the current intro offer, or set SHOW_OFFER to false.
export const SHOW_OFFER = true;
export const OFFER = {
  headline: "$50 off your first service",
  bar: "New customers: $50 off your first service.",
};

// TODO(owner): Plan prices are placeholders. Set to false to hide prices.
export const SHOW_PRICING = true;

// TODO(owner): Replace with the real Google rating and review count.
// Set to null to hide the rating everywhere (UI and JSON-LD).
export const GOOGLE_RATING: {
  value: number;
  count: number;
  countLabel: string;
} | null = {
  value: 4.9,
  count: 200,
  countLabel: "200+",
};

// TODO(owner): Replace with the Google Business Profile reviews URL.
export const GOOGLE_REVIEWS_URL = mapsUrl;

// TODO(owner): Second review platform. Use whichever they actually have
// (Trustpilot, Facebook, or Nextdoor), with real numbers. null hides it.
export const SECOND_RATING: {
  platform: "trustpilot" | "facebook" | "nextdoor";
  label: string;
  value: number;
  countLabel: string;
  url: string;
} | null = {
  platform: "trustpilot",
  label: "Trustpilot",
  value: 4.8,
  countLabel: "50+",
  url: "https://www.trustpilot.com/",
};

// TODO(owner): Confirm which of these actually apply before launch.
// Set confirmed: true once verified. Unconfirmed badges still show in the demo.
export const TRUST_BADGES = [
  { id: "fdacs", title: "Licensed by FDACS", detail: "Florida Dept. of Agriculture", confirmed: false },
  { id: "fpma", title: "FPMA member", detail: "Florida Pest Management Assn.", confirmed: false },
  { id: "bbb", title: "BBB", detail: "Better Business Bureau", confirmed: false },
  { id: "guarantee", title: "Satisfaction guaranteed", detail: "If they come back, so do we", confirmed: false },
] as const;

// TODO(owner): Confirm there are no long term contracts. Until then the
// contracts row is hidden from the comparison table.
export const NO_LONG_CONTRACTS_CONFIRMED = false;

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Pests", href: "/pests" },
  { label: "Service Areas", href: "/areas" },
  { label: "About", href: "/about" },
] as const;
