import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/section";
import { PhotoPlaceholder } from "@/components/site/photo-placeholder";
import { getCurrentYear } from "@/lib/year";

export async function StorySection() {
  const yearsInBusiness = (await getCurrentYear()) - 1959;
  return (
    <section aria-labelledby="story-title" className="relative overflow-hidden bg-green py-16 text-cream sm:py-24">
      <Container className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
        <div>
          <p
            aria-hidden="true"
            className="font-heading text-[7rem] leading-[0.85] font-extrabold tracking-tighter text-orange sm:text-[10rem] lg:text-[12rem]"
          >
            1959
          </p>
          <h2 id="story-title" className="mt-4 text-3xl leading-tight font-extrabold sm:text-4xl">
            The family business that outlasted everyone
          </h2>
          {/* TODO(owner): Confirm founder name and family history, then make this specific. */}
          <div className="mt-5 space-y-4 text-lg text-cream/85">
            <p>
              It started in Lakeland in 1959 with one truck and a simple rule: do the job right and treat people like
              neighbors.
            </p>
            <p>
              {yearsInBusiness} years later, plenty of pest companies have come and gone. We are still here, still
              family owned, and still answering our own phone. Generations of Polk County families have trusted us, and
              we run it the same way today.
            </p>
          </div>
          <Link
            href="/about"
            className="mt-7 inline-flex min-h-12 items-center gap-1.5 font-semibold text-cream underline underline-offset-4 hover:no-underline"
          >
            Read our story <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        {/* TODO(owner): Family photo, then and now. 4:3, at least 1600x1200. */}
        <PhotoPlaceholder
          label="The McDonald family, then and now"
          tone="cream"
          className="aspect-[4/3] shadow-xl"
        />
      </Container>
    </section>
  );
}
