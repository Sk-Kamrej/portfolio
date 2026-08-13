import { useState } from "react";
import { ArrowUpRight, Github, Plus } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { Section, Reveal } from "./Section";
import { ProjectModal } from "./ProjectModal";
import { cn } from "@/lib/utils";

function DashboardMock() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-background/60 p-4">
      <div
        className="grid-bg pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      />
      <div className="relative flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
          attendance overview
        </span>
        <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
          live mock
        </span>
      </div>
      <div className="relative mt-4 grid grid-cols-3 gap-2">
        {["Today", "This week", "Shortage"].map((k) => (
          <div key={k} className="rounded-lg border border-border bg-surface p-2.5">
            <p className="text-[10px] text-muted-foreground">{k}</p>
            <div className="mt-2 h-1.5 rounded-full bg-muted">
              <div className="h-1.5 w-2/3 rounded-full bg-primary/70" />
            </div>
          </div>
        ))}
      </div>
      <div className="relative mt-3 flex items-end gap-1.5" aria-hidden="true">
        {[38, 62, 48, 74, 55, 82, 66, 90, 58, 71].map((h, i) => (
          <span
            key={i}
            style={{ height: `${h * 0.5}px` }}
            className="w-full rounded-sm bg-gradient-to-t from-primary/20 to-primary/70"
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article
      className={cn(
        "glass card-hover group flex h-full flex-col rounded-2xl p-6",
        project.featured && "lg:col-span-2",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {project.status}
        </span>
      </div>

      <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">{project.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.short}</p>

      {project.featured && (
        <div className="mt-5">
          <DashboardMock />
        </div>
      )}

      {!project.placeholder && (
        <p className="mt-5 text-sm text-muted-foreground">
          <span className="font-medium text-foreground/90">Problem solved: </span>
          {project.problem}
        </p>
      )}

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
          >
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:brightness-110"
        >
          View Details
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/40"
          >
            <Github className="h-3.5 w-3.5" /> GitHub
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground/70">
            <Github className="h-3.5 w-3.5" /> Repo coming soon
          </span>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/40"
          >
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Featured work."
      intro="Things I've built or am building right now. Each one exists to solve a problem or to learn something specific."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {projects
          .filter((p) => !p.placeholder)
          .map((p, i) => (
            <Reveal key={p.slug} delay={i * 80} className={p.featured ? "lg:col-span-2" : ""}>
              <ProjectCard project={p} onOpen={() => setSelected(p)} />
            </Reveal>
          ))}

        {projects
          .filter((p) => p.placeholder)
          .map((p) => (
            <Reveal key={p.slug} delay={160} className="lg:col-span-2">
              <div className="card-hover flex h-full flex-col items-start justify-center rounded-2xl border border-dashed border-border bg-surface/40 p-8 text-left">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary">
                  <Plus className="h-4 w-4" />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.short}</p>
              </div>
            </Reveal>
          ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
