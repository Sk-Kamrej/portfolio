import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { GithubStats, SiteData } from "@/lib/site-types";

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
    db.from(table as never).select("*").eq("published", true).order("sort_order");

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

  let resumeUrl: string | null = null;
  if (resume.data?.file_path) {
    resumeUrl = await signResume(resume.data.file_path);
  }

  return {
    profile: profile.data ?? null,
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
    socials: (socials.data ?? []) as SiteData["socials"],
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
    const [userRes, repoRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers }),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`,
        { headers },
      ),
    ]);
    if (!userRes.ok) return null;
    const user = (await userRes.json()) as Record<string, never>;
    const repos = repoRes.ok ? ((await repoRes.json()) as Record<string, never>[]) : [];
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
    };
  } catch {
    return null;
  }
}
