/**
 * Google Analytics 4 lead events. Each event is pushed onto the dataLayer, which
 * gtag.js reads, so events sent before Analytics finishes loading still count.
 *
 * Events (see "Analytics events" in CLAUDE.md):
 * - generate_lead   a quote form was sent successfully (form, pest, service)
 * - contact_click   a call, text, or email link was clicked (method, location)
 * - chat_open       the live chat bubble was clicked
 * - quote_click     a "Get a quote" button or link was clicked (location)
 * - claim_coupon    a coupon's "Claim This Coupon" button was clicked (coupon)
 * - service_click   a link to a service page was clicked (service, location)
 */
export type LeadEvent =
  | "generate_lead"
  | "contact_click"
  | "chat_open"
  | "quote_click"
  | "claim_coupon"
  | "service_click";

type Params = Record<string, string | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: LeadEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v));
  window.dataLayer = window.dataLayer || [];
  // gtag.js only reads entries pushed as an `arguments` object, not a plain array.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  })("event", event, clean);
}
