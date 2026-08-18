import type { BlogPost } from "@/lib/site-types";
import { Section, Reveal } from "./Section";

export function LearningLog({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <Section
      id="writing"
      eyebrow="Writing"
      title="Learning in Public"
      intro="Notes, experiments and project updates."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.id} delay={i * 70}>
            <article className="glass card-hover group flex h-full flex-col rounded-2xl p-6">
              {p.tags.length > 0 && (
                <span className="w-fit rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {p.tags[0]}
                </span>
              )}
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{p.title}</h3>
              {p.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              )}
              {p.published_at && (
                <span className="mt-5 font-mono text-[11px] uppercase tracking-widest text-primary">
                  {p.published_at}
                </span>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
