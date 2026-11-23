import type { Metadata } from "next";
import { GOOGLE_RATING, site } from "@/content/site";
import { areas } from "@/content/areas";
import { services } from "@/content/services";

/** Title pattern: "[Topic] | McDonald Exterminators | Polk County, FL" */
export function pageTitle(topic: string) {
  return `${topic} | ${site.name} | ${site.region}`;
}

export function pageMetadata({
  topic,
  description,
  path,
}: {
  topic: string;
  description: string;
  path: string;
}): Metadata {
  const title = pageTitle(topic);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    telephone: "+1-863-533-1294",
    email: site.email,
    foundingDate: String(site.foundingYear),
    foundingLocation: { "@type": "Place", name: `${site.foundingCity}, FL` },
    description: `Family owned pest control serving Polk County, Florida since ${site.foundingYear}.`,
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/brand/logo.png`,
    hasMap: site.googleBusiness,
    sameAs: [site.googleBusiness, site.social.facebook, site.social.instagram, site.social.linkedin],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    areaServed: [
      ...areas.map((a) => ({ "@type": "City", name: `${a.name}, FL` })),
      { "@type": "AdministrativeArea", name: "Polk County, FL" },
    ],
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/services/${s.slug}` },
    })),
    // Controlled by GOOGLE_RATING in content/site.ts.
    ...(GOOGLE_RATING && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: GOOGLE_RATING.value,
        reviewCount: GOOGLE_RATING.count,
        bestRating: 5,
      },
    }),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
