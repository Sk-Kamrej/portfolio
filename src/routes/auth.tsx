import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { adminExists, createFirstAdmin } from "@/lib/admin-bootstrap.functions";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In | SK KAMREJ" },
      { name: "description", content: "Secure sign in for the portfolio admin dashboard." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Sign In | SK KAMREJ" },
      { property: "og:description", content: "Secure sign in for the portfolio admin dashboard." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const { data: adminState, refetch } = useQuery({
    queryKey: ["admin-exists"],
    queryFn: () => adminExists(),
  });
  const setupMode = adminState?.exists === false;

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setBusy(true);
    try {
      if (setupMode) {
        if (password.length < 8) {
          toast.error("Password must be at least 8 characters.");
          return;
        }
        await createFirstAdmin({ data: { email, password } });
        await refetch();
        toast.success("Admin account created — signing you in…");
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error("Sign in failed", { description: error.message });
        return;
      }
      void navigate({ to: "/admin", replace: true });
    } catch (e) {
      toast.error("Something went wrong", { description: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-20">
      <form onSubmit={submit} className="glass w-full max-w-sm rounded-2xl p-7">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary">
          <Lock className="h-4 w-4" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-semibold">
          {setupMode ? "Create admin account" : "Admin access"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {setupMode
            ? "No admin exists yet. Set your email and password to claim the dashboard."
            : "This area is private. Sign in to manage portfolio content."}
        </p>

        <label
          htmlFor="email"
          className="mt-6 block text-xs uppercase tracking-wider text-muted-foreground"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary/50"
        />

        <label
          htmlFor="password"
          className="mt-4 block text-xs uppercase tracking-wider text-muted-foreground"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete={setupMode ? "new-password" : "current-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary/50"
        />

        <button
          type="submit"
          disabled={busy}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {setupMode ? "Create account & sign in" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
