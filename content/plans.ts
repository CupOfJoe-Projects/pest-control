// TODO(owner): Every price and inclusion here is a placeholder ($149 and $45/mo
// are realistic demo numbers, not real prices). Confirm the real
// plans, the 30 day warranty, and free callbacks. SHOW_PRICING in site.ts hides prices.

export type PlanId = "one-time" | "quarterly" | "commercial";

export type Plan = {
  id: PlanId;
  name: string;
  forWho: string;
  /** Price line. Split so the number can use tabular figures. */
  price: { prefix?: string; amount?: string; suffix?: string; text?: string };
  includes: string[];
  popular?: boolean;
};

export const plans: Plan[] = [
  {
    id: "one-time",
    name: "One Time",
    forWho: "A single problem",
    price: { prefix: "From", amount: "$149" },
    includes: ["Full inspection", "Targeted treatment", "30 day warranty"],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    forWho: "Year round home protection",
    price: { prefix: "From", amount: "$45", suffix: "/mo" },
    includes: [
      "Inside and outside treatment every 3 months",
      "Free callbacks between visits",
      "A service report after every visit",
    ],
    popular: true,
  },
  {
    id: "commercial",
    name: "Commercial",
    forWho: "Businesses and rentals",
    price: { text: "Custom quote" },
    includes: ["Scheduled service", "Inspection ready records", "Rodent monitoring"],
  },
];

export const planLabels: Record<PlanId, string> = {
  "one-time": "One Time",
  quarterly: "Quarterly",
  commercial: "Commercial",
};
