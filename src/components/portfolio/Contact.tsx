import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";
import { Section, Reveal } from "./Section";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    const e: Errors = {};
    if (values.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Enter a valid email address.";
    if (values.subject.trim().length < 3) e.subject = "Add a short subject.";
    if (values.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    const subject = encodeURIComponent(values.subject);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    toast("Opening your email client", {
      description: "No email backend is connected yet, so this form composes a message for you.",
    });
  };

  const field = (
    key: keyof typeof values,
    label: string,
    type = "text",
    textarea = false,
  ) => (
    <div className={cn(textarea && "sm:col-span-2")}>
      <label htmlFor={key} className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={key}
          rows={5}
          value={values[key]}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-error` : undefined}
          onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
          className="mt-2 w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50"
        />
      ) : (
        <input
          id={key}
          type={type}
          value={values[key]}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-error` : undefined}
          onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
          className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50"
        />
      )}
      {errors[key] && (
        <p id={`${key}-error`} className="mt-1.5 text-xs text-destructive">
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something meaningful."
      intro="Have an idea, research opportunity, project, or simply want to talk about technology? I'd love to hear from you."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="glass flex h-full flex-col justify-between rounded-2xl p-6">
            <ul className="space-y-3">
              {[
                { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
                { icon: Linkedin, label: "LinkedIn", value: "Connect on LinkedIn", href: profile.linkedin },
                { icon: Github, label: "GitHub", value: "See my code", href: profile.github },
              ].map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    className="card-hover flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                        {label}
                      </span>
                      <span className="block text-sm text-foreground">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground/80">
              Note: the form below isn&apos;t connected to an email backend yet — it opens your mail
              client with the message pre-filled.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={onSubmit} noValidate className="glass grid gap-5 rounded-2xl p-6 sm:grid-cols-2">
            {field("name", "Name")}
            {field("email", "Email", "email")}
            <div className="sm:col-span-2">{field("subject", "Subject")}</div>
            {field("message", "Message", "text", true)}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 sm:w-auto"
              >
                Send Message
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
