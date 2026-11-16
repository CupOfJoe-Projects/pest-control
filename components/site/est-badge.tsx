import Image from "next/image";
import logo from "@/public/brand/logo.png";
import { cn } from "@/lib/utils";

/** Their round "Est. 1959" logo seal, used as a recurring brand motif. */
export function EstBadge({ className }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="McDonald Exterminators, established 1959"
      sizes="224px"
      className={cn("size-28 object-contain", className)}
    />
  );
}
