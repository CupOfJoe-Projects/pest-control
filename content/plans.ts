// No prices: the old site quotes every job after a free inspection, so each
// card says "Free estimate". Inclusions follow what the old site promises.
// TODO(owner): Confirm they sell one time treatments, and add "starting at"
// prices here if they want them shown.

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
    price: { text: "Free estimate" },
    includes: ["Free inspection", "Treatment made for your problem", "If they come back, so do we"],
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
