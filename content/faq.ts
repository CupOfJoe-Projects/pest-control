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
    a: "For the first visit, yes. We look over the inside of your home, plan your treatment with you, do the first treatment, and go over your service agreement. After that, you do not need to be home for outside visits, as long as we can get to the yard and pets are inside. We always leave a service report.",
  },
  {
    q: "Do you require a contract?",
    a: "We use a simple service agreement, and you choose how long it runs. We go over it with you at the first visit, so you know exactly what you are signing up for before we start.",
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
    a: "It depends on the size of your home and the kind of protection you need. We give you a free inspection and estimate, with no need to buy. You know the price before we treat anything.",
  },
  {
    q: "What if someone at home has a health concern?",
    a: "Tell us before we come. Your tech will adjust the service to fit your needs and walk the property with you to focus on problem areas.",
  },
];
