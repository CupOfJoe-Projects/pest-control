import { areas } from "./areas";

export type Faq = { q: string; a: string };

const towns = areas.map((a) => a.name);
const townList = `${towns.slice(0, -1).join(", ")}, and ${towns.at(-1)}`;

// Answers follow the FAQ on the old site. The one TODO below still needs the owner.
export const faqs: Faq[] = [
  {
    q: "Are your treatments safe for kids and pets?",
    a: "We use EPA approved products made for use around people and pets. Have birds, fish, or other sensitive pets? Tell us and we will pick the right treatment. For outside treatments, keep pets indoors until everything dries. Then the yard is safe to enjoy again.",
  },
  {
    q: "How fast can you come out?",
    a: "Call before 2 PM and we can come out the same day. A real person answers and gives you an actual time.",
  },
  {
    q: "Do I need to be home?",
    a: "For the first visit, yes. We look over the inside of your home, plan your treatment with you, do the first treatment, and go over your plan and price. After that, you do not need to be home for outside visits, as long as we can get to the yard and pets are inside. We always leave a service report.",
  },
  {
    q: "Do you require a contract?",
    a: "No. There is no contract required. Stay with us because the service is good, not because you signed something. We go over your plan and price with you at the first visit, so you know exactly what you are getting before we start.",
  },
  {
    q: "What if the bugs come back?",
    a: "Call us. If they come back, so do we, at no extra cost. No fine print, no hassle.",
  },
  {
    q: "Do you treat inside and outside?",
    a: "Yes. Most problems start outside, so we treat the foundation, eaves, and entry points, then handle anything that made it indoors.",
  },
  {
    q: "What areas do you serve?",
    a: `All of Polk County from our office in Bartow, including ${townList}.`,
  },
  {
    q: "How much does pest control cost?",
    a: "Quarterly pest control starts at $199 for the first service, then from $137 per quarterly visit, for homes up to 2,500 square feet. A one time treatment is $299. Monthly mosquito control starts at $149, then from $79 a month. Rodent control starts at $299, then from $45 a month. Termite inspections are free. Your exact price depends on the size of your home and what we find, and you know the price before we treat anything. No contract required. See every price on our pricing page.",
  },
  {
    q: "What if someone at home has a health concern?",
    a: "Tell us before we come. Your tech will adjust the service to fit your needs and walk the property with you to focus on problem areas.",
  },
];
