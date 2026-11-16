import type { ReactNode } from "react";
import { Scissors } from "lucide-react";
import { OFFER, SHOW_OFFER } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * "Cut out" coupon for the intro offer: a solid card with a dashed cut line
 * inside the edge and a pair of scissors on it. Reads from OFFER, so a seasonal
 * offer is a one line change in content/site.ts.
 *
 * tone="dark" sits on cream or white sections, tone="light" on green ones.
 */
export function Coupon({
  tone = "dark",
  size = "md",
  action,
  className,
}: {
  tone?: "dark" | "light";
  size?: "sm" | "md";
  /** Optional button under the coupon text. */
  action?: ReactNode;
  className?: string;
}) {
  if (!SHOW_OFFER) return null;
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "relative rounded-[14px] text-center shadow-[0_18px_40px_-20px_rgba(20,42,29,0.55)]",
        dark ? "bg-green-dark text-cream" : "bg-cream text-ink",
        size === "sm" ? "px-5 py-6" : "px-6 py-8 sm:px-8",
        className,
      )}
    >
      {/* The cut line. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-2 rounded-[10px] border-[3px] border-dashed",
          dark ? "border-cream/70" : "border-green/60",
        )}
      />
      <Scissors
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-6 size-6 -translate-y-1/2 -rotate-90 rounded-full p-0.5",
          dark ? "bg-green-dark text-cream" : "bg-cream text-green",
        )}
      />
      <p className={cn("eyebrow justify-center", dark ? "text-orange" : "text-green")}>New customer coupon</p>
      <p
        className={cn(
          "mt-2 font-heading leading-none font-extrabold tracking-[-0.03em]",
          size === "sm" ? "text-[2.75rem]" : "text-[3.5rem] sm:text-[4rem]",
        )}
      >
        {OFFER.amount}
      </p>
      <p className={cn("mt-2 font-heading font-bold", size === "sm" ? "text-lg" : "text-xl sm:text-2xl")}>{OFFER.detail}</p>
      <span aria-hidden="true" className={cn("mx-auto mt-4 block h-0.5 w-24", dark ? "bg-cream/40" : "bg-green/30")} />
      <p className={cn("mt-3 text-sm", dark ? "text-cream/80" : "text-muted-ink")}>{OFFER.terms}</p>
      {action && <div className="relative mt-5">{action}</div>}
    </div>
  );
}

/** Small pill for plan cards: "$50 off for new customers". */
export function OfferTag({ className }: { className?: string }) {
  if (!SHOW_OFFER) return null;
  return (
    <p
      className={cn(
        // Text inherits the card color: orange text on cream fails contrast.
        "inline-flex items-center gap-1.5 rounded-md border-2 border-dashed border-orange px-2.5 py-1 text-sm font-bold",
        className,
      )}
    >
      <Scissors aria-hidden="true" className="size-4" />
      {OFFER.tag}
    </p>
  );
}
