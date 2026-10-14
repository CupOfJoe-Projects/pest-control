import { FileText, PhoneCall } from "lucide-react";
import { Section, SectionHeading } from "./section";
import { SlotImage } from "./slot-image";
import { images, type ImageSlot } from "@/lib/images";
import { cn } from "@/lib/utils";

type Step = { title: string; text: string; image?: ImageSlot; icon?: typeof PhoneCall };

const steps: Step[] = [
  { title: "Call or request a quote", text: "We get back to you fast.", icon: PhoneCall },
  {
    title: "We inspect and make a plan",
    text: "A certified tech inspects and builds a plan for your property.",
    image: images.inspection,
  },
  {
    title: "We treat and follow up",
    text: "Regular follow ups with prevention tips, so they stay gone.",
    image: images.yard,
  },
  // TODO(owner): Confirm service reports go out by text or email.
  { title: "You get a report", text: "A service report by text or email after every visit.", icon: FileText },
];

export function HowItWorks({ className }: { className?: string }) {
  return (
    <Section labelledBy="how-title" className={className}>
      <div data-reveal>
        <SectionHeading id="how-title" eyebrow="How a visit works" title="Simple, start to finish" />
      </div>
      <ol className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* Connecting line behind the numbers on wide screens. */}
        <span aria-hidden="true" className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-0.5 bg-line lg:block" />
        {steps.map((step, i) => {
          const StepIcon = step.icon;
          return (
            // Phones: a compact row (number, text, small thumbnail). Wider screens: a card with the image on top.
            <li
              key={step.title}
              data-reveal
              className="relative grid grid-cols-[auto_1fr_auto] items-start gap-4 sm:flex sm:flex-col sm:items-start lg:items-center lg:text-center"
            >
              <span
                aria-hidden="true"
                className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-orange font-heading text-xl font-extrabold text-ink ring-8 ring-[var(--step-ring,var(--brand-cream))]"
              >
                {i + 1}
              </span>
              <div className="order-3 w-20 overflow-hidden rounded-xl border border-line bg-white sm:order-none sm:mt-5 sm:w-full sm:rounded-[16px]">
                {step.image ? (
                  <SlotImage
                    slot={step.image}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80px"
                    compact
                    className="aspect-square w-full sm:aspect-[4/3]"
                  />
                ) : (
                  <div className={cn("flex aspect-square w-full items-center justify-center bg-green-soft text-green sm:aspect-[4/3]")}>
                    {StepIcon && <StepIcon aria-hidden="true" className="size-8 sm:size-14" strokeWidth={1.5} />}
                  </div>
                )}
              </div>
              <div className="pt-1 sm:pt-0">
                <h3 className="text-lg font-bold text-ink sm:mt-5 sm:text-xl">{step.title}</h3>
                <p className="mt-1 text-muted-ink sm:mt-1.5">{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
