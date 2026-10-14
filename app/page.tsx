import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { PestSection } from "@/components/home/pest-section";
import { ServicesSection } from "@/components/home/services-section";
import { StorySection } from "@/components/home/story-section";
import { AreaSection } from "@/components/home/area-section";
import { HowItWorks } from "@/components/site/how-it-works";
import { Reviews } from "@/components/site/reviews";
import { QuoteSection } from "@/components/site/quote-form";
import { JsonLd, localBusinessJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  topic: "Family Owned Pest Control Since 1959",
  description:
    "Local, family owned pest control in Polk County since 1959. Ants, roaches, rodents, mosquitoes, and more. Call 863-533-1294 for a free quote.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <Hero />
      <TrustStrip />
      <PestSection />
      <ServicesSection />
      <HowItWorks className="bg-white" />
      <Reviews />
      <StorySection />
      <AreaSection />
      <QuoteSection />
    </>
  );
}
