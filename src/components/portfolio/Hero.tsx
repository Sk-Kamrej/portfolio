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
  currentStatus: _currentStatus,
  socials,
  resumeUrl,
}: {
  profile: Profile;
  currentStatus: CurrentStatus[];
  socials: SocialLink[];
  resumeUrl: string | null;
}) {
  const links = socials.length
    ? socials.map((s) => ({
        href: s.url,
        label: s.label,
        icon: iconMap[s.icon] ?? Github,
      }))
    : [
        { href: profile.github_url, label: "GitHub", icon: Github },
        { href: profile.linkedin_url, label: "LinkedIn", icon: Linkedin },
        { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
      ];

  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Background glow */}
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div
        className="grid-bg animate-drift pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        {/* ================= LEFT SIDE ================= */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-muted-foreground sm:text-xs">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {profile.descriptor}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 font-semibold leading-tight">
              <span className="block text-4xl sm:text-5xl lg:text-6xl text-gradient">
                {profile.name}
              </span>

              <span className="mt-3 block text-2xl sm:text-3xl lg:text-4xl text-foreground">
                {profile.headline}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.22em] text-primary">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-justify [text-align-last:left]">
              {profile.hero_intro}
            </p>
          </Reveal>

          {/* Buttons */}
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
                  <Download className="h-4 w-4" />
                  Download Resume
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

          {/* Social links */}
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

        {/* ================= RIGHT SIDE ================= */}
        <Reveal delay={160}>
          <div className="relative flex justify-center lg:justify-end lg:-translate-y-3 lg:-translate-x-20">
            {/* Glow behind photo */}
            <div
              className="absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-40 blur-2xl"
              aria-hidden="true"
            />

            {/* Outer frame */}
            <div className="glass w-full max-w-[330px] rounded-2xl p-4 shadow-[var(--shadow-elevated)] sm:p-5">
              {/* Photo + name */}
              <div className="relative overflow-hidden rounded-xl border border-border">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src="/profile.jpg"
                    alt="SK Kamrej"
                    className="h-full w-full object-cover object-center"
                  />

                  {/* Bottom gradient */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B1120] to-transparent"
                    aria-hidden="true"
                  />

                  {/* Name */}
                  <div className="absolute bottom-4 left-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                      SK KAMREJ
                    </p>
                  </div>
                </div>
              </div>

              {/* Open to opportunities */}
              <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-border bg-surface px-4 py-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />

                <span className="text-sm text-muted-foreground">Open to opportunities</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
