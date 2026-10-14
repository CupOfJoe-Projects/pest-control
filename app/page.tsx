import { Hero } from "@/components/home/hero";
import { ProblemPicker } from "@/components/home/problem-picker";
import { Plans } from "@/components/home/plans";
import { Guarantee } from "@/components/home/guarantee";
import { Comparison } from "@/components/home/comparison";
import { StorySection } from "@/components/home/story-section";
import { AreaSection } from "@/components/home/area-section";
import { FinalCta } from "@/components/home/final-cta";
import { TrustWall } from "@/components/site/trust-wall";
import { HowItWorks } from "@/components/site/how-it-works";
import { Faq } from "@/components/site/faq";
import { JsonLd, localBusinessJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  topic: "Family Owned Pest Control Since 1959",
  description:
    "Local, family owned pest control in Polk County since 1959. Ants, roaches, rodents, mosquitoes, and more. Call 863-533-1294 for a free quote.",
  path: "/",
});

// Section rhythm: photo, white, cream, white, photo, green, cream, white, cream, white, photo.
export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <Hero />
      <TrustWall />
      {[ProblemPicker, Plans, Guarantee, Comparison, HowItWorks, StorySection, Faq, AreaSection, FinalCta].map((Section) => (
        <div key={Section.name} className="below-fold">
          <Section />
        </div>
      ))}
    </>
  );
}
