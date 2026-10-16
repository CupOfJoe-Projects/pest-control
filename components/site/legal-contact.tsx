import { fullAddress, site } from "@/content/site";

/** The contact block that ends both legal pages. */
export function LegalContact() {
  return (
    <>
      <h2>Contact Us</h2>
      <p>If you have privacy related questions or requests, contact us at:</p>
      <p>
        {site.legalName}
        <br />
        {fullAddress}
        <br />
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <br />
        <a href={site.phoneHref}>{site.phone}</a>
      </p>
    </>
  );
}
