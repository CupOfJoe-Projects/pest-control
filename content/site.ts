// Business facts. NAP (name, address, phone) must match everywhere, so edit it here only.

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  name: "McDonald Exterminators",
  /** As written on their privacy policy and terms. */
  legalName: "McDonald Exterminators, Inc.",
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
  /** Office hours, from the old site's contact page. */
  hours: "Monday to Friday, 8 AM to 5 PM",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100063519311583",
    instagram: "https://www.instagram.com/mcdonaldexterminators",
  },
  /** Their stated same day policy, from the old site. */
  sameDay: "Call before 2 PM for same day service",
  region: "Polk County, FL",
  /** Brand tagline: hero headline, footer, and share image. */
  tagline: "Keep Florida outside.",
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

// Termite service is offered (the old site has a Termite Defense plan).
// false hides the termite service page, pest page, and their links.
export const SHOW_TERMITES = true;

// The intro offer. Edit it here only: the coupon, quote forms, plan cards, and
// every call to action read from this. Swap it for seasonal offers, or set
// SHOW_OFFER to false to hide it everywhere.
export const SHOW_OFFER = true;
export const OFFER = {
  headline: "$50 off your first service",
  bar: "New customers: $50 off your first service.",
  /** Big text on the coupon. */
  amount: "$50 OFF",
  /** Line under the amount on the coupon. */
  detail: "Your first service",
  /** Small tag on plan cards. */
  tag: "$50 off for new customers",
  /** Fine print on the coupon. */
  terms: "New customers only. Ask when you book or claim it online.",
};

// Shows the price line on plan cards (now "Free estimate"). false hides it.
export const SHOW_PRICING = true;

// Real numbers from their Google Business Profile, checked 2026-10-14.
// Set to null to hide the rating everywhere (UI and JSON-LD).
export const GOOGLE_RATING: {
  value: number;
  count: number;
  countLabel: string;
} | null = {
  value: 5,
  count: 195,
  countLabel: "195",
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
} | null = null;

// Floating card in the homepage hero. Their real same day policy, not a live schedule.
export const HERO_AVAILABILITY = { title: "Same day service", detail: "Call before 2 PM" };
// Florida (FDACS) pest control licenses, supplied by the owner (November 2026).
export const FDACS_LICENSE: string | null = "JB3680";
export const CERTIFIED_OPERATOR_LICENSE: string | null = "JF9080";

// "Best of Bartow" award shown near the top of the homepage. null hides it.
export const BEST_OF_AWARD: { year: number; label: string } | null = {
  year: 2026,
  label: "Voted Best Pest Control in Bartow, 2026",
};

// TODO(owner): How fast the office calls back during office hours, in minutes
// (for example 15). While null, the thank you message says "shortly".
export const CALLBACK_MINUTES: number | null = null;

// TODO(owner): Confirm these milestones and years.
export const TIMELINE = [
  { year: "1959", text: "Started as a small family business" },
  { year: "Later", text: "Moved the office to Bartow" },
  { year: "Today", text: "Serving all of Polk County" },
];

// Confirmed by the owner (November 2026): no contract is required.
export const NO_LONG_CONTRACTS_CONFIRMED = true;

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Pests", href: "/pests" },
  { label: "Service Areas", href: "/areas" },
  { label: "About", href: "/about" },
] as const;
