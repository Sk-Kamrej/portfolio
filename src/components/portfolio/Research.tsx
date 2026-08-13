import { Brain, Lightbulb, Network } from "lucide-react";
import { researchCards } from "@/data/portfolio";
import { Section, Reveal } from "./Section";

const icons = [Brain, Network, Lightbulb];

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

export function Research() {
  return (
    <Section
      id="research"
      eyebrow="Research & AI"
      title="Research & AI"
      intro="Machine learning, explainable AI, applied research, data-driven decision systems, and human-centered technology built for real problems."
    >
      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="grid gap-5 sm:grid-cols-3">
          {researchCards.map((c, i) => {
            const Icon = icons[i] ?? Brain;
            return (
              <Reveal key={c.title} delay={i * 80}>
                <div className="glass card-hover h-full rounded-2xl p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="glass flex h-full flex-col rounded-2xl p-6">
            <div className="h-32">
              <AbstractNetwork />
            </div>
            <blockquote className="mt-4 border-l-2 border-primary/50 pl-4 text-sm italic leading-relaxed text-foreground/85">
              &ldquo;I don&apos;t just want to use AI. I want to understand how it works, where it
              fails, and how it can be applied responsibly to real problems.&rdquo;
            </blockquote>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
