import { cn } from "@/lib/utils";

/**
 * Star rating as text glyphs: one element instead of five SVGs, which keeps
 * the HTML small on pages that show many ratings.
 */
export function StarRating({
  rating = 5,
  className,
  size = "size-5",
}: {
  rating?: number;
  className?: string;
  /** Kept for call sites written against the icon version: size-4 or size-5. */
  size?: string;
}) {
  const full = Math.round(rating);
  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className={cn(
        "inline-flex leading-none tracking-[0.08em]",
        size === "size-4" ? "text-[1.05rem]" : "text-[1.3rem]",
        className,
      )}
    >
      <span aria-hidden="true" className="text-orange">
        {"★".repeat(full)}
      </span>
      <span aria-hidden="true" className="text-line">
        {"★".repeat(5 - full)}
      </span>
    </span>
  );
}
