import { BadgeCheck, HeartHandshake, PawPrint, ShieldCheck } from "lucide-react";
import { Container } from "@/components/site/section";

// TODO(owner): Confirm each claim (licensed and insured, pet safe products, satisfaction guarantee).
const items = [
  { icon: HeartHandshake, label: "Family owned since 1959" },
  { icon: ShieldCheck, label: "Licensed and insured" },
  { icon: PawPrint, label: "Pet and family safe" },
  { icon: BadgeCheck, label: "Satisfaction guaranteed" },
];

export function TrustStrip() {
  return (
    <section aria-label="Why choose us" className="border-b border-line bg-white">
      <Container>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 py-7 md:grid-cols-4 md:py-8">
          {items.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-green-soft text-green">
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <span className="text-[0.95rem] leading-snug font-semibold text-ink sm:text-base">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
