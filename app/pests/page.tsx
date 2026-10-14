import { PageHeader } from "@/components/site/page-header";
import { Section } from "@/components/site/section";
import { PestGrid } from "@/components/site/pest-grid";
import { CtaBlock } from "@/components/site/cta-block";
import { pests } from "@/content/pests";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  topic: "Pest Library",
  description:
    "Signs, prevention tips, and when to call for the most common pests in Polk County, Florida. From palmetto bugs to roof rats.",
  path: "/pests",
});

export default function PestsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Pests" }]}
        eyebrow="Pest library"
        title="What's bugging you?"
        intro={<p>Pick a pest to see the signs, why it shows up in Florida, and how to keep it out.</p>}
        showCtas={false}
      />
      <Section labelledBy="all-pests-title">
        <h2 id="all-pests-title" className="sr-only">
          All pests
        </h2>
        <PestGrid pests={pests} />
      </Section>
      <CtaBlock title="Not sure what you are looking at?" text="Send a photo through our text line or give us a call. We will tell you what it is." />
    </>
  );
}
