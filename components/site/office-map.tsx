import { Clock, MapPin, Phone, Star } from "lucide-react";
import { Section, SectionHeading } from "./section";
import { GOOGLE_RATING, fullAddress, site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Keyless Google Maps embed with the pin on their office. Searching the
 * business name plus address drops the pin on their Business Profile listing.
 */
export const officeMapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  `McDonald Exterminators Inc, ${fullAddress}`,
)}&z=15&output=embed`;

/** "Visit our office": the map, the address, and a link to the Google Business Profile. */
export function OfficeMap({ className }: { className?: string }) {
  const row = "flex gap-3 text-lg text-ink";
  const icon = "mt-1 size-5 shrink-0 text-green";
  return (
    <Section labelledBy="office-title" className={cn("bg-white", className)}>
      <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            id="office-title"
            eyebrow="Our office"
            title="Right here in Bartow"
            intro="Stop by, call, or look us up on Google. Same local office, same local phone number."
          />
          <ul className="mt-8 space-y-4">
            <li className={row}>
              <MapPin aria-hidden="true" className={icon} />
              <span>
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </span>
            </li>
            <li className={row}>
              <Clock aria-hidden="true" className={icon} />
              {site.hours}
            </li>
            <li className={row}>
              <Phone aria-hidden="true" className={icon} />
              <a href={site.phoneHref} className="font-semibold text-green underline-offset-4 hover:underline">
                {site.phone}
              </a>
            </li>
          </ul>
          <a
            href={site.googleBusiness}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg border border-line bg-cream px-5 font-semibold text-ink transition hover:border-green hover:bg-green-soft"
          >
            <Star aria-hidden="true" className="size-5 fill-orange text-orange" />
            {GOOGLE_RATING
              ? `${GOOGLE_RATING.value.toFixed(1)} on Google · ${GOOGLE_RATING.countLabel} reviews`
              : "See us on Google"}
          </a>
        </div>

        <div className="relative overflow-hidden rounded-[20px] border border-line bg-cream-dark shadow-[0_24px_60px_-24px_rgba(20,42,29,0.35)]">
          <iframe
            src={officeMapEmbedUrl}
            title={`Map of ${site.name}, ${fullAddress}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[4/3] w-full border-0"
          />
          <a
            href={site.googleBusiness}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-3 bottom-3 inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-ink shadow-md ring-1 ring-black/5 hover:bg-cream"
          >
            <MapPin aria-hidden="true" className="size-4 text-green" />
            Open in Google Maps
          </a>
        </div>
      </div>
    </Section>
  );
}
