"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Marquee track. The server sends the items once; the second copy that makes
 * the loop seamless is cloned here after load, which halves the HTML. The
 * animation only starts once the copy exists (`data-ready`), so there is no gap.
 */
export function MarqueeTrack({
  children,
  direction = "left",
  duration,
}: {
  children: ReactNode;
  direction?: "left" | "right";
  duration: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = ref.current;
    const first = track?.firstElementChild;
    if (!track || !first || track.children.length > 1) return;
    const copy = first.cloneNode(true) as HTMLElement;
    copy.setAttribute("aria-hidden", "true");
    copy.setAttribute("data-marquee-copy", "");
    copy.querySelectorAll("a, button, [tabindex]").forEach((el) => el.setAttribute("tabindex", "-1"));
    track.append(copy);
    track.setAttribute("data-ready", "");
    return () => {
      copy.remove();
      track.removeAttribute("data-ready");
    };
  }, []);

  return (
    <div
      ref={ref}
      className="marquee-track"
      data-direction={direction}
      style={{ "--marquee-duration": duration } as CSSProperties}
    >
      {children}
    </div>
  );
}
