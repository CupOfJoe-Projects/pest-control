"use client";

import Script from "next/script";
import { useEffect } from "react";

/**
 * On phones the GHL bubble sits 20px from the bottom, right on top of the
 * Call / Text / Quote bar (56px tall, md:hidden). The widget lives in a shadow
 * root, so page CSS cannot reach it; this style is added inside that root.
 */
const PHONE_OFFSET = `
@media (max-width: 767px) {
  .lc_text-widget, .lc_text-widget--bubble {
    bottom: calc(72px + env(safe-area-inset-bottom)) !important;
  }
}`;

function liftAboveActionBar() {
  const root = document.querySelector("chat-widget")?.shadowRoot;
  if (!root || root.querySelector("style[data-mcd-offset]")) return Boolean(root);
  const style = document.createElement("style");
  style.dataset.mcdOffset = "";
  style.textContent = PHONE_OFFSET;
  root.appendChild(style);
  return true;
}

/**
 * GoHighLevel (LeadConnector) chat bubble, bottom right. Loaded in browser idle
 * time so it never slows the first paint. Colors, greeting, and hours are set
 * in GHL, not here.
 */
export function ChatWidget() {
  useEffect(() => {
    if (liftAboveActionBar()) return;
    // The widget builds its shadow root after the loader runs; wait for it.
    const observer = new MutationObserver(() => {
      if (liftAboveActionBar()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="68cf3025f6dad85ecdf9c863"
      strategy="lazyOnload"
    />
  );
}
