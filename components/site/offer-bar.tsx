import { TICKER_ITEMS, site } from "@/content/site";
import { MarqueeTrack } from "./marquee-track";

/** Slim scrolling ticker above the header. Static for reduced motion. */
export function OfferBar() {
  // Enough copies that one half of the track is wider than any screen.
  const items = Array.from({ length: 3 }, () => TICKER_ITEMS).flat();
  const half = () => (
    <ul className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={i} className="flex items-center whitespace-nowrap">
          <span className="px-5">{item}</span>
          <span aria-hidden="true" className="text-orange">
            ●
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative z-50 bg-green-dark text-[0.8rem] font-semibold tracking-wide text-cream sm:text-sm">
      {/* One clean sentence for screen readers instead of the repeating ticker. */}
      <p className="sr-only">
        {TICKER_ITEMS.join(". ")}. <a href={site.phoneHref}>Call {site.phone}</a>
      </p>
      <a href={site.phoneHref} aria-hidden="true" tabIndex={-1} className="marquee marquee-fade block py-2">
        <MarqueeTrack duration="45s">{half()}</MarqueeTrack>
      </a>
    </div>
  );
}
