import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logoMark from "@/public/brand/logo-mark.png";

// TODO(owner): Swap for vector logo files. The mark is cropped from the
// current site's header image and the wordmark is set in live type.
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex shrink-0 items-center gap-2.5 rounded-md", className)}
    >
      <Image src={logoMark} alt="" priority className="h-10 w-auto sm:h-11" sizes="26px" />
      <span
        className={cn(
          "font-heading leading-[1.05] font-extrabold tracking-tight",
          tone === "dark" ? "text-ink" : "text-cream",
        )}
      >
        <span className="block text-[1.05rem] sm:text-lg">McDonald</span>
        <span className="block text-[1.05rem] sm:text-lg">Exterminators</span>
      </span>
    </Link>
  );
}
