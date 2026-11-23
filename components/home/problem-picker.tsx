import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { Icon } from "@/components/icons";
import { Section, SectionHeading } from "@/components/site/section";
import { commonPests } from "@/content/pests";
import { TextUsLink } from "@/components/site/text-us-link";

export function ProblemPicker() {
  return (
    <Section id="pests" labelledBy="picker-title" className="grain bg-cream">
      <div data-reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          id="picker-title"
          eyebrow="Start here"
          title="What are you seeing?"
          intro="Tap the one that sounds like your house. We will show you the signs, the causes, and what we do about it."
        />
        <Link
          href="/pests"
          className="inline-flex min-h-12 shrink-0 items-center gap-1.5 font-semibold text-green underline-offset-4 hover:underline"
        >
          All pests <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {commonPests.map((pest) => (
          <li key={pest.slug} data-reveal>
            <Link
              href={`/pests/${pest.slug}`}
              className="card-lift group relative flex h-full flex-col rounded-[16px] bg-white p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-6"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-soft text-green transition group-hover:bg-green group-hover:text-cream sm:size-16">
                <Icon name={pest.icon} className="size-7 sm:size-9" />
              </span>
              <span className="mt-3 min-w-0 sm:mt-0">
                <span className="block font-heading text-lg leading-tight font-extrabold text-ink sm:text-xl">
                  {pest.name}
                </span>
                <span className="mt-1 block text-sm leading-snug text-muted-ink sm:text-base">{pest.hook}</span>
                <span className="mt-2 hidden items-center gap-1 text-sm font-semibold text-green opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100 sm:flex">
                  Signs, causes, and what we do <ArrowRight aria-hidden="true" className="size-3.5" />
                </span>
              </span>
            </Link>
          </li>
        ))}

        {/* The differentiator: no idea what it is? Send a photo. */}
        <li data-reveal className="col-span-2 lg:col-span-1">
          <TextUsLink
            className="group flex h-full items-center gap-4 rounded-[16px] bg-orange p-5 text-ink shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl sm:gap-5 sm:p-6"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-ink text-orange sm:size-16">
              <Camera aria-hidden="true" className="size-7 sm:size-8" />
            </span>
            <span>
              <span className="block font-heading text-lg leading-tight font-extrabold sm:text-xl">
                Not sure what it is?
              </span>
              <span className="mt-1 flex items-center gap-1 font-semibold">
                Text us a photo <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-1" />
              </span>
            </span>
          </TextUsLink>
        </li>
      </ul>
    </Section>
  );
}
