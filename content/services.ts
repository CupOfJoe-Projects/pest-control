import { SHOW_TERMITES } from "./site";
import type { IconName } from "@/components/icons";

export type Service = {
  slug: string;
  name: string;
  /** Short label for homepage audience cards, e.g. "For Homeowners". */
  audience?: string;
  short: string;
  description: string[];
  /** Three short bullets for cards. */
  highlights: string[];
  /** Full "what's included" list for the service page. */
  bullets: string[];
  icon: IconName;
  /** Pest slugs this service covers. */
  pests: string[];
  termite?: boolean;
};

const allServices: Service[] = [
  {
    slug: "homeowner-services",
    name: "Homeowner Services",
    audience: "For Homeowners",
    short: "Year round protection for your home, inside and out.",
    description: [
      "Florida never really gets a winter, so the bugs never really leave. Our home plan keeps them out all year with regular visits, not a one time spray and a handshake.",
      "Every visit starts with a walk around. We look at where pests get in, where they hide, and what is drawing them. Then we treat the spots that matter and tell you what we found.",
    ],
    highlights: [
      "Inside and outside treatment",
      "Regular visits that fit your schedule",
      "Pet and family safe products",
    ],
    bullets: [
      "A full inspection on the first visit",
      "Treatment inside and around the outside of your home",
      "A barrier along the foundation, doors, and windows",
      "Web and nest removal around eaves and porches",
      "Regular visits on a schedule that fits you",
      "A written service report after every visit",
    ],
    icon: "house",
    pests: ["ants", "cockroaches", "spiders", "crickets", "earwigs", "beetles", "fleas", "mice"],
  },
  {
    slug: "property-management-services",
    name: "Property Management Services",
    audience: "For Property Managers",
    short: "One call covers every unit at every property.",
    description: [
      "Managing rentals is hard enough without tenant calls about roaches. We handle routine service, move out treatments, and urgent calls across all your properties in Polk County.",
      "You get a clear report after each visit, so you always know what was done and where.",
    ],
    highlights: [
      "Routine and move out service",
      "Fast response to tenant calls",
      "Clear reports for every unit",
    ],
    bullets: [
      "Routine service for apartments, HOAs, and rentals",
      "Move in and move out treatments",
      "Fast response to tenant complaints",
      "A report for every unit we service",
      "Simple billing across multiple properties",
    ],
    icon: "building",
    pests: ["cockroaches", "bed-bugs", "ants", "rats", "mice", "fleas"],
  },
  {
    slug: "commercial-services",
    name: "Commercial Services",
    audience: "For Businesses",
    short: "Quiet, reliable service that keeps your business clean and your customers happy.",
    description: [
      "One roach in the wrong place can cost you a customer. We work with restaurants, offices, stores, and warehouses across Polk County to keep pests out of sight and out of the building.",
      "We schedule around your hours, keep records you can show an inspector, and keep our visits low key.",
    ],
    highlights: [
      "Service around your business hours",
      "Records ready for inspections",
      "Rodent monitoring and prevention",
    ],
    bullets: [
      "Service before or after business hours",
      "Service records ready for health inspections",
      "Rodent monitoring and bait stations",
      "Treatment for kitchens, storage, and loading areas",
      "One point of contact who knows your building",
    ],
    icon: "store",
    pests: ["cockroaches", "rats", "mice", "ants", "specialty-bugs"],
  },
  {
    slug: "rodent-control",
    name: "Rodent Control",
    short: "We find how rats and mice get in, then close the door on them.",
    description: [
      "Trapping a rat is the easy part. Keeping the next one out is the real job. We track down entry points, from roof lines to gaps around pipes, and seal them up.",
      "We set traps and bait stations where they do the most good and away from kids and pets, then come back to check them until the problem is gone.",
    ],
    highlights: [
      "Entry points found and sealed",
      "Traps placed away from kids and pets",
      "Follow ups until they are gone",
    ],
    bullets: [
      "Inspection of the attic, roof line, and crawl spaces",
      "Sealing of entry points",
      "Traps and tamper resistant bait stations",
      "Follow up visits until activity stops",
      "Tips to make your yard less inviting",
    ],
    icon: "rat",
    pests: ["rats", "mice"],
  },
  {
    slug: "mosquito-control",
    name: "Mosquito Control",
    short: "Take your yard back from Florida mosquitoes.",
    description: [
      "Polk County has hundreds of lakes, and every one of them helps raise mosquitoes. From the first summer rains to the end of the season, they can make a back yard useless.",
      "We treat where mosquitoes rest during the day, like shrubs, shady spots, and under decks, and we point out standing water where they breed. Regular treatments through the season keep the numbers down.",
    ],
    highlights: [
      "Treatment where mosquitoes rest",
      "Standing water check",
      "Regular visits through rainy season",
    ],
    bullets: [
      "Treatment of shrubs, shade, and resting spots",
      "A standing water check around your property",
      "Regular visits through rainy season",
      "Pet and family safe products",
    ],
    icon: "mosquito",
    pests: ["mosquitoes"],
  },
  {
    slug: "specialty-pest-control",
    name: "Specialty Pest Control",
    short: "Bed bugs, bats, gophers, and the odd stuff other companies pass on.",
    description: [
      "Some pests need more than a regular spray. Bed bugs, bats in the attic, and gophers tearing up the lawn each take their own plan.",
      "Tell us what you are seeing. If it is something odd, send a photo through our text line and we will tell you what it is and what it takes to fix.",
    ],
    highlights: [
      "Bed bug treatment",
      "Bat exclusion done right",
      "Gopher control for lawns",
    ],
    bullets: [
      "Bed bug treatment with a follow up visit",
      "Bat exclusion that follows Florida rules",
      "Gopher control for lawns and gardens",
      "Help identifying bugs you have never seen before",
    ],
    icon: "bug",
    pests: ["bed-bugs", "bats", "gophers", "beetles", "specialty-bugs"],
  },
  {
    slug: "termite-control",
    name: "Termite Control",
    short: "Inspections and treatment to protect the biggest thing you own.",
    description: [
      "Subterranean termites are active across Central Florida, and most people never see them until the damage is done. Spring swarms are often the first sign.",
      "We check your home for termite signs and weak spots. Then our bait system works day and night to wipe out the colony and stop new ones from moving in.",
      "Every year we come back to inspect, refresh the bait stations, and make sure your system is working at full strength. If termites come back, so do we, free of charge for targeted treatments.",
    ],
    highlights: ["Full property inspection", "Bait system that works 24/7", "Yearly checkups included"],
    bullets: [
      "A full termite inspection",
      "Bait stations that kill the colony and keep new ones out",
      "Yearly visits to inspect and refresh bait stations",
      "Financing available",
    ],
    icon: "termite",
    pests: ["termites"],
    termite: true,
  },
];

export const services = allServices.filter((s) => !s.termite || SHOW_TERMITES);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/** The three audience cards on the homepage, in display order. */
export const audienceServices = services.filter((s) => s.audience);

/** Smaller service links shown under the audience cards. */
export const specialtyServices = services.filter((s) => !s.audience);
