import Link from "next/link";
import { Clock, Mail, MapPin, MessageSquareText, Phone } from "lucide-react";
import { Container } from "./section";
import { Logo } from "./logo";
import { CERTIFIED_OPERATOR_LICENSE, FDACS_LICENSE, fullAddress, mapsUrl, site } from "@/content/site";
import { services } from "@/content/services";
import { areas } from "@/content/areas";
import { getCurrentYear } from "@/lib/year";

export async function Footer() {
  const year = await getCurrentYear();
  const linkClass = "text-cream/85 underline-offset-4 hover:text-cream hover:underline";
  return (
    <footer className="bg-green-dark pt-14 pb-24 text-cream md:pb-10">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr] lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs font-heading text-xl font-extrabold tracking-[-0.02em]">{site.tagline}</p>
            <address className="mt-6 space-y-3 not-italic">
              <p className="font-semibold">{site.name}</p>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={`flex gap-2 ${linkClass}`}>
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </span>
              </a>
              <a href={site.phoneHref} className={`flex items-center gap-2 font-semibold ${linkClass}`}>
                <Phone aria-hidden="true" className="size-5 shrink-0" />
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className={`flex items-center gap-2 ${linkClass}`}>
                <Mail aria-hidden="true" className="size-5 shrink-0" />
                {/* Wrap before the @ on narrow columns, never mid word. */}
                <span>
                  {site.email.split("@")[0]}
                  <wbr />@{site.email.split("@")[1]}
                </span>
              </a>
              <a href={site.textUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 ${linkClass}`}>
                <MessageSquareText aria-hidden="true" className="size-5 shrink-0" />
                Text us
              </a>
              <p className="flex items-center gap-2 text-cream/85">
                <Clock aria-hidden="true" className="size-5 shrink-0" />
                {site.hours}
              </p>
            </address>
          </div>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="font-heading text-lg font-bold">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkClass}>
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/pests" className={linkClass}>
                  Pest library
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-areas">
            <h2 id="footer-areas" className="font-heading text-lg font-bold">
              Service Areas
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link href={`/areas/${a.slug}`} className={linkClass}>
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className="font-heading text-lg font-bold">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/about" className={linkClass}>
                  About us
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>
                  Contact
                </Link>
              </li>
              <li>
                <a href={site.googleBusiness} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Google reviews
                </a>
              </li>
              <li>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Facebook
                </a>
              </li>
              <li>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Instagram
                </a>
              </li>
              <li>
                <Link href="/privacy" className={linkClass}>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={linkClass}>
                  Terms
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/15 pt-6 text-sm text-cream/75 sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name}. {fullAddress}.
            {FDACS_LICENSE && (
              <>
                {" "}
                <span className="whitespace-nowrap">FL pest control license #{FDACS_LICENSE}</span>
                {CERTIFIED_OPERATOR_LICENSE && (
                  <>
                    , <span className="whitespace-nowrap">certified operator #{CERTIFIED_OPERATOR_LICENSE}</span>
                  </>
                )}
                .
              </>
            )}
          </p>
          <p>Proudly serving Polk County since 1959.</p>
        </div>
      </Container>
    </footer>
  );
}
