import Link from "next/link";
import { Icon } from "@/components/icons";
import { Section, SectionHeading } from "@/components/site/section";
import { ServiceCard } from "@/components/site/service-cards";
import { audienceServices, specialtyServices } from "@/content/services";

export function ServicesSection() {
  return (
    <Section id="services" labelledBy="services-title" className="bg-cream-dark/60">
      <SectionHeading
        id="services-title"
        eyebrow="Services"
        title="Pest control for every kind of property"
        intro="Homes, rentals, or a business. Same local crew, same care."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {audienceServices.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <p className="font-semibold text-ink">Also on call for:</p>
        <ul className="flex flex-wrap gap-2.5">
          {specialtyServices.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-white px-4 font-semibold text-green transition hover:border-green hover:bg-green hover:text-cream"
              >
                <Icon name={s.icon} className="size-5" />
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
