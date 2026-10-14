import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CheckList({
  items,
  icon: Icon = Check,
  className,
  iconClassName = "text-green",
}: {
  items: string[];
  icon?: LucideIcon;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-lg text-ink">
          <Icon aria-hidden="true" className={cn("mt-1 size-5 shrink-0", iconClassName)} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
