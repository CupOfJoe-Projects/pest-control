import { Section, SectionHeading } from "./section";

const steps = [
  {
    title: "Call or request a quote",
    text: "We get back to you fast.",
  },
  {
    title: "We inspect and make a plan",
    text: "A certified tech inspects and builds a plan for your property.",
  },
  {
    title: "We keep it handled",
    text: "Regular follow ups with a service report and prevention tips.",
  },
];

export function HowItWorks({ className }: { className?: string }) {
  return (
    <Section labelledBy="how-title" className={className}>
      <SectionHeading id="how-title" eyebrow="How it works" title="Three simple steps" />
      <ol className="mt-10 grid gap-5 md:grid-cols-3 md:gap-8">
        {steps.map((step, i) => (
          <li key={step.title} className="relative flex gap-4 md:flex-col">
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-orange font-heading text-xl font-extrabold text-ink md:size-14 md:text-2xl"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="text-xl font-bold text-ink">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-1.5 text-muted-ink">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
