import Link from "next/link";
import { BugOff } from "lucide-react";
import { Container } from "@/components/site/section";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <BugOff aria-hidden="true" className="size-16 text-green" />
      <h1 className="mt-6 text-4xl font-extrabold text-ink sm:text-5xl">This page is gone</h1>
      <p className="mt-4 max-w-md text-lg text-muted-ink">
        Like a good pest treatment, it left no trace. Try the homepage, or call us at {site.phone}.
      </p>
      <Link href="/" className={`mt-8 ${buttonVariants({ variant: "cta", size: "2xl" })}`}>
        Back to the homepage
      </Link>
    </Container>
  );
}
