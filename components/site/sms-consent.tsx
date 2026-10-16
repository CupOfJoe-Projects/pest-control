import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Text message consent under every form that takes a phone number. The first
 * two sentences are the owner's wording from the old site's forms.
 */
export function SmsConsent({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs leading-relaxed text-muted-ink", className)}>
      McDonald Exterminators does not share or sell your data to third parties. By providing a telephone number and
      submitting the form, you are consenting to be contacted by our team via SMS text message and agreeing to our{" "}
      <Link href="/privacy" className="underline underline-offset-2">
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link href="/terms" className="underline underline-offset-2">
        Terms
      </Link>
      . Message and data rates may apply. Reply STOP to opt out.
    </p>
  );
}
