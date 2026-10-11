# chessmate-lab — État du projet

> **Fichier de reprise.** À lire en premier au début de toute nouvelle conversation (Cowork ou Claude Code).
> Mis à jour à la fin de chaque étape, dans le commit de documentation.
> Dernière mise à jour : 2026-10-11

## Où on en est

| | |
|---|---|
| Phase en cours | **0 — Mise en place** |
| Dernière étape terminée | **0.C** — Cadrage complet, auto-évaluation, roadmap v1.1 |
| Prochaine étape | **0.3** — Socle : workspaces npm, TypeScript strict, Vitest + mesure de couverture, ESLint, Prettier, test bidon ; première étape sur branche + pull request |
| Lancement | Uniquement sur « forward » de Vincent |

## Historique des étapes

| Étape | Statut | Commits | Notes |
|---|---|---|---|
| 0.1 Dépôt GitHub, licence, README | Terminée | `99c5bb1`, `abea592` | Licence MIT (DEC-011) |
| — Correcteur orthographique | Terminée | `41d0937` | `cspell.json` (anglais + français) |
| 0.2 Claude Code dans VS Code | Terminée | — | Version 2.1.296, mode Manual |
| — `CLAUDE.md` + fichiers de reprise | Terminée | `9b318b5` | |
| 0.C Cadrage + auto-évaluation + roadmap v1.1 | Terminée | commit de documentation du 2026-10-11 (dernier commit direct sur `main`) | DEC-012 à DEC-042 ; 11 nouveaux documents |

## Décisions en attente de validation

Aucune.

## Écarts avec la roadmap

Aucun.

## Points ouverts

- Option : figer le mode Manual dans les réglages VS Code (`"claudeCode.initialPermissionMode": "manual"`).
- À vérifier à l'étape 2a.1 : Edge utilisable par Playwright dans la vérification automatique (Linux).

## Organisation du travail

Voir `release-process.md` §1 (rôles de Vincent, Claude Code et Cowork).
