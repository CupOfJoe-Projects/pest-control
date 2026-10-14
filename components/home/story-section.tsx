import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/section";
import { SlotImage } from "@/components/site/slot-image";
import { CountUp } from "@/components/site/count-up";
import { EstBadge } from "@/components/site/est-badge";
import { getCurrentYear } from "@/lib/year";
import { images } from "@/lib/images";

export async function StorySection() {
  const yearsInBusiness = (await getCurrentYear()) - 1959;
  return (
    <section aria-labelledby="story-title" className="bg-white py-16 md:py-24">
      <Container className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
        <div data-reveal>
          <p className="font-heading leading-none font-extrabold tracking-tighter text-green">
            <CountUp to={yearsInBusiness} className="text-[6.5rem] sm:text-[9rem] lg:text-[11rem]" />
            <span className="ml-3 text-3xl tracking-tight text-orange sm:text-5xl">years</span>
          </p>
          <h2 id="story-title" className="mt-4 text-3xl leading-tight font-extrabold text-ink sm:text-4xl">
            The family business that outlasted everyone
          </h2>
          {/* TODO(owner): Confirm founder name and family history, then make this specific. */}
          <div className="mt-5 space-y-4 text-lg text-ink/80">
            <p>
              It started in Lakeland in 1959 with one truck and a simple rule: do the job right and treat people like
              neighbors.
            </p>
            <p>
              Plenty of pest companies have come and gone since. We are still here, still family owned, and still
              answering our own phone.
            </p>
          </div>
          <Link
            href="/about"
            className="mt-7 inline-flex min-h-12 items-center gap-1.5 font-semibold text-green underline underline-offset-4 hover:no-underline"
          >
            Read our story <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div data-reveal className="relative">
          <div className="overflow-hidden rounded-[16px] shadow-xl">
            <SlotImage slot={images.truck} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />
          </div>
          <EstBadge className="absolute -top-6 -right-3 size-28 drop-shadow-md sm:-right-6 sm:size-36" />
        </div>
      </Container>
    </section>
  );
}
