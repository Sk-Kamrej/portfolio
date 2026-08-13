import { Section, Reveal } from "./Section";

const currently = [
  { label: "Education", value: "BCA Honours with Research" },
  { label: "Focus", value: "Software Development + AI/ML" },
  { label: "Interests", value: "Research • Technology • Real-world Problem Solving" },
  { label: "Goal", value: "Build meaningful technology and pursue advanced research" },
];

const traits = [
  "Learning through real projects",
  "Curiosity about how systems work",
  "Interest in AI/ML",
  "Software development",
  "Research mindset",
  "Product thinking",
  "Continuous learning",
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="More than a student.">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            I&apos;m currently pursuing BCA Honours with Research, and most of what I know has come
            from building things rather than only reading about them. Software development is where
            I started, and it is still where I spend most of my time — writing code, breaking it,
            and understanding why it broke.
          </p>
          <p>
            Alongside that, I&apos;ve been drawn to artificial intelligence and machine learning,
            not as a buzzword but as a set of tools with real limitations worth understanding. My
            research track pushes me to ask better questions: what problem is actually being solved,
            what does the data say, and what happens when the model is wrong?
          </p>
          <p>
            I care about product thinking as much as implementation. A system that works but nobody
            can use is an unfinished system. So I keep learning — architecture, design, research
            methodology — and keep shipping small, honest projects that teach me something new.
          </p>
          <ul className="flex flex-wrap gap-2 pt-2">
            {traits.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-foreground/80"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass card-hover rounded-2xl p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
              Currently
            </p>
            <dl className="mt-5 space-y-5">
              {currently.map((c) => (
                <div key={c.label} className="border-b border-border pb-5 last:border-0 last:pb-0">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    {c.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-base font-medium text-foreground">
                    {c.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
