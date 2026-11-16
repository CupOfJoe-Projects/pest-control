import { Hero } from "@/components/home/hero";
import { QuoteBar } from "@/components/home/quote-bar";
import { ProblemPicker } from "@/components/home/problem-picker";
import { Plans } from "@/components/home/plans";
import { Guarantee } from "@/components/home/guarantee";
import { Comparison } from "@/components/home/comparison";
import { StorySection } from "@/components/home/story-section";
import { AreaSection } from "@/components/home/area-section";
import { FinalCta } from "@/components/home/final-cta";
import { TrustWall } from "@/components/site/trust-wall";
import { TeamSection } from "@/components/site/team-section";
import { HowItWorks } from "@/components/site/how-it-works";
import { Faq } from "@/components/site/faq";
import { JsonLd, localBusinessJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  topic: "Family Owned Pest Control Since 1959",
  description:
    "Local, family owned pest control in Polk County since 1959. Ants, roaches, rodents, mosquitoes, and more. Call 863-533-1294 for a free quote.",
  path: "/",
});

// Rooms: cream hero, white trust wall, cream pests, green plans, cream guarantee,
// white comparison, cream how it works, green story, white FAQ, cream area, orange CTA.
const belowFold = [
  { key: "pests", Section: ProblemPicker },
  { key: "plans", Section: Plans },
  { key: "guarantee", Section: Guarantee },
  { key: "comparison", Section: Comparison },
  { key: "how", Section: () => <HowItWorks className="grain bg-cream" /> },
  { key: "story", Section: StorySection },
  { key: "faq", Section: () => <Faq className="bg-white" /> },
  { key: "areas", Section: AreaSection },
  { key: "cta", Section: FinalCta },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <Hero />
      <QuoteBar />
      {/* Extra top padding makes room for the quote bar that overlaps this section. */}
      <TrustWall className="pt-28 md:pt-36" />
      <TeamSection className="bg-cream-dark/60" />
      {belowFold.map(({ key, Section }) => (
        <Section key={key} />
      ))}
    </>
  );
}
