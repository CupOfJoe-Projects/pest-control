import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";
import { PestGrid } from "@/components/site/pest-grid";
import { commonPests } from "@/content/pests";

export function PestSection() {
  return (
    <Section id="pests" labelledBy="pests-title">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          id="pests-title"
          eyebrow="Pest library"
          title="What's bugging you?"
          intro="Pick a pest to see the signs, why it shows up in Florida, and what to do about it."
        />
        <Link
          href="/pests"
          className="inline-flex min-h-12 items-center gap-1.5 font-semibold text-green underline-offset-4 hover:underline"
        >
          See all pests <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
      <PestGrid pests={commonPests} className="mt-8" />
    </Section>
  );
}
