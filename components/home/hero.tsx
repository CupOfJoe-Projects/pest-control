import { CallButton, QuoteButton } from "@/components/site/cta-buttons";
import { Container } from "@/components/site/section";
import { EstBadge } from "@/components/site/est-badge";
import { PhotoPlaceholder } from "@/components/site/photo-placeholder";
import { RatingLine } from "@/components/site/rating-line";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      <Container className="grid items-center gap-10 pt-7 pb-10 sm:pt-12 sm:pb-16 md:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-20">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold tracking-wide text-green uppercase sm:text-[0.95rem]">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange" />
            Family owned in Polk County since 1959
          </p>
          <h1
            id="hero-title"
            className="mt-3 text-[2.6rem] leading-[1.02] font-extrabold text-ink sm:mt-4 sm:text-6xl lg:text-7xl"
          >
            Pests gone. Done right. <span className="text-green">Since 1959.</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink/80 sm:mt-6 sm:text-xl">
            Local pros who live here, know Florida bugs, and actually pick up the phone.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <QuoteButton size="2xl" />
            <CallButton size="2xl" className="bg-cream" />
          </div>
          <RatingLine className="mt-5 sm:mt-6" />
        </div>

        <div className="relative hidden md:block">
          {/* TODO(owner): Real photo of a McDonald truck or tech on a job. 4:5, at least 1200x1500. */}
          <PhotoPlaceholder label="McDonald truck and tech on a job in Polk County" className="aspect-[4/5] shadow-lg" />
          <EstBadge className="absolute -top-6 -left-6 hidden size-36 drop-shadow-md lg:block" />
        </div>
      </Container>
    </section>
  );
}
