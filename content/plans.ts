// Starting prices from the owner's price list (content/pricing.ts has them all).
// Keep these in step with that file.

export type PlanId = "one-time" | "quarterly" | "commercial";

export type Plan = {
  id: PlanId;
  name: string;
  forWho: string;
  /** Price line. Split so the number can use tabular figures. */
  price: { prefix?: string; amount?: string; suffix?: string; text?: string };
  /** Small line under the price, e.g. the ongoing visit price. */
  priceNote?: string;
  includes: string[];
  popular?: boolean;
  /** Shows the new customer offer tag (OFFER.tag) on the card. */
  offer?: boolean;
};

export const plans: Plan[] = [
  {
    id: "one-time",
    name: "One Time",
    forWho: "A single problem",
    price: { amount: "$299", suffix: "one time" },
    priceNote: "Free inspection first",
    includes: ["Free inspection", "Treatment made for your problem", "If they come back, so do we"],
    offer: true,
  },
  {
    id: "quarterly",
    name: "Quarterly",
    forWho: "Year round home protection",
    price: { prefix: "From", amount: "$199", suffix: "to start" },
    priceNote: "One time price for your first service",
    includes: [
      "Inside and outside protection, all year",
      "Seasonal visits that build up your protection",
      "Free return visits if pests come back",
      "A service report after every visit",
    ],
    popular: true,
    offer: true,
  },
  {
    id: "commercial",
    name: "Commercial",
    forWho: "Businesses and rentals",
    price: { text: "Free consultation" },
    priceNote: "Custom quote for your property",
    includes: ["A plan built for your business", "Offices, food service, schools, and more", "A service report after every visit"],
  },
];

export const planLabels: Record<PlanId, string> = {
  "one-time": "One Time",
  quarterly: "Quarterly",
  commercial: "Commercial",
};
