import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LogOut, ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CollectionEditor, type Field } from "@/components/admin/CollectionEditor";
import { ResumeManager } from "@/components/admin/ResumeManager";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | SK KAMREJ" },
      { name: "description", content: "Manage portfolio content." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Dashboard | SK KAMREJ" },
      { property: "og:description", content: "Manage portfolio content." },
    ],
  }),
  component: AdminPage,
});

type Tab = {
  id: string;
  label: string;
  table: string;
  orderBy?: string;
  labelKey?: string;
  fields: Field[];
};

const tabs: Tab[] = [
  {
    id: "projects",
    label: "Projects",
    table: "projects",
    labelKey: "title",
    fields: [
      { key: "name", label: "Project name" },
      { key: "slug", label: "Slug" },
      { key: "status", label: "Status" },
      { key: "category", label: "Category" },
      { key: "short_description", label: "Short description", type: "textarea" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "problem", label: "Problem", type: "textarea" },
      { key: "solution", label: "Solution", type: "textarea" },
      { key: "architecture", label: "Architecture", type: "textarea" },
      { key: "challenges", label: "Challenges", type: "textarea" },
      { key: "technologies", label: "Technologies", type: "array" },
      { key: "features", label: "Features", type: "array" },
      { key: "learned", label: "Learnings", type: "array" },
      { key: "github_url", label: "GitHub URL" },
      { key: "live_url", label: "Live URL" },
      { key: "sort_order", label: "Sort order", type: "number" },
      { key: "featured", label: "Featured", type: "boolean" },
      { key: "published", label: "Published", type: "boolean" },
    ],
  },
  {
    id: "skills",
    label: "Skills",
    table: "skills",
    labelKey: "name",
    fields: [
      { key: "name", label: "Name" },
      { key: "category", label: "Category" },
      { key: "state", label: "State (Working With / Learning / Exploring)" },
      { key: "sort_order", label: "Sort order", type: "number" },
      { key: "published", label: "Published", type: "boolean" },
    ],
  },
  {
    id: "journey",
    label: "Journey",
    table: "journey",
    fields: [
      { key: "year", label: "Year" },
      { key: "title", label: "Title" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "category", label: "Category" },
      { key: "technologies", label: "Technologies", type: "array" },
      { key: "sort_order", label: "Sort order", type: "number" },
      { key: "published", label: "Published", type: "boolean" },
    ],
  },
  {
    id: "research",
    label: "Research",
    table: "research",
    fields: [
      { key: "title", label: "Title" },
      { key: "area", label: "Area" },
      { key: "status", label: "Status" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "methodology", label: "Methodology", type: "textarea" },
      { key: "dataset", label: "Dataset" },
      { key: "tools", label: "Tools", type: "array" },
      { key: "github_url", label: "GitHub URL" },
      { key: "sort_order", label: "Sort order", type: "number" },
      { key: "published", label: "Published", type: "boolean" },
    ],
  },
  {
    id: "academic_records",
    label: "Semesters",
    table: "academic_records",
    labelKey: "semester",
    fields: [
      { key: "semester", label: "Semester" },
      { key: "sgpa", label: "SGPA", type: "number" },
      { key: "year", label: "Year" },
      { key: "status", label: "Status" },
      { key: "sort_order", label: "Sort order", type: "number" },
      { key: "published", label: "Published", type: "boolean" },
    ],
  },
  {
    id: "education",
    label: "Education",
    table: "education",
    labelKey: "degree",
    fields: [
      { key: "degree", label: "Degree" },
      { key: "institution", label: "Institution" },
      { key: "board", label: "Board / University" },
      { key: "duration", label: "Duration" },
      { key: "result", label: "Result" },
      { key: "sort_order", label: "Sort order", type: "number" },
      { key: "published", label: "Published", type: "boolean" },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    table: "experience",
    labelKey: "role",
    fields: [
      { key: "role", label: "Role" },
      { key: "organization", label: "Organization" },
      { key: "employment_type", label: "Type" },
      { key: "location", label: "Location" },
      { key: "start_date", label: "Start date" },
      { key: "end_date", label: "End date" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "technologies", label: "Technologies", type: "array" },
      { key: "is_current", label: "Current", type: "boolean" },
      { key: "sort_order", label: "Sort order", type: "number" },
      { key: "published", label: "Published", type: "boolean" },
    ],
  },
  {
    id: "certifications",
    label: "Certifications",
    table: "certifications",
    fields: [
      { key: "name", label: "Title" },
      { key: "organization", label: "Issuer" },
      { key: "issue_date", label: "Issue date" },
      { key: "credential_id", label: "Credential ID" },
      { key: "credential_url", label: "Credential URL" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "skills", label: "Skills", type: "array" },
      { key: "sort_order", label: "Sort order", type: "number" },
      { key: "published", label: "Published", type: "boolean" },
    ],
  },
  {
    id: "achievements",
    label: "Achievements",
    table: "achievements",
    fields: [
      { key: "title", label: "Title" },
      { key: "organization", label: "Organization" },
      { key: "date", label: "Date" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "sort_order", label: "Sort order", type: "number" },
      { key: "published", label: "Published", type: "boolean" },
    ],
  },
  {
    id: "blog_posts",
    label: "Learning Log",
    table: "blog_posts",
    fields: [
      { key: "title", label: "Title" },
      { key: "slug", label: "Slug" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "content", label: "Content", type: "textarea" },
      { key: "tags", label: "Tags", type: "array" },
      { key: "published_at", label: "Published at" },
      { key: "sort_order", label: "Sort order", type: "number" },
      { key: "published", label: "Published", type: "boolean" },
    ],
  },
  {
    id: "current_status",
    label: "Current Status",
    table: "current_status",
    labelKey: "label",
    fields: [
      { key: "label", label: "Label" },
      { key: "value", label: "Value" },
      { key: "sort_order", label: "Sort order", type: "number" },
      { key: "published", label: "Published", type: "boolean" },
    ],
  },
  {
    id: "social_links",
    label: "Social Links",
    table: "social_links",
    labelKey: "label",
    fields: [
      { key: "label", label: "Label" },
      { key: "url", label: "URL" },
      { key: "icon", label: "Icon (github / linkedin / mail)" },
      { key: "sort_order", label: "Sort order", type: "number" },
      { key: "published", label: "Published", type: "boolean" },
    ],
  },
  {
    id: "resumes",
    label: "Resume",
    table: "resumes",
    labelKey: "label",
    fields: [],
  },
  {
    id: "contact_messages",
    label: "Messages",
    table: "contact_messages",
    orderBy: "created_at",
    labelKey: "subject",
    fields: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "subject", label: "Subject" },
      { key: "message", label: "Message", type: "textarea" },
    ],
  },
];

function AdminPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(tabs[0]!.id);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return;
      const { data } = await supabase.rpc("has_role", { _user_id: uid, _role: "admin" });
      if (!cancelled) setIsAdmin(Boolean(data));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  };

  const tab = tabs.find((t) => t.id === active) ?? tabs[0]!;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">Admin</p>
            <h1 className="font-display text-lg font-semibold">Content dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary">
              View site
            </Link>
            <button
              type="button"
              onClick={() => void signOut()}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition hover:text-destructive"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
        {isAdmin === false && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">
            <ShieldAlert className="mt-0.5 h-4 w-4 text-destructive" />
            <p>
              This account does not have the admin role, so saving changes will be rejected by the
              database.
            </p>
          </div>
        )}

        <nav className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className={
                t.id === active
                  ? "rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                  : "rounded-full border border-border bg-surface px-4 py-2 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              }
            >
              {t.label}
            </button>
          ))}
        </nav>

        <section className="mt-8">
          {tab.id === "resumes" ? (
            <ResumeManager />
          ) : (
            <CollectionEditor
              key={tab.id}
              table={tab.table}
              title={tab.label}
              fields={tab.fields}
              orderBy={tab.orderBy ?? "sort_order"}
              labelKey={tab.labelKey ?? "title"}
            />
          )}
        </section>
      </main>
    </div>
  );
}
