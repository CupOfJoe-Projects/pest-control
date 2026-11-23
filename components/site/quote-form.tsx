import { Check } from "lucide-react";
import { Section, SectionHeading } from "./section";
import { QuoteFormClient } from "./quote-form-client";
import { Coupon } from "./coupon";
import { pests } from "@/content/pests";
import { OFFER, SHOW_OFFER, site } from "@/content/site";

export const pestOptions = [
  ...pests.map((p) => ({ value: p.name, label: p.name })),
  { value: "Not sure", label: "Not sure" },
];

const promises = [
  "No pressure, no obligation",
  "No contract required",
  "Local techs, not a call center",
  "Honest prices, explained up front",
];

const defaultTitle = SHOW_OFFER ? `Get a free quote + ${OFFER.headline}` : "Get your free quote";

/**
 * The quote form section. Used on the contact page and on every pest, service,
 * and area page, so people landing from Google never have to click away to ask
 * for a quote. `defaultPest` preselects the pest (a pest name from content/pests).
 */
export function QuoteSection({ defaultPest, title = defaultTitle }: { defaultPest?: string; title?: string }) {
  return (
    <Section id="quote" labelledBy="quote-title" className="bg-cream-dark/60">
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            id="quote-title"
            eyebrow="Free quote"
            title={title}
            intro="Tell us a little about the problem. A real person from our office will call you back."
          />
          <ul className="mt-6 space-y-3">
            {promises.map((p) => (
              <li key={p} className="flex gap-2.5 text-lg text-ink">
                <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-green" />
                {p}
              </li>
            ))}
          </ul>
          <Coupon size="sm" className="mt-8 max-w-xs" />
        </div>
        <div className="relative rounded-lg border border-line bg-white p-5 shadow-lg sm:p-8">
          <QuoteFormClient
            pestOptions={pestOptions}
            defaultPest={defaultPest}
            phone={site.phone}
            phoneHref={site.phoneHref}
          />
        </div>
      </div>
    </Section>
  );
}
