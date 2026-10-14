import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Icon } from "@/components/icons";
import type { Service } from "@/content/services";

export function ServiceCard({ service, title }: { service: Service; title?: string }) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:shadow-lg sm:p-7">
      <span className="flex size-14 items-center justify-center rounded-lg bg-green text-cream">
        <Icon name={service.icon} className="size-7" />
      </span>
      <h3 className="mt-5 text-2xl font-extrabold text-ink">{title ?? service.audience ?? service.name}</h3>
      <p className="mt-2 text-muted-ink">{service.short}</p>
      <ul className="mt-5 space-y-2.5">
        {service.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-ink">
            <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-green" />
            {h}
          </li>
        ))}
      </ul>
      <Link
        href={`/services/${service.slug}`}
        aria-label={`Learn more about ${service.name}`}
        className="mt-auto inline-flex min-h-12 items-center gap-1.5 pt-6 font-semibold text-green after:absolute after:inset-0 after:rounded-lg group-hover:underline underline-offset-4"
      >
        Learn more
        <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}
