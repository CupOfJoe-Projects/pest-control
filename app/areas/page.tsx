import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Section, SectionHeading } from "@/components/site/section";
import { AreaMap } from "@/components/site/area-map";
import { CtaBlock } from "@/components/site/cta-block";
import { areas } from "@/content/areas";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  topic: "Service Areas",
  description:
    "Pest control across Polk County: Lakeland, Bartow, Winter Haven, Auburndale, Lake Wales, Haines City, and more. Family owned since 1959.",
  path: "/areas",
});

export default function AreasPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Service Areas" }]}
        eyebrow="Service areas"
        title="Serving all of Polk County"
        intro={<p>From our office in Bartow, we cover every town in the county. Here are the places we go most.</p>}
      />
      <Section labelledBy="map-title">
        <div className="grid items-start gap-10 md:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="rounded-lg border border-line bg-white p-3 sm:p-6">
            <AreaMap />
          </div>
          <div>
            <SectionHeading id="map-title" title="Pick your town" />
            <ul className="mt-6 divide-y divide-line rounded-lg border border-line bg-white">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas/${a.slug}`}
                    className="group flex min-h-14 items-center justify-between gap-4 px-5 py-3 hover:bg-green-soft"
                  >
                    <span>
                      <span className="block font-heading text-lg font-bold text-ink">{a.name}</span>
                      <span className="block text-sm text-muted-ink">{a.blurb}</span>
                    </span>
                    <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-green transition group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <CtaBlock title="Do not see your town?" text="If you are in Polk County, we can almost certainly get to you. Give us a call." />
    </>
  );
}
