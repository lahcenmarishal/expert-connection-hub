import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { MobileTabBar, SiteFooter, SiteHeader } from "@/components/site";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { fetchReferenceData, formatSlot, MODE_LABELS, type Slot } from "@/lib/marketplace";


export const Route = createFileRoute("/_authenticated/demandes/")({
  head: () => ({
    meta: [
      { title: "Mes demandes — ProFinder" },
      {
        name: "description",
        content: "Suivez vos demandes de cours, les propositions reçues et vos réservations.",
      },
      { property: "og:title", content: "Mes demandes — ProFinder" },
      {
        property: "og:description",
        content: "Espace client ProFinder : demandes, propositions et réservations.",
      },
    ],
  }),
  component: MyRequests,
});

const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  proposals_received: "Propositions reçues",
  booked: "Réservée",
  completed: "Terminée",
  cancelled: "Annulée",
  expired: "Expirée",
};

function MyRequests() {
  const { user } = useAuth();
  const ref = useQuery({ queryKey: ["reference"], queryFn: fetchReferenceData });
  const requests = useQuery({
    queryKey: ["my-requests", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("requests")
        .select("*, proposals(id)")
        .eq("client_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const mine = requests.data ?? [];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8 pb-24">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight">Mes demandes</h1>

        <div className="mb-10">
          <Link
            to="/publier"
            className="inline-block rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Publier une demande
          </Link>
        </div>

        {requests.isLoading ? (
          <p className="text-sm text-muted-foreground">Chargement…</p>
        ) : mine.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Vous n'avez pas encore publié de demande.
          </p>
        ) : (
          <ul className="space-y-4">
            {mine.map((r) => {
              const slots = (Array.isArray(r.slots) ? r.slots : []) as unknown as Slot[];
              const min = r.budget_min == null ? null : Number(r.budget_min);
              const max = r.budget_max == null ? null : Number(r.budget_max);
              const budget =
                min != null && max != null
                  ? `${min}–${max} DH/h`
                  : max != null
                    ? `jusqu'à ${max} DH/h`
                    : min != null
                      ? `à partir de ${min} DH/h`
                      : "budget non précisé";
              return (
              <li key={r.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-bold">
                      {ref.data?.services.find((s) => s.id === r.service_id)?.name ??
                        "Toutes matières"}{" "}
                      ·{" "}
                      {ref.data?.levels.find((l) => l.id === r.level_id)?.name ?? "Tous niveaux"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {ref.data?.cities.find((c) => c.id === r.city_id)?.name ?? "—"} ·{" "}
                      {MODE_LABELS[r.mode]} · {budget}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                      {STATUS_LABELS[r.status]}
                    </span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {(r.proposals as { id: string }[]).length} proposition(s)
                    </p>
                  </div>
                </div>

                {slots.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {slots.map((s, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {formatSlot(s)}
                      </span>
                    ))}
                  </div>
                )}

                {r.description && (
                  <p className="mt-3 text-sm text-muted-foreground">{r.description}</p>
                )}

                <Link
                  to="/demandes/$id"
                  params={{ id: r.id }}
                  className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Comparer les propositions
                </Link>
              </li>
              );
            })}

          </ul>
        )}
      </main>
      <MobileTabBar />
      <SiteFooter />
    </div>
  );
}
