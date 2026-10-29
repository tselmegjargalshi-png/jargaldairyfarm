import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-gold">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  center,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl text-green-900 sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-lg text-muted">{children}</p>}
    </div>
  );
}

export function PageHeader({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: string }) {
  return (
    <header className="bg-green-900 text-white">
      <Container className="py-14 sm:py-20">
        {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-gold-soft">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl sm:text-5xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg text-white/80">{lead}</p>}
      </Container>
    </header>
  );
}

/** Shown wherever the owner still has to provide real information. */
export function Pending({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-gold bg-gold-soft/60 px-4 py-3 text-sm text-ink">
      <span className="font-semibold">Эзний мэдээлэл хүлээгдэж байна: </span>
      {children}
    </p>
  );
}
