import Image from "next/image";
import { Container } from "./section";
import { team } from "@/content/team";
import { cn } from "@/lib/utils";

/** "Meet the team": real photos and names. Backs up "Local techs. Real people." */
export function TeamSection({ className }: { className?: string }) {
  return (
    <section aria-labelledby="team-title" className={cn("bg-cream py-16 md:py-24", className)}>
      <Container>
        <div data-reveal className="max-w-2xl">
          <p className="eyebrow text-green">Meet the team</p>
          <h2
            id="team-title"
            className="mt-4 text-[2.25rem] leading-[1] font-extrabold text-ink md:text-[3.5rem] md:leading-[0.95]"
          >
            Local techs. Real people.
          </h2>
          <p className="mt-5 text-lg text-muted-ink md:text-xl">
            These are the people who answer your call and show up at your door. No call center, no strangers.
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {team.map((m) => (
            <li key={m.name} data-reveal className="overflow-hidden rounded-[16px] border border-line bg-white">
              <Image
                src={m.photo}
                alt={`${m.name}, McDonald Exterminators`}
                sizes="(min-width: 768px) 30vw, 50vw"
                placeholder="blur"
                className="aspect-square w-full object-cover object-top"
              />
              <div className="p-4 sm:p-5">
                <p className="font-heading text-lg font-extrabold text-ink sm:text-xl">{m.name}</p>
                <p className="mt-0.5 text-sm text-muted-ink sm:text-base">Years with us: {m.years}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
