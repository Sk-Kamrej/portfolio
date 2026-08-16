import { supabase } from "@/integrations/supabase/client";

export type AdminRow = Record<string, unknown> & { id: string };

export async function listRows(table: string, orderBy = "sort_order"): Promise<AdminRow[]> {
  const { data, error } = await supabase
    .from(table as never)
    .select("*")
    .order(orderBy as never, { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as AdminRow[];
}

export async function insertRow(table: string, values: Record<string, unknown>) {
  const { error } = await supabase.from(table as never).insert(values as never);
  if (error) throw new Error(error.message);
}

export async function updateRow(table: string, id: string, values: Record<string, unknown>) {
  const { error } = await supabase
    .from(table as never)
    .update(values as never)
    .eq("id" as never, id as never);
  if (error) throw new Error(error.message);
}

export async function deleteRow(table: string, id: string) {
  const { error } = await supabase
    .from(table as never)
    .delete()
    .eq("id" as never, id as never);
  if (error) throw new Error(error.message);
}
