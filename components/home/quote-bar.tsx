import { Container } from "@/components/site/section";
import { QuoteStarter } from "./quote-starter";
import { site } from "@/content/site";

/** Full width quote card that straddles the hero and the next section. */
export function QuoteBar() {
  return (
    <div id="quote" data-anchor className="relative z-20 -mt-12 -mb-12 md:-mt-14 md:-mb-14">
      <Container>
        <div className="rounded-[20px] bg-white p-5 shadow-[0_24px_60px_-24px_rgba(20,42,29,0.35)] ring-1 ring-line sm:p-7">
          <QuoteStarter phone={site.phone} />
        </div>
      </Container>
    </div>
  );
}
