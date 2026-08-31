import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { MobileTabBar, SiteFooter, SiteHeader } from "@/components/site";
import { VerifiedBadge } from "@/components/verified-badge";
import { RequestProButton } from "@/components/request-pro";
import { supabase } from "@/integrations/supabase/client";
import { LEVELS, SERVICES } from "@/lib/catalog";
import { CITIES } from "@/lib/cities";
import {
  PRO_SELECT,
  WEEKDAYS,
  cyclesOf,
  formatSlot,
  type ProfessionalRow,
} from "@/lib/marketplace";






export const Route = createFileRoute("/professeurs/$id")({
  validateSearch: (search: Record<string, unknown>): { contact?: "1" } =>
    search['contact'] === "1" ? { contact: "1" } : {},
  head: () => ({
    meta: [
      { title: "Profil professeur — ProFinder" },
      {
        name: "description",
        content:
          "Expérience, matières, niveaux, tarif horaire, zone de déplacement, disponibilités et avis vérifiés du professeur.",
      },
      { property: "og:title", content: "Profil professeur — ProFinder" },
      {
        property: "og:description",
        content: "Consultez le profil complet et contactez le professeur sur ProFinder.",
      },
    ],
  }),
  component: ProProfile,
  errorComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Profil indisponible.</div>
  ),
  notFoundComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Ce professeur n'existe pas.</div>
  ),
});

function ProProfile() {
  const { id } = Route.useParams();

  const pro = useQuery({
    queryKey: ["professional", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("professionals")
        .select(PRO_SELECT)
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as ProfessionalRow | null;
    },
  });




  const refs = useQuery({
    queryKey: ["pro-refs"],
    queryFn: async () => {
      return {
        services: SERVICES.map((s) => ({ id: s.id, name: s.name })),
        levels: LEVELS.map((l) => ({ id: l.id, name: l.name })),
        cities: CITIES.map((c) => ({ id: c.id, name: c.name })),
      };
    },
  });

  const p = pro.data;

  // Statistique « vues du profil » affichée au professeur (plan Pro).
  useEffect(() => {
    if (!p?.id) return;
    void supabase.from("profile_views").insert({ professional_id: p.id });
  }, [p?.id]);


  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8 pb-24">
        {pro.isLoading ? (
          <p className="text-muted-foreground">Chargement du profil…</p>
        ) : !p ? (
          <p className="text-muted-foreground">Ce profil n'est pas disponible.</p>
        ) : (
          <>
            <div className="overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-panel sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                <img
                  src={p.photo_url ?? "/images/pros/omar.jpg"}
                  alt={`Photo de ${p.display_name}`}
                  width={512}
                  height={512}
                  className="aspect-square w-full rounded-2xl bg-muted object-cover sm:size-32 sm:w-32 sm:shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h1 className="break-words text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {p.display_name}
                  </h1>
                  {p.headline && <p className="text-muted-foreground">{p.headline}</p>}
                  <p className="mt-2 text-sm text-muted-foreground">
                    {[
                      (() => {
                        const c = refs.data?.cities.find((x) => x.id === p.city_id)?.name;
                        return c ? `📍 ${c}` : null;
                      })(),
                      p.mode_home ? "🏠 À domicile" : null,
                      p.mode_online ? "💻 En ligne" : null,
                      p.mode_studio ? "👨‍🏫 Chez le professeur" : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <VerifiedBadge verified={p.verification_status === "verified"} />
                    {p.verification_status === "verified" && (
                      <span className="rounded-full bg-primary/10 px-2 py-1 font-bold text-primary">
                        ✓ Diplôme vérifié
                      </span>
                    )}
                    {p.plan_code !== "gratuit" && (
                      <span className="rounded-full bg-accent/20 px-2 py-1 font-bold text-accent-foreground">
                        Pro
                      </span>
                    )}
                  </div>
                </div>
                <div className="sm:shrink-0 sm:text-right">
                  <div className="text-2xl font-extrabold text-primary">
                    {Number(p.hourly_rate)} DH<span className="text-sm font-semibold">/h</span>
                  </div>
                  <RequestProButton
                    pro={{
                      id: p.id,
                      category_id: p.category_id,
                      city_id: p.city_id,
                      user_id: p.user_id,
                    }}
                    className="mt-3 w-full rounded-xl bg-primary px-6 py-3.5 text-base font-extrabold uppercase tracking-wide text-primary-foreground hover:opacity-90 sm:w-auto"
                  />
                </div>

              </div>
            </div>




            <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-2">
              {(p.bio || p.diplomas) && (
                <section className="rounded-2xl border border-border bg-card p-6">
                  {p.bio && (
                    <>
                      <h2 className="mb-3 font-bold">Présentation</h2>
                      <p className="text-sm whitespace-pre-line break-words text-muted-foreground">{p.bio}</p>
                    </>
                  )}
                  {p.diplomas && (
                    <>
                      <h3 className={`${p.bio ? "mt-4" : ""} mb-1 font-bold`}>
                        Diplômes
                      </h3>
                      <p className="text-sm whitespace-pre-line break-words text-muted-foreground">
                        {p.diplomas}
                      </p>
                      {p.verification_status === "verified" && (
                        <p className="mt-2 text-sm font-semibold text-primary">✓ Diplôme vérifié</p>
                      )}
                    </>
                  )}
                </section>
              )}

              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-3 font-bold">Enseignement</h2>
                <dl className="space-y-3 text-sm">
                  {(() => {
                    const subjects = Array.from(
                      new Set(
                        p.professional_services
                          .map((s) => refs.data?.services.find((x) => x.id === s.service_id)?.name ?? "")
                          .filter(Boolean)
                          .map((n) => n.replace(/\s*\([^)]*\)\s*$/, "").trim()),
                      ),
                    );
                    // Niveaux : afficher le cycle (ex. « Collège ») quand tout le cycle
                    // est sélectionné, comme choisi par le professeur à l'inscription.
                    const selectedIds = new Set(p.professional_levels.map((l) => l.level_id));
                    const levels: string[] = [];
                    for (const cycle of cyclesOf(LEVELS)) {
                      const inCycle = LEVELS.filter((l) => l.cycle === cycle);
                      const picked = inCycle.filter((l) => selectedIds.has(l.id));
                      if (picked.length === 0) continue;
                      if (picked.length === inCycle.length) levels.push(cycle);
                      else levels.push(...picked.map((l) => l.name));
                    }

                    const modes = [
                      p.mode_home && "À domicile",
                      p.mode_studio && "Chez le professeur",
                      p.mode_online && "En ligne",
                    ].filter(Boolean) as string[];
                    const rows: Array<[string, string]> = [];
                    if (subjects.length) rows.push(["Matières", subjects.join(", ")]);
                    if (levels.length) rows.push(["Niveaux", levels.join(", ")]);
                    if (modes.length) rows.push(["Type de cours", modes.join(" · ")]);
                    if (p.experience_years > 0)
                      rows.push(["Expérience", `${p.experience_years} ans`]);
                    if (p.languages.length) rows.push(["Langues", p.languages.join(", ")]);
                    return rows.map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                          {label}
                        </dt>
                        <dd className="font-medium">{value}</dd>
                      </div>
                    ));
                  })()}
                </dl>
              </section>

              {p.professional_availability.length > 0 && (
                <section className="rounded-2xl border border-border bg-card p-6">
                  <h2 className="mb-3 font-bold">Disponibilités</h2>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {p.professional_availability
                      .slice()
                      .sort((a, b) => a.weekday - b.weekday || a.start_min - b.start_min)
                      .map((slot, i) => (
                        <li key={`${WEEKDAYS[slot.weekday]}-${i}`}>{formatSlot(slot)}</li>
                      ))}
                  </ul>
                </section>
              )}
            </div>

          </>
        )}
      </main>
      <MobileTabBar />
      <SiteFooter />
    </div>
  );
}
