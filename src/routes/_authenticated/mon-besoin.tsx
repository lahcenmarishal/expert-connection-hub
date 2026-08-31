import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site";
import { NeedForm, type NeedValues } from "@/components/need-form";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_RATE_RANGE, fetchReferenceData, type RateRange } from "@/lib/marketplace";
import { publishRequest, clearRequestDraft, loadRequestDraft } from "@/lib/request-draft";
import {
  clearPendingProTarget,
  loadPendingProTarget,
  saveStudentNeed,
  sendNeedToProfessional,
  type PendingProTarget,
  type StudentNeed,
} from "@/lib/student-need";

export const Route = createFileRoute("/_authenticated/mon-besoin")({
  head: () => ({
    meta: [
      { title: "Exprimez votre besoin de cours — ProFinder" },
      {
        name: "description",
        content:
          "Étape 2 de votre inscription élève ou parent : indiquez la matière, le niveau, la ville et le budget pour recevoir les bons professeurs.",
      },
      { property: "og:title", content: "Exprimez votre besoin de cours — ProFinder" },
      {
        property: "og:description",
        content: "Décrivez votre besoin une seule fois : vos demandes partent ensuite en un clic.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NeedStepPage,
});

function needFromValues(values: NeedValues): StudentNeed {
  const num = (v: string) => (v.trim() === "" ? null : Number(v));
  return {
    service_id: values.service || null,
    level_id: values.level || null,
    city_id: values.city || null,
    mode: values.mode,
    budget_min: null,
    budget_max: null,
    slots: values.slots,
    description: values.description || null,
    area: values.address || null,
    lat: num(values.lat),
    lng: num(values.lng),
  };
}

function NeedStepPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const ref = useQuery({ queryKey: ["reference"], queryFn: fetchReferenceData });
  const rateRange = (ref.data?.settings["rate_range"] as RateRange) ?? DEFAULT_RATE_RANGE;
  const [busy, setBusy] = useState(false);
  const [target, setTarget] = useState<PendingProTarget | null>(null);
  const [targetName, setTargetName] = useState<string>("");

  useEffect(() => {
    const pending = loadPendingProTarget();
    if (!pending) return;
    setTarget(pending);
    void supabase
      .from("professionals")
      .select("display_name")
      .eq("id", pending.id)
      .maybeSingle()
      .then(({ data }) => setTargetName(data?.display_name ?? ""));
  }, []);

  const draft = typeof window === "undefined" ? null : loadRequestDraft();

  const onSubmit = async (values: NeedValues) => {
    if (!user) return;
    const need = needFromValues(values);
    if (!need.city_id && need.mode !== "online") {
      toast.error("Indiquez votre ville pour recevoir des propositions locales.");
      return;
    }
    setBusy(true);
    try {
      saveStudentNeed(need);
      clearRequestDraft();
      if (target) {
        const id = await sendNeedToProfessional(user.id, target, need);
        clearPendingProTarget();
        toast.success("🎉 Votre demande a été envoyée au professeur.");
        navigate({ to: "/demandes/$id", params: { id } });
        return;
      }
      toast.success("Votre besoin est enregistré. Publiez une demande pour recevoir des propositions.");
      navigate({ to: "/compte" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Envoi impossible pour le moment");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-10 pb-24">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Étape 2 sur 2
        </p>
        <h1 className="mb-2 mt-1 text-3xl font-extrabold tracking-tight">
          {target ? "Envoyer ma demande" : "Finaliser mon compte"}
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          {target
            ? `Quelques informations essentielles, envoyées directement à ${targetName || "votre professeur"}.`
            : "Indiquez le niveau, la matière, le lieu et vos disponibilités. Ces informations seront réutilisées quand vous publierez une demande."}
        </p>

        <NeedForm
          services={ref.data?.services ?? []}
          levels={ref.data?.levels ?? []}
          specialties={ref.data?.specialties ?? []}
          cities={ref.data?.cities ?? []}
          rateRange={rateRange}
          withSlots
          withDescription
          title="Votre besoin de cours"
          submitLabel={busy ? "Enregistrement…" : target ? "Envoyer ma demande" : "Enregistrer mon besoin"}
          initial={{
            service: draft?.service_id ?? "",
            level: draft?.level_id ?? "",
            city: draft?.city_id ?? "",
            mode: draft?.mode ?? "home",
            description: draft?.description ?? "",
            address: draft?.area ?? "",
            lat: draft?.lat == null ? "" : String(draft.lat),
            lng: draft?.lng == null ? "" : String(draft.lng),
            slots: draft?.slots ?? [],
          }}
          onSubmit={(values) => void onSubmit(values)}
        />
      </main>
    </div>
  );
}
