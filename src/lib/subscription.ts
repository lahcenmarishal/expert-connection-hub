import { supabase } from "@/integrations/supabase/client";

/** Quota mensuel de mises en relation du plan gratuit. */
export const FREE_MONTHLY_CONNECTIONS = 5;

export const PLAN_LABELS: Record<string, string> = {
  gratuit: "Gratuit",
  pro: "Pro",
  pro_annuel: "Pro Annuel",
};

/** Les plans Pro (mensuel ou annuel) n'ont aucune limite de mise en relation. */
export function isProPlan(code?: string | null): boolean {
  return code === "pro" || code === "pro_annuel";
}

/** Limite de mises en relation du plan (null = illimité). */
export function connectionLimit(code?: string | null): number | null {
  return isProPlan(code) ? null : FREE_MONTHLY_CONNECTIONS;
}

/** Début du mois courant, utilisé pour compter le quota. */
export function monthStartISO(): string {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
}

/** Nombre de mises en relation enregistrées ce mois-ci pour ce professeur. */
export async function fetchMonthlyConnections(professionalId: string): Promise<number> {
  const { count, error } = await supabase
    .from("connections")
    .select("id", { count: "exact", head: true })
    .eq("professional_id", professionalId)
    .gte("created_at", monthStartISO());
  if (error) throw error;
  return count ?? 0;
}

export const QUOTA_MESSAGE =
  "Vous avez atteint votre limite mensuelle. Passez à PRO pour obtenir des mises en relation illimitées.";

/**
 * Enregistre une mise en relation (≠ réservation confirmée).
 * Le professeur obtient ensuite les coordonnées du client.
 */
export async function createConnection(params: {
  professionalId: string;
  requestId: string;
  clientId: string | null;
  source: "general" | "direct";
}) {
  const { error } = await supabase.from("connections").insert({
    professional_id: params.professionalId,
    request_id: params.requestId,
    client_id: params.clientId,
    source: params.source,
  });
  // 23505 = mise en relation déjà enregistrée pour cette demande.
  if (error && error.code !== "23505") throw error;
}
