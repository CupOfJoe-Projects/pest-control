import { LegalContact } from "@/components/site/legal-contact";
import { LegalPage } from "@/components/site/legal-page";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  topic: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information, including text messages.`,
  path: "/privacy",
});

// The owner's privacy policy, carried over from the old site
// (mcdonaldexterminators.com/privacypolicy). Wording is theirs; only
// punctuation, a repeated word, and the ZIP code (33830) were corrected.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        Welcome to {site.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are committed to
        protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information, including via SMS, and your rights regarding this data.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We do not sell, share, or disclose your phone number or SMS opt in consent with third parties for marketing or
        promotional purposes. If we must share your personal information with service providers or for legal reasons,
        SMS data and consent will not be included.
      </p>
      <p>We may collect personal information including:</p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number (if you provide it)</li>
      </ul>
      <p>If you opt in for SMS communications, we&apos;ll record your phone number and consent details (timestamp, method, campaign).</p>

      <h2>How We Use Your Information</h2>
      <p>We use your personal data to:</p>
      <ul>
        <li>Respond to inquiries and provide services</li>
        <li>Send SMS updates, reminders, confirmations, or promotions (if consented)</li>
        <li>Improve our services and customer experience</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>SMS Messaging &amp; Consent</h2>
      <p>
        You will only receive SMS messages if you have explicitly opted in through our website or verbally. We retain
        records of all consents, including method, date/time, phone number, and campaign for at least four years.
      </p>
      <p>You have the right to opt out at any time. Reply STOP to any message to unsubscribe; reply HELP for assistance.</p>

      <h2>Sharing of SMS Data &amp; Consent</h2>
      <p>
        No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other
        categories exclude text messaging originator opt in data and consent; this information will not be shared with
        any third parties. If we must share your personal information with service providers or for legal reasons, SMS
        data and consent will not be included.
      </p>

      <h2>SMS Opt Out Instructions</h2>
      <p>
        To stop receiving SMS messages, reply STOP or UNSUBSCRIBE to any message from us. Once received, you&apos;ll no
        longer be contacted via SMS unless you opt back in.
      </p>

      <h2>Use of Third Party Services</h2>
      <p>
        We may share other non SMS personal data with trusted third party providers (e.g., hosting, analytics). SMS opt
        in data is explicitly excluded from such sharing.
      </p>

      <h2>Data Security</h2>
      <p>
        We take reasonable measures to safeguard your personal information from unauthorized access, alteration, or
        disclosure. However, no method is completely secure.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain your personal data only as long as necessary for legitimate business needs or legal compliance. SMS
        consent data is retained for at least four years.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We&apos;ll publish the effective date at the end of this
        section. Significant changes will be communicated through our website or directly as appropriate.
      </p>
      <p>Effective date of this policy is August 30th, 2025.</p>

      <LegalContact />
    </LegalPage>
  );
}
