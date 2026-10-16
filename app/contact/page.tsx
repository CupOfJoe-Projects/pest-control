import { Mail, MapPin, MessageSquareText, Phone } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Container } from "@/components/site/section";
import { QuoteSection } from "@/components/site/quote-form";
import { fullAddress, mapsUrl, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  topic: "Contact Us",
  description: `Call ${site.phone}, text us, or request a free quote online. Our office is at ${fullAddress}.`,
  path: "/contact",
});

const linkClass = "font-semibold text-green underline-offset-4 hover:underline";

export default function ContactPage() {
  const methods = [
    { icon: Phone, label: "Call", value: site.phone, href: site.phoneHref },
    { icon: MessageSquareText, label: "Text", value: "Send us a text", href: site.textUrl, external: true },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Office", value: fullAddress, href: mapsUrl, external: true },
  ];

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact"
        title="Talk to a real person"
        intro={<p>Call, text, or send a quote request. Whatever is easiest for you.</p>}
        showCtas={false}
      />
      <Container className="py-12">
        <h2 className="sr-only">Ways to reach us</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {methods.map(({ icon: Icon, label, value, href, external }) => (
            <li key={label} className="rounded-lg border border-line bg-white p-5">
              <span className="flex size-11 items-center justify-center rounded-lg bg-green text-cream">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <p className="mt-4 text-sm font-semibold tracking-wide text-muted-ink uppercase">{label}</p>
              <a
                href={href}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className={`mt-1 block break-words ${linkClass}`}
              >
                {value}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-muted-ink">
          <span className="font-semibold text-ink">Office hours:</span> {site.hours}. {site.sameDay}.
        </p>
      </Container>
      <QuoteSection />
    </>
  );
}
