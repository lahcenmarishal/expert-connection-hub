import { supabase } from "@/integrations/supabase/client";

export type AccountRole = "client" | "pro";

export const PENDING_ROLE_KEY = "profinder.pending_role";

/** Rôle mémorisé localement au moment de l'inscription (même appareil). */
export function localPendingRole(): AccountRole | null {
  try {
    const value = localStorage.getItem(PENDING_ROLE_KEY);
    return value === "pro" || value === "client" ? value : null;
  } catch {
    return null;
  }
}

export function rememberPendingRole(role: AccountRole) {
  try {
    localStorage.setItem(PENDING_ROLE_KEY, role);
  } catch {
    /* stockage indisponible */
  }
}

/**
 * Rôle réel du compte : les métadonnées d'inscription font foi (elles suivent
 * l'utilisateur même si le lien de vérification est ouvert sur un autre
 * appareil ou si le paramètre `role` est perdu par la redirection).
 */
export async function resolveAccountRole(fallback: AccountRole = "client"): Promise<AccountRole> {
  const { data } = await supabase.auth.getUser();
  const meta = data.user?.user_metadata ?? {};
  const metaRole = meta["role"];
  if (metaRole === "pro" || metaRole === "client") return metaRole;
  return localPendingRole() ?? fallback;
}
