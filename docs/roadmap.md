# chessmate-lab — Roadmap

> Statut : v1.1 — cadrage clôturé, après auto-évaluation — 2026-10-11
> Rythme : 6 à 7 h par semaine. Durées = estimations grossières, pas des engagements.
> Les identifiants (E-01, A-02, C-04…) renvoient à `features.md` ; les décisions (DEC-xxx) à `decisions.md`.

## Vue d'ensemble

| Phase | Contenu | Version publiée | Durée estimée |
|---|---|---|---|
| 0 | Mise en place : dépôt, cadrage, socle technique, vérification automatique | — | ✅ Terminée (environ 4 h réelles) |
| 1 | Moteur de règles complet et prouvé | — | 5 à 6 semaines |
| 2a | Client, publication, partie jouable à 2 sur le même écran | **v0.1.0** (première version jouable) | 7 à 9 semaines |
| 2b | Options de partie, confort, pendule, fins de partie, reprise | v0.2.0 | 5 à 7 semaines |
| 2c | Finitions : paramètres, anglais, animations, sons, clavier, aide, crédits | v0.3.0 | 6 à 8 semaines |
| 3 | Adversaire ordinateur (codé par Vincent), statistiques | v0.4.0 | 5 à 7 semaines |
| 4 | Mode en ligne | v1.0.0 | 6 à 8 semaines |
| 5 | Tutoriel interactif | v1.1.0 | 4 à 6 semaines |

- Phase 2 découpée en 2a / 2b / 2c (DEC-038) : chaque sous-phase se termine par une version jouable et publiée.
- Phase 0 allégée (DEC-039) : le client, la publication et le guide de contribution arrivent au début de 2a, quand il y a quelque chose à afficher.

## Règles communes à toutes les phases

**Début de phase**
1. Relire et figer le périmètre ; toute nouvelle idée va dans `post-mvp-backlog.md`.
2. Préciser les **critères de fin de chaque étape** (colonne « Fini quand ») s'ils ne sont pas déjà écrits, et confirmer les objectifs de performance de la phase (`non-functional.md` §2).
3. Trancher les « points à décider » listés pour la phase.
4. Lister les fichiers et informations nécessaires, et comment les obtenir.
5. Créer une issue GitHub par étape, avec ses critères de fin.

**Chaque étape** (à partir de 0.3 ; DEC-019, DEC-040, DEC-041)
```
issue → branche etape/<n°>-<sujet> → plan validé par Vincent
  → commit config (si besoin) → commit tests (ils échouent) → commit code (ils passent)
  → validation (visuelle si effet visible) → commit docs (dont project-status.md)
  → envoi de la branche sur GitHub (une seule fois, étape terminée)
  → pull request → vérification automatique verte (à partir de 0.4) → relecture par Claude
  → fusion par Vincent → git status propre → « forward »
```
Étape triviale (ex. correction de texte) : un seul commit, justifié dans la pull request.

**Fin de phase**
1. À partir de 2a : recette manuelle complète (`recette.md`) ; tout point KO bloque la version.
2. À partir de 2a : version (`CHANGELOG.md`, étiquette `vX.Y.Z`, Release GitHub, publication automatique).
3. Testeurs proches (fins de phase 2, 3 et 4).
4. Bilan dans `learning-log.md`, mise à jour de `built-with-claude.md`, revue de `risks.md`, mise à jour de `project-status.md`.

---

## Phase 0 — Mise en place

**Objectifs d'apprentissage** : O-C (outillage qualité, vérification automatique), O-D (CLAUDE.md, Claude Code en mode Plan et Manual).
**Je sais à la fin** : expliquer le rôle de chaque outil installé ; faire passer une modification par branche, pull request et vérification automatique.

| Étape | Contenu | Fini quand | Statut |
|---|---|---|---|
| 0.1 | Dépôt GitHub public, licence MIT, README | Dépôt en ligne | ✅ |
| 0.2 | Claude Code dans VS Code, mode Manual ; `CLAUDE.md` et fichiers de reprise | `/status` OK, mode Manual | ✅ |
| 0.C | Cadrage complet (sessions 1 à 4), auto-évaluation, roadmap v1.1 | Docs commitées | ✅ |
| 0.3 | Socle : workspaces npm, TypeScript strict, Vitest + mesure de couverture (sans seuil), ESLint, Prettier, `packages/engine` avec un test bidon ; scripts compatibles Windows et Linux. **Première étape sur branche + pull request** (fusionnée sans vérification automatique, qui n'existe pas encore) | `npm test`, vérification TypeScript, ESLint et Prettier passent en local sous PowerShell ; pull request fusionnée | ✅ |
| 0.4 | Vérification automatique GitHub Actions (style, typage, tests) avec permissions minimales ; protection de `main` adaptée à un développeur seul (pas d'approbation exigée, règles appliquées aussi à l'administrateur, seule la fusion par commit de fusion autorisée) ; Dependabot (npm + GitHub Actions, mises à jour groupées, failles immédiates) ; contrôle des licences npm (outil choisi à cette étape) ; versions exactes dans `architecture.md` ; création de `built-with-claude.md` ; bilan de phase | Une pull request contenant volontairement un test qui échoue **ne peut pas** être fusionnée ; l'erreur corrigée, elle peut l'être | ✅ (pull request #5) |

---

## Phase 1 — Moteur de règles

**Méthode** : tests d'abord (DEC-040). Seuil de couverture du moteur (≥ 90 %) activé à l'étape 1.1.
**Objectifs d'apprentissage** : O-B (génération de coups, perft), O-A (modèle de données d'une partie), O-D (écrire les tests d'abord avec Claude, relire chaque proposition).
**Je sais à la fin** : expliquer comment le moteur trouve les coups légaux et pourquoi le perft prouve qu'il a raison.

| Étape | Contenu | Réf. | Fini quand |
|---|---|---|---|
| 1.1 | Modèle de partie : types (`Piece`, `Square`, `GameState`, `Move`), convention d'indexation du plateau, **historique des positions** (nécessaire à la triple répétition et à l'annulation), position initiale, lecture / écriture FEN ; activation du seuil de couverture | | Une position FEN lue puis réécrite est identique ; contrat mis à jour dans `architecture.md` §4.3 |
| 1.2 | Déplacements du cavalier et du roi | R-01 | Tests de positions types verts |
| 1.3 | Déplacements de la tour, du fou, de la dame | R-01 | Idem |
| 1.4 | Pions : avance simple et double, prise, promotion | R-01, R-02 | Idem |
| 1.5 | Case attaquée, échec, filtrage des coups illégaux | R-01 | Idem |
| 1.6 | Roque et prise en passant | R-02 | Idem, cas interdits compris (roque à travers l'échec…) |
| 1.7 | `status()` : échec, mat, pat ; perft (profondeur 1 à 4 + positions de référence citées) ; temps du perft mesuré | R-01 | Perft identique aux valeurs de référence |
| 1.8 | Notation algébrique des coups (ex. `Nf3`, `exd5`, `O-O`, `e8=Q+`), dans le moteur | | Notation correcte sur des parties de référence |

**Critères de fin** : perft conforme ; couverture du moteur ≥ 90 % ; contrat du moteur documenté ; bilan de phase.

---

## Phase 2a — Client, publication, partie jouable

**Objectifs d'apprentissage** : O-A (scènes Phaser, logique client séparée de l'affichage), O-C (tests de bout en bout, publication, recette).
**Je sais à la fin** : expliquer pourquoi la logique du client est hors des scènes Phaser et comment un clic devient un coup validé par le moteur.
**Points à décider en début de phase** : outil de traduction (bibliothèque ou fait maison) ; règle des nulles (étape 2a.9).

| Étape | Contenu | Réf. |
|---|---|---|
| 2a.1 | Squelette client Vite + Phaser (écran vide) ; Playwright : premier test de bout en bout (la page s'affiche), ajouté à la vérification automatique ; **point d'accès de test** (en mode test, le jeu expose son état pour que Playwright puisse vérifier ce qui est dessiné dans Phaser) ; vérifier Chrome et Edge sous Playwright | DEC-016, DEC-027 |
| 2a.2 | Publication par version : GitHub Pages déclenché par une étiquette `vX.Y.Z` (adresse de base du site, environnement de publication), `CHANGELOG.md`, badges | DEC-018 |
| 2a.3 | `CONTRIBUTING.md`, modèles d'issues (bug / idée) | DEC-021, DEC-034 |
| 2a.4 | **Discussion de formation graphisme** : outil IA (Claude en SVG ou générateur gratuit), droit français et conditions de l'outil, palette accessible, plateau et pièces → décision + `credits.md` | DEC-022, DEC-023 |
| 2a.5 | Structure du client (logique / scènes) et mécanisme de traduction ; français seul jusqu'à 2c (le français sert de langue par défaut tant que l'anglais n'existe pas) | DEC-016, DEC-026 |
| 2a.6 | Accueil minimal (mode 2 joueurs) ; écran de partie : plateau et pièces affichés depuis l'état du moteur | E-01, E-03, M-01 |
| 2a.7 | Déplacement par clic et par glisser-déposer ; coups possibles surlignés | I-01, I-02, A-01 |
| 2a.8 | Promotion ; dernier coup ; roi en échec ; coordonnées ; messages explicatifs ; information jamais portée par la seule couleur | I-03, A-02, A-03, A-04, H-03, P-04 |
| 2a.9 | Moteur : nulles (répétition, 50 coups, matériel insuffisant). **Décision** : règle officielle (triple répétition et 50 coups *réclamés* par un joueur, nulle automatique à 5 répétitions et 75 coups) ou nulle automatique simplifiée | R-03 |
| 2a.10 | Historique des coups (notation du moteur) ; écran de fin de partie ; nouvelle partie | E-04 |
| 2a.11 | Création de `recette.md` ; test de bout en bout « mat du berger » ; recette ; **v0.1.0** | |

En 2a, les aides visuelles sont toujours actives ; elles deviennent activables en 2b.

**Critères de fin** : une partie complète, jusqu'au mat, au pat ou à la nulle, jouable sur GitHub Pages ; aucune règle codée dans le client.

---

## Phase 2b — Options, confort, pendule, fins de partie

**Objectifs d'apprentissage** : O-A (état et options d'une partie, gestion du temps), O-C (tests de la logique client).
**Je sais à la fin** : concevoir un objet « options de partie » lu par plusieurs parties du jeu, et tester une pendule sans attendre réellement.
**Points à décider en début de phase** : pendule et annulation (le temps est-il rendu ?), onglet du navigateur caché pendant une partie, temps écoulé alors que l'adversaire ne peut plus mater (règle officielle : nulle) ; format de sauvegarde versionné (que faire d'une sauvegarde ancienne ou illisible).

| Étape | Contenu | Réf. |
|---|---|---|
| 2b.1 | Écran de création de partie : couleur, activation des aides visuelles et des fonctions de confort | E-02, DEC-012 |
| 2b.2 | Annuler un coup ; retourner le plateau | C-01, C-02 |
| 2b.3 | Revoir les coups joués (historique cliquable) | C-03 |
| 2b.4 | Pendule : préréglages, temps personnalisé, incrément, perte au temps | C-04 |
| 2b.5 | Abandonner ; proposer la nulle ; revanche | F-01, F-02, F-03 |
| 2b.6 | Reprise automatique de la partie en cours (format versionné) | S-01 |
| 2b.7 | Recette ; **v0.2.0** | |

**Critères de fin** : toutes les options fonctionnent, seules et combinées ; une partie fermée en cours reprend à l'identique, pendule comprise.

---

## Phase 2c — Finitions

**Objectifs d'apprentissage** : O-A (paramètres persistants, traduction, son, accessibilité), O-B (mesure de performance).
**Je sais à la fin** : rendre un jeu utilisable au clavier et dans deux langues, et mesurer sa fluidité avant d'optimiser.

| Étape | Contenu | Réf. |
|---|---|---|
| 2c.1 | Paramètres généraux, conservés dans le navigateur | E-06 |
| 2c.2 | Traduction anglaise complète ; langue par défaut selon le navigateur | P-07, DEC-026 |
| 2c.3 | Animations désactivables (respect du réglage « réduire les animations ») | P-01 |
| 2c.4 | Effets sonores et musique (banques libres, `credits.md`) | P-02, P-03 |
| 2c.5 | Jeu complet au clavier ; taille du texte réglable | P-05, P-06 |
| 2c.6 | Règles illustrées ; infobulles | E-05, H-01, H-02 |
| 2c.7 | À propos / Crédits ; lien vers les retours (issues GitHub) | E-08, B-01 |
| 2c.8 | Vérification des couleurs avec la simulation de daltonisme du navigateur ; mesures de performance (méthode : `non-functional.md` §2) | P-04, DEC-031 |
| 2c.9 | Recette ; **v0.3.0** ; testeurs proches ; bilan de la phase 2 | |

**Critères de fin** : objectifs de performance de la phase 2 atteints ; jeu entièrement utilisable en français et en anglais, à la souris et au clavier.

---

## Phase 3 — Adversaire ordinateur

**Règle** : **Vincent écrit le code de l'adversaire** (évaluation et recherche, étapes 3.1 à 3.4) ; Claude explique, donne des indices, relit (DEC-007). Le reste de la phase suit le fonctionnement habituel.
**Objectifs d'apprentissage** : O-B (évaluation, minimax, alpha-bêta, calcul en arrière-plan), O-D (créer une skill).
**Je sais à la fin** : expliquer et coder une recherche minimax avec élagage alpha-bêta.

| Étape | Contenu | Réf. |
|---|---|---|
| 3.1 | Adversaire qui joue un coup légal au hasard ; mode « contre l'ordinateur » dans l'accueil | M-02 |
| 3.2 | Évaluation d'une position par le matériel | |
| 3.3 | Recherche minimax à profondeur fixe | |
| 3.4 | Élagage alpha-bêta | |
| 3.5 | Calcul en arrière-plan (l'écran ne se fige pas) ; banc d'essai : parties automatiques entre niveaux | DEC-031 |
| 3.6 | Niveaux de difficulté dans la création de partie ; pendule contre l'ordinateur | E-02 |
| 3.7 | Statistiques ; reprise automatique de la partie contre l'ordinateur | E-07, S-02 |
| 3.8 | Créer une skill Claude utile au projet (ex. relecture selon les règles du projet) | O-D |
| 3.9 | Recette ; **v0.4.0** ; testeurs proches ; bilan | |

**Critères de fin** : l'ordinateur ne joue que des coups légaux ; le niveau le plus fort répond dans le temps visé ; un niveau supérieur bat le niveau inférieur sur le banc d'essai (nombre de parties fixé en début de phase).

---

## Phase 4 — Mode en ligne

**Objectifs d'apprentissage** : O-A (client / serveur, serveur qui fait autorité), O-C (tests à deux navigateurs, sécurité de base).
**Je sais à la fin** : expliquer pourquoi le serveur doit vérifier chaque coup et comment une partie survit à une coupure de connexion.

| Étape | Contenu | Réf. |
|---|---|---|
| 4.1 | **Étude des hébergements gratuits** (conditions vérifiées à la date de l'étude) → décision. Sans hébergement gratuit : mode en ligne utilisable seulement en lançant aussi le client en local (un site publié en HTTPS ne peut pas joindre un serveur local non sécurisé) | DEC-008, DEC-042 |
| 4.2 | Serveur Node.js + WebSocket ; définition des messages ; mode « en ligne » dans l'accueil | M-03 |
| 4.3 | Créer / rejoindre une partie par code ; sécurité de base (messages vérifiés, limites, codes impossibles à deviner) | N-01, DEC-032 |
| 4.4 | Le serveur vérifie chaque coup avec le moteur et tient la pendule | DEC-004 |
| 4.5 | Déconnexion : 60 s pour revenir, sinon défaite | N-02, DEC-033 |
| 4.6 | Demandes d'annulation et de nulle soumises à l'adversaire | N-03 |
| 4.7 | Tests du serveur ; test de bout en bout à deux navigateurs ; mesure du délai d'affichage d'un coup | DEC-031 |
| 4.8 | Recette ; **v1.0.0** ; testeurs proches ; bilan | |

**Critères de fin** : une partie complète entre deux machines ; un coup illégal envoyé au serveur est refusé. v1.0.0 sort même si le mode en ligne reste limité au local, avec cette limite indiquée clairement (DEC-042).

---

## Phase 5 — Tutoriel interactif

**Objectifs d'apprentissage** : O-A (scénarios guidés, réutilisation du moteur), O-D.

| Étape | Contenu | Réf. |
|---|---|---|
| 5.1 | Cadrage du tutoriel : public, leçons, déroulé (même méthode que le cadrage du projet) | H-04 |
| 5.2 | Moteur de leçons (positions imposées, coups attendus, explications) en français et anglais | |
| 5.3 | Leçons | |
| 5.4 | Recette ; **v1.1.0** ; bilan final du projet | |
