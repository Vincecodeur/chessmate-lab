# chessmate-lab — État du projet

> **Fichier de reprise.** À lire en premier au début de toute nouvelle conversation (Cowork ou Claude Code).
> Mis à jour à la fin de chaque étape, dans le commit de documentation.
> Dernière mise à jour : 2026-10-11

## Où on en est

| | |
|---|---|
| Phase en cours | **0 — Mise en place** |
| Dernière étape terminée | **0.2** — Claude Code installé dans VS Code, connecté, mode Manual |
| Prochaine étape | **0.3** — Workspaces npm, TypeScript strict, Vitest, un test bidon (`npm test` vert) |
| Lancement | Uniquement sur « forward » de Vincent |

## Historique des étapes

| Étape | Statut | Commits | Notes |
|---|---|---|---|
| 0.1 Dépôt GitHub, licence, README | Terminée | `99c5bb1`, `abea592` | Licence MIT (DEC-011) |
| — Correcteur orthographique | Terminée | `41d0937` | Hors roadmap : `cspell.json` (anglais + français) |
| 0.2 Claude Code dans VS Code | Terminée | — (aucun fichier) | Version 2.1.296, mode Manual |
| — `CLAUDE.md` + fichiers de reprise | En attente de commit | — | Avancé depuis l'étape 0.5 (décision Vincent) |

## Décisions en attente de validation

DEC-004 (moteur indépendant de Phaser), DEC-005 (plateau 8×8), DEC-006 (nouvel état à chaque coup), DEC-010 (Vitest) — statut « Proposée » dans `decisions.md`.

## Écarts avec la roadmap

- `CLAUDE.md` créé à l'étape 0.2 au lieu de 0.5 → mettre `roadmap.md` à jour à l'étape 0.5.
- `cspell.json` ajouté hors roadmap.

## Points ouverts

- Versions exactes des outils (Node.js, TypeScript, Vite, Phaser, Vitest, Claude Code) à noter dans `architecture.md` à l'étape 0.5.
- Option : figer le mode Manual dans les réglages VS Code (`"claudeCode.initialPermissionMode": "manual"`).

## Organisation du travail

- **Claude Code (VS Code)** : exécute les étapes, en mode Plan puis Manual.
- **Cowork** : prépare les messages pour Claude Code, relit son travail par rapport aux docs et à la méthode.
- **Vincent** : valide chaque plan et chaque modification, lance les commits et les push.
