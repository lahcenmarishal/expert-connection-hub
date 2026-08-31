/**
 * Organisation des matières du cycle « Supérieur » en 9 grandes branches.
 * Les clés sont les noms de spécialités présents dans le catalogue.
 */
export const SUPERIOR_BRANCHES: Array<{ name: string; specialties: string[] }> = [
  {
    name: "Informatique & Technologie",
    specialties: [
      "Informatique générale",
      "Développement logiciel",
      "Génie logiciel",
      "Réseaux",
      "Réseaux & Cloud",
      "Réseaux & Systèmes",
      "Cybersécurité",
      "Intelligence artificielle",
      "Data",
      "Data Science",
    ],
  },
  {
    name: "Mathématiques & Statistiques",
    specialties: ["Mathématiques", "Mathématiques appliquées", "Mathématiques fondamentales"],
  },
  {
    name: "Sciences & Ingénierie",
    specialties: [
      "Physique",
      "Physique fondamentale",
      "Chimie",
      "Chimie analytique",
      "Chimie générale",
    ],
  },
  {
    name: "Biologie & Biotechnologies",
    specialties: [
      "Biologie",
      "Biologie générale",
      "Biochimie",
      "Microbiologie",
      "Biotechnologie",
      "Sciences de la vie",
    ],
  },
  {
    name: "Économie, Gestion & Finance",
    specialties: [
      "Économie",
      "Économie appliquée",
      "Économie internationale",
      "Gestion",
      "Management",
      "Finance",
      "Comptabilité",
      "Comptabilité & Audit",
      "Audit & Comptabilité",
    ],
  },
  { name: "Marketing, Commerce & Communication", specialties: ["Marketing"] },
  { name: "Droit", specialties: ["Droit privé", "Droit public", "Droit des affaires"] },
  { name: "Langues & Linguistique", specialties: ["Français", "Anglais", "Arabe"] },
  { name: "Sciences humaines & Sociales", specialties: [] },
];

const INDEX: Record<string, string> = {};
for (const branch of SUPERIOR_BRANCHES) {
  for (const specialty of branch.specialties) INDEX[specialty] = branch.name;
}

/** Branche d'une spécialité du supérieur (par défaut : Sciences humaines & Sociales). */
export function branchOfSpecialty(specialtyName?: string | null): string {
  if (!specialtyName) return "Sciences humaines & Sociales";
  return INDEX[specialtyName] ?? "Sciences humaines & Sociales";
}
