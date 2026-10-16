import Link from "next/link";
import { LegalContact } from "@/components/site/legal-contact";
import { LegalPage } from "@/components/site/legal-page";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  topic: "Terms and Conditions",
  description: `Terms for the ${site.name} SMS Alerts program: opt out, help, and message rates.`,
  path: "/terms",
});

// The owner's terms, carried over from the old site
// (mcdonaldexterminators.com/termsandconditions). Wording is theirs; only
// punctuation, the emoji labels, and the ZIP code (33830) were changed.
export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions">
      <h2>Program Name and Description</h2>
      <p>
        {site.name} SMS Alerts (&ldquo;Program&rdquo;) provides customers with important updates, appointment
        reminders, promotional offers, and service related notifications. By opting into our SMS program, you agree to
        receive recurring text messages from {site.name} related to pest control services and company updates. Message
        frequency may vary.
      </p>

      <h2>Opt Out Instructions</h2>
      <p>
        You can cancel the SMS service at any time. Simply text &ldquo;STOP&rdquo; to our shortcode. After you send
        &ldquo;STOP,&rdquo; we will send you a confirmation SMS to verify your request. Once confirmed, you will no
        longer receive SMS messages from us.
      </p>

      <h2>Rejoining Instructions</h2>
      <p>
        If you wish to rejoin the Program after opting out, you may sign up again through our website, service forms,
        or by contacting our team. Upon re enrollment, you will resume receiving SMS messages from us.
      </p>

      <h2>Help Instructions</h2>
      <p>
        If you are experiencing issues with the SMS Program, reply with &ldquo;HELP&rdquo; for more assistance. You can
        also reach us directly at:
      </p>
      <p>
        Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        <br />
        Phone: <a href={site.phoneHref}>{site.phone}</a>
      </p>

      <h2>Carrier Liability Disclaimer</h2>
      <p>Wireless carriers are not liable for delayed or undelivered messages.</p>

      <h2>Message and Data Rates Disclaimer</h2>
      <p>
        Message and data rates may apply for any messages sent to you from us and from you to us. For questions about
        your text or data plan, contact your wireless provider.
      </p>

      <h2>Privacy Policy</h2>
      <p>
        We respect your privacy. Please review our full privacy policy here: <Link href="/privacy">Privacy Policy</Link>
      </p>

      <h2>Compliance with Industry Standards</h2>
      <p>Our SMS Program is designed to comply with all applicable CTIA, TCPA, and mobile industry standards.</p>

      <h2>Legal Compliance</h2>
      <p>
        By participating in this Program, you acknowledge that you are the account holder or authorized user of the
        mobile number you provide and that you agree to receive SMS messages from {site.name} in accordance with
        applicable laws and regulations.
      </p>

      <LegalContact />
    </LegalPage>
  );
}
