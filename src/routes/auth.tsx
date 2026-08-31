import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { SiteHeader } from "@/components/site";
import { tryPublishPendingDraft } from "@/lib/request-draft";
import { resumeClientFlow } from "@/lib/student-need";

type Role = "client" | "pro";

export const PENDING_ROLE_KEY = "profinder.pending_role";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    mode: search['mode'] === "signup" ? ("signup" as const) : ("signin" as const),
    role: search['role'] === "pro" ? ("pro" as Role) : ("client" as Role),
  }),
  head: () => ({
    meta: [
      { title: "Connexion & inscription — ProFinder" },
      {
        name: "description",
        content:
          "Créez votre compte ProFinder en tant que parent, élève ou professeur particulier et accédez aux demandes de cours.",
      },
      { property: "og:title", content: "Connexion & inscription — ProFinder" },
      {
        property: "og:description",
        content: "Rejoignez la marketplace de cours particuliers au Maroc.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">(search.mode);
  const role: Role = search.role;
  const isPro = role === "pro";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);

  const goClientHome = async (userId: string) => {
    const requestId = await tryPublishPendingDraft(userId);
    if (requestId) {
      toast.success("🎉 Votre demande a été publiée !");
      navigate({ to: "/demandes/$id", params: { id: requestId } });
      return;
    }
    const next = await resumeClientFlow(userId);
    if (next.kind === "request") {
      toast.success("🎉 Votre demande a été envoyée au professeur.");
      navigate({ to: "/demandes/$id", params: { id: next.id } });
      return;
    }
    if (next.kind === "need") {
      navigate({ to: "/mon-besoin" });
      return;
    }
    navigate({ to: "/demandes" });
  };

  const rememberRole = () => {
    try {
      localStorage.setItem(PENDING_ROLE_KEY, role);
    } catch {
      /* stockage indisponible */
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup") {
      if (!accepted) {
        toast.error("Vous devez accepter les conditions d'utilisation.");
        return;
      }
      if (password !== confirm) {
        toast.error("Les deux mots de passe ne correspondent pas.");
        return;
      }
      if (isPro && (!firstName.trim() || !lastName.trim() || !phone.trim())) {
        toast.error("Prénom, nom et téléphone sont obligatoires.");
        return;
      }
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const fullName = `${firstName} ${lastName}`.trim();
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/verify-email?role=${role}`,
            data: {
              full_name: fullName,
              first_name: firstName,
              last_name: lastName,
              phone,
              role,
            },
          },
        });
        if (error) throw error;
        rememberRole();
        if (data.session) {
          if (isPro) navigate({ to: "/pro/inscription" });
          else await goClientHome(data.session.user.id);
          return;
        }
        navigate({ to: "/verifier-email", search: { email } });
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (isPro) navigate({ to: "/pro" });
        else if (data.user) await goClientHome(data.user.id);
        else navigate({ to: "/demandes" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    rememberRole();
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Connexion Google impossible");
      return;
    }
    if (result.redirected) return;
    if (isPro) {
      navigate({ to: "/pro/inscription" });
      return;
    }
    const { data } = await supabase.auth.getUser();
    if (data.user) await goClientHome(data.user.id);
    else navigate({ to: "/demandes" });
  };

  const field =
    "w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20";
  const labelCls =
    "text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-md px-4 py-12">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight">
          {mode === "signin"
            ? "Connexion"
            : isPro
              ? "Créer mon compte professeur"
              : "Créer un compte"}
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Connectez-vous pour accéder à votre espace."
            : isPro
              ? "Étape 1 sur 5 — votre compte. Vous compléterez ensuite votre profil professionnel."
              : "Compte élève / parent : publiez vos demandes et recevez des propositions."}
        </p>

        <form
          onSubmit={submit}
          className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-panel"
        >
          {mode === "signup" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className={labelCls} htmlFor="firstName">
                    Prénom
                  </label>
                  <input
                    id="firstName"
                    className={field}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    maxLength={80}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelCls} htmlFor="lastName">
                    Nom
                  </label>
                  <input
                    id="lastName"
                    className={field}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    maxLength={80}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className={labelCls} htmlFor="phone">
                  Numéro de téléphone
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={field}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={30}
                  placeholder="06 12 34 56 78"
                  required={isPro}
                />
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className={labelCls} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={field}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              required
            />
          </div>
          <div className="space-y-1">
            <label className={labelCls} htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className={field}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          {mode === "signup" && (
            <>
              <div className="space-y-1">
                <label className={labelCls} htmlFor="confirm">
                  Confirmation du mot de passe
                </label>
                <input
                  id="confirm"
                  type="password"
                  className={field}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  minLength={8}
                  required
                />
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
            </>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-primary py-3 font-bold text-primary-foreground disabled:opacity-60"
          >
            {mode === "signin" ? "Se connecter" : "Créer mon compte"}
          </button>
          <button
            type="button"
            onClick={google}
            className="w-full rounded-xl border border-border py-3 text-sm font-semibold hover:bg-muted"
          >
            Continuer avec Google
          </button>
          <button
            type="button"
            className="w-full text-sm text-muted-foreground hover:text-primary"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin"
              ? "Pas encore de compte ? Inscrivez-vous"
              : "Déjà inscrit ? Connectez-vous"}
          </button>
        </form>

        {mode === "signup" && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link to="/inscription" className="font-semibold text-primary">
              Changer de type de compte
            </Link>
          </p>
        )}
      </main>
    </div>
  );
}
