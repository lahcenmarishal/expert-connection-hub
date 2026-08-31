import { supabase } from "@/integrations/supabase/client";
import { submitDirectRequest, type Slot } from "@/lib/marketplace";

/** Besoin exprimé par l'élève / le parent à l'étape 2 de l'inscription. */
export type StudentNeed = {
  service_id: string | null;
  level_id: string | null;
  city_id: string | null;
  mode: "home" | "studio" | "online";
  budget_min: number | null;
  budget_max: number | null;
  slots: Slot[];
  description: string | null;
  area: string | null;
  lat: number | null;
  lng: number | null;
};

/** Professeur ciblé avant la création du compte (bouton « Demander ce professeur »). */
export type PendingProTarget = { id: string; category_id: string };

const NEED_KEY = "profinder.student_need";
const TARGET_KEY = "profinder.pending_target_pro";

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* stockage indisponible */
  }
}

function remove(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* stockage indisponible */
  }
}

export const saveStudentNeed = (need: StudentNeed) => write(NEED_KEY, need);
export const loadStudentNeed = () => {
  const need = read<StudentNeed>(NEED_KEY);
  if (!need) return null;
  return { ...need, slots: Array.isArray(need.slots) ? need.slots : [] };
};
export const clearStudentNeed = () => remove(NEED_KEY);

export const savePendingProTarget = (target: PendingProTarget) => write(TARGET_KEY, target);
export const loadPendingProTarget = () => read<PendingProTarget>(TARGET_KEY);
export const clearPendingProTarget = () => remove(TARGET_KEY);

/**
 * Besoin de l'élève : mémoire locale d'abord, sinon reconstruit depuis sa
 * dernière demande enregistrée (utile après un changement d'appareil).
 */
export async function resolveStudentNeed(userId: string): Promise<StudentNeed | null> {
  const local = loadStudentNeed();
  if (local) return local;
  const { data } = await supabase
    .from("requests")
    .select(
      "service_id, level_id, city_id, mode, budget_min, budget_max, slots, description, area, lat, lng",
    )
    .eq("client_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!data) return null;
  const need: StudentNeed = {
    service_id: data.service_id,
    level_id: data.level_id,
    city_id: data.city_id,
    mode: data.mode,
    budget_min: data.budget_min == null ? null : Number(data.budget_min),
    budget_max: data.budget_max == null ? null : Number(data.budget_max),
    slots: Array.isArray(data.slots) ? (data.slots as unknown as Slot[]) : [],
    description: data.description,
    area: data.area,
    lat: data.lat,
    lng: data.lng,
  };
  saveStudentNeed(need);
  return need;
}

/** Coordonnées du client connecté (profil + compte). */
export async function studentContact(userId: string) {
  const { data: auth } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone")
    .eq("id", userId)
    .maybeSingle();
  const meta = auth.user?.user_metadata ?? {};
  return {
    full_name:
      profile?.full_name || (meta["full_name"] as string | undefined) || "Client ProFinder",
    email: auth.user?.email ?? "",
    phone: profile?.phone || (meta["phone"] as string | undefined) || null,
  };
}

/**
 * Envoie une demande directe au professeur avec les informations du compte
 * élève et le besoin exprimé à l'inscription — sans formulaire supplémentaire.
 */
export async function sendNeedToProfessional(
  userId: string,
  pro: { id: string; category_id: string },
  need: StudentNeed,
) {
  const contact = await studentContact(userId);
  return submitDirectRequest({
    professionalId: pro.id,
    categoryId: pro.category_id,
    clientId: userId,
    service_id: need.service_id,
    level_id: need.level_id,
    city_id: need.city_id,
    mode: need.mode,
    budget_min: need.budget_min,
    budget_max: need.budget_max,
    slots: need.slots,
    description: need.description,
    area: need.area,
    lat: need.lat,
    lng: need.lng,
    contact,
  });
}

/**
 * Où envoyer le client après connexion / vérification d'email :
 * - demande envoyée automatiquement si un professeur est ciblé et le besoin connu ;
 * - sinon étape 2 (expression du besoin) tant qu'aucun besoin n'est enregistré.
 */
export async function resumeClientFlow(
  userId: string,
): Promise<{ kind: "request"; id: string } | { kind: "need" } | { kind: "home" }> {
  const target = loadPendingProTarget();
  const need = await resolveStudentNeed(userId);
  if (target && need) {
    try {
      const id = await sendNeedToProfessional(userId, target, need);
      clearPendingProTarget();
      return { kind: "request", id };
    } catch {
      return { kind: "need" };
    }
  }
  if (target || !need) return { kind: "need" };
  return { kind: "home" };
}
