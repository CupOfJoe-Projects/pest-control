import { ArrowUpRight, Quote } from "lucide-react";
import { Section, SectionHeading } from "./section";
import { StarRating } from "./star-rating";
import { RatingLine } from "./rating-line";
import { reviews } from "@/content/reviews";
import { GOOGLE_REVIEWS_URL } from "@/content/site";

export function Reviews({ className, title = "What our neighbors say" }: { className?: string; title?: string }) {
  return (
    <Section id="reviews" labelledBy="reviews-title" className={className}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionHeading id="reviews-title" eyebrow="Reviews" title={title} />
          <RatingLine className="mt-4" />
        </div>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center gap-1.5 font-semibold text-green underline-offset-4 hover:underline"
        >
          Read more on Google <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      </div>
      {/* Phones: swipeable row so reviews do not push the page three cards long. */}
      <ul
        aria-label="Customer reviews"
        className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-3 [scrollbar-width:none] md:mx-0 md:mt-10 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0"
      >
        {reviews.map((r) => (
          <li key={r.name} className="w-[84%] shrink-0 snap-start md:w-auto">
            <figure className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <StarRating rating={r.rating} />
                <Quote aria-hidden="true" className="size-7 fill-green-soft text-green-soft" />
              </div>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-ink">“{r.text}”</blockquote>
              <figcaption className="mt-5 font-semibold text-green">{r.name}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
