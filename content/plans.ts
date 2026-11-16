// No prices yet: each card says "Free estimate". Inclusions follow what the old
// site promises.
// TODO(owner): Vic is supplying starting prices. When they arrive, set price to
// { prefix: "From", amount: "$__", suffix: "per visit" } and add the numbers
// to the cost answer in content/faq.ts.

export type PlanId = "one-time" | "quarterly" | "commercial";

export type Plan = {
  id: PlanId;
  name: string;
  forWho: string;
  /** Price line. Split so the number can use tabular figures. */
  price: { prefix?: string; amount?: string; suffix?: string; text?: string };
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
    price: { text: "Free estimate" },
    includes: ["Free inspection", "Treatment made for your problem", "If they come back, so do we"],
    offer: true,
  },
  {
    id: "quarterly",
    name: "Quarterly",
    forWho: "Year round home protection",
    price: { text: "Free estimate" },
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
    price: { text: "Free estimate" },
    includes: ["A plan built for your business", "Offices, food service, schools, and more", "A service report after every visit"],
  },
];

export const planLabels: Record<PlanId, string> = {
  "one-time": "One Time",
  quarterly: "Quarterly",
  commercial: "Commercial",
};
