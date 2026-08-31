import type { Database } from "@/integrations/supabase/types";

export type ProRow = Database["public"]["Tables"]["professionals"]["Row"];
export type VerificationStatus = Database["public"]["Enums"]["verification_status"];

export const ONBOARDING_STEPS = [
  { key: "account", label: "Compte & email" },
  { key: "profile", label: "Profil" },
  { key: "teaching", label: "Matières & niveaux" },
  { key: "offer", label: "Cours, tarif & disponibilités" },
  { key: "dossier", label: "Qualifications & documents" },
] as const;

export type StepKey = (typeof ONBOARDING_STEPS)[number]["key"];


export const VERIFICATION_LABELS: Record<VerificationStatus, string> = {
  not_submitted: "Non soumis",
  pending: "Vérification en cours",
  needs_information: "Informations demandées",
  verified: "Professeur vérifié",
  rejected: "Dossier refusé",
};

export const VERIFICATION_TONES: Record<VerificationStatus, string> = {
  not_submitted: "bg-muted text-muted-foreground",
  pending: "bg-secondary text-secondary-foreground",
  needs_information: "bg-secondary text-secondary-foreground",
  verified: "bg-primary text-primary-foreground",
  rejected: "bg-destructive text-destructive-foreground",
};

export const DOCUMENT_KINDS = [
  { value: "identity", label: "Pièce d'identité" },
  { value: "diploma", label: "Diplôme" },
  { value: "certificate", label: "Certificat" },
  { value: "experience", label: "Justificatif d'expérience" },
  { value: "other", label: "Autre document" },
] as const;

export const ALLOWED_DOC_EXTENSIONS = ["pdf", "jpg", "jpeg", "png", "webp"];
export const MAX_DOC_SIZE_MB = 10;
export const MAX_PHOTO_SIZE_MB = 5;

export type CompletionInput = {
  emailVerified: boolean;
  pro: Partial<ProRow> | null | undefined;
  serviceCount: number;
  levelCount: number;
  slotCount: number;
  documentCount: number;
};

/** Étapes réellement complétées, calculées à partir des données enregistrées. */
export function completionOf(input: CompletionInput): Record<StepKey, boolean> {
  const p = input.pro;
  return {
    account: input.emailVerified,
    profile: !!(p?.display_name && p?.city_id && p?.phone),
    teaching: input.serviceCount > 0 && input.levelCount > 0,
    offer:
      !!(p?.mode_home || p?.mode_studio || p?.mode_online) &&
      Number(p?.hourly_rate ?? 0) > 0 &&
      input.slotCount > 0,
    dossier: !!(p?.diplomas || p?.experience_description) && input.documentCount > 0,
  };
}


export function progressPercent(done: Record<StepKey, boolean>): number {
  const total = ONBOARDING_STEPS.length;
  const count = ONBOARDING_STEPS.filter((s) => done[s.key]).length;
  return Math.round((count / total) * 100);
}

/** Première étape non complétée (1-indexée), pour reprendre l'inscription. */
export function nextStepIndex(done: Record<StepKey, boolean>): number {
  const idx = ONBOARDING_STEPS.findIndex((s) => !done[s.key]);
  return idx === -1 ? ONBOARDING_STEPS.length : idx + 1;
}

export function minutesToTime(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function timeToMinutes(value: string): number {
  const [h, m] = value.split(":");
  return Number(h) * 60 + Number(m ?? 0);
}
