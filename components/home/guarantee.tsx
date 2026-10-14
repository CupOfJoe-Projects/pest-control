import { HandHeart, MessageSquareText, RotateCcw } from "lucide-react";
import { Container } from "@/components/site/section";
import { SlotImage } from "@/components/site/slot-image";
import { images } from "@/lib/images";

// TODO(owner): Confirm the exact guarantee wording before launch.
const points = [
  { icon: RotateCcw, title: "Free callbacks", text: "If pests come back between visits, so do we, at no charge." },
  { icon: MessageSquareText, title: "No surprises", text: "Your tech explains what they found and what they will use before treating." },
  { icon: HandHeart, title: "Safe for your crew", text: "Pet and family safe products, applied where pests live." },
];

export function Guarantee() {
  return (
    <section aria-labelledby="guarantee-title" className="relative isolate overflow-hidden py-20 text-cream md:py-32">
      <SlotImage slot={images.familyHome} fill sizes="100vw" className="-z-20 object-[70%_center]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-green-dark/80 md:bg-transparent md:bg-gradient-to-r md:from-green-dark/95 md:via-green-dark/60 md:to-green-dark/5" />
      <Container>
        <div data-reveal className="max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange" />
            The McDonald guarantee
          </p>
          <h2 id="guarantee-title" className="text-4xl leading-[1.05] font-extrabold sm:text-6xl">
            If they come back, so do we. <span className="text-orange">Free.</span>
          </h2>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {points.map(({ icon: Icon, title, text }) => (
            <li key={title} data-reveal className="rounded-[16px] bg-green-dark/75 p-6 ring-1 ring-cream/20 backdrop-blur-md">
              <Icon aria-hidden="true" className="size-8 text-orange" />
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-1.5 text-cream/85">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
