# chessmate-lab — État du projet

> **Fichier de reprise.** À lire en premier au début de toute nouvelle conversation (Cowork ou Claude Code).
> Mis à jour à la fin de chaque étape, dans le commit de documentation.
> Dernière mise à jour : 2026-10-11

## Où on en est

| | |
|---|---|
| Phase en cours | **0 — Mise en place** |
| Dernière étape terminée | **0.3** — Socle technique (branche `etape/0.3-socle`, issue #1 ; terminée à la fusion de la pull request) |
| Prochaine étape | **0.4** — Vérification automatique GitHub Actions, protection de `main`, Dependabot, contrôle des licences, `built-with-claude.md`, bilan de phase |
| Lancement | Uniquement sur « forward » de Vincent |

## Historique des étapes

| Étape | Statut | Commits | Notes |
|---|---|---|---|
| 0.1 Dépôt GitHub, licence, README | Terminée | `99c5bb1`, `abea592` | Licence MIT (DEC-011) |
| — Correcteur orthographique | Terminée | `41d0937` | `cspell.json` (anglais + français) |
| 0.2 Claude Code dans VS Code | Terminée | — | Version 2.1.296, mode Manual |
| — `CLAUDE.md` + fichiers de reprise | Terminée | `9b318b5` | |
| 0.C Cadrage + auto-évaluation + roadmap v1.1 | Terminée | `9744c1d` (dernier commit direct sur `main`) | DEC-012 à DEC-042 ; 11 nouveaux documents |
| 0.3 Socle technique | Terminée (pull request à fusionner) | `318b113` config, `fa34645` tests, `57d41e0` code, + commit docs | Issue #1. Workspaces npm, TypeScript 6.0.3 strict, Vitest 5 + couverture sans seuil, ESLint 10, Prettier 3 ; DEC-043 |

## Décisions en attente de validation

Aucune.

## Écarts avec la roadmap

- **TypeScript 6.0.3 au lieu de la dernière version (7.0.2)** : `typescript-eslint` 8.71.1 exige TypeScript < 6.1. À revoir quand `typescript-eslint` acceptera TypeScript 7.
- **Versions exactes notées dans `architecture.md` §3 dès l'étape 0.3** (la roadmap le prévoyait à 0.4) : le point correspondant de 0.4 est donc déjà fait pour le socle.
- **Vérifications ajoutées au mode strict** (`noUncheckedIndexedAccess`, `noImplicitOverride`, `noFallthroughCasesInSwitch`), extensions VS Code recommandées et `engines` dans `package.json` : propositions acceptées pendant l'étape 0.3.

## Points ouverts

- Option : figer le mode Manual dans les réglages VS Code (`"claudeCode.initialPermissionMode": "manual"`).
- À vérifier à l'étape 2a.1 : Edge utilisable par Playwright dans la vérification automatique (Linux).
- Passage à Node 24 : à décider au début de 2a.
- Analyse ESLint avec informations de types (détecte par ex. les promesses non attendues) : à décider au début de 2a.
- Incident résolu à l'étape 0.3 : un vieux npm 2.15.12 installé dans le dossier personnel de Vincent prenait la place du bon npm dans les scripts (npm cherche aussi les programmes dans les `node_modules` des dossiers parents). Supprimé. À retenir si un comportement étrange de npm réapparaît.

## Organisation du travail

Voir `release-process.md` §1 (rôles de Vincent, Claude Code et Cowork).
