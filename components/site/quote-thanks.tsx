"use client";

import { Camera, CircleCheck } from "lucide-react";
import { CALLBACK_MINUTES, site } from "@/content/site";
import { isOfficeOpen, nextOpenLabel } from "@/lib/office-hours";
import { cn } from "@/lib/utils";
import { TextUsLink } from "@/components/site/text-us-link";

/**
 * Thank you state for both quote forms. Sets expectations: a call back soon
 * during office hours, first thing next business day after hours.
 */
export function QuoteThanks({ firstName, compact = false }: { firstName?: string; compact?: boolean }) {
  const open = isOfficeOpen();
  const when = open
    ? CALLBACK_MINUTES
      ? `We'll call you within ${CALLBACK_MINUTES} minutes.`
      : "We'll call you shortly."
    : `We'll call you first thing ${nextOpenLabel()}.`;
  const link = "font-semibold whitespace-nowrap text-green underline underline-offset-4";

  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center text-center",
        compact ? "gap-3 py-4 md:flex-row md:text-left" : "min-h-80 justify-center py-8",
      )}
    >
      <CircleCheck aria-hidden="true" className={cn("shrink-0 text-green", compact ? "size-10" : "size-14")} />
      <div className={cn(!compact && "mt-4")}>
        <p className={cn("font-heading font-extrabold text-ink", compact ? "text-xl" : "text-2xl")}>
          Thanks{firstName ? `, ${firstName}` : ""}! {when}
        </p>
        <p className={cn("text-muted-ink", compact ? "mt-1" : "mx-auto mt-2 max-w-sm text-lg")}>
          {open ? (
            <>
              A real person from our Bartow office will call. Need us sooner? Call{" "}
              <a href={site.phoneHref} className={link}>
                {site.phone}
              </a>
              .
            </>
          ) : (
            <>
              Need help now?{" "}
              <TextUsLink className={cn(link, "inline-flex items-center gap-1")}>
                <Camera aria-hidden="true" className="size-4" />
                Text us a photo
              </TextUsLink>{" "}
              and we will take a look.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
