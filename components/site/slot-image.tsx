import Image from "next/image";
import type { ImageSlot } from "@/lib/images";
import { cn } from "@/lib/utils";

/** Renders an image slot when its file exists, and nothing otherwise. */
export function SlotImage({
  slot,
  sizes,
  className,
  priority = false,
  fill = false,
}: {
  slot: ImageSlot;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Fill the parent (parent must be positioned) instead of using intrinsic size. */
  fill?: boolean;
}) {
  if (slot.src) {
    return (
      <Image
        src={slot.src}
        alt={slot.alt}
        sizes={sizes}
        preload={priority}
        placeholder="blur"
        {...(fill ? { fill: true } : { width: slot.width, height: slot.height })}
        className={cn("object-cover", className)}
      />
    );
  }

  // No file yet: render nothing. Callers own the fallback design.
  return null;
}
