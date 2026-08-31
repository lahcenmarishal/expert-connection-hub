import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { MobileTabBar, SiteFooter, SiteHeader } from "@/components/site";
import { NeedForm } from "@/components/need-form";
import { ProCard } from "@/components/pro-card";

import {
  DEFAULT_RATE_RANGE,
  fetchProfessionals,
  fetchReferenceData,
  modeAllowed,
  planBoostFor,
  scoreMatch,
  type RateRange,
} from "@/lib/marketplace";

type Search = {
  service?: string | undefined;
  level?: string | undefined;
  city?: string | undefined;
  mode?: "home" | "studio" | "online" | undefined;
  budget?: string | undefined;
  address?: string | undefined;
  lat?: string | undefined;
  lng?: string | undefined;
};

const str = (v: unknown, fallback?: string) =>
  typeof v === "string" && v !== "" ? v : fallback;

export const Route = createFileRoute("/professeurs/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    service: str(search["service"]),
    level: str(search["level"]),
    city: str(search["city"]),
    mode: (["home", "studio", "online"] as const).includes(search["mode"] as never)
      ? (search["mode"] as Search["mode"])
      : "home",
    budget: str(search["budget"], "100"),
    address: str(search["address"]),
    lat: str(search["lat"]),
    lng: str(search["lng"]),
  }),
  head: () => ({
    meta: [
      { title: "Professeurs compatibles — ProFinder" },
      {
        name: "description",
        content:
          "Comparez les professeurs particuliers compatibles avec votre matière, votre niveau, votre ville, votre créneau et votre budget.",
      },
      { property: "og:title", content: "Professeurs compatibles — ProFinder" },
      {
        property: "og:description",
        content: "Score de compatibilité, tarif, distance et avis pour chaque professeur.",
      },
    ],
  }),
  component: Results,
});

function Results() {
  const search = Route.useSearch();
  const navigate = useNavigate();


  const ref = useQuery({ queryKey: ["reference"], queryFn: fetchReferenceData });
  const pros = useQuery({ queryKey: ["professionals"], queryFn: fetchProfessionals });

  const city = (ref.data?.cities ?? []).find((c) => c.id === search.city);
  const rateRange = (ref.data?.settings["rate_range"] as RateRange) ?? DEFAULT_RATE_RANGE;
  const pickedLat = search.lat ? Number(search.lat) : null;
  const pickedLng = search.lng ? Number(search.lng) : null;

  const criteria = {
    service_id: search.service ?? null,
    level_id: search.level ?? null,
    city_id: search.city ?? null,
    mode: search.mode,
    budget_max: search.budget ? Number(search.budget) : null,
    slots: [],
    lat: pickedLat ?? city?.lat ?? null,
    lng: pickedLng ?? city?.lng ?? null,
  };

  const hasCriteria = Boolean(search.service || search.level || search.city);

  const matches = (pros.data ?? [])
    .filter((p) => modeAllowed(p, search.mode))
    // Même ville : la recherche ne dépend plus d'un rayon de déplacement.
    .filter((p) => (search.city ? p.city_id === search.city : true))
    .map((p) => ({ pro: p, ...scoreMatch(p, criteria, ref.data?.weights, planBoostFor(p.plan_code)) }))
    .sort((a, b) => b.score - a.score);

  const goPublish = () => {
    navigate({
      to: "/publier",
      search: {
        service: search.service,
        level: search.level,
        city: search.city,
        mode: search.mode,
        budget: search.budget,
        address: search.address,
        lat: search.lat,
        lng: search.lng,
      },
    });
  };


  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-10">
          <NeedForm
            services={ref.data?.services ?? []}
            levels={ref.data?.levels ?? []}
            specialties={ref.data?.specialties ?? []}
            cities={ref.data?.cities ?? []}
            rateRange={rateRange}
            initial={{
              service: search.service ?? "",
              level: search.level ?? "",
              city: search.city ?? "",
              mode: search.mode ?? "home",
              budget: search.budget ?? "100",
              address: search.address ?? "",
              lat: search.lat ?? "",
              lng: search.lng ?? "",
            }}
            submitLabel="Mettre à jour la recherche"
          />
        </div>

        <section className="mb-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                {matches.length} professeur{matches.length > 1 ? "s" : ""} compatible
                {matches.length > 1 ? "s" : ""}
              </h1>
              <p className="text-muted-foreground">
                Classés par score de compatibilité avec votre besoin.
              </p>
            </div>
            <button
              onClick={goPublish}
              className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
            >
              Publier ma demande et recevoir des propositions
            </button>

          </div>

          {pros.isLoading ? (
            <p className="text-sm text-muted-foreground">Recherche en cours…</p>
          ) : matches.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucun professeur ne correspond encore. Publiez votre demande : les nouveaux profils y
              répondront.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {matches.map((m, i) => (
                <ProCard
                  key={m.pro.id}
                  pro={m.pro}
                  score={m.score}
                  distance={m.distance}
                  showScore={hasCriteria}
                  highlight={hasCriteria && i === 0}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <MobileTabBar />
      <SiteFooter />
    </div>
  );
}
