import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarCheck,
  ClipboardList,
  MessageSquare,
  Search,
  Send,
  Sparkles,
} from "lucide-react";
import { MobileTabBar, SiteFooter, SiteHeader } from "@/components/site";
import { WorkspaceHero } from "@/components/workspace";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { fetchReferenceData, MODE_LABELS } from "@/lib/marketplace";

export const Route = createFileRoute("/_authenticated/compte")({
  head: () => ({
    meta: [
      { title: "Mon espace élève — ProFinder" },
      {
        name: "description",
        content:
          "Tableau de bord élève : suivez vos demandes de cours, les propositions reçues et vos réservations.",
      },
      { property: "og:title", content: "Mon espace élève — ProFinder" },
      {
        property: "og:description",
        content: "Vos demandes, propositions et réservations ProFinder en un coup d'œil.",
      },
    ],
  }),
  component: ClientSpace,
});

const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  proposals_received: "Propositions reçues",
  booked: "Réservée",
  completed: "Terminée",
  cancelled: "Annulée",
  expired: "Expirée",
};

function ClientSpace() {
  const { user } = useAuth();
  const ref = useQuery({ queryKey: ["reference"], queryFn: fetchReferenceData });

  const requests = useQuery({
    queryKey: ["my-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("requests")
        .select("*, proposals(id)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const bookings = useQuery({
    queryKey: ["my-bookings", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("bookings").select("id, status, scheduled_at");
      return data ?? [];
    },
  });

  const unread = useQuery({
    queryKey: ["my-unread-messages", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { count } = await supabase
        .from("messages")
        .select("id", { count: "exact", head: true })
        .is("read_at", null);
      return count ?? 0;
    },
  });

  const list = requests.data ?? [];
  const proposalsCount = list.reduce(
    (acc, r) => acc + ((r.proposals as { id: string }[] | null)?.length ?? 0),
    0,
  );
  const activeCount = list.filter((r) => r.status === "active" || r.status === "proposals_received")
    .length;

  const displayName = user?.email?.split("@")[0] ?? "élève";

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader variant="client" />
      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8 pb-28">
        <WorkspaceHero
          eyebrow="Espace élève"
          title={`Bonjour ${displayName}`}
          subtitle="Publiez une demande, comparez les propositions des professeurs et gérez vos cours."
          stats={[
            { label: "Demandes actives", value: activeCount, Icon: ClipboardList },
            { label: "Propositions reçues", value: proposalsCount, Icon: Send },
            { label: "Réservations", value: bookings.data?.length ?? 0, Icon: CalendarCheck },
            { label: "Messages non lus", value: unread.data ?? 0, Icon: MessageSquare },
          ]}
          actions={
            <>
              <Link
                to="/publier"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
              >
                Publier une demande
              </Link>
              <Link
                to="/professeurs"
                className="flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted"
              >
                <Search className="size-4" />
                Trouver un professeur
              </Link>
            </>
          }
        />

        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold">Mes dernières demandes</h2>
            <Link to="/demandes" className="text-sm font-semibold text-primary hover:underline">
              Tout voir
            </Link>
          </div>

          {requests.isLoading ? (
            <p className="text-sm text-muted-foreground">Chargement…</p>
          ) : list.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center">
              <Sparkles className="mx-auto mb-3 size-6 text-primary" />
              <p className="text-sm text-muted-foreground">
                Vous n'avez pas encore publié de demande.
              </p>
              <Link
                to="/publier"
                className="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
              >
                Publier ma première demande
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {list.slice(0, 4).map((r) => (
                <li
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-muted/30 p-4"
                >
                  <div>
                    <p className="font-semibold">
                      {ref.data?.services.find((s) => s.id === r.service_id)?.name ??
                        "Toutes matières"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {ref.data?.cities.find((c) => c.id === r.city_id)?.name ?? "—"} ·{" "}
                      {MODE_LABELS[r.mode]} ·{" "}
                      {(r.proposals as { id: string }[] | null)?.length ?? 0} proposition(s)
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-card px-3 py-1 text-xs font-semibold">
                      {STATUS_LABELS[r.status]}
                    </span>
                    <Link
                      to="/demandes/$id"
                      params={{ id: r.id }}
                      className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                    >
                      Ouvrir
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/messages"
            className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <MessageSquare className="mb-3 size-5 text-primary" />
            <p className="font-bold">Messagerie</p>
            <p className="text-sm text-muted-foreground">
              Échangez avec les professeurs qui vous ont répondu.
            </p>
          </Link>
          <Link
            to="/demandes"
            className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <ClipboardList className="mb-3 size-5 text-primary" />
            <p className="font-bold">Mes demandes</p>
            <p className="text-sm text-muted-foreground">
              Suivez le statut et comparez toutes les propositions.
            </p>
          </Link>
        </section>
      </main>
      <MobileTabBar variant="client" />
      <SiteFooter variant="client" />
    </div>
  );
}
