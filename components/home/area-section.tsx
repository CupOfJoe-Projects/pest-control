import Link from "next/link";
import { Section, SectionHeading } from "@/components/site/section";
import { AreaMap } from "@/components/site/area-map";
import { areas } from "@/content/areas";
import { site } from "@/content/site";

export function AreaSection() {
  return (
    <Section id="areas" labelledBy="areas-title" className="bg-white">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div data-reveal>
          <SectionHeading
            id="areas-title"
            eyebrow="Service area"
            title="All of Polk County, from our office in Bartow"
            intro="We live and work here. If you are in Polk County, we can get to you."
          />
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/areas/${a.slug}`}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-white px-4 text-[0.95rem] font-semibold text-ink transition hover:border-green hover:bg-green hover:text-cream"
                >
                  <span aria-hidden="true" className="size-2 rounded-full bg-orange" />
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-muted-ink">
            Do not see your town? Call{" "}
            <a href={site.phoneHref} className="font-semibold whitespace-nowrap text-green underline underline-offset-4">
              {site.phone}
            </a>{" "}
            and ask.
          </p>
        </div>
        <div data-reveal className="rounded-[16px] border border-line bg-cream p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-6">
          <AreaMap />
        </div>
      </div>
    </Section>
  );
}
