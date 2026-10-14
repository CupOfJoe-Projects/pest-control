import { LegalPage } from "@/components/site/legal-page";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  topic: "Terms of Use",
  description: `Terms for using the ${site.name} website.`,
  path: "/terms",
});

// TODO(owner): Have the final terms reviewed before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <p>
        The information on this site is general advice about pests in Florida. Every property is different, so the
        right treatment depends on an inspection by one of our licensed technicians.
      </p>
      <h2>Quotes</h2>
      <p>
        Quotes requested online are free and come with no obligation. Final pricing is confirmed after we talk with you
        about your property.
      </p>
      <h2>Offers</h2>
      <p>Promotions apply to new customers only and cannot be combined with other offers unless stated.</p>
    </LegalPage>
  );
}
