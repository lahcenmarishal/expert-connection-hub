import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Search } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site";

export const Route = createFileRoute("/inscription")({
  head: () => ({
    meta: [
      { title: "Inscription — élève, parent ou professeur | ProFinder" },
      {
        name: "description",
        content:
          "Choisissez votre type de compte ProFinder : élève ou parent à la recherche d'un professeur, ou professeur particulier souhaitant recevoir des demandes de cours.",
      },
      { property: "og:title", content: "Inscription — ProFinder" },
      {
        property: "og:description",
        content: "Créez votre compte élève, parent ou professeur sur ProFinder.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InscriptionPage,
});

function InscriptionPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="text-3xl font-extrabold tracking-tight">Créer mon compte</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Comment souhaitez-vous utiliser ProFinder ?
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            to="/auth"
            search={{ mode: "signup", role: "client" }}
            className="group rounded-3xl border border-border bg-card p-6 text-left shadow-panel transition hover:border-primary"
          >
            <Search className="h-8 w-8 text-primary" aria-hidden />
            <h2 className="mt-4 text-lg font-bold">Élève / Parent</h2>
            <p className="mt-1 text-sm text-muted-foreground">Je cherche un professeur</p>
            <span className="mt-4 inline-block text-sm font-bold text-primary">Continuer →</span>
          </Link>

          <Link
            to="/auth"
            search={{ mode: "signup", role: "pro" }}
            className="group rounded-3xl border border-border bg-card p-6 text-left shadow-panel transition hover:border-primary"
          >
            <GraduationCap className="h-8 w-8 text-primary" aria-hidden />
            <h2 className="mt-4 text-lg font-bold">Professeur</h2>
            <p className="mt-1 text-sm text-muted-foreground">Je suis professeur</p>
            <span className="mt-4 inline-block text-sm font-bold text-primary">
              Démarrer mon inscription →
            </span>
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Vous avez déjà un compte ?{" "}
          <Link to="/auth" search={{ mode: "signin", role: "client" }} className="font-semibold text-primary">
            Se connecter
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
