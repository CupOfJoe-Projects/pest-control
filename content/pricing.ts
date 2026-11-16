import type { IconName } from "@/components/icons";

// Public prices, supplied by the owner in the MVP doc ("Answers round 2",
// November 2026), from their pricing sheet. Only the public columns are shown
// here. Internal quoting notes (size tiers above the first, discretionary
// discounts, trip fees, installment terms) stay off the site on purpose.
//
// Anything the owner marked "confirm before publishing" is handled as a quote
// (owner's call, November 2026): those coupons use a "Request..." button that
// goes to the quote form, and the unconfirmed detail is never stated on the
// site. Still open: which pests the $299 one time service covers, a startup
// charge on the mosquito bundle, mouse coverage on Platinum, what the $45/month
// plans cover, German roach installment terms, fire ant terms, and prices for
// homes above the first size tier.

export type PriceAction =
  /** Opens the phone dialer. */
  | { kind: "call"; label: string }
  /** Scrolls to the quote form and tells the office which service. */
  | { kind: "quote"; label: string };

export type PriceItem = {
  id: string;
  name: string;
  icon: IconName;
  /** Big coupon text, split so the number can be large. */
  headline: { prefix?: string; amount: string; label: string };
  /** The ongoing price under the coupon headline. */
  ongoing?: string;
  /** Property size or scope the starting price is for. */
  qualifier?: string;
  description: string;
  action: PriceAction;
  /** Pest pages (slugs) that show this coupon. */
  pests?: string[];
  /** Service pages (slugs) that show this coupon. */
  services?: string[];
  /** Number used for structured data. Omitted for free or custom quotes. */
  price?: number;
};

export type PriceGroup = { id: string; title: string; intro: string; items: PriceItem[] };

const homeSize = "Price for homes up to 2,500 sq. ft. Larger home? Request a quote.";
const rodentSize = "Price for homes up to 3,000 sq. ft. Larger home? Request a quote.";

export const priceGroups: PriceGroup[] = [
  {
    id: "general",
    title: "General pest control",
    intro: "Roaches, ants, wasps, spiders, and the other everyday pests that come in from a Florida yard.",
    items: [
      {
        id: "quarterly",
        name: "Quarterly Pest Control",
        icon: "house",
        headline: { prefix: "From", amount: "$199", label: "Initial service" },
        ongoing: "Then from $137 per quarterly visit",
        qualifier: homeSize,
        description:
          "Scheduled treatment for common pests such as roaches, ants, wasps, and spiders. Service can include perimeter, yard, and accessible eave treatment, plus interior treatment as needed.",
        action: { kind: "call", label: "Call for Quarterly Service" },
        pests: ["ants", "cockroaches", "spiders", "beetles", "crickets", "earwigs"],
        services: ["homeowner-services", "property-management-services"],
        price: 199,
      },
      {
        id: "every-other-month",
        name: "Every Other Month Pest Control",
        icon: "house",
        headline: { prefix: "From", amount: "$199", label: "Initial service" },
        ongoing: "Then from $99 per visit",
        qualifier: homeSize,
        description: "General pest control on an every other month schedule.",
        action: { kind: "call", label: "Call for Every Other Month Service" },
        services: ["homeowner-services"],
        price: 199,
      },
      {
        id: "one-time",
        name: "One Time Pest Treatment",
        icon: "bug",
        headline: { amount: "$299", label: "One time service" },
        description:
          "Tell us which pest you are dealing with and where you are seeing it. We will confirm the treatment available for your situation.",
        action: { kind: "quote", label: "Request a One Time Quote" },
        services: ["homeowner-services"],
        price: 299,
      },
      {
        id: "german-roach",
        name: "German Roach Treatment",
        icon: "cockroach",
        headline: { amount: "$167", label: "Per treatment" },
        ongoing: "Then $45 a month",
        description:
          "We inspect and treat the areas where German roaches are active, then return for two follow up treatments as part of the initial program.",
        action: { kind: "quote", label: "Request German Roach Treatment" },
        pests: ["cockroaches"],
        price: 167,
      },
    ],
  },
  {
    id: "mosquito",
    title: "Mosquito control",
    intro: "Monthly yard treatments that target the shady places mosquitoes rest.",
    items: [
      {
        id: "mosquito",
        name: "Monthly Mosquito Control",
        icon: "mosquito",
        headline: { prefix: "From", amount: "$149", label: "Initial service" },
        ongoing: "Then from $79 a month",
        qualifier: "Average size lot, about 1/4 acre.",
        description:
          "An initial outdoor treatment targets the places mosquitoes rest, followed by monthly visits to help reduce activity in your yard.",
        action: { kind: "call", label: "Call for Mosquito Service" },
        pests: ["mosquitoes"],
        services: ["mosquito-control"],
        price: 149,
      },
      {
        id: "mosquito-bundle",
        name: "Mosquito + Quarterly Pest Control",
        icon: "mosquito",
        headline: { prefix: "From", amount: "$99", label: "A month, bundled" },
        ongoing: "Monthly mosquito plus quarterly pest service",
        qualifier: homeSize,
        description: "Combine monthly mosquito treatments with quarterly general pest service.",
        action: { kind: "quote", label: "Request Bundle Pricing" },
        pests: ["mosquitoes"],
        services: ["mosquito-control", "homeowner-services"],
        price: 99,
      },
    ],
  },
  {
    id: "rodent",
    title: "Rodent control",
    intro: "Rats and mice, with an inspection for how they are getting in.",
    items: [
      {
        id: "rat",
        name: "Basic Rat Control",
        icon: "rat",
        headline: { prefix: "From", amount: "$299", label: "Initial service" },
        ongoing: "Then from $45 a month",
        qualifier: rodentSize,
        description:
          "We inspect for rat activity and possible entry points, then recommend a treatment plan. Ongoing service includes pest control.",
        action: { kind: "quote", label: "Request Rat Control" },
        pests: ["rats"],
        services: ["rodent-control"],
        price: 299,
      },
      {
        id: "platinum",
        name: "Platinum Pest + Rodent Control",
        icon: "mouse",
        headline: { prefix: "From", amount: "$299", label: "Initial service" },
        ongoing: "Then from $49 a month",
        qualifier: rodentSize,
        description:
          "Combine general pest service with ongoing rodent control. Ask about mouse coverage and a separate quote for sealing entry points.",
        action: { kind: "quote", label: "Request a Platinum Quote" },
        pests: ["rats", "mice"],
        services: ["rodent-control", "homeowner-services"],
        price: 299,
      },
      {
        id: "gopher",
        name: "Gopher Control",
        icon: "gopher",
        headline: { amount: "$450", label: "First year" },
        ongoing: "$225 to renew the next year",
        description: "Ask about annual gopher service for the active areas on your property.",
        action: { kind: "call", label: "Call for Gopher Service" },
        pests: ["gophers"],
        services: ["specialty-pest-control"],
        price: 450,
      },
    ],
  },
  {
    id: "specialty",
    title: "Specialty treatments",
    intro: "Termites, fleas, stinging insects, fire ants, and bats.",
    items: [
      {
        id: "termite",
        name: "Termite Inspection",
        icon: "termite",
        headline: { amount: "Free", label: "Termite inspection" },
        ongoing: "Custom treatment quote after the inspection",
        description: "Start with an inspection to check for signs of termite activity and talk through treatment options.",
        action: { kind: "quote", label: "Request Termite Inspection" },
        pests: ["termites"],
        services: ["termite-control"],
      },
      {
        id: "flea",
        name: "Flea Treatment",
        icon: "flea",
        headline: { prefix: "From", amount: "$199", label: "Initial service" },
        ongoing: "$45 a month ongoing plan",
        description: "Tell us where you are seeing fleas so we can help you choose the right treatment areas.",
        action: { kind: "quote", label: "Request Flea Treatment" },
        pests: ["fleas"],
        services: ["specialty-pest-control"],
        price: 199,
      },
      {
        id: "bee",
        name: "Bee Treatment",
        icon: "bug",
        headline: { amount: "$299", label: "Initial service" },
        ongoing: "Then $45 a month",
        description:
          "Tell us where you have noticed bee activity. We will assess access and explain the treatment options for that spot.",
        action: { kind: "quote", label: "Request Bee Service" },
        pests: ["specialty-bugs"],
        services: ["specialty-pest-control"],
        price: 299,
      },
      {
        id: "yellow-jacket",
        name: "Yellow Jacket Treatment",
        icon: "bug",
        headline: { amount: "$399", label: "Initial service" },
        ongoing: "Then $45 a month",
        description:
          "We assess where yellow jackets are active and confirm the treatment based on where the nest is and how we can reach it.",
        action: { kind: "quote", label: "Request Yellow Jacket Service" },
        pests: ["specialty-bugs"],
        services: ["specialty-pest-control"],
        price: 399,
      },
      {
        id: "fire-ant",
        name: "Yard Fire Ant Treatment",
        icon: "ant",
        headline: { amount: "$150", label: "Per 1/2 acre" },
        description:
          "We confirm the area to treat and explain the initial applications and ongoing options for your yard.",
        action: { kind: "quote", label: "Request Fire Ant Pricing" },
        pests: ["ants"],
        services: ["specialty-pest-control"],
        price: 150,
      },
      {
        id: "bat",
        name: "Bat Consultation",
        icon: "bat",
        headline: { amount: "Free", label: "Consultation" },
        description:
          "Tell us where you are seeing or hearing activity. We will assess the situation and talk through the next step.",
        action: { kind: "quote", label: "Request Bat Consultation" },
        pests: ["bats"],
        services: ["specialty-pest-control"],
      },
    ],
  },
  {
    id: "commercial",
    title: "Commercial and multi unit",
    intro: "Offices, food service, rentals, and apartment communities.",
    items: [
      {
        id: "commercial",
        name: "Commercial or Multi Unit Pest Control",
        icon: "building",
        headline: { amount: "Free", label: "Consultation" },
        ongoing: "Custom quote for recurring service",
        description:
          "Tell us about your property and the pest activity you are seeing. We will talk through treatment and service scheduling.",
        action: { kind: "quote", label: "Request a Commercial Quote" },
        services: ["commercial-services", "property-management-services"],
      },
    ],
  },
];

export const priceItems = priceGroups.flatMap((g) => g.items);

export function pricesForPest(slug: string) {
  return priceItems.filter((p) => p.pests?.includes(slug));
}

export function pricesForService(slug: string) {
  return priceItems.filter((p) => p.services?.includes(slug));
}

export const PRICE_NOTE =
  "Starting prices. Your exact price depends on the size of your home and what we find, and you will know it before we treat anything. No contract required.";
