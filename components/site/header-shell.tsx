"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Sticky header wrapper. Always solid cream; it gains a soft shadow once the
 * page scrolls so it separates from the content underneath.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur transition-shadow duration-300 data-[scrolled=true]:shadow-[0_4px_20px_rgba(20,42,29,0.08)]"
    >
      {children}
    </header>
  );
}
