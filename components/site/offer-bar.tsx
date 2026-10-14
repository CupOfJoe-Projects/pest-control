import { OFFER, SHOW_OFFER, site } from "@/content/site";

export function OfferBar() {
  if (!SHOW_OFFER) return null;
  return (
    <div className="bg-green px-4 py-2 text-center text-sm text-cream">
      <p>
        <span className="font-semibold">{OFFER.bar}</span>{" "}
        <a href={site.phoneHref} className="font-semibold whitespace-nowrap underline underline-offset-4 hover:no-underline">
          Call {site.phone}
        </a>
      </p>
    </div>
  );
}
