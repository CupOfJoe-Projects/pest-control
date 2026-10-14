import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";
import { SlotImage } from "@/components/site/slot-image";
import { PlanButton } from "./plan-button";
import { plans } from "@/content/plans";
import { SHOW_PRICING } from "@/content/site";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

export function Plans() {
  return (
    <Section id="plans" labelledBy="plans-title" className="bg-white">
      <SectionHeading
        id="plans-title"
        eyebrow="Plans"
        title="Pick how much help you need"
        intro="One problem or year round peace of mind. Every plan starts with a free quote."
        className="mx-auto text-center [&>p:first-child]:justify-center"
      />

      <ul className="mt-12 grid items-stretch gap-5 md:grid-cols-3 md:gap-6">
        {plans.map((plan) => (
          <li
            key={plan.id}
            data-reveal
            className={cn(
              "relative flex flex-col overflow-hidden rounded-[16px] border bg-white",
              plan.popular
                ? // Phones see the most popular plan first.
                  "order-first border-2 border-orange shadow-xl md:order-none md:-translate-y-3"
                : "border-line shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
            )}
          >
            {plan.popular && (
              <p className="bg-orange py-2 text-center text-sm font-bold tracking-wide text-ink uppercase">
                Most popular
              </p>
            )}
            {plan.id === "commercial" && (
              <SlotImage slot={images.commercial} sizes="(min-width: 768px) 33vw, 100vw" className="h-36 w-full object-cover" />
            )}
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <h3 className="text-2xl font-extrabold text-ink">{plan.name}</h3>
              <p className="mt-1 text-muted-ink">{plan.forWho}</p>
              {SHOW_PRICING && (
                // TODO(owner): Placeholder price.
                <p className="mt-5 font-heading text-3xl font-extrabold text-green">{plan.price}</p>
              )}
              <ul className="mt-5 space-y-3">
                {plan.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-ink">
                    <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <PlanButton plan={plan.id} popular={plan.popular} label={`Get a ${plan.name} quote`} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
