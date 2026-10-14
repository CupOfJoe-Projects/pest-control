import { getImageProps } from "next/image";
import { Phone } from "lucide-react";
import { Container } from "@/components/site/section";
import { StarRating } from "@/components/site/star-rating";
import { QuoteStarter } from "./quote-starter";
import { GOOGLE_RATING, site } from "@/content/site";
import { images } from "@/lib/images";

/** Full bleed photo with art direction: 16:9 on desktop, 4:5 on phones. */
function HeroBackground() {
  const desktop = images.hero.src;
  const mobile = images.heroMobile.src ?? desktop;
  if (!desktop || !mobile) {
    // Placeholder until the photos land: a deep green field with a soft glow.
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-green-dark"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 85% 30%, rgba(232,112,26,0.18), transparent 55%), radial-gradient(ellipse at 70% 90%, rgba(231,238,232,0.10), transparent 60%)",
        }}
      />
    );
  }

  const common = { alt: images.hero.alt, sizes: "100vw", placeholder: "blur" as const, priority: true };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: desktop });
  const {
    props: { srcSet: mobileSrcSet, ...img },
  } = getImageProps({ ...common, src: mobile });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img {...img} className="absolute inset-0 h-full w-full object-cover" />
    </picture>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      // Pull up under the transparent sticky header.
      className="relative -mt-16 overflow-hidden pt-16 sm:-mt-[4.5rem] sm:pt-[4.5rem]"
    >
      <HeroBackground />
      {/* Darker on the left (and top on phones) so the copy always reads. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-green-dark/90 via-green-dark/75 to-green-dark/85 md:bg-gradient-to-r md:from-green-dark/95 md:via-green-dark/70 md:to-green-dark/15"
      />

      <Container className="relative grid items-center gap-8 pt-8 pb-10 sm:pt-12 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:py-20 lg:gap-16 lg:py-24">
        <div className="text-cream">
          <p className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase sm:text-[0.95rem]">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange" />
            Family owned in Polk County since 1959
          </p>
          <h1 id="hero-title" className="mt-3 text-[3rem] leading-[0.98] font-extrabold sm:mt-4 sm:text-7xl lg:text-8xl">
            Bugs out.
            <br />
            <span className="text-orange">For good.</span>
          </h1>
          {GOOGLE_RATING && (
            <p className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 sm:mt-6">
              <StarRating rating={GOOGLE_RATING.value} />
              <span className="font-medium">Rated {GOOGLE_RATING.value} by Polk County neighbors</span>
            </p>
          )}
          <p className="mt-4 max-w-xl text-lg text-cream/90 sm:text-xl">
            Local techs, real people on the phone, and a guarantee that if they come back, so do we.
          </p>
          <a
            href={site.phoneHref}
            className="mt-5 inline-flex min-h-12 items-center gap-2 text-lg font-semibold text-cream underline decoration-orange decoration-2 underline-offset-[6px] hover:decoration-cream"
          >
            <Phone aria-hidden="true" className="size-5" />
            Or call {site.phone}
          </a>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/5 sm:p-7">
          <QuoteStarter phone={site.phone} phoneHref={site.phoneHref} />
        </div>
      </Container>
    </section>
  );
}
