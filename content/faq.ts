import { areas } from "./areas";

export type Faq = { q: string; a: string };

const towns = areas.map((a) => a.name);
const townList = `${towns.slice(0, -1).join(", ")}, and ${towns.at(-1)}`;

// TODO(owner): Confirm every answer marked below before launch.
export const faqs: Faq[] = [
  {
    q: "Are your treatments safe for kids and pets?",
    // TODO(owner): Confirm product practices and dry time guidance.
    a: "Yes, when used the way we use them. We pick products labeled for homes, apply them where pests live instead of where you live, and tell you how long to keep kids and pets off treated areas. Usually that just means until it dries.",
  },
  {
    q: "How fast can you come out?",
    // TODO(owner): Confirm typical response time.
    a: "Often the same day or the next one, depending on the schedule. Call us and a real person will give you an actual time, not a window that runs all day.",
  },
  {
    q: "Do I need to be home?",
    // TODO(owner): Confirm policy for outside only visits.
    a: "For inside treatments, yes, or someone over 18 who can let us in. Outside visits can usually happen while you are at work. We will let you know when we are done.",
  },
  {
    q: "Do you require a contract?",
    // TODO(owner): Confirm contract terms.
    a: "You can book a one time treatment with no ongoing plan. If you want year round protection, we will walk you through the quarterly plan on the phone so you know exactly what you are signing up for.",
  },
  {
    q: "What if the bugs come back?",
    // TODO(owner): Confirm guarantee wording.
    a: "Call us. If pests come back between scheduled visits, we come back too, at no charge.",
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
    a: "It depends on the pest and the size of your property. Quotes are free and take a couple of minutes on the phone. We tell you the price up front, before we treat anything.",
  },
];
