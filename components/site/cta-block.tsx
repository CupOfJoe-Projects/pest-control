import { CallButton, QuoteButton } from "./cta-buttons";
import { OfferTag } from "./coupon";
import { Container } from "./section";
import { cn } from "@/lib/utils";

export function CtaBlock({
  title = "Ready to be pest free?",
  text = "Call now or ask for a free quote. Local, family owned, and here since 1959.",
  className,
}: {
  title?: string;
  text?: string;
  className?: string;
}) {
  return (
    <section aria-label="Contact us" className={cn("py-12 sm:py-16", className)}>
      <Container>
        <div className="flex flex-col gap-6 rounded-lg bg-green px-6 py-9 text-cream sm:px-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="font-heading text-2xl font-extrabold sm:text-3xl">{title}</p>
            <p className="mt-2 text-lg text-cream/85">{text}</p>
            <OfferTag className="mt-4" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
            <QuoteButton size="2xl" />
            <CallButton size="2xl" variant="outline-cream" />
          </div>
        </div>
      </Container>
    </section>
  );
}
