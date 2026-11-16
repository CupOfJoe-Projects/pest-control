"use client";

import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import type { PriceAction as Action } from "@/content/pricing";
import { cn } from "@/lib/utils";
import { useQuoteHref } from "./cta-buttons";

/** Event the quote form listens for, so it can tell the office which service. */
export const SERVICE_EVENT = "quote:service";

/** The button under a price coupon: call, or jump to the quote form with the service noted. */
export function PriceActionButton({ action, service, className }: { action: Action; service: string; className?: string }) {
  const quoteHref = useQuoteHref();
  const classes = cn(buttonVariants({ variant: "cta", size: "xl" }), "w-full", className);

  if (action.kind === "call") {
    return (
      <a href={site.phoneHref} className={classes}>
        <Phone aria-hidden="true" />
        {action.label}
      </a>
    );
  }
  return (
    <a
      href={quoteHref}
      onClick={() => window.dispatchEvent(new CustomEvent<string>(SERVICE_EVENT, { detail: service }))}
      className={classes}
    >
      {action.label}
    </a>
  );
}
