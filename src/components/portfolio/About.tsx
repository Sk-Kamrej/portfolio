import type { Profile } from "@/lib/site-types";
import { Section, Reveal } from "./Section";

export function About({ profile }: { profile: Profile }) {
  const paragraphs = profile.bio.split("\n").filter((p) => p.trim().length > 0);

  const workingStyle = [
    {
      number: "01",
      title: "BUILD",
      description: "Turn ideas into practical, working software.",
    },
    {
      number: "02",
      title: "LEARN",
      description: "Learn by trying, testing, debugging, and exploring.",
    },
    {
      number: "03",
      title: "RESEARCH",
      description: "Explore AI/ML and technology through real-world problems.",
    },
    {
      number: "04",
      title: "REPEAT",
      description: "Improve what I build through continuous learning.",
    },
  ];

  return (
    <Section
      id="about"
      eyebrow="About"
      title="More than a student."
      intro="A little about who I am, how I learn, and what I am building toward."
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        {/* LEFT SIDE */}
        <Reveal className="space-y-6">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>

          {/* INTERESTS */}
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
              What I&apos;m interested in
            </p>

            <ul className="flex flex-wrap gap-2">
              {profile.research_interests.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* PHILOSOPHY */}
          <blockquote className="border-l-2 border-primary/50 pl-4 text-sm italic leading-relaxed text-foreground/85">
            &quot;{profile.philosophy}&quot;
          </blockquote>
        </Reveal>

        {/* RIGHT SIDE */}
        <Reveal delay={160} className="-mt-4">
          <div className="relative">
            {/* Glow */}
            <div
              className="absolute -inset-5 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-40 blur-2xl"
              aria-hidden="true"
            />

            <div className="glass rounded-2xl p-5 shadow-[var(--shadow-elevated)] sm:p-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                </div>

                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  how I work
                </span>
              </div>

              {/* Working style */}
              <div className="mt-6 space-y-3">
                {workingStyle.map((item) => (
                  <div
                    key={item.number}
                    className="group rounded-xl border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-primary">
                        {item.number}
                      </span>

                      <div>
                        <p className="font-display text-sm font-semibold text-foreground">
                          {item.title}
                        </p>

                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Code-style footer */}
              <div className="mt-5 rounded-xl border border-border bg-surface px-4 py-3">
                <p className="font-mono text-[11px] leading-relaxed text-muted-foreground/70">
                  <span className="text-primary">const</span>{" "}
                  <span className="text-foreground">approach</span> = [
                  <span className="text-accent">&quot;build&quot;</span>,{" "}
                  <span className="text-accent">&quot;learn&quot;</span>,{" "}
                  <span className="text-accent">&quot;research&quot;</span>,{" "}
                  <span className="text-accent">&quot;repeat&quot;</span>];
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
