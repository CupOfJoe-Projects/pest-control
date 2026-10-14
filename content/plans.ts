// TODO(owner): Every price and inclusion here is a placeholder. Confirm the real
// plans, the 30 day warranty, and free callbacks. SHOW_PRICING in site.ts hides prices.

export type PlanId = "one-time" | "quarterly" | "commercial";

export type Plan = {
  id: PlanId;
  name: string;
  forWho: string;
  price: string;
  includes: string[];
  popular?: boolean;
};

export const plans: Plan[] = [
  {
    id: "one-time",
    name: "One Time",
    forWho: "A single problem",
    price: "Starting at $X",
    includes: ["Full inspection", "Targeted treatment", "30 day warranty"],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    forWho: "Year round home protection",
    price: "From $X per visit",
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
    price: "Custom quote",
    includes: ["Scheduled service", "Inspection ready records", "Rodent monitoring"],
  },
];

export const planLabels: Record<PlanId, string> = {
  "one-time": "One Time",
  quarterly: "Quarterly",
  commercial: "Commercial",
};
