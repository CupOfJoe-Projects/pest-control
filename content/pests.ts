import { SHOW_TERMITES } from "./site";
import type { IconName } from "@/components/icons";

export type Pest = {
  slug: string;
  /** Plural display name, e.g. "Ants". */
  name: string;
  /** Used in the page title, e.g. "Ant Control in Polk County". */
  singular: string;
  short: string;
  signs: string[];
  /** Why they show up in Florida. */
  florida: string[];
  prevention: string[];
  whenToCall: string;
  icon: IconName;
  /** Shown in the homepage grid of common pests. */
  common?: boolean;
  termite?: boolean;
};

const allPests: Pest[] = [
  {
    slug: "ants",
    name: "Ants",
    singular: "Ant",
    short: "Fire ants in the yard, sugar ants in the kitchen. We handle both.",
    signs: [
      "Trails of ants along counters, baseboards, or windowsills",
      "Dirt mounds in the lawn, often right after a rain",
      "Painful stings when you step near a mound",
      "Small piles of debris near wood or gaps in walls",
    ],
    florida: [
      "Florida has more kinds of ants than almost anywhere in the country, and our warm, wet weather keeps colonies busy all year.",
      "After heavy rain, ants move indoors looking for dry ground and food. Fire ant mounds pop up overnight in lawns, ball fields, and along driveways.",
    ],
    prevention: [
      "Wipe up crumbs and sticky spills right away",
      "Keep pet food sealed and bowls clean",
      "Trim plants and branches so they do not touch the house",
      "Seal cracks around windows, doors, and pipes",
      "Do not kick or flood fire ant mounds. It just spreads them out",
    ],
    whenToCall:
      "If you still see trails after a week of cleaning up, or fire ants are near where kids and pets play, give us a call. Store bought sprays often split one colony into several.",
    icon: "ant",
    common: true,
  },
  {
    slug: "cockroaches",
    name: "Cockroaches",
    singular: "Cockroach",
    short: "Big palmetto bugs or small German roaches. We know how to handle both.",
    signs: [
      "Roaches running when you flip on the lights",
      "Droppings that look like pepper or coffee grounds",
      "Egg cases behind appliances or in cabinets",
      "A strong, oily smell in heavy cases",
    ],
    florida: [
      "The big ones Floridians call palmetto bugs are usually American or smokybrown cockroaches. They live outside in mulch, trees, and drains, and they wander in when it rains or gets hot.",
      "German cockroaches are the small ones that live indoors, mostly in kitchens and bathrooms. They breed fast, so a few can turn into hundreds in a matter of weeks.",
    ],
    prevention: [
      "Fix leaky faucets and pipes. Roaches need water",
      "Keep mulch and leaves pulled back from the house",
      "Seal gaps under doors and around plumbing",
      "Do not leave dishes or pet food out overnight",
      "Take out trash and recycling often",
    ],
    whenToCall:
      "One palmetto bug after a storm is Florida life. Small roaches in the kitchen during the day is not. That usually means a big population is hiding, so call us.",
    icon: "cockroach",
    common: true,
  },
  {
    slug: "mosquitoes",
    name: "Mosquitoes",
    singular: "Mosquito",
    short: "Polk County lakes mean mosquitoes. We help you take back the yard.",
    signs: [
      "Bites within minutes of stepping outside",
      "Swarms near shady shrubs or under decks",
      "Standing water in pots, gutters, or toys",
      "Larvae wiggling in birdbaths or buckets",
    ],
    florida: [
      "Florida has around 80 kinds of mosquitoes, and Polk County has hundreds of lakes. Rainy season, roughly June through September, sends their numbers through the roof.",
      "Some types, like the Asian tiger mosquito, can breed in a bottle cap of water and bite all day long, not just at dusk.",
    ],
    prevention: [
      "Dump standing water every week, even small amounts",
      "Clean gutters so they drain",
      "Change birdbath and pet water often",
      "Repair torn window and door screens",
    ],
    whenToCall:
      "If you cannot use your yard without getting eaten alive, regular treatment through the season makes a real difference.",
    icon: "mosquito",
    common: true,
  },
  {
    slug: "spiders",
    name: "Spiders",
    singular: "Spider",
    short: "Webs on the eaves and widows in the shed. We clear them out.",
    signs: [
      "Webs around eaves, porches, and window corners",
      "Spiders in garages, closets, or sheds",
      "Egg sacs in corners and under furniture",
      "Lots of other bugs around, which is what spiders eat",
    ],
    florida: [
      "Most Florida spiders are harmless and even helpful. But black widows and brown widows hide in sheds, garages, and outdoor furniture, and their bites need medical care.",
      "Spiders go where the food is. A house with lots of insects around it will have lots of spiders too.",
    ],
    prevention: [
      "Knock down webs often with a broom",
      "Shake out shoes, gloves, and stored clothes",
      "Cut down on clutter in the garage and shed",
      "Use yellow outdoor bulbs to draw fewer insects",
    ],
    whenToCall:
      "If you find widows near where kids play, or the webs come back as fast as you sweep them, call us. Treating the bugs they feed on is part of the plan.",
    icon: "spider",
    common: true,
  },
  {
    slug: "rats",
    name: "Rats",
    singular: "Rat",
    short: "Roof rats in the attic or Norway rats under the house. We get them out and keep them out.",
    signs: [
      "Scratching or running sounds in the attic at night",
      "Droppings about the size of a raisin",
      "Gnaw marks on wood, wires, or fruit",
      "Greasy rub marks along walls and beams",
    ],
    florida: [
      "Roof rats are the most common rat in Central Florida. They love citrus trees, palm trees, and the attic space right above them.",
      "Palm fronds and overhanging branches give them a highway straight onto your roof.",
    ],
    prevention: [
      "Trim tree limbs at least six feet from the roof",
      "Pick up fallen fruit under citrus trees",
      "Keep garbage in cans with tight lids",
      "Screen vents and seal gaps around utility lines",
    ],
    whenToCall:
      "Rats chew wiring, which is a real fire risk. Call at the first sign. We trap, seal the entry points, and check back until they are gone.",
    icon: "rat",
    common: true,
  },
  {
    slug: "mice",
    name: "Mice",
    singular: "Mouse",
    short: "Small, fast, and sneaky. We find where they get in and close it up.",
    signs: [
      "Tiny droppings in drawers, cabinets, or the pantry",
      "Chewed food packages",
      "Scratching sounds in the walls at night",
      "Shredded paper or fabric used for nests",
    ],
    florida: [
      "House mice can squeeze through a gap the size of a dime. When land gets cleared for new building around Polk County, or a cold front rolls through, they look for shelter indoors.",
      "Once inside, a pair of mice can become a whole family in a couple of months.",
    ],
    prevention: [
      "Seal any gap the size of a dime or bigger",
      "Store food in hard containers",
      "Keep the garage and storage areas tidy",
      "Trim shrubs back from the house",
    ],
    whenToCall:
      "If you see droppings or hear them in the walls, call us. Mice chew wires and get into food, and a few traps rarely catch them all.",
    icon: "mouse",
    common: true,
  },
  {
    slug: "bed-bugs",
    name: "Bed Bugs",
    singular: "Bed Bug",
    short: "Itchy bites and tiny spots on the sheets. We get rid of bed bugs for good.",
    signs: [
      "Itchy bites in a line or cluster, often on arms and legs",
      "Small rusty or dark spots on sheets and mattress seams",
      "Tiny shed skins near the bed or couch",
      "A sweet, musty smell in heavy cases",
    ],
    florida: [
      "Bed bugs do not care about the weather. They travel. Polk County sits right between Tampa and Orlando, with lots of hotels, rentals, and visitors passing through.",
      "They ride home in luggage, used furniture, and even backpacks, then hide in seams and cracks close to where people sleep.",
    ],
    prevention: [
      "Check hotel beds and keep luggage off the floor",
      "Wash and dry travel clothes on high heat when you get home",
      "Inspect used furniture before bringing it inside",
      "Use a mattress cover if you have had them before",
    ],
    whenToCall:
      "Right away. Bed bugs spread fast, and over the counter foggers usually just scatter them. A professional treatment with a follow up visit is the surest way to get them all.",
    icon: "bedbug",
    common: true,
  },
  {
    slug: "fleas",
    name: "Fleas",
    singular: "Flea",
    short: "Fleas on the dog, fleas in the carpet. We treat the house and the yard.",
    signs: [
      "Pets scratching or chewing at their fur",
      "Small itchy bites around your ankles",
      "Tiny black specks in pet bedding",
      "Fleas jumping on carpet or furniture",
    ],
    florida: [
      "Fleas love heat and humidity, so flea season in Florida basically never ends.",
      "Most of a flea problem is not on your pet. Eggs and larvae live in carpet, bedding, and shady spots in the yard where pets like to lie down.",
    ],
    prevention: [
      "Keep pets on a flea preventive from your vet",
      "Vacuum often and empty the vacuum outside",
      "Wash pet bedding every week in hot water",
      "Keep the lawn mowed, especially shady areas",
    ],
    whenToCall:
      "If fleas keep coming back even with pet treatments, the home and yard need treatment too. We time it with your vet care to break the cycle.",
    icon: "flea",
    common: true,
  },
  {
    slug: "termites",
    name: "Termites",
    singular: "Termite",
    short: "Swarmers in spring and mud tubes on the foundation. Do not wait on termites.",
    signs: [
      "Swarms of winged insects in spring, often after rain",
      "Piles of shed wings near windows or doors",
      "Mud tubes on the foundation or walls",
      "Wood that sounds hollow when you tap it",
    ],
    florida: [
      "Florida has some of the highest termite activity in the country. Subterranean termites live in the soil and travel through mud tubes to reach the wood in your home.",
      "Swarm season usually runs from late winter into spring. Seeing swarmers inside is a sign a colony may be close.",
    ],
    prevention: [
      "Keep mulch and soil away from wood siding",
      "Fix leaks and moisture problems quickly",
      "Store firewood away from the house",
      "Get a yearly inspection",
    ],
    whenToCall:
      "Call as soon as you see swarmers or mud tubes. Termite damage is usually not covered by homeowners insurance.",
    icon: "termite",
    termite: true,
  },
  {
    slug: "bats",
    name: "Bats",
    singular: "Bat",
    short: "Bats in the attic have to come out the right way, and Florida law says when.",
    signs: [
      "Dark droppings piled below a roof line or vent",
      "Scratching or squeaking in the attic around dusk",
      "Brown stains around small gaps in soffits or siding",
      "Bats flying out from the roof at sunset",
    ],
    florida: [
      "Florida has more than a dozen native bat species, and they eat a huge number of mosquitoes. That is good news, right up until they move into your attic.",
      "Bats are protected in Florida. Exclusion is not allowed during maternity season, April 15 through August 14, so pups are not trapped inside. Planning ahead matters.",
    ],
    prevention: [
      "Check soffits, vents, and roof lines for gaps",
      "Cap chimneys and screen attic vents",
      "Fix loose flashing and damaged fascia boards",
      "Never try to catch or handle a bat yourself",
    ],
    whenToCall:
      "Call us as soon as you notice bats or droppings. We inspect, plan the exclusion around the legal season, and seal the house once they are out so they cannot get back in.",
    icon: "bat",
  },
  {
    slug: "beetles",
    name: "Beetles",
    singular: "Beetle",
    short: "From carpet beetles in the closet to grain beetles in the pantry.",
    signs: [
      "Small beetles near windows or light fixtures",
      "Holes in wool, rugs, or stored clothes",
      "Tiny beetles in flour, cereal, or pet food",
      "Larvae or shed skins in dark corners",
    ],
    florida: [
      "Humid weather suits a lot of beetles. Some come in from the yard, drawn by porch lights, while others hatch right in the pantry or closet.",
      "Stored food and natural fabrics are their favorite targets, and they can go unnoticed for weeks.",
    ],
    prevention: [
      "Store dry food in sealed glass or plastic containers",
      "Vacuum rugs, closets, and under furniture often",
      "Switch porch lights to yellow bulbs",
      "Clear out old pantry items before buying new ones",
    ],
    whenToCall:
      "If you have tossed the infested food and still see beetles, or you find damage to clothes or rugs, call us to track down the source.",
    icon: "beetle",
  },
  {
    slug: "crickets",
    name: "Crickets",
    singular: "Cricket",
    short: "Chirping all night? We quiet things down.",
    signs: [
      "Chirping at night inside walls or the garage",
      "Crickets near doors, windows, or in the laundry room",
      "Chewed fabric, paper, or cardboard boxes",
      "Camel crickets in damp garages or crawl spaces",
    ],
    florida: [
      "Crickets love warm, damp places. When summer storms flood the yard or a dry spell hits, they head for the shelter of your garage and home.",
      "Bright outdoor lights pull them in at night, and gaps under doors let them right inside.",
    ],
    prevention: [
      "Install door sweeps on outside and garage doors",
      "Switch outdoor lights to yellow bulbs",
      "Keep grass short and mulch thin near the foundation",
      "Run a dehumidifier in damp spaces",
    ],
    whenToCall:
      "If they are getting in faster than you can catch them, our outside treatment stops them before they reach the door.",
    icon: "cricket",
  },
  {
    slug: "earwigs",
    name: "Earwigs",
    singular: "Earwig",
    short: "Creepy pincers, mostly harmless, and not welcome inside.",
    signs: [
      "Dark brown insects with pincers on the back end",
      "Bugs under mats, pots, or wet mulch",
      "Ragged holes in garden leaves and flowers",
      "Earwigs in bathrooms or kitchens after rain",
    ],
    florida: [
      "Earwigs need moisture to survive, and Florida gives them plenty. Rainy season sends them into homes looking for damp places to hide.",
      "Despite the old tale, they do not crawl into ears. They are more nuisance than danger, but they can show up in big numbers.",
    ],
    prevention: [
      "Keep mulch a few inches away from the foundation",
      "Fix leaky outdoor faucets and drain lines",
      "Move pots, boards, and debris away from the house",
      "Seal gaps around doors and windows",
    ],
    whenToCall:
      "If you find them inside every day, there is likely a moisture problem near the house. We can find it and treat the area.",
    icon: "earwig",
  },
  {
    slug: "gophers",
    name: "Gophers",
    singular: "Gopher",
    short: "Mounds in the lawn and plants pulled under. We stop the digging.",
    signs: [
      "Fresh mounds of sandy soil in the lawn",
      "Plants wilting or disappearing from below",
      "Tunnels that cave in when you walk on them",
      "Damage to irrigation lines or roots",
    ],
    florida: [
      "Here the digger is usually the southeastern pocket gopher, which old timers call a salamander. Our sandy soil makes tunneling easy, and one gopher can push up dozens of mounds.",
      "Gopher tortoises are a different animal. They are protected by state law and should never be disturbed. We can help you tell the difference.",
    ],
    prevention: [
      "Use wire baskets when planting trees and shrubs",
      "Rake out old mounds so you can spot new activity",
      "Watch for new mounds and act early",
    ],
    whenToCall:
      "Once you see fresh mounds every few days, it is time. Early control saves your lawn and your irrigation lines.",
    icon: "gopher",
  },
  {
    slug: "specialty-bugs",
    name: "Specialty Bugs",
    singular: "Specialty Bug",
    short: "Silverfish, millipedes, and the bugs you cannot name. We will figure it out.",
    signs: [
      "Bugs you do not recognize showing up in numbers",
      "Silverfish in bathrooms, closets, or old books",
      "Millipedes or centipedes in the garage after rain",
      "Damage you cannot explain",
    ],
    florida: [
      "Florida is home to thousands of insect species, and new ones arrive all the time through ports and plant nurseries.",
      "If a bug is new to you, it is probably not new to us. We have seen a lot since 1959.",
    ],
    prevention: [
      "Cut down moisture with fans and dehumidifiers",
      "Keep firewood, boards, and debris away from the house",
      "Seal cracks in the foundation and around pipes",
    ],
    whenToCall:
      "Snap a photo and send it through our text line. We will tell you what it is and whether it needs treatment.",
    icon: "bug",
  },
];

export const pests = allPests.filter((p) => !p.termite || SHOW_TERMITES);

export const commonPests = pests.filter((p) => p.common);

export function getPest(slug: string) {
  return pests.find((p) => p.slug === slug);
}

/** Resolve pest slugs to pests, dropping any that are hidden by a flag. */
export function getPests(slugs: string[]) {
  return slugs.map(getPest).filter((p): p is Pest => Boolean(p));
}
