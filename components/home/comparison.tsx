import { CircleCheck, Minus } from "lucide-react";
import { Container } from "@/components/site/section";
import { NO_LONG_CONTRACTS_CONFIRMED } from "@/content/site";

// Keep this honest: no competitor names, nothing we cannot back up.
const rows = [
  { label: "Who answers the phone", us: "Local office in Bartow", them: "Call center" },
  { label: "Who shows up", us: "Techs who live in Polk County", them: "Rotating techs" },
  { label: "How long around", us: "Since 1959", them: "Varies" },
  // TODO(owner): Confirm contract terms. Row stays hidden until confirmed.
  ...(NO_LONG_CONTRACTS_CONFIRMED ? [{ label: "Contracts", us: "No long term contracts", them: "Often long term" }] : []),
];

export function Comparison() {
  return (
    <section aria-labelledby="compare-title" className="bg-green py-16 text-cream md:py-24">
      <Container>
        <div data-reveal className="max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-cream/85 uppercase">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange" />
            Local vs national
          </p>
          <h2 id="compare-title" className="text-3xl leading-[1.1] font-extrabold sm:text-4xl">
            Why neighbors pick the local guys
          </h2>
        </div>

        <div data-reveal className="mt-10 overflow-hidden rounded-[16px] bg-cream text-ink shadow-2xl">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">McDonald Exterminators compared with national chains</caption>
            <thead>
              <tr className="border-b border-line">
                <td className="hidden p-5 md:table-cell" />
                <th scope="col" className="w-1/2 bg-white p-4 font-heading text-lg font-extrabold text-green sm:p-5 md:w-auto">
                  McDonald Exterminators
                </th>
                <th scope="col" className="w-1/2 p-4 font-heading text-lg font-bold text-muted-ink sm:p-5 md:w-auto">
                  National chains
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-0">
                  {/* Phones: the row label sits on its own line above the two answers. */}
                  <th scope="row" className="hidden p-5 font-semibold md:table-cell">
                    {row.label}
                  </th>
                  <td className="bg-white p-4 align-top sm:p-5">
                    <span className="mb-1 block text-xs font-semibold tracking-wide text-muted-ink uppercase md:hidden">
                      {row.label}
                    </span>
                    <span className="flex gap-2 font-semibold">
                      <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-green" />
                      {row.us}
                    </span>
                  </td>
                  <td className="p-4 align-top text-muted-ink sm:p-5">
                    <span aria-hidden="true" className="mb-1 block text-xs font-semibold tracking-wide uppercase opacity-0 md:hidden">
                      {row.label}
                    </span>
                    <span className="flex gap-2">
                      <Minus aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                      {row.them}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
