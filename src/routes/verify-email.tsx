import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BadgeCheck, CircleAlert, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/site";
import { publishPendingDraft } from "@/lib/request-draft";
import { resumeClientFlow } from "@/lib/student-need";
import { resolveAccountRole } from "@/lib/pending-role";


type State = "checking" | "verified" | "already" | "expired" | "invalid";

export const Route = createFileRoute("/verify-email")({
  validateSearch: (search: Record<string, unknown>) => ({
    role: search['role'] === "pro" ? ("pro" as const) : ("client" as const),
  }),
  head: () => ({
    meta: [
      { title: "Confirmation de l'adresse email — ProFinder" },
      {
        name: "description",
        content:
          "Validation du lien de confirmation d'adresse email pour votre compte ProFinder.",
      },
      { property: "og:title", content: "Confirmation de l'adresse email — ProFinder" },
      {
        property: "og:description",
        content: "Votre adresse email ProFinder est en cours de confirmation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [state, setState] = useState<State>("checking");
  const [email, setEmail] = useState("");

  const continueAfterVerification = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      toast.message("Session en cours d'activation. Réouvrez le lien de vérification si nécessaire.");
      return;
    }
    if ((await resolveAccountRole(search.role)) === "pro") {
      navigate({ to: "/pro/inscription" });
      return;
    }
    try {
      const requestId = await publishPendingDraft(data.session.user.id);
      if (requestId) {
        toast.success("🎉 Votre demande a été publiée !");
        navigate({ to: "/demandes/$id", params: { id: requestId } });
        return;
      }
    } catch {
      /* la demande pourra être republiée depuis /publier */
    }
    const next = await resumeClientFlow(data.session.user.id);
    if (next.kind === "request") {
      toast.success("🎉 Votre demande a été envoyée au professeur.");
      navigate({ to: "/demandes/$id", params: { id: next.id } });
      return;
    }
    navigate({ to: next.kind === "need" ? "/mon-besoin" : "/demandes" });
  };


  const scheduleContinue = () => {
    window.setTimeout(() => void continueAfterVerification(), 900);
  };

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const url = new URL(window.location.href);
      const hash = new URLSearchParams(url.hash.replace(/^#/, ""));
      const errorCode = url.searchParams.get("error_code") ?? hash.get("error_code") ?? "";
      const errorDesc =
        url.searchParams.get("error_description") ?? hash.get("error_description") ?? "";
      const tokenHash = url.searchParams.get("token_hash") ?? url.searchParams.get("token");
      const code = url.searchParams.get("code");
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");
      const typeParam = url.searchParams.get("type") ?? hash.get("type");
      const otpType =
        typeParam === "signup" ||
        typeParam === "invite" ||
        typeParam === "magiclink" ||
        typeParam === "recovery" ||
        typeParam === "email_change" ||
        typeParam === "email"
          ? typeParam
          : "signup";

      // La validité du lien est toujours contrôlée côté serveur d'authentification.
      if (errorCode || errorDesc) {
        const expired = /expired/i.test(`${errorCode} ${errorDesc}`);
        if (!cancelled) setState(expired ? "expired" : "invalid");
        return;
      }

      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (cancelled) return;
        if (error) {
          setState(/expired/i.test(error.message) ? "expired" : "invalid");
          return;
        }
        setEmail(data.user?.email ?? "");
        setState(data.user?.email_confirmed_at ? "verified" : "already");
        scheduleContinue();
        return;
      }

      if (accessToken && refreshToken) {
        const { data: sessionData, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (cancelled) return;
        if (error) {
          setState(/expired/i.test(error.message) ? "expired" : "invalid");
          return;
        }
        const { data } = await supabase.auth.getUser();
        if (cancelled) return;
        const verifiedUser = data.user ?? sessionData.user;
        if (verifiedUser?.email_confirmed_at) {
          setEmail(verifiedUser.email ?? "");
          setState("verified");
          window.history.replaceState(null, document.title, `${url.pathname}${url.search}`);
          scheduleContinue();
          return;
        }
      }

      if (tokenHash) {
        const { data, error } = await supabase.auth.verifyOtp({
          type: otpType,
          token_hash: tokenHash,
        });
        if (cancelled) return;
        if (error) {
          setState(/expired/i.test(error.message) ? "expired" : "invalid");
          return;
        }
        setEmail(data.user?.email ?? "");
        setState("verified");
        scheduleContinue();
        return;
      }

      // Lien déjà consommé par le client Supabase : on lit la session validée.
      const { data } = await supabase.auth.getUser();
      if (cancelled) return;
      if (data.user?.email_confirmed_at) {
        setEmail(data.user.email ?? "");
        setState("already");
        scheduleContinue();
        return;
      }
      setState("invalid");
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  const resend = async () => {
    const target = email || window.prompt("Votre adresse email") || "";
    if (!target) return;
    const role = await resolveAccountRole(search.role);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: target,
      options: { emailRedirectTo: `${window.location.origin}/verify-email?role=${role}` },
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Un nouveau lien vous a été envoyé.");
    navigate({ to: "/verifier-email", search: { email: target } });
  };

  const card = "rounded-3xl border border-border bg-card p-8 text-center shadow-panel";
  const primary =
    "mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground";

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-lg px-4 py-16">
        {state === "checking" && (
          <div className={card}>
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" aria-hidden />
            <p className="mt-4 text-sm text-muted-foreground">Vérification du lien…</p>
          </div>
        )}

        {(state === "verified" || state === "already") && (
          <div className={card}>
            <BadgeCheck className="mx-auto h-10 w-10 text-primary" aria-hidden />
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight">
              {state === "verified" ? "Email vérifié" : "Adresse déjà vérifiée"}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {state === "verified"
                ? "Votre adresse email a été confirmée avec succès."
                : "Votre adresse email est déjà vérifiée."}
            </p>
            <button onClick={continueAfterVerification} className={primary}>
              {state === "verified" ? "Continuer mon inscription" : "Continuer"}
            </button>
          </div>
        )}

        {(state === "expired" || state === "invalid") && (
          <div className={card}>
            <CircleAlert className="mx-auto h-10 w-10 text-destructive" aria-hidden />
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight">
              {state === "expired" ? "Lien expiré" : "Lien invalide"}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {state === "expired"
                ? "Ce lien de vérification a expiré."
                : "Ce lien de vérification est invalide."}
            </p>
            <button onClick={resend} className={primary}>
              {state === "expired" ? "Envoyer un nouveau lien" : "Demander un nouveau lien"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
