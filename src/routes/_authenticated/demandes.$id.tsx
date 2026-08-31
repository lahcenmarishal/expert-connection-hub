import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { MobileTabBar, SiteFooter, SiteHeader } from "@/components/site";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  MODE_LABELS,
  PRO_SELECT,
  detectContactLeak,
  formatSlot,
  type ProfessionalRow,
  type Slot,
} from "@/lib/marketplace";

export const Route = createFileRoute("/_authenticated/demandes/$id")({
  head: () => ({
    meta: [
      { title: "Comparer les propositions — ProFinder" },
      {
        name: "description",
        content:
          "Comparez les propositions reçues : tarif, créneau, expérience, avis puis choisissez et réservez votre professeur.",
      },
      { property: "og:title", content: "Comparer les propositions — ProFinder" },
      {
        property: "og:description",
        content: "Choisissez le professeur qui correspond le mieux à votre demande.",
      },
    ],
  }),
  component: RequestDetail,
  errorComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Demande indisponible.</div>
  ),
});

function RequestDetail() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const qc = useQueryClient();
  const [message, setMessage] = useState("");
  const [reviewFor, setReviewFor] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const request = useQuery({
    queryKey: ["request", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("requests")
        .select("*, services(name), levels(name), cities(name)")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const proposals = useQuery({
    queryKey: ["proposals", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("proposals")
        .select(`*, professionals(${PRO_SELECT})`)
        .eq("request_id", id)
        .order("match_score", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const bookings = useQuery({
    queryKey: ["request-bookings", id],
    queryFn: async () => {
      const { data } = await supabase.from("bookings").select("*").eq("request_id", id);
      return data ?? [];
    },
  });




  const contact = async (proposalId: string, professionalUserId: string | null) => {
    if (!user || !professionalUserId) {
      toast.error("Ce professeur ne peut pas être contacté.");
      return;
    }
    if (!message.trim()) {
      toast.error("Écrivez d'abord votre message.");
      return;
    }
    const flagged = detectContactLeak(message);
    const { error } = await supabase.from("messages").insert({
      request_id: id,
      proposal_id: proposalId,
      sender_id: user.id,
      recipient_id: professionalUserId,
      body: message,
      flagged,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    setMessage("");
    toast.success(
      flagged
        ? "Message envoyé. Rappel : les coordonnées ne sont partagées qu'après réservation."
        : "Message envoyé.",
    );
  };

  const completeAndReview = async (bookingId: string, professionalId: string) => {
    if (!user) return;
    await supabase.from("bookings").update({ status: "completed" }).eq("id", bookingId);
    const { error } = await supabase.from("reviews").insert({
      booking_id: bookingId,
      author_id: user.id,
      professional_id: professionalId,
      rating,
      comment,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Merci pour votre avis !");
    setReviewFor(null);
    setComment("");
    qc.invalidateQueries();
  };

  const r = request.data;
  const slots = (r?.slots ?? []) as Slot[];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 pb-24">
        {request.isLoading ? (
          <p className="text-muted-foreground">Chargement…</p>
        ) : !r ? (
          <p className="text-muted-foreground">
            Cette demande n'existe plus (elle a été supprimée ou expirée).
          </p>
        ) : (
          <>
            <section className="rounded-3xl border border-border bg-card p-6 shadow-panel">
              <h1 className="text-2xl font-extrabold tracking-tight">
                {r.services?.name ?? "Toutes matières"} · {r.levels?.name ?? "Tous niveaux"}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {r.cities?.name ?? "—"} · {MODE_LABELS[r.mode]} · budget max{" "}
                {Number(r.budget_max ?? 0)} DH/h
              </p>
              {slots.length > 0 && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Créneaux souhaités : {slots.map((s) => formatSlot(s)).join(", ")}
                </p>
              )}
              {r.description && <p className="mt-3 text-sm">{r.description}</p>}
            </section>

            <h2 className="mt-10 mb-4 text-xl font-bold">
              Propositions reçues ({proposals.data?.length ?? 0})
            </h2>

            {(proposals.data ?? []).length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucune proposition pour l'instant. Les professeurs compatibles ont été notifiés.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {(proposals.data ?? []).map((p) => {
                  const pro = p.professionals as unknown as ProfessionalRow;
                  const booking = (bookings.data ?? []).find((b) => b.proposal_id === p.id);
                  return (
                    <article
                      key={p.id}
                      className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
                    >
                      <div className="flex items-start gap-3">
                        {pro.photo_url ? (
                          <img
                            src={pro.photo_url}
                            alt={pro.display_name}
                            loading="lazy"
                            className="size-14 shrink-0 rounded-2xl object-cover"
                          />
                        ) : (
                          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-muted text-lg font-bold">
                            {pro.display_name?.charAt(0) ?? "?"}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-base font-bold">{pro.display_name}</h3>
                          <p className="truncate text-xs text-muted-foreground">
                            {pro.headline ?? "Professeur particulier"}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            ⭐ {Number(pro.rating_avg ?? 0).toFixed(1)} ({pro.rating_count ?? 0}) ·{" "}
                            {pro.experience_years ?? 0} ans
                          </p>
                        </div>
                        <span className="shrink-0 rounded-xl bg-primary/10 px-3 py-1.5 text-sm font-extrabold text-primary">
                          {Number(p.rate)} DH/h
                        </span>
                      </div>

                      {p.message && (
                        <p className="mt-3 line-clamp-3 rounded-xl bg-muted p-3 text-sm text-muted-foreground">
                          {p.message}
                        </p>
                      )}

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                          to="/professeurs/$id"
                          params={{ id: pro.id }}
                          search={{ contact: "1" as const }}
                          className="flex-1 rounded-xl border border-border px-4 py-2 text-center text-sm font-semibold hover:bg-muted"
                        >
                          Voir le profil
                        </Link>
                      </div>


                      <div className="mt-3 flex gap-2">
                        <input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Votre message…"
                          className="min-w-0 flex-1 rounded-lg border border-border bg-muted px-3 py-2 text-sm"
                        />
                        <button
                          onClick={() => contact(p.id, pro.user_id)}
                          className="rounded-lg border border-border px-3 py-2 text-xs font-bold"
                        >
                          Envoyer
                        </button>
                      </div>

                      {booking && booking.status !== "completed" && (
                        <button
                          onClick={() => setReviewFor(booking.id)}
                          className="mt-3 text-left text-xs font-semibold text-primary"
                        >
                          Cours terminé ? Laisser un avis
                        </button>
                      )}
                      {reviewFor === booking?.id && booking && (
                        <div className="mt-3 space-y-2 rounded-xl bg-muted p-3">
                          <label className="text-xs font-semibold" htmlFor={`rating-${p.id}`}>
                            Note ({rating}/5)
                          </label>
                          <input
                            id={`rating-${p.id}`}
                            type="range"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="w-full accent-primary"
                          />
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Votre commentaire"
                            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
                          />
                          <button
                            onClick={() => completeAndReview(booking.id, p.professional_id)}
                            className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground"
                          >
                            Publier mon avis
                          </button>
                        </div>
                      )}
                    </article>
                  );
                })}

              </div>
            )}
          </>
        )}
      </main>
      <MobileTabBar />
      <SiteFooter />
    </div>
  );
}
