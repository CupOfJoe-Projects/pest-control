import { PageHeader } from "@/components/site/page-header";
import { Section } from "@/components/site/section";
import { ServiceCard } from "@/components/site/service-cards";
import { HowItWorks } from "@/components/site/how-it-works";
import { CtaBlock } from "@/components/site/cta-block";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  topic: "Pest Control Services",
  description:
    "Home, rental, and business pest control plus rodent, mosquito, and specialty services across Polk County. Family owned since 1959.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Services" }]}
        eyebrow="Services"
        title="Pest control services"
        intro={<p>Homes, rentals, and businesses across Polk County. One local team for all of it.</p>}
      />
      <Section labelledBy="all-services-title">
        <h2 id="all-services-title" className="sr-only">
          All services
        </h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} title={s.name} />
          ))}
        </div>
      </Section>
      <HowItWorks className="bg-white" />
      <CtaBlock />
    </>
  );
}
