import { experiences } from "@/data/portfolio";
import { Section, Reveal } from "./Section";

export function Experience() {
  if (experiences.length === 0) return null;

  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked.">
      <div className="grid gap-5 lg:grid-cols-2">
        {experiences.map((e, i) => (
          <Reveal key={`${e.role}-${e.organization}`} delay={i * 80}>
            <article className="glass card-hover h-full rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold">{e.role}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {e.organization} · {e.duration}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{e.work}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {e.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-l-2 border-primary/50 pl-3 text-sm text-foreground/85">
                {e.learning}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
