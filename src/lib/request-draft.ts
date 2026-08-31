import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES } from "@/lib/catalog";
import type { Slot } from "@/lib/marketplace";

const DRAFT_KEY = "profinder.request_draft";

export type RequestDraft = {
  service_id: string | null;
  level_id: string | null;
  city_id: string | null;
  mode: "home" | "studio" | "online";
  budget_min: number | null;
  budget_max: number | null;
  slots: Slot[];
  description: string;
  area: string | null;
  lat: number | null;
  lng: number | null;
};

export function saveRequestDraft(draft: RequestDraft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* stockage indisponible */
  }
}

export function loadRequestDraft(): RequestDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RequestDraft;
    if (!parsed || typeof parsed !== "object") return null;
    return { ...parsed, slots: Array.isArray(parsed.slots) ? parsed.slots : [] };
  } catch {
    return null;
  }
}

export function clearRequestDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* stockage indisponible */
  }
}

/** Publie une demande (statut active) pour le client authentifié. */
export async function publishRequest(clientId: string, draft: RequestDraft) {
  const categoryId = CATEGORIES[0]?.id;
  if (!categoryId) throw new Error("Catégorie indisponible");
  const { data, error } = await supabase
    .from("requests")
    .insert({
      client_id: clientId,
      category_id: categoryId,
      service_id: draft.service_id,
      level_id: draft.level_id,
      city_id: draft.city_id,
      mode: draft.mode,
      budget_min: draft.budget_min,
      budget_max: draft.budget_max,
      slots: draft.slots,
      description: draft.description || null,
      area: draft.area,
      lat: draft.lat,
      lng: draft.lng,
      status: "active",
    })
    .select("id")
    .single();
  if (error) throw error;

  // Coordonnées du client connecté : réutilise le profil + l'email du compte
  // pour que le professeur intéressé puisse le contacter directement.
  try {
    const { data: auth } = await supabase.auth.getUser();
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, phone")
      .eq("id", clientId)
      .maybeSingle();
    await supabase.from("request_contacts").insert({
      request_id: data.id,
      full_name:
        profile?.full_name ||
        (auth.user?.user_metadata?.["full_name"] as string | undefined) ||
        "Client",
      email: auth.user?.email ?? "",
      phone:
        profile?.phone ||
        (auth.user?.user_metadata?.["phone"] as string | undefined) ||
        null,
    });
  } catch {
    /* les coordonnées restent accessibles via le profil */
  }

  return data.id;
}


// Plusieurs déclencheurs (retour d'email, changement de session, focus…) peuvent
// appeler la publication en même temps : on garde une seule exécution en vol et
// on consomme le brouillon immédiatement pour éviter les demandes en double.
let inFlight: Promise<string | null> | null = null;

/** Publie la demande mise de côté avant la création du compte, si elle existe. */
export async function publishPendingDraft(clientId: string): Promise<string | null> {
  if (inFlight) return inFlight;
  const draft = loadRequestDraft();
  if (!draft) return null;
  clearRequestDraft();
  inFlight = (async () => {
    try {
      return await publishRequest(clientId, draft);
    } catch (err) {
      saveRequestDraft(draft);
      throw err;
    } finally {
      inFlight = null;
    }
  })();
  return inFlight;
}

/** Variante tolérante : ne remonte pas d'erreur si la publication échoue. */
export async function tryPublishPendingDraft(clientId: string): Promise<string | null> {
  try {
    return await publishPendingDraft(clientId);
  } catch {
    return null;
  }
}

