import { ONBOARDING_STEPS } from "@/lib/teacher-onboarding";

type Props = {
  /** Étape courante, 1-indexée. */
  current: number;
  className?: string;
};

/** Barre de progression du parcours d'inscription professeur (10 étapes). */
export function OnboardingProgress({ current, className = "" }: Props) {
  const total = ONBOARDING_STEPS.length;
  const clamped = Math.min(Math.max(current, 1), total);
  const percent = Math.round((clamped / total) * 100);
  const label = ONBOARDING_STEPS[clamped - 1]?.label ?? "";

  return (
    <div className={className}>
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span>
          Étape {clamped} sur {total} — {label}
        </span>
        <span>{percent} %</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
