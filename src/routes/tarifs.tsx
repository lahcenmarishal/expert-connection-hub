import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { MobileTabBar, SiteFooter, SiteHeader } from "@/components/site";
import { fetchReferenceData } from "@/lib/marketplace";

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: "Abonnements professeurs — ProFinder" },
      {
        name: "description",
        content:
          "Gratuit, Pro ou Premium : choisissez l'abonnement ProFinder qui vous donne accès aux demandes d'élèves et à plus de visibilité.",
      },
      { property: "og:title", content: "Abonnements professeurs — ProFinder" },
      {
        property: "og:description",
        content: "Comparez les plans Gratuit, Pro et Premium pour les professeurs particuliers.",
      },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  const ref = useQuery({ queryKey: ["reference"], queryFn: fetchReferenceData });
  const plans = (ref.data?.plans ?? []).filter((p) => p.is_visible);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Abonnements professeurs</h1>
        <p className="mb-12 max-w-2xl text-muted-foreground">
          L'inscription et la recherche sont gratuites pour les élèves et les parents. Les
          professeurs choisissent leur niveau d'accès aux demandes.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.code} className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold">{plan.name}</h2>
              <div className="my-6 text-3xl font-extrabold">
                {Number(plan.price_mad)} DH
                <span className="text-sm font-normal text-muted-foreground">
                  {plan.duration_days >= 365 ? "/an" : "/mois"}
                </span>
              </div>
              {plan.trial_days > 0 && (
                <p className="mb-4 text-xs font-semibold text-primary">
                  {plan.trial_days} jours d'essai offerts
                </p>
              )}
              <ul className="mb-8 space-y-3 text-sm text-muted-foreground">
                {((plan.features as string[]) ?? []).map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
              <Link
                to="/pro"
                className="mt-auto rounded-xl bg-primary py-2 text-center text-sm font-bold text-primary-foreground"
              >
                {Number(plan.price_mad) === 0 ? "Commencer gratuitement" : "Choisir ce plan"}
              </Link>
            </div>
          ))}
        </div>
      </main>
      <MobileTabBar />
      <SiteFooter />
    </div>
  );
}
