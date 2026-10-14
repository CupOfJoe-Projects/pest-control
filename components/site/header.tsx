import Link from "next/link";
import { Phone } from "lucide-react";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { QuoteButton } from "./cta-buttons";
import { Container } from "./section";
import { mainNav, site } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur supports-backdrop-filter:bg-cream/85">
      <Container className="flex h-16 items-center gap-4 sm:h-[4.5rem]">
        <Logo />

        <nav aria-label="Main" className="ml-6 hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-[0.95rem] font-medium text-ink/85 transition-colors hover:bg-green-soft hover:text-green"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-md px-2 py-2 font-heading text-lg font-bold text-green hover:underline md:flex"
          >
            <Phone aria-hidden="true" className="size-5" />
            {site.phone}
          </a>
          <QuoteButton size="lg" className="hidden h-11 px-4 text-[0.95rem] md:inline-flex" />

          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phone}`}
            className="flex size-12 items-center justify-center rounded-lg text-green hover:bg-green-soft md:hidden"
          >
            <Phone aria-hidden="true" className="size-6" />
          </a>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
