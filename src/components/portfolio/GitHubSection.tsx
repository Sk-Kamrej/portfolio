import { Github } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Section, Reveal } from "./Section";

export function GitHubSection() {
  const cells = Array.from({ length: 7 * 26 });

  return (
    <Section id="github" eyebrow="Activity" title="Code is where ideas become experiments.">
      <Reveal>
        <div className="glass rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Contribution activity will be pulled from the GitHub API here. No numbers are shown
              until it&apos;s connected.
            </p>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Github className="h-4 w-4" /> View GitHub Profile
            </a>
          </div>

          <div
            className="mt-6 overflow-hidden"
            role="img"
            aria-label="Placeholder contribution grid, awaiting GitHub integration"
          >
            <div className="grid grid-flow-col grid-rows-7 gap-1">
              {cells.map((_, i) => (
                <span
                  key={i}
                  className="h-2.5 w-2.5 rounded-[3px] border border-border bg-surface-strong"
                />
              ))}
            </div>
          </div>
          <p className="mt-4 font-mono text-[11px] text-muted-foreground/70">
            // placeholder grid — ready for GitHub API integration
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
