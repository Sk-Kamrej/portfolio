import { createFileRoute } from "@tanstack/react-router";
import { getSiteData } from "@/lib/portfolio.functions";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Academics } from "@/components/portfolio/Academics";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Research } from "@/components/portfolio/Research";
import { Timeline } from "@/components/portfolio/Timeline";
import { GitHubSection } from "@/components/portfolio/GitHubSection";
import { Certifications } from "@/components/portfolio/Certifications";
import { Experience } from "@/components/portfolio/Experience";
import { LearningLog } from "@/components/portfolio/LearningLog";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

const title = "SK KAMREJ | Developer • AI/ML • Research";
const description =
  "Portfolio of SK KAMREJ — BCA Honours with Research student at Panskura Banamali College, software developer and AI/ML researcher.";

export const Route = createFileRoute("/")({
  loader: () => getSiteData(),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <p className="text-muted-foreground">
        Something went wrong loading the portfolio. Please refresh the page.
      </p>
    </div>
  ),
  component: Index,
});

function Index() {
  const data = Route.useLoaderData();
  const { profile } = data;

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <p className="text-muted-foreground">Portfolio content has not been set up yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar name={profile.name} resumeUrl={data.resumeUrl} />
      <main>
        <Hero
          profile={profile}
          currentStatus={data.currentStatus}
          socials={data.socials}
          resumeUrl={data.resumeUrl}
        />
        <About profile={profile} currentStatus={data.currentStatus} />
        <Academics
          academicProfile={data.academicProfile}
          records={data.academicRecords}
          education={data.education}
        />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Research
          research={data.research}
          interests={profile.research_interests}
          philosophy={profile.philosophy}
        />
        <Timeline journey={data.journey} />
        <GitHubSection username={profile.github_username} profileUrl={profile.github_url} />
        <Experience experience={data.experience} />
        <Certifications certifications={data.certifications} achievements={data.achievements} />
        <LearningLog posts={data.posts} />
        <Contact profile={profile} socials={data.socials} />
      </main>
      <Footer profile={profile} socials={data.socials} />
    </div>
  );
}
