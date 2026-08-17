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

        <Reveal delay={160}>
          <div className="relative">
            <div
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-60 blur-2xl"
              aria-hidden="true"
            />
            <div className="animate-float glass rounded-2xl p-5 shadow-[var(--shadow-elevated)] sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  workspace
                </span>
              </div>

              {profile.photo_url && (
                <img
                  src={profile.photo_url}
                  alt={`Portrait of ${profile.name}`}
                  loading="lazy"
                  className="mt-5 h-40 w-full rounded-xl border border-border object-cover"
                />
              )}

              <ul className="mt-5 space-y-3">
                {currentStatus.map((w, i) => (
                  <li
                    key={w.id}
                    style={{ animationDelay: `${i * 400}ms` }}
                    className="card-hover rounded-xl border border-border bg-surface p-4"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                      {w.emoji}
                    </p>
                    <p className="mt-1.5 font-display text-base font-semibold text-foreground">
                      {w.label}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-border bg-surface px-4 py-3">
                <span
                  className="animate-pulse-ring h-2 w-2 rounded-full bg-emerald-400"
                  aria-hidden="true"
                />
                <span className="text-sm text-muted-foreground">Open to opportunities</span>
              </div>

              <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted-foreground/70">
                <span className="text-primary">const</span> focus = [
                <span className="text-accent">&quot;build&quot;</span>,{" "}
                <span className="text-accent">&quot;research&quot;</span>,{" "}
                <span className="text-accent">&quot;iterate&quot;</span>];
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
