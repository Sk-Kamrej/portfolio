export const profile = {
  name: "SK KAMREJ",
  role: "BCA Honours with Research Student",
  tagline: "Software Developer • AI/ML Enthusiast • Researcher",
  motto: "Building useful technology. Learning by creating.",
  email: "hello@example.com",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/in/",
};

export type SkillState = "Working With" | "Learning" | "Exploring";

export const skillGroups: {
  category: string;
  items: { name: string; state: SkillState }[];
}[] = [
  {
    category: "Programming",
    items: [
      { name: "C", state: "Working With" },
      { name: "C++", state: "Working With" },
      { name: "Java", state: "Learning" },
      { name: "Python", state: "Working With" },
      { name: "JavaScript", state: "Working With" },
    ],
  },
  {
    category: "Web Development",
    items: [
      { name: "HTML", state: "Working With" },
      { name: "CSS", state: "Working With" },
      { name: "JavaScript", state: "Working With" },
      { name: "React", state: "Learning" },
      { name: "Node.js", state: "Learning" },
      { name: "REST APIs", state: "Learning" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MySQL", state: "Working With" },
      { name: "Oracle SQL", state: "Learning" },
      { name: "PostgreSQL", state: "Exploring" },
    ],
  },
  {
    category: "AI / Machine Learning",
    items: [
      { name: "Python", state: "Working With" },
      { name: "Machine Learning", state: "Learning" },
      { name: "Data Analysis", state: "Learning" },
      { name: "Explainable AI", state: "Exploring" },
      { name: "Model Evaluation", state: "Learning" },
      { name: "Data Visualization", state: "Learning" },
    ],
  },
  {
    category: "Tools & Technologies",
    items: [
      { name: "Git", state: "Working With" },
      { name: "GitHub", state: "Working With" },
      { name: "VS Code", state: "Working With" },
      { name: "Linux", state: "Learning" },
      { name: "LaTeX", state: "Learning" },
      { name: "Figma", state: "Exploring" },
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  status: string;
  short: string;
  tech: string[];
  problem: string;
  solution: string;
  overview: string;
  features: string[];
  architecture: string;
  learned: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    slug: "smartattendify",
    name: "SmartAttendify",
    status: "Currently Building",
    featured: true,
    short:
      "A modern college attendance management platform designed with a mobile-first, API-first architecture, focusing on simplifying attendance tracking and creating a foundation for future mobile applications.",
    tech: ["React", "Node.js", "REST API", "Database", "Authentication"],
    problem:
      "Attendance in colleges is still handled through paper registers and scattered spreadsheets, which makes records hard to verify, slow to compile and nearly impossible to analyse.",
    solution:
      "A single platform where attendance is captured quickly on a phone, stored through a clean API layer, and surfaced back as readable summaries for students, faculty and administration.",
    overview:
      "SmartAttendify is being built as an API-first system so the same backend can later power a web dashboard and a native mobile app without rewrites.",
    features: [
      "Mobile-first attendance capture flow",
      "Role-based access for students, faculty and admin",
      "Session and subject wise attendance records",
      "Summary views and shortage indicators",
      "API layer prepared for a future mobile client",
    ],
    architecture:
      "React front-end talking to a Node.js REST API, with token-based authentication and a relational database schema modelling users, subjects, sessions and attendance entries.",
    learned: [
      "Designing schemas before writing feature code",
      "Keeping the API contract stable while the UI changes",
      "Thinking about the product, not only the implementation",
    ],
  },
  {
    slug: "caesarean-section-prediction",
    name: "Caesarean Section Prediction",
    status: "Research Project",
    short:
      "An ML research project focused on predicting Caesarean section outcomes using machine learning and explainable AI techniques.",
    tech: ["Python", "Machine Learning", "LightGBM", "SHAP", "DALEX"],
    problem:
      "Clinical prediction models are often accurate but opaque, which limits how much practitioners can trust or interrogate their output.",
    solution:
      "Pair gradient boosting models with explainability tooling so every prediction can be traced back to the features that drove it.",
    overview:
      "A study-oriented project exploring model performance alongside interpretability, rather than optimising accuracy alone.",
    features: [
      "Data cleaning and feature preparation",
      "Model training and comparison",
      "Evaluation beyond accuracy",
      "SHAP and DALEX based explanations",
      "Visual reporting of feature influence",
    ],
    architecture:
      "A Python notebook workflow: preprocessing, training with LightGBM, evaluation, then explanation layers with SHAP and DALEX.",
    learned: [
      "Why evaluation metrics must match the problem",
      "How explainability changes model choices",
      "Reading results critically instead of chasing scores",
    ],
  },
  {
    slug: "future-project",
    name: "Future Project",
    status: "In Ideation",
    placeholder: true,
    short: "Something new is always being built.",
    tech: ["TBD"],
    problem: "To be defined.",
    solution: "To be defined.",
    overview:
      "This slot is reserved for the next experiment — a tool, a research prototype, or something built purely to learn.",
    features: ["Details coming soon"],
    architecture: "To be defined.",
    learned: ["To be documented"],
  },
];

export const researchCards = [
  {
    title: "Machine Learning",
    body: "Understanding how models learn from data, where they generalise, and where they quietly break.",
  },
  {
    title: "Explainable AI",
    body: "Working with SHAP and DALEX style tooling to make model behaviour inspectable instead of magical.",
  },
  {
    title: "Applied Research",
    body: "Taking research ideas out of notebooks and testing them against real, messy problems.",
  },
];

export const timeline = [
  {
    year: "2023",
    text: "Started BCA journey and began exploring programming and computer applications.",
  },
  {
    year: "2024",
    text: "Expanded into software development, databases, web technologies, and practical projects.",
  },
  {
    year: "2025",
    text: "Started exploring machine learning, AI, research, and real-world problem solving.",
  },
  {
    year: "2026",
    text: "BCA Honours with Research — building projects, documenting my learning journey, and exploring AI/ML research.",
  },
  {
    year: "Future",
    text: "MCA → Advanced Research → Technology & Academia",
  },
];

export const exploring = [
  { title: "AI & Machine Learning", note: "Models, data, evaluation" },
  { title: "Software Architecture", note: "Structure that survives change" },
  { title: "System Design", note: "Scale, trade-offs, reliability" },
  { title: "Research Methodology", note: "Asking answerable questions" },
  { title: "Full-stack Development", note: "End-to-end product building" },
  { title: "Explainable AI", note: "Interpretability over black boxes" },
];

export type Certification = {
  title: string;
  organization: string;
  date: string;
  link?: string;
};

// Add real certifications here as they are earned.
export const certifications: Certification[] = [];

export type Experience = {
  role: string;
  organization: string;
  duration: string;
  work: string;
  tech: string[];
  learning: string;
};

// Add internships / experience entries here.
export const experiences: Experience[] = [];

export const learningLog = [
  {
    title: "Building SmartAttendify",
    note: "Notes on designing an API-first attendance platform.",
    tag: "Project log",
  },
  {
    title: "Understanding Explainable AI",
    note: "What SHAP values actually tell you — and what they don't.",
    tag: "AI/ML",
  },
  {
    title: "What I learned from my first ML project",
    note: "Data quality beats model complexity, every time.",
    tag: "Research",
  },
];
