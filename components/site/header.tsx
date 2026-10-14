import Link from "next/link";
import { Phone } from "lucide-react";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { QuoteButton } from "./cta-buttons";
import { Container } from "./section";
import { HeaderShell } from "./header-shell";
import { mainNav, site } from "@/content/site";

// Text colors flip to cream while the header sits over the homepage hero.
const onHero = "group-data-[over=true]:text-cream";

export function Header() {
  return (
    <HeaderShell>
      <Container className="flex h-16 items-center gap-4 sm:h-[4.5rem]">
        <Logo onHero />

        <nav aria-label="Main" className="ml-6 hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-[0.95rem] font-medium text-ink/85 transition-colors hover:bg-green-soft hover:text-green group-data-[over=true]:hover:bg-cream/15 ${onHero}`}
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
            className={`hidden items-center gap-2 rounded-md px-2 py-2 font-heading text-lg font-bold text-green hover:underline md:flex ${onHero}`}
          >
            <Phone aria-hidden="true" className="size-5" />
            {site.phone}
          </a>
          <QuoteButton size="lg" className="hidden h-11 px-4 text-[0.95rem] md:inline-flex" />

          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phone}`}
            className={`flex size-12 items-center justify-center rounded-lg text-green hover:bg-green-soft group-data-[over=true]:hover:bg-cream/15 md:hidden ${onHero}`}
          >
            <Phone aria-hidden="true" className="size-6" />
          </a>
          <MobileNav />
        </div>
      </Container>
    </HeaderShell>
  );
}
