import Script from "next/script";
import { GA_MEASUREMENT_ID, GOOGLE_ADS_ID } from "@/content/site";

/**
 * The Google tag (gtag.js), set up for Google Analytics and Google Ads together,
 * the same way the old site loaded them. Loads after the page is interactive.
 */
export function GoogleTags() {
  const ids = [GA_MEASUREMENT_ID, GOOGLE_ADS_ID].filter((id): id is string => Boolean(id));
  if (!ids.length) return null;
  const config = ids.map((id) => `gtag('config',${JSON.stringify(id)});`).join("");
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ids[0]}`} strategy="afterInteractive" />
      <Script id="google-tags" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${config}`}
      </Script>
    </>
  );
}
