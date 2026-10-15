import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/section";
import { CountUp } from "@/components/site/count-up";
import { EstBadge } from "@/components/site/est-badge";
import { TIMELINE } from "@/content/site";
import { getCurrentYear } from "@/lib/year";

/** Deep green room: big counting numeral, the 1959 seal, and a short timeline. */
export async function StorySection() {
  const yearsInBusiness = (await getCurrentYear()) - 1959;
  return (
    <section aria-labelledby="story-title" className="grain bg-green py-16 text-cream md:py-24">
      <Container className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div data-reveal>
          <p className="eyebrow text-cream/85">Our story</p>
          <p className="mt-4 flex items-end gap-3 font-heading leading-[0.8] font-extrabold tracking-[-0.05em]">
            <CountUp to={yearsInBusiness} className="text-[7.5rem] text-cream tabular-nums sm:text-[10rem] lg:text-[12rem]" />
            <span className="pb-3 text-3xl tracking-[-0.03em] text-orange sm:text-5xl">years</span>
          </p>
          <h2 id="story-title" className="mt-6 text-[2.25rem] leading-[1] font-extrabold md:text-[3rem]">
            The family business that outlasted everyone
          </h2>
          {/* TODO(owner): Confirm founder name and family history, then make this specific. */}
          <p className="mt-5 max-w-xl text-lg text-cream/85">
            It started in Lakeland in 1959 with one truck and a simple rule: do the job right and treat people like
            neighbors. We are still family owned, and we still answer our own phone.
          </p>
          <Link
            href="/about"
            className="mt-7 inline-flex min-h-12 items-center gap-1.5 font-semibold text-cream underline decoration-orange decoration-2 underline-offset-[6px] hover:decoration-cream"
          >
            Read our story <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div data-reveal className="flex flex-col items-center gap-10 md:items-start">
          <EstBadge className="size-44 drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)] sm:size-56" />
          {/* TODO(owner): Confirm milestones in content/site.ts TIMELINE. */}
          <ol className="relative w-full space-y-6 border-l border-cream/20 pl-7">
            {TIMELINE.map((t) => (
              <li key={t.year} className="relative">
                <span aria-hidden="true" className="absolute top-1.5 -left-[2.0625rem] size-3 rounded-full bg-orange ring-4 ring-green" />
                <span className="block font-heading text-2xl font-extrabold tracking-[-0.03em] tabular-nums">{t.year}</span>
                <span className="block text-cream/80">{t.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
