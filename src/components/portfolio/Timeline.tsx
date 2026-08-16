import type { Journey } from "@/lib/site-types";
import { Section, Reveal } from "./Section";

export function Timeline({ journey }: { journey: Journey[] }) {
  if (journey.length === 0) return null;

  return (
    <Section id="journey" eyebrow="Journey" title="My Journey">
      <ol className="relative ml-3 border-l border-border pl-8 sm:ml-5 sm:pl-10">
        {journey.map((item, i) => (
          <li key={item.id} className="relative pb-10 last:pb-0">
            <Reveal delay={i * 90}>
              <span
                className="absolute -left-[41px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-primary/50 bg-background sm:-left-[49px]"
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <div className="glass card-hover rounded-2xl p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                    {item.year}
                  </p>
                  <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {item.category}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                {item.technologies.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.technologies.map((t) => (
                      <li
                        key={t}
                        className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
