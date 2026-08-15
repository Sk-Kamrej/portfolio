import { useEffect, useMemo, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { useActiveSection } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const links = [
  { id: "about", label: "About" },
  { id: "academics", label: "Academics" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export function Navbar({ name, resumeUrl }: { name: string; resumeUrl: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ids = useMemo(() => links.map((l) => l.id), []);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass border-b border-border py-3" : "border-b border-transparent py-5",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#hero"
          className="font-display text-sm font-bold uppercase tracking-[0.28em] text-foreground transition-colors hover:text-primary"
        >
          {name}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm transition-colors",
                  active === l.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-px origin-center bg-primary transition-transform duration-300",
                    active === l.id ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            </li>
          ))}
          {resumeUrl && (
            <li>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              >
                <Download className="h-3.5 w-3.5" /> Resume
              </a>
            </li>
          )}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
        >
          <Menu
            className={cn(
              "absolute h-5 w-5 transition-all duration-300",
              open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
            )}
          />
          <X
            className={cn(
              "absolute h-5 w-5 transition-all duration-300",
              open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
            )}
          />
        </button>
      </nav>

      <div
        className={cn(
          "glass overflow-hidden transition-[max-height,opacity] duration-500 lg:hidden",
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {links.map((l, i) => (
            <li
              key={l.id}
              style={{ transitionDelay: `${open ? i * 45 : 0}ms` }}
              className={cn(
                "transition-all duration-300",
                open ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0",
              )}
            >
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-3 text-base transition-colors",
                  active === l.id
                    ? "bg-surface text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
          {resumeUrl && (
            <li>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-1 block rounded-lg bg-primary/10 px-3 py-3 text-base text-primary"
              >
                Download Resume
              </a>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
