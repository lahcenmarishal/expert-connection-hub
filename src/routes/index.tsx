import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { MobileTabBar, SiteFooter, SiteHeader } from "@/components/site";
import { NeedForm } from "@/components/need-form";
import { ProCard } from "@/components/pro-card";
import { CalendarCheck, PencilLine, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import {
  MODE_LABELS,
  cityName,
  fetchProfessionals,
  fetchRecentRequests,
  fetchReferenceData,
  formatBudget,
  formatSlot,
  levelName,
  planBoostFor,
  scoreMatch,
  serviceName,
  timeAgo,
  whatsappLink,
} from "@/lib/marketplace";

type Contact = { full_name: string | null; email: string | null; phone: string | null };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProFinder — Trouvez un professeur particulier au Maroc" },
      {
        name: "description",
        content:
          "Décrivez votre besoin en 2 minutes, recevez des propositions de professeurs particuliers près de vous et choisissez le meilleur profil.",
      },
      { property: "og:title", content: "ProFinder — Trouvez un professeur particulier au Maroc" },
      {
        property: "og:description",
        content:
          "Matière, niveau, ville, disponibilité et budget : la plateforme trouve les professeurs compatibles avec votre demande.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const ref = useQuery({ queryKey: ["reference"], queryFn: fetchReferenceData });
  const pros = useQuery({ queryKey: ["professionals"], queryFn: fetchProfessionals });
  const requests = useQuery({
    queryKey: ["recent-requests"],
    queryFn: () => fetchRecentRequests(6),
  });
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Record<string, Contact>>({});
  const [pendingRequestId, setPendingRequestId] = useState<string | null>(null);

  const myPro = useQuery({
    queryKey: ["my-pro-home", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("professionals")
        .select("id, hourly_rate")
        .eq("user_id", user!.id)
        .maybeSingle();
      return data;
    },
  });

  const showInterest = async (requestId: string) => {
    const pro = myPro.data;
    if (!pro) return;
    const { error } = await supabase.from("proposals").insert({
      request_id: requestId,
      professional_id: pro.id,
      rate: Number(pro.hourly_rate),
      message: "Bonjour, je suis intéressé par votre demande.",
    });
    if (error && !error.message.includes("duplicate")) {
      toast.error(error.message);
      return;
    }
    const { data: req } = await supabase
      .from("requests")
      .select("client_id, request_contacts(full_name, email, phone)")
      .eq("id", requestId)
      .maybeSingle();
    let contact: Contact = { full_name: null, email: null, phone: null };
    const guest = Array.isArray(req?.request_contacts)
      ? req?.request_contacts[0]
      : req?.request_contacts;
    if (guest) {
      contact = { full_name: guest.full_name, email: guest.email, phone: guest.phone };
    } else if (req?.client_id) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("id", req.client_id)
        .maybeSingle();
      contact = { full_name: profile?.full_name ?? null, email: null, phone: profile?.phone ?? null };
    }
    setContacts((c) => ({ ...c, [requestId]: contact }));
    toast.success("Le client a été notifié. Ses coordonnées s'affichent ci-dessous.");
  };


  const plans = (ref.data?.plans ?? []).filter((p) => p.is_visible);
  const top = (pros.data ?? [])
    .map((p) => ({
      pro: p,
      ...scoreMatch(p, {}, ref.data?.weights, planBoostFor(p.plan_code)),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 md:py-16">
        <div className="mb-12 text-center md:mb-20">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            Besoin d'un professeur ? <span className="text-primary">Trouvez la bonne personne.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Décrivez votre besoin, recevez des propositions et choisissez le professeur qui vous
            convient.
          </p>
        </div>

        <div className="mb-20">
          <NeedForm
            services={ref.data?.services ?? []}
            levels={ref.data?.levels ?? []}
            specialties={ref.data?.specialties ?? []}
            cities={ref.data?.cities ?? []}
          />
        </div>

        <section className="mb-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">Professeurs disponibles</h2>
              <p className="text-muted-foreground">
                Les profils les mieux notés de la plateforme, tous niveaux confondus.
              </p>
            </div>
            <Link to="/professeurs" className="text-sm font-semibold text-primary">
              Voir tout
            </Link>
          </div>

          {pros.isLoading ? (
            <p className="text-sm text-muted-foreground">Chargement des profils…</p>
          ) : top.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucun professeur publié pour le moment. Les nouveaux profils apparaîtront ici.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {top.map((entry, index) => (
                <ProCard
                  key={entry.pro.id}
                  pro={entry.pro}
                  score={entry.score}
                  distance={entry.distance}
                  highlight={index === 0}
                />
              ))}
            </div>
          )}
        </section>

        <section className="mb-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Demandes récentes</h2>
              <p className="text-muted-foreground">
                Les derniers besoins publiés par les élèves et les parents.
              </p>
            </div>
            <Link
              to={user ? "/publier" : "/auth"}
              className="shrink-0 text-sm font-semibold text-primary"
            >
              {user ? "Publier une demande" : "Se connecter pour publier"}
            </Link>
          </div>

          {requests.isLoading ? (
            <p className="text-sm text-muted-foreground">Chargement des demandes…</p>
          ) : (requests.data ?? []).length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucune demande active pour le moment. Publiez la vôtre en 2 minutes.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {(requests.data ?? []).map((req) => {
                const subject = serviceName(req.service_id) ?? "Soutien scolaire";
                const level = levelName(req.level_id);
                const city = cityName(req.city_id);
                const slot = (req.slots ?? [])[0];
                const contact = contacts[req.id];
                return (
                  <article
                    key={req.id}
                    className="flex h-full flex-col rounded-2xl border border-border bg-card p-5"
                  >
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {subject}
                      </span>
                      <span className="text-xs text-muted-foreground">{timeAgo(req.created_at)}</span>
                    </div>
                    <h3 className="font-bold">
                      {level ?? "Tous niveaux"}
                      {city ? ` · ${city}` : ""}
                    </h3>
                    {req.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {req.description}
                      </p>
                    )}
                    <ul className="mt-4 space-y-1 text-xs text-muted-foreground">
                      <li>💰 {formatBudget(req.budget_min, req.budget_max)}</li>
                      <li>📍 {MODE_LABELS[req.mode] ?? req.mode}{req.area ? ` · ${req.area}` : ""}</li>
                      <li>🗓️ {slot ? formatSlot(slot) : "Créneau flexible"}</li>
                    </ul>
                    {myPro.data ? (
                      contact ? (
                        <div className="mt-5 rounded-xl border border-primary/40 bg-primary/5 p-3 text-sm">
                          <p className="font-bold">Coordonnées du demandeur</p>
                          <p className="mt-1">{contact.full_name ?? "Client"}</p>
                          {contact.phone && (
                            <p className="mt-1">
                              <a className="text-primary" href={`tel:${contact.phone}`}>
                                {contact.phone}
                              </a>
                              {whatsappLink(contact.phone) && (
                                <>
                                  {" · "}
                                  <a
                                    className="text-primary"
                                    href={whatsappLink(contact.phone)!}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    WhatsApp
                                  </a>
                                </>
                              )}
                            </p>
                          )}
                          {contact.email && (
                            <p className="mt-1">
                              <a className="text-primary" href={`mailto:${contact.email}`}>
                                {contact.email}
                              </a>
                            </p>
                          )}
                          {!contact.phone && !contact.email && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              Aucune coordonnée fournie par le client.
                            </p>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => setPendingRequestId(req.id)}
                          className="mt-5 block w-full rounded-xl bg-primary py-2 text-center text-sm font-bold text-primary-foreground"
                        >
                          Je suis intéressé
                        </button>
                      )
                    ) : (
                      <Link
                        to={user ? "/publier" : "/auth"}
                        className="mt-5 block rounded-xl border border-border py-2 text-center text-sm font-semibold hover:bg-muted"
                      >
                        {user ? "Publier une demande similaire" : "Se connecter pour répondre"}
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Comment ça marche</h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              Trois étapes simples, côté élève comme côté professeur.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: PencilLine,
                title: "Décrivez votre besoin",
                body: "Matière, niveau, ville, créneau et budget : le formulaire prend moins de 2 minutes, sans inscription compliquée.",
                student: "Vous publiez une demande claire et gratuite.",
                teacher: "Vous recevez des demandes qui correspondent à vos matières et à votre zone.",
              },
              {
                icon: Users,
                title: "Comparez les propositions",
                body: "Notre moteur classe les professeurs selon la matière, le niveau, la disponibilité, la distance et le budget.",
                student: "Vous voyez tarif, expérience, avis et score de compatibilité.",
                teacher: "Vous proposez votre tarif et un créneau en un clic.",
              },
              {
                icon: CalendarCheck,
                title: "Réservez et évaluez",
                body: "Discutez dans la messagerie intégrée, confirmez la réservation puis laissez un avis après le cours.",
                student: "Vous réservez en toute sécurité et suivez vos cours.",
                teacher: "Vous construisez votre réputation et fidélisez vos élèves.",
              },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-3xl font-extrabold text-muted-foreground/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{step.body}</p>
                  <ul className="mt-auto space-y-2 text-xs">
                    <li className="rounded-lg bg-muted px-3 py-2">
                      <span className="font-semibold">Élève :</span> {step.student}
                    </li>
                    <li className="rounded-lg bg-muted px-3 py-2">
                      <span className="font-semibold">Professeur :</span> {step.teacher}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl bg-secondary px-6 py-16 text-secondary-foreground">
          <div className="absolute top-0 right-0 -mt-32 -mr-32 size-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Boostez votre activité de professeur</h2>
            <p className="mb-12 text-secondary-foreground/70">
              Choisissez le plan qui correspond à vos ambitions et recevez plus de demandes.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {plans.map((plan) => {
                const featured = plan.code === "pro";
                return (
                  <div
                    key={plan.code}
                    className={
                      featured
                        ? "relative scale-105 rounded-2xl border-2 border-primary bg-card/10 p-6 shadow-2xl"
                        : "rounded-2xl border border-secondary-foreground/10 bg-card/5 p-6 backdrop-blur-sm"
                    }
                  >
                    {featured && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-primary-foreground">
                        Populaire
                      </div>
                    )}
                    <h3
                      className={
                        featured ? "text-lg font-bold text-primary" : "text-lg font-bold"
                      }
                    >
                      {plan.name}
                    </h3>
                    <div className="my-6 text-3xl font-extrabold">
                      {Number(plan.price_mad)} DH
                      <span className="text-sm font-normal text-secondary-foreground/60">
                        {plan.duration_days >= 365 ? "/an" : "/mois"}
                      </span>
                    </div>
                    <ul className="mb-8 space-y-3 text-left text-sm text-secondary-foreground/80">
                      {((plan.features as string[]) ?? []).map((f) => (
                        <li key={f}>✓ {f}</li>
                      ))}
                    </ul>
                    <Link
                      to="/pro"
                      className={
                        featured
                          ? "block w-full rounded-xl bg-primary py-2 text-center text-sm font-bold text-primary-foreground"
                          : "block w-full rounded-xl border border-secondary-foreground/20 py-2 text-center text-sm font-bold hover:bg-card/10"
                      }
                    >
                      {Number(plan.price_mad) === 0 ? "Commencer" : "S'abonner"}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <AlertDialog
        open={!!pendingRequestId}
        onOpenChange={(open) => !open && setPendingRequestId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer votre intérêt pour cette demande ?</AlertDialogTitle>
            <AlertDialogDescription>
              Le client sera notifié uniquement après votre confirmation. Vous accéderez ensuite à
              ses coordonnées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const id = pendingRequestId;
                setPendingRequestId(null);
                if (id) void showInterest(id);
              }}
            >
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <MobileTabBar />
      <SiteFooter />
    </div>
  );
}
