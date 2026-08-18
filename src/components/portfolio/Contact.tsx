import { useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { sendContactEmail } from "@/lib/portfolio.functions";
import type { Profile, SocialLink } from "@/lib/site-types";
import { Section, Reveal } from "./Section";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  subject: z.string().trim().min(3, "Add a short subject.").max(150),
  message: z.string().trim().min(10, "Message should be at least 10 characters.").max(2000),
});

type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;

const iconMap: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  email: Mail,
};

export function Contact({ profile, socials }: { profile: Profile; socials: SocialLink[] }) {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    // Validate form
    const parsed = schema.safeParse(values);

    if (!parsed.success) {
      const e: Errors = {};

      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Values;
        e[key] ??= issue.message;
      }

      setErrors(e);
      return;
    }

    setErrors({});
    setSending(true);

    try {
      // --------------------------------------------------
      // 1. Save message to Supabase
      // --------------------------------------------------
      const { error: dbError } = await supabase.from("contact_messages").insert(parsed.data);

      if (dbError) {
        console.error("Supabase error:", dbError);
        throw new Error("Database error");
      }

      // --------------------------------------------------
      // 2. Send email notification using Resend
      // --------------------------------------------------
      await sendContactEmail({
        data: parsed.data,
      });

      // --------------------------------------------------
      // 3. Clear form
      // --------------------------------------------------
      setValues({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // --------------------------------------------------
      // 4. Success message
      // --------------------------------------------------
      toast.success("Message sent successfully", {
        description: "Thanks for reaching out — I'll reply soon.",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      toast.error("Message could not be sent", {
        description: "Please try again in a moment.",
      });
    } finally {
      setSending(false);
    }
  };

  const field = (key: keyof Values, label: string, type = "text", textarea = false) => (
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
          onChange={(e) =>
            setValues((v) => ({
              ...v,
              [key]: e.target.value,
            }))
          }
          className="mt-2 w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
        />
      ) : (
        <input
          id={key}
          type={type}
          value={values[key]}
          aria-invalid={!!errors[key]}
          onChange={(e) =>
            setValues((v) => ({
              ...v,
              [key]: e.target.value,
            }))
          }
          className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
        />
      )}

      {errors[key] && <p className="mt-1.5 text-xs text-destructive">{errors[key]}</p>}
    </div>
  );

  const links = socials.length
    ? socials.map((s) => ({
        href: s.url,
        label: s.label,
        icon: iconMap[s.icon] ?? Github,
      }))
    : [
        {
          href: profile.github_url,
          label: "GitHub",
          icon: Github,
        },
        {
          href: profile.linkedin_url,
          label: "LinkedIn",
          icon: Linkedin,
        },
        {
          href: `mailto:${profile.email}`,
          label: "Email",
          icon: Mail,
        },
      ];

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something meaningful."
      intro="Have an idea, research opportunity, project, or simply want to talk about technology? I'd love to hear from you."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Direct Contact */}
        <Reveal>
          <div className="glass h-full rounded-2xl p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">Direct</p>

            <a
              href={`mailto:${profile.email}`}
              className="mt-4 block break-all font-display text-lg font-medium text-foreground hover:text-primary"
            >
              {profile.email}
            </a>

            <p className="mt-2 text-sm text-muted-foreground">
              {profile.college} · {profile.university}
            </p>

            <ul className="mt-6 space-y-3">
              {links.map(({ href, icon: Icon, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Contact Form */}
        <Reveal delay={100}>
          <form onSubmit={onSubmit} className="glass grid gap-5 rounded-2xl p-6 sm:grid-cols-2">
            {field("name", "Name")}

            {field("email", "Email", "email")}

            {field("subject", "Subject")}

            {field("message", "Message", "text", true)}

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
              >
                <Send className="h-4 w-4" />

                {sending ? "Sending…" : "Send Message"}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
