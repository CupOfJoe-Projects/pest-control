import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Icon } from "@/components/icons";
import type { Pest } from "@/content/pests";
import { cn } from "@/lib/utils";

export function PestGrid({ pests, className }: { pests: Pest[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4", className)}>
      {pests.map((pest) => (
        <li key={pest.slug}>
          <Link
            href={`/pests/${pest.slug}`}
            className="group flex h-full min-h-16 flex-col items-start gap-2.5 rounded-lg border border-line bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:border-green/40 hover:shadow-md sm:flex-row sm:items-center sm:p-4"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green-soft text-green transition group-hover:bg-green group-hover:text-cream sm:size-12">
              <Icon name={pest.icon} className="size-6 sm:size-7" />
            </span>
            <span className="font-heading text-[1.05rem] leading-tight font-bold text-ink sm:text-lg">{pest.name}</span>
            <ChevronRight
              aria-hidden="true"
              className="ml-auto hidden size-5 shrink-0 text-muted-ink transition group-hover:translate-x-0.5 group-hover:text-green sm:block"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
