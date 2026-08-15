import { Github } from "lucide-react";
import type { ProjectRow } from "@/lib/site-types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">{title}</h4>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectRow | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto border-border bg-popover sm:max-w-2xl">
        {project && (
          <>
            <DialogHeader>
              <span className="w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                {project.status}
              </span>
              <DialogTitle className="mt-2 font-display text-2xl">{project.name}</DialogTitle>
              <DialogDescription className="text-left leading-relaxed">
                {project.description ?? project.short_description}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-2 space-y-6">
              {project.problem && <Block title="Problem">{project.problem}</Block>}
              {project.solution && <Block title="Solution">{project.solution}</Block>}
              {project.technologies.length > 0 && (
                <Block title="Technologies">
                  <ul className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <li
                        key={t}
                        className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </Block>
              )}
              {project.features.length > 0 && (
                <Block title="Key features">
                  <ul className="list-disc space-y-1.5 pl-5">
                    {project.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </Block>
              )}
              {project.architecture && <Block title="Architecture">{project.architecture}</Block>}
              {project.challenges && <Block title="Challenges">{project.challenges}</Block>}
              {project.learned.length > 0 && (
                <Block title="What I learned">
                  <ul className="list-disc space-y-1.5 pl-5">
                    {project.learned.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </Block>
              )}

              <div className="flex flex-wrap gap-2 border-t border-border pt-5">
                {project.github_url ? (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium transition-colors hover:border-primary/40"
                  >
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground">Repository link coming soon.</span>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                  >
                    Live Demo
                  </a>
                )}
                {project.docs_url && (
                  <a
                    href={project.docs_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium transition-colors hover:border-primary/40"
                  >
                    Documentation
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
