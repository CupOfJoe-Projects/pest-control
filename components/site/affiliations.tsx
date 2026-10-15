import Image from "next/image";
import { affiliations } from "@/content/affiliations";
import { cn } from "@/lib/utils";

/**
 * "Certified. Trusted. Proven." logo row, in full color: these are the
 * credibility signal, so they are not muted.
 */
export function Affiliations({ className }: { className?: string }) {
  return (
    <div className={cn("border-t border-line pt-10", className)}>
      <h3 className="eyebrow justify-center text-green">Certified. Trusted. Proven.</h3>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14">
        {affiliations.map((a) => (
          <li key={a.name}>
            <Image
              src={a.logo}
              alt={a.name}
              sizes="(min-width: 640px) 240px, 180px"
              className={cn(
                "w-auto object-contain transition duration-200 hover:scale-[1.04]",
                a.badge ? "h-20 sm:h-28" : "h-12 sm:h-16",
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
