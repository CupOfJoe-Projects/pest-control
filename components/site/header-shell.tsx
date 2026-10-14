"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Sticky header wrapper. On the homepage it sits transparent over the top of
 * the hero and turns solid the moment the page scrolls. Waiting until the hero
 * is gone made hero content slide under a see-through header on phones, where
 * the hero is tall. Every other page gets the solid header. Children read the
 * state through `group-data-[over=true]:`.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const overHeroPage = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!overHeroPage) return;
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
  }, [overHeroPage]);

  const over = overHeroPage && !scrolled;
  return (
    <header
      data-over={over}
      className="group sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 data-[over=false]:border-line data-[over=false]:bg-cream/95 data-[over=false]:shadow-[0_4px_20px_rgba(20,42,29,0.08)] data-[over=false]:backdrop-blur data-[over=true]:border-transparent data-[over=true]:bg-transparent"
    >
      {children}
    </header>
  );
}
