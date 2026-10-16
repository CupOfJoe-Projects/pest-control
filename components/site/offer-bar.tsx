import { OFFER, SHOW_OFFER, site } from "@/content/site";

/**
 * Quiet static bar above the header. It used to scroll as a ticker, which felt
 * like too much on top of the moving reviews. Phones get just the offer (the
 * phone number is already in the header and bottom bar); wider screens add the
 * phone and a couple of trust points.
 */
export function OfferBar() {
  const extras = ["Family owned since 1959", site.sameDay];

  return (
    <div
      className={`relative z-50 bg-green-dark px-4 py-2${SHOW_OFFER ? "" : " hidden sm:block"} text-center text-[0.8rem] font-medium text-cream sm:text-sm`}
    >
      <p className="flex items-center justify-center gap-x-3">
        {SHOW_OFFER && <span className="font-semibold">{OFFER.bar.replace(/\.$/, "")}</span>}
        {extras.map((item) => (
          <span key={item} className="hidden items-center gap-x-3 lg:inline-flex">
            <span aria-hidden="true" className="text-orange">
              •
            </span>
            {item}
          </span>
        ))}
        <span aria-hidden="true" className="hidden text-orange sm:inline">
          •
        </span>
        <a
          href={site.phoneHref}
          className="hidden font-semibold whitespace-nowrap underline underline-offset-4 hover:no-underline sm:inline"
        >
          Call {site.phone}
        </a>
      </p>
    </div>
  );
}
