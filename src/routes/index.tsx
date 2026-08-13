import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Research } from "@/components/portfolio/Research";
import { Timeline } from "@/components/portfolio/Timeline";
import { Exploring } from "@/components/portfolio/Exploring";
import { GitHubSection } from "@/components/portfolio/GitHubSection";
import { Certifications } from "@/components/portfolio/Certifications";
import { Experience } from "@/components/portfolio/Experience";
import { LearningLog } from "@/components/portfolio/LearningLog";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

const title = "SK KAMREJ | Developer • AI/ML • Research";
const description =
  "Portfolio of SK KAMREJ — BCA Honours with Research student, software developer, AI/ML enthusiast, and aspiring researcher.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Timeline />
        <Exploring />
        <GitHubSection />
        <Experience />
        <Certifications />
        <LearningLog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
