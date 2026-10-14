import { cn } from "@/lib/utils";
import { GOOGLE_RATING } from "@/content/site";
import { StarRating } from "./star-rating";

/** "4.9 on Google from 200+ neighbors". Hidden when GOOGLE_RATING is null. */
export function RatingLine({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  if (!GOOGLE_RATING) return null;
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2.5 gap-y-1", className)}>
      <StarRating rating={GOOGLE_RATING.value} />
      <span className={cn("font-medium", tone === "dark" ? "text-ink" : "text-cream")}>
        <strong className="font-bold">{GOOGLE_RATING.value}</strong> on Google from {GOOGLE_RATING.countLabel} neighbors
      </span>
    </p>
  );
}
