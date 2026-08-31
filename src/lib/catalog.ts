// Catalogue statique (frontend). Les identifiants correspondent aux données existantes.
// Modifier ce fichier pour faire évoluer niveaux, spécialités et matières.
import type { Database } from "@/integrations/supabase/types";

export type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
export type LevelRow = Database["public"]["Tables"]["levels"]["Row"];
export type SpecialtyRow = Database["public"]["Tables"]["specialties"]["Row"];
export type ServiceRow = Database["public"]["Tables"]["services"]["Row"];

export const CATEGORIES: CategoryRow[] = [
  {
    "id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "soutien-scolaire",
    "name": "Soutien scolaire",
    "icon": "graduation-cap",
    "is_active": true,
    "sort": 1
  }
];

export const LEVELS: LevelRow[] = [
  {
    "id": "2c5810e9-696e-4ff9-8cde-921dc9172a1a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "primaire-1ere-annee-primaire",
    "name": "1ère année primaire",
    "is_active": true,
    "sort": 10,
    "cycle": "Primaire"
  },
  {
    "id": "454308b9-b360-4362-bf1f-1df7e5cf5f00",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "primaire-2eme-annee-primaire",
    "name": "2ème année primaire",
    "is_active": true,
    "sort": 20,
    "cycle": "Primaire"
  },
  {
    "id": "253dae1f-7e1e-4f42-88b2-125b70769761",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "primaire-3eme-annee-primaire",
    "name": "3ème année primaire",
    "is_active": true,
    "sort": 30,
    "cycle": "Primaire"
  },
  {
    "id": "fba10050-7af3-4cc9-925d-2edf6a08aa02",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "primaire-4eme-annee-primaire",
    "name": "4ème année primaire",
    "is_active": true,
    "sort": 40,
    "cycle": "Primaire"
  },
  {
    "id": "e48c535d-c2fd-4e94-9a59-76f14dd3ff83",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "primaire-5eme-annee-primaire",
    "name": "5ème année primaire",
    "is_active": true,
    "sort": 50,
    "cycle": "Primaire"
  },
  {
    "id": "1fe871aa-9e91-4ac5-90b5-1d2e521fe0cb",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "primaire-6eme-annee-primaire",
    "name": "6ème année primaire",
    "is_active": true,
    "sort": 60,
    "cycle": "Primaire"
  },
  {
    "id": "e08768b7-4732-4d57-94f8-023357895cd3",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "college-1ere-annee-college",
    "name": "1ère année collège",
    "is_active": true,
    "sort": 70,
    "cycle": "Collège"
  },
  {
    "id": "5287862d-26a3-49cf-9508-d9c7a64d958e",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "college-2eme-annee-college",
    "name": "2ème année collège",
    "is_active": true,
    "sort": 80,
    "cycle": "Collège"
  },
  {
    "id": "36f28f73-936f-48e2-850e-9775d430ff3a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "college-3eme-annee-college",
    "name": "3ème année collège",
    "is_active": true,
    "sort": 90,
    "cycle": "Collège"
  },
  {
    "id": "5b675056-2eff-4be6-b7f1-0bef5357e8d4",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "lycee-tronc-commun",
    "name": "Tronc commun",
    "is_active": true,
    "sort": 100,
    "cycle": "Lycée"
  },
  {
    "id": "8841f69f-e4a3-4e90-8e8d-f29604acf596",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "lycee-1ere-annee-bac-sciences-physiques-svt",
    "name": "1ère année Bac — Sciences physiques / SVT",
    "is_active": true,
    "sort": 110,
    "cycle": "Lycée"
  },
  {
    "id": "fd50ce22-478a-4ab1-b6e9-e9ce84bf881d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "lycee-1ere-annee-bac-sciences-mathematiques",
    "name": "1ère année Bac — Sciences mathématiques",
    "is_active": true,
    "sort": 120,
    "cycle": "Lycée"
  },
  {
    "id": "9f8c8ca2-f771-4766-85af-f8d2ebd00741",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "lycee-1ere-annee-bac-economie-gestion",
    "name": "1ère année Bac — Économie / Gestion",
    "is_active": true,
    "sort": 130,
    "cycle": "Lycée"
  },
  {
    "id": "ee70538d-95e1-4528-8ac2-693cdfe46db2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "lycee-1ere-annee-bac-lettres-sciences-humaines",
    "name": "1ère année Bac — Lettres / Sciences humaines",
    "is_active": true,
    "sort": 140,
    "cycle": "Lycée"
  },
  {
    "id": "2c43a0f8-814e-4e8b-a1aa-a37c6c6ad6b3",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "lycee-2eme-annee-bac-sciences-physiques-svt",
    "name": "2ème année Bac — Sciences physiques / SVT",
    "is_active": true,
    "sort": 150,
    "cycle": "Lycée"
  },
  {
    "id": "bc5b88ae-e2f4-4cfc-b98a-16c861ea20f4",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "lycee-2eme-annee-bac-sciences-mathematiques",
    "name": "2ème année Bac — Sciences mathématiques",
    "is_active": true,
    "sort": 160,
    "cycle": "Lycée"
  },
  {
    "id": "b1944375-57d2-4718-bff8-50a7557c1c75",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "lycee-2eme-annee-bac-economie-gestion",
    "name": "2ème année Bac — Économie / Gestion",
    "is_active": true,
    "sort": 170,
    "cycle": "Lycée"
  },
  {
    "id": "812980eb-7c5f-4bbd-8970-2dfa31a8b37f",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "lycee-2eme-annee-bac-lettres-sciences-humaines",
    "name": "2ème année Bac — Lettres / Sciences humaines",
    "is_active": true,
    "sort": 180,
    "cycle": "Lycée"
  },
  {
    "id": "f19031d6-d628-4dad-a281-27b45d044844",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "superieur-licence-1ere-annee",
    "name": "Licence – 1ère année",
    "is_active": true,
    "sort": 190,
    "cycle": "Supérieur"
  },
  {
    "id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "superieur-licence-2eme-annee",
    "name": "Licence – 2ème année",
    "is_active": true,
    "sort": 200,
    "cycle": "Supérieur"
  },
  {
    "id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "superieur-licence-3eme-annee",
    "name": "Licence – 3ème année",
    "is_active": true,
    "sort": 210,
    "cycle": "Supérieur"
  },
  {
    "id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "superieur-master-1ere-annee",
    "name": "Master – 1ère année",
    "is_active": true,
    "sort": 220,
    "cycle": "Supérieur"
  },
  {
    "id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "superieur-master-2eme-annee",
    "name": "Master – 2ème année",
    "is_active": true,
    "sort": 230,
    "cycle": "Supérieur"
  }
];

export const SPECIALTIES: SpecialtyRow[] = [
  {
    "id": "20fc8dc7-b23b-4859-8a06-9327ee519d10",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "informatique-generale",
    "name": "Informatique générale",
    "is_active": true,
    "sort": 10
  },
  {
    "id": "829c3e80-3579-4c74-83ed-d0fdaf94e763",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "slug": "developpement-logiciel",
    "name": "Développement logiciel",
    "is_active": true,
    "sort": 10
  },
  {
    "id": "46e7d71b-b610-4c1b-a85a-445c25056dc2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "genie-logiciel",
    "name": "Génie logiciel",
    "is_active": true,
    "sort": 10
  },
  {
    "id": "dd4a1b07-e6bc-4923-93dc-28e181116a52",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "genie-logiciel",
    "name": "Génie logiciel",
    "is_active": true,
    "sort": 10
  },
  {
    "id": "1645fe7b-5e8b-4d62-bce6-6e21d315c30c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "genie-logiciel",
    "name": "Génie logiciel",
    "is_active": true,
    "sort": 10
  },
  {
    "id": "f90c8462-6a13-4948-91a4-a67aa33876bd",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "intelligence-artificielle",
    "name": "Intelligence artificielle",
    "is_active": true,
    "sort": 20
  },
  {
    "id": "a3f412c3-5ec1-40ca-b5ab-d63164018485",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "developpement-logiciel",
    "name": "Développement logiciel",
    "is_active": true,
    "sort": 20
  },
  {
    "id": "f6f1655a-e9a0-47c8-ac97-77d1012b16d7",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "intelligence-artificielle",
    "name": "Intelligence artificielle",
    "is_active": true,
    "sort": 20
  },
  {
    "id": "87b0e936-4b84-47fb-a742-32e2f28202fd",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "slug": "reseaux",
    "name": "Réseaux",
    "is_active": true,
    "sort": 20
  },
  {
    "id": "2c715011-48c5-4b61-a386-25ab8129f995",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "intelligence-artificielle",
    "name": "Intelligence artificielle",
    "is_active": true,
    "sort": 20
  },
  {
    "id": "dae38c72-733e-4a14-95da-85157d11fa33",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "slug": "data",
    "name": "Data",
    "is_active": true,
    "sort": 30
  },
  {
    "id": "8734ac36-5893-44de-be42-e0158d9572cc",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "data-science",
    "name": "Data Science",
    "is_active": true,
    "sort": 30
  },
  {
    "id": "aa1fe99b-5e60-443a-bbdc-0ad0146bd60c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "data-science",
    "name": "Data Science",
    "is_active": true,
    "sort": 30
  },
  {
    "id": "7b48362e-2312-4263-84a3-cb165251fb11",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "reseaux",
    "name": "Réseaux",
    "is_active": true,
    "sort": 30
  },
  {
    "id": "1a3cb4c6-0d24-4571-a93f-44cce70922dc",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "data-science",
    "name": "Data Science",
    "is_active": true,
    "sort": 30
  },
  {
    "id": "cea788cf-d790-4d42-a2db-9be6ac4fc7d6",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "cybersecurite",
    "name": "Cybersécurité",
    "is_active": true,
    "sort": 40
  },
  {
    "id": "a311491f-8ae6-4d4a-a67d-d183e2fe8846",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 40
  },
  {
    "id": "d5ce8ed3-a2e4-4313-b544-ea2dde8b8112",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "cybersecurite",
    "name": "Cybersécurité",
    "is_active": true,
    "sort": 40
  },
  {
    "id": "d9620cb5-c4c2-4270-916d-03191f8d583c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "cybersecurite",
    "name": "Cybersécurité",
    "is_active": true,
    "sort": 40
  },
  {
    "id": "ee9a5e1f-d868-4b1a-a635-3996d44c2937",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "mathematiques-fondamentales",
    "name": "Mathématiques fondamentales",
    "is_active": true,
    "sort": 40
  },
  {
    "id": "c5e5fc20-50df-4fb4-97d7-abbdf602fbde",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "mathematiques-appliquees",
    "name": "Mathématiques appliquées",
    "is_active": true,
    "sort": 50
  },
  {
    "id": "c24ca943-6f67-40e0-a936-79510337420e",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "slug": "mathematiques-appliquees",
    "name": "Mathématiques appliquées",
    "is_active": true,
    "sort": 50
  },
  {
    "id": "53ae629d-79fd-44c3-913b-16af91bceaf2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "reseaux-cloud",
    "name": "Réseaux & Cloud",
    "is_active": true,
    "sort": 50
  },
  {
    "id": "55557813-86d8-4230-94bb-a372e4e3f889",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "reseaux-systemes",
    "name": "Réseaux & Systèmes",
    "is_active": true,
    "sort": 50
  },
  {
    "id": "26142401-70f8-47d0-a7c2-f30c08987287",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "reseaux-cloud",
    "name": "Réseaux & Cloud",
    "is_active": true,
    "sort": 50
  },
  {
    "id": "2fac41bf-72ed-4219-9c93-0637d68ac67e",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 60
  },
  {
    "id": "d323a91e-517a-4f50-a759-80cc7cc17790",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "biotechnologie",
    "name": "Biotechnologie",
    "is_active": true,
    "sort": 60
  },
  {
    "id": "d33c0846-10c1-4767-a35e-0efc1a7ae525",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "physique-fondamentale",
    "name": "Physique fondamentale",
    "is_active": true,
    "sort": 60
  },
  {
    "id": "224ac14a-3c61-46db-9e7d-cfdd4a804ebe",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "slug": "physique",
    "name": "Physique",
    "is_active": true,
    "sort": 60
  },
  {
    "id": "44e2e97a-ecf0-44a5-9fa0-807fc4aab5bf",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "mathematiques-appliquees",
    "name": "Mathématiques appliquées",
    "is_active": true,
    "sort": 60
  },
  {
    "id": "08de8ca4-a3a3-467d-8183-b37114e35d78",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "slug": "chimie",
    "name": "Chimie",
    "is_active": true,
    "sort": 70
  },
  {
    "id": "da26ab65-bc81-416b-9cf3-7b7847e9e7b5",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "chimie-generale",
    "name": "Chimie générale",
    "is_active": true,
    "sort": 70
  },
  {
    "id": "636b768e-e604-4de5-bb1c-504a5b5f95df",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "microbiologie",
    "name": "Microbiologie",
    "is_active": true,
    "sort": 70
  },
  {
    "id": "b165ccd6-c3bb-43a5-ad8a-689992a3f42b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "physique",
    "name": "Physique",
    "is_active": true,
    "sort": 70
  },
  {
    "id": "6a2ab8e5-c4ba-4a75-9044-e2fb20de84f6",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "mathematiques-appliquees",
    "name": "Mathématiques appliquées",
    "is_active": true,
    "sort": 70
  },
  {
    "id": "6038160b-38a5-47a4-b759-076e2839ee48",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "physique",
    "name": "Physique",
    "is_active": true,
    "sort": 80
  },
  {
    "id": "1b94321e-7385-4251-8dfc-5b572238e1af",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "chimie",
    "name": "Chimie",
    "is_active": true,
    "sort": 80
  },
  {
    "id": "4732a116-95ee-4d59-9fea-6311d60a2ec5",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "chimie-analytique",
    "name": "Chimie analytique",
    "is_active": true,
    "sort": 80
  },
  {
    "id": "ee9129c5-90a7-443c-a9b9-10d0ac8a0b1d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "chimie",
    "name": "Chimie",
    "is_active": true,
    "sort": 80
  },
  {
    "id": "c0c74e06-6661-421e-a05c-798d2ac5608e",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "slug": "biochimie",
    "name": "Biochimie",
    "is_active": true,
    "sort": 80
  },
  {
    "id": "a39025b4-8104-48ea-af0e-642142095186",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "biologie-generale",
    "name": "Biologie générale",
    "is_active": true,
    "sort": 90
  },
  {
    "id": "8a14600b-0ce9-4078-a127-d32c1507abc2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "biotechnologie",
    "name": "Biotechnologie",
    "is_active": true,
    "sort": 90
  },
  {
    "id": "17043690-8a7e-4fe3-990f-3a44e5ffad53",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "chimie",
    "name": "Chimie",
    "is_active": true,
    "sort": 90
  },
  {
    "id": "8bbc53a8-2fc7-4a18-8407-dffafd4c6158",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "mathematiques-appliquees",
    "name": "Mathématiques appliquées",
    "is_active": true,
    "sort": 90
  },
  {
    "id": "b30fec6d-5f94-4cfc-b268-6d82e4e0ff96",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "slug": "biologie",
    "name": "Biologie",
    "is_active": true,
    "sort": 90
  },
  {
    "id": "47bcf7c4-05cf-44ab-801c-0a4de152bf3a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "finance",
    "name": "Finance",
    "is_active": true,
    "sort": 100
  },
  {
    "id": "f6d0d724-2850-4909-b014-a673c8a38683",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "microbiologie",
    "name": "Microbiologie",
    "is_active": true,
    "sort": 100
  },
  {
    "id": "ab01c9ac-a5bc-484e-92c9-c4160ed1cf79",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "sciences-de-la-vie",
    "name": "Sciences de la vie",
    "is_active": true,
    "sort": 100
  },
  {
    "id": "5f2e9f9f-084e-4cf5-962e-34bca3516b33",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "slug": "biotechnologie",
    "name": "Biotechnologie",
    "is_active": true,
    "sort": 100
  },
  {
    "id": "1fe249da-62c8-4557-92ce-dccc704b25ab",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "microbiologie",
    "name": "Microbiologie",
    "is_active": true,
    "sort": 100
  },
  {
    "id": "df412bd1-29ea-4dc1-a612-d2e88cac34ee",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "biochimie",
    "name": "Biochimie",
    "is_active": true,
    "sort": 110
  },
  {
    "id": "9748eecb-5634-4ae2-b229-2e3cc46fbc51",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "economie",
    "name": "Économie",
    "is_active": true,
    "sort": 110
  },
  {
    "id": "1060214f-4c5c-449d-86fb-6c856ee16022",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "slug": "economie",
    "name": "Économie",
    "is_active": true,
    "sort": 110
  },
  {
    "id": "a0e23ece-cf3e-4921-ba19-35122152335a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "finance",
    "name": "Finance",
    "is_active": true,
    "sort": 110
  },
  {
    "id": "c301ea3d-40d2-4e57-a3f1-cedf8c58b9da",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "audit-comptabilite",
    "name": "Audit & Comptabilité",
    "is_active": true,
    "sort": 110
  },
  {
    "id": "f7e1c285-1762-4628-bbbd-c906920e92e9",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "comptabilite-audit",
    "name": "Comptabilité & Audit",
    "is_active": true,
    "sort": 120
  },
  {
    "id": "50dc845d-eff2-47c9-af9f-6d9dc3a73e8a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "biotechnologie",
    "name": "Biotechnologie",
    "is_active": true,
    "sort": 120
  },
  {
    "id": "f52a0ced-8727-4455-8e81-3f1e9e410d20",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "economie-appliquee",
    "name": "Économie appliquée",
    "is_active": true,
    "sort": 120
  },
  {
    "id": "9b28dfb3-a5ba-4e85-9ae1-b844c72ffeb2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "marketing",
    "name": "Marketing",
    "is_active": true,
    "sort": 120
  },
  {
    "id": "0311cf6a-1727-4379-b805-fe3b8289e60c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "slug": "economie-internationale",
    "name": "Économie internationale",
    "is_active": true,
    "sort": 120
  },
  {
    "id": "1549d6f2-7c66-499d-9050-2d374692b80f",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "slug": "gestion",
    "name": "Gestion",
    "is_active": true,
    "sort": 130
  },
  {
    "id": "496871af-d80d-4347-a7c2-69960056ab10",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "marketing",
    "name": "Marketing",
    "is_active": true,
    "sort": 130
  },
  {
    "id": "c7b72286-42a2-4f9d-b363-d347ffb14618",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "economie",
    "name": "Économie",
    "is_active": true,
    "sort": 130
  },
  {
    "id": "0a8fea88-f422-4c43-8b6a-ee6c8dffa304",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "management",
    "name": "Management",
    "is_active": true,
    "sort": 130
  },
  {
    "id": "a3d0aae0-1495-4296-8228-9fe487fe3b63",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "gestion",
    "name": "Gestion",
    "is_active": true,
    "sort": 130
  },
  {
    "id": "803fc738-c4da-4380-8274-3614344b8ca0",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "economie",
    "name": "Économie",
    "is_active": true,
    "sort": 140
  },
  {
    "id": "ec107bce-d97e-443e-9b79-f7b9dbbe78c9",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "economie-internationale",
    "name": "Économie internationale",
    "is_active": true,
    "sort": 140
  },
  {
    "id": "7ef49af6-73eb-4729-a3eb-82c52fed8676",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "management",
    "name": "Management",
    "is_active": true,
    "sort": 140
  },
  {
    "id": "9f01bed5-3e61-49f2-9771-cbb343901442",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "finance",
    "name": "Finance",
    "is_active": true,
    "sort": 140
  },
  {
    "id": "d3ff0e2a-c17f-43a0-ab7d-40fdc53f0436",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "slug": "marketing",
    "name": "Marketing",
    "is_active": true,
    "sort": 140
  },
  {
    "id": "6cf2350c-45c0-455e-9b9e-b9d17cae09cd",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "finance",
    "name": "Finance",
    "is_active": true,
    "sort": 150
  },
  {
    "id": "f613a3db-bb59-4fdc-b42b-55955ab16a6d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "economie",
    "name": "Économie",
    "is_active": true,
    "sort": 150
  },
  {
    "id": "f68169e4-f096-4ccc-918c-3167bec1af36",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "droit-des-affaires",
    "name": "Droit des affaires",
    "is_active": true,
    "sort": 150
  },
  {
    "id": "85195012-8914-4eef-bbde-817a04107bdb",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "slug": "droit-prive",
    "name": "Droit privé",
    "is_active": true,
    "sort": 150
  },
  {
    "id": "adf37a66-8521-47e7-bc70-df6f9d84c950",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "droit-prive",
    "name": "Droit privé",
    "is_active": true,
    "sort": 150
  },
  {
    "id": "56ce1a06-ffb5-4a94-9fdf-519457585840",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "droit-public",
    "name": "Droit public",
    "is_active": true,
    "sort": 160
  },
  {
    "id": "8e534b70-89af-4a58-917f-9430257e207f",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "droit-des-affaires",
    "name": "Droit des affaires",
    "is_active": true,
    "sort": 160
  },
  {
    "id": "4145e167-62f7-4ddc-8522-0fd13583de28",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "slug": "droit-public",
    "name": "Droit public",
    "is_active": true,
    "sort": 160
  },
  {
    "id": "07e15b66-31c1-4478-b8d3-a05440dacf55",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "comptabilite",
    "name": "Comptabilité",
    "is_active": true,
    "sort": 160
  },
  {
    "id": "79a69e7b-0d66-4e18-8352-1f0151a6f7e1",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "droit-public",
    "name": "Droit public",
    "is_active": true,
    "sort": 160
  },
  {
    "id": "985238c6-c078-49c6-ac81-9145a92ad5b3",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "droit-prive",
    "name": "Droit privé",
    "is_active": true,
    "sort": 170
  },
  {
    "id": "dfea8bf6-5686-491b-b03d-50c0f51bf140",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "marketing",
    "name": "Marketing",
    "is_active": true,
    "sort": 170
  },
  {
    "id": "d28fc039-5791-495a-a90d-8b70c7b12b4b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 170
  },
  {
    "id": "2132b782-b3c3-4d6d-88d1-057bbabeb952",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "slug": "droit-prive",
    "name": "Droit privé",
    "is_active": true,
    "sort": 170
  },
  {
    "id": "51ff52e2-6a6e-403b-9a37-9aeb5dfc3911",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "anglais",
    "name": "Anglais",
    "is_active": true,
    "sort": 180
  },
  {
    "id": "4fd5e24d-910f-4766-8ae6-e52ae9b6d4a2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "slug": "droit-public",
    "name": "Droit public",
    "is_active": true,
    "sort": 180
  },
  {
    "id": "2c2efbf8-f753-45de-973d-b259634363f2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "management",
    "name": "Management",
    "is_active": true,
    "sort": 180
  },
  {
    "id": "564f28ba-f43f-4bbc-9b18-1ed1bda15f80",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "droit-des-affaires",
    "name": "Droit des affaires",
    "is_active": true,
    "sort": 190
  },
  {
    "id": "ab266d15-77b4-4adb-a726-fdea85f1b08d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 190
  },
  {
    "id": "14c43248-9699-4ab8-9655-843af9729dbf",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "droit-prive",
    "name": "Droit privé",
    "is_active": true,
    "sort": 200
  },
  {
    "id": "af1b3246-d00b-461c-a2b1-4ea8dd2a1f4c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "slug": "droit-public",
    "name": "Droit public",
    "is_active": true,
    "sort": 210
  }
];

export const SERVICES: ServiceRow[] = [
  {
    "id": "b84314bc-f2e9-4e21-83ba-ab8e6f7b2c27",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "finance-finance",
    "name": "Finance",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "9f01bed5-3e61-49f2-9771-cbb343901442"
  },
  {
    "id": "7e82d7f1-2405-4cc9-b10d-4d24cd63c7b8",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 10,
    "level_id": "e08768b7-4732-4d57-94f8-023357895cd3",
    "specialty_id": null
  },
  {
    "id": "31076bdd-069d-4554-9113-9666a0250594",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "chimie-chimie-organique",
    "name": "Chimie organique",
    "is_active": true,
    "sort": 10,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "08de8ca4-a3a3-467d-8183-b37114e35d78"
  },
  {
    "id": "b68e5641-ec9b-4318-9dd0-c0fd1e809959",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "gestion-comptabilite",
    "name": "Comptabilité",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "a3d0aae0-1495-4296-8228-9fe487fe3b63"
  },
  {
    "id": "a8584fcf-806d-42f6-a139-df15724b4e0e",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "cybersecurite-securite-offensive-defensive",
    "name": "Sécurité offensive/défensive",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "d5ce8ed3-a2e4-4313-b544-ea2dde8b8112"
  },
  {
    "id": "9ec549eb-4db7-4a09-99d5-b46028fb6231",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biochimie-biochimie",
    "name": "Biochimie",
    "is_active": true,
    "sort": 10,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "c0c74e06-6661-421e-a05c-798d2ac5608e"
  },
  {
    "id": "c84c2491-eef0-468c-a728-a56bf8e1affb",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biologie-microbiologie",
    "name": "Microbiologie",
    "is_active": true,
    "sort": 10,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "b30fec6d-5f94-4cfc-b268-6d82e4e0ff96"
  },
  {
    "id": "ea307bb7-f92a-4e4e-9169-4954df220acb",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-appliquee-statistiques",
    "name": "Statistiques",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "f52a0ced-8727-4455-8e81-3f1e9e410d20"
  },
  {
    "id": "916a92f0-1fd8-4ce7-a6e3-368507d3d947",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "management-management-strategique",
    "name": "Management stratégique",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "0a8fea88-f422-4c43-8b6a-ee6c8dffa304"
  },
  {
    "id": "28b2bb48-e6b1-498a-a03c-9ef65da5f233",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-microeconomie",
    "name": "Microéconomie",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "9748eecb-5634-4ae2-b229-2e3cc46fbc51"
  },
  {
    "id": "5bdbcd40-0611-48d6-910f-32d42cb84c28",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-econometrie",
    "name": "Économétrie",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "803fc738-c4da-4380-8274-3614344b8ca0"
  },
  {
    "id": "7f513891-5285-4f7b-b574-a11ee240bacc",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biotechnologie-biologie-moleculaire",
    "name": "Biologie moléculaire",
    "is_active": true,
    "sort": 10,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "5f2e9f9f-084e-4cf5-962e-34bca3516b33"
  },
  {
    "id": "279ba6f4-097f-4478-8b0b-18fc796e7f43",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "sciences-de-la-vie-physiologie",
    "name": "Physiologie",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "ab01c9ac-a5bc-484e-92c9-c4160ed1cf79"
  },
  {
    "id": "30aaa3ef-d759-4ded-adbb-3c5e5e7553fe",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-des-affaires-fiscalite",
    "name": "Fiscalité",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "f68169e4-f096-4ccc-918c-3167bec1af36"
  },
  {
    "id": "2cd8b28f-5368-447e-8c5a-d05ea2c61941",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-microeconomie",
    "name": "Microéconomie",
    "is_active": true,
    "sort": 10,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "1060214f-4c5c-449d-86fb-6c856ee16022"
  },
  {
    "id": "421a182b-5b75-491c-aff0-7b9383f28255",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biologie-generale-biologie-cellulaire",
    "name": "Biologie cellulaire",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "a39025b4-8104-48ea-af0e-642142095186"
  },
  {
    "id": "eacebc8d-0deb-4e1d-8fa4-976b60671491",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-public-droit-administratif",
    "name": "Droit administratif",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "56ce1a06-ffb5-4a94-9fdf-519457585840"
  },
  {
    "id": "c30e339f-b398-4c9f-944a-1cd88506bf45",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-internationale-commerce-international",
    "name": "Commerce international",
    "is_active": true,
    "sort": 10,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "0311cf6a-1727-4379-b805-fe3b8289e60c"
  },
  {
    "id": "e5c81298-8a66-4df5-928c-645cf77bc756",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "chimie-analytique-chimie-analytique",
    "name": "Chimie analytique",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "4732a116-95ee-4d59-9fea-6311d60a2ec5"
  },
  {
    "id": "27810bc9-3007-4112-8c34-cb539543ce18",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 10,
    "level_id": "5287862d-26a3-49cf-9508-d9c7a64d958e",
    "specialty_id": null
  },
  {
    "id": "1508a6fc-9892-44fa-83d6-21e0b8ca4a52",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "chimie-generale-chimie-generale",
    "name": "Chimie générale",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "da26ab65-bc81-416b-9cf3-7b7847e9e7b5"
  },
  {
    "id": "b72edb98-dc60-4c0a-8a8a-b9508ee83325",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 10,
    "level_id": "253dae1f-7e1e-4f42-88b2-125b70769761",
    "specialty_id": null
  },
  {
    "id": "4ed5631e-71ad-4875-b49d-3794ff2ef38c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "gestion-comptabilite",
    "name": "Comptabilité",
    "is_active": true,
    "sort": 10,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "1549d6f2-7c66-499d-9050-2d374692b80f"
  },
  {
    "id": "d9d0ef24-7d1d-4842-bde1-b624b5dda81b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-fondamentale-mecanique",
    "name": "Mécanique",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "d33c0846-10c1-4767-a35e-0efc1a7ae525"
  },
  {
    "id": "e77b54b1-46ca-4f4a-8cc0-f8d922519e86",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-prive-droit-des-affaires",
    "name": "Droit des affaires",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "2132b782-b3c3-4d6d-88d1-057bbabeb952"
  },
  {
    "id": "236d40bb-2b91-452d-a50f-6d99de66f82f",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "marketing-marketing",
    "name": "Marketing",
    "is_active": true,
    "sort": 10,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "d3ff0e2a-c17f-43a0-ab7d-40fdc53f0436"
  },
  {
    "id": "638e9e96-d2b1-4519-a066-6d1ba09ab58c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-prive-droit-des-contrats",
    "name": "Droit des contrats",
    "is_active": true,
    "sort": 10,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "85195012-8914-4eef-bbde-817a04107bdb"
  },
  {
    "id": "c8a6966e-a5b0-4dc1-80b8-9acaffd7d96d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-appliquees-analyse",
    "name": "Analyse",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "c5e5fc20-50df-4fb4-97d7-abbdf602fbde"
  },
  {
    "id": "722b92ec-d013-42ad-94fd-a7f14d5e9ef7",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "genie-logiciel-architecture-logicielle",
    "name": "Architecture logicielle",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "46e7d71b-b610-4c1b-a85a-445c25056dc2"
  },
  {
    "id": "8e548cf4-cb45-4191-b0ca-e062d80d9666",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-public-droit-administratif",
    "name": "Droit administratif",
    "is_active": true,
    "sort": 10,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "4145e167-62f7-4ddc-8522-0fd13583de28"
  },
  {
    "id": "69f8d740-2a51-4696-a552-d0970d930c69",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "informatique-generale-algorithmique",
    "name": "Algorithmique",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "20fc8dc7-b23b-4859-8a06-9327ee519d10"
  },
  {
    "id": "90b9148e-a6b8-4578-b4d8-d5be5cd5ca54",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-fondamentales-analyse",
    "name": "Analyse",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "ee9a5e1f-d868-4b1a-a635-3996d44c2937"
  },
  {
    "id": "07884e99-f594-453d-9c19-c2fc7a16b34d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "intelligence-artificielle-machine-learning",
    "name": "Machine Learning",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "2c715011-48c5-4b61-a386-25ab8129f995"
  },
  {
    "id": "6d4d562f-9c60-42fa-9a78-30c112b90882",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "developpement-logiciel-programmation",
    "name": "Programmation",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "a3f412c3-5ec1-40ca-b5ab-d63164018485"
  },
  {
    "id": "41b44e1e-b709-46f4-92c5-86a2e04f5236",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "reseaux-reseaux-informatiques",
    "name": "Réseaux informatiques",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "7b48362e-2312-4263-84a3-cb165251fb11"
  },
  {
    "id": "8fed29e3-eaf9-4487-a5b9-e41653b99380",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "data-science-data-mining",
    "name": "Data Mining",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "1a3cb4c6-0d24-4571-a93f-44cce70922dc"
  },
  {
    "id": "e5285546-3513-463d-bf72-b381a8b77e48",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 10,
    "level_id": "36f28f73-936f-48e2-850e-9775d430ff3a",
    "specialty_id": null
  },
  {
    "id": "20aaaa4a-b829-4d86-82e8-47d32dbef9df",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "intelligence-artificielle-machine-learning",
    "name": "Machine Learning",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "f6f1655a-e9a0-47c8-ac97-77d1012b16d7"
  },
  {
    "id": "224c6d23-2ba8-4b23-96c6-0b087965bc06",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "cybersecurite-securite-des-reseaux",
    "name": "Sécurité des réseaux",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "cea788cf-d790-4d42-a2db-9be6ac4fc7d6"
  },
  {
    "id": "47f20e8a-8d44-45dc-b45a-21b72ea14213",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "reseaux-cloud-reseaux-avances",
    "name": "Réseaux avancés",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "53ae629d-79fd-44c3-913b-16af91bceaf2"
  },
  {
    "id": "f68a2782-8813-4132-9bef-21c4cf55b2fb",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-appliquees-modelisation",
    "name": "Modélisation",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "44e2e97a-ecf0-44a5-9fa0-807fc4aab5bf"
  },
  {
    "id": "ac919c2f-06ea-42b0-8351-b35d0d2d3311",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-physique-appliquee",
    "name": "Physique appliquée",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "b165ccd6-c3bb-43a5-ad8a-689992a3f42b"
  },
  {
    "id": "0c49333a-617a-45c6-abfb-f6560a24cd96",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 10,
    "level_id": "5b675056-2eff-4be6-b7f1-0bef5357e8d4",
    "specialty_id": null
  },
  {
    "id": "1b669405-c65d-4a92-9d8b-f0c8c2e5481c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "reseaux-cloud-cloud-computing",
    "name": "Cloud Computing",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "26142401-70f8-47d0-a7c2-f30c08987287"
  },
  {
    "id": "8adb7da3-3b69-4e3a-bdec-e79b7a18f8c4",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "chimie-chimie-analytique",
    "name": "Chimie analytique",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "ee9129c5-90a7-443c-a9b9-10d0ac8a0b1d"
  },
  {
    "id": "10e84673-4416-4255-9305-994343ff10dd",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biotechnologie-biologie-moleculaire",
    "name": "Biologie moléculaire",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "8a14600b-0ce9-4078-a127-d32c1507abc2"
  },
  {
    "id": "b547ee55-dac2-4494-8226-b64a569d3cbb",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "microbiologie-microbiologie-avancee",
    "name": "Microbiologie avancée",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "f6d0d724-2850-4909-b014-a673c8a38683"
  },
  {
    "id": "a635efad-aeff-447f-b3af-e84af6f07862",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "finance-finance-d-entreprise",
    "name": "Finance d'entreprise",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "a0e23ece-cf3e-4921-ba19-35122152335a"
  },
  {
    "id": "622fc16d-7515-49cc-b3dd-f5dbf1880127",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 10,
    "level_id": "8841f69f-e4a3-4e90-8e8d-f29604acf596",
    "specialty_id": null
  },
  {
    "id": "275cbea0-c5f5-41dc-8af4-5f426a9d6d4b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biotechnologie-genie-genetique",
    "name": "Génie génétique",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "d323a91e-517a-4f50-a759-80cc7cc17790"
  },
  {
    "id": "44b2ec68-55e1-460a-ad93-51242a017811",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "comptabilite-audit-audit",
    "name": "Audit",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "f7e1c285-1762-4628-bbbd-c906920e92e9"
  },
  {
    "id": "b1d7baeb-937a-4410-8796-6303481953e5",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "marketing-marketing-strategique",
    "name": "Marketing stratégique",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "496871af-d80d-4347-a7c2-69960056ab10"
  },
  {
    "id": "6c9574e4-558b-49d9-a345-b43408fdc021",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "management-management-strategique",
    "name": "Management stratégique",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "7ef49af6-73eb-4729-a3eb-82c52fed8676"
  },
  {
    "id": "739f9c2a-3073-4819-acde-6a89efbf99de",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-econometrie",
    "name": "Économétrie",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "f613a3db-bb59-4fdc-b42b-55955ab16a6d"
  },
  {
    "id": "016dd315-a394-43f6-a758-f83e9d8d3da2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 10,
    "level_id": "fd50ce22-478a-4ab1-b6e9-e9ce84bf881d",
    "specialty_id": null
  },
  {
    "id": "c602e233-7aeb-400e-8909-836e69c14105",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 10,
    "level_id": "fba10050-7af3-4cc9-925d-2edf6a08aa02",
    "specialty_id": null
  },
  {
    "id": "fbcac9b7-d42e-4591-b6bb-d1e4ccae8599",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-des-affaires-droit-des-societes",
    "name": "Droit des sociétés",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "8e534b70-89af-4a58-917f-9430257e207f"
  },
  {
    "id": "326ae770-274b-403b-aa01-9860a69f4b6f",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 10,
    "level_id": "2c5810e9-696e-4ff9-8cde-921dc9172a1a",
    "specialty_id": null
  },
  {
    "id": "f02b38a6-d738-4002-886c-391a5ed1a169",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-prive-droit-civil",
    "name": "Droit civil",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "985238c6-c078-49c6-ac81-9145a92ad5b3"
  },
  {
    "id": "ebfe4453-dc27-46fd-9415-d9e033d23451",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-public-droit-administratif",
    "name": "Droit administratif",
    "is_active": true,
    "sort": 10,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "4fd5e24d-910f-4766-8ae6-e52ae9b6d4a2"
  },
  {
    "id": "aac8b6e3-a7bc-4d35-9089-6553b75be7bb",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 10,
    "level_id": "9f8c8ca2-f771-4766-85af-f8d2ebd00741",
    "specialty_id": null
  },
  {
    "id": "815ccbe4-d795-445e-8251-cfeee24c8af7",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 10,
    "level_id": "454308b9-b360-4362-bf1f-1df7e5cf5f00",
    "specialty_id": null
  },
  {
    "id": "a65ad621-8ab7-4169-a7fe-e799317cde8d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "genie-logiciel-genie-logiciel",
    "name": "Génie logiciel",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "1645fe7b-5e8b-4d62-bce6-6e21d315c30c"
  },
  {
    "id": "f6396b02-230e-46a7-9366-f681e3622c7e",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "intelligence-artificielle-intelligence-artificielle",
    "name": "Intelligence artificielle",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "f90c8462-6a13-4948-91a4-a67aa33876bd"
  },
  {
    "id": "e9312cda-b0e0-4021-83c4-5c9ce1251439",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "data-science-data-science",
    "name": "Data Science",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "aa1fe99b-5e60-443a-bbdc-0ad0146bd60c"
  },
  {
    "id": "96f6dc48-ddaf-4d70-8824-fa3914e959d4",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "cybersecurite-securite-informatique",
    "name": "Sécurité informatique",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "d9620cb5-c4c2-4270-916d-03191f8d583c"
  },
  {
    "id": "038279e7-2007-451e-848e-8569e9206773",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "reseaux-systemes-reseaux",
    "name": "Réseaux",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "55557813-86d8-4230-94bb-a372e4e3f889"
  },
  {
    "id": "9d3d7c84-f5f5-42b5-8610-113bc910f2f3",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 10,
    "level_id": "ee70538d-95e1-4528-8ac2-693cdfe46db2",
    "specialty_id": null
  },
  {
    "id": "bd5888a3-276f-4fb6-aa7d-792ae841e91c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "microbiologie-microbiologie-avancee",
    "name": "Microbiologie avancée",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "636b768e-e604-4de5-bb1c-504a5b5f95df"
  },
  {
    "id": "4a832131-b34a-4682-bde9-026f66c4e66c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-analyse",
    "name": "Analyse",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "2fac41bf-72ed-4219-9c93-0637d68ac67e"
  },
  {
    "id": "82dd2f60-4984-4307-857e-f32190ec5437",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-appliquees-modelisation",
    "name": "Modélisation",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "6a2ab8e5-c4ba-4a75-9044-e2fb20de84f6"
  },
  {
    "id": "84faf4a6-abf2-4267-b994-e5b9f373d131",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-electromagnetisme",
    "name": "Électromagnétisme",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "6038160b-38a5-47a4-b759-076e2839ee48"
  },
  {
    "id": "cbf58c22-1911-420f-8cd6-852de1167ebf",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 10,
    "level_id": "2c43a0f8-814e-4e8b-a1aa-a37c6c6ad6b3",
    "specialty_id": null
  },
  {
    "id": "a12daa1c-4f80-4723-9de7-c2da62953931",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "chimie-chimie-analytique",
    "name": "Chimie analytique",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "1b94321e-7385-4251-8dfc-5b572238e1af"
  },
  {
    "id": "f15f40af-c274-4523-a0f2-fd0611f07857",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "chimie-chimie-organique",
    "name": "Chimie organique",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "17043690-8a7e-4fe3-990f-3a44e5ffad53"
  },
  {
    "id": "7492b9de-f56d-4577-8ec0-fac422e45316",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "microbiologie-microbiologie",
    "name": "Microbiologie",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "1fe249da-62c8-4557-92ce-dccc704b25ab"
  },
  {
    "id": "aae0cd34-41d0-46f1-a404-23b877f88e57",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biochimie-biochimie",
    "name": "Biochimie",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "df412bd1-29ea-4dc1-a612-d2e88cac34ee"
  },
  {
    "id": "cd6c0890-20ba-431d-9177-fb11ceaf2787",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biotechnologie-genie-genetique",
    "name": "Génie génétique",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "50dc845d-eff2-47c9-af9f-6d9dc3a73e8a"
  },
  {
    "id": "6dd3cc26-318b-4d0f-837c-d364235af879",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 10,
    "level_id": "bc5b88ae-e2f4-4cfc-b98a-16c861ea20f4",
    "specialty_id": null
  },
  {
    "id": "c013ea13-22f7-4b9e-a76f-adc5fc2aaa00",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 10,
    "level_id": "e48c535d-c2fd-4e94-9a59-76f14dd3ff83",
    "specialty_id": null
  },
  {
    "id": "822da650-f239-4feb-9c36-9ffda7298070",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-econometrie",
    "name": "Économétrie",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "c7b72286-42a2-4f9d-b363-d347ffb14618"
  },
  {
    "id": "0318bcbc-9db3-4356-b601-cc589fe6f48c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-internationale-economie-internationale",
    "name": "Économie internationale",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "ec107bce-d97e-443e-9b79-f7b9dbbe78c9"
  },
  {
    "id": "6a646cbf-fc9f-4538-a6cf-db3d383ff7a6",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "finance-finance-d-entreprise",
    "name": "Finance d'entreprise",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "6cf2350c-45c0-455e-9b9e-b9d17cae09cd"
  },
  {
    "id": "4d26f0ae-2438-4b14-89e1-d2fcd0de524d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "comptabilite-comptabilite-generale",
    "name": "Comptabilité générale",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "07e15b66-31c1-4478-b8d3-a05440dacf55"
  },
  {
    "id": "262c4d07-3445-4dc7-9582-45c265945dbe",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 10,
    "level_id": "b1944375-57d2-4718-bff8-50a7557c1c75",
    "specialty_id": null
  },
  {
    "id": "4c6d63ce-8aa2-4aba-a69c-7c768c4a19cb",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "genie-logiciel-architecture-logicielle",
    "name": "Architecture logicielle",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "dd4a1b07-e6bc-4923-93dc-28e181116a52"
  },
  {
    "id": "f42c122b-d64b-4637-9abd-5b60d4ac6d7a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "marketing-marketing-digital",
    "name": "Marketing digital",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "dfea8bf6-5686-491b-b03d-50c0f51bf140"
  },
  {
    "id": "45d78f08-fb72-45f3-814c-766e555a1cc1",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "management-management",
    "name": "Management",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "2c2efbf8-f753-45de-973d-b259634363f2"
  },
  {
    "id": "4cee1e89-5567-4b3e-83d4-1d2de9992073",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-des-affaires-droit-commercial",
    "name": "Droit commercial",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "564f28ba-f43f-4bbc-9b18-1ed1bda15f80"
  },
  {
    "id": "fe86666c-97fa-4ccf-b465-0223213c52bf",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-prive-droit-civil",
    "name": "Droit civil",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "14c43248-9699-4ab8-9655-843af9729dbf"
  },
  {
    "id": "74b2f4b8-c07b-409a-b6cb-ac84a6035f23",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-public-droit-administratif",
    "name": "Droit administratif",
    "is_active": true,
    "sort": 10,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "af1b3246-d00b-461c-a2b1-4ea8dd2a1f4c"
  },
  {
    "id": "d4870915-d192-4754-8971-1def138fda89",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 10,
    "level_id": "812980eb-7c5f-4bbd-8970-2dfa31a8b37f",
    "specialty_id": null
  },
  {
    "id": "69d4bc84-87e9-4a75-84c5-85f432e27fa5",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-appliquees-statistiques",
    "name": "Statistiques",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "8bbc53a8-2fc7-4a18-8407-dffafd4c6158"
  },
  {
    "id": "4ae5083d-b75f-4141-9bce-402ce9344ac2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "developpement-logiciel-programmation-avancee",
    "name": "Programmation avancée",
    "is_active": true,
    "sort": 10,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "829c3e80-3579-4c74-83ed-d0fdaf94e763"
  },
  {
    "id": "6ad674f0-4b3a-4a2d-a9f8-4a9a32f3383d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "reseaux-reseaux",
    "name": "Réseaux",
    "is_active": true,
    "sort": 10,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "87b0e936-4b84-47fb-a742-32e2f28202fd"
  },
  {
    "id": "06dd3506-adc0-48a6-92fa-dbdc588a69d8",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "data-statistiques",
    "name": "Statistiques",
    "is_active": true,
    "sort": 10,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "dae38c72-733e-4a14-95da-85157d11fa33"
  },
  {
    "id": "24783674-3615-489e-8c59-05fd6e0ef635",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe-langue-arabe",
    "name": "Langue arabe",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "ab266d15-77b4-4adb-a726-fdea85f1b08d"
  },
  {
    "id": "77210ae6-7337-4ce5-859b-37617e22178f",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "finance-finance-internationale",
    "name": "Finance internationale",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "47bcf7c4-05cf-44ab-801c-0a4de152bf3a"
  },
  {
    "id": "a23e50d9-2144-4747-b453-978f7776fbce",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-analyse",
    "name": "Analyse",
    "is_active": true,
    "sort": 10,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "a311491f-8ae6-4d4a-a67d-d183e2fe8846"
  },
  {
    "id": "14df5a98-7114-455b-8433-7d457a9401e9",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "anglais-grammar",
    "name": "Grammar",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "51ff52e2-6a6e-403b-9a37-9aeb5dfc3911"
  },
  {
    "id": "4469908a-1693-48c1-8435-530c88a9522d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 10,
    "level_id": "1fe871aa-9e91-4ac5-90b5-1d2e521fe0cb",
    "specialty_id": null
  },
  {
    "id": "5205f19b-f23d-4b33-aab1-498bc1f9af0a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-appliquees-modelisation",
    "name": "Modélisation",
    "is_active": true,
    "sort": 10,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "c24ca943-6f67-40e0-a936-79510337420e"
  },
  {
    "id": "ba97345f-1cb5-45ce-961e-ff01bbc1b049",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais-grammaire",
    "name": "Grammaire",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "d28fc039-5791-495a-a90d-8b70c7b12b4b"
  },
  {
    "id": "061af6d5-03c4-4d1c-b78d-2f97a652fa81",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "data-science-data-mining",
    "name": "Data Mining",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "8734ac36-5893-44de-be42-e0158d9572cc"
  },
  {
    "id": "999f45c7-98ac-4c31-abf6-656bc0e5cc27",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-mecanique",
    "name": "Mécanique",
    "is_active": true,
    "sort": 10,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "224ac14a-3c61-46db-9e7d-cfdd4a804ebe"
  },
  {
    "id": "d6742a89-eee2-4005-a620-c17232ebe01b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-public-droit-constitutionnel",
    "name": "Droit constitutionnel",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "79a69e7b-0d66-4e18-8352-1f0151a6f7e1"
  },
  {
    "id": "494749f4-d16a-46bd-9d25-3796b4cbd31a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "audit-comptabilite-audit-financier",
    "name": "Audit financier",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "c301ea3d-40d2-4e57-a3f1-cedf8c58b9da"
  },
  {
    "id": "cc8daae9-fba6-423a-aa94-7a5afcfded28",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-prive-droit-civil",
    "name": "Droit civil",
    "is_active": true,
    "sort": 10,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "adf37a66-8521-47e7-bc70-df6f9d84c950"
  },
  {
    "id": "345da5d8-82f9-44c5-a030-322a450f939c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "marketing-marketing-digital",
    "name": "Marketing digital",
    "is_active": true,
    "sort": 10,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "9b28dfb3-a5ba-4e85-9ae1-b844c72ffeb2"
  },
  {
    "id": "2d5e33f0-4da1-4aaa-8836-f5cf80bf32ac",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-prive-droit-du-travail",
    "name": "Droit du travail",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "985238c6-c078-49c6-ac81-9145a92ad5b3"
  },
  {
    "id": "850b55d5-170d-4ff6-86c2-7fabd223559d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 20,
    "level_id": "2c5810e9-696e-4ff9-8cde-921dc9172a1a",
    "specialty_id": null
  },
  {
    "id": "e3a41c39-20d1-45cf-955e-f0176245594f",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 20,
    "level_id": "454308b9-b360-4362-bf1f-1df7e5cf5f00",
    "specialty_id": null
  },
  {
    "id": "4e6fcc29-7885-44ca-81ca-c15cb43289ad",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 20,
    "level_id": "253dae1f-7e1e-4f42-88b2-125b70769761",
    "specialty_id": null
  },
  {
    "id": "bbd9df94-1b24-40d9-90eb-eef8d69ee563",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 20,
    "level_id": "fba10050-7af3-4cc9-925d-2edf6a08aa02",
    "specialty_id": null
  },
  {
    "id": "b7962fc0-43b4-4ddd-af72-e12238f207e2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 20,
    "level_id": "e48c535d-c2fd-4e94-9a59-76f14dd3ff83",
    "specialty_id": null
  },
  {
    "id": "24505456-aa4e-40c4-a9a6-0425e883bb4c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 20,
    "level_id": "1fe871aa-9e91-4ac5-90b5-1d2e521fe0cb",
    "specialty_id": null
  },
  {
    "id": "845679e6-b7d1-4be6-89a1-54781423cd3b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 20,
    "level_id": "e08768b7-4732-4d57-94f8-023357895cd3",
    "specialty_id": null
  },
  {
    "id": "43c82252-4f6b-4b15-a36c-f1371825d035",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 20,
    "level_id": "5287862d-26a3-49cf-9508-d9c7a64d958e",
    "specialty_id": null
  },
  {
    "id": "81f0d680-4552-4ef8-a99b-f019a62abb3f",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 20,
    "level_id": "36f28f73-936f-48e2-850e-9775d430ff3a",
    "specialty_id": null
  },
  {
    "id": "094d9790-c6a4-4d90-8ae6-7d9c2b9626a2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-chimie",
    "name": "Physique-Chimie",
    "is_active": true,
    "sort": 20,
    "level_id": "5b675056-2eff-4be6-b7f1-0bef5357e8d4",
    "specialty_id": null
  },
  {
    "id": "4c4b7fd5-c84c-49e3-82f7-14f5d33cd146",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-chimie",
    "name": "Physique-Chimie",
    "is_active": true,
    "sort": 20,
    "level_id": "8841f69f-e4a3-4e90-8e8d-f29604acf596",
    "specialty_id": null
  },
  {
    "id": "60f528a3-0224-47ba-adc4-55815cde1046",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-chimie",
    "name": "Physique-Chimie",
    "is_active": true,
    "sort": 20,
    "level_id": "fd50ce22-478a-4ab1-b6e9-e9ce84bf881d",
    "specialty_id": null
  },
  {
    "id": "dfd0f66f-32d0-409f-bc04-2bcc395ef6d8",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie",
    "name": "Économie",
    "is_active": true,
    "sort": 20,
    "level_id": "9f8c8ca2-f771-4766-85af-f8d2ebd00741",
    "specialty_id": null
  },
  {
    "id": "52156421-85cc-453b-b8de-a8787ff8b45a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 20,
    "level_id": "ee70538d-95e1-4528-8ac2-693cdfe46db2",
    "specialty_id": null
  },
  {
    "id": "3afef349-a4c8-4fc9-b4b3-757e74f113c5",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-chimie",
    "name": "Physique-Chimie",
    "is_active": true,
    "sort": 20,
    "level_id": "2c43a0f8-814e-4e8b-a1aa-a37c6c6ad6b3",
    "specialty_id": null
  },
  {
    "id": "f523a4c8-f8bc-45e2-8f5f-e38f14d5995b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-chimie",
    "name": "Physique-Chimie",
    "is_active": true,
    "sort": 20,
    "level_id": "bc5b88ae-e2f4-4cfc-b98a-16c861ea20f4",
    "specialty_id": null
  },
  {
    "id": "6a89c2b0-313c-47c5-a16a-a9036bcb6e6b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie",
    "name": "Économie",
    "is_active": true,
    "sort": 20,
    "level_id": "b1944375-57d2-4718-bff8-50a7557c1c75",
    "specialty_id": null
  },
  {
    "id": "021006a1-0682-43e3-84cf-0f59ce365294",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 20,
    "level_id": "812980eb-7c5f-4bbd-8970-2dfa31a8b37f",
    "specialty_id": null
  },
  {
    "id": "42a08da8-47a9-4ba0-a52c-ab4d951eb7e7",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe-litterature",
    "name": "Littérature",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "ab266d15-77b4-4adb-a726-fdea85f1b08d"
  },
  {
    "id": "075df010-5cf0-4583-8424-c43b867eb659",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "anglais-linguistics",
    "name": "Linguistics",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "51ff52e2-6a6e-403b-9a37-9aeb5dfc3911"
  },
  {
    "id": "0805dec8-7e84-4110-b650-23ddfa8f7591",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais-linguistique",
    "name": "Linguistique",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "d28fc039-5791-495a-a90d-8b70c7b12b4b"
  },
  {
    "id": "cfa29acd-1d6a-44ed-818c-cfc1f0eff7fb",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-public-droit-administratif",
    "name": "Droit administratif",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "79a69e7b-0d66-4e18-8352-1f0151a6f7e1"
  },
  {
    "id": "2bb0803d-1309-48c1-bc0b-350f24e9f2aa",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-prive-droit-commercial",
    "name": "Droit commercial",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "adf37a66-8521-47e7-bc70-df6f9d84c950"
  },
  {
    "id": "f1e00217-be26-46de-a4ff-5f5c40ecb400",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "finance-comptabilite",
    "name": "Comptabilité",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "9f01bed5-3e61-49f2-9771-cbb343901442"
  },
  {
    "id": "450a54d4-7126-4702-9fe3-c9e95e817620",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "gestion-economie",
    "name": "Économie",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "a3d0aae0-1495-4296-8228-9fe487fe3b63"
  },
  {
    "id": "428cee6e-578d-41c2-9c21-1e880bef4c55",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-appliquee-econometrie",
    "name": "Économétrie",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "f52a0ced-8727-4455-8e81-3f1e9e410d20"
  },
  {
    "id": "dae5635a-bcd2-4f08-918a-17d0099402c9",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-macroeconomie",
    "name": "Macroéconomie",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "9748eecb-5634-4ae2-b229-2e3cc46fbc51"
  },
  {
    "id": "6ba9132b-6635-4e76-bf46-e88123bf3817",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "sciences-de-la-vie-biochimie",
    "name": "Biochimie",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "ab01c9ac-a5bc-484e-92c9-c4160ed1cf79"
  },
  {
    "id": "95c85bfe-61a8-461a-b06b-93220d961b8f",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biologie-generale-biologie-moleculaire",
    "name": "Biologie moléculaire",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "a39025b4-8104-48ea-af0e-642142095186"
  },
  {
    "id": "ea93a81e-3309-49c1-b2d9-7510dd853eb6",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "chimie-analytique-methodes-d-analyse",
    "name": "Méthodes d'analyse",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "4732a116-95ee-4d59-9fea-6311d60a2ec5"
  },
  {
    "id": "cc938ddc-b290-4e05-ba61-c3d02c1026b9",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "chimie-generale-chimie-organique",
    "name": "Chimie organique",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "da26ab65-bc81-416b-9cf3-7b7847e9e7b5"
  },
  {
    "id": "dfdf7d44-3aff-496a-b055-73f4bf3cd8fd",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-fondamentale-electricite",
    "name": "Électricité",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "d33c0846-10c1-4767-a35e-0efc1a7ae525"
  },
  {
    "id": "fa178b20-4984-4d88-b11a-91b8add4f435",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-appliquees-algebre",
    "name": "Algèbre",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "c5e5fc20-50df-4fb4-97d7-abbdf602fbde"
  },
  {
    "id": "587109de-5477-4f1a-a458-4eaadee172c9",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-fondamentales-algebre",
    "name": "Algèbre",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "ee9a5e1f-d868-4b1a-a635-3996d44c2937"
  },
  {
    "id": "521349d1-bd57-4280-839a-c8c0d5bf3ebd",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "reseaux-systemes",
    "name": "Systèmes",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "7b48362e-2312-4263-84a3-cb165251fb11"
  },
  {
    "id": "37fa184b-f29b-4e6d-b76a-458ca1cffdb6",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "developpement-logiciel-algorithmique",
    "name": "Algorithmique",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "a3f412c3-5ec1-40ca-b5ab-d63164018485"
  },
  {
    "id": "c87dd4e1-7f07-4dd5-95f4-bd54da7fbd37",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "informatique-generale-programmation",
    "name": "Programmation",
    "is_active": true,
    "sort": 20,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "20fc8dc7-b23b-4859-8a06-9327ee519d10"
  },
  {
    "id": "56df4db6-22db-494f-af6a-7aec488bf37a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-public-droit-constitutionnel",
    "name": "Droit constitutionnel",
    "is_active": true,
    "sort": 20,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "4145e167-62f7-4ddc-8522-0fd13583de28"
  },
  {
    "id": "1f618cca-5ad6-4f84-ae3b-222d9c4c7db2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-prive-droit-commercial",
    "name": "Droit commercial",
    "is_active": true,
    "sort": 20,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "85195012-8914-4eef-bbde-817a04107bdb"
  },
  {
    "id": "93f3b370-91a7-49d7-987f-be3cf8531ece",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "marketing-communication",
    "name": "Communication",
    "is_active": true,
    "sort": 20,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "d3ff0e2a-c17f-43a0-ab7d-40fdc53f0436"
  },
  {
    "id": "ba48c3d5-0ac1-424b-9f87-7ac6b0b11909",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "gestion-finance",
    "name": "Finance",
    "is_active": true,
    "sort": 20,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "1549d6f2-7c66-499d-9050-2d374692b80f"
  },
  {
    "id": "e09bb3c4-01bd-4e17-b326-fad0cfc3ad6a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-internationale-finance-internationale",
    "name": "Finance internationale",
    "is_active": true,
    "sort": 20,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "0311cf6a-1727-4379-b805-fe3b8289e60c"
  },
  {
    "id": "293f58c9-886f-4288-ae35-b05dd7fab13c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-macroeconomie",
    "name": "Macroéconomie",
    "is_active": true,
    "sort": 20,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "1060214f-4c5c-449d-86fb-6c856ee16022"
  },
  {
    "id": "db643208-1c3c-4a71-8740-4c1e224c6454",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biotechnologie-genie-genetique",
    "name": "Génie génétique",
    "is_active": true,
    "sort": 20,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "5f2e9f9f-084e-4cf5-962e-34bca3516b33"
  },
  {
    "id": "e0e6ed20-e350-425c-9c66-92ea59f23251",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biologie-genetique",
    "name": "Génétique",
    "is_active": true,
    "sort": 20,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "b30fec6d-5f94-4cfc-b268-6d82e4e0ff96"
  },
  {
    "id": "61b48568-840c-4a30-b38a-7e6456409512",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biochimie-enzymologie",
    "name": "Enzymologie",
    "is_active": true,
    "sort": 20,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "c0c74e06-6661-421e-a05c-798d2ac5608e"
  },
  {
    "id": "3c02b952-60e7-43e2-91c8-b2ee1060fb0a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "chimie-chimie-analytique",
    "name": "Chimie analytique",
    "is_active": true,
    "sort": 20,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "08de8ca4-a3a3-467d-8183-b37114e35d78"
  },
  {
    "id": "686bf6a4-fe13-4466-b4b2-24a62666b6ca",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-electromagnetisme",
    "name": "Électromagnétisme",
    "is_active": true,
    "sort": 20,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "224ac14a-3c61-46db-9e7d-cfdd4a804ebe"
  },
  {
    "id": "62989b76-fc0c-4952-88cd-ebae3e006857",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-appliquees-statistiques",
    "name": "Statistiques",
    "is_active": true,
    "sort": 20,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "c24ca943-6f67-40e0-a936-79510337420e"
  },
  {
    "id": "953d3b0f-5f42-4d91-8a84-df88680fee15",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-algebre",
    "name": "Algèbre",
    "is_active": true,
    "sort": 20,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "a311491f-8ae6-4d4a-a67d-d183e2fe8846"
  },
  {
    "id": "e1ecdc73-39c8-442d-8c74-3e40fa92050f",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "data-python",
    "name": "Python",
    "is_active": true,
    "sort": 20,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "dae38c72-733e-4a14-95da-85157d11fa33"
  },
  {
    "id": "175495de-b93b-407c-b581-9408799f5a3a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "reseaux-administration-systemes",
    "name": "Administration systèmes",
    "is_active": true,
    "sort": 20,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "87b0e936-4b84-47fb-a742-32e2f28202fd"
  },
  {
    "id": "f730b902-8823-4953-a3cd-eb0f4be23575",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "developpement-logiciel-structures-de-donnees",
    "name": "Structures de données",
    "is_active": true,
    "sort": 20,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "829c3e80-3579-4c74-83ed-d0fdaf94e763"
  },
  {
    "id": "d9d8006a-3d49-42e1-acf6-018fc1734d8d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-public-droit-constitutionnel",
    "name": "Droit constitutionnel",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "af1b3246-d00b-461c-a2b1-4ea8dd2a1f4c"
  },
  {
    "id": "b440b47a-860b-476f-9b29-e551311f16b9",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-prive-droit-du-travail",
    "name": "Droit du travail",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "14c43248-9699-4ab8-9655-843af9729dbf"
  },
  {
    "id": "e49a1e07-19c7-4bb1-93f5-7c3f9a203235",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-des-affaires-droit-des-societes",
    "name": "Droit des sociétés",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "564f28ba-f43f-4bbc-9b18-1ed1bda15f80"
  },
  {
    "id": "9ef3cc55-770e-49ea-aba1-efc99cc080e1",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "management-gestion-des-ressources-humaines",
    "name": "Gestion des ressources humaines",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "2c2efbf8-f753-45de-973d-b259634363f2"
  },
  {
    "id": "67643812-e361-4a22-864d-d50fec4c05d1",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "marketing-strategie-marketing",
    "name": "Stratégie marketing",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "dfea8bf6-5686-491b-b03d-50c0f51bf140"
  },
  {
    "id": "e5022b8c-9181-4c92-91d4-01595f321f68",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "comptabilite-comptabilite-analytique",
    "name": "Comptabilité analytique",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "07e15b66-31c1-4478-b8d3-a05440dacf55"
  },
  {
    "id": "6b8d9b4f-c498-4306-b222-01f8f28fbf12",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "finance-analyse-financiere",
    "name": "Analyse financière",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "6cf2350c-45c0-455e-9b9e-b9d17cae09cd"
  },
  {
    "id": "b4defccf-bb1f-447c-b916-b4e77529daf0",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-internationale-finance-internationale",
    "name": "Finance internationale",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "ec107bce-d97e-443e-9b79-f7b9dbbe78c9"
  },
  {
    "id": "e469667a-0a77-4dee-b364-e361de1d79c5",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-microeconomie",
    "name": "Microéconomie",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "c7b72286-42a2-4f9d-b363-d347ffb14618"
  },
  {
    "id": "4842691a-28b2-4703-8e1b-b7c1db3c02dc",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biotechnologie-biologie-moleculaire",
    "name": "Biologie moléculaire",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "50dc845d-eff2-47c9-af9f-6d9dc3a73e8a"
  },
  {
    "id": "5af20404-e9b2-4565-978d-38166878c243",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biochimie-biologie-moleculaire",
    "name": "Biologie moléculaire",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "df412bd1-29ea-4dc1-a612-d2e88cac34ee"
  },
  {
    "id": "f41db7a6-4992-42e7-a8ed-dbd5449cfc1b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "microbiologie-bacteriologie",
    "name": "Bactériologie",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "1fe249da-62c8-4557-92ce-dccc704b25ab"
  },
  {
    "id": "28566de1-b3cc-4232-8349-02cd86aeb8d8",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "chimie-chimie-analytique",
    "name": "Chimie analytique",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "17043690-8a7e-4fe3-990f-3a44e5ffad53"
  },
  {
    "id": "1359549a-89a1-48a5-bbdd-9b777ef69f0b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-mecanique-quantique",
    "name": "Mécanique quantique",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "6038160b-38a5-47a4-b759-076e2839ee48"
  },
  {
    "id": "2943edc9-381e-4109-a868-c349af0c5b68",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-appliquees-analyse-numerique",
    "name": "Analyse numérique",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "6a2ab8e5-c4ba-4a75-9044-e2fb20de84f6"
  },
  {
    "id": "32007ccc-7997-4307-8c67-08ab8982bab9",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-algebre",
    "name": "Algèbre",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "2fac41bf-72ed-4219-9c93-0637d68ac67e"
  },
  {
    "id": "ae3e0404-ae55-41f4-a50a-8e79c3be91cb",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "reseaux-systemes-administration-systemes",
    "name": "Administration systèmes",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "55557813-86d8-4230-94bb-a372e4e3f889"
  },
  {
    "id": "f9f6ad7d-ba1d-4d0c-9c65-a2c29d23d22d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "cybersecurite-cryptographie",
    "name": "Cryptographie",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "d9620cb5-c4c2-4270-916d-03191f8d583c"
  },
  {
    "id": "e02f5c89-a9ec-416b-a0a6-65ce741fec48",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "data-science-statistiques",
    "name": "Statistiques",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "aa1fe99b-5e60-443a-bbdc-0ad0146bd60c"
  },
  {
    "id": "da7d3160-a561-43b0-801c-a734247376b8",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "intelligence-artificielle-machine-learning",
    "name": "Machine Learning",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "f90c8462-6a13-4948-91a4-a67aa33876bd"
  },
  {
    "id": "af42174e-8b1f-45a8-93c8-90dedc042caf",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "genie-logiciel-conception-logicielle",
    "name": "Conception logicielle",
    "is_active": true,
    "sort": 20,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "1645fe7b-5e8b-4d62-bce6-6e21d315c30c"
  },
  {
    "id": "ff54ed24-011a-4186-b881-426a4b95ffdd",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-public-droit-constitutionnel",
    "name": "Droit constitutionnel",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "4fd5e24d-910f-4766-8ae6-e52ae9b6d4a2"
  },
  {
    "id": "5e05db1e-7d1e-4d54-b6c8-580a3301ff50",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-des-affaires-fiscalite",
    "name": "Fiscalité",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "8e534b70-89af-4a58-917f-9430257e207f"
  },
  {
    "id": "70a96b58-0352-44d2-bb47-bdc3cb0e7807",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-economie-internationale",
    "name": "Économie internationale",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "f613a3db-bb59-4fdc-b42b-55955ab16a6d"
  },
  {
    "id": "7e7ec458-5f23-4146-9046-f0508b26ef5c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "management-ressources-humaines",
    "name": "Ressources humaines",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "7ef49af6-73eb-4729-a3eb-82c52fed8676"
  },
  {
    "id": "97e1a01e-92c6-4f1c-9539-cff3eb8cad2e",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "marketing-marketing-digital",
    "name": "Marketing digital",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "496871af-d80d-4347-a7c2-69960056ab10"
  },
  {
    "id": "2a647e91-72d1-4be4-b96c-d49b3f985d6b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "comptabilite-audit-comptabilite",
    "name": "Comptabilité",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "f7e1c285-1762-4628-bbbd-c906920e92e9"
  },
  {
    "id": "0e67bf59-9662-4756-8d49-f945c5371d3c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "finance-gestion-des-risques",
    "name": "Gestion des risques",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "a0e23ece-cf3e-4921-ba19-35122152335a"
  },
  {
    "id": "663848ba-143b-461f-acb0-0cc8a3ce99a0",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "microbiologie-bacteriologie",
    "name": "Bactériologie",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "f6d0d724-2850-4909-b014-a673c8a38683"
  },
  {
    "id": "ebab0f5d-abf9-408a-987e-57bf2a3fb61b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biotechnologie-genie-genetique",
    "name": "Génie génétique",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "8a14600b-0ce9-4078-a127-d32c1507abc2"
  },
  {
    "id": "8dc28d04-1e65-4229-a8eb-14ab03dd0dfe",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "chimie-chimie-organique-avancee",
    "name": "Chimie organique avancée",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "ee9129c5-90a7-443c-a9b9-10d0ac8a0b1d"
  },
  {
    "id": "305b80aa-31ee-47d1-aa22-45c0f55ed0cb",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-modelisation",
    "name": "Modélisation",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "b165ccd6-c3bb-43a5-ad8a-689992a3f42b"
  },
  {
    "id": "4e958697-142d-4655-8a8c-06f79a05a0ae",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-appliquees-statistiques",
    "name": "Statistiques",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "44e2e97a-ecf0-44a5-9fa0-807fc4aab5bf"
  },
  {
    "id": "c76a72ac-ae17-4c59-b8a9-c0a91a69b6d3",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "reseaux-cloud-cloud-computing",
    "name": "Cloud Computing",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "53ae629d-79fd-44c3-913b-16af91bceaf2"
  },
  {
    "id": "3110ba6b-9b63-45e8-a2b9-15441aa22612",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "cybersecurite-cryptographie",
    "name": "Cryptographie",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "cea788cf-d790-4d42-a2db-9be6ac4fc7d6"
  },
  {
    "id": "d2971c1a-d85d-4270-ba61-b05a3cf229fd",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "data-science-machine-learning",
    "name": "Machine Learning",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "1a3cb4c6-0d24-4571-a93f-44cce70922dc"
  },
  {
    "id": "bc123cb3-329d-4fce-8508-4f49f140d85d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "intelligence-artificielle-deep-learning",
    "name": "Deep Learning",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "2c715011-48c5-4b61-a386-25ab8129f995"
  },
  {
    "id": "b6c4084f-aa0a-479e-9394-98aaab9f9c7b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "genie-logiciel-developpement-avance",
    "name": "Développement avancé",
    "is_active": true,
    "sort": 20,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "46e7d71b-b610-4c1b-a85a-445c25056dc2"
  },
  {
    "id": "5ddd6f94-c70c-48aa-adcd-0d740565b300",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-prive-droit-du-travail",
    "name": "Droit du travail",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "2132b782-b3c3-4d6d-88d1-057bbabeb952"
  },
  {
    "id": "23613f0a-aecb-4211-b6d3-7035bdb0e7bb",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-public-droit-international",
    "name": "Droit international",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "56ce1a06-ffb5-4a94-9fdf-519457585840"
  },
  {
    "id": "1941bb01-1e5e-44aa-b38a-2c6205c1f97e",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-des-affaires-droit-des-societes",
    "name": "Droit des sociétés",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "f68169e4-f096-4ccc-918c-3167bec1af36"
  },
  {
    "id": "c6152507-f381-4a7a-bf7b-30d8d8fecb76",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-economie-internationale",
    "name": "Économie internationale",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "803fc738-c4da-4380-8274-3614344b8ca0"
  },
  {
    "id": "4cfffa01-f41b-4c1c-a3ce-5d3e6c6d64d3",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "management-gestion-des-ressources-humaines",
    "name": "Gestion des ressources humaines",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "0a8fea88-f422-4c43-8b6a-ee6c8dffa304"
  },
  {
    "id": "668cb5fa-028c-48be-abcb-0a0f5be83a62",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "marketing-strategie-marketing",
    "name": "Stratégie marketing",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "9b28dfb3-a5ba-4e85-9ae1-b844c72ffeb2"
  },
  {
    "id": "b7e65f88-cbe9-49a8-b5e4-e6a0474a0c75",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "audit-comptabilite-controle-de-gestion",
    "name": "Contrôle de gestion",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "c301ea3d-40d2-4e57-a3f1-cedf8c58b9da"
  },
  {
    "id": "4d5b202d-4bda-49ef-b336-9566ffb170f2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "finance-gestion-des-risques",
    "name": "Gestion des risques",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "47bcf7c4-05cf-44ab-801c-0a4de152bf3a"
  },
  {
    "id": "7a910d2e-82df-41a4-a934-a0cded3d498f",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-appliquees-modelisation",
    "name": "Modélisation",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "8bbc53a8-2fc7-4a18-8407-dffafd4c6158"
  },
  {
    "id": "d6f7ad4a-688e-4413-ab3a-e970254c46d2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "chimie-chimie-organique",
    "name": "Chimie organique",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "1b94321e-7385-4251-8dfc-5b572238e1af"
  },
  {
    "id": "42f70875-903d-4689-9728-c32ec53728a3",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "microbiologie-biologie-moleculaire",
    "name": "Biologie moléculaire",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "636b768e-e604-4de5-bb1c-504a5b5f95df"
  },
  {
    "id": "914f40db-8091-43e2-9ed1-8dd477271591",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biotechnologie-biologie-moleculaire",
    "name": "Biologie moléculaire",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "d323a91e-517a-4f50-a759-80cc7cc17790"
  },
  {
    "id": "c3175142-7df7-4ef5-871d-e392a1c2930f",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "reseaux-cloud-reseaux-avances",
    "name": "Réseaux avancés",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "26142401-70f8-47d0-a7c2-f30c08987287"
  },
  {
    "id": "b302e7fc-9c9b-418c-b2a2-babe5ac03cbf",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "cybersecurite-cryptographie",
    "name": "Cryptographie",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "d5ce8ed3-a2e4-4313-b544-ea2dde8b8112"
  },
  {
    "id": "564d0312-4c41-4da5-b7bb-d01ddc66f033",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "data-science-big-data",
    "name": "Big Data",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "8734ac36-5893-44de-be42-e0158d9572cc"
  },
  {
    "id": "a5d1d2c7-e904-4aac-ab6f-bb8ca1fd002a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "intelligence-artificielle-deep-learning",
    "name": "Deep Learning",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "f6f1655a-e9a0-47c8-ac97-77d1012b16d7"
  },
  {
    "id": "f37ff48b-30a3-4ff9-9de5-dd9b2f110053",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "genie-logiciel-devops",
    "name": "DevOps",
    "is_active": true,
    "sort": 20,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "dd4a1b07-e6bc-4923-93dc-28e181116a52"
  },
  {
    "id": "122804b7-f882-4493-a8df-28380ec8b168",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "data-science-analyse-de-donnees",
    "name": "Analyse de données",
    "is_active": true,
    "sort": 30,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "1a3cb4c6-0d24-4571-a93f-44cce70922dc"
  },
  {
    "id": "dafadd5f-6779-4584-bc03-a91dd5dc7b2c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "finance-marches-financiers",
    "name": "Marchés financiers",
    "is_active": true,
    "sort": 30,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "6cf2350c-45c0-455e-9b9e-b9d17cae09cd"
  },
  {
    "id": "9ce96613-12c1-4384-8953-45276239b8f1",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "genie-logiciel-cloud",
    "name": "Cloud",
    "is_active": true,
    "sort": 30,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "dd4a1b07-e6bc-4923-93dc-28e181116a52"
  },
  {
    "id": "6a46e670-0788-4785-8715-5609f50be2f1",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "marketing-communication",
    "name": "Communication",
    "is_active": true,
    "sort": 30,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "496871af-d80d-4347-a7c2-69960056ab10"
  },
  {
    "id": "ef6c36ee-2cc4-4f7b-9eb7-780b845d49b8",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "svt",
    "name": "SVT",
    "is_active": true,
    "sort": 30,
    "level_id": "8841f69f-e4a3-4e90-8e8d-f29604acf596",
    "specialty_id": null
  },
  {
    "id": "5bfdbb14-ecd1-4099-9123-56e4d50ba6b8",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 30,
    "level_id": "1fe871aa-9e91-4ac5-90b5-1d2e521fe0cb",
    "specialty_id": null
  },
  {
    "id": "40ee5022-5e2d-420f-8ad3-63928a2747d8",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "comptabilite-audit-controle-de-gestion",
    "name": "Contrôle de gestion",
    "is_active": true,
    "sort": 30,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "f7e1c285-1762-4628-bbbd-c906920e92e9"
  },
  {
    "id": "2cafe6cb-e54c-4d98-a360-ee2cecc41989",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "reseaux-linux",
    "name": "Linux",
    "is_active": true,
    "sort": 30,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "7b48362e-2312-4263-84a3-cb165251fb11"
  },
  {
    "id": "aee507c9-e17a-4032-a0de-63acccef6c66",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-fondamentales-geometrie",
    "name": "Géométrie",
    "is_active": true,
    "sort": 30,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "ee9a5e1f-d868-4b1a-a635-3996d44c2937"
  },
  {
    "id": "5bc3727e-4986-4f93-bd1d-8ba4a3687d22",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "developpement-logiciel-bases-de-donnees",
    "name": "Bases de données",
    "is_active": true,
    "sort": 30,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "a3f412c3-5ec1-40ca-b5ab-d63164018485"
  },
  {
    "id": "f1b679b3-d9af-4947-b186-0b38e8470366",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "intelligence-artificielle-nlp",
    "name": "NLP",
    "is_active": true,
    "sort": 30,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "f6f1655a-e9a0-47c8-ac97-77d1012b16d7"
  },
  {
    "id": "42722b62-2d9b-42ab-b700-f17696071803",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "informatique-generale-architecture-des-ordinateurs",
    "name": "Architecture des ordinateurs",
    "is_active": true,
    "sort": 30,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "20fc8dc7-b23b-4859-8a06-9327ee519d10"
  },
  {
    "id": "fa8e86bf-ad21-4cce-ba3c-6f9cafe374cc",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-appliquees-probabilites",
    "name": "Probabilités",
    "is_active": true,
    "sort": 30,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "c5e5fc20-50df-4fb4-97d7-abbdf602fbde"
  },
  {
    "id": "5236f8e4-8c9b-4ba5-b75b-6de3fbf11a5e",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "finance-marches-financiers",
    "name": "Marchés financiers",
    "is_active": true,
    "sort": 30,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "a0e23ece-cf3e-4921-ba19-35122152335a"
  },
  {
    "id": "7c583fb5-3566-4080-b6c5-703138e04a1a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-prive-droit-des-societes",
    "name": "Droit des sociétés",
    "is_active": true,
    "sort": 30,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "85195012-8914-4eef-bbde-817a04107bdb"
  },
  {
    "id": "560b6066-0d71-4cb3-9817-e8d329eb5a5a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-fondamentale-optique",
    "name": "Optique",
    "is_active": true,
    "sort": 30,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "d33c0846-10c1-4767-a35e-0efc1a7ae525"
  },
  {
    "id": "7598c10b-d9da-4cf0-aa7f-e6c434753493",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "marketing-etudes-de-marche",
    "name": "Études de marché",
    "is_active": true,
    "sort": 30,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "d3ff0e2a-c17f-43a0-ab7d-40fdc53f0436"
  },
  {
    "id": "bdd23244-47f8-4aa0-aed7-e906fafd4163",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "chimie-generale-chimie-minerale",
    "name": "Chimie minérale",
    "is_active": true,
    "sort": 30,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "da26ab65-bc81-416b-9cf3-7b7847e9e7b5"
  },
  {
    "id": "4aacd828-73bb-450f-a8fc-8910f62e8b7d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "microbiologie-biologie-moleculaire",
    "name": "Biologie moléculaire",
    "is_active": true,
    "sort": 30,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "f6d0d724-2850-4909-b014-a673c8a38683"
  },
  {
    "id": "a5ad161e-ecb6-455f-bd9e-907d67dbcda4",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "gestion-marketing",
    "name": "Marketing",
    "is_active": true,
    "sort": 30,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "1549d6f2-7c66-499d-9050-2d374692b80f"
  },
  {
    "id": "9ba91bdb-2c37-42d4-8ac4-5fe8c22375bb",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biologie-generale-genetique",
    "name": "Génétique",
    "is_active": true,
    "sort": 30,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "a39025b4-8104-48ea-af0e-642142095186"
  },
  {
    "id": "7347a672-75b3-4cec-8abf-8f8dcfa07eba",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "sciences-de-la-vie-microbiologie",
    "name": "Microbiologie",
    "is_active": true,
    "sort": 30,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "ab01c9ac-a5bc-484e-92c9-c4160ed1cf79"
  },
  {
    "id": "466226e7-5fd9-46e7-b375-24f1ea9ec311",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "cybersecurite-securite-reseau",
    "name": "Sécurité réseau",
    "is_active": true,
    "sort": 30,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "d5ce8ed3-a2e4-4313-b544-ea2dde8b8112"
  },
  {
    "id": "e98e8892-8f7e-42f7-9787-1b02ed89e9d2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-econometrie",
    "name": "Économétrie",
    "is_active": true,
    "sort": 30,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "1060214f-4c5c-449d-86fb-6c856ee16022"
  },
  {
    "id": "2729d609-1ca6-4340-8cdf-b8a8c0582730",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-mathematiques-pour-l-economie",
    "name": "Mathématiques pour l'économie",
    "is_active": true,
    "sort": 30,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "9748eecb-5634-4ae2-b229-2e3cc46fbc51"
  },
  {
    "id": "380bf506-5841-4ada-bb91-a89e1e71f9d6",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biotechnologie-bioprocedes",
    "name": "Bioprocédés",
    "is_active": true,
    "sort": 30,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "8a14600b-0ce9-4078-a127-d32c1507abc2"
  },
  {
    "id": "b205cbba-d7e3-4344-b243-8dc13cad7654",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "svt",
    "name": "SVT",
    "is_active": true,
    "sort": 30,
    "level_id": "5b675056-2eff-4be6-b7f1-0bef5357e8d4",
    "specialty_id": null
  },
  {
    "id": "c4130b54-64e7-4b60-9faf-d272240aad41",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biologie-physiologie",
    "name": "Physiologie",
    "is_active": true,
    "sort": 30,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "b30fec6d-5f94-4cfc-b268-6d82e4e0ff96"
  },
  {
    "id": "ae57f722-30ba-4d9d-9021-7e510ed1a9d6",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "gestion-management",
    "name": "Management",
    "is_active": true,
    "sort": 30,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "a3d0aae0-1495-4296-8228-9fe487fe3b63"
  },
  {
    "id": "cefb8275-27cd-4126-8692-4c68c736e1a5",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "finance-analyse-financiere",
    "name": "Analyse financière",
    "is_active": true,
    "sort": 30,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "47bcf7c4-05cf-44ab-801c-0a4de152bf3a"
  },
  {
    "id": "06688451-1862-4051-9a87-e8664cbefabd",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "finance-mathematiques-financieres",
    "name": "Mathématiques financières",
    "is_active": true,
    "sort": 30,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "9f01bed5-3e61-49f2-9771-cbb343901442"
  },
  {
    "id": "777c7860-9a16-4802-b7f0-10001c97ed40",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "chimie-chimie-physique",
    "name": "Chimie physique",
    "is_active": true,
    "sort": 30,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "08de8ca4-a3a3-467d-8183-b37114e35d78"
  },
  {
    "id": "93f828eb-e178-4202-bfc6-eb05ada7947b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais-litterature",
    "name": "Littérature",
    "is_active": true,
    "sort": 30,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "d28fc039-5791-495a-a90d-8b70c7b12b4b"
  },
  {
    "id": "511c8c7b-c9f4-40dc-a3de-07c05e0ac642",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 30,
    "level_id": "e48c535d-c2fd-4e94-9a59-76f14dd3ff83",
    "specialty_id": null
  },
  {
    "id": "145fc45b-8b96-43fa-932d-fefd59f6a101",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-thermodynamique",
    "name": "Thermodynamique",
    "is_active": true,
    "sort": 30,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "224ac14a-3c61-46db-9e7d-cfdd4a804ebe"
  },
  {
    "id": "64fff766-9952-421f-9fc1-be5c99c9d85c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "anglais-literature",
    "name": "Literature",
    "is_active": true,
    "sort": 30,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "51ff52e2-6a6e-403b-9a37-9aeb5dfc3911"
  },
  {
    "id": "67cdc16b-aa9e-469f-8400-d95ee8d474af",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-appliquees-analyse-numerique",
    "name": "Analyse numérique",
    "is_active": true,
    "sort": 30,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "c24ca943-6f67-40e0-a936-79510337420e"
  },
  {
    "id": "46d57968-0e7f-4be1-b949-f21103a88558",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe-linguistique",
    "name": "Linguistique",
    "is_active": true,
    "sort": 30,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "ab266d15-77b4-4adb-a726-fdea85f1b08d"
  },
  {
    "id": "36d34587-d757-4399-a5f4-7e19de3f9316",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 30,
    "level_id": "454308b9-b360-4362-bf1f-1df7e5cf5f00",
    "specialty_id": null
  },
  {
    "id": "c3c6d2ae-f92d-450c-b9b7-5e37e49f47e0",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-probabilites",
    "name": "Probabilités",
    "is_active": true,
    "sort": 30,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "a311491f-8ae6-4d4a-a67d-d183e2fe8846"
  },
  {
    "id": "edc5dc5b-264c-4750-8434-e29bcf165113",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-appliquees-optimisation",
    "name": "Optimisation",
    "is_active": true,
    "sort": 30,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "44e2e97a-ecf0-44a5-9fa0-807fc4aab5bf"
  },
  {
    "id": "ac63fca0-4dae-4f90-9072-73931bbd760e",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "data-bases-de-donnees",
    "name": "Bases de données",
    "is_active": true,
    "sort": 30,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "dae38c72-733e-4a14-95da-85157d11fa33"
  },
  {
    "id": "0daa39ca-6a6e-4d86-93d1-f015fada1dda",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "reseaux-securite-informatique",
    "name": "Sécurité informatique",
    "is_active": true,
    "sort": 30,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "87b0e936-4b84-47fb-a742-32e2f28202fd"
  },
  {
    "id": "399498bb-50cb-48bb-b6d1-c681a7a9ff1f",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "anglais",
    "name": "Anglais",
    "is_active": true,
    "sort": 30,
    "level_id": "812980eb-7c5f-4bbd-8970-2dfa31a8b37f",
    "specialty_id": null
  },
  {
    "id": "75caf288-9c88-47a7-b90c-eb461ebce112",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-appliquees-optimisation",
    "name": "Optimisation",
    "is_active": true,
    "sort": 30,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "8bbc53a8-2fc7-4a18-8407-dffafd4c6158"
  },
  {
    "id": "b602fd93-6bf6-4407-bd7f-6fb82c65d8f9",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "developpement-logiciel-bases-de-donnees",
    "name": "Bases de données",
    "is_active": true,
    "sort": 30,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "829c3e80-3579-4c74-83ed-d0fdaf94e763"
  },
  {
    "id": "e5df5147-4fa9-4e1a-8050-818c47bae3c5",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "reseaux-cloud-administration-systemes",
    "name": "Administration systèmes",
    "is_active": true,
    "sort": 30,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "53ae629d-79fd-44c3-913b-16af91bceaf2"
  },
  {
    "id": "7adac0c1-7b75-46ba-a71e-0dacade1cde3",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 30,
    "level_id": "36f28f73-936f-48e2-850e-9775d430ff3a",
    "specialty_id": null
  },
  {
    "id": "605f42e0-4970-401d-b8be-5f0efff49dc2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-des-affaires-fiscalite",
    "name": "Fiscalité",
    "is_active": true,
    "sort": 30,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "564f28ba-f43f-4bbc-9b18-1ed1bda15f80"
  },
  {
    "id": "5dc303d5-3aae-452e-9b82-d8b98252ae88",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "cybersecurite-securite-des-systemes",
    "name": "Sécurité des systèmes",
    "is_active": true,
    "sort": 30,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "cea788cf-d790-4d42-a2db-9be6ac4fc7d6"
  },
  {
    "id": "1ced0718-f4c7-40a4-8737-a66098594c45",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "comptabilite",
    "name": "Comptabilité",
    "is_active": true,
    "sort": 30,
    "level_id": "b1944375-57d2-4718-bff8-50a7557c1c75",
    "specialty_id": null
  },
  {
    "id": "344c1cbc-25f0-4bfd-8e6b-6a814c6f31a1",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "marketing-etudes-de-marche",
    "name": "Études de marché",
    "is_active": true,
    "sort": 30,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "dfea8bf6-5686-491b-b03d-50c0f51bf140"
  },
  {
    "id": "83582618-59fd-4de4-ad9b-b28bbafaae19",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 30,
    "level_id": "2c5810e9-696e-4ff9-8cde-921dc9172a1a",
    "specialty_id": null
  },
  {
    "id": "b2e13823-71d4-48ea-84bf-b1195b31c793",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "comptabilite-audit",
    "name": "Audit",
    "is_active": true,
    "sort": 30,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "07e15b66-31c1-4478-b8d3-a05440dacf55"
  },
  {
    "id": "9b54ab04-1589-4dd4-a29d-132a32842fb5",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "sciences-de-l-ingenieur",
    "name": "Sciences de l'ingénieur",
    "is_active": true,
    "sort": 30,
    "level_id": "bc5b88ae-e2f4-4cfc-b98a-16c861ea20f4",
    "specialty_id": null
  },
  {
    "id": "2d22511a-43dd-429b-a066-eb9d285ad3b7",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 30,
    "level_id": "fba10050-7af3-4cc9-925d-2edf6a08aa02",
    "specialty_id": null
  },
  {
    "id": "43b165f6-d997-4dba-8370-3ab26c837111",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "economie-macroeconomie",
    "name": "Macroéconomie",
    "is_active": true,
    "sort": 30,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "c7b72286-42a2-4f9d-b363-d347ffb14618"
  },
  {
    "id": "9215fb0b-36c2-4a27-a3cd-44c1c2e11410",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "intelligence-artificielle-ia",
    "name": "IA",
    "is_active": true,
    "sort": 30,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "2c715011-48c5-4b61-a386-25ab8129f995"
  },
  {
    "id": "de46a9d6-b0dd-4702-a17f-ddf10d66bb1d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biotechnologie-bioprocedes",
    "name": "Bioprocédés",
    "is_active": true,
    "sort": 30,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "50dc845d-eff2-47c9-af9f-6d9dc3a73e8a"
  },
  {
    "id": "e7b7d8fd-436e-4543-966f-94dbb3b1a8d5",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "data-science-machine-learning",
    "name": "Machine Learning",
    "is_active": true,
    "sort": 30,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "8734ac36-5893-44de-be42-e0158d9572cc"
  },
  {
    "id": "c7579779-a985-4dc8-aa1f-771e8ac57604",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "microbiologie-virologie",
    "name": "Virologie",
    "is_active": true,
    "sort": 30,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "1fe249da-62c8-4557-92ce-dccc704b25ab"
  },
  {
    "id": "c0073c1e-2ea0-477b-97a1-3cd31cffb620",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "svt",
    "name": "SVT",
    "is_active": true,
    "sort": 30,
    "level_id": "2c43a0f8-814e-4e8b-a1aa-a37c6c6ad6b3",
    "specialty_id": null
  },
  {
    "id": "120aef63-f35c-4da6-a777-5627cf792a9f",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "genie-logiciel-devops",
    "name": "DevOps",
    "is_active": true,
    "sort": 30,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "46e7d71b-b610-4c1b-a85a-445c25056dc2"
  },
  {
    "id": "92f936d0-b500-4b77-8a6e-c903db678a81",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "chimie-chimie-physique",
    "name": "Chimie physique",
    "is_active": true,
    "sort": 30,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "17043690-8a7e-4fe3-990f-3a44e5ffad53"
  },
  {
    "id": "cd8d4b87-7160-44e7-9385-b66ce0ae2b44",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 30,
    "level_id": "5287862d-26a3-49cf-9508-d9c7a64d958e",
    "specialty_id": null
  },
  {
    "id": "03c74cec-cc3e-4364-aae9-03a64942eecf",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-physique-statistique",
    "name": "Physique statistique",
    "is_active": true,
    "sort": 30,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "6038160b-38a5-47a4-b759-076e2839ee48"
  },
  {
    "id": "e8314f5e-c560-47cb-b124-4bf600478613",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-appliquees-optimisation",
    "name": "Optimisation",
    "is_active": true,
    "sort": 30,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "6a2ab8e5-c4ba-4a75-9044-e2fb20de84f6"
  },
  {
    "id": "b31ea37d-1518-43bc-baac-83eb68f05b3e",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "anglais",
    "name": "Anglais",
    "is_active": true,
    "sort": 30,
    "level_id": "ee70538d-95e1-4528-8ac2-693cdfe46db2",
    "specialty_id": null
  },
  {
    "id": "d3016752-d0d0-4782-80b8-721c485b125e",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-probabilites",
    "name": "Probabilités",
    "is_active": true,
    "sort": 30,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "2fac41bf-72ed-4219-9c93-0637d68ac67e"
  },
  {
    "id": "ca417ff4-cc0e-4fdf-980c-6ee038f996bc",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "reseaux-systemes-cloud",
    "name": "Cloud",
    "is_active": true,
    "sort": 30,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "55557813-86d8-4230-94bb-a372e4e3f889"
  },
  {
    "id": "1f724399-b307-4090-9a84-f37dd40d89d5",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "cybersecurite-securite-des-reseaux",
    "name": "Sécurité des réseaux",
    "is_active": true,
    "sort": 30,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "d9620cb5-c4c2-4270-916d-03191f8d583c"
  },
  {
    "id": "c10cb0ba-b795-476f-a37c-355415e30239",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biotechnologie-bioproduction",
    "name": "Bioproduction",
    "is_active": true,
    "sort": 30,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "d323a91e-517a-4f50-a759-80cc7cc17790"
  },
  {
    "id": "098cebd9-606b-44bf-9862-81cb3302bc16",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "data-science-machine-learning",
    "name": "Machine Learning",
    "is_active": true,
    "sort": 30,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "aa1fe99b-5e60-443a-bbdc-0ad0146bd60c"
  },
  {
    "id": "ce37e957-12a6-4f10-aa8f-677f38e7dcf2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-des-affaires-droit-commercial",
    "name": "Droit commercial",
    "is_active": true,
    "sort": 30,
    "level_id": "1db81555-b0a5-415d-a249-9e90f8ad58f9",
    "specialty_id": "f68169e4-f096-4ccc-918c-3167bec1af36"
  },
  {
    "id": "b661c595-66f4-4c49-aa03-a1c074af69c1",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "intelligence-artificielle-python",
    "name": "Python",
    "is_active": true,
    "sort": 30,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "f90c8462-6a13-4948-91a4-a67aa33876bd"
  },
  {
    "id": "9d81892d-f0d7-4f0a-aa45-1e5d98f7fac4",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "comptabilite",
    "name": "Comptabilité",
    "is_active": true,
    "sort": 30,
    "level_id": "9f8c8ca2-f771-4766-85af-f8d2ebd00741",
    "specialty_id": null
  },
  {
    "id": "f103e0b3-8b14-4749-af36-4405a27c6c3d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "genie-logiciel-programmation-avancee",
    "name": "Programmation avancée",
    "is_active": true,
    "sort": 30,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "1645fe7b-5e8b-4d62-bce6-6e21d315c30c"
  },
  {
    "id": "68edf07c-8e63-4edc-94ac-ffc960d261ca",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques",
    "name": "Mathématiques",
    "is_active": true,
    "sort": 30,
    "level_id": "253dae1f-7e1e-4f42-88b2-125b70769761",
    "specialty_id": null
  },
  {
    "id": "64e87148-73ff-4227-9b78-6ca1d9930eae",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "sciences-de-l-ingenieur",
    "name": "Sciences de l'ingénieur",
    "is_active": true,
    "sort": 30,
    "level_id": "fd50ce22-478a-4ab1-b6e9-e9ce84bf881d",
    "specialty_id": null
  },
  {
    "id": "826d5d0b-61e7-47ab-b85e-f39aca45f3e2",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 30,
    "level_id": "e08768b7-4732-4d57-94f8-023357895cd3",
    "specialty_id": null
  },
  {
    "id": "a8da158c-5646-4547-ad4f-376d0fdd0369",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "droit-des-affaires-droit-commercial",
    "name": "Droit commercial",
    "is_active": true,
    "sort": 30,
    "level_id": "aa639154-068e-4b0b-8ca4-eb70cf8bbf14",
    "specialty_id": "8e534b70-89af-4a58-917f-9430257e207f"
  },
  {
    "id": "52f4d889-6945-4536-a116-dc65912e146d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "anglais",
    "name": "Anglais",
    "is_active": true,
    "sort": 40,
    "level_id": "36f28f73-936f-48e2-850e-9775d430ff3a",
    "specialty_id": null
  },
  {
    "id": "a676b0c5-f9b5-4b06-87bd-f0c3f1482d4e",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "anglais",
    "name": "Anglais",
    "is_active": true,
    "sort": 40,
    "level_id": "e08768b7-4732-4d57-94f8-023357895cd3",
    "specialty_id": null
  },
  {
    "id": "5c49275e-189d-4b56-8bd0-ea92463b1376",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "gestion",
    "name": "Gestion",
    "is_active": true,
    "sort": 40,
    "level_id": "b1944375-57d2-4718-bff8-50a7557c1c75",
    "specialty_id": null
  },
  {
    "id": "8e93a548-402f-4dff-9843-19cdb9128aaa",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-fondamentale-thermodynamique",
    "name": "Thermodynamique",
    "is_active": true,
    "sort": 40,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "d33c0846-10c1-4767-a35e-0efc1a7ae525"
  },
  {
    "id": "0fe979b7-5c2a-45f2-8cd8-970360ac4d3c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 40,
    "level_id": "bc5b88ae-e2f4-4cfc-b98a-16c861ea20f4",
    "specialty_id": null
  },
  {
    "id": "9f66e3d7-ae0a-4880-9842-e4006f9a5e5a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "activites-scientifiques",
    "name": "Activités scientifiques",
    "is_active": true,
    "sort": 40,
    "level_id": "454308b9-b360-4362-bf1f-1df7e5cf5f00",
    "specialty_id": null
  },
  {
    "id": "9c924120-1145-4fb8-862f-2112f4c77aeb",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "philosophie",
    "name": "Philosophie",
    "is_active": true,
    "sort": 40,
    "level_id": "812980eb-7c5f-4bbd-8970-2dfa31a8b37f",
    "specialty_id": null
  },
  {
    "id": "74a3e902-e753-4d2b-b806-dc7099badacf",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "gestion",
    "name": "Gestion",
    "is_active": true,
    "sort": 40,
    "level_id": "9f8c8ca2-f771-4766-85af-f8d2ebd00741",
    "specialty_id": null
  },
  {
    "id": "1c9366e3-6090-4b4b-b4e6-de51a4ce16ce",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "activites-scientifiques",
    "name": "Activités scientifiques",
    "is_active": true,
    "sort": 40,
    "level_id": "e48c535d-c2fd-4e94-9a59-76f14dd3ff83",
    "specialty_id": null
  },
  {
    "id": "77c0bfb6-4c7f-467c-8480-e28e2fa89cfc",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "anglais",
    "name": "Anglais",
    "is_active": true,
    "sort": 40,
    "level_id": "5287862d-26a3-49cf-9508-d9c7a64d958e",
    "specialty_id": null
  },
  {
    "id": "eceec503-1b89-4441-99b0-6c12345c8583",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 40,
    "level_id": "2c43a0f8-814e-4e8b-a1aa-a37c6c6ad6b3",
    "specialty_id": null
  },
  {
    "id": "53c9bde5-489c-4ba2-a808-ff16b5dcf870",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "developpement-logiciel-genie-logiciel",
    "name": "Génie logiciel",
    "is_active": true,
    "sort": 40,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "829c3e80-3579-4c74-83ed-d0fdaf94e763"
  },
  {
    "id": "c39b3c58-af7d-49e7-92a2-47e83266c429",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-physique-quantique",
    "name": "Physique quantique",
    "is_active": true,
    "sort": 40,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "224ac14a-3c61-46db-9e7d-cfdd4a804ebe"
  },
  {
    "id": "70ad36c5-6964-4ccf-b4b5-1b955215a3f0",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "gestion-marketing",
    "name": "Marketing",
    "is_active": true,
    "sort": 40,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "a3d0aae0-1495-4296-8228-9fe487fe3b63"
  },
  {
    "id": "e5f0ca10-8a7b-4fab-a462-147781011901",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "gestion-management",
    "name": "Management",
    "is_active": true,
    "sort": 40,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "1549d6f2-7c66-499d-9050-2d374692b80f"
  },
  {
    "id": "f54f5d7f-8596-4332-a667-695c26c59bbe",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "activites-scientifiques",
    "name": "Activités scientifiques",
    "is_active": true,
    "sort": 40,
    "level_id": "1fe871aa-9e91-4ac5-90b5-1d2e521fe0cb",
    "specialty_id": null
  },
  {
    "id": "340b84c8-69d5-4657-96d6-982f8d55eff3",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 40,
    "level_id": "5b675056-2eff-4be6-b7f1-0bef5357e8d4",
    "specialty_id": null
  },
  {
    "id": "451ce317-6934-422a-ad5e-a31a4828d151",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-appliquees-statistiques",
    "name": "Statistiques",
    "is_active": true,
    "sort": 40,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "c5e5fc20-50df-4fb4-97d7-abbdf602fbde"
  },
  {
    "id": "9a16f7a3-5807-4d7c-a31f-a00a7e589a26",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-statistiques",
    "name": "Statistiques",
    "is_active": true,
    "sort": 40,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "a311491f-8ae6-4d4a-a67d-d183e2fe8846"
  },
  {
    "id": "86d5eaee-1643-4572-b425-6626a7ed69bb",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "philosophie",
    "name": "Philosophie",
    "is_active": true,
    "sort": 40,
    "level_id": "ee70538d-95e1-4528-8ac2-693cdfe46db2",
    "specialty_id": null
  },
  {
    "id": "a11d0b2c-6516-4a7d-9025-0fbadffe5860",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "activites-scientifiques",
    "name": "Activités scientifiques",
    "is_active": true,
    "sort": 40,
    "level_id": "253dae1f-7e1e-4f42-88b2-125b70769761",
    "specialty_id": null
  },
  {
    "id": "ef4940ed-838e-4232-995d-9ebae95e5b2e",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "biologie-biochimie",
    "name": "Biochimie",
    "is_active": true,
    "sort": 40,
    "level_id": "73d9510a-7078-46d0-8d3e-de21e3d5f0f4",
    "specialty_id": "b30fec6d-5f94-4cfc-b268-6d82e4e0ff96"
  },
  {
    "id": "744db0f0-134d-4823-9abf-2cb64512aff9",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "informatique-generale-systemes-d-exploitation",
    "name": "Systèmes d'exploitation",
    "is_active": true,
    "sort": 40,
    "level_id": "f19031d6-d628-4dad-a281-27b45d044844",
    "specialty_id": "20fc8dc7-b23b-4859-8a06-9327ee519d10"
  },
  {
    "id": "3a6247ef-24bc-4b8a-a240-656c095327d6",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "activites-scientifiques",
    "name": "Activités scientifiques",
    "is_active": true,
    "sort": 40,
    "level_id": "fba10050-7af3-4cc9-925d-2edf6a08aa02",
    "specialty_id": null
  },
  {
    "id": "b2cd8c81-152e-4e3d-b60b-c35ec927878a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 40,
    "level_id": "8841f69f-e4a3-4e90-8e8d-f29604acf596",
    "specialty_id": null
  },
  {
    "id": "8f55ef47-0562-4036-9a8a-fd74cc23c480",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "mathematiques-statistiques",
    "name": "Statistiques",
    "is_active": true,
    "sort": 40,
    "level_id": "44f23e07-3be8-4ecb-9533-7987e5088235",
    "specialty_id": "2fac41bf-72ed-4219-9c93-0637d68ac67e"
  },
  {
    "id": "593920cf-04a1-4e25-b967-44231e470b0a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 40,
    "level_id": "fd50ce22-478a-4ab1-b6e9-e9ce84bf881d",
    "specialty_id": null
  },
  {
    "id": "bafbafae-5bcb-4475-ae3c-4e52b2c076fb",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "activites-scientifiques",
    "name": "Activités scientifiques",
    "is_active": true,
    "sort": 40,
    "level_id": "2c5810e9-696e-4ff9-8cde-921dc9172a1a",
    "specialty_id": null
  },
  {
    "id": "349df263-fb91-4f88-b092-e9b2d1efef24",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 50,
    "level_id": "9f8c8ca2-f771-4766-85af-f8d2ebd00741",
    "specialty_id": null
  },
  {
    "id": "eea2abb0-2851-4bb5-a90c-65c034e099e5",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-chimie",
    "name": "Physique-Chimie",
    "is_active": true,
    "sort": 50,
    "level_id": "5287862d-26a3-49cf-9508-d9c7a64d958e",
    "specialty_id": null
  },
  {
    "id": "a8273f95-2052-425a-8b4a-d1a3973125cc",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-chimie",
    "name": "Physique-Chimie",
    "is_active": true,
    "sort": 50,
    "level_id": "36f28f73-936f-48e2-850e-9775d430ff3a",
    "specialty_id": null
  },
  {
    "id": "0695499c-d543-4084-ab28-1d392027eed9",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "anglais",
    "name": "Anglais",
    "is_active": true,
    "sort": 50,
    "level_id": "2c43a0f8-814e-4e8b-a1aa-a37c6c6ad6b3",
    "specialty_id": null
  },
  {
    "id": "f3103e87-6756-4ac7-87d3-cec9acd9489d",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "anglais",
    "name": "Anglais",
    "is_active": true,
    "sort": 50,
    "level_id": "bc5b88ae-e2f4-4cfc-b98a-16c861ea20f4",
    "specialty_id": null
  },
  {
    "id": "1e0071c4-38f5-4e1d-8c15-a400030b9cb9",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "histoire-geographie",
    "name": "Histoire-Géographie",
    "is_active": true,
    "sort": 50,
    "level_id": "ee70538d-95e1-4528-8ac2-693cdfe46db2",
    "specialty_id": null
  },
  {
    "id": "e3dae9df-525f-4870-974e-3733e769567c",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "histoire-geographie",
    "name": "Histoire-Géographie",
    "is_active": true,
    "sort": 50,
    "level_id": "812980eb-7c5f-4bbd-8970-2dfa31a8b37f",
    "specialty_id": null
  },
  {
    "id": "a6e776f3-ae64-4c16-a457-93d2588340bf",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "physique-chimie",
    "name": "Physique-Chimie",
    "is_active": true,
    "sort": 50,
    "level_id": "e08768b7-4732-4d57-94f8-023357895cd3",
    "specialty_id": null
  },
  {
    "id": "143a3105-d04d-4995-9360-7255176f407e",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "anglais",
    "name": "Anglais",
    "is_active": true,
    "sort": 50,
    "level_id": "5b675056-2eff-4be6-b7f1-0bef5357e8d4",
    "specialty_id": null
  },
  {
    "id": "0d593e14-1d21-4427-8086-26074bcc32e5",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "francais",
    "name": "Français",
    "is_active": true,
    "sort": 50,
    "level_id": "b1944375-57d2-4718-bff8-50a7557c1c75",
    "specialty_id": null
  },
  {
    "id": "f0c4f8ba-6037-4349-b76b-a135f4e7b62a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "anglais",
    "name": "Anglais",
    "is_active": true,
    "sort": 50,
    "level_id": "fd50ce22-478a-4ab1-b6e9-e9ce84bf881d",
    "specialty_id": null
  },
  {
    "id": "dbb1dd2a-10b8-443e-b151-8fd5ae293e3b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "anglais",
    "name": "Anglais",
    "is_active": true,
    "sort": 50,
    "level_id": "8841f69f-e4a3-4e90-8e8d-f29604acf596",
    "specialty_id": null
  },
  {
    "id": "8fe93888-e9ee-4726-960e-4812f56ecd17",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "anglais",
    "name": "Anglais",
    "is_active": true,
    "sort": 60,
    "level_id": "9f8c8ca2-f771-4766-85af-f8d2ebd00741",
    "specialty_id": null
  },
  {
    "id": "19c1ab39-b2e9-4e81-9649-11551c251a6b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 60,
    "level_id": "fd50ce22-478a-4ab1-b6e9-e9ce84bf881d",
    "specialty_id": null
  },
  {
    "id": "3f69eff4-c6af-45ed-a89e-d9b648966e5b",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 60,
    "level_id": "2c43a0f8-814e-4e8b-a1aa-a37c6c6ad6b3",
    "specialty_id": null
  },
  {
    "id": "a9f75200-48b5-444c-89cf-5e68fcedacb1",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "sciences-de-la-vie-et-de-la-terre-svt",
    "name": "Sciences de la Vie et de la Terre (SVT)",
    "is_active": true,
    "sort": 60,
    "level_id": "5287862d-26a3-49cf-9508-d9c7a64d958e",
    "specialty_id": null
  },
  {
    "id": "699974a1-b2db-4aab-b06f-921f135e5b73",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 60,
    "level_id": "bc5b88ae-e2f4-4cfc-b98a-16c861ea20f4",
    "specialty_id": null
  },
  {
    "id": "a87be40f-ff8d-4b02-a207-a0e54a42675e",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "anglais",
    "name": "Anglais",
    "is_active": true,
    "sort": 60,
    "level_id": "b1944375-57d2-4718-bff8-50a7557c1c75",
    "specialty_id": null
  },
  {
    "id": "57c988ad-e0cd-4a96-b25b-b8b95832e52a",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "sciences-de-la-vie-et-de-la-terre-svt",
    "name": "Sciences de la Vie et de la Terre (SVT)",
    "is_active": true,
    "sort": 60,
    "level_id": "e08768b7-4732-4d57-94f8-023357895cd3",
    "specialty_id": null
  },
  {
    "id": "82b68eaa-dcd0-4254-92bb-acb923b76b42",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 60,
    "level_id": "5b675056-2eff-4be6-b7f1-0bef5357e8d4",
    "specialty_id": null
  },
  {
    "id": "463c1802-3bfe-48bc-a4e1-98d60731d3de",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 60,
    "level_id": "8841f69f-e4a3-4e90-8e8d-f29604acf596",
    "specialty_id": null
  },
  {
    "id": "71878b5b-a6a4-4601-af61-2cbb4d9f2df8",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "sciences-de-la-vie-et-de-la-terre-svt",
    "name": "Sciences de la Vie et de la Terre (SVT)",
    "is_active": true,
    "sort": 60,
    "level_id": "36f28f73-936f-48e2-850e-9775d430ff3a",
    "specialty_id": null
  },
  {
    "id": "375f8332-d193-4e5e-b94f-b82e65a757e6",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 70,
    "level_id": "9f8c8ca2-f771-4766-85af-f8d2ebd00741",
    "specialty_id": null
  },
  {
    "id": "dd9de02b-411a-4587-8d8d-2ff5df1349b7",
    "category_id": "f8c8e695-18a8-4436-ac26-a5f93eed8c6f",
    "slug": "arabe",
    "name": "Arabe",
    "is_active": true,
    "sort": 70,
    "level_id": "b1944375-57d2-4718-bff8-50a7557c1c75",
    "specialty_id": null
  }
];
