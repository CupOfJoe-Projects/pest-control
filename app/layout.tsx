import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Header } from "@/components/site/header";
import { OfferBar } from "@/components/site/offer-bar";
import { Footer } from "@/components/site/footer";
import { MobileActionBar } from "@/components/site/mobile-action-bar";
import { RevealObserver } from "@/components/site/reveal-observer";
import { IS_DEMO, site } from "@/content/site";
import "./globals.css";

// Fonts swap in. Fallback lists end in a generic sans so text never drops to a
// serif default where Arial is missing (headless Linux). Bricolage (headings)
// is preloaded; Inter (body) is not, so it does not compete with the hero photo,
// which is the LCP. It still loads right after the CSS and swaps in.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Pest Control in ${site.region}`,
    template: `%s | ${site.name} | ${site.region}`,
  },
  description: `Family owned pest control in Polk County, Florida since ${site.foundingYear}. Call ${site.phone} for a free quote.`,
  applicationName: site.name,
  formatDetection: { telephone: false },
  // Demo: keep every page out of search results until IS_DEMO is false.
  ...(IS_DEMO && { robots: { index: false, follow: false } }),
};

export const viewport: Viewport = {
  themeColor: "#1f3d2b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-green px-4 py-3 font-semibold text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <OfferBar />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <RevealObserver />
      </body>
    </html>
  );
}
