import type { CurrentStatus, Profile } from "@/lib/site-types";
import { Section, Reveal } from "./Section";

export function About({
  profile,
  currentStatus,
}: {
  profile: Profile;
  currentStatus: CurrentStatus[];
}) {
  const paragraphs = profile.bio.split("\n").filter((p) => p.trim().length > 0);

  return (
    <Section id="about" eyebrow="About" title="More than a student.">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
          <ul className="flex flex-wrap gap-2 pt-2">
            {profile.research_interests.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-foreground/80"
              >
                {t}
              </li>
            ))}
          </ul>
          <blockquote className="border-l-2 border-primary/50 pl-4 text-sm italic text-foreground/85">
            {profile.philosophy}
          </blockquote>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass card-hover rounded-2xl p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
              Currently
            </p>
            <dl className="mt-5 space-y-5">
              {currentStatus.map((c) => (
                <div key={c.id} className="border-b border-border pb-5 last:border-0 last:pb-0">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    {c.emoji}
                  </dt>
                  <dd className="mt-1.5 font-display text-base font-medium text-foreground">
                    {c.label}
                  </dd>
                </div>
              ))}
              <div className="border-t border-border pt-5">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">College</dt>
                <dd className="mt-1.5 font-display text-base font-medium text-foreground">
                  {profile.college}
                </dd>
                <dd className="mt-1 text-sm text-muted-foreground">{profile.university}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
