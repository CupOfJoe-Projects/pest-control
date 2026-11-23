"use client";

import Link from "next/link";
import { ClipboardList, MessageSquareText, Phone } from "lucide-react";
import { site } from "@/content/site";
import { useQuoteHref } from "./cta-buttons";
import { TextUsLink } from "@/components/site/text-us-link";

/** Sticky bottom bar on phones: Call, Text, Quote. */
export function MobileActionBar() {
  const quoteHref = useQuoteHref();
  const item =
    "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[0.8rem] font-semibold";

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-green-dark bg-green pb-[env(safe-area-inset-bottom)] text-cream shadow-[0_-4px_16px_rgba(0,0,0,0.12)] md:hidden"
    >
      <a href={site.phoneHref} className={item}>
        <Phone aria-hidden="true" className="size-5" />
        Call
      </a>
      <TextUsLink className={`${item} border-x border-cream/15`}>
        <MessageSquareText aria-hidden="true" className="size-5" />
        Text
      </TextUsLink>
      <Link href={quoteHref} className={`${item} bg-orange text-ink`}>
        <ClipboardList aria-hidden="true" className="size-5" />
        Quote
      </Link>
    </nav>
  );
}
