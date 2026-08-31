# Remix of Remix of Remix of Remix of Remix of Connect & Learn

PROJET : Plateforme intelligente de mise en relation élèves/parents ↔ professeurs particuliers

OBJECTIF GÉNÉRAL

Créer une application web/mobile-first permettant à une personne de dire simplement :

« J'ai besoin d'un professeur de maths pour mon fils, niveau 3e, à Agadir, samedi après-midi, budget maximum 100 DH/h. »

La plateforme analyse la demande et permet de trouver les professeurs correspondant aux critères :

- matière

- niveau

- localisation

- disponibilité

- budget

- mode de cours (à domicile / en ligne)

- expérience

- note

- distance

L'objectif n'est PAS de créer un simple annuaire de professeurs.

L'objectif est de créer une marketplace où :

CLIENT → exprime un besoin → reçoit des propositions → choisit un professeur → échange → réserve.

Le système doit être conçu dès le départ de manière extensible afin de pouvoir, dans une future version, appliquer exactement le même modèle à d'autres catégories de professionnels :

plombiers, électriciens, mécaniciens, réparateurs, photographes, etc.

==================================================

1. TYPES D'UTILISATEURS

==================================================

A. CLIENT

Le client peut être :

- parent

- étudiant

- élève majeur

- personne recherchant une formation

Le client peut :

- créer un compte

- rechercher un professeur

- publier une demande

- recevoir des propositions

- comparer les professeurs

- discuter avec eux

- réserver

- noter le professeur

- consulter son historique

L'inscription et la recherche doivent être gratuites.

--------------------------------------------------

B. PROFESSEUR / PROFESSIONNEL

Le professeur peut :

- créer son profil

- renseigner ses matières

- renseigner les niveaux enseignés

- définir ses tarifs

- définir sa zone géographique

- définir ses disponibilités

- choisir cours à domicile / en ligne

- recevoir des demandes

- envoyer des propositions

- discuter avec les clients

- gérer ses réservations

- consulter ses revenus

- recevoir des avis

Le professeur dispose d'un système FREEMIUM + ABONNEMENT.

==================================================

2. MODÈLE FREEMIUM

==================================================

Créer trois niveaux :

PLAN GRATUIT

- création du profil

- profil visible

- nombre limité de demandes reçues par mois

- possibilité de répondre à un nombre limité de demandes

- messagerie limitée

- statistiques basiques

PLAN PRO

Prix configurable depuis l'administration.

Exemple initial : 99 DH/mois.

Fonctionnalités :

- davantage ou totalité des demandes

- visibilité améliorée

- accès complet aux demandes correspondant au profil

- messagerie complète

- calendrier de disponibilité

- statistiques

- gestion des réservations

- profil professionnel amélioré

- badge "Pro"

PLAN PREMIUM

Prix configurable depuis l'administration.

Exemple initial : 199 DH/mois.

Fonctionnalités :

- toutes les fonctions Pro

- visibilité prioritaire

- profil mis en avant

- statistiques avancées

- outils professionnels supplémentaires

- possibilité de recevoir davantage de demandes

- badge Premium

IMPORTANT :

Les prix doivent être configurables depuis le dashboard administrateur et ne doivent PAS être codés en dur.

==================================================

3. MODÈLE ÉCONOMIQUE

==================================================

Le client ne paie pas pour utiliser la recherche.

Le revenu principal de la plateforme au lancement est l'abonnement des professeurs.

Prévoir cependant dans l'architecture la possibilité d'ajouter plus tard :

- commission sur les paiements

- paiement intégré

- frais de réservation

- mise en avant payante

- publicité

- abonnements professionnels supplémentaires

Ne pas développer toutes ces fonctions maintenant si elles ne sont pas nécessaires au MVP.

L'architecture doit simplement permettre leur ajout futur.

==================================================

4. ONBOARDING CLIENT

==================================================

Lorsqu'un client arrive, afficher clairement :

"De quoi avez-vous besoin ?"

Le client peut sélectionner :

1. Matière

2. Niveau

3. Localisation

4. Type de cours

5. Disponibilité

6. Budget

7. Préférences

Exemple :

Matière :

- Mathématiques

- Physique

- Chimie

- Français

- Anglais

- Arabe

- SVT

- Informatique

- etc.

Niveau :

- Primaire

- Collège

- Lycée

- Université

- Formation professionnelle

- Adulte

Localisation :

- ville

- quartier

- localisation GPS facultative

Type :

- à domicile

- chez le professeur

- en ligne

Budget :

- tarif horaire minimum

- tarif horaire maximum

Disponibilité :

- jours

- heures

- possibilité de sélectionner plusieurs créneaux

==================================================

5. PUBLICATION D'UNE DEMANDE

==================================================

Le client peut publier une demande.

Exemple :

"Je cherche un professeur de maths pour un élève de 3e à Agadir.

Cours à domicile.

Samedi et dimanche après-midi.

Budget maximum : 100 DH/h."

La demande doit générer un objet "Request" en base de données.

Champs :

- ID

- client_id

- matière

- niveau

- ville

- quartier

- latitude

- longitude

- type_cours

- budget_min

- budget_max

- disponibilités

- description

- statut

- date de création

- date d'expiration

Statuts :

- active

- proposals_received

- booked

- completed

- cancelled

- expired

==================================================

6. MATCHING INTELLIGENT

==================================================

Créer un moteur de matching entre demandes et professeurs.

Le système doit prendre en compte :

- matière

- niveau

- localisation

- distance

- disponibilité

- budget

- type de cours

- expérience

- note

- statut du compte

- abonnement

Créer un score de correspondance.

Exemple :

Matière : 30 %

Niveau : 20 %

Disponibilité : 20 %

Localisation : 15 %

Budget : 10 %

Note/expérience : 5 %

Ces pondérations doivent être configurables depuis l'administration.

Afficher par exemple :

"92 % compatible"

"87 % compatible"

"78 % compatible"

Ne jamais présenter comme "100 % compatible" si tous les critères ne sont pas réellement vérifiés.

==================================================

7. SYSTÈME DE PROPOSITIONS

==================================================

Lorsqu'une demande est publiée :

Le système identifie les professeurs compatibles.

Les professeurs reçoivent une notification :

"Nouvelle demande correspondant à votre profil."

Ils peuvent :

- accepter de répondre

- proposer leur tarif

- proposer un créneau

- envoyer un message

- refuser

Exemple :

CLIENT :

Mathématiques - 3e

Agadir

Samedi 15h

Budget max 100 DH

PROFESSEUR :

"Je peux assurer le cours samedi à 15h.

Tarif : 90 DH/h."

Le client reçoit la proposition.

==================================================

8. COMPARAISON DES PROFESSEURS

==================================================

Le client doit pouvoir comparer plusieurs propositions.

Afficher :

- photo

- nom

- matière

- niveaux

- expérience

- tarif

- distance

- disponibilité

- note

- nombre d'avis

- type de cours

- badge

- vérification du profil

Boutons :

"Voir le profil"

"Contacter"

"Choisir"

"Réserver"

==================================================

9. PROFIL PROFESSEUR

==================================================

Créer une page professionnelle complète.

Informations :

- photo

- nom

- présentation

- matières

- niveaux

- expérience

- diplômes/certifications

- langues

- localisation

- zone de déplacement

- tarif

- disponibilités

- cours en ligne

- cours à domicile

- avis

- nombre de cours réalisés

- taux de réponse

- date d'inscription

- badge vérifié

- badge Pro/Premium

Ne jamais afficher des informations personnelles sensibles inutilement.

==================================================

10. DISPONIBILITÉS

==================================================

Créer un calendrier permettant au professeur de définir :

- jours disponibles

- heures disponibles

- créneaux récurrents

- indisponibilités

Le client doit pouvoir rechercher selon un créneau.

Exemple :

"Samedi 14h-18h"

Le système ne doit proposer en priorité que les professeurs réellement disponibles.

==================================================

11. LOCALISATION

==================================================

Utiliser la géolocalisation uniquement lorsque nécessaire.

Le professeur définit :

- ville

- quartiers desservis

- rayon de déplacement

Le client peut définir :

- ville

- quartier

- localisation

Afficher une distance approximative :

"1,8 km"

"4,2 km"

Prévoir une intégration cartographique mais éviter de rendre les cartes obligatoires partout.

==================================================

12. MESSAGERIE

==================================================

Créer une messagerie interne.

Client ↔ Professeur

Fonctions :

- messages texte

- notifications

- statut lu/non lu

- historique

- blocage/signalement

IMPORTANT :

Ne pas exposer automatiquement le numéro WhatsApp ou téléphone du client au professeur avant une réservation confirmée.

L'objectif est de limiter le contournement de la plateforme.

==================================================

13. RÉSERVATION

==================================================

Flux :

Demande

→ proposition

→ sélection du professeur

→ confirmation

→ réservation

→ cours

→ terminé

→ évaluation

Créer un statut pour chaque réservation :

- pending

- confirmed

- cancelled

- completed

- disputed

==================================================

14. AVIS ET NOTATIONS

==================================================

Après une prestation terminée :

Le client peut noter :

- note générale

- ponctualité

- qualité

- communication

Le professeur peut également évaluer le client si nécessaire.

Les avis doivent être liés à une réservation réelle afin d'éviter les faux avis.

==================================================

15. NOTIFICATIONS

==================================================

Notifications :

- nouvelle demande

- nouvelle proposition

- nouveau message

- réservation acceptée

- réservation annulée

- rappel de cours

- expiration d'une demande

- renouvellement abonnement

- paiement abonnement

- nouveau commentaire

Prévoir :

- notifications dans l'application

- email

- push mobile si application mobile

==================================================

16. ABONNEMENTS

==================================================

Créer une vraie gestion d'abonnement.

Chaque professeur possède :

- plan actuel

- date de début

- date d'expiration

- statut

- historique des paiements

Statuts :

- active

- trial

- expired

- cancelled

- pending

Prévoir :

- période d'essai configurable

- renouvellement

- annulation

- changement de plan

- facture/reçu

- historique

Le moyen de paiement doit être configurable selon le marché ciblé.

==================================================

17. ADMIN DASHBOARD

==================================================

Créer un dashboard administrateur complet.

Dashboard :

- nombre de clients

- nombre de professeurs

- nouveaux utilisateurs

- demandes actives

- réservations

- abonnements

- revenus

- taux de conversion

- professeurs actifs

- demandes sans réponse

Gestion utilisateurs :

- clients

- professeurs

- suspension

- suppression

- vérification

Gestion professeurs :

- validation des profils

- validation des documents

- badges

- abonnement

- statistiques

Gestion demandes :

- consulter

- modifier

- supprimer

- signaler

- modérer

Gestion abonnements :

- plans

- prix

- durée

- fonctionnalités

- promotions

- période d'essai

Gestion catégories :

- matières

- niveaux

- villes

- quartiers

==================================================

18. VÉRIFICATION DES PROFESSEURS

==================================================

Prévoir un système de vérification.

Le professeur peut envoyer :

- pièce d'identité

- diplôme

- certificat

- justificatifs selon la catégorie

L'administrateur valide manuellement.

Afficher :

"Profil vérifié"

uniquement après validation réelle.

==================================================

19. ANTI-FRAUDE / ANTI-CONTOURNEMENT

==================================================

Prévoir :

- messagerie interne

- détection de numéros de téléphone dans les messages

- détection de liens externes

- système de signalement

- blocage

- historique des réservations

- réputation

- vérification professionnelle

Le système ne doit pas être agressif au point de bloquer les conversations normales.

==================================================

20. DESIGN UX/UI

==================================================

Design moderne, professionnel et très simple.

Priorité :

MOBILE FIRST.

L'écran principal doit être extrêmement simple.

Exemple :

--------------------------------

De quoi avez-vous besoin ?

[ Rechercher une matière... ]

Matière

[ Mathématiques ]

Niveau

[ Collège ]

Où ?

[ Agadir ]

Quand ?

[ Samedi après-midi ]

Budget

[ Jusqu'à 100 DH/h ]

[ TROUVER UN PROFESSEUR ]

--------------------------------

Éviter les interfaces complexes.

Le client doit pouvoir publier une demande en moins de 2 minutes.

==================================================

21. PAGE D'ACCUEIL

==================================================

Hero :

"Besoin d'un professeur ? Trouvez la bonne personne."

Sous-titre :

"Décrivez votre besoin, recevez des propositions et choisissez le professeur qui vous convient."

CTA :

"Trouver un professeur"

Deuxième CTA :

"Je suis professeur"

Sections :

- Comment ça marche

- Pourquoi utiliser la plateforme

- Matières populaires

- Professeurs disponibles

- Avis

- FAQ

- inscription professeur

==================================================

22. ARCHITECTURE TECHNIQUE

==================================================

Créer une architecture propre et scalable.

Prévoir :

Frontend :

- React / Next.js ou technologie moderne équivalente

- TypeScript

- responsive mobile-first

Backend :

- API sécurisée

- architecture modulaire

Base de données :

- PostgreSQL / Supabase recommandé

Authentification :

- email

- téléphone

- OAuth si nécessaire

Stockage :

- photos

- documents de vérification

Notifications :

- email

- push

- notifications internes

Paiements :

prévoir une couche abstraite permettant de connecter ultérieurement Stripe, CMI, Payzone ou autre solution adaptée au Maroc.

==================================================

23. STRUCTURE DE DONNÉES

==================================================

Prévoir au minimum :

users

profiles

teachers

students

subjects

levels

cities

areas

teacher_subjects

teacher_levels

teacher_availability

requests

proposals

bookings

messages

reviews

subscriptions

subscription_plans

payments

notifications

verification_documents

reports

admin_actions

La structure doit être conçue pour permettre plus tard d'ajouter d'autres types de professionnels.

IMPORTANT :

Ne pas créer une architecture exclusivement liée aux professeurs.

Prévoir un modèle générique :

User

Professional

Service

Category

Request

Proposal

Booking

Review

Subscription

Ainsi, plus tard :

Professional = professeur

ou

Professional = plombier

ou

Professional = électricien

ou

Professional = mécanicien

==================================================

24. EXTENSION FUTURE

==================================================

L'application doit pouvoir évoluer vers :

"J'ai besoin de quelqu'un pour résoudre mon problème."

Exemples futurs :

- plombier

- électricien

- mécanicien

- réparateur

- jardinier

- femme de ménage

- photographe

- informaticien

- professeur

- coach

- déménageur

- technicien

Le moteur de matching devra donc être générique.

Exemple futur :

Client :

"J'ai une fuite d'eau chez moi."

Le système identifie :

Catégorie : plomberie

Service : réparation fuite

Localisation : Agadir

Disponibilité : maintenant

Puis recherche les professionnels correspondants.

==================================================

25. MVP — NE PAS SURDÉVELOPPER

==================================================

Pour la première version, prioriser absolument :

1. Inscription client

2. Inscription professeur

3. Profil professeur

4. Matières

5. Niveaux

6. Localisation

7. Disponibilités

8. Budget

9. Publication d'une demande

10. Matching

11. Propositions

12. Messagerie

13. Réservation

14. Avis

15. Freemium

16. Abonnement

17. Dashboard administrateur

18. Notifications

Ne pas développer au début :

- IA complexe

- marketplace multi-catégories

- paiement entre client et professeur

- système financier complexe

- application native iOS/Android si une PWA/web mobile suffit pour le MVP

- fonctionnalités inutiles qui ralentissent le lancement

==================================================

26. OBJECTIF DU MVP

==================================================

Le premier objectif n'est pas d'avoir 100 fonctionnalités.

L'objectif est de valider cette boucle :

CLIENT

↓

exprime son besoin

↓

PLATEFORME

↓

trouve les professionnels compatibles

↓

PROFESSIONNELS

↓

envoient leurs propositions

↓

CLIENT

↓

choisit

↓

RÉSERVATION

↓

COURS

↓

AVIS

Cette boucle doit être extrêmement simple, rapide et fiable.

==================================================

27. ANALYTICS

==================================================

Prévoir des statistiques permettant de mesurer :

- visiteurs

- inscriptions

- demandes créées

- demandes ayant reçu une proposition

- propositions moyennes par demande

- réservations

- taux de conversion

- professeurs actifs

- taux de réponse

- abonnements

- revenus

- churn

- utilisateurs récurrents

KPI PRINCIPAL :

Nombre de demandes réellement satisfaites.

Ne pas considérer uniquement le nombre d'inscriptions comme indicateur de succès.

==================================================

28. SÉCURITÉ

==================================================

Prévoir :

- authentification sécurisée

- autorisations par rôle

- validation côté serveur

- protection des données

- rate limiting

- protection contre spam

- logs

- sauvegardes

- validation des fichiers

- protection des documents personnels

Ne jamais exposer directement les données sensibles dans le frontend.

==================================================

29. ADMINISTRATION DES PRIX

==================================================

Tous les paramètres business doivent être configurables :

- prix abonnement

- durée abonnement

- nombre de demandes gratuites

- nombre de réponses autorisées

- commission future

- période d'essai

- catégories

- matières

- niveaux

- villes

- critères de matching

- visibilité des plans

Ne pas coder ces valeurs en dur.

==================================================

30. LIVRABLE FINAL

==================================================

Le développement doit fournir :

- application fonctionnelle

- interface responsive

- espace client

- espace professeur

- dashboard admin

- base de données

- authentification

- système de matching

- demandes

- propositions

- réservation

- messagerie

- avis

- système freemium

- abonnement

- notifications

- documentation d'installation

- variables d'environnement documentées

- structure propre et maintenable

IMPORTANT :

Le produit doit être développé comme une véritable marketplace scalable et non comme un simple site vitrine.

L'architecture doit permettre de transformer ultérieurement la plateforme "professeurs" en plateforme générale de mise en relation :

"J'ai un besoin → je le décris → les professionnels capables de le résoudre me proposent leurs services → je choisis → je réserve."

Commencer par le marché des professeurs particuliers, mais construire le cœur technique de façon générique afin de pouvoir ajouter les autres catégories sans refaire toute l'application.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://match-my-expert-46.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/19b6bf86-7b1e-465c-9395-45487fe19bbf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
