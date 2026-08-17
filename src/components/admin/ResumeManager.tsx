import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Loader2, Star, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { ResumeRow } from "@/lib/site-types";

const BUCKET = "resumes";
const MAX_BYTES = 10 * 1024 * 1024;

export function ResumeManager() {
  const [rows, setRows] = useState<ResumeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [label, setLabel] = useState("Resume");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data ?? []) as ResumeRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const upload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast.error("Choose a PDF file first.");
      return;
    }
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error("File must be under 10 MB.");
      return;
    }
    setBusy(true);
    try {
      const path = `resume/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { contentType: "application/pdf", upsert: false });
      if (upErr) throw new Error(upErr.message);

      const version = rows.reduce((max, r) => Math.max(max, r.version ?? 0), 0) + 1;
      await supabase.from("resumes").update({ is_active: false }).neq("id", "");
      const { error: insErr } = await supabase.from("resumes").insert({
        file_path: path,
        file_url: path,
        label: label.trim().slice(0, 80) || "Resume",
        version,
        is_active: true,
      });
      if (insErr) throw new Error(insErr.message);

      if (fileRef.current) fileRef.current.value = "";
      toast.success("Resume uploaded and set as active.");
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  };

  const download = async (row: ResumeRow) => {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(row.file_path, 60 * 10);
    if (error || !data?.signedUrl) {
      toast.error(error?.message ?? "Could not create download link.");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const activate = async (row: ResumeRow) => {
    setBusy(true);
    await supabase.from("resumes").update({ is_active: false }).neq("id", row.id);
    const { error } = await supabase.from("resumes").update({ is_active: true }).eq("id", row.id);
    if (error) toast.error(error.message);
    else toast.success("Active resume updated.");
    setBusy(false);
    await load();
  };

  const remove = async (row: ResumeRow) => {
    setBusy(true);
    await supabase.storage.from(BUCKET).remove([row.file_path]);
    const { error } = await supabase.from("resumes").delete().eq("id", row.id);
    if (error) toast.error(error.message);
    else toast.success("Resume deleted.");
    setBusy(false);
    await load();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="font-display text-base font-semibold">Upload a new resume</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          PDF only, up to 10 MB. The newest upload becomes the active resume shown on your site.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            maxLength={80}
            placeholder="Label"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            className="text-xs text-muted-foreground file:mr-3 file:rounded-full file:border-0 file:bg-primary/15 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-primary"
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => void upload()}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            Upload
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="font-display text-base font-semibold">Uploaded resumes</h2>
        {loading ? (
          <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No resume uploaded yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {rows.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background p-4"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {r.label} <span className="text-muted-foreground">· v{r.version}</span>
                    {r.is_active && (
                      <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Active
                      </span>
                    )}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">{r.file_path}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => void download(r)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:text-primary"
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </button>
                  {!r.is_active && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void activate(r)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:text-primary"
                    >
                      <Star className="h-3.5 w-3.5" /> Set active
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void remove(r)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
