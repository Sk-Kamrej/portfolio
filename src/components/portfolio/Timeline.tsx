import { timeline } from "@/data/portfolio";
import { Section, Reveal } from "./Section";

export function Timeline() {
  return (
    <Section id="journey" eyebrow="Journey" title="My Journey">
      <ol className="relative ml-3 border-l border-border pl-8 sm:ml-5 sm:pl-10">
        {timeline.map((item, i) => (
          <li key={item.year} className="relative pb-10 last:pb-0">
            <Reveal delay={i * 90}>
              <span
                className="absolute -left-[41px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-primary/50 bg-background sm:-left-[49px]"
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <div className="glass card-hover rounded-2xl p-5">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                  {item.year}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
