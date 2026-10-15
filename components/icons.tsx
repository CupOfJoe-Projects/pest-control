import type { SVGProps } from "react";
import { Building2, Bug, House, Rat, Shovel, Store } from "lucide-react";

type IconProps = SVGProps<SVGSVGElement>;

// Pest icons drawn on lucide's 24px grid so they sit next to lucide icons cleanly.
function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Mirror a path drawn on the left half to the right half. */
function Mirror({ d }: { d: string }) {
  return (
    <>
      <path d={d} />
      <path d={d} transform="matrix(-1 0 0 1 24 0)" />
    </>
  );
}

export function AntIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="5" r="1.7" />
      <ellipse cx="12" cy="10" rx="1.5" ry="2" />
      <ellipse cx="12" cy="17" rx="2.6" ry="3.6" />
      <Mirror d="M11.2 3.7 9.3 1.8" />
      <Mirror d="M10.6 9.2 7.5 7l-1.5 1" />
      <Mirror d="M10.5 10.6 6.5 11.5" />
      <Mirror d="M10.8 11.8 8 15.5l.5 2" />
    </Svg>
  );
}

export function SpiderIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="9.5" r="2.2" />
      <circle cx="12" cy="15.5" r="3.2" />
      <Mirror d="M10.3 8.3 7.5 5.5 4.5 6.5" />
      <Mirror d="M10 9.8 6 9l-3 2" />
      <Mirror d="M10.3 11.2 6.5 13 4.5 16" />
      <Mirror d="M10.6 12.6 8 16.5 7 20" />
    </Svg>
  );
}

export function MosquitoIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4.5V1.5" />
      <circle cx="12" cy="5.8" r="1.3" />
      <ellipse cx="12" cy="9.6" rx="1.5" ry="2" />
      <path d="M12 11.6c-.7 0-1.1 1.5-1.1 4.6s.5 5.3 1.1 5.3 1.1-2.2 1.1-5.3-.4-4.6-1.1-4.6Z" />
      <Mirror d="M10.6 9c-2.5-2.8-6.6-3.4-7.4-1.8-.7 1.4 2.3 3.4 7.3 3.3" />
      <Mirror d="M10.7 10.8 6.5 13.5 3.5 19" />
      <Mirror d="M11 11.5 8.5 16.5 7.5 21.5" />
    </Svg>
  );
}

export function CockroachIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <ellipse cx="12" cy="4.6" rx="1.8" ry="1.2" />
      <path d="M12 6.2c-3.1 0-4.6 3-4.6 7.3 0 4.6 2 7.8 4.6 7.8s4.6-3.2 4.6-7.8c0-4.3-1.5-7.3-4.6-7.3Z" />
      <path d="M12 9.5v11.6" />
      <path d="M8 9.3c2.5-1.3 5.5-1.3 8 0" />
      <Mirror d="M11 3.8C9 1.4 5.8 1.3 3.5 3" />
      <Mirror d="M7.7 11 4.5 9.2" />
      <Mirror d="M7.5 14 4 14.6" />
      <Mirror d="M7.9 17.2 5 20" />
    </Svg>
  );
}

export function MouseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 16.3c0-4.4 3.4-7.3 7.6-7.3 3.4 0 5.8 2.3 6.4 5l2 1.5-2 1.1c-.9 1.2-3 1.9-6 1.9H6.2c-.7 0-1.2-.9-1.2-2.2Z" />
      <circle cx="14" cy="9.2" r="2.4" />
      <circle cx="17" cy="13.8" r=".4" fill="currentColor" />
      <path d="M5.2 16.6c-2.2 0-3.4 1.6-2.8 3.3.6 1.6 2.6 1.6 3.6.6" />
    </Svg>
  );
}

export function BedBugIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M10.5 5.4a1.5 1.5 0 0 1 3 0" />
      <path d="M9 7.2c1.9-.9 4.1-.9 6 0" />
      <ellipse cx="12" cy="14" rx="5.6" ry="6" />
      <path d="M6.9 12.2c3.4 1.4 6.8 1.4 10.2 0" />
      <path d="M7.2 15.4c3.2 1.3 6.4 1.3 9.6 0" />
      <path d="M8.6 18.3c2.3.9 4.5.9 6.8 0" />
      <Mirror d="M11 4.3 9.5 2.5" />
      <Mirror d="M8.6 7.8 6 6.3" />
      <Mirror d="M6.6 11.5 3.5 10.5" />
      <Mirror d="M6.6 15.5 3.5 17" />
    </Svg>
  );
}

export function FleaIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 13.5c0-4.5 4.5-6.8 8.6-5.4 3.4 1.2 4.6 4.6 3.4 6.9-1 2-3.6 2.8-6.6 2.8-3 0-5.4-1.4-5.4-4.3Z" />
      <path d="M7.4 12c-2-.4-3.5.6-3.5 1.9s1.3 1.8 3.3 1.3" />
      <path d="M3.9 13.5 2.5 15" />
      <path d="M9.5 17.3 8.5 20.5" />
      <path d="M12.5 17.8v3" />
      <path d="M16.5 16.8 19 19.5l1.5 2" />
      <path d="M17.5 15.8l3-1 1 3" />
    </Svg>
  );
}

export function BatIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 9.2c-1 0-1.7.6-2 1.5C8.5 9 5.3 8 1.8 8.8c1.4 1.1 2 2.7 1.9 4.4 1.3-.7 2.8-.7 3.9.3.4-1.2 1.4-1.9 2.6-1.8.4 1.5 1 2.6 1.8 3.6.8-1 1.4-2.1 1.8-3.6 1.2-.1 2.2.6 2.6 1.8 1.1-1 2.6-1 3.9-.3-.1-1.7.5-3.3 1.9-4.4-3.5-.8-6.7.2-8.2 1.9-.3-.9-1-1.5-2-1.5Z" />
      <path d="M10.9 9.4 10.6 7.6l1 1" />
      <path d="M13.1 9.4l.3-1.8-1 1" />
    </Svg>
  );
}

export function BeetleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <ellipse cx="12" cy="5.3" rx="2" ry="1.5" />
      <path d="M12 7c-3.4 0-5.2 3-5.2 6.6S9 20.5 12 20.5s5.2-3.3 5.2-6.9S15.4 7 12 7Z" />
      <path d="M12 9.8v10.7" />
      <path d="M7.3 9.8h9.4" />
      <Mirror d="M11 4.1 9.8 2.2" />
      <Mirror d="M7.2 11.5 4 10" />
      <Mirror d="M6.9 14.5 3.5 15" />
      <Mirror d="M7.6 17.5 5 20.5" />
    </Svg>
  );
}

export function CricketIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 13c0-2 3.2-3.2 7.5-2.9 3.5.3 5.6 1.5 5.4 3-.2 1.4-3.4 2.1-7.6 2-3.2-.1-5.3-.8-5.3-2.1Z" />
      <circle cx="5.3" cy="12.4" r="1.7" />
      <path d="M4.3 11C3.5 7 5.8 3.4 10 2" />
      <path d="M15.3 14.6 18 8l3.2 8.5" />
      <path d="M9 15.3 7.8 18.5" />
      <path d="M11.8 15.6v3.2" />
    </Svg>
  );
}

export function EarwigIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="4.6" r="1.4" />
      <path d="M10.8 6.3h2.4l.5 11.4c0 .7-.6 1.1-1.7 1.1s-1.7-.4-1.7-1.1Z" />
      <path d="M11 18.6c-1.4 1.6-1.1 3 .2 3.9" />
      <path d="M13 18.6c1.4 1.6 1.1 3-.2 3.9" />
      <Mirror d="M11.4 3.5 9.5 1.5" />
      <Mirror d="M10.7 8.3 7.5 7" />
      <Mirror d="M10.6 10.5 7 11" />
      <Mirror d="M10.6 12.8 7.5 15" />
    </Svg>
  );
}

export function TermiteIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <ellipse cx="12" cy="5.3" rx="2.2" ry="2" />
      <path d="M12 7.5c-1.5 0-2.3 1-2.3 2.6v6c0 3 1 4.9 2.3 4.9s2.3-1.9 2.3-4.9v-6c0-1.6-.8-2.6-2.3-2.6Z" />
      <path d="M9.9 12.5h4.2" />
      <path d="M9.8 15.5h4.4" />
      <Mirror d="M10.6 3.7 9 1.7" />
      <Mirror d="M9.8 9.2 6.8 8" />
      <Mirror d="M9.7 11.2 6.3 12" />
      <Mirror d="M9.8 13.3 7 15.8" />
    </Svg>
  );
}

export const icons = {
  ant: AntIcon,
  spider: SpiderIcon,
  mosquito: MosquitoIcon,
  cockroach: CockroachIcon,
  mouse: MouseIcon,
  bedbug: BedBugIcon,
  flea: FleaIcon,
  bat: BatIcon,
  beetle: BeetleIcon,
  cricket: CricketIcon,
  earwig: EarwigIcon,
  termite: TermiteIcon,
  rat: Rat,
  gopher: Shovel,
  bug: Bug,
  house: House,
  building: Building2,
  store: Store,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: IconName } & IconProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" {...props} />;
}
