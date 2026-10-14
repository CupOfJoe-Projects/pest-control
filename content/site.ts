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

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Pests", href: "/pests" },
  { label: "Service Areas", href: "/areas" },
  { label: "About", href: "/about" },
] as const;
