import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/site/page-header";
import { Section, SectionHeading } from "@/components/site/section";
import { CheckList } from "@/components/site/check-list";
import { PestGrid } from "@/components/site/pest-grid";
import { HowItWorks } from "@/components/site/how-it-works";
import { CtaBlock } from "@/components/site/cta-block";
import { QuoteSection } from "@/components/site/quote-form";
import { EstBadge } from "@/components/site/est-badge";
import { getService, services } from "@/content/services";
import { getPests } from "@/content/pests";
import { pageMetadata } from "@/lib/seo";
import { SlotImage } from "@/components/site/slot-image";
import { images, type ImageSlot } from "@/lib/images";

// Service pages with a matching photo show it instead of the icon tile.
const serviceImages: Partial<Record<string, ImageSlot>> = {
  "mosquito-control": images.yard,
  "commercial-services": images.commercial,
  "homeowner-services": images.inspection,
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    topic: service.name,
    description: `${service.short} Family owned pest control in Polk County since 1959. Call 863-533-1294.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const pests = getPests(service.pests);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Services", href: "/services" }, { label: service.name }]}
        eyebrow={service.audience ?? "Service"}
        title={service.name}
        intro={<p>{service.short}</p>}
        aside={
          <div className="relative">
            {serviceImages[service.slug]?.src ? (
              <div className="overflow-hidden rounded-[16px] shadow-lg">
                <SlotImage slot={serviceImages[service.slug]!} sizes="(min-width: 768px) 30vw, 100vw" priority className="aspect-square w-full" />
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-[16px] bg-green text-cream shadow-lg">
                <Icon name={service.icon} className="size-1/3" strokeWidth={1.25} />
              </div>
            )}
            <EstBadge className="absolute -right-4 -bottom-4 size-28" />
          </div>
        }
      />

      <Section labelledBy="included-title">
        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="included-title" title="How we handle it" />
            <div className="mt-5 space-y-4 text-lg text-ink/85">
              {service.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-line bg-white p-6 sm:p-8">
            <h3 className="text-2xl font-extrabold text-ink">What is included</h3>
            <CheckList items={service.bullets} className="mt-5" />
          </div>
        </div>
      </Section>

      {pests.length > 0 && (
        <Section labelledBy="covered-title" className="bg-cream-dark/60">
          <SectionHeading id="covered-title" title="Pests we cover" intro="Tap a pest to learn the signs and how to prevent it." />
          <PestGrid pests={pests} className="mt-8" />
        </Section>
      )}

      <HowItWorks className="bg-white" />
      <CtaBlock />
      <QuoteSection title={`Get a free quote for ${service.name.toLowerCase()}`} />
    </>
  );
}
