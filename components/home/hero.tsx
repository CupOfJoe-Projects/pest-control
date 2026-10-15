import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { Phone, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/site/section";
import { StarRating } from "@/components/site/star-rating";
import { HeroParallax } from "./hero-parallax";
import { FDACS_LICENSE, GOOGLE_RATING, HERO_AVAILABILITY, site } from "@/content/site";
import { reviews } from "@/content/reviews";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

/** White floating card. `i` staggers the entrance and offsets the drift. */
function FloatCard({ i, className, children }: { i: number; className?: string; children: ReactNode }) {
  return (
    <div className={cn("hero-card parallax absolute z-20", className)} style={{ "--i": i, "--depth": 12 } as CSSProperties}>
      <div className="drift rounded-[16px] bg-white/95 px-3.5 py-3 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.45),0_2px_6px_rgba(0,0,0,0.12)] ring-1 ring-black/5 backdrop-blur sm:px-4">
        {children}
      </div>
    </div>
  );
}

function RatingCard() {
  if (!GOOGLE_RATING) return null;
  const avatars = reviews.slice(0, 3).map((r) => r.name[0]);
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex -space-x-2" aria-hidden="true">
        {avatars.map((a, n) => (
          <span
            key={n}
            className="flex size-7 items-center justify-center rounded-full bg-green-soft text-[0.7rem] font-bold text-green ring-2 ring-white"
          >
            {a}
          </span>
        ))}
      </span>
      <span>
        <span className="flex items-center gap-1 font-heading text-lg leading-none font-extrabold text-ink tabular-nums">
          <span className="text-orange">★</span> {GOOGLE_RATING.value.toFixed(1)}
        </span>
        <span className="mt-0.5 block text-xs leading-tight text-muted-ink">{GOOGLE_RATING.countLabel} Google reviews</span>
      </span>
    </div>
  );
}

function AvailabilityCard() {
  return (
    <div className="flex items-center gap-2.5">
      <span aria-hidden="true" className="pulse-dot size-2.5 shrink-0 rounded-full bg-[#22c55e]" />
      <span>
        <span className="block text-sm leading-tight font-semibold text-ink">{HERO_AVAILABILITY.title}</span>
        <span className="block text-xs leading-tight text-muted-ink tabular-nums">{HERO_AVAILABILITY.detail}</span>
      </span>
    </div>
  );
}

function LicenseCard() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-full bg-green-soft text-green">
        <ShieldCheck aria-hidden="true" className="size-5" />
      </span>
      <span>
        <span className="block text-sm leading-tight font-semibold text-ink">Licensed by FDACS</span>
        <span className="block text-xs leading-tight text-muted-ink tabular-nums">
          {FDACS_LICENSE ? `#${FDACS_LICENSE}` : "Florida Dept. of Agriculture"}
        </span>
      </span>
    </div>
  );
}

/** The photo with art direction: 16:9 on wide screens, 4:5 on phones. */
function HeroPhoto() {
  const desktop = images.hero.src!;
  const mobile = images.heroMobile.src ?? desktop;
  // Lighter encodes: the photo sits under a dark gradient, so artifacts never
  // show, and this is the LCP image. Phones ask for a 75vw source, which is
  // still sharp at 2x and 3x but saves about a third of the bytes.
  const common = { alt: images.hero.alt, placeholder: "blur" as const };
  const {
    props: { srcSet: desktopSrcSet, src: desktopSrc },
  } = getImageProps({ ...common, src: desktop, quality: 60, sizes: "100vw" });
  const {
    props: { srcSet: mobileSrcSet, ...img },
  } = getImageProps({ ...common, src: mobile, quality: 55, sizes: "75vw" });

  // next/image cannot preload <picture> art direction, so preload each version
  // for its own screen size. This is the LCP image.
  preload(desktopSrc, { as: "image", imageSrcSet: desktopSrcSet, imageSizes: "100vw", media: "(min-width: 768px)", fetchPriority: "high" });
  preload(img.src, { as: "image", imageSrcSet: mobileSrcSet, imageSizes: "75vw", media: "(max-width: 767px)", fetchPriority: "high" });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes="75vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img {...img} loading="eager" fetchPriority="high" className="h-full w-full object-cover object-[50%_45%]" />
    </picture>
  );
}

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden bg-green-dark text-cream">
      {/* Phones: the photo is a 4:5 block at the top. Wider screens: it fills the hero. */}
      <HeroParallax className="relative aspect-[4/5] w-full md:absolute md:inset-0 md:aspect-auto">
        <HeroPhoto />
        {/* Phones: dark at the top for the headline, fading into the green below.
            Wider screens: dark on the left where the copy sits. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,42,29,0.82)_0%,rgba(20,42,29,0.35)_38%,rgba(20,42,29,0)_55%,rgba(20,42,29,0.15)_80%,var(--brand-green-dark)_100%)] md:bg-[linear-gradient(90deg,rgba(20,42,29,0.94)_0%,rgba(20,42,29,0.82)_32%,rgba(20,42,29,0.35)_55%,rgba(20,42,29,0)_72%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-green-dark/70 to-transparent md:block"
        />

        {/* Floating cards over the photo. Phones get two, wider screens three. */}
        <div className="pointer-events-none absolute inset-0">
          <Container className="relative h-full">
            <FloatCard i={0} className="right-4 bottom-[18%] md:top-[14%] md:right-6 md:bottom-auto">
              <RatingCard />
            </FloatCard>
            <FloatCard i={1} className="bottom-[6%] left-4 md:top-[46%] md:bottom-auto md:left-[46%]">
              <AvailabilityCard />
            </FloatCard>
            <FloatCard i={2} className="right-6 bottom-[22%] hidden lg:block">
              <LicenseCard />
            </FloatCard>
          </Container>
        </div>
      </HeroParallax>

      {/* Not `relative` on phones, so the headline block can sit over the top of the photo. */}
      <Container className="pt-4 pb-20 md:relative md:flex md:min-h-[min(86vh,780px)] md:flex-col md:justify-center md:py-28">
        <div className="max-w-xl">
          {/* Phones: absolutely placed over the top of the photo. Wider screens: in flow. */}
          <div className="absolute inset-x-0 top-0 px-4 pt-6 sm:px-6 md:static md:p-0">
            <p className="eyebrow text-cream/90">Family owned in Polk County since 1959</p>
            <h1
              id="hero-title"
              className="mt-3 text-[3rem] leading-[0.95] font-extrabold drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)] md:mt-5 md:text-[4.5rem] lg:text-[5.5rem]"
            >
              {/* Brand tagline. */}
              Keep Florida
              <br />
              <span className="text-orange">outside.</span>
            </h1>
          </div>
          {GOOGLE_RATING && (
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.95rem] md:mt-6 md:text-base">
              <StarRating rating={GOOGLE_RATING.value} />
              <span className="font-semibold tabular-nums">{GOOGLE_RATING.value.toFixed(1)}</span>
              <span className="text-cream/80">· {GOOGLE_RATING.countLabel} Google reviews</span>
            </p>
          )}
          <p className="mt-3 text-lg text-cream/90 md:mt-5 md:text-xl">Local techs. Real people. If they come back, so do we.</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-8">
            <a href={site.phoneHref} className={cn(buttonVariants({ variant: "cta", size: "2xl" }), "sm:px-7")}>
              <Phone aria-hidden="true" />
              Call {site.phone}
            </a>
            <Link href="#quote" className={buttonVariants({ variant: "outline-cream", size: "2xl" })}>
              Get a free quote
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
