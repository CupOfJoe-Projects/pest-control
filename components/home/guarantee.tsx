import { HandHeart, MessageSquareText, RotateCcw } from "lucide-react";
import { Container } from "@/components/site/section";
import { SlotImage } from "@/components/site/slot-image";
import { EstBadge } from "@/components/site/est-badge";
import { images } from "@/lib/images";

// Matches the old site: "If they come back, so do we, at no extra cost",
// "No unexpected charges", and "Family & Pet Safe".
const points = [
  { icon: RotateCcw, title: "Free callbacks", text: "If pests come back between visits, so do we, at no extra cost." },
  { icon: MessageSquareText, title: "No surprises", text: "Your tech explains what they found and what they will use before treating." },
  { icon: HandHeart, title: "Safe for your crew", text: "Pet and family safe products, applied where pests live." },
];

export function Guarantee() {
  return (
    <section aria-labelledby="guarantee-title" className="grain bg-cream py-16 md:py-24">
      <Container className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
        <div>
          <div data-reveal>
            <p className="eyebrow text-green">The McDonald guarantee</p>
            <h2
              id="guarantee-title"
              className="mt-4 text-[2.25rem] leading-[1] font-extrabold text-ink md:text-[3.5rem] md:leading-[0.95]"
            >
              If they come back, so do we. <span className="text-green">Free.</span>
            </h2>
          </div>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {points.map(({ icon: Icon, title, text }) => (
              <li key={title} data-reveal className="flex gap-4 py-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-green-soft text-green">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span>
                  <span className="block text-lg font-bold text-ink">{title}</span>
                  <span className="mt-0.5 block text-muted-ink">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className="relative">
          {images.familyHome.src ? (
            <div className="overflow-hidden rounded-[24px] shadow-[0_30px_60px_-30px_rgba(20,42,29,0.45)]">
              <SlotImage
                slot={images.familyHome}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[4/5] h-auto w-full object-[62%_center] md:aspect-[4/5]"
              />
            </div>
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center rounded-[24px] bg-green">
              <EstBadge className="size-56" />
            </div>
          )}
          <EstBadge className="absolute -bottom-8 -left-6 size-28 drop-shadow-lg md:size-36" />
        </div>
      </Container>
    </section>
  );
}
