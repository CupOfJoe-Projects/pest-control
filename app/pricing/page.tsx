import { PageHeader } from "@/components/site/page-header";
import { Container } from "@/components/site/section";
import { Coupon } from "@/components/site/coupon";
import { PriceList } from "@/components/site/price-coupon";
import { QuoteSection } from "@/components/site/quote-form";
import { CtaBlock } from "@/components/site/cta-block";
import { PRICE_NOTE, priceGroups } from "@/content/pricing";
import { site } from "@/content/site";
import { JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  topic: "Pest Control Prices",
  description:
    "Pest control prices in Polk County: one time prices with no monthly fees. Pest control from $199, mosquito yard treatment from $149, rodent control, free termite inspections, and more. No contract required.",
  path: "/pricing",
});

/** Prices as structured data, so search engines and AI answers can quote them. */
function pricingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${site.name} pest control prices`,
    url: `${site.url}/pricing`,
    itemListElement: priceGroups.map((group) => ({
      "@type": "OfferCatalog",
      name: group.title,
      itemListElement: group.items.map((item) => ({
        "@type": "Offer",
        name: item.name,
        description: [
          [item.headline.prefix, item.headline.amount, item.headline.label.toLowerCase()].filter(Boolean).join(" "),
          item.qualifier,
        ]
          .filter(Boolean)
          .join(". "),
        // Free inspections and consultations are priced at 0.
        price: item.price ?? 0,
        priceCurrency: "USD",
        itemOffered: {
          "@type": "Service",
          name: item.name,
          description: item.description,
          areaServed: site.region,
          provider: { "@id": `${site.url}/#business` },
        },
      })),
    })),
  };
}

/** The coupon questions as FAQ structured data. Shared questions appear once. */
function pricingFaqJsonLd() {
  const seen = new Set<string>();
  const faqs = priceGroups
    .flatMap((g) => g.items.flatMap((i) => i.faqs))
    .filter((f) => !seen.has(f.q) && seen.add(f.q));
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pricingJsonLd()} />
      <JsonLd data={pricingFaqJsonLd()} />
      <PageHeader
        crumbs={[{ label: "Pricing" }]}
        eyebrow="Pricing"
        title="Clip a coupon. Pay one time."
        intro={
          <p>
            One time prices for every service we offer in Polk County. No monthly fees, no contract, and you always
            know the price before we treat anything.
          </p>
        }
        aside={<Coupon size="sm" />}
      />

      <Container className="pt-8">
        <nav aria-label="Price categories">
          <ul className="flex flex-wrap gap-2.5">
            {priceGroups.map((g) => (
              <li key={g.id}>
                <a
                  href={`#${g.id}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 font-semibold text-ink transition hover:border-green hover:bg-green hover:text-cream"
                >
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      {priceGroups.map((group, gi) => (
        <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="scroll-mt-24 pt-14">
          <Container>
            <h2 id={`${group.id}-title`} className="text-[2.25rem] leading-[1] font-extrabold text-ink md:text-[3rem]">
              {group.title}
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-muted-ink">{group.intro}</p>
            <div className="mt-2">
              <PriceList items={group.items} offset={gi} />
            </div>
          </Container>
        </section>
      ))}

      <Container className="py-10">
        <p className="max-w-3xl text-muted-ink">{PRICE_NOTE}</p>
      </Container>

      <QuoteSection />
      <CtaBlock />
    </>
  );
}
