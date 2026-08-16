import { Award, ExternalLink, Trophy } from "lucide-react";
import type { AchievementRow, CertificationRow } from "@/lib/site-types";
import { Section, Reveal } from "./Section";

export function Certifications({
  certifications,
  achievements,
}: {
  certifications: CertificationRow[];
  achievements: AchievementRow[];
}) {
  const empty = certifications.length === 0 && achievements.length === 0;

  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title="Certifications & Achievements"
      intro="Certifications, workshops, academic achievements and research work — added here as they happen."
    >
      {empty ? (
        <Reveal>
          <div className="flex flex-col items-start rounded-2xl border border-dashed border-border bg-surface/40 p-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary">
              <Award className="h-4 w-4" />
            </span>
            <p className="mt-4 text-sm text-muted-foreground">
              Nothing listed yet. This section is intentionally empty rather than filled with
              placeholders — real certifications and achievements will appear here.
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="space-y-8">
          {certifications.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((c, i) => (
                <Reveal key={c.id} delay={i * 70}>
                  <div className="glass card-hover h-full rounded-2xl p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                      <Award className="h-4 w-4" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold">{c.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.organization}</p>
                    {c.issue_date && (
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-primary">
                        {c.issue_date}
                      </p>
                    )}
                    {c.description && (
                      <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>
                    )}
                    {c.skills.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {c.skills.map((s) => (
                          <li
                            key={s}
                            className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                    {(c.credential_url ?? c.pdf_url) && (
                      <a
                        href={(c.credential_url ?? c.pdf_url) as string}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                      >
                        Credential <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {achievements.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((a, i) => (
                <Reveal key={a.id} delay={i * 70}>
                  <div className="glass card-hover h-full rounded-2xl p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                      <Trophy className="h-4 w-4" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold">{a.title}</h3>
                    {a.organization && (
                      <p className="mt-1 text-sm text-muted-foreground">{a.organization}</p>
                    )}
                    {a.date && (
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-primary">
                        {a.date}
                      </p>
                    )}
                    {a.description && (
                      <p className="mt-3 text-sm text-muted-foreground">{a.description}</p>
                    )}
                    {a.link_url && (
                      <a
                        href={a.link_url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                      >
                        Details <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      )}
    </Section>
  );
}
