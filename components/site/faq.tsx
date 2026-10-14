import { Section, SectionHeading } from "./section";
import { faqs } from "@/content/faq";
import { JsonLd } from "@/lib/seo";

/** Accordion built on <details>, so it works without JavaScript. */
export function Faq({ className }: { className?: string }) {
  return (
    <Section id="faq" labelledBy="faq-title" className={className}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div data-reveal>
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Straight answers" intro="Still wondering about something? Call us. We like questions." />
        </div>
        <div data-reveal className="divide-y divide-line rounded-[16px] border border-line bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-heading text-lg font-bold text-ink sm:px-6 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-sans text-2xl leading-none font-light text-green transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-ink/80 sm:px-6">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
