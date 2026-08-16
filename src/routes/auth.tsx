import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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

  const signIn = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      toast.error("Sign in failed", { description: error.message });
      return;
    }
    void navigate({ to: "/admin", replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-20">
      <form onSubmit={signIn} className="glass w-full max-w-sm rounded-2xl p-7">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary">
          <Lock className="h-4 w-4" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-semibold">Admin access</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This area is private. Sign in to manage portfolio content.
        </p>

        <label htmlFor="email" className="mt-6 block text-xs uppercase tracking-wider text-muted-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary/50"
        />

        <label htmlFor="password" className="mt-4 block text-xs uppercase tracking-wider text-muted-foreground">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
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
          Sign in
        </button>
      </form>
    </main>
  );
}
