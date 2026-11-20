import Image from "next/image";
import { ArrowUpRight, Award, Newspaper } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Section } from "@/components/site/section";
import { CtaBlock } from "@/components/site/cta-block";
import { formatPressDate, pressItems } from "@/content/press";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  topic: "Press",
  description:
    "McDonald Exterminators in the news: the VoyageTampa Rising Stars interview and Best Pest Control Company in Bartow for 2026.",
  path: "/press",
});

export default function PressPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Press" }]}
        eyebrow="Press"
        title="McDonald Exterminators in the news"
        intro={<p>Stories and awards about our team, published by others in Central Florida.</p>}
        showCtas={false}
      />

      <Section labelledBy="press-list-title" className="bg-cream">
        <h2 id="press-list-title" className="sr-only">
          Press coverage and awards
        </h2>
        <ul className="space-y-8">
          {pressItems.map((item, i) => {
            const KindIcon = item.kind === "award" ? Award : Newspaper;
            const date = formatPressDate(item.date);
            return (
              <li key={item.id}>
                <article
                  aria-labelledby={`press-${item.id}`}
                  className="grid overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_24px_60px_-32px_rgba(20,42,29,0.35)] md:grid-cols-[minmax(0,22rem)_1fr]"
                >
                  <div
                    className={cn(
                      "relative aspect-[4/3] md:aspect-auto md:min-h-80",
                      item.image.fit === "contain" && "flex items-center justify-center bg-green-dark p-10",
                    )}
                  >
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      sizes="(min-width: 768px) 22rem, 100vw"
                      placeholder={item.image.fit === "cover" ? "blur" : "empty"}
                      priority={i === 0}
                      className={cn(
                        item.image.fit === "cover"
                          ? "absolute inset-0 size-full object-cover object-top"
                          : "h-auto w-full max-w-64",
                      )}
                    />
                  </div>
                  <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-muted-ink">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-soft px-3 py-1 text-green">
                        <KindIcon aria-hidden="true" className="size-4" />
                        {item.kind === "award" ? "Award" : "Feature"}
                      </span>
                      <span>{item.source}</span>
                      {date && (
                        <time dateTime={item.date} className="font-normal">
                          {date}
                        </time>
                      )}
                    </p>
                    <h3
                      id={`press-${item.id}`}
                      className="mt-4 text-[1.75rem] leading-tight font-extrabold text-ink md:text-[2.25rem]"
                    >
                      {item.title}
                    </h3>
                    <p className="mt-4 text-lg text-ink/80">{item.summary}</p>
                    {item.href && (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex min-h-12 items-center gap-2 self-start rounded-lg bg-green px-5 font-semibold text-cream transition hover:bg-green-dark"
                      >
                        {item.linkLabel ?? "Read the story"}
                        <ArrowUpRight aria-hidden="true" className="size-5" />
                        <span className="sr-only">(opens on {item.source})</span>
                      </a>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </Section>

      <CtaBlock text={`Local, family owned, and here since ${site.foundingYear}. Call now or ask for a free quote.`} />
    </>
  );
}
