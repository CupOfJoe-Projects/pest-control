import Link from "next/link";
import { ArrowUpRight, ChevronRight, Navigation } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";
import { BrandIcon } from "@/components/site/brand-icon";
import { StarRating } from "@/components/site/star-rating";
import { officeMapEmbedUrl } from "@/components/site/office-map";
import { areas } from "@/content/areas";
import { GOOGLE_RATING, fullAddress, site } from "@/content/site";

const HQ = "bartow";
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `McDonald Exterminators Inc, ${fullAddress}`,
)}`;

/**
 * Homepage "find us": the Google Business Profile on a live Google map, with
 * the review count, beside every town we serve. Builds trust that we are a real,
 * local office before someone calls.
 */
export function AreaSection() {
  return (
    <Section id="areas" labelledBy="areas-title" className="grain bg-cream">
      <SectionHeading
        id="areas-title"
        eyebrow="Service area"
        title="All of Polk County, from our office in Bartow"
        intro="A real local office you can visit, and trucks out across the county every day."
        className="max-w-3xl"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        {/* Google Business Profile on the map */}
        <div
          data-reveal
          className="relative overflow-hidden rounded-[24px] border border-line bg-cream-dark shadow-[0_24px_60px_-28px_rgba(20,42,29,0.4)]"
        >
          <iframe
            src={officeMapEmbedUrl}
            title={`Google map of ${site.name}, ${fullAddress}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[4/3] w-full border-0 lg:aspect-auto lg:h-full lg:min-h-[34rem]"
          />
          {/* Under the map on phones so it never hides the pin; floats over the map from sm up. */}
          <div className="relative mx-3 -mt-8 mb-3 rounded-2xl bg-white p-5 shadow-[0_18px_40px_-16px_rgba(20,42,29,0.45)] ring-1 ring-black/5 sm:absolute sm:bottom-5 sm:left-5 sm:m-0 sm:w-[22rem]">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#4285F4] ring-1 ring-line">
                <BrandIcon name="google" className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="font-heading text-lg leading-tight font-bold text-ink">McDonald Exterminators Inc</p>
                <p className="text-sm text-muted-ink">Pest control service · Bartow, FL</p>
              </div>
            </div>
            {GOOGLE_RATING && (
              <a
                href={site.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 flex items-center gap-3 rounded-xl bg-cream px-4 py-3 transition hover:bg-green-soft"
              >
                <span className="font-heading text-[2.25rem] leading-none font-extrabold text-ink tabular-nums">
                  {GOOGLE_RATING.value.toFixed(1)}
                </span>
                <span className="flex flex-col">
                  <StarRating rating={GOOGLE_RATING.value} />
                  <span className="mt-1 text-sm font-semibold text-ink/80 group-hover:underline">
                    {GOOGLE_RATING.countLabel} Google reviews
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" className="ml-auto size-5 text-green" />
              </a>
            )}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href={site.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-green px-3 text-sm font-semibold text-cream transition hover:bg-green-dark"
              >
                Read reviews
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-line bg-white px-3 text-sm font-semibold text-ink transition hover:border-green hover:bg-green-soft"
              >
                <Navigation aria-hidden="true" className="size-4 text-green" />
                Directions
              </a>
            </div>
          </div>
        </div>

        {/* Towns */}
        <div data-reveal className="flex flex-col rounded-[24px] border border-line bg-white p-5 sm:p-7">
          <h3 className="font-heading text-2xl font-extrabold text-ink">Towns we serve</h3>
          <p className="mt-1 text-muted-ink">Tap your town for the pests we see most there.</p>
          <ul className="mt-5 grid gap-x-4 sm:grid-cols-2">
            {areas.map((a) => (
              <li key={a.slug} className="border-b border-line">
                <Link
                  href={`/areas/${a.slug}`}
                  className="group flex min-h-13 items-center gap-3 py-2.5 font-semibold text-ink transition hover:text-green"
                >
                  <span
                    aria-hidden="true"
                    className={
                      a.slug === HQ
                        ? "size-2.5 shrink-0 rounded-full bg-orange ring-4 ring-orange/20"
                        : "size-2 shrink-0 rounded-full bg-green/50"
                    }
                  />
                  <span className="flex-1">
                    {a.name}
                    {a.slug === HQ && (
                      <span className="ml-2 rounded-full bg-orange/15 px-2 py-0.5 text-xs font-bold text-ink">Our office</span>
                    )}
                  </span>
                  <ChevronRight
                    aria-hidden="true"
                    className="size-4 text-muted-ink transition group-hover:translate-x-0.5 group-hover:text-green"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-6 text-muted-ink">
            Do not see your town? Call{" "}
            <a href={site.phoneHref} className="font-semibold whitespace-nowrap text-green underline underline-offset-4">
              {site.phone}
            </a>{" "}
            and ask. We cover all of Polk County.
          </p>
        </div>
      </div>
    </Section>
  );
}
