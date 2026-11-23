"use client";

import type { RefObject } from "react";
import Link from "next/link";
import { MessageSquareText, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mainNav, site } from "@/content/site";
import { services } from "@/content/services";
import { useQuoteHref } from "./cta-buttons";
import { TextUsLink } from "@/components/site/text-us-link";

/** Loaded on first tap of the menu button, so pages do not ship dialog code up front. */
export default function MobileNavPanel({
  open,
  onOpenChange,
  returnFocusRef,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}) {
  const quoteHref = useQuoteHref();
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        finalFocus={returnFocusRef}
        className="w-[85%] max-w-sm overflow-y-auto bg-cream p-0"
      >
        <div className="border-b border-line px-5 py-4">
          <SheetTitle className="font-heading text-lg font-bold">Menu</SheetTitle>
        </div>
        <nav aria-label="Mobile" className="px-3">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex min-h-12 items-center rounded-md px-3 text-lg font-semibold text-ink hover:bg-green-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={close}
                className="flex min-h-12 items-center rounded-md px-3 text-lg font-semibold text-ink hover:bg-green-soft"
              >
                Contact
              </Link>
            </li>
          </ul>
          <p className="mt-4 px-3 text-xs font-semibold tracking-wide text-muted-ink uppercase">Services</p>
          <ul className="mt-1">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  onClick={close}
                  className="flex min-h-11 items-center rounded-md px-3 text-base text-ink/85 hover:bg-green-soft"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto grid gap-3 border-t border-line p-5">
          <Link href={quoteHref} onClick={close} className={cn(buttonVariants({ variant: "cta", size: "xl" }), "w-full")}>
            Get a Free Quote
          </Link>
          <a href={site.phoneHref} className={cn(buttonVariants({ variant: "outline-green", size: "xl" }), "w-full")}>
            <Phone aria-hidden="true" />
            Call {site.phone}
          </a>
          <TextUsLink className="flex min-h-12 items-center justify-center gap-2 text-base font-medium text-green underline underline-offset-4">
            <MessageSquareText aria-hidden="true" className="size-5" />
            Or text us a photo
          </TextUsLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}
