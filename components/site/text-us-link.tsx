"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Camera, X } from "lucide-react";
import { site } from "@/content/site";
import { smsHref } from "@/lib/text-us";

/**
 * Every "Text us" button. On a phone it opens the texting app to our number with
 * the message filled in; the customer attaches a photo and sends. On a computer,
 * which cannot send texts, it opens a QR code that does the same on their phone.
 */
export function TextUsLink({ className, children }: { className?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const href = smsHref();

  return (
    <>
      <a
        href={href}
        className={className}
        onClick={(event) => {
          // Touch screens (phones, tablets) open the texting app directly.
          if (window.matchMedia("(pointer: coarse)").matches) return;
          event.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>
      {open && <TextUsDialog href={href} onClose={() => setOpen(false)} />}
    </>
  );
}

function TextUsDialog({ href, onClose }: { href: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [qr, setQr] = useState("");

  useEffect(() => {
    const dialog = ref.current!;
    dialog.showModal();
    // The QR library loads only when someone on a computer asks for it.
    import("qrcode").then((QRCode) =>
      QRCode.toString(href, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#1f3d2b", light: "#ffffff" } }),
    ).then(setQr, () => setQr(""));
    return () => dialog.close();
  }, [href]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="text-us-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[min(24rem,calc(100vw-2rem))] rounded-2xl bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/60"
    >
      <div className="relative p-6 text-center">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full text-muted-ink hover:bg-cream hover:text-ink"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-orange text-ink">
          <Camera aria-hidden="true" className="size-6" />
        </span>
        <h2 id="text-us-title" className="mt-3 font-heading text-2xl font-extrabold">
          Text us a photo
        </h2>
        <p className="mt-2 text-muted-ink">Point your phone&apos;s camera at the code. It opens a text to us, ready to go. Add your photo and send.</p>
        <div
          className="mx-auto mt-4 size-52 rounded-lg border border-line bg-white p-2 [&>svg]:size-full"
          role="img"
          aria-label={`QR code that opens a text to ${site.textNumber}`}
          dangerouslySetInnerHTML={{ __html: qr }}
        />
        <p className="mt-4 text-muted-ink">
          Or text a photo to{" "}
          <a href={href} className="font-semibold whitespace-nowrap text-green underline underline-offset-4">
            {site.textNumber}
          </a>
        </p>
      </div>
    </dialog>
  );
}
