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

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator(
    (input: { name: string; email: string; subject: string; message: string }) => input,
  )
  .handler(async ({ data }) => {
    const { Resend } = await import("resend");

    const apiKey = process.env["RESEND_API_KEY"];

    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured.");
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["skkamrej786@gmail.com"],
      replyTo: data.email,
      subject: `Portfolio: ${data.subject}`,
      text: [
        "New message from your portfolio",
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Subject: ${data.subject}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  });
