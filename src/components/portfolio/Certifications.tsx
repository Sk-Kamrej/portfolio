import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { Section, Reveal } from "./Section";

export function Certifications() {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title="Certifications & Achievements"
      intro="Certifications, workshops, academic achievements and research work — added here as they happen."
    >
      {certifications.length === 0 ? (
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <div className="glass card-hover h-full rounded-2xl p-5">
                <h3 className="font-display text-base font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.organization}</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-primary">
                  {c.date}
                </p>
                {c.link && (
                  <a
                    href={c.link}
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
    </Section>
  );
}
