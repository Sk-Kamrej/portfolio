import { Brain, ExternalLink, Github } from "lucide-react";
import type { ResearchRow } from "@/lib/site-types";
import { Section, Reveal } from "./Section";

function AbstractNetwork() {
  const nodes = [
    [20, 30],
    [50, 15],
    [80, 32],
    [35, 62],
    [66, 68],
    [50, 45],
  ];
  return (
    <svg
      viewBox="0 0 100 80"
      className="h-full w-full"
      role="img"
      aria-label="Abstract illustration of a connected data network"
    >
      {nodes.map(([x1, y1], i) =>
        nodes.slice(i + 1).map(([x2, y2], j) => (
          <line
            key={`${i}-${j}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="0.3"
            className="text-primary/25"
          />
        )),
      )}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 5 ? 3 : 2} className="fill-primary/70">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur={`${3 + i * 0.4}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

export function Research({
  research,
  interests,
  philosophy,
}: {
  research: ResearchRow[];
  interests: string[];
  philosophy: string;
}) {
  return (
    <Section
      id="research"
      eyebrow="Research & AI"
      title="Research & AI"
      intro="Machine learning, explainable AI and applied research — work in progress, documented honestly."
    >
      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="grid gap-5">
          {research.length === 0 ? (
            <Reveal>
              <div className="rounded-2xl border border-dashed border-border bg-surface/40 p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary">
                  <Brain className="h-4 w-4" />
                </span>
                <p className="mt-4 text-sm text-muted-foreground">
                  Research work will be published here as it progresses.
                </p>
              </div>
            </Reveal>
          ) : (
            research.map((r, i) => (
              <Reveal key={r.id} delay={i * 80}>
                <article className="glass card-hover h-full rounded-2xl p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                      {r.status}
                    </span>
                    {r.area && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {r.area}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold">{r.title}</h3>
                  {r.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {r.description}
                    </p>
                  )}
                  {r.methodology && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground/90">Methodology: </span>
                      {r.methodology}
                    </p>
                  )}
                  {r.technologies.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {r.technologies.map((t) => (
                        <li
                          key={t}
                          className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {r.paper_url && (
                      <a
                        href={r.paper_url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                      >
                        Paper <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {r.github_url && (
                      <a
                        href={r.github_url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                      >
                        <Github className="h-3 w-3" /> Code
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))
          )}
        </div>

        <Reveal delay={200}>
          <div className="glass flex h-full flex-col rounded-2xl p-6">
            <div className="h-32">
              <AbstractNetwork />
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {interests.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
            <blockquote className="mt-4 border-l-2 border-primary/50 pl-4 text-sm italic leading-relaxed text-foreground/85">
              {philosophy}
            </blockquote>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
