import { Award, BadgeCheck, Landmark, ShieldCheck, Star, type LucideIcon } from "lucide-react";
import { Container } from "./section";
import { StarRating } from "./star-rating";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL, IS_DEMO, SECOND_RATING, TRUST_BADGES } from "@/content/site";
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

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full w-[17.5rem] flex-col rounded-[16px] border border-line bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:w-[20rem]">
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
            {review.town} · {review.date}
          </span>
        </figcaption>
        <span title={`Review on ${platformName[review.platform]}`}>
          <PlatformMark platform={review.platform} />
          <span className="sr-only">on {platformName[review.platform]}</span>
        </span>
      </div>
      <StarRating rating={review.rating} size="size-4" className="mt-3" />
      <blockquote className="mt-2 line-clamp-4 text-[0.95rem] leading-relaxed text-ink">{review.text}</blockquote>
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

const badgeIcons: Record<(typeof TRUST_BADGES)[number]["id"], LucideIcon> = {
  fdacs: Landmark,
  fpma: Award,
  bbb: ShieldCheck,
  guarantee: BadgeCheck,
};

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

  return (
    <section aria-labelledby="trust-title" className={cn("overflow-hidden bg-white py-16 md:py-24", className)}>
      <Container>
        <div data-reveal className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-green uppercase">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange" />
              Reviews
              {IS_DEMO && (
                // TODO(launch): Disappears when IS_DEMO is false.
                <span className="ml-1 rounded-full bg-orange/15 px-2.5 py-0.5 text-xs tracking-normal text-ink normal-case">
                  Sample reviews for this demo
                </span>
              )}
            </p>
            <h2 id="trust-title" className="text-3xl leading-[1.1] font-extrabold text-ink sm:text-4xl">
              {title ?? `Polk County has been calling us for ${years} years`}
            </h2>
          </div>

          <ul className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:gap-3">
            {GOOGLE_RATING && (
              <li>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full items-center gap-2.5 rounded-[16px] border border-line bg-cream px-3 py-3 transition hover:border-green/40 sm:gap-3 sm:px-4"
                >
                  <PlatformMark platform="google" className="size-8 shrink-0 text-lg sm:size-9" />
                  <span>
                    <span className="flex items-center gap-1.5 font-heading text-lg font-extrabold text-ink">
                      {GOOGLE_RATING.value}
                      <StarRating rating={GOOGLE_RATING.value} size="size-4" className="hidden sm:inline-flex" />
                      <span aria-hidden="true" className="text-orange sm:hidden">★</span>
                    </span>
                    <span className="block text-xs text-muted-ink sm:text-sm">{GOOGLE_RATING.countLabel} on Google</span>
                  </span>
                </a>
              </li>
            )}
            {SECOND_RATING && (
              <li>
                <a
                  href={SECOND_RATING.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full items-center gap-2.5 rounded-[16px] border border-line bg-cream px-3 py-3 transition hover:border-green/40 sm:gap-3 sm:px-4"
                >
                  <PlatformMark platform={SECOND_RATING.platform} className="size-8 shrink-0 sm:size-9" />
                  <span>
                    <span className="flex items-center gap-1.5 font-heading text-lg font-extrabold text-ink">
                      {SECOND_RATING.value}
                      <StarRating rating={SECOND_RATING.value} size="size-4" className="hidden sm:inline-flex" />
                      <span aria-hidden="true" className="text-orange sm:hidden">★</span>
                    </span>
                    <span className="block text-xs text-muted-ink sm:text-sm">
                      {SECOND_RATING.countLabel} on {SECOND_RATING.label}
                    </span>
                  </span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>

      {/* Full bleed rows. Hover, focus, or touch pauses them. */}
      <div className="mx-auto mt-10 max-w-[2300px] space-y-2">
        <MarqueeRow reviews={top} direction="left" duration="55s" label="Customer reviews, row one" />
        <MarqueeRow reviews={bottom.length ? bottom : top} direction="right" duration="60s" label="Customer reviews, row two" />
      </div>

      <Container>
        {/* TODO(owner): Each badge is unconfirmed until TRUST_BADGES[].confirmed is true. */}
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4" aria-label="Credentials">
          {TRUST_BADGES.map((b) => {
            const Icon = badgeIcons[b.id];
            return (
              <li
                key={b.id}
                className="group flex items-center gap-2.5 rounded-[16px] border border-line bg-white px-3 py-3 grayscale transition hover:border-green/40 hover:grayscale-0 sm:gap-3 sm:px-4"
              >
                <Icon aria-hidden="true" className="size-6 shrink-0 text-green transition group-hover:text-orange sm:size-8" />
                <span className="min-w-0">
                  <span className="block text-sm leading-tight font-semibold text-ink sm:text-base">{b.title}</span>
                  {/* Details only where there is room for them. */}
                  <span className="hidden text-xs leading-snug text-muted-ink sm:block">{b.detail}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
