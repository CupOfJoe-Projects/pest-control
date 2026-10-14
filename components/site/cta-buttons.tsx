"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

type Size = "xl" | "2xl" | "default" | "lg";

/** Pages that render their own quote form, so the quote CTA can scroll to it. */
function hasQuoteForm(pathname: string) {
  return pathname === "/" || pathname === "/contact" || pathname.startsWith("/services/");
}

export function useQuoteHref() {
  const pathname = usePathname();
  return hasQuoteForm(pathname) ? "#quote" : "/contact#quote";
}

export function QuoteButton({
  className,
  size = "xl",
  label = "Get a Free Quote",
}: {
  className?: string;
  size?: Size;
  label?: string;
}) {
  const href = useQuoteHref();
  return (
    <Link href={href} className={cn(buttonVariants({ variant: "cta", size }), className)}>
      {label}
    </Link>
  );
}

export function CallButton({
  className,
  size = "xl",
  variant = "outline-green",
}: {
  className?: string;
  size?: Size;
  variant?: "outline-green" | "outline-cream" | "default";
}) {
  return (
    <a href={site.phoneHref} className={cn(buttonVariants({ variant, size }), className)}>
      <Phone aria-hidden="true" />
      Call {site.phone}
    </a>
  );
}
