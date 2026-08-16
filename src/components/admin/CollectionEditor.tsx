import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { deleteRow, insertRow, listRows, updateRow, type AdminRow } from "@/lib/admin-db";

export type FieldType = "text" | "textarea" | "number" | "boolean" | "array";

export type Field = {
  key: string;
  label: string;
  type?: FieldType;
};

type Props = {
  table: string;
  title: string;
  fields: Field[];
  orderBy?: string;
  labelKey?: string;
};

function emptyValues(fields: Field[]): Record<string, string | number | boolean> {
  const v: Record<string, string | number | boolean> = {};
  for (const f of fields) {
    v[f.key] = f.type === "boolean" ? false : f.type === "number" ? 0 : "";
  }
  return v;
}

function toForm(row: AdminRow, fields: Field[]) {
  const v = emptyValues(fields);
  for (const f of fields) {
    const raw = row[f.key];
    if (raw == null) continue;
    if (f.type === "array") v[f.key] = (raw as string[]).join(", ");
    else if (f.type === "boolean") v[f.key] = Boolean(raw);
    else if (f.type === "number") v[f.key] = Number(raw);
    else v[f.key] = String(raw);
  }
  return v;
}

function toPayload(form: Record<string, string | number | boolean>, fields: Field[]) {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    const val = form[f.key];
    if (f.type === "array") {
      out[f.key] = String(val)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (f.type === "number") {
      out[f.key] = Number(val) || 0;
    } else if (f.type === "boolean") {
      out[f.key] = Boolean(val);
    } else {
      const s = String(val).trim();
      out[f.key] = s === "" ? null : s;
    }
  }
  return out;
}

export function CollectionEditor({
  table,
  title,
  fields,
  orderBy = "sort_order",
  labelKey = "title",
}: Props) {
  const [rows, setRows] = useState<AdminRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AdminRow | "new" | null>(null);
  const [form, setForm] = useState(emptyValues(fields));
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setRows(await listRows(table, orderBy));
    } catch (e) {
      toast.error(`Could not load ${title}`, { description: (e as Error).message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  const openNew = () => {
    setForm(emptyValues(fields));
    setEditing("new");
  };

  const openEdit = (row: AdminRow) => {
    setForm(toForm(row, fields));
    setEditing(row);
  };

  const save = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSaving(true);
    try {
      const payload = toPayload(form, fields);
      if (editing === "new") await insertRow(table, payload);
      else if (editing) await updateRow(table, editing.id, payload);
      toast.success("Saved");
      setEditing(null);
      await load();
    } catch (e) {
      toast.error("Save failed", { description: (e as Error).message });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row: AdminRow) => {
    if (!confirm("Delete this entry permanently?")) return;
    try {
      await deleteRow(table, row.id);
      toast.success("Deleted");
      await load();
    } catch (e) {
      toast.error("Delete failed", { description: (e as Error).message });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-xl font-semibold text-foreground">{title}</h2>
        <button
          type="button"
          onClick={openNew}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:brightness-110"
        >
          <Plus className="h-3.5 w-3.5" /> New
        </button>
      </div>

      {loading ? (
        <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : rows.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">No entries yet.</p>
      ) : (
        <ul className="mt-6 space-y-2">
          {rows.map((row) => (
            <li
              key={row.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3"
            >
              <span className="truncate text-sm text-foreground">
                {String(row[labelKey] ?? row["name"] ?? row["title"] ?? row.id)}
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(row)}
                  aria-label="Edit"
                  className="rounded-md border border-border p-1.5 text-muted-foreground transition hover:text-primary"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => void remove(row)}
                  aria-label="Delete"
                  className="rounded-md border border-border p-1.5 text-muted-foreground transition hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-sm sm:p-8">
          <form
            onSubmit={save}
            className="glass w-full max-w-2xl rounded-2xl p-6"
            aria-label={`${title} form`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">
                {editing === "new" ? `New ${title}` : `Edit ${title}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditing(null)}
                aria-label="Close"
                className="rounded-md p-1.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <div
                  key={f.key}
                  className={f.type === "textarea" ? "sm:col-span-2" : undefined}
                >
                  <label
                    htmlFor={`${table}-${f.key}`}
                    className="text-xs uppercase tracking-wider text-muted-foreground"
                  >
                    {f.label}
                    {f.type === "array" && " (comma separated)"}
                  </label>
                  {f.type === "boolean" ? (
                    <input
                      id={`${table}-${f.key}`}
                      type="checkbox"
                      checked={Boolean(form[f.key])}
                      onChange={(e) =>
                        setForm((v) => ({ ...v, [f.key]: e.target.checked }))
                      }
                      className="mt-3 block h-4 w-4 accent-[var(--primary)]"
                    />
                  ) : f.type === "textarea" ? (
                    <textarea
                      id={`${table}-${f.key}`}
                      rows={4}
                      value={String(form[f.key] ?? "")}
                      onChange={(e) => setForm((v) => ({ ...v, [f.key]: e.target.value }))}
                      className="mt-2 w-full resize-y rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary/50"
                    />
                  ) : (
                    <input
                      id={`${table}-${f.key}`}
                      type={f.type === "number" ? "number" : "text"}
                      step="any"
                      value={String(form[f.key] ?? "")}
                      onChange={(e) => setForm((v) => ({ ...v, [f.key]: e.target.value }))}
                      className="mt-2 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary/50"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground transition hover:text-foreground"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
