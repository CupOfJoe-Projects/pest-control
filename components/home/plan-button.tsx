"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PlanId } from "@/content/plans";

export const PLAN_EVENT = "quote:plan";

/** Scrolls to the quote form and preselects this plan in it. */
export function PlanButton({ plan, popular, label }: { plan: PlanId; popular?: boolean; label: string }) {
  return (
    <a
      href="#quote"
      onClick={() => window.dispatchEvent(new CustomEvent<PlanId>(PLAN_EVENT, { detail: plan }))}
      className={cn(buttonVariants({ variant: popular ? "cta" : "outline-green", size: "2xl" }), "w-full")}
    >
      {label}
    </a>
  );
}
