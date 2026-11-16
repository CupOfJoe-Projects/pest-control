import { Phone } from "lucide-react";
import { Icon } from "@/components/icons";
import { EstBadge } from "./est-badge";
import { PriceActionButton } from "./price-action";
import { Container } from "./section";
import { PRICE_NOTE, type PriceItem } from "@/content/pricing";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Cut out price coupon, after the Berrett Pest Control layout the owner asked
 * for: a solid card with a dashed cut line, the price big in the middle, and
 * the pest faintly behind it. Alternates green and orange down a list.
 */
export function PriceCoupon({ item, tone = "green" }: { item: PriceItem; tone?: "green" | "orange" }) {
  const green = tone === "green";
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[14px] px-6 pt-5 pb-7 text-center shadow-[0_18px_40px_-20px_rgba(20,42,29,0.55)]",
        green ? "bg-green-dark text-cream" : "bg-orange text-ink",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-2 rounded-[10px] border-[3px] border-dashed",
          green ? "border-cream/60" : "border-ink/45",
        )}
      />
      <Icon
        name={item.icon}
        strokeWidth={1}
        className={cn("pointer-events-none absolute top-1/2 left-1/2 size-40 -translate-1/2", green ? "opacity-[0.09]" : "opacity-[0.12]")}
      />
      <div className="relative">
        <EstBadge decorative className="mx-auto size-12" />
        <p className="mt-2 font-heading leading-none font-extrabold tracking-[-0.03em]">
          {item.headline.prefix && <span className="mr-1.5 align-top text-lg font-bold tracking-normal">{item.headline.prefix}</span>}
          <span className="text-[3.25rem] tabular-nums">{item.headline.amount}</span>
        </p>
        <p className="mt-1 font-heading text-xl font-bold">{item.headline.label}</p>
        {item.ongoing && (
          <>
            <span aria-hidden="true" className={cn("mx-auto mt-3 block h-0.5 w-24", green ? "bg-cream/40" : "bg-ink/30")} />
            <p className="mt-3 font-semibold">{item.ongoing}</p>
          </>
        )}
      </div>
    </div>
  );
}

/** One priced service: coupon and button on the left, the details on the right. */
export function PriceRow({ item, tone }: { item: PriceItem; tone: "green" | "orange" }) {
  return (
    <article
      aria-labelledby={`price-${item.id}`}
      className="grid gap-6 border-t border-line py-10 first:border-t-0 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-12"
    >
      <div>
        <PriceCoupon item={item} tone={tone} />
        <PriceActionButton action={item.action} service={item.name} className="mt-4" />
      </div>
      <div className="md:pt-2">
        <h3 id={`price-${item.id}`} className="text-[1.75rem] leading-tight font-extrabold text-ink md:text-[2.25rem]">
          {item.name}
        </h3>
        <p className="mt-3 text-lg text-ink/85">{item.description}</p>
        {item.qualifier && <p className="mt-3 text-muted-ink">{item.qualifier}</p>}
      </div>
    </article>
  );
}

/** Coupons for one pest or service page. Renders nothing when that page has no prices. */
export function PriceSection({ items, title = "Pricing" }: { items: PriceItem[]; title?: string }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="pricing-title" className="py-12 sm:py-16">
      <Container>
        <p className="eyebrow text-green">Coupons</p>
        <h2 id="pricing-title" className="mt-3 text-[2.25rem] leading-[1] font-extrabold text-ink md:text-[3rem]">
          {title}
        </h2>
        <div className="mt-4">
          {items.map((item, i) => (
            <PriceRow key={item.id} item={item} tone={i % 2 ? "orange" : "green"} />
          ))}
        </div>
        <p className="mt-2 max-w-3xl text-muted-ink">
          {PRICE_NOTE} Questions? Call{" "}
          <a href={site.phoneHref} className="inline-flex items-center gap-1 font-semibold whitespace-nowrap text-green underline underline-offset-4">
            <Phone aria-hidden="true" className="size-4" />
            {site.phone}
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
