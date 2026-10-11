# chessmate-lab — Roadmap

> Statut : brouillon v0.1 — à valider par Vincent
> Dernière mise à jour : 2026-10-11
> Rythme : 6 à 7 h par semaine. Une étape ≈ une session de 2 à 4 h. Les durées sont des estimations, pas des engagements.

## Vue d'ensemble

| Phase | Contenu | Durée estimée | Outil Claude introduit |
|---|---|---|---|
| 0 | Mise en place | 1 à 2 semaines | Cowork, CLAUDE.md, Git + GitHub |
| 1 | Moteur de règles + tests | 4 à 5 semaines | Claude Code dans VS Code |
| 2 | Plateau Phaser, 2 joueurs même écran, publication | 4 à 5 semaines | Claude Code + GitHub Actions |
| 3 | Adversaire ordinateur (codé par Vincent) | 3 à 4 semaines | Création d'une skill |
| 4 | Mode en ligne | 4 à 5 semaines | Branches + pull requests |

Total estimé : 16 à 21 semaines.

**Règles communes à toutes les phases**

- Le périmètre d'une phase est figé à son démarrage ; toute nouvelle idée va dans `post-mvp-backlog.md`.
- Chaque étape suit le cycle : conception → code → tests → validation → audit de cohérence → commit technique → push → docs → commit docs → push → `git status` propre.
- On ne passe à l'étape suivante que sur « forward » de Vincent.
- Au début de chaque phase : liste des fichiers nécessaires et comment les obtenir.

---

## Phase 0 — Mise en place

**But** : un dépôt prêt, des outils qui marchent, un premier test qui passe.

| Étape | Contenu | Livrable |
|---|---|---|
| 0.1 | Créer le dépôt public `chessmate-lab` sur GitHub ; choisir la licence (décision Vincent) ; README minimal | Dépôt en ligne |
| 0.2 | Installer l'extension Claude Code dans VS Code ; vérifier que le compte y donne accès | Claude Code répond dans VS Code |
| 0.3 | Structure du dépôt (workspaces npm), TypeScript strict, Vitest, un test bidon | `npm test` vert |
| 0.4 | Squelette client Vite + Phaser affichant un écran vide | `npm run dev` ouvre une page avec le canvas Phaser |
| 0.5 | `CLAUDE.md` + documents vivants dans `docs/` ; versions exactes notées dans `architecture.md` | Docs commitées |

**Critères de fin** : `npm test` et `tsc` passent ; la page Phaser s'affiche ; Claude Code fonctionne dans VS Code ; tout est poussé sur GitHub.

**Point d'arrêt** : si Claude Code n'est pas accessible avec le compte utilisé, on s'arrête et Vincent décide de la suite.

---

## Phase 1 — Moteur de règles

**But** : un module `engine` qui connaît toutes les règles (sauf nulles avancées), prouvé par les tests.

| Étape | Contenu | Livrable |
|---|---|---|
| 1.1 | Types (`Piece`, `Square`, `GameState`, `Move`) ; position initiale ; lecture/écriture FEN | Tests FEN verts |
| 1.2 | Déplacements du cavalier et du roi (sauts) | Tests verts |
| 1.3 | Déplacements de la tour, du fou, de la dame (glissements) | Tests verts |
| 1.4 | Pions : avance simple et double, prise, promotion | Tests verts |
| 1.5 | Case attaquée, échec, filtrage des coups illégaux | Tests verts |
| 1.6 | Roque et prise en passant | Tests verts |
| 1.7 | `status()` : échec, mat, pat ; tests perft (profondeur 1 à 4 + positions de référence) | Perft conforme |

**Critères de fin** : tous les tests passent ; perft identique aux valeurs de référence ; contrat du moteur (§4.3 de `architecture.md`) respecté et documenté.

**Ce qu'on apprend avec Claude** : demander un plan avant le code, faire écrire les tests d'abord, relire et comprendre chaque proposition avant de l'accepter.

---

## Phase 2 — Plateau Phaser, 2 joueurs sur le même écran

**But** : une partie complète jouable par 2 humains, publiée sur Internet.

| Étape | Contenu | Livrable |
|---|---|---|
| 2.1 | **Discussion de formation** : style graphique (formes dessinées par le code vs images libres de droits, licences) → décision | Entrée `DEC-` |
| 2.2 | Afficher plateau et pièces à partir du `GameState` | Position initiale visible |
| 2.3 | Sélection et déplacement par clic ; surlignage des coups légaux | Coups jouables |
| 2.4 | Choix de la pièce de promotion ; affichage échec / mat / pat | Fin de partie visible |
| 2.5 | Moteur : nulles avancées (triple répétition, 50 coups, matériel insuffisant) + tests | Tests verts |
| 2.6 | Historique des coups en notation algébrique ; bouton « nouvelle partie » | Historique visible |
| 2.7 | Publication automatique sur GitHub Pages via GitHub Actions | URL publique |

**Critères de fin** : une partie complète, de l'ouverture au mat, jouable sur l'URL GitHub Pages ; aucune règle codée dans le client.

---

## Phase 3 — Adversaire ordinateur (codé par Vincent)

**But** : jouer contre l'ordinateur. Claude explique et relit ; **Vincent écrit le code**.

| Étape | Contenu | Livrable |
|---|---|---|
| 3.1 | Adversaire qui joue un coup légal au hasard | Partie possible contre l'ordinateur |
| 3.2 | Évaluation d'une position par le matériel (valeur des pièces) | Fonction testée |
| 3.3 | Recherche « minimax » à profondeur fixe (l'ordinateur essaie ses coups et les réponses possibles, puis choisit le meilleur) | Bat l'adversaire aléatoire |
| 3.4 | Optimisation « alpha-bêta » (ignore les branches inutiles) ; calcul en arrière-plan (Web Worker) | L'écran ne se fige pas |
| 3.5 | Choix du niveau dans l'interface | Menu de niveau |
| 3.6 | Créer une skill Claude utile au projet (ex. revue de code selon les règles du projet) | Skill sauvegardée |

**Critères de fin** : l'ordinateur ne joue que des coups légaux ; le niveau 2 bat le niveau aléatoire sur une série de parties automatiques (nombre fixé au début de phase) ; l'interface reste réactive.

---

## Phase 4 — Mode en ligne

**But** : deux joueurs sur deux machines jouent ensemble.

| Étape | Contenu | Livrable |
|---|---|---|
| 4.1 | Serveur Node.js + WebSocket ; définition des messages | Serveur qui répond |
| 4.2 | Créer / rejoindre une partie avec un code | 2 navigateurs connectés |
| 4.3 | Le serveur vérifie chaque coup avec `engine` et diffuse l'état | Coup illégal refusé |
| 4.4 | Déconnexion, reconnexion, abandon | Cas testés |
| 4.5 | Test complet sur le réseau local (2 machines) | Partie complète jouée |
| 4.6 | Étude des hébergements gratuits (conditions vérifiées à la date de l'étude) → décision Vincent | Entrée `DEC-` |

**Critères de fin** : partie complète entre deux machines du réseau local ; décision d'hébergement prise. **Si aucune offre n'est gratuite, le mode en ligne reste local** : contrainte zéro coût.

**Ce qu'on apprend avec Claude** : travailler par branche et pull request, faire relire une pull request par Claude avant de fusionner.
