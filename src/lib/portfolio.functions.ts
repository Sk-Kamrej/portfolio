import { createServerFn } from "@tanstack/react-start";
import type { GithubStats, SiteData } from "@/lib/site-types";

export const getSiteData = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteData> => {
    const { fetchSiteData } = await import("@/lib/portfolio.server");
    return fetchSiteData();
  },
);

export const getGithubStats = createServerFn({ method: "GET" })
  .inputValidator((input: { username: string }) => ({
    username: String(input?.username ?? "").slice(0, 60),
  }))
  .handler(async ({ data }): Promise<GithubStats> => {
    const { fetchGithub } = await import("@/lib/portfolio.server");
    return fetchGithub(data.username);
  });
