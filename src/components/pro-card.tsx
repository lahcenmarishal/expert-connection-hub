import { Link } from "@tanstack/react-router";
import type { ProfessionalRow } from "@/lib/marketplace";
import { cyclesOf, serviceName, cityName } from "@/lib/marketplace";
import { LEVELS } from "@/lib/catalog";
import { VerifiedBadge } from "@/components/verified-badge";
import { RequestProButton } from "@/components/request-pro";

function subjectsOf(pro: ProfessionalRow) {
  const names = pro.professional_services
    .map((s) => serviceName(s.service_id))
    .filter((n): n is string => Boolean(n))
    // éviter les répétitions d'une même matière présente dans plusieurs niveaux
    .map((n) => n.replace(/\s*\([^)]*\)\s*$/, "").trim());
  return Array.from(new Set(names));
}

function levelCyclesOf(pro: ProfessionalRow) {
  const ids = new Set(pro.professional_levels.map((l) => l.level_id));
  return Array.from(new Set(cyclesOf(LEVELS.filter((l) => ids.has(l.id)))));
}

function modesOf(pro: ProfessionalRow) {
  const modes: string[] = [];
  if (pro.mode_home) modes.push("🏠 À domicile");
  if (pro.mode_online) modes.push("💻 En ligne");
  if (pro.mode_studio) modes.push("👨‍🏫 Chez le professeur");
  return modes;
}

const DAY_SHORT = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

function daysOf(pro: ProfessionalRow) {
  const set = new Set((pro.professional_availability ?? []).map((s) => s.weekday));
  return [1, 2, 3, 4, 5, 6, 0].filter((d) => set.has(d)).map((d) => DAY_SHORT[d]);
}


export function ProCard({
  pro,
  score,
  distance,
  highlight = false,
  showScore = false,
  action,
}: {
  pro: ProfessionalRow;
  score?: number;
  distance?: number | null;
  highlight?: boolean;
  showScore?: boolean;
  action?: React.ReactNode;
}) {
  
  const subjects = subjectsOf(pro);
  const cycles = levelCyclesOf(pro);
  const modes = modesOf(pro);
  const city = cityName(pro.city_id);
  const days = daysOf(pro);

  const meta = [
    cycles.length > 0 ? `🎓 ${cycles.join(", ")}` : null,
    city ? `📍 ${[city, distance != null ? `${distance} km` : null].filter(Boolean).join(" · ")}` : null,
    ...modes,
  ].filter(Boolean) as string[];

  return (
    <div
      className={
        "relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md " +
        (highlight ? "border-primary/30" : "border-border")
      }
    >
      <div className="relative">
        <img
          src={pro.photo_url ?? "/images/pros/omar.jpg"}
          alt={`Photo de ${pro.display_name}`}
          loading="lazy"
          width={640}
          height={640}
          className="aspect-[4/3] w-full bg-muted object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/85 to-transparent p-4 pt-12">
          <h3 className="flex items-center gap-2 text-xl font-extrabold leading-tight text-background">
            <span className="truncate">{pro.display_name}</span>
            <VerifiedBadge verified={pro.verification_status === "verified"} compact />
          </h3>
          {meta.length > 0 && (
            <p className="truncate text-sm font-medium text-background/85">{meta.join(" · ")}</p>
          )}
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-card/95 px-3 py-1 text-sm font-extrabold shadow-sm">
          {Number(pro.hourly_rate)} DH<span className="text-xs font-medium">/h</span>
        </div>
        {pro.plan_code !== "gratuit" && (
          <div className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
            Pro
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="text-sm">
          <span className="font-semibold text-foreground">Disponibilité : </span>
          {days.length > 0 ? (
            <span className="text-muted-foreground">{days.join(" · ")}</span>
          ) : (
            <span className="text-muted-foreground">à convenir</span>
          )}
        </div>

        {subjects.length > 0 && (
          <p className="mt-1 line-clamp-2 text-sm font-bold text-primary">
            {subjects.slice(0, 4).join(" · ")}
            {subjects.length > 4 ? ` +${subjects.length - 4}` : ""}
          </p>
        )}


        {showScore && score != null && (
          <div className="mt-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Compatibilité</span>
              <span className="font-bold text-primary">{score}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${score}%` }} />
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
          {action ?? (
            <>
              <Link
                to="/professeurs/$id"
                params={{ id: pro.id }}
                className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-semibold hover:bg-muted"
              >
                Voir le profil
              </Link>
              <RequestProButton
                pro={{
                  id: pro.id,
                  category_id: pro.category_id,
                  city_id: pro.city_id,
                  user_id: pro.user_id,
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
