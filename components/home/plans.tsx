import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/site/section";
import { PlanButton } from "./plan-button";
import { Coupon, OfferTag } from "@/components/site/coupon";
import { plans, type Plan } from "@/content/plans";
import { SHOW_PRICING } from "@/content/site";
import { cn } from "@/lib/utils";

function Price({ price, popular }: { price: Plan["price"]; popular?: boolean }) {
  if (price.text) {
    return <p className="font-heading text-[2.5rem] leading-none font-extrabold tracking-[-0.03em]">{price.text}</p>;
  }
  return (
    <p className="flex items-baseline gap-2 font-heading leading-none font-extrabold tracking-[-0.03em]">
      {price.prefix && (
        <span className={cn("font-sans text-base font-semibold tracking-normal", popular ? "text-cream/70" : "text-muted-ink")}>
          {price.prefix}
        </span>
      )}
      <span className="text-[3.5rem] tabular-nums">{price.amount}</span>
      {price.suffix && <span className={cn("text-xl", popular ? "text-cream/70" : "text-muted-ink")}>{price.suffix}</span>}
    </p>
  );
}

/** Deep green room. Two cream cards and the popular plan in darker green. */
export function Plans() {
  return (
    <section id="plans" aria-labelledby="plans-title" className="grain bg-green py-16 text-cream md:py-24">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div data-reveal className="max-w-3xl">
            <p className="eyebrow text-cream/85">Plans</p>
            <h2 id="plans-title" className="mt-4 text-[2.25rem] leading-[1] font-extrabold md:text-[3.5rem] md:leading-[0.95]">
              Pick how much help you need
            </h2>
            <p className="mt-5 text-lg text-cream/85 md:text-xl">
              One problem or year round peace of mind. Every plan starts with a free inspection, and there is no
              contract required.
            </p>
          </div>
          <Coupon tone="light" className="mx-auto w-full max-w-sm md:mr-0" />
        </div>

        <ul className="mt-12 grid items-stretch gap-5 md:grid-cols-3 md:gap-6">
          {plans.map((plan) => (
            <li
              key={plan.id}
              data-reveal
              className={cn(
                "relative flex flex-col rounded-[20px] p-6 sm:p-8",
                plan.popular
                  ? // Phones see the most popular plan first.
                    "order-first bg-green-dark text-cream shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] ring-1 ring-orange/70 md:order-none md:-translate-y-4"
                  : "bg-cream text-ink",
              )}
            >
              {plan.popular && (
                <p className="absolute -top-3.5 left-6 rounded-full bg-orange px-3 py-1 text-xs font-bold tracking-[0.12em] text-ink uppercase sm:left-8">
                  Most popular
                </p>
              )}
              <h3 className="text-2xl font-extrabold">{plan.name}</h3>
              <p className={cn("mt-1", plan.popular ? "text-cream/75" : "text-muted-ink")}>{plan.forWho}</p>
              {plan.offer && <OfferTag className="mt-4 self-start" />}
              {SHOW_PRICING && (
                <div className={cn("mt-6 border-t pt-6", plan.popular ? "border-cream/15" : "border-line")}>
                  <Price price={plan.price} popular={plan.popular} />
                  {plan.priceNote && (
                    <p className={cn("mt-2 font-semibold", plan.popular ? "text-cream/80" : "text-muted-ink")}>{plan.priceNote}</p>
                  )}
                </div>
              )}
              <ul className="mt-6 space-y-3">
                {plan.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check aria-hidden="true" className={cn("mt-1 size-5 shrink-0", plan.popular ? "text-orange" : "text-green")} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <PlanButton plan={plan.id} popular={plan.popular} label={`Get a ${plan.name} quote`} />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center">
          <Link
            href="/pricing"
            className="inline-flex min-h-12 items-center gap-2 font-heading text-xl font-bold text-cream underline underline-offset-4 hover:no-underline"
          >
            See prices for mosquitoes, rodents, termites, and more
            <ArrowRight aria-hidden="true" className="size-5" />
          </Link>
        </p>
      </Container>
    </section>
  );
}
