import type { IconName } from "@/components/icons";

// Public prices, supplied by the owner in the MVP doc ("Answers round 2",
// November 2026), from their pricing sheet. Only the public columns are shown
// here. Internal quoting notes (size tiers above the first, discretionary
// discounts, trip fees, installment terms) stay off the site on purpose.
//
// Anything the owner marked "confirm before publishing" is handled as a quote
// (owner's call, November 2026): those coupons use a "Request..." button that
// goes to the quote form, and the unconfirmed detail is never stated on the
// site. Still open: which pests the $299 one time service covers, mouse coverage
// on Platinum, German roach installment terms, fire ant terms, and prices for
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
  /** Big coupon text, split so the number can be large. Always a one time price. */
  headline: { prefix?: string; amount: string; label: string };
  /** Questions customers ask about this service. Shown as dropdowns beside the coupon. */
  faqs: PriceFaq[];
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

export type PriceFaq = { q: string; a: string };

// Questions most services share, worded once.
const CONTRACT: PriceFaq = {
  q: "Do I need to sign a contract?",
  a: "No. There is nothing to sign. You pay the one time price for this service, and you only book again if you want to.",
};
const SAME_DAY: PriceFaq = {
  q: "Do you offer same day service?",
  a: "Yes. Call before 2 PM for same day service. We are a local office in Bartow.",
};
const PEST_COVERED: PriceFaq = {
  q: "What pests does this cover?",
  a: "Roaches, ants, wasps, spiders, and the other everyday pests that come in from a Florida yard. Not sure what you have? Tell us what you are seeing.",
};

export type PriceGroup = { id: string; title: string; intro: string; items: PriceItem[] };

const homeSize = "Homes up to 2,500 sq. ft. Larger home? Request a quote.";
const rodentSize = "Homes up to 3,000 sq. ft. Larger home? Request a quote.";

// Owner's call (November 2026): every coupon shows a one time price, with no
// monthly or per visit fees on the site. Recurring services show the price of
// the first service. The monthly only bundle and the every other month plan
// (same first price as quarterly) were taken off for that reason.
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
        headline: { prefix: "From", amount: "$199", label: "First service" },
        faqs: [
          PEST_COVERED,
          { q: "What does a visit include?", a: "We treat around the outside of your home, the yard, and the eaves we can reach, and inside as needed." },
          { q: "What if pests come back?", a: "Call us. If pests come back between services, we come back out at no charge." },
          CONTRACT,
          SAME_DAY,
        ],
        qualifier: homeSize,
        description:
          "Scheduled treatment for common pests such as roaches, ants, wasps, and spiders. Service can include perimeter, yard, and accessible eave treatment, plus interior treatment as needed.",
        action: { kind: "call", label: "Call to Claim This Coupon" },
        pests: ["ants", "cockroaches", "spiders", "beetles", "crickets", "earwigs"],
        services: ["homeowner-services", "property-management-services"],
        price: 199,
      },
      {
        id: "one-time",
        name: "One Time Pest Treatment",
        icon: "bug",
        headline: { amount: "$299", label: "One time service" },
        faqs: [
          { q: "What happens at the visit?", a: "We inspect first to find the pest and where it is coming from. Then we treat for what we found." },
          { q: "Which pests can you treat?", a: "Tell us what you are seeing and where. We will confirm the treatment for your situation before we book." },
          { q: "What if they come back?", a: "If they come back, so do we. Call us and tell us what you are seeing." },
          CONTRACT,
          SAME_DAY,
        ],
        description:
          "Tell us which pest you are dealing with and where you are seeing it. We will confirm the treatment available for your situation.",
        action: { kind: "quote", label: "Claim This Coupon" },
        services: ["homeowner-services"],
        price: 299,
      },
      {
        id: "german-roach",
        name: "German Roach Treatment",
        icon: "cockroach",
        headline: { amount: "$167", label: "Roach treatment" },
        faqs: [
          { q: "How are German roaches different?", a: "They are small and light brown, with two dark stripes behind the head. They live indoors, near warmth and water in kitchens and bathrooms, and they breed fast." },
          { q: "How do you treat them?", a: "We inspect to find where they are active and treat each of those areas. Two follow up treatments are included, to catch roaches that hatch after the first visit." },
          { q: "Why do I have roaches in a clean house?", a: "German roaches ride in on boxes, grocery bags, and used appliances. They only need crumbs and a little water, so a clean house can still have them." },
          CONTRACT,
        ],
        description:
          "We inspect and treat the areas where German roaches are active, then return for two follow up treatments as part of the program.",
        action: { kind: "quote", label: "Claim This Coupon" },
        pests: ["cockroaches"],
        price: 167,
      },
    ],
  },
  {
    id: "mosquito",
    title: "Mosquito control",
    intro: "Yard treatments that target the shady places mosquitoes rest.",
    items: [
      {
        id: "mosquito",
        name: "Mosquito Yard Treatment",
        icon: "mosquito",
        headline: { prefix: "From", amount: "$149", label: "Yard treatment" },
        faqs: [
          { q: "Why do I have mosquitoes in my yard?", a: "Standing water. Mosquitoes can breed in water as small as a bottle cap, and Florida rain refills it all summer." },
          { q: "Where do mosquitoes go during the day?", a: "They rest in shade: under leaves, in shrubs, and under decks. That is where we treat." },
          { q: "Can I get rid of mosquitoes on my own?", a: "Dumping standing water every week helps a lot. Treating the places they rest reaches the mosquitoes you cannot see." },
          { q: "How big a yard does the price cover?", a: "The price is for an average lot, about 1/4 acre. Bigger yard? Ask us for a quote." },
          SAME_DAY,
        ],
        qualifier: "Average size lot, about 1/4 acre.",
        description: "An outdoor treatment that targets the places mosquitoes rest, to help reduce activity in your yard.",
        action: { kind: "call", label: "Call to Claim This Coupon" },
        pests: ["mosquitoes"],
        services: ["mosquito-control"],
        price: 149,
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
        name: "Rat Control",
        icon: "rat",
        headline: { prefix: "From", amount: "$299", label: "Rat control" },
        faqs: [
          { q: "How long will it take to get rid of rats?", a: "It depends on how many there are and how they are getting in. We will tell you what to expect after the inspection." },
          { q: "Will they leave on their own?", a: "Rarely. Once rats find food and shelter, they stay and have more rats." },
          { q: "Do rats go in clean houses?", a: "Yes. Rats come in for shelter and water too, not just food." },
          { q: "What does the price include?", a: "An inspection for rat activity and entry points, then a treatment plan with your price before we start. Priced for homes up to 3,000 sq. ft." },
          SAME_DAY,
        ],
        qualifier: rodentSize,
        description: "We inspect for rat activity and possible entry points, then recommend a treatment plan.",
        action: { kind: "quote", label: "Claim This Coupon" },
        pests: ["rats"],
        services: ["rodent-control"],
        price: 299,
      },
      {
        id: "platinum",
        name: "Platinum Pest + Rodent Control",
        icon: "mouse",
        headline: { prefix: "From", amount: "$299", label: "Pest + rodent" },
        faqs: [
          { q: "How is this different from rat control?", a: "Platinum combines general pest service with rodent control, so one service covers both." },
          { q: "Does it cover mice?", a: "Ask us about mouse coverage when you call. We will tell you what is included for your home." },
          { q: "Can you seal the entry points?", a: "Yes. Sealing is separate work, and we will give you a price for it after the inspection." },
          CONTRACT,
        ],
        qualifier: rodentSize,
        description: "General pest service and rodent control in one visit. Ask about mouse coverage and a separate quote for sealing entry points.",
        action: { kind: "quote", label: "Claim This Coupon" },
        pests: ["rats", "mice"],
        services: ["rodent-control", "homeowner-services"],
        price: 299,
      },
      {
        id: "gopher",
        name: "Gopher Control",
        icon: "gopher",
        headline: { amount: "$450", label: "A full year" },
        faqs: [
          { q: "How do I know it is gophers?", a: "Look for fresh mounds of loose dirt, often fan shaped, with the hole plugged." },
          { q: "Will they go away on their own?", a: "Usually not. Gophers keep digging new tunnels and mounds as long as they have food." },
          { q: "What does the price cover?", a: "A full year of service for the active areas on your property, paid once." },
          CONTRACT,
        ],
        description: "Annual gopher service for the active areas on your property.",
        action: { kind: "call", label: "Call to Claim This Coupon" },
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
        headline: { amount: "FREE", label: "Termite inspection" },
        faqs: [
          { q: "What do you look for?", a: "Mud tubes, swarmers, shed wings, and wood that sounds hollow or is damaged." },
          { q: "Is the inspection really free?", a: "Yes. There is no cost and no obligation to book anything." },
          { q: "What if you find termites?", a: "We show you what we found and give you a custom treatment quote. You decide what to do next." },
          { q: "When are termites most active?", a: "Swarm season usually runs from late winter into spring. Seeing swarmers inside can mean a colony is close." },
        ],
        description: "Start with an inspection to check for signs of termite activity and talk through treatment options.",
        action: { kind: "quote", label: "Claim This Coupon" },
        pests: ["termites"],
        services: ["termite-control"],
      },
      {
        id: "flea",
        name: "Flea Treatment",
        icon: "flea",
        headline: { prefix: "From", amount: "$199", label: "Flea treatment" },
        faqs: [
          { q: "Where do fleas come from?", a: "Usually pets, or wildlife passing through the yard. Fleas then live in carpet, bedding, and shady spots outside." },
          { q: "Do I need to treat my pet too?", a: "Yes. Ask your vet about flea treatment for your pets at the same time, so the fleas do not come right back." },
          { q: "Which areas do you treat?", a: "The areas where you are seeing fleas. We help you choose, so you only pay for what you need." },
          CONTRACT,
        ],
        description: "Tell us where you are seeing fleas so we can help you choose the right treatment areas.",
        action: { kind: "quote", label: "Claim This Coupon" },
        pests: ["fleas"],
        services: ["specialty-pest-control"],
        price: 199,
      },
      {
        id: "bee",
        name: "Bee Treatment",
        icon: "bug",
        headline: { amount: "$299", label: "Bee treatment" },
        faqs: [
          { q: "Can I remove the hive myself?", a: "We do not recommend it. Disturbing a hive can set off a lot of stings." },
          { q: "What if the bees are inside a wall?", a: "We assess where they are and how we can reach them, then explain your options and the price." },
          { q: "Why does the price depend on location?", a: "Bees in a bush are simpler than bees in a wall or roof. We confirm your price before we start." },
          SAME_DAY,
        ],
        description:
          "Tell us where you have noticed bee activity. We will assess access and explain the treatment options for that spot.",
        action: { kind: "quote", label: "Claim This Coupon" },
        pests: ["specialty-bugs"],
        services: ["specialty-pest-control"],
        price: 299,
      },
      {
        id: "yellow-jacket",
        name: "Yellow Jacket Treatment",
        icon: "bug",
        headline: { amount: "$399", label: "Yellow jackets" },
        faqs: [
          { q: "How are yellow jackets different from bees?", a: "Yellow jackets are smooth, bright black and yellow wasps. They defend their nest hard and can sting more than once." },
          { q: "Where do they nest?", a: "Often in the ground, in walls, or in shrubs. We find the nest and treat based on where it is." },
          { q: "Can I spray the nest myself?", a: "It is risky. Yellow jackets swarm out to defend the nest, and you never have to get close to it with us." },
          SAME_DAY,
        ],
        description:
          "We assess where yellow jackets are active and confirm the treatment based on where the nest is and how we can reach it.",
        action: { kind: "quote", label: "Claim This Coupon" },
        pests: ["specialty-bugs"],
        services: ["specialty-pest-control"],
        price: 399,
      },
      {
        id: "fire-ant",
        name: "Yard Fire Ant Treatment",
        icon: "ant",
        headline: { amount: "$150", label: "Per 1/2 acre" },
        faqs: [
          { q: "How is it priced?", a: "$150 per 1/2 acre. We confirm how much of your yard needs treatment before we start." },
          { q: "Why do the mounds keep coming back?", a: "The queen lives deep underground. Kicking or flooding a mound just moves the colony somewhere else." },
          { q: "Are fire ants dangerous?", a: "Their stings hurt and leave blisters, and they can be serious for anyone who is allergic." },
          CONTRACT,
        ],
        description: "We confirm the area to treat and explain the applications for your yard.",
        action: { kind: "quote", label: "Claim This Coupon" },
        pests: ["ants"],
        services: ["specialty-pest-control"],
        price: 150,
      },
      {
        id: "bat",
        name: "Bat Consultation",
        icon: "bat",
        headline: { amount: "FREE", label: "Bat consultation" },
        faqs: [
          { q: "Is the consultation really free?", a: "Yes. We come out, take a look, and tell you the next step and the price. No obligation." },
          { q: "How are bats getting in?", a: "Usually through small gaps along the roofline, in soffits, or around attic vents." },
          { q: "Can I just seal the hole?", a: "Not while bats are inside. They can get trapped, and Florida protects bats, with times of year they cannot be removed. We will explain what is allowed." },
        ],
        description:
          "Tell us where you are seeing or hearing activity. We will assess the situation and talk through the next step.",
        action: { kind: "quote", label: "Claim This Coupon" },
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
        headline: { amount: "FREE", label: "Consultation" },
        faqs: [
          { q: "What kinds of properties do you service?", a: "Offices, food service, rentals, and apartment communities across Polk County." },
          { q: "Is the consultation free?", a: "Yes. We walk your property, talk through what you are seeing, and give you a custom quote." },
          { q: "Can you work around our hours?", a: "Tell us your hours and we will talk through a schedule that works for your business." },
          { q: "Do we get a record of each visit?", a: "Yes. You get a service report after every visit." },
        ],
        description:
          "Tell us about your property and the pest activity you are seeing. We will talk through treatment and service scheduling.",
        action: { kind: "quote", label: "Claim This Coupon" },
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
  "One time prices, no monthly fees. Your exact price depends on the size of your home and what we find, and you will know it before we treat anything. No contract required.";
