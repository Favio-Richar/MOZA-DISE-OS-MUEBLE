import { ReactNode } from "react";

export default function LegalSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <section className="legal-section">
      <span>{number}</span>
      <div><h2>{title}</h2>{children}</div>
    </section>
  );
}
