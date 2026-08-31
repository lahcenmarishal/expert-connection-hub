import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Phone, MessageCircle, Mail, MapPin, Navigation, Trash2 } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  MODE_LABELS,
  formatSlot,
  requestMatchesPro,
  whatsappLink,
  type Slot,
} from "@/lib/marketplace";
import {
  QUOTA_MESSAGE,
  connectionLimit,
  createConnection,
  fetchMonthlyConnections,
} from "@/lib/subscription";


export const Route = createFileRoute("/_authenticated/pro/demandes")({
  head: () => ({
    meta: [
      { title: "Demandes pour vous — ProFinder" },
      {
        name: "description",
        content:
          "Les demandes d'élèves qui correspondent à vos matières, niveaux, zone et disponibilités.",
      },
      { property: "og:title", content: "Demandes pour vous — ProFinder" },
      {
        property: "og:description",
        content: "Matching automatique : seules les demandes pertinentes vous sont proposées.",
      },
    ],
  }),
  component: ProRequests,
});

type ContactInfo = {
  full_name: string | null;
  phone: string | null;
  email: string | null;
  address?: string | null;
};

function ContactCard({ contact, title }: { contact: ContactInfo; title: string }) {
  const wa = whatsappLink(contact.phone);
  return (
    <div className="mt-4 rounded-2xl border border-primary/40 bg-primary/5 p-4">
      <p className="text-sm font-bold">{title}</p>
      <p className="mt-1 text-sm">{contact.full_name ?? "Client"}</p>
      {contact.address && (
        <p className="mt-1 text-sm text-muted-foreground">📍 {contact.address}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {contact.phone && (
          <a
            href={`tel:${contact.phone}`}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
          >
            <Phone className="size-4" /> {contact.phone}
          </a>
        )}
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold"
          >
            <MessageCircle className="size-4" /> WhatsApp
          </a>
        )}
        {contact.email && (
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold"
          >
            <Mail className="size-4" /> {contact.email}
          </a>
        )}
      </div>
      {!contact.phone && !contact.email && (
        <p className="mt-2 text-xs text-muted-foreground">
          Aucune coordonnée fournie par le client.
        </p>
      )}
    </div>
  );
}

const declinedKey = (proId: string) => `profinder:declined-requests:${proId}`;

function ProRequests() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [declined, setDeclined] = useState<string[]>([]);
  const [confirmId, setConfirmId] = useState<string | null>(null);


  const me = useQuery({
    queryKey: ["my-pro-match", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("professionals")
        .select(
          "*, professional_services(service_id), professional_levels(level_id), professional_availability(weekday,start_min,end_min)",
        )
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const requests = useQuery({
    queryKey: ["pro-inbox", me.data?.id],
    enabled: !!me.data?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("requests")
        .select("*, services(name), levels(name,cycle), cities(name), request_contacts(*)")
        .in("status", ["active", "proposals_received"])
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const myProposals = useQuery({
    queryKey: ["my-proposals", me.data?.id],
    enabled: !!me.data?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("proposals")
        .select("*")
        .eq("professional_id", me.data!.id);
      return data ?? [];
    },
  });

  const clients = useQuery({
    queryKey: ["proposal-clients", me.data?.id, (myProposals.data ?? []).length],
    enabled: !!me.data?.id && (myProposals.data ?? []).length > 0,
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("id, full_name, phone");
      return data ?? [];
    },
  });

  const pro = me.data;

  const connections = useQuery({
    queryKey: ["my-connections", me.data?.id],
    enabled: !!me.data?.id,
    queryFn: () => fetchMonthlyConnections(me.data!.id),
  });

  const limit = connectionLimit(pro?.plan_code);
  const used = connections.data ?? 0;
  const quotaReached = limit !== null && used >= limit;


  // Les demandes déclinées restent masquées définitivement pour ce professeur.
  useEffect(() => {
    if (!pro?.id || typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(declinedKey(pro.id));
      setDeclined(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      setDeclined([]);
    }
  }, [pro?.id]);

  const decline = async (requestId: string, targeted: boolean) => {
    if (!pro) return;
    const next = Array.from(new Set([...declined, requestId]));
    setDeclined(next);
    try {
      window.localStorage.setItem(declinedKey(pro.id), JSON.stringify(next));
    } catch {
      /* stockage indisponible */
    }
    if (targeted) {
      await supabase.from("requests").update({ target_status: "declined" }).eq("id", requestId);
    }
    toast.success("Demande supprimée de votre liste.");
  };

  const profile = pro
    ? {
        city_id: pro.city_id,
        mode_home: pro.mode_home,
        mode_studio: pro.mode_studio,
        mode_online: pro.mode_online,
        services: (pro.professional_services as { service_id: string }[]).map((s) => s.service_id),
        levels: (pro.professional_levels as { level_id: string }[]).map((l) => l.level_id),
        slots: (pro.professional_availability as Slot[]) ?? [],
      }
    : null;

  const matched = !profile
    ? []
    : (requests.data ?? []).filter((r) => {
        if (declined.includes(r.id)) return false;
        if (r.target_professional_id && r.target_professional_id !== pro!.id) return false;
        if (r.target_professional_id === pro!.id) return r.target_status !== "declined";
        return requestMatchesPro(
          {
            service_id: r.service_id,
            level_id: r.level_id,
            city_id: r.city_id,
            mode: r.mode,
            slots: (r.slots ?? []) as Slot[],
          },
          profile,
        );
      });

  const interested = async (requestId: string, targeted: boolean) => {
    if (!pro) return;
    if (limit !== null && used >= limit) {
      toast.error(QUOTA_MESSAGE);
      return;
    }
    const request = (requests.data ?? []).find((r) => r.id === requestId);
    try {
      await createConnection({
        professionalId: pro.id,
        requestId,
        clientId: request?.client_id ?? null,
        source: targeted ? "direct" : "general",
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Mise en relation impossible");
      return;
    }
    const { error } = await supabase.from("proposals").insert({
      request_id: requestId,
      professional_id: pro.id,
      rate: Number(pro.hourly_rate),
      message: "Bonjour, je suis intéressé par votre demande.",
    });
    if (error && error.code !== "23505") {
      toast.error(error.message);
      return;
    }
    if (targeted) {
      await supabase.from("requests").update({ target_status: "accepted" }).eq("id", requestId);
    }
    setConfirmId(null);
    toast.success("Mise en relation enregistrée. Les coordonnées du client sont affichées.");
    qc.invalidateQueries({ queryKey: ["my-proposals", pro.id] });
    qc.invalidateQueries({ queryKey: ["pro-inbox", pro.id] });
    qc.invalidateQueries({ queryKey: ["my-connections", pro.id] });
  };


  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader variant="pro" />
      <main className="mx-auto max-w-4xl px-4 py-8 pb-24">
        <h1 className="text-3xl font-extrabold tracking-tight">📩 Demandes pour vous</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Uniquement les demandes qui correspondent à vos matières, niveaux, zone, type de cours et
          disponibilités.
        </p>
        {pro && (
          <p className="mt-3 text-sm font-semibold">
            {limit === null
              ? "Mises en relation illimitées (plan Pro)"
              : `${used}/${limit} mises en relation utilisées ce mois-ci`}
          </p>
        )}


        {!pro ? (
          <p className="mt-8 text-sm text-muted-foreground">
            Complétez d'abord votre profil professeur pour recevoir des demandes.{" "}
            <Link to="/pro" className="font-semibold text-primary">
              Aller à mon profil
            </Link>
          </p>
        ) : matched.length === 0 ? (
          <p className="mt-8 text-sm text-muted-foreground">
            Aucune demande correspondante pour le moment.
          </p>
        ) : (
          <div className="mt-8 space-y-4">
            {matched.map((r) => {
              const slots = (r.slots ?? []) as Slot[];
              const proposal = (myProposals.data ?? []).find((p) => p.request_id === r.id);
              const targeted = r.target_professional_id === pro?.id;
              const guest = Array.isArray(r.request_contacts)
                ? r.request_contacts[0]
                : r.request_contacts;
              const owner = (clients.data ?? []).find((c) => c.id === r.client_id);
              // Les coordonnées ne sont visibles qu'une fois la mise en relation faite.
              const canSeeContact = Boolean(proposal);
              const contact: ContactInfo | null = canSeeContact
                ? guest
                  ? {
                      full_name: guest.full_name,
                      phone: guest.phone,
                      email: guest.email,
                      address: r.area ?? null,
                    }
                  : {
                      full_name: owner?.full_name ?? null,
                      phone: owner?.phone ?? null,
                      email: null,
                      address: r.area ?? null,
                    }
                : null;
              const mapsLink =
                r.lat != null && r.lng != null
                  ? `https://www.google.com/maps?q=${r.lat},${r.lng}`
                  : null;
              return (
                <article key={r.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-bold">
                      {[r.levels?.cycle, r.levels?.name].filter(Boolean).join(" · ") ||
                        "Niveau non précisé"}
                    </h2>
                    {proposal && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        Intéressé
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {r.mode === "online" ? "Partout (en ligne)" : (r.cities?.name ?? "—")} ·{" "}
                    {MODE_LABELS[r.mode]} · budget{" "}
                    {r.budget_max ? `${Number(r.budget_max)} DH/h` : "à discuter"}
                  </p>
                  {r.mode !== "online" && (r.area || mapsLink) && (
                    <div className="mt-3 rounded-2xl border border-primary/30 bg-primary/5 p-4">
                      <p className="flex items-start gap-2 text-sm font-semibold">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{r.area ?? "Position partagée par l'élève"}</span>
                      </p>
                      {mapsLink && (
                        <a
                          href={mapsLink}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-sm"
                        >
                          <Navigation className="size-4" /> Voir la position exacte sur la carte GPS
                        </a>
                      )}
                    </div>
                  )}
                  {slots.length > 0 && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Disponibilité : {slots.map((s) => formatSlot(s)).join(" · ")}
                    </p>
                  )}
                  {r.description && (
                    <p className="mt-3 rounded-xl bg-muted p-3 text-sm">{r.description}</p>
                  )}

                  {!proposal && (
                    <div className="mt-4 space-y-3">
                      {quotaReached && (
                        <p className="rounded-xl bg-destructive/10 p-3 text-sm font-semibold text-destructive">
                          {QUOTA_MESSAGE}
                        </p>
                      )}
                      {confirmId === r.id && !targeted ? (
                        <div className="rounded-xl border border-primary/40 bg-primary/5 p-4">
                          <p className="text-sm font-semibold">
                            Confirmer la mise en relation ?
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            1 mise en relation sera décomptée de votre quota. Le client sera
                            notifié et vous verrez ses coordonnées.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              onClick={() => interested(r.id, false)}
                              className="rounded-xl bg-primary px-5 py-2 text-sm font-bold text-primary-foreground"
                            >
                              Confirmer
                            </button>
                            <button
                              onClick={() => setConfirmId(null)}
                              className="rounded-xl border border-border px-5 py-2 text-sm font-semibold"
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          <button
                            disabled={quotaReached}
                            onClick={() =>
                              targeted ? interested(r.id, true) : setConfirmId(r.id)
                            }
                            className="rounded-xl bg-primary px-5 py-2 text-sm font-bold text-primary-foreground disabled:opacity-50"
                          >
                            Je suis intéressé
                          </button>
                          <button
                            onClick={() => decline(r.id, targeted)}
                            className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2 text-sm font-semibold"
                          >
                            <Trash2 className="size-4" /> Décliner et supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {proposal && (
                    <button
                      onClick={() => decline(r.id, targeted)}
                      className="mt-4 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs font-semibold text-muted-foreground"
                    >
                      <Trash2 className="size-4" /> Supprimer de ma liste
                    </button>
                  )}


                  {contact && <ContactCard contact={contact} title="Coordonnées du client" />}
                </article>
              );
            })}
          </div>
        )}
      </main>
      <SiteFooter variant="pro" />
    </div>
  );
}
