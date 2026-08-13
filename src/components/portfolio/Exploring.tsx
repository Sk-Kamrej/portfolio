import { exploring } from "@/data/portfolio";
import { Section, Reveal } from "./Section";

export function Exploring() {
  return (
    <Section
      id="exploring"
      eyebrow="Learning"
      title="Currently Exploring"
      intro="Topics I'm actively reading, building and experimenting with."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {exploring.map((e, i) => (
          <Reveal key={e.title} delay={i * 60}>
            <div className="card-hover group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-5">
              <span
                className="absolute inset-x-0 -top-px h-px scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <h3 className="font-display text-base font-semibold text-foreground">{e.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{e.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
