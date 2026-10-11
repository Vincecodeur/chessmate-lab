# chessmate-lab

**Un jeu d'échecs dans le navigateur, construit pas à pas pour apprendre à développer un jeu — et à le faire avec une IA.**

chessmate-lab est un projet d'apprentissage mené en public. L'objectif n'est pas de concurrencer les grands sites d'échecs, mais de construire un vrai jeu complet, proprement, en documentant chaque décision : comment on conçoit un moteur de règles, comment on le prouve, comment on sépare la logique de l'affichage, comment on teste, comment on publie… et comment on travaille avec Claude (Claude Code dans VS Code, Cowork) sans lui laisser le volant.

## Ce que proposera le jeu

- **Trois façons de jouer** : à deux sur le même écran, contre l'ordinateur (plusieurs niveaux), et en ligne contre un ami grâce à un code à partager.
- **Les règles complètes des échecs** : roque, prise en passant, promotion, échec et mat, pat, nulles.
- **Des parties à la carte** : pendule (cadences prêtes ou personnalisées), annulation de coup, plateau retournable, historique consultable, aides visuelles — chacune activable à la création de la partie.
- **Un jeu agréable et accessible** : style moderne et épuré, animations et sons désactivables, jouable entièrement au clavier, couleurs pensées pour les daltoniens, en français et en anglais.
- **Du respect** : aucune collecte de données ; paramètres et statistiques restent dans votre navigateur.
- **Plus tard** : un tutoriel interactif pour apprendre les échecs.

Liste détaillée : [`docs/features.md`](docs/features.md).

## Où en est le projet

**Phase 0 — mise en place.** Le cadrage est terminé (vision, fonctionnalités, architecture, stratégie de tests, organisation) ; le code commence. La première version jouable (v0.1.0) sera publiée ici à la fin de la phase 2a.

- État détaillé : [`docs/project-status.md`](docs/project-status.md)
- Étapes et versions prévues : [`docs/roadmap.md`](docs/roadmap.md)

## Comment il est construit

- **Documentation d'abord** : chaque décision structurante est écrite et justifiée ([`docs/decisions.md`](docs/decisions.md)) avant d'être codée.
- **Un moteur de règles indépendant** de l'affichage, prouvé par des tests (dont le « perft », qui compte tous les coups possibles et les compare à des valeurs de référence).
- **Tests à trois niveaux** (moteur, logique du jeu, parcours complets dans un navigateur), vérification automatique à chaque pull request, recette manuelle avant chaque version.
- **Une étape = une issue, une branche, une pull request**, avec des commits séparés pour la configuration, les tests, le code et la documentation.
- **Avec Claude, sous contrôle** : Claude propose un plan, Vincent valide ; aucune initiative sans accord ([`CLAUDE.md`](CLAUDE.md)). Le récit de ce qui a marché — et des erreurs de l'IA — sera tenu dans `docs/built-with-claude.md`.

## Technologies

TypeScript · Phaser · Vite · Vitest · Playwright · ESLint · Prettier · Node.js · GitHub Actions · GitHub Pages

## Lancer le projet

Il n'y a pas encore de jeu à lancer : pour l'instant, le dépôt contient le socle technique et le moteur de règles (en cours). Les instructions complètes arriveront dans `CONTRIBUTING.md` (phase 2a).

**Prérequis** : [Node.js](https://nodejs.org/) 22.13 ou plus récent (npm est inclus).

```
npm install
```
Installe les outils du projet (à faire une fois, puis après chaque changement de `package-lock.json`).

| Commande | Rôle |
|---|---|
| `npm test` | Lance les tests |
| `npm run test:coverage` | Lance les tests et mesure la couverture (rapport détaillé dans `packages/engine/coverage/index.html`) |
| `npm run typecheck` | Vérifie les types TypeScript |
| `npm run lint` | Cherche les erreurs probables avec ESLint |
| `npm run format:check` | Vérifie la mise en forme avec Prettier, sans rien modifier |
| `npm run format` | Met en forme tous les fichiers avec Prettier |

## Documentation

| Document | Rôle |
|---|---|
| [État du projet](docs/project-status.md) | Où en est le projet — à lire en premier |
| [Vision produit](docs/product-vision.md) | Ce que le projet est et n'est pas |
| [Fonctionnalités](docs/features.md) | Écrans et fonctionnalités, avec leur phase |
| [Roadmap](docs/roadmap.md) | Phases, étapes, critères de fin, objectifs d'apprentissage |
| [Architecture](docs/architecture.md) | Organisation du code et outils |
| [Décisions](docs/decisions.md) | Journal des décisions (DEC-xxx) |
| [Stratégie de tests](docs/test-strategy.md) | Tests, style, vérification automatique, recette |
| [Organisation et versions](docs/release-process.md) | Rôles, issues, branches, pull requests, versions, publication |
| [Graphisme, son, accessibilité](docs/design-guidelines.md) | Style, son, accessibilité, langues, navigateurs |
| [Exigences hors fonctionnalités](docs/non-functional.md) | Sauvegarde, performance, en ligne, retours, dépendances |
| [Risques](docs/risks.md) | Risques et plans B |
| [Crédits](docs/credits.md) | Registre des images, sons, polices et licences |
| [Apprentissage](docs/learning-log.md) | Objectifs d'apprentissage et bilans de phase |
| [Idées pour plus tard](docs/post-mvp-backlog.md) | Hors périmètre actuel |
| [Message de reprise](docs/handoff-prompt.md) | Reprendre le projet dans une nouvelle conversation |

## Licence

[MIT](LICENSE) © 2026 Vincent Gueret — sauf ressources listées dans [`docs/credits.md`](docs/credits.md), sous leur propre licence.
