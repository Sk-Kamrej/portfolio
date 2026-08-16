import type { ExperienceRow } from "@/lib/site-types";
import { Section, Reveal } from "./Section";

export function Experience({ experience }: { experience: ExperienceRow[] }) {
  if (experience.length === 0) return null;

  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked.">
      <div className="grid gap-5 lg:grid-cols-2">
        {experience.map((e, i) => (
          <Reveal key={e.id} delay={i * 80}>
            <article className="glass card-hover h-full rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold">{e.position}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {e.organization}
                {e.employment_type ? ` · ${e.employment_type}` : ""}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-primary">
                {e.start_date} — {e.is_current ? "Present" : (e.end_date ?? "")}
              </p>
              {e.description && (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {e.description}
                </p>
              )}
              {e.responsibilities.length > 0 && (
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                  {e.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              )}
              {e.technologies.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {e.technologies.map((t) => (
                    <li
                      key={t}
                      className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              {e.skills_gained.length > 0 && (
                <p className="mt-4 border-l-2 border-primary/50 pl-3 text-sm text-foreground/85">
                  {e.skills_gained.join(" · ")}
                </p>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
