import { skillGroups, type SkillState } from "@/data/portfolio";
import { Section, Reveal } from "./Section";
import { cn } from "@/lib/utils";

const stateStyles: Record<SkillState, string> = {
  "Working With": "border-primary/35 bg-primary/10 text-primary",
  Learning: "border-accent/35 bg-accent/10 text-accent",
  Exploring: "border-border bg-surface text-muted-foreground",
};

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="What I work with."
      intro="Grouped by how I actually use them today — no percentage bars, no invented expertise."
    >
      <Reveal className="mb-8 flex flex-wrap gap-2">
        {(Object.keys(stateStyles) as SkillState[]).map((s) => (
          <span
            key={s}
            className={cn("rounded-full border px-3 py-1 text-xs font-medium", stateStyles[s])}
          >
            {s}
          </span>
        ))}
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.category} delay={i * 70}>
            <div className="glass card-hover h-full rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">
                {group.category}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    title={item.state}
                    className={cn(
                      "rounded-lg border px-2.5 py-1.5 text-sm transition-transform hover:-translate-y-0.5",
                      stateStyles[item.state],
                    )}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
