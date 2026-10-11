# chessmate-lab — Vision produit

> Statut : v1.1 — cadrage clôturé — 2026-10-11
> Dernière mise à jour : 2026-10-11

## 1. En une phrase

Un jeu d'échecs jouable dans le navigateur, construit pas à pas comme **projet d'apprentissage** : apprendre comment se développe un jeu, et comment travailler efficacement avec les outils Claude (Claude Code dans VS Code, Cowork, CLAUDE.md, skills, Git/GitHub).

## 2. Objectifs

**Objectifs d'apprentissage** (le cœur du projet) : O-A architecture d'un jeu, O-B algorithmique, O-C qualité et livraison, O-D travail avec Claude — détaillés dans `learning-log.md`, travaillés phase par phase dans `roadmap.md`.

**Objectifs produit**

| # | Objectif | Comment on sait qu'il est atteint |
|---|---|---|
| P1 | Un jeu d'échecs complet, jouable en ligne sur GitHub Pages | À partir de la phase 2a, chaque sous-phase ou phase se termine par une version jouable publiée |
| P2 | Un dépôt public propre | Code lisible et testé, documentation à jour, historique Git lisible (commits séparés, une pull request par étape), README qui présente bien le projet |

## 3. Ce que le projet EST

- Un jeu d'échecs aux **règles complètes** (roque, prise en passant, promotion, échec, mat, pat, puis nulles avancées).
- Trois modes ajoutés **progressivement** :
  1. 2 joueurs sur le même écran (phase 2) ;
  2. contre l'ordinateur, adversaire codé à la main (phase 3) ;
  3. en ligne entre 2 joueurs, par code à partager (phase 4) ;
  puis un tutoriel interactif (phase 5).
- Des parties paramétrables (pendule, aides visuelles, annulation…), en français et en anglais, jouables à la souris et au clavier. Liste complète : `features.md`.
- Un projet **TypeScript** de bout en bout : interface avec le moteur de jeu **Phaser**, serveur **Node.js**.
- Un dépôt **public** sur le GitHub personnel de Vincent.

## 4. Hors périmètre actuel (candidats pour la suite)

Ces sujets ne font **pas partie des phases 0 à 5**. Ce ne sont pas des refus définitifs : chacun peut entrer dans la roadmap plus tard, sur décision de Vincent (entrée `DEC-` + ajout d'une phase). En attendant, ils sont suivis dans `post-mvp-backlog.md`.

| Sujet | Pourquoi pas maintenant |
|---|---|
| Comptes utilisateurs | Demande une base de données et de la sécurité (mots de passe) : gros sujet à part entière |
| Classement des joueurs (ex. Elo) | Dépend des comptes utilisateurs |
| Chat entre joueurs | Dépend du mode en ligne (phase 4) ; ajoute la question de la modération |
| Moteur d'échecs externe (ex. Stockfish) | Phase 3 réservée à l'adversaire codé par Vincent (DEC-007). Plus tard : possible comme adversaire fort ou pour mesurer le niveau de son propre adversaire |
| Application mobile / affichage mobile | Le navigateur sur ordinateur suffit pour apprendre ; l'adaptation mobile est un sujet séparé |

Autres sujets hors périmètre actuel (lecteur d'écran, Firefox / Safari, thèmes, export de parties…) : voir `post-mvp-backlog.md`.

**Ce qui reste ferme** (ce sont des contraintes, pas des fonctionnalités) : zéro coût strict, et aucun lien avec le contexte professionnel de Vincent — voir §6.

## 5. Pour qui

| Public | Besoin |
|---|---|
| Vincent (principal) | Apprendre en construisant ; comprendre chaque choix |
| Visiteurs du GitHub | Voir un projet propre, documenté, jouable en un clic (GitHub Pages) |

## 6. Contraintes

| Contrainte | Valeur |
|---|---|
| Temps disponible | 6 à 7 h par semaine, sur temps libre |
| Budget | 0 € — si une étape implique un coût, arrêt et décision de Vincent (DEC-008) |
| Séparation | Aucun lien avec le contexte professionnel de Vincent |
| Poste | Windows, VS Code, Node.js, Git, compte GitHub perso (déjà installés) |
| Méthode | Docs d'abord ; 1 étape = 1 issue + 1 branche + 1 pull request ; validation de Vincent avant chaque étape (mot-clé « forward ») |
| Navigateurs | Chrome et Edge sur ordinateur (DEC-027) |
| Données | Aucune collecte hors du navigateur du joueur (DEC-028) |

## 7. Sujets laissés volontairement ouverts

- Détail graphique et choix de l'outil IA pour les images (étape 2a.1 ; style moderne et épuré déjà décidé, DEC-022 / DEC-023).
- Hébergement gratuit du serveur en ligne (étape 4.7).

## 8. Documents du projet

Liste et rôle de chaque document : voir `README.md`, section Documentation.
