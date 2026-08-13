import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", className)}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28", className)}>
      {(eyebrow || title || intro) && (
        <Reveal className="mb-12 max-w-2xl">
          {eyebrow && (
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
          )}
          {title && (
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">{title}</h2>
          )}
          {intro && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p>}
        </Reveal>
      )}
      {children}
    </section>
  );
}
