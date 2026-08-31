import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ClipboardList, Flag, ShieldCheck, Users } from "lucide-react";
import { MobileTabBar, SiteFooter, SiteHeader } from "@/components/site";
import { WorkspaceHero } from "@/components/workspace";

import { AdminVerifications } from "@/components/admin-verifications";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";



export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Administration — ProFinder" },
      {
        name: "description",
        content:
          "Modération des profils, suivi des demandes, messages signalés et réglages de la plateforme.",
      },
      { property: "og:title", content: "Administration — ProFinder" },
      {
        property: "og:description",
        content: "Console d'administration ProFinder : modération, statistiques et paramètres.",
      },
    ],
  }),
  component: Admin,
});

function Admin() {
  const { isAdmin, loading, user } = useAuth();
  const qc = useQueryClient();


  const pros = useQuery({
    queryKey: ["admin-pros"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("professionals")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const requests = useQuery({
    queryKey: ["admin-requests"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data } = await supabase.from("requests").select("id, status");
      return data ?? [];
    },
  });

  const flagged = useQuery({
    queryKey: ["admin-flagged"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data } = await supabase
        .from("messages")
        .select("id, body, created_at")
        .eq("flagged", true)
        .order("created_at", { ascending: false })
        .limit(20);
      return data ?? [];
    },
  });

  const settings = useQuery({
    queryKey: ["admin-settings"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data } = await supabase.from("platform_settings").select("*");
      return data ?? [];
    },
  });

  const catalog = useQuery({
    queryKey: ["admin-catalog"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data } = await supabase.from("subscription_plans").select("*").order("sort");
      return { plans: data ?? [] };
    },
  });

  const savePlan = async (
    code: string,
    patch: { price_mad?: number; duration_days?: number; trial_days?: number; is_visible?: boolean },
  ) => {
    const { error } = await supabase.from("subscription_plans").update(patch).eq("code", code);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Tarif enregistré.");
    qc.invalidateQueries({ queryKey: ["admin-catalog"] });
  };


  const rateRange =
    ((settings.data ?? []).find((s) => s.key === "rate_range")?.value as
      | { min: number; max: number }
      | undefined) ?? { min: 40, max: 400 };

  const saveRateRange = async (patch: { min?: number; max?: number }) => {
    const next = { ...rateRange, ...patch };
    const { error } = await supabase
      .from("platform_settings")
      .upsert({ key: "rate_range", value: next as never });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Fourchette de tarifs enregistrée.");
    qc.invalidateQueries({ queryKey: ["admin-settings"] });
    qc.invalidateQueries({ queryKey: ["reference"] });
  };

  const setStatus = async (id: string, status: "active" | "draft" | "suspended") => {
    const { error } = await supabase.from("professionals").update({ status }).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Statut mis à jour.");
    qc.invalidateQueries({ queryKey: ["admin-pros"] });
  };

  const saveWeight = async (key: string, raw: string) => {
    let value: unknown;
    try {
      value = JSON.parse(raw);
    } catch {
      toast.error("Valeur invalide (JSON attendu).");
      return;
    }
    const { error } = await supabase
      .from("platform_settings")
      .update({ value: value as never })
      .eq("key", key);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Paramètre enregistré.");
    qc.invalidateQueries({ queryKey: ["admin-settings"] });
  };


  if (loading) return <div className="p-10 text-center text-muted-foreground">Chargement…</div>;

  if (!isAdmin)
    return (
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader variant="admin" />
        <main className="mx-auto max-w-2xl px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Accès réservé</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Cette console est réservée aux administrateurs de la plateforme.
          </p>
        </main>
        <SiteFooter variant="admin" />
      </div>
    );

  const pending = (pros.data ?? []).filter((p) => p.status === "draft");

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader variant="admin" />
      <main className="mx-auto max-w-5xl px-4 py-8 pb-24">
        <WorkspaceHero
          eyebrow="Console d'administration"
          title="Administration"
          subtitle="Modération des profils, suivi des demandes et réglages de la plateforme."
          stats={[
            { label: "Professeurs", value: pros.data?.length ?? 0, Icon: Users },
            { label: "En attente", value: pending.length, hint: "à modérer", Icon: ShieldCheck },
            { label: "Demandes", value: requests.data?.length ?? 0, Icon: ClipboardList },
            { label: "Messages signalés", value: flagged.data?.length ?? 0, Icon: Flag },
          ]}
        />


        <section className="mt-10">
          <h2 className="text-xl font-bold">Modération des profils</h2>
          <div className="mt-4 space-y-3">
            {(pros.data ?? []).map((p) => (
              <div
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4"
              >
                <div>
                  <p className="font-semibold">{p.display_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {Number(p.hourly_rate)} DH/h · plan {p.plan_code} · statut {p.status}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStatus(p.id, "active")}
                    className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground"
                  >
                    Vérifier
                  </button>
                  <button
                    onClick={() => setStatus(p.id, "suspended")}
                    className="rounded-lg bg-destructive px-3 py-2 text-xs font-bold text-destructive-foreground"
                  >
                    Suspendre
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdminVerifications adminId={user?.id} />




        <section className="mt-10">

          <h2 className="text-xl font-bold">Tarifs</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Tarif horaire minimum (DH)
              <input
                type="number"
                min={0}
                defaultValue={rateRange.min}
                onBlur={(e) => saveRateRange({ min: Number(e.target.value) })}
                className="mt-1 w-full rounded-xl border border-border bg-muted px-3 py-2"
              />
            </label>
            <label className="text-sm font-medium">
              Tarif horaire maximum (DH)
              <input
                type="number"
                min={0}
                defaultValue={rateRange.max}
                onBlur={(e) => saveRateRange({ max: Number(e.target.value) })}
                className="mt-1 w-full rounded-xl border border-border bg-muted px-3 py-2"
              />
            </label>
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Formules d'abonnement
          </h3>
          <div className="mt-3 space-y-3">
            {(catalog.data?.plans ?? []).map((p) => (
              <div
                key={p.code}
                className="grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-4"
              >
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.code}</p>
                </div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Prix (DH)
                  <input
                    type="number"
                    min={0}
                    defaultValue={Number(p.price_mad)}
                    onBlur={(e) => savePlan(p.code, { price_mad: Number(e.target.value) })}
                    className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-foreground"
                  />
                </label>
                <label className="text-xs font-semibold text-muted-foreground">
                  Durée (jours)
                  <input
                    type="number"
                    min={1}
                    defaultValue={p.duration_days}
                    onBlur={(e) => savePlan(p.code, { duration_days: Number(e.target.value) })}
                    className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-foreground"
                  />
                </label>
                <label className="text-xs font-semibold text-muted-foreground">
                  Essai (jours)
                  <input
                    type="number"
                    min={0}
                    defaultValue={p.trial_days}
                    onBlur={(e) => savePlan(p.code, { trial_days: Number(e.target.value) })}
                    className="mt-1 w-full rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-foreground"
                  />
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Messages signalés</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {(flagged.data ?? []).map((m) => (
              <li key={m.id} className="rounded-xl border border-border bg-card px-4 py-3">
                {m.body}
                <span className="ml-2 text-xs text-muted-foreground">
                  {new Date(m.created_at).toLocaleString("fr-MA")}
                </span>
              </li>
            ))}
            {(flagged.data ?? []).length === 0 && (
              <li className="text-muted-foreground">Aucun message signalé.</li>
            )}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Pondération du matching</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(settings.data ?? []).map((s) => (
              <label key={s.key} className="text-sm font-medium">
                {s.key}
                <input
                  
                  defaultValue={JSON.stringify(s.value)}
                  onBlur={(e) => saveWeight(s.key, e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-muted px-3 py-2"
                />
              </label>
            ))}
          </div>
        </section>
      </main>
      <MobileTabBar variant="admin" />
      <SiteFooter variant="admin" />
    </div>
  );
}
