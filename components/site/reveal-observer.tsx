"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One observer for the whole page. Elements with `data-reveal` that start
 * below the fold get `data-pending` (hidden by CSS) and lose it once 10% of
 * them is visible. Anything already on screen is never hidden, so there are no
 * blank bands while scrolling or on first paint.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.removeAttribute("data-pending");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );
    const fold = window.innerHeight;
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < fold) return;
      el.setAttribute("data-pending", "");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
