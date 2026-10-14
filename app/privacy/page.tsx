import { LegalPage } from "@/components/site/legal-page";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  topic: "Privacy Policy",
  description: `How ${site.name} handles the information you share with us.`,
  path: "/privacy",
});

// TODO(owner): Have the final privacy policy reviewed before launch.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        When you call us or send a quote request, we collect your name, phone number, ZIP code, and details about your
        pest problem. We use that information only to contact you about your service.
      </p>
      <h2>What we do not do</h2>
      <p>We do not sell or rent your information to anyone.</p>
      <h2>Questions</h2>
      <p>
        Email{" "}
        <a href={`mailto:${site.email}`} className="font-semibold text-green underline underline-offset-4">
          {site.email}
        </a>{" "}
        or call{" "}
        <a href={site.phoneHref} className="font-semibold text-green underline underline-offset-4">
          {site.phone}
        </a>
        .
      </p>
    </LegalPage>
  );
}
