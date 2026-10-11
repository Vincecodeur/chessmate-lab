# chessmate-lab — État du projet

> **Fichier de reprise.** À lire en premier au début de toute nouvelle conversation (Cowork ou Claude Code).
> Mis à jour à la fin de chaque étape, dans le commit de documentation.
> Dernière mise à jour : 2026-10-12

## Où on en est

| | |
|---|---|
| Phase en cours | **0 — Mise en place**, terminée à la fusion de la pull request de clôture (issue #3) |
| Dernière étape terminée | **0.4** — Vérification automatique, protection de `main`, Dependabot, licences ; test de blocage réussi (pull request #5) |
| Prochaine étape | **Début de la phase 1** (règles communes de début de phase : périmètre, critères de fin, issues), puis **1.1** — Modèle de partie. Avant : traiter les pull requests Dependabot ouvertes |
| Lancement | Uniquement sur « forward » de Vincent |

## Historique des étapes

| Étape | Statut | Commits | Notes |
|---|---|---|---|
| 0.1 Dépôt GitHub, licence, README | Terminée | `99c5bb1`, `abea592` | Licence MIT (DEC-011) |
| — Correcteur orthographique | Terminée | `41d0937` | `cspell.json` (anglais + français) |
| 0.2 Claude Code dans VS Code | Terminée | — | Version 2.1.296, mode Manual |
| — `CLAUDE.md` + fichiers de reprise | Terminée | `9b318b5` | |
| 0.C Cadrage + auto-évaluation + roadmap v1.1 | Terminée | `9744c1d` (dernier commit direct sur `main`) | DEC-012 à DEC-042 ; 11 nouveaux documents |
| 0.3 Socle technique | Terminée | `318b113` config, `fa34645` tests, `57d41e0` code, commit docs ; fusion `6e05244` | Issue #1, pull request #2. Workspaces npm, TypeScript 6.0.3 strict, Vitest 5 + couverture sans seuil, ESLint 10, Prettier 3 ; DEC-043 |
| 0.4 Vérification automatique | Terminée | `0d0aa86` config, `15fe18d` docs ; fusion `e9eb511` | Pull request #4. `verify` et `dependency-review` obligatoires, Dependabot, `licensee`, Node 24 ; DEC-044 à DEC-048 |
| — Test de blocage | Réussi | `5ce29bb` test faux, `f54a807` annulation (non fusionnés) | Pull request #5 fermée sans fusion. Test faux : fusion impossible ; annulation : fusion possible |
| — Clôture de la phase 0 | En cours | commit docs | Issue #3. `built-with-claude.md`, bilan de phase, revue des risques |

## Décisions en attente de validation

- Propositions du bilan de phase 0 (`learning-log.md`, dernière rubrique) : règle « commandes Git une par une » dans `release-process.md`, règle « plan complet réécrit » dans `CLAUDE.md`.

## Écarts avec la roadmap

- **TypeScript 6.0.3 au lieu de la dernière version (7.0.2)** : `typescript-eslint` 8.71.1 exige TypeScript < 6.1. À revoir quand `typescript-eslint` acceptera TypeScript 7.
- **Versions exactes notées dans `architecture.md` §3 dès l'étape 0.3** (la roadmap le prévoyait à 0.4).
- **Vérifications ajoutées au mode strict** (`noUncheckedIndexedAccess`, `noImplicitOverride`, `noFallthroughCasesInSwitch`), extensions VS Code recommandées et `engines` dans `package.json` : propositions acceptées pendant l'étape 0.3.
- **Node 24 adopté dès l'étape 0.4** (DEC-048), au lieu du début de la phase 2a.
- **`built-with-claude.md` créé à la clôture de la phase 0** au lieu de l'étape 0.4.
- **Durée de la phase 0** : environ 4 h réelles contre « 2 à 3 semaines » estimées (voir le bilan dans `learning-log.md`).

## Points ouverts

- **Pull requests Dependabot** (actions GitHub et npm) : à traiter une par une ; fusion seulement si les vérifications sont vertes et après décision de Vincent ; versions majeures regroupées en début de phase (DEC-035).
- **`ubuntu-latest` passe d'Ubuntu 24.04 à Ubuntu 26.04 entre le 19 octobre et le 19 novembre 2026** (annonce GitHub du 2026-09-17). La vérification automatique utilise `ubuntu-latest`. Effet attendu faible, car Node est fixé par `setup-node`, mais à surveiller. Si une vérification casse : fixer `ubuntu-24.04` le temps de corriger (décision de Vincent).
- **Ruleset `main`** : confirmer que la case liée à Copilot est bien décochée.
- À vérifier à l'étape 2a.1 : Edge utilisable par Playwright dans la vérification automatique (Linux).
- Analyse ESLint avec informations de types (détecte par ex. les promesses non attendues) : à décider au début de 2a.
- Incident résolu à l'étape 0.3 : un vieux npm 2.15.12 installé dans le dossier personnel de Vincent prenait la place du bon npm dans les scripts (npm cherche aussi les programmes dans les `node_modules` des dossiers parents). Supprimé. À retenir si un comportement étrange de npm réapparaît.

## Organisation du travail

Voir `release-process.md` §1 (rôles de Vincent, Claude Code et Cowork).
