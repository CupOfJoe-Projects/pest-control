import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Container } from "./section";
import { CallButton, QuoteButton } from "./cta-buttons";

export type Crumb = { label: string; href?: string };

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  intro,
  aside,
  showCtas = true,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  aside?: ReactNode;
  showCtas?: boolean;
}) {
  return (
    <section aria-labelledby="page-title" className="border-b border-line">
      <Container className="grid items-center gap-8 py-8 sm:py-12 md:grid-cols-[1.4fr_0.6fr] lg:py-16">
        <div>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-ink">
              {[{ label: "Home", href: "/" }, ...crumbs].map((c, i, all) => (
                <li key={c.label} className="flex items-center gap-1">
                  {c.href && i < all.length - 1 ? (
                    <Link href={c.href} prefetch={false} className="underline-offset-4 hover:text-green hover:underline">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-medium text-ink">
                      {c.label}
                    </span>
                  )}
                  {i < all.length - 1 && <ChevronRight aria-hidden="true" className="size-3.5" />}
                </li>
              ))}
            </ol>
          </nav>
          {eyebrow && (
            <p className="mt-5 flex items-center gap-2 text-sm font-semibold tracking-wide text-green uppercase">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange" />
              {eyebrow}
            </p>
          )}
          <h1 id="page-title" className="mt-3 text-4xl leading-[1.05] font-extrabold text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {intro && <div className="mt-4 max-w-2xl text-lg text-ink/80 sm:text-xl">{intro}</div>}
          {showCtas && (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <QuoteButton size="2xl" />
              <CallButton size="2xl" className="bg-cream" />
            </div>
          )}
        </div>
        {aside && <div className="hidden md:block">{aside}</div>}
      </Container>
    </section>
  );
}
