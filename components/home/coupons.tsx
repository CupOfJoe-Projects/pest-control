import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/section";
import { Coupon } from "@/components/site/coupon";
import { PriceList } from "@/components/site/price-coupon";
import { CouponTabs } from "./coupon-tabs";
import { PRICE_NOTE, priceGroups } from "@/content/pricing";

/** Short tab names for the coupon categories. */
const tabLabels: Record<string, string> = {
  general: "General pests",
  mosquito: "Mosquitoes",
  rodent: "Rodents",
  specialty: "Specialty",
  commercial: "Commercial",
};

/**
 * Homepage coupons: the same clip out coupons and question dropdowns as the
 * pricing page, one category at a time. Replaces the old plan cards (owner's
 * call, November 2026: one time prices, coupon style, on the homepage).
 */
export function Coupons() {
  return (
    <section id="coupons" aria-labelledby="coupons-title" className="bg-white py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div data-reveal className="max-w-3xl">
            <p className="eyebrow text-green">Coupons</p>
            <h2
              id="coupons-title"
              className="mt-4 text-[2.25rem] leading-[1] font-extrabold text-ink md:text-[3.5rem] md:leading-[0.95]"
            >
              Clip a coupon. Pay one time.
            </h2>
            <p className="mt-5 text-lg text-muted-ink md:text-xl">
              One time prices with no monthly fees and no contract. Pick what is bugging you.
            </p>
          </div>
          <Coupon className="mx-auto w-full max-w-sm md:mr-0" />
        </div>

        <div className="mt-12">
          <CouponTabs
            tabs={priceGroups.map((g, gi) => ({
              id: g.id,
              label: tabLabels[g.id] ?? g.title,
              panel: (
                <div className="mt-2">
                  <PriceList items={g.items} offset={gi} />
                </div>
              ),
            }))}
          />
        </div>

        <p className="mt-4 max-w-3xl text-muted-ink">{PRICE_NOTE}</p>
        <p className="mt-6">
          <Link
            href="/pricing"
            className="inline-flex min-h-12 items-center gap-2 font-heading text-xl font-bold text-green underline underline-offset-4 hover:no-underline"
          >
            See every price on one page
            <ArrowRight aria-hidden="true" className="size-5" />
          </Link>
        </p>
      </Container>
    </section>
  );
}
