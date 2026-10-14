import type { ReactNode } from "react";
import { PageHeader } from "./page-header";
import { Container } from "./section";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <PageHeader crumbs={[{ label: title }]} title={title} showCtas={false} />
      <Container className="max-w-3xl py-12">
        <div className="space-y-4 text-lg text-ink/85 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink">
          {children}
        </div>
      </Container>
    </>
  );
}
