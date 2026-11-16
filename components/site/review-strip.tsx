import { Container } from "./section";
import { StarRating } from "./star-rating";
import { ReviewCard } from "./trust-wall";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from "@/content/site";
import { reviews, type Review } from "@/content/reviews";
import { cn } from "@/lib/utils";

/** Short reviews first (they fit a card), with any that mention a match term ahead of the rest. */
function pick(match: string[], count: number): Review[] {
  const terms = match.map((t) => t.trim().toLowerCase()).filter((t) => t.length > 2);
  const mentions = (r: Review) => terms.some((t) => r.text.toLowerCase().includes(t) || r.town?.toLowerCase() === t);
  return [...reviews]
    .filter((r) => r.text.length <= 260)
    .sort((a, b) => Number(mentions(b)) - Number(mentions(a)) || b.text.length - a.text.length)
    .slice(0, count);
}

/**
 * Compact review band for pest and service pages: the Google rating plus three
 * reviews. Reviews that mention a `match` term (a pest or a town) come first.
 */
export function ReviewStrip({ match = [], className }: { match?: string[]; className?: string }) {
  const picked = pick(match, 3);
  return (
    <section aria-labelledby="review-strip-title" className={cn("bg-white py-12 sm:py-16", className)}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h2 id="review-strip-title" className="text-2xl font-extrabold text-ink sm:text-3xl">
            What Polk County neighbors say
          </h2>
          {GOOGLE_RATING && (
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-ink underline-offset-4 hover:underline"
            >
              <StarRating rating={GOOGLE_RATING.value} size="size-5" />
              <span className="font-heading text-lg font-extrabold tabular-nums">{GOOGLE_RATING.value.toFixed(1)}</span>
              <span className="text-muted-ink">from {GOOGLE_RATING.countLabel} Google reviews</span>
            </a>
          )}
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {picked.map((r) => (
            <li key={r.name}>
              <ReviewCard review={r} wide />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
