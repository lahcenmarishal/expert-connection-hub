import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MailCheck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/site";
import { OnboardingProgress } from "@/components/onboarding-progress";
import { tryPublishPendingDraft } from "@/lib/request-draft";
import { resumeClientFlow } from "@/lib/student-need";
import { resolveAccountRole } from "@/lib/pending-role";

const RESEND_KEY = "profinder.last_verification_send";
const PENDING_ROLE_KEY = "profinder.pending_role";
const COOLDOWN_S = 60;

type PendingRole = "client" | "pro";

function pendingRole(): PendingRole {
  try {
    return localStorage.getItem(PENDING_ROLE_KEY) === "pro" ? "pro" : "client";
  } catch {
    return "client";
  }
}

export const Route = createFileRoute("/verifier-email")({
  validateSearch: (search: Record<string, unknown>) => ({
    email: typeof search['email'] === "string" ? search['email'] : "",
  }),
  head: () => ({
    meta: [
      { title: "Vérifiez votre adresse email — ProFinder" },
      {
        name: "description",
        content:
          "Confirmez votre adresse email pour poursuivre votre inscription professeur sur ProFinder.",
      },
      { property: "og:title", content: "Vérifiez votre adresse email — ProFinder" },
      {
        property: "og:description",
        content: "Une dernière étape avant de compléter votre profil ProFinder.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PendingEmailPage,
});

function PendingEmailPage() {
  const { email } = Route.useSearch();
  const navigate = useNavigate();
  const [cooldown, setCooldown] = useState(0);
  const [newEmail, setNewEmail] = useState(email);
  const [editing, setEditing] = useState(false);

  const continueAfterVerification = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      toast.message("Ouvrez le lien reçu par email pour activer votre session automatiquement.");
      return;
    }
    if ((await resolveAccountRole(pendingRole())) === "pro") {
      navigate({ to: "/pro/inscription" });
      return;
    }
    const requestId = await tryPublishPendingDraft(data.session.user.id);
    if (requestId) {
      toast.success("🎉 Votre demande a été publiée !");
      navigate({ to: "/demandes/$id", params: { id: requestId } });
      return;
    }
    const next = await resumeClientFlow(data.session.user.id);
    if (next.kind === "request") {
      toast.success("🎉 Votre demande a été envoyée au professeur.");
      navigate({ to: "/demandes/$id", params: { id: next.id } });
      return;
    }
    navigate({ to: next.kind === "need" ? "/mon-besoin" : "/demandes" });
  };

  const checkVerification = async (showMessage = false) => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      if (showMessage) {
        toast.message("Ouvrez le lien reçu par email : il vous connectera directement à votre compte.");
      }
      return false;
    }

    const { data, error } = await supabase.auth.getUser();
    if (data.user?.email_confirmed_at) {
      await continueAfterVerification();
      return true;
    }
    if (showMessage) {
      toast.error(error?.message ?? "Email pas encore confirmé. Ouvrez le lien reçu par email, puis réessayez.");
    }
    return false;
  };

  useEffect(() => {
    const tick = () => {
      const last = Number(localStorage.getItem(RESEND_KEY) ?? 0);
      const left = Math.max(0, COOLDOWN_S - Math.floor((Date.now() - last) / 1000));
      setCooldown(left);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      if (cancelled) return;
      await checkVerification(false);
    };

    void check();
    const interval = window.setInterval(check, 3000);
    window.addEventListener("focus", check);
    document.addEventListener("visibilitychange", check);
    const onExternalSession = () => void checkVerification(false);
    window.addEventListener("storage", onExternalSession);

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED" || event === "INITIAL_SESSION") {
        if (session?.user.email_confirmed_at) void continueAfterVerification();
      }
    });

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("focus", check);
      window.removeEventListener("storage", onExternalSession);
      document.removeEventListener("visibilitychange", check);
      data.subscription.unsubscribe();
    };
  }, []);

  const resend = async () => {
    if (cooldown > 0 || !newEmail) return;
    localStorage.setItem(RESEND_KEY, String(Date.now()));
    setCooldown(COOLDOWN_S);
    const role = await resolveAccountRole(pendingRole());
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: newEmail,
      options: { emailRedirectTo: `${window.location.origin}/verify-email?role=${role}` },
    });
    if (error) {
      const isRate =
        (error as { status?: number }).status === 429 ||
        /rate|seconds/i.test(error.message);
      toast.error(
        isRate
          ? "Trop de demandes d'envoi. Patientez une minute avant de réessayer."
          : error.message,
      );
      return;
    }
    toast.success("Email de vérification renvoyé.");
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-lg px-4 py-14">
        {pendingRole() === "pro" && <OnboardingProgress current={1} />}
        <div className="mt-8 rounded-3xl border border-border bg-card p-8 text-center shadow-panel">
          <MailCheck className="mx-auto h-10 w-10 text-primary" aria-hidden />
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight">
            Vérifiez votre adresse email
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Nous avons envoyé un email de vérification à :
          </p>
          <p className="mt-1 font-semibold">{newEmail || "votre adresse email"}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Veuillez cliquer sur le lien présent dans cet email pour confirmer votre adresse et
            continuer votre inscription.
          </p>

          {editing && (
            <div className="mt-6 space-y-2 text-left">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Nouvelle adresse email
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Si l'adresse saisie lors de l'inscription est incorrecte, recréez votre compte avec
                la bonne adresse.
              </p>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <button
              onClick={() => void checkVerification(true)}
              className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground"
            >
              J’ai vérifié mon email
            </button>
            <button
              onClick={resend}
              disabled={cooldown > 0}
              className="w-full rounded-xl border border-border py-3 text-sm font-semibold hover:bg-muted disabled:opacity-50"
            >
              {cooldown > 0 ? `Renvoyer l'email (${cooldown}s)` : "Renvoyer l'email"}
            </button>
            <button
              onClick={() => (editing ? navigate({ to: "/inscription" }) : setEditing(true))}
              className="w-full rounded-xl border border-border py-3 text-sm font-semibold hover:bg-muted"
            >
              {editing ? "Recréer mon compte" : "Modifier mon email"}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Email déjà confirmé ?{" "}
          <Link to="/auth" search={{ mode: "signin", role: pendingRole() }} className="font-semibold text-primary">
            Se connecter
          </Link>
        </p>
      </main>
    </div>
  );
}
