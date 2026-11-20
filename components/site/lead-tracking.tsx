"use client";

import { useEffect } from "react";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import { SERVICE_EVENT } from "./price-action";

/** Where on the page a click came from: header, footer, phone action bar, or the section's name. */
function locationOf(el: Element): string {
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  const nav = el.closest("nav[aria-label]");
  if (nav) return nav.getAttribute("aria-label")!.toLowerCase();
  const section = el.closest("section");
  const name = section?.getAttribute("aria-labelledby")?.replace(/-title$/, "") || section?.id;
  return name || "page";
}

/**
 * Sends Google Analytics events for lead clicks anywhere on the site, by looking
 * at what each clicked link points to. New call buttons, quote links, and
 * service links are tracked automatically with no extra code.
 */
export function LeadTracking() {
  useEffect(() => {
    let chatTracked = false;

    function onClick(event: MouseEvent) {
      const path = event.composedPath();

      // The chat bubble lives in GoHighLevel's shadow root; count the first open per page view.
      const bubble = path.some((n) => n instanceof Element && n.classList.contains("lc_text-widget--bubble"));
      if (bubble) {
        if (!chatTracked) track("chat_open", { page: window.location.pathname });
        chatTracked = true;
        return;
      }

      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href")!;
      const location = locationOf(link);

      if (href.startsWith("tel:")) return track("contact_click", { method: "call", location });
      if (href.startsWith("sms:") || href.startsWith(site.textUrl)) return track("contact_click", { method: "text", location });
      if (href.startsWith("mailto:")) return track("contact_click", { method: "email", location });
      if (href === "#quote" || href.startsWith("/contact")) return track("quote_click", { location });
      const service = href.match(/^\/services\/([a-z0-9-]+)/);
      if (service) return track("service_click", { service: service[1], location });
    }

    function onCoupon(event: Event) {
      track("claim_coupon", { coupon: (event as CustomEvent<string>).detail });
    }

    // Capture phase, so a widget that stops the click from bubbling cannot hide it.
    document.addEventListener("click", onClick, true);
    window.addEventListener(SERVICE_EVENT, onCoupon);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(SERVICE_EVENT, onCoupon);
    };
  }, []);

  return null;
}
