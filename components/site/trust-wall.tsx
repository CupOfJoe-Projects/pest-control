import { Star } from "lucide-react";
import { Container } from "./section";
import { StarRating } from "./star-rating";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL, SECOND_RATING } from "@/content/site";
import { Affiliations } from "./affiliations";
import { reviews as allReviews, type Review, type ReviewPlatform } from "@/content/reviews";
import { getCurrentYear } from "@/lib/year";
import { cn } from "@/lib/utils";
import { MarqueeTrack } from "./marquee-track";

const platformName: Record<ReviewPlatform, string> = {
  google: "Google",
  trustpilot: "Trustpilot",
  facebook: "Facebook",
};

/** Simple generic platform marks. Not the official logos. */
function PlatformMark({ platform, className }: { platform: ReviewPlatform | "nextdoor"; className?: string }) {
  if (platform === "google") {
    return (
      <span
        className={cn(
          "flex size-6 items-center justify-center rounded-full bg-white font-heading text-sm font-extrabold text-[#4285F4] ring-1 ring-line",
          className,
        )}
      >
        G
      </span>
    );
  }
  if (platform === "trustpilot") {
    return (
      <span className={cn("flex size-6 items-center justify-center rounded-sm bg-[#00B67A] text-white", className)}>
        <Star className="size-3.5 fill-current" />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "flex size-6 items-center justify-center rounded-full bg-[#1877F2] font-heading text-sm font-extrabold text-white",
        className,
      )}
    >
      {platform === "facebook" ? "f" : "n"}
    </span>
  );
}

function ReviewCard({ review, wide = false }: { review: Review; wide?: boolean }) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-[16px] border border-line bg-white p-5",
        wide
          ? "w-full shadow-[0_18px_40px_-20px_rgba(20,42,29,0.35)]"
          : "w-[17.5rem] shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:w-[20rem]",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-soft font-heading font-bold text-green"
        >
          {review.name[0]}
        </span>
        <figcaption className="min-w-0 flex-1">
          <span className="block truncate font-semibold text-ink">{review.name}</span>
          <span className="block truncate text-sm text-muted-ink">
            {review.town ? `${review.town} · ${review.date}` : review.date}
          </span>
        </figcaption>
        <span title={`Review on ${platformName[review.platform]}`}>
          <PlatformMark platform={review.platform} />
          <span className="sr-only">on {platformName[review.platform]}</span>
        </span>
      </div>
      <StarRating rating={review.rating} size="size-4" className="mt-3" />
      <blockquote className={cn("mt-2 text-[0.95rem] leading-relaxed text-ink", !wide && "line-clamp-5")}>{review.text}</blockquote>
    </figure>
  );
}

function MarqueeRow({
  reviews,
  direction,
  duration,
  label,
}: {
  reviews: Review[];
  direction: "left" | "right";
  duration: string;
  label: string;
}) {
  // Each half of the track must be wider than the row (capped at 2300px below),
  // or the loop shows a gap. 7 cards is about 2350px. More cards means a bigger
  // DOM and a slower first load on phones.
  const MIN_CARDS = 7;
  const filled = Array.from({ length: Math.ceil(MIN_CARDS / reviews.length) }, () => reviews).flat();
  return (
    <div className="marquee marquee-fade py-2" role="region" aria-label={label} tabIndex={0}>
      <MarqueeTrack direction={direction} duration={duration}>
        <ul className="flex shrink-0 gap-4 pr-4">
          {filled.map((r, i) => (
            <li key={`${r.name}-${i}`} {...(i >= reviews.length && { "aria-hidden": true })}>
              <ReviewCard review={r} />
            </li>
          ))}
        </ul>
      </MarqueeTrack>
    </div>
  );
}

export async function TrustWall({
  reviews = allReviews,
  title,
  className,
}: {
  reviews?: Review[];
  title?: string;
  className?: string;
}) {
  const years = (await getCurrentYear()) - 1959;
  const top = reviews.filter((_, i) => i % 2 === 0);
  const bottom = reviews.filter((_, i) => i % 2 === 1);

  // Three featured reviews, piled with slight rotations. The fullest ones that
  // still fit a card; very long reviews stay in the rows below.
  const featured = [...reviews]
    .sort((a, b) => Number(b.text.length <= 240) - Number(a.text.length <= 240) || b.text.length - a.text.length)
    .slice(0, 3);
  const tilts = ["-rotate-1", "rotate-0", "rotate-1"];

  return (
    <section aria-labelledby="trust-title" className={cn("overflow-hidden bg-white py-16 md:py-24", className)}>
      <Container>
        <div data-reveal className="max-w-3xl">
          <p className="eyebrow flex-wrap text-green">
            Reviews
          </p>
          <h2
            id="trust-title"
            className="mt-4 text-[2.25rem] leading-[1] font-extrabold text-ink md:text-[3.5rem] md:leading-[0.95]"
          >
            {title ?? `Polk County has been calling us for ${years} years`}
          </h2>
        </div>

        <div className="mt-10 grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Big numeral as the graphic. */}
          {GOOGLE_RATING && (
            <div data-reveal>
              <p className="flex items-end gap-4">
                <span className="font-heading text-[7rem] leading-[0.8] font-extrabold tracking-[-0.05em] text-green tabular-nums md:text-[10rem]">
                  {GOOGLE_RATING.value.toFixed(1)}
                </span>
                <span className="pb-2">
                  <StarRating rating={GOOGLE_RATING.value} />
                  <span className="mt-1 block text-muted-ink">from {GOOGLE_RATING.countLabel} Google reviews</span>
                </span>
              </p>
              <ul className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
                <li>
                  <a
                    href={GOOGLE_REVIEWS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 rounded-full border border-line py-1.5 pr-4 pl-1.5 text-sm font-semibold text-ink transition hover:border-green/40"
                  >
                    <PlatformMark platform="google" className="size-7" />
                    Google <span className="font-normal text-muted-ink tabular-nums">{GOOGLE_RATING.value.toFixed(1)}</span>
                  </a>
                </li>
                {SECOND_RATING && (
                  <li>
                    <a
                      href={SECOND_RATING.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 rounded-full border border-line py-1.5 pr-4 pl-1.5 text-sm font-semibold text-ink transition hover:border-green/40"
                    >
                      <PlatformMark platform={SECOND_RATING.platform} className="size-7" />
                      {SECOND_RATING.label}{" "}
                      <span className="font-normal text-muted-ink tabular-nums">
                        {SECOND_RATING.value} · {SECOND_RATING.countLabel}
                      </span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}

          <ul data-reveal className="relative mx-auto w-full max-w-md min-w-0 md:mx-0" aria-label="Featured reviews">
            {featured.map((r, i) => (
              <li
                key={r.name}
                className={cn(
                  "relative transition hover:z-30",
                  tilts[i],
                  i > 0 && "mt-3 md:-mt-20",
                  i === 0 && "md:mr-10",
                  i === 1 && "z-10 ml-4 md:ml-12",
                  i === 2 && "z-20 md:ml-4 md:mr-6",
                )}
              >
                <ReviewCard review={r} wide />
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Full bleed rows. Hover, focus, or touch pauses them. */}
      <div className="mx-auto mt-14 max-w-[2300px] space-y-2 md:mt-20">
        <MarqueeRow reviews={top} direction="left" duration="55s" label="Customer reviews, row one" />
        <MarqueeRow reviews={bottom.length ? bottom : top} direction="right" duration="60s" label="Customer reviews, row two" />
      </div>

      <Container>
        <Affiliations className="mt-14 md:mt-16" />
      </Container>
    </section>
  );
}
