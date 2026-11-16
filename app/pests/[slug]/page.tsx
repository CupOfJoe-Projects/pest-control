import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, Search, ShieldCheck } from "lucide-react";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/site/page-header";
import { Container, Section, SectionHeading } from "@/components/site/section";
import { CheckList } from "@/components/site/check-list";
import { PestGrid } from "@/components/site/pest-grid";
import { CtaBlock } from "@/components/site/cta-block";
import { QuoteSection } from "@/components/site/quote-form";
import { ReviewStrip } from "@/components/site/review-strip";
import { getPest, pests } from "@/content/pests";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return pests.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/pests/[slug]">) {
  const { slug } = await params;
  const pest = getPest(slug);
  if (!pest) return {};
  return pageMetadata({
    topic: `${pest.singular} Control`,
    description: `${pest.short} Signs, prevention tips, and when to call. Serving Polk County since 1959.`,
    path: `/pests/${pest.slug}`,
  });
}

export default async function PestPage({ params }: PageProps<"/pests/[slug]">) {
  const { slug } = await params;
  const pest = getPest(slug);
  if (!pest) notFound();

  const relatedServices = services.filter((s) => s.pests.includes(pest.slug));
  const otherPests = pests.filter((p) => p.slug !== pest.slug).slice(0, 8);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Pests", href: "/pests" }, { label: pest.name }]}
        eyebrow="Pest library"
        title={`${pest.singular} Control in Polk County`}
        intro={<p>{pest.short}</p>}
        aside={
          <div className="flex aspect-square items-center justify-center rounded-lg bg-green-soft text-green">
            <Icon name={pest.icon} className="size-1/2" strokeWidth={1.25} />
          </div>
        }
      />

      <Section labelledBy="signs-title">
        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="signs-title" title={`Signs you have ${pest.name.toLowerCase()}`} />
            <CheckList items={pest.signs} icon={Search} className="mt-6" iconClassName="text-orange" />
          </div>
          <div>
            <SectionHeading id="florida-title" title="Why they show up in Florida" />
            <div className="mt-5 space-y-4 text-lg text-ink/85">
              {pest.florida.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <ReviewStrip match={[pest.singular, pest.name, pest.singular.replace(/^cock/i, "")]} />
      <QuoteSection defaultPest={pest.name} />

      <Section labelledBy="prevention-title" className="bg-white">
        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="prevention-title" title="Prevention tips" intro="A few simple habits go a long way." />
            <CheckList items={pest.prevention} icon={ShieldCheck} className="mt-6" />
          </div>
          <div className="self-start rounded-lg bg-green p-7 text-cream sm:p-9">
            <h2 className="text-3xl font-extrabold">When to call us</h2>
            <p className="mt-4 text-lg text-cream/90">{pest.whenToCall}</p>
            <a
              href={site.phoneHref}
              className="mt-6 inline-flex min-h-12 items-center gap-2 font-heading text-xl font-bold text-cream underline underline-offset-4 hover:no-underline"
            >
              <Phone aria-hidden="true" className="size-5" />
              {site.phone}
            </a>
          </div>
        </div>
      </Section>

      {relatedServices.length > 0 && (
        <Container className="pt-14">
          <p className="text-lg text-ink">
            <span className="font-semibold">Related services: </span>
            {relatedServices.map((s, i) => (
              <span key={s.slug}>
                {i > 0 && ", "}
                <Link href={`/services/${s.slug}`} className="font-semibold text-green underline underline-offset-4">
                  {s.name}
                </Link>
              </span>
            ))}
          </p>
        </Container>
      )}

      <CtaBlock title={`Done dealing with ${pest.name.toLowerCase()}?`} />

      <Section labelledBy="other-pests-title" className="pt-4">
        <SectionHeading id="other-pests-title" title="Other pests we handle" />
        <PestGrid pests={otherPests} className="mt-8" />
      </Section>
    </>
  );
}
