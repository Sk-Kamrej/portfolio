import { Github, Linkedin, Lock, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Profile, SocialLink } from "@/lib/site-types";

const iconMap: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  email: Mail,
};

export function Footer({ profile, socials }: { profile: Profile; socials: SocialLink[] }) {
  const links = socials.length
    ? socials.map((s) => ({ href: s.url, label: s.label, icon: iconMap[s.icon] ?? Github }))
    : [
        { href: profile.github_url, label: "GitHub", icon: Github },
        { href: profile.linkedin_url, label: "LinkedIn", icon: Linkedin },
        { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
      ];

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.28em]">
            {profile.name}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{profile.philosophy}</p>
        </div>

        <div className="flex items-center gap-3">
          {links.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/70 transition-colors hover:text-primary"
          >
            <Lock className="h-3 w-3" /> Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
