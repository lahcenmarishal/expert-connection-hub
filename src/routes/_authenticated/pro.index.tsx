import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ClipboardList, Eye, Send, Sparkles } from "lucide-react";
import { MobileTabBar, SiteFooter, SiteHeader } from "@/components/site";
import { WorkspaceHero } from "@/components/workspace";


import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  MODE_LABELS,
  WEEKDAYS,
  fetchReferenceData,
  formatSlot,
  type Slot,
} from "@/lib/marketplace";
import { OnboardingProgress } from "@/components/onboarding-progress";
import { VERIFICATION_LABELS, VERIFICATION_TONES } from "@/lib/teacher-onboarding";
import { PLAN_LABELS, connectionLimit, fetchMonthlyConnections } from "@/lib/subscription";




export const Route = createFileRoute("/_authenticated/pro/")({
  head: () => ({
    meta: [
      { title: "Espace professeur — ProFinder" },
      {
        name: "description",
        content:
          "Gérez votre profil, vos matières, vos disponibilités, vos propositions et votre abonnement professeur.",
      },
      { property: "og:title", content: "Espace professeur — ProFinder" },
      {
        property: "og:description",
        content: "Tableau de bord professeur : demandes compatibles, propositions et abonnement.",
      },
    ],
  }),
  component: ProSpace,
});



function ProSpace() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const ref = useQuery({ queryKey: ["reference"], queryFn: fetchReferenceData });

  const me = useQuery({
    queryKey: ["my-pro", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("professionals")
        .select("*, professional_services(service_id), professional_levels(level_id)")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const availability = useQuery({
    queryKey: ["my-availability", me.data?.id],
    enabled: !!me.data?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("professional_availability")
        .select("*")
        .eq("professional_id", me.data!.id);
      return data ?? [];
    },
  });

  const requests = useQuery({
    queryKey: ["open-requests", me.data?.city_id],
    queryFn: async () => {
      // Toutes les demandes de la ville du professeur (aucun filtre de rayon).
      let query = supabase
        .from("requests")
        .select("*, services(name), levels(name), cities(name)")
        .is("target_professional_id", null)
        .in("status", ["active", "proposals_received"]);
      if (me.data?.city_id) query = query.eq("city_id", me.data.city_id);
      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const directRequests = useQuery({
    queryKey: ["direct-requests", me.data?.id],
    enabled: !!me.data?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("requests")
        .select("*, services(name), levels(name), cities(name), request_contacts(*)")
        .eq("target_professional_id", me.data!.id)
        .neq("target_status", "declined")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const bookings = useQuery({
    queryKey: ["my-pro-bookings", me.data?.id],
    enabled: !!me.data?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("bookings")
        .select("*")
        .eq("professional_id", me.data!.id)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const plans = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data } = await supabase
        .from("subscription_plans")
        .select("*")
        .neq("code", "premium")
        .order("sort");
      return data ?? [];
    },
  });

  const connections = useQuery({
    queryKey: ["my-connections", me.data?.id],
    enabled: !!me.data?.id,
    queryFn: () => fetchMonthlyConnections(me.data!.id),
  });

  const profileViews = useQuery({
    queryKey: ["my-profile-views", me.data?.id],
    enabled: !!me.data?.id,
    queryFn: async () => {
      const { count } = await supabase
        .from("profile_views")
        .select("id", { count: "exact", head: true })
        .eq("professional_id", me.data!.id);
      return count ?? 0;
    },
  });



  const [slotDraft, setSlotDraft] = useState({ weekday: "3", start: "17:00", end: "19:00" });


  const addSlot = async () => {
    if (!me.data) return;
    const toMin = (v: string) => {
      const [h, m] = v.split(":");
      return Number(h) * 60 + Number(m);
    };
    const { error } = await supabase.from("professional_availability").insert({
      professional_id: me.data.id,
      weekday: Number(slotDraft.weekday),
      start_min: toMin(slotDraft.start),
      end_min: toMin(slotDraft.end),
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    qc.invalidateQueries({ queryKey: ["my-availability", me.data.id] });
  };

  const slots: Slot[] = (availability.data ?? []).map((a) => ({
    weekday: a.weekday,
    start_min: a.start_min,
    end_min: a.end_min,
  }));


  const planCode = me.data?.plan_code ?? "gratuit";
  const limit = connectionLimit(planCode);
  const monthCount = connections.data ?? 0;
  const quotaLabel = limit === null ? `${monthCount} · illimité` : `${monthCount}/${limit}`;


  const changePlan = async (code: string) => {
    if (!me.data) return;
    const { error } = await supabase
      .from("professionals")
      .update({ plan_code: code })
      .eq("id", me.data.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Plan ${code} activé.`);
    qc.invalidateQueries();
  };


  const verificationStatus = me.data?.verification_status ?? "not_submitted";
  const onboardingDone = !!me.data?.onboarding_completed;
  const onboardingStep = me.data?.onboarding_step ?? 1;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader variant="pro" />
      <main className="mx-auto max-w-5xl px-4 py-8 pb-24">
        <WorkspaceHero
          eyebrow="Espace professeur"
          title={me.data?.display_name || "Bienvenue"}
          subtitle="Suivez vos statistiques, vos mises en relation et votre abonnement."
          stats={[
            {
              label: "Plan",
              value: PLAN_LABELS[planCode] ?? planCode,
              hint: `statut ${me.data?.status ?? "non créé"}`,
              Icon: Sparkles,
            },
            {
              label: "Mises en relation",
              value: quotaLabel,
              hint: "ce mois-ci",
              Icon: Send,
            },
            {
              label: "Vues du profil",
              value: profileViews.data ?? 0,
              hint: "total",
              Icon: Eye,
            },
            {
              label: "Demandes reçues",
              value: (requests.data?.length ?? 0) + (directRequests.data?.length ?? 0),
              hint: "compatibles + directes",
              Icon: ClipboardList,
            },
          ]}
        />

        {limit !== null && (
          <p className="mt-4 rounded-2xl border border-border bg-card p-4 text-sm font-semibold">
            {monthCount}/{limit} mises en relation utilisées ce mois-ci
            {monthCount >= limit && (
              <span className="mt-1 block font-normal text-destructive">
                Vous avez atteint votre limite mensuelle. Passez à PRO pour obtenir des mises en
                relation illimitées.
              </span>
            )}
          </p>
        )}



        <section className="mt-6 rounded-3xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Vérification de votre profil</h2>
              <span
                className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${VERIFICATION_TONES[verificationStatus]}`}
              >
                {VERIFICATION_LABELS[verificationStatus]}
              </span>
              {me.data?.admin_message && (
                <p className="mt-2 text-sm text-muted-foreground">{me.data.admin_message}</p>
              )}
              {me.data?.rejection_reason && (
                <p className="mt-2 text-sm text-destructive">{me.data.rejection_reason}</p>
              )}
            </div>
            {verificationStatus !== "pending" && verificationStatus !== "verified" && (
              <Link
                to="/pro/inscription"
                className="rounded-xl bg-primary px-5 py-2 text-sm font-bold text-primary-foreground"
              >
                {onboardingDone ? "Compléter mon dossier" : "Continuer mon inscription"}
              </Link>
            )}
          </div>
          {verificationStatus !== "verified" && (
            <p className="mt-4 rounded-xl bg-muted px-4 py-3 text-sm">
              📄 Téléversez votre diplôme (avec votre pièce d'identité) pour que la mention
              « Diplôme vérifié » apparaisse sur votre profil public. Elle s'affiche uniquement
              après validation par un administrateur.
            </p>
          )}
          {!onboardingDone && <OnboardingProgress current={onboardingStep} className="mt-4" />}
        </section>




        {me.data && (
          <>
            <section className="mt-8 rounded-3xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold">Mes disponibilités</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {slots.map((s, i) => (
                  <span key={i} className="rounded-full bg-muted px-3 py-1 text-xs">
                    {formatSlot(s)}
                  </span>
                ))}
                {slots.length === 0 && (
                  <span className="text-sm text-muted-foreground">Aucun créneau enregistré.</span>
                )}
              </div>
              <div className="mt-4 flex flex-wrap items-end gap-2">
                <select
                  value={slotDraft.weekday}
                  onChange={(e) => setSlotDraft({ ...slotDraft, weekday: e.target.value })}
                  className="rounded-xl border border-border bg-muted px-3 py-2 text-sm"
                >
                  {WEEKDAYS.map((d, i) => (
                    <option key={d} value={String(i)}>
                      {d}
                    </option>
                  ))}
                </select>
                <input
                  type="time"
                  value={slotDraft.start}
                  onChange={(e) => setSlotDraft({ ...slotDraft, start: e.target.value })}
                  className="rounded-xl border border-border bg-muted px-3 py-2 text-sm"
                />
                <input
                  type="time"
                  value={slotDraft.end}
                  onChange={(e) => setSlotDraft({ ...slotDraft, end: e.target.value })}
                  className="rounded-xl border border-border bg-muted px-3 py-2 text-sm"
                />
                <button
                  onClick={addSlot}
                  className="rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground"
                >
                  Ajouter
                </button>
              </div>
            </section>

            <section className="mt-8 rounded-3xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold">Demandes pour vous</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Nous vous envoyons uniquement les demandes compatibles avec vos matières, niveaux,
                zone, type de cours et disponibilités.
              </p>
              <Link
                to="/pro/demandes"
                className="mt-4 inline-block rounded-xl bg-primary px-5 py-2 text-sm font-bold text-primary-foreground"
              >
                Voir mes demandes
              </Link>
            </section>

            <section className="mt-8 rounded-3xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold">Mes réservations</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {(bookings.data ?? []).map((b) => (
                  <li key={b.id} className="flex justify-between rounded-xl bg-muted px-4 py-3">
                    <span>
                      {b.scheduled_at
                        ? new Date(b.scheduled_at).toLocaleString("fr-MA")
                        : "À planifier"}
                    </span>
                    <span className="font-semibold">
                      {Number(b.rate)} DH/h · {b.status}
                    </span>
                  </li>
                ))}
                {(bookings.data ?? []).length === 0 && (
                  <li className="text-muted-foreground">Aucune réservation encore.</li>
                )}
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-bold">Mon abonnement</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {(plans.data ?? []).map((p) => (
                  <div
                    key={p.code}
                    className={
                      p.code === planCode
                        ? "rounded-2xl border-2 border-primary bg-card p-5"
                        : "rounded-2xl border border-border bg-card p-5"
                    }
                  >
                    <h3 className="font-bold">{p.name}</h3>
                    <p className="mt-1 text-2xl font-extrabold">
                      {Number(p.price_mad)}{" "}
                      <span className="text-sm font-medium">
                        {p.duration_days >= 365 ? "DH/an" : "DH/mois"}
                      </span>
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                      {((p.features as string[]) ?? []).map((f) => (
                        <li key={f}>✓ {f}</li>
                      ))}
                    </ul>
                    <button
                      onClick={() => changePlan(p.code)}
                      disabled={p.code === planCode}
                      className="mt-4 w-full rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-50"
                    >
                      {p.code === planCode ? "Plan actuel" : "Choisir"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
      <MobileTabBar variant="pro" />
      <SiteFooter variant="pro" />
    </div>
  );
}
