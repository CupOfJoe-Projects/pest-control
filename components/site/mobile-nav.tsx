"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Menu } from "lucide-react";

const MobileNavPanel = dynamic(() => import("./mobile-nav-panel"), { ssr: false });

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setRequested(true);
          setOpen(true);
        }}
        // Start loading the panel on first touch so it is ready by the time the tap lands.
        onPointerDown={() => setRequested(true)}
        className="flex size-12 items-center justify-center rounded-lg text-ink transition-colors hover:bg-green-soft group-data-[over=true]:text-cream group-data-[over=true]:hover:bg-cream/15 lg:hidden"
      >
        <Menu aria-hidden="true" className="size-6" />
      </button>
      {requested && <MobileNavPanel open={open} onOpenChange={setOpen} returnFocusRef={buttonRef} />}
    </>
  );
}
