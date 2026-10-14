import { useId } from "react";
import { cn } from "@/lib/utils";

/** Round "Est. 1959" stamp used as a recurring brand motif. */
export function EstBadge({ className }: { className?: string }) {
  const ringId = useId();
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="Established 1959, family owned"
      className={cn("size-28 text-green", className)}
    >
      <defs>
        <path id={ringId} d="M60 60m-43 0a43 43 0 1 1 86 0a43 43 0 1 1-86 0" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="var(--brand-cream)" />
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="32" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text
        fill="currentColor"
        fontSize="10.5"
        fontWeight="700"
        letterSpacing="2.6"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <textPath href={`#${ringId}`} startOffset="0">
          FAMILY OWNED ★ POLK COUNTY ★
        </textPath>
      </text>
      <text
        x="60"
        y="54"
        textAnchor="middle"
        fill="currentColor"
        fontSize="10"
        fontWeight="700"
        letterSpacing="2"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        EST.
      </text>
      <text
        x="60"
        y="74"
        textAnchor="middle"
        fill="var(--brand-orange)"
        fontSize="22"
        fontWeight="800"
        style={{ fontFamily: "var(--font-bricolage)" }}
      >
        1959
      </text>
    </svg>
  );
}
