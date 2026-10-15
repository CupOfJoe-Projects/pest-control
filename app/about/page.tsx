import { HeartHandshake, MapPin, Phone, ThumbsUp } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Container, Section, SectionHeading } from "@/components/site/section";
import { TIMELINE } from "@/content/site";
import { EstBadge } from "@/components/site/est-badge";
import { TrustWall } from "@/components/site/trust-wall";
import { CtaBlock } from "@/components/site/cta-block";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  topic: "About Us",
  description:
    "Started in Lakeland in 1959 and still family owned. Meet the local pest control company Polk County has trusted for generations.",
  path: "/about",
});

const values = [
  {
    icon: Phone,
    title: "We pick up the phone",
    text: "Call during business hours and you get a real person in our office, not a phone tree in another state.",
  },
  {
    icon: ThumbsUp,
    title: "We do it right the first time",
    text: "We take the time to find where pests come from, not just spray what we can see.",
  },
  {
    icon: HeartHandshake,
    title: "We treat you like a neighbor",
    text: "Because you are one. We live, shop, and raise our families in the same towns we serve.",
  },
  {
    icon: MapPin,
    title: "We know Polk County",
    text: "Lakes, groves, sandy ridges, and old oaks all bring different pests. We have seen them all.",
  },
];

// TODO(owner): Confirm founder name, family generations, and key milestones, then make this specific.
export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "About" }]}
        eyebrow="Our story"
        title="Family owned in Polk County since 1959"
        intro={<p>Same name, same values, same local phone number. Just a lot more experience.</p>}
        aside={<EstBadge className="mx-auto size-56" />}
      />

      <section aria-labelledby="history-title" className="bg-green py-16 text-cream sm:py-24">
        <Container className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div>
            <p
              aria-hidden="true"
              className="font-heading text-[7rem] leading-[0.85] font-extrabold tracking-tighter text-orange sm:text-[10rem]"
            >
              1959
            </p>
            <h2 id="history-title" className="mt-4 text-3xl font-extrabold sm:text-4xl">
              It started with one truck in Lakeland
            </h2>
            <div className="mt-5 space-y-4 text-lg text-cream/85">
              <p>
                McDonald Exterminators opened in Lakeland in 1959. The idea was simple: show up when you say you will,
                do the job right, and charge a fair price.
              </p>
              <p>
                The company grew the old fashioned way, one neighbor telling another. Today we run out of our office in
                Bartow and serve all of Polk County, and the family behind the name still runs things the same way.
              </p>
            </div>
          </div>
          {/* TODO(owner): A real early days photo can replace the seal and timeline here. */}
          <div className="flex flex-col items-center gap-10 md:items-start">
            <EstBadge className="size-48 drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)] sm:size-56" />
            <ol className="relative w-full space-y-6 border-l border-cream/20 pl-7">
              {TIMELINE.map((t) => (
                <li key={t.year} className="relative">
                  <span aria-hidden="true" className="absolute top-1.5 -left-[2.0625rem] size-3 rounded-full bg-orange ring-4 ring-green" />
                  <span className="block font-heading text-2xl font-extrabold tracking-[-0.03em] tabular-nums">{t.year}</span>
                  <span className="block text-cream/80">{t.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <Section labelledBy="values-title">
        <SectionHeading id="values-title" eyebrow="How we work" title="What has kept us going" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {values.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-lg border border-line bg-white p-6">
              <span className="flex size-12 items-center justify-center rounded-lg bg-green-soft text-green">
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <h3 className="mt-4 text-xl font-bold text-ink">{title}</h3>
              <p className="mt-2 text-muted-ink">{text}</p>
            </li>
          ))}
        </ul>
      </Section>


      <TrustWall className="bg-cream" />
      <CtaBlock />
    </>
  );
}
