import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/site/page-header";
import { Section, SectionHeading } from "@/components/site/section";
import { PestGrid } from "@/components/site/pest-grid";
import { Reviews } from "@/components/site/reviews";
import { CtaBlock } from "@/components/site/cta-block";
import { AreaMap } from "@/components/site/area-map";
import { areas, getArea } from "@/content/areas";
import { getPests } from "@/content/pests";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/areas/[slug]">) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return pageMetadata({
    topic: `Pest Control in ${area.name}, FL`,
    description: `${area.blurb} Family owned pest control serving ${area.name} since 1959. Call 863-533-1294 for a free quote.`,
    path: `/areas/${area.slug}`,
  });
}

export default async function AreaPage({ params }: PageProps<"/areas/[slug]">) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();
  const localPests = getPests(area.pests);
  const nearby = areas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Service Areas", href: "/areas" }, { label: area.name }]}
        eyebrow={area.blurb}
        title={`Pest Control in ${area.name}, FL`}
        intro={
          <div className="space-y-4">
            {area.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        }
        aside={
          <div className="rounded-lg border border-line bg-white p-3">
            <AreaMap activeSlug={area.slug} />
          </div>
        }
      />

      <Section labelledBy="local-pests-title">
        <SectionHeading
          id="local-pests-title"
          title={`What we see most in ${area.name}`}
          intro="Every town has its own mix. These are the calls we get most around here."
        />
        <PestGrid pests={localPests} className="mt-8" />
      </Section>

      <Section labelledBy="area-services-title" className="bg-white">
        <SectionHeading id="area-services-title" title={`Services in ${area.name}`} />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full gap-4 rounded-lg border border-line bg-cream p-5 transition hover:border-green/40 hover:shadow-md"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-green text-cream">
                  <Icon name={s.icon} className="size-6" />
                </span>
                <span>
                  <span className="flex items-center gap-1 font-heading text-lg font-bold text-ink group-hover:underline">
                    {s.name}
                    <ArrowRight aria-hidden="true" className="size-4 text-green" />
                  </span>
                  <span className="mt-1 block text-muted-ink">{s.short}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Reviews title={`Neighbors around ${area.name} say it best`} />
      <CtaBlock title={`Need pest control in ${area.name}?`} />

      <Section labelledBy="nearby-title" className="pt-4">
        <SectionHeading id="nearby-title" title="Other towns we serve" />
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {nearby.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/areas/${a.slug}`}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-white px-4 font-semibold text-ink transition hover:border-green hover:bg-green hover:text-cream"
              >
                <MapPin aria-hidden="true" className="size-4 text-orange" />
                {a.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
