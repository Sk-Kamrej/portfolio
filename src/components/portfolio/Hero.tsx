import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import type { CurrentStatus, Profile, SocialLink } from "@/lib/site-types";
import { Reveal } from "./Section";

const iconMap: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  email: Mail,
};

export function Hero({
  profile,
  currentStatus,
  socials,
  resumeUrl,
}: {
  profile: Profile;
  currentStatus: CurrentStatus[];
  socials: SocialLink[];
  resumeUrl: string | null;
}) {
  const links = socials.length
    ? socials.map((s) => ({ href: s.url, label: s.label, icon: iconMap[s.icon] ?? Github }))
    : [
        { href: profile.github_url, label: "GitHub", icon: Github },
        { href: profile.linkedin_url, label: "LinkedIn", icon: Linkedin },
        { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
      ];

  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="grid-bg animate-drift pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-muted-foreground sm:text-xs">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {profile.descriptor}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
              <span className="text-gradient">{profile.name}</span>
              <br />
              {profile.headline}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.22em] text-primary">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {profile.hero_intro}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_18px_40px_-18px_var(--glow)] hover:brightness-110"
              >
                Explore My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
                >
                  <Download className="h-4 w-4" /> Download Resume
                </a>
              )}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-surface-strong"
              >
                Let&apos;s Connect
              </a>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-8 flex items-center gap-3">
              {links.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

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
    </section>
  );
}
