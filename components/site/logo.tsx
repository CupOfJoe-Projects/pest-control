import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import logoMark from "@/public/brand/logo-mark.png";

// TODO(owner): Swap for vector logo files. The mark is cropped from the
// current site's header image and the wordmark is set in live type.
export function Logo({
  tone = "dark",
  onHero = false,
  className,
}: {
  tone?: "dark" | "light";
  /** Turn the wordmark cream while the header sits over the hero. */
  onHero?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className={cn("flex shrink-0 items-center gap-2.5 rounded-md", className)}>
      <Image src={logoMark} alt={`${site.name} logo`} priority className="h-10 w-auto sm:h-11" sizes="26px" />
      {/* The image alt carries the name, so the wordmark is hidden from screen readers. */}
      <span
        aria-hidden="true"
        className={cn(
          "font-heading leading-[1.05] font-extrabold tracking-tight transition-colors",
          tone === "dark" ? "text-ink" : "text-cream",
          onHero && "group-data-[over=true]:text-cream",
        )}
      >
        <span className="block text-[1.05rem] sm:text-lg">McDonald</span>
        <span className="block text-[1.05rem] sm:text-lg">Exterminators</span>
      </span>
    </Link>
  );
}
