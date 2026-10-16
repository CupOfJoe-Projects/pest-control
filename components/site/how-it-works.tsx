import { FileText, PhoneCall, Search, SprayCan } from "lucide-react";
import { Section, SectionHeading } from "./section";

const steps = [
  { icon: PhoneCall, title: "Call or request a quote", text: "We get back to you fast." },
  { icon: Search, title: "We inspect and make a plan", text: "A certified tech checks your property and builds a plan for it." },
  { icon: SprayCan, title: "We treat and follow up", text: "Regular follow ups with prevention tips, so they stay gone." },
  { icon: FileText, title: "You get a report", text: "A detailed service report after every visit, with tips to keep pests out." },
];

export function HowItWorks({ className }: { className?: string }) {
  return (
    <Section labelledBy="how-title" className={className}>
      <div data-reveal>
        <SectionHeading id="how-title" eyebrow="How a visit works" title="Simple, start to finish" />
      </div>

      <div data-reveal className="draw-on-reveal relative mt-14">
        {/* Dashed line that draws in when the steps scroll into view. Wide screens only. */}
        <svg
          aria-hidden="true"
          className="draw-line absolute top-12 right-[12.5%] left-[12.5%] hidden h-1 w-3/4 overflow-visible lg:block"
          preserveAspectRatio="none"
          viewBox="0 0 100 2"
        >
          <line
            x1="0"
            y1="1"
            x2="100"
            y2="1"
            stroke="var(--brand-green)"
            strokeOpacity="0.55"
            strokeWidth="2.5"
            strokeDasharray="4 6"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="grid grid-cols-[auto_1fr] items-start gap-5 lg:flex lg:flex-col lg:items-center lg:text-center">
              <span className="relative flex size-20 shrink-0 items-center justify-center rounded-full bg-green-soft text-green ring-8 ring-cream lg:size-24">
                <Icon aria-hidden="true" className="size-8 lg:size-10" />
              </span>
              <div className="lg:mt-6">
                <span
                  aria-hidden="true"
                  className="block font-heading text-5xl leading-none font-extrabold tracking-[-0.04em] text-orange tabular-nums lg:text-6xl"
                >
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-xl font-bold text-ink">{title}</h3>
                <p className="mt-1.5 text-muted-ink">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
