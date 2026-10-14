import { Check } from "lucide-react";
import { Container } from "@/components/site/section";
import { SlotImage } from "@/components/site/slot-image";
import { QuoteFormClient } from "@/components/site/quote-form-client";
import { pestOptions } from "@/components/site/quote-form";
import { OFFER, SHOW_OFFER, site } from "@/content/site";
import { images } from "@/lib/images";

const promises = ["No pressure, no obligation", "Local techs, not a call center", "Honest prices, explained up front"];

/** Full bleed closing band with the full quote form. */
export function FinalCta() {
  return (
    <section id="quote" aria-labelledby="quote-title" className="relative isolate overflow-hidden py-16 md:py-24">
      <SlotImage slot={images.yard} fill sizes="100vw" className="-z-20" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-green-dark/85" />
      <Container className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div data-reveal className="text-cream">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange" />
            Free quote
          </p>
          <h2 id="quote-title" className="text-4xl leading-[1.05] font-extrabold sm:text-5xl">
            Ready when you are.
          </h2>
          <p className="mt-4 text-lg text-cream/85">
            Tell us what is going on. A real person from our Bartow office calls you back.
          </p>
          <ul className="mt-6 space-y-3">
            {promises.map((p) => (
              <li key={p} className="flex gap-2.5 text-lg">
                <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-orange" />
                {p}
              </li>
            ))}
          </ul>
          {SHOW_OFFER && (
            <p className="mt-6 inline-block rounded-[16px] border-2 border-dashed border-orange px-4 py-3 font-semibold">
              New customers get {OFFER.headline}.
            </p>
          )}
        </div>
        <div className="rounded-[16px] bg-white p-5 shadow-2xl sm:p-8">
          <QuoteFormClient
            pestOptions={pestOptions}
            phone={site.phone}
            phoneHref={site.phoneHref}
            textUrl={site.textUrl}
            showPlan
          />
        </div>
      </Container>
    </section>
  );
}
