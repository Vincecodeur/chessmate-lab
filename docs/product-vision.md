# chessmate-lab — Vision produit

> Statut : brouillon v0.2 — à valider par Vincent (v0.2 : §4 transformé en « hors périmètre actuel »)
> Dernière mise à jour : 2026-10-11

## 1. En une phrase

Un jeu d'échecs jouable dans le navigateur, construit pas à pas comme **projet d'apprentissage** : apprendre comment se développe un jeu, et comment travailler efficacement avec les outils Claude (Claude Code dans VS Code, Cowork, CLAUDE.md, skills, Git/GitHub).

## 2. Objectifs

| # | Objectif | Comment on sait qu'il est atteint |
|---|---|---|
| O1 | Apprendre le développement d'un jeu de bout en bout | Chaque phase livre une version jouable, publiée sur GitHub |
| O2 | Apprendre à travailler avec Claude | Chaque phase introduit au moins un nouvel outil Claude, utilisé en vrai (voir roadmap) |
| O3 | Comprendre ce qu'on code | Chaque logique non évidente est expliquée et documentée ; Vincent code lui-même l'adversaire ordinateur |
| O4 | Produire un dépôt public propre | Code lisible, tests, documentation à jour, historique Git lisible (1 étape = 1 commit) |

## 3. Ce que le projet EST

- Un jeu d'échecs aux **règles complètes** (roque, prise en passant, promotion, échec, mat, pat, puis nulles avancées).
- Trois modes ajoutés **progressivement** :
  1. 2 joueurs sur le même écran ;
  2. contre l'ordinateur (adversaire codé à la main) ;
  3. en ligne entre 2 joueurs.
- Un projet **TypeScript** de bout en bout : interface avec le moteur de jeu **Phaser**, serveur **Node.js**.
- Un dépôt **public** sur le GitHub personnel de Vincent.

## 4. Hors périmètre actuel (candidats pour la suite)

Ces sujets ne font **pas partie des phases 0 à 4**. Ce ne sont pas des refus définitifs : chacun peut entrer dans la roadmap plus tard, sur décision de Vincent (entrée `DEC-` + ajout d'une phase). En attendant, ils sont suivis dans `post-mvp-backlog.md`.

| Sujet | Pourquoi pas maintenant |
|---|---|
| Comptes utilisateurs | Demande une base de données et de la sécurité (mots de passe) : gros sujet à part entière |
| Classement des joueurs (ex. Elo) | Dépend des comptes utilisateurs |
| Chat entre joueurs | Dépend du mode en ligne (phase 4) ; ajoute la question de la modération |
| Moteur d'échecs externe (ex. Stockfish) | Phase 3 réservée à l'adversaire codé par Vincent (DEC-007). Plus tard : possible comme adversaire fort ou pour mesurer le niveau de son propre adversaire |
| Application mobile / affichage mobile | Le navigateur sur ordinateur suffit pour apprendre ; l'adaptation mobile est un sujet séparé |

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
| Méthode | Docs d'abord, 1 étape = 1 commit, validation de Vincent avant chaque étape (mot-clé « forward ») |

## 7. Sujets laissés volontairement ouverts (à discuter pendant la formation)

- Style graphique du plateau et des pièces (début de phase 2).
- Hébergement gratuit du serveur en ligne (fin de phase 4, après vérification des conditions réelles des offres).
- Licence du dépôt public (phase 0).
