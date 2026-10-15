import { Camera, Phone } from "lucide-react";
import { Container } from "@/components/site/section";
import { SlotImage } from "@/components/site/slot-image";
import { site } from "@/content/site";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

/** Full width orange closing band. Ink text: white on this orange fails contrast. */
export function FinalCta() {
  const hasTech = Boolean(images.techCutout.src);
  return (
    <section aria-labelledby="final-title" className="relative overflow-hidden bg-orange text-ink">
      <Container className={cn("relative py-16 md:py-24", hasTech && "md:grid md:grid-cols-[1.4fr_0.6fr] md:items-end md:py-0 md:pt-20")}>
        <div data-reveal className={cn(hasTech && "md:pb-20")}>
          <h2 id="final-title" className="max-w-3xl text-[2.5rem] leading-[0.95] font-extrabold md:text-[4.5rem]">
            Still seeing bugs? Let&apos;s fix that today.
          </h2>
          <p className="mt-5 max-w-xl text-lg font-medium md:text-xl">
            Call the Bartow office and talk to a real person. Free quotes, honest prices, same family since 1959.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <a
              href={site.phoneHref}
              className="inline-flex h-16 items-center justify-center gap-3 rounded-xl bg-white px-8 font-heading text-xl font-extrabold text-ink shadow-[0_12px_30px_-10px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 active:scale-[0.98] md:text-2xl"
            >
              <Phone aria-hidden="true" className="size-6" />
              Call {site.phone}
            </a>
            <a
              href={site.textUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 text-lg font-semibold underline decoration-2 underline-offset-[6px] hover:no-underline"
            >
              <Camera aria-hidden="true" className="size-5" />
              Text us a photo
            </a>
          </div>
        </div>
        {hasTech && (
          <div className="relative hidden h-[380px] md:block">
            <SlotImage slot={images.techCutout} fill sizes="300px" className="object-contain object-bottom" />
          </div>
        )}
      </Container>
    </section>
  );
}
