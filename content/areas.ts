export type Area = {
  slug: string;
  name: string;
  /** One line used on chips, cards, and meta descriptions. */
  blurb: string;
  /** Local intro, written differently for every city. */
  intro: string[];
  /** Pest slugs we see most in this area. */
  pests: string[];
  /** [latitude, longitude] for the service area map. */
  coords: [number, number];
};

export const areas: Area[] = [
  {
    slug: "lakeland",
    name: "Lakeland",
    blurb: "Where it all started in 1959.",
    intro: [
      "McDonald Exterminators got its start in Lakeland in 1959, and we have been treating homes here ever since. From the old bungalows around Lake Morton to the newer neighborhoods off the Polk Parkway, we know these streets.",
      "Older homes near downtown tend to see roof rats and roaches in the walls. Newer builds on the edges of town get fire ants and pests pushed out by fresh construction.",
    ],
    pests: ["rats", "cockroaches", "ants", "mosquitoes"],
    coords: [28.0395, -81.9498],
  },
  {
    slug: "bartow",
    name: "Bartow",
    blurb: "Home base. Our office is right on South 1st Avenue.",
    intro: [
      "Our office sits at 360 S. 1st Ave in Bartow, so when you call from here, we are usually just a few minutes away.",
      "Bartow's big oaks and older homes are beautiful, but those limbs give rats and roaches an easy path to the roof. We do a lot of attic work and palmetto bug treatments here.",
    ],
    pests: ["rats", "cockroaches", "spiders", "ants"],
    coords: [27.8964, -81.8431],
  },
  {
    slug: "winter-haven",
    name: "Winter Haven",
    blurb: "Chain of Lakes living, minus the bugs.",
    intro: [
      "Living on the Chain of Lakes is the best part of Winter Haven. All that water also means mosquitoes, plus the spiders that feed on everything flying around.",
      "We help lakefront homeowners keep docks, lanais, and back yards usable through rainy season, and we handle the usual ants and roaches inside.",
    ],
    pests: ["mosquitoes", "spiders", "ants", "cockroaches"],
    coords: [28.0222, -81.7329],
  },
  {
    slug: "auburndale",
    name: "Auburndale",
    blurb: "Quick service in the middle of the county.",
    intro: [
      "Auburndale sits right in the middle of Polk County, and so do we. We are a short drive from Lake Ariana and the neighborhoods along Highway 92.",
      "With so many new homes going up around town, we see fire ants, rodents, and spiders pushed off cleared land and into back yards.",
    ],
    pests: ["ants", "mice", "spiders", "mosquitoes"],
    coords: [28.0653, -81.7887],
  },
  {
    slug: "cypress-gardens",
    name: "Cypress Gardens",
    blurb: "Lakeside homes, big trees, and the bugs that come with them.",
    intro: [
      "Homes around Cypress Gardens and Lake Eloise sit close to the water and under a lot of old trees. That mix brings mosquitoes, roof rats, and plenty of spiders.",
      "We set up regular service that covers the house and the yard, so you can enjoy the lake without the bugs.",
    ],
    pests: ["mosquitoes", "rats", "spiders", "ants"],
    coords: [27.9939, -81.6909],
  },
  {
    slug: "lake-wales",
    name: "Lake Wales",
    blurb: "Ridge country service from people who know it.",
    intro: [
      "Lake Wales sits up on the Lake Wales Ridge, with sandy soil, citrus groves, and some of the oldest homes in the county.",
      "Sandy soil means gophers and fire ants. Citrus means roof rats. We know the patterns here and plan around them.",
    ],
    pests: ["gophers", "ants", "rats", "cockroaches"],
    coords: [27.9014, -81.5859],
  },
  {
    slug: "fort-meade",
    name: "Fort Meade",
    blurb: "Small town service for the oldest town in Polk.",
    intro: [
      "Fort Meade is the oldest town in Polk County, and we treat it like a neighbor, not a stop on a route.",
      "Homes near the Peace River and older properties around town see their share of mosquitoes, roaches, and rodents looking for shelter.",
    ],
    pests: ["mosquitoes", "cockroaches", "rats", "mice"],
    coords: [27.7522, -81.8018],
  },
  {
    slug: "mulberry",
    name: "Mulberry",
    blurb: "From downtown to the country roads.",
    intro: [
      "Mulberry has a small town feel with plenty of open land around it. That means more run ins with the wild side of Florida, from rodents to fire ants.",
      "We help Mulberry families and businesses keep pests out of homes, barns, and shops all year.",
    ],
    pests: ["ants", "rats", "mice", "spiders"],
    coords: [27.8953, -81.9734],
  },
  {
    slug: "haines-city",
    name: "Haines City",
    blurb: "Keeping up with one of the fastest growing parts of Polk.",
    intro: [
      "Haines City is growing fast, with new neighborhoods going up along US 27. New construction stirs things up, and fire ants, roaches, and rodents go looking for new homes.",
      "Whether you just moved in or have been here for years, we can set up a plan that fits your home and your budget.",
    ],
    pests: ["ants", "cockroaches", "mice", "mosquitoes"],
    coords: [28.1142, -81.6179],
  },
  {
    slug: "babson-park",
    name: "Babson Park",
    blurb: "Quiet lakeside living with careful pest control.",
    intro: [
      "Babson Park sits on Crooked Lake along the Ridge, surrounded by groves and natural land.",
      "Out here we see more pressure from the outdoors. Roof rats come in from the groves, gophers dig through sandy lawns, and mosquitoes breed near the water. We work with that, not against it.",
    ],
    pests: ["rats", "gophers", "mosquitoes", "spiders"],
    coords: [27.832, -81.5226],
  },
  {
    slug: "medulla",
    name: "Medulla",
    blurb: "South Lakeland neighbors we have served for decades.",
    intro: [
      "Medulla, in south Lakeland, is full of established neighborhoods and mature trees. We have been treating homes here for a long time.",
      "Big oaks and lots of shade mean roaches, spiders, and rodents that like cover. Regular outside treatment keeps them from moving indoors.",
    ],
    pests: ["cockroaches", "spiders", "rats", "ants"],
    coords: [27.9667, -81.9773],
  },
  {
    slug: "eagle-lake",
    name: "Eagle Lake",
    blurb: "Small town, big lake, fast local service.",
    intro: [
      "Eagle Lake is a small town between Bartow and Winter Haven, just a short drive from our office.",
      "Living near the lake means mosquitoes and spiders outside, plus the usual ants and roaches looking for a way in. We keep it simple and get it done.",
    ],
    pests: ["mosquitoes", "spiders", "ants", "cockroaches"],
    coords: [27.9786, -81.7562],
  },
];

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}
