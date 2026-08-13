import { ArrowUpRight } from "lucide-react";
import { learningLog } from "@/data/portfolio";
import { Section, Reveal } from "./Section";

export function LearningLog() {
  return (
    <Section
      id="log"
      eyebrow="Writing"
      title="Learning in Public"
      intro="Notes, experiments and project updates. Posts land here as they're written."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {learningLog.map((p, i) => (
          <Reveal key={p.title} delay={i * 70}>
            <article className="glass card-hover group flex h-full flex-col rounded-2xl p-6">
              <span className="w-fit rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {p.tag}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.note}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs text-primary/80">
                Draft
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
