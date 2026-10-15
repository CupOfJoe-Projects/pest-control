"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shows the final number by default. Only when at least half of it is on
 * screen does it count up from zero, once. Fast scrolling, crawlers, and
 * screenshots never catch it at zero.
 */
export function CountUp({ to, duration = 1400, className }: { to: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {/* Screen readers always get the real number, never the animation. */}
      <span className="sr-only">{to}</span>
      <span aria-hidden="true">{value}</span>
    </span>
  );
}
