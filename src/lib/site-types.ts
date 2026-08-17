import type { Tables } from "@/integrations/supabase/types";

export type Profile = Tables<"profile">;
export type Education = Tables<"education">;
export type AcademicProfile = Tables<"academic_profile">;
export type AcademicRecord = Tables<"academic_records">;
export type CurrentStatus = Tables<"current_status">;
export type Journey = Tables<"journey">;
export type ExperienceRow = Tables<"experience">;
export type ProjectRow = Tables<"projects">;
export type ResearchRow = Tables<"research">;
export type SkillRow = Tables<"skills">;
export type CertificationRow = Tables<"certifications">;
export type AchievementRow = Tables<"achievements">;
export type BlogPost = Tables<"blog_posts">;
export type SocialLink = Tables<"social_links">;
export type ResumeRow = Tables<"resumes">;
export type ContactMessage = Tables<"contact_messages">;

export type SiteData = {
  profile: Profile | null;
  academicProfile: AcademicProfile | null;
  academicRecords: AcademicRecord[];
  education: Education[];
  currentStatus: CurrentStatus[];
  journey: Journey[];
  experience: ExperienceRow[];
  projects: ProjectRow[];
  research: ResearchRow[];
  skills: SkillRow[];
  certifications: CertificationRow[];
  achievements: AchievementRow[];
  posts: BlogPost[];
  socials: SocialLink[];
  settings: Record<string, string>;
  resumeUrl: string | null;
};

export type GithubStats = {
  username: string;
  avatarUrl: string | null;
  name: string | null;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  htmlUrl: string;
  repos: {
    name: string;
    description: string | null;
    language: string | null;
    stars: number;
    url: string;
    updatedAt: string;
  }[];
  events: {
    id: string;
    type: string;
    repo: string;
    repoUrl: string;
    summary: string;
    createdAt: string;
  }[];
} | null;
