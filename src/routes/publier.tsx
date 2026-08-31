import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { SiteFooter, SiteHeader } from "@/components/site";
import { NeedForm, type NeedValues } from "@/components/need-form";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { PENDING_ROLE_KEY } from "@/routes/auth";
import {
  clearRequestDraft,
  publishRequest,
  saveRequestDraft,
  type RequestDraft,
} from "@/lib/request-draft";
import { DEFAULT_RATE_RANGE, fetchReferenceData, type RateRange } from "@/lib/marketplace";

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

export const Route = createFileRoute("/publier")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    service: str(search["service"]),
    level: str(search["level"]),
    city: str(search["city"]),
    mode: (["home", "studio", "online"] as const).includes(search["mode"] as never)
      ? (search["mode"] as Search["mode"])
      : "home",
    budget: str(search["budget"]),
    address: str(search["address"]),
    lat: str(search["lat"]),
    lng: str(search["lng"]),
  }),
  head: () => ({
    meta: [
      { title: "Publier ma demande de cours — ProFinder" },
      {
        name: "description",
        content:
          "Décrivez votre besoin de cours particuliers (matière, niveau, ville, disponibilités, budget) et recevez des propositions de professeurs vérifiés au Maroc.",
      },
      { property: "og:title", content: "Publier ma demande de cours — ProFinder" },
      {
        property: "og:description",
        content:
          "Publiez votre demande gratuitement et comparez les propositions de professeurs particuliers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PublishPage,
});

function draftFromValues(values: NeedValues): RequestDraft {
  const num = (v: string) => (v.trim() === "" ? null : Number(v));
  return {
    service_id: values.service || null,
    level_id: values.level || null,
    city_id: values.city || null,
    mode: values.mode,
    budget_min: num(values.budgetMin),
    budget_max: num(values.budgetMax),
    slots: values.slots,
    description: values.description,
    area: values.address || null,
    lat: num(values.lat),
    lng: num(values.lng),
  };
}

function PublishPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const ref = useQuery({ queryKey: ["reference"], queryFn: fetchReferenceData });
  const rateRange = (ref.data?.settings["rate_range"] as RateRange) ?? DEFAULT_RATE_RANGE;

  const [draft, setDraft] = useState<RequestDraft | null>(null);
  const [busy, setBusy] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accepted, setAccepted] = useState(false);

  const goLive = async (clientId: string, payload: RequestDraft) => {
    const id = await publishRequest(clientId, payload);
    clearRequestDraft();
    toast.success("🎉 Votre demande a été publiée ! Les professeurs vont vous répondre.");
    navigate({ to: "/demandes/$id", params: { id } });
  };

  const onNeedSubmit = async (values: NeedValues) => {
    const next = draftFromValues(values);
    if (!next.city_id) {
      toast.error("Indiquez votre ville pour recevoir des propositions locales.");
      return;
    }
    saveRequestDraft(next);
    if (user) {
      setBusy(true);
      try {
        await goLive(user.id, next);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Publication impossible");
      } finally {
        setBusy(false);
      }
      return;
    }
    setDraft(next);
  };

  const createAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    if (!accepted) {
      toast.error("Vous devez accepter les conditions d'utilisation.");
      return;
    }
    if (password !== confirm) {
      toast.error("Les deux mots de passe ne correspondent pas.");
      return;
    }
    setBusy(true);
    try {
      saveRequestDraft(draft);
      try {
        localStorage.setItem(PENDING_ROLE_KEY, "client");
      } catch {
        /* stockage indisponible */
      }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email?role=client`,
          data: { full_name: fullName.trim(), phone, role: "client" },
        },
      });
      if (error) throw error;
      if (data.session?.user) {
        await goLive(data.session.user.id, draft);
        return;
      }
      navigate({ to: "/verifier-email", search: { email } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Création du compte impossible");
    } finally {
      setBusy(false);
    }
  };

  const field =
    "w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20";
  const labelCls = "text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-10 pb-24">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight">
          {draft ? "Dernière étape : votre compte" : "Publier ma demande"}
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          {draft
            ? "Vos informations de demande sont conservées : elles seront publiées automatiquement."
            : "Décrivez votre besoin. C'est gratuit et sans engagement."}
        </p>

        {!draft ? (
          <NeedForm
            services={ref.data?.services ?? []}
            levels={ref.data?.levels ?? []}
            specialties={ref.data?.specialties ?? []}
            cities={ref.data?.cities ?? []}
            rateRange={rateRange}
            extended
            title="Votre besoin de cours"
            submitLabel={user ? "Publier ma demande" : "Continuer"}
            initial={{
              service: search.service ?? "",
              level: search.level ?? "",
              city: search.city ?? "",
              mode: search.mode ?? "home",
              budget: search.budget ?? "",
              budgetMax: search.budget ?? "",
              address: search.address ?? "",
              lat: search.lat ?? "",
              lng: search.lng ?? "",
            }}
            onSubmit={(values) => void onNeedSubmit(values)}
          />
        ) : (
          <form
            onSubmit={createAccount}
            className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-panel"
          >
            <h2 className="text-xl font-bold">
              Créez votre compte gratuitement pour recevoir les propositions.
            </h2>
            <div className="space-y-1">
              <label className={labelCls} htmlFor="pub-name">
                Nom complet
              </label>
              <input
                id="pub-name"
                className={field}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                maxLength={120}
                required
              />
            </div>
            <div className="space-y-1">
              <label className={labelCls} htmlFor="pub-email">
                Email
              </label>
              <input
                id="pub-email"
                type="email"
                className={field}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                required
              />
            </div>
            <div className="space-y-1">
              <label className={labelCls} htmlFor="pub-phone">
                Numéro de téléphone
              </label>
              <input
                id="pub-phone"
                type="tel"
                className={field}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={30}
                placeholder="06 12 34 56 78"
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className={labelCls} htmlFor="pub-password">
                  Mot de passe
                </label>
                <input
                  id="pub-password"
                  type="password"
                  className={field}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className={labelCls} htmlFor="pub-confirm">
                  Confirmation
                </label>
                <input
                  id="pub-confirm"
                  type="password"
                  className={field}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  minLength={8}
                  required
                />
              </div>
            </div>
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border"
                required
              />
              <span className="text-muted-foreground">
                J'accepte les conditions d'utilisation et la politique de confidentialité.
              </span>
            </label>
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-primary py-3 font-bold text-primary-foreground disabled:opacity-60"
            >
              Créer mon compte et publier ma demande
            </button>
            <button
              type="button"
              onClick={() => setDraft(null)}
              className="w-full text-sm text-muted-foreground hover:text-primary"
            >
              ← Modifier ma demande
            </button>
            <p className="text-center text-sm text-muted-foreground">
              Déjà un compte ?{" "}
              <Link
                to="/auth"
                search={{ mode: "signin", role: "client" }}
                className="font-semibold text-primary"
              >
                Se connecter
              </Link>{" "}
              — votre demande sera publiée ensuite.
            </p>
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
