import { useEffect, useState } from "react";
import { Github, Star } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { getGithubStats } from "@/lib/portfolio.functions";
import type { GithubStats } from "@/lib/site-types";
import { Section, Reveal } from "./Section";

export function GitHubSection({
  username,
  profileUrl,
}: {
  username: string;
  profileUrl: string;
}) {
  const fetchStats = useServerFn(getGithubStats);
  const [stats, setStats] = useState<GithubStats>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    if (!username) {
      setLoading(false);
      return;
    }
    fetchStats({ data: { username } })
      .then((s) => {
        if (alive) setStats(s);
      })
      .catch(() => undefined)
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [username]);

  const metrics = stats
    ? [
        { label: "Public repos", value: stats.publicRepos },
        { label: "Followers", value: stats.followers },
        { label: "Following", value: stats.following },
      ]
    : [];

  return (
    <Section id="github" eyebrow="Activity" title="Code is where ideas become experiments.">
      <Reveal>
        <div className="glass rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {loading
                ? "Loading live GitHub activity…"
                : stats
                  ? `Live from GitHub · @${stats.username}`
                  : "GitHub activity is temporarily unavailable."}
            </p>
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Github className="h-4 w-4" /> View GitHub Profile
            </a>
          </div>

          {metrics.length > 0 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-border bg-surface p-4">
                  <p className="font-display text-2xl font-semibold text-foreground">{m.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {stats && stats.repos.length > 0 && (
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {stats.repos.map((r) => (
                <li key={r.name}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="card-hover block h-full rounded-xl border border-border bg-surface p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium text-foreground">{r.name}</span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3" /> {r.stars}
                      </span>
                    </div>
                    {r.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {r.description}
                      </p>
                    )}
                    {r.language && (
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-primary">
                        {r.language}
                      </p>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {stats && stats.events.length > 0 && (
            <div className="mt-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                Recent activity
              </h3>
              <ol className="mt-4 space-y-3 border-l border-border pl-5">
                {stats.events.map((e) => (
                  <li key={e.id} className="relative">
                    <span
                      className="absolute -left-[1.6rem] top-2 h-2 w-2 rounded-full bg-primary/70"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-foreground">
                      {e.summary}{" "}
                      <a
                        href={e.repoUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-primary hover:underline"
                      >
                        {e.repo}
                      </a>
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {new Date(e.createdAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
