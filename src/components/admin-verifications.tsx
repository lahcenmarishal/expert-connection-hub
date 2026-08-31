import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  DOCUMENT_KINDS,
  VERIFICATION_LABELS,
  VERIFICATION_TONES,
  type VerificationStatus,
} from "@/lib/teacher-onboarding";

type Filter = "pending" | "needs_information" | "verified" | "rejected" | "all";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "pending", label: "À vérifier" },
  { value: "needs_information", label: "Infos demandées" },
  { value: "verified", label: "Vérifiés" },
  { value: "rejected", label: "Refusés" },
  { value: "all", label: "Tous" },
];

/** Console de vérification des dossiers professeurs (réservée aux administrateurs). */
export function AdminVerifications({ adminId }: { adminId: string | undefined }) {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<Filter>("pending");
  const [notes, setNotes] = useState<Record<string, string>>({});

  const dossiers = useQuery({
    queryKey: ["admin-verifications", filter],
    queryFn: async () => {
      let q = supabase
        .from("professionals")
        .select(
          "id, display_name, first_name, last_name, phone, hourly_rate, experience_years, diplomas, specialty, verification_status, admin_message, rejection_reason, onboarding_completed, created_at, verification_documents(id, kind, file_path, status)",
        )
        .order("created_at", { ascending: false });
      if (filter !== "all") q = q.eq("verification_status", filter);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
  });

  const openDocument = async (path: string) => {
    const { data, error } = await supabase.storage
      .from("verification-docs")
      .createSignedUrl(path, 300);
    if (error || !data) {
      toast.error("Document indisponible.");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const decide = async (
    proId: string,
    oldStatus: VerificationStatus,
    next: VerificationStatus,
    action: string,
  ) => {
    const comment = (notes[proId] ?? "").trim();
    if ((next === "rejected" || next === "needs_information") && !comment) {
      toast.error("Indiquez un motif pour le professeur.");
      return;
    }
    const patch =
      next === "verified"
        ? {
            verification_status: next,
            is_verified: true,
            verified_at: new Date().toISOString(),
            verified_by: adminId ?? null,
            status: "active" as const,
            admin_message: null,
            rejection_reason: null,
          }
        : {
            verification_status: next,
            is_verified: false,
            ...(next === "rejected"
              ? { rejection_reason: comment, admin_message: null }
              : { admin_message: comment, rejection_reason: null }),
          };

    const { error } = await supabase.from("professionals").update(patch).eq("id", proId);
    if (error) {
      toast.error(error.message);
      return;
    }
    await supabase
      .from("verification_requests")
      .update({
        status: next,
        reviewed_at: new Date().toISOString(),
        reviewed_by: adminId ?? null,
        ...(next === "rejected" ? { rejection_reason: comment } : { admin_message: comment || null }),
      })
      .eq("professional_id", proId)
      .eq("status", "pending");
    await supabase.from("verification_logs").insert({
      professional_id: proId,
      admin_id: adminId ?? null,
      action,
      old_status: oldStatus,
      new_status: next,
      comment: comment || null,
    });
    toast.success("Décision enregistrée, le professeur a été notifié.");
    setNotes((n) => ({ ...n, [proId]: "" }));
    qc.invalidateQueries({ queryKey: ["admin-verifications"] });
    qc.invalidateQueries({ queryKey: ["admin-pros"] });
  };

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold">Vérification des professeurs</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={
              filter === f.value
                ? "rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground"
                : "rounded-full bg-muted px-3 py-1 text-xs"
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        {(dossiers.data ?? []).map((p) => {
          const status = p.verification_status as VerificationStatus;
          return (
            <article key={p.id} className="rounded-2xl border border-border bg-card p-5">
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">
                    {p.first_name || p.last_name
                      ? `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim()
                      : p.display_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {p.phone ?? "téléphone non renseigné"} · {Number(p.hourly_rate)} DH/h ·{" "}
                    {p.experience_years} an(s) d'expérience
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${VERIFICATION_TONES[status]}`}
                >
                  {VERIFICATION_LABELS[status]}
                </span>
              </header>

              <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-muted-foreground">Diplômes</dt>
                  <dd>{p.diplomas || "—"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted-foreground">Spécialité</dt>
                  <dd>{p.specialty || "—"}</dd>
                </div>
              </dl>

              <div className="mt-3 flex flex-wrap gap-2">
                {(p.verification_documents ?? []).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => openDocument(d.file_path)}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-semibold hover:bg-muted/70"
                  >
                    {DOCUMENT_KINDS.find((k) => k.value === d.kind)?.label ?? d.kind}
                  </button>
                ))}
                {(p.verification_documents ?? []).length === 0 && (
                  <span className="text-xs text-muted-foreground">Aucun document fourni.</span>
                )}
              </div>

              <textarea
                value={notes[p.id] ?? ""}
                onChange={(e) => setNotes((n) => ({ ...n, [p.id]: e.target.value }))}
                placeholder="Message au professeur (obligatoire pour un refus ou une demande d'informations)"
                maxLength={1000}
                className="mt-3 h-20 w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm"
              />

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => decide(p.id, status, "verified", "approve")}
                  className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground"
                >
                  Approuver
                </button>
                <button
                  onClick={() => decide(p.id, status, "needs_information", "request_info")}
                  className="rounded-lg bg-secondary px-3 py-2 text-xs font-bold text-secondary-foreground"
                >
                  Demander des informations
                </button>
                <button
                  onClick={() => decide(p.id, status, "rejected", "reject")}
                  className="rounded-lg bg-destructive px-3 py-2 text-xs font-bold text-destructive-foreground"
                >
                  Refuser
                </button>
              </div>
            </article>
          );
        })}
        {(dossiers.data ?? []).length === 0 && (
          <p className="text-sm text-muted-foreground">Aucun dossier dans cette catégorie.</p>
        )}
      </div>
    </section>
  );
}
