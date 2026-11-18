"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Category tabs for the homepage coupons, so the page shows one group at a
 * time instead of every coupon. Every panel is in the HTML (search engines and
 * no JavaScript visitors still see them all); only the chosen one is visible.
 */
export function CouponTabs({ tabs }: { tabs: { id: string; label: string; panel: ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move between tabs, as screen reader users expect.
  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + tabs.length) % tabs.length;
    setActive(tabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Coupon categories" className="flex flex-wrap gap-2.5">
        {tabs.map((t, i) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`coupon-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`coupon-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border px-4 font-semibold transition",
                selected
                  ? "border-green bg-green text-cream"
                  : "border-line bg-white text-ink hover:border-green hover:bg-green-soft",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`coupon-panel-${t.id}`}
          aria-labelledby={`coupon-tab-${t.id}`}
          hidden={t.id !== active}
        >
          {t.panel}
        </div>
      ))}
    </div>
  );
}
