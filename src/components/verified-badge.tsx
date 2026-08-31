import { BadgeCheck } from "lucide-react";

type Props = {
  verified: boolean | null | undefined;
  className?: string;
  compact?: boolean;
};

/**
 * Badge « Professeur vérifié ».
 * Il reflète uniquement `professionals.is_verified`, contrôlé côté base de données
 * par l'administration — un professeur ne peut pas l'activer lui-même.
 */
export function VerifiedBadge({ verified, className = "", compact = false }: Props) {
  if (!verified) return null;
  return (
    <span
      title="Profil et documents vérifiés par ProFinder"
      className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-bold shadow-sm ${
        compact
          ? "bg-card text-primary ring-1 ring-primary/20"
          : "bg-primary text-primary-foreground"
      } ${className}`}
    >
      <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
      {compact ? "Vérifié" : "Professeur vérifié"}
    </span>
  );
}
