import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { GithubStats, SiteData } from "@/lib/site-types";

const LINKEDIN_URL = "https://www.linkedin.com/in/sk-kamrej-740031313/";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export async function fetchSiteData(): Promise<SiteData> {
  const db = publicClient();
  const pub = <T extends string>(table: T) =>
    db
      .from(table as never)
      .select("*")
      .eq("published", true)
      .order("sort_order");

  const [
    profile,
    academicProfile,
    academicRecords,
    education,
    currentStatus,
    journey,
    experience,
    projects,
    research,
    skills,
    certifications,
    achievements,
    posts,
    socials,
    settings,
    resume,
  ] = await Promise.all([
    db.from("profile").select("*").limit(1).maybeSingle(),
    db.from("academic_profile").select("*").limit(1).maybeSingle(),
    pub("academic_records"),
    pub("education"),
    pub("current_status"),
    pub("journey"),
    pub("experience"),
    pub("projects"),
    pub("research"),
    pub("skills"),
    pub("certifications"),
    pub("achievements"),
    pub("blog_posts"),
    pub("social_links"),
    db.from("site_settings").select("*"),
    db.from("resumes").select("*").eq("is_active", true).limit(1).maybeSingle(),
  ]);

  const settingsMap: Record<string, string> = {};
  for (const row of settings.data ?? []) {
    if (row.value != null) settingsMap[row.key] = row.value;
  }

  const resumeUrl: string | null = null;

  const profileData = profile.data
    ? {
        ...profile.data,
        hero_intro:
          "I'm a 4th Year BCA Honours with Research student interested in software development, artificial intelligence, machine learning, and research. I learn by building practical projects, experimenting with technology, and exploring real-world problems.",
        linkedin_url: LINKEDIN_URL,
      }
    : null;

  const socialsData = ((socials.data ?? []) as SiteData["socials"]).map((social) =>
    social.label.toLowerCase() === "linkedin"
      ? {
          ...social,
          url: LINKEDIN_URL,
        }
      : social,
  );

  return {
    profile: profileData,
    academicProfile: academicProfile.data ?? null,
    academicRecords: (academicRecords.data ?? []) as SiteData["academicRecords"],
    education: (education.data ?? []) as SiteData["education"],
    currentStatus: (currentStatus.data ?? []) as SiteData["currentStatus"],
    journey: (journey.data ?? []) as SiteData["journey"],
    experience: (experience.data ?? []) as SiteData["experience"],
    projects: (projects.data ?? []) as SiteData["projects"],
    research: (research.data ?? []) as SiteData["research"],
    skills: (skills.data ?? []) as SiteData["skills"],
    certifications: (certifications.data ?? []) as SiteData["certifications"],
    achievements: (achievements.data ?? []) as SiteData["achievements"],
    posts: (posts.data ?? []) as SiteData["posts"],
    socials: socialsData as SiteData["socials"],
    settings: settingsMap,
    resumeUrl,
  };
}

export async function signResume(path: string): Promise<string | null> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.storage.from("resumes").createSignedUrl(path, 60 * 60);
  return data?.signedUrl ?? null;
}

export async function fetchGithub(username: string): Promise<GithubStats> {
  if (!username) return null;
  const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio" };
  try {
    const [userRes, repoRes, eventRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers }),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`,
        { headers },
      ),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=30`,
        { headers },
      ),
    ]);
    if (!userRes.ok) return null;
    const user = (await userRes.json()) as Record<string, unknown>;
    const repos = repoRes.ok ? ((await repoRes.json()) as Record<string, unknown>[]) : [];
    const rawEvents = eventRes.ok ? ((await eventRes.json()) as Record<string, unknown>[]) : [];
    const events = rawEvents.slice(0, 10).map((e) => {
      const repoName = String((e["repo"] as Record<string, unknown> | undefined)?.["name"] ?? "");
      const payload = (e["payload"] ?? {}) as Record<string, unknown>;
      const type = String(e["type"] ?? "Event");
      let summary = type.replace(/Event$/, "");
      if (type === "PushEvent") {
        const commits = (payload["commits"] as unknown[] | undefined)?.length ?? 0;
        summary = `Pushed ${commits} commit${commits === 1 ? "" : "s"} to ${String(payload["ref"] ?? "").replace("refs/heads/", "")}`;
      } else if (type === "CreateEvent") {
        summary = `Created ${String(payload["ref_type"] ?? "repository")}`;
      } else if (type === "WatchEvent") {
        summary = "Starred repository";
      } else if (type === "ForkEvent") {
        summary = "Forked repository";
      } else if (type === "IssuesEvent" || type === "PullRequestEvent") {
        summary = `${String(payload["action"] ?? "updated")} ${type === "IssuesEvent" ? "an issue" : "a pull request"}`;
      } else if (type === "IssueCommentEvent") {
        summary = "Commented on an issue";
      } else if (type === "ReleaseEvent") {
        summary = "Published a release";
      }
      return {
        id: String(e["id"] ?? `${repoName}-${String(e["created_at"])}`),
        type,
        repo: repoName,
        repoUrl: `https://github.com/${repoName}`,
        summary,
        createdAt: String(e["created_at"] ?? ""),
      };
    });
    return {
      username,
      avatarUrl: (user["avatar_url"] as string | null) ?? null,
      name: (user["name"] as string | null) ?? null,
      bio: (user["bio"] as string | null) ?? null,
      publicRepos: Number(user["public_repos"] ?? 0),
      followers: Number(user["followers"] ?? 0),
      following: Number(user["following"] ?? 0),
      htmlUrl: (user["html_url"] as string) ?? `https://github.com/${username}`,
      repos: repos.map((r) => ({
        name: String(r["name"]),
        description: (r["description"] as string | null) ?? null,
        language: (r["language"] as string | null) ?? null,
        stars: Number(r["stargazers_count"] ?? 0),
        url: String(r["html_url"]),
        updatedAt: String(r["updated_at"]),
      })),
      events,
    };
  } catch {
    return null;
  }
}
