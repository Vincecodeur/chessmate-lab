# chessmate-lab — Objectifs d'apprentissage et bilans

> Statut : v1.1 — cadrage clôturé — 2026-10-11
> Un bilan court (une page, environ 15 minutes) à la fin de chaque phase.
> Dernière mise à jour : 2026-10-12

## 1. Objectifs

| # | Compétence | À la fin du projet, Vincent sait… | Phases principales |
|---|---|---|---|
| O-A | Architecture d'un jeu | séparer règles / affichage / réseau ; représenter et faire évoluer l'état d'une partie ; organiser des scènes et des événements Phaser | 1, 2, 4 |
| O-B | Algorithmique | générer les coups légaux et le prouver (perft) ; écrire une recherche minimax avec alpha-bêta ; mesurer et améliorer une performance | 1, 3 |
| O-C | Qualité et livraison | écrire des tests utiles ; faire tourner des vérifications automatiques sur GitHub ; publier une version ; tenir un historique Git lisible | toutes |
| O-D | Travail avec Claude | demander un plan avant le code ; relire et refuser une proposition ; écrire et faire évoluer CLAUDE.md ; créer une skill ; repérer quand Claude invente ou prend une initiative | toutes |

Objectifs travaillés et « Je sais à la fin… » de chaque phase : voir `roadmap.md`. Le bilan de phase vérifie ces points.

## 2. Modèle de bilan de phase

```
## Bilan phase X — <date>

Objectifs travaillés : O-…
Ce que j'ai appris :
Ce qui a bloqué, et pourquoi :
Ce que Claude a bien fait / mal fait :
Ce que je ferais autrement :
Temps réel passé vs estimé :
À changer dans la méthode, CLAUDE.md ou la roadmap :
```

## 3. Bilans

## Bilan phase 0 — 2026-10-12

> Les parties marquées  sont rédigées par Claude dans Cowork à partir des faits de la phase. Vincent les corrige avant le commit, puis retire la mention.

**Objectifs travaillés** : O-C (outillage qualité, vérification automatique), O-D (CLAUDE.md, mode Manual, relecture des plans).

**« Je sais à la fin » (roadmap)**
- Expliquer le rôle de chaque outil installé :  oui pour TypeScript, Vitest, ESLint, Prettier, GitHub Actions, Dependabot et `licensee` ; à consolider pour la couverture de code, qui ne sert vraiment qu'à partir de la phase 1.
- Faire passer une modification par branche, pull request et vérification automatique : **oui**, démontré par les pull requests #2, #4 et #5.

**Ce que j'ai appris** 
- Le chemin complet d'une modification : branche, commits séparés par type, envoi, pull request, vérifications, fusion par commit de fusion, nettoyage des branches.
- Ce que fait une ruleset GitHub et comment prouver qu'elle bloque (test de blocage).
- Pourquoi fixer les actions GitHub par identifiant de commit, et ce que contrôlent Dependabot, `dependency-review` et `licensee`.
- Lire les licences des dépendances et décider d'exceptions paquet par paquet.

**Ce qui a bloqué, et pourquoi**
- Node 22 trop ancien pour `licensee` → passage à Node 24 (DEC-048).
- `dependency-review` en échec → « Dependency graph » désactivé sur le dépôt.
- TypeScript 7 incompatible avec `typescript-eslint` → TypeScript 6.0.3.
- Vieux npm 2.15.12 dans le dossier personnel → supprimé.
- Commit absent au test de blocage → commandes collées d'un coup dans PowerShell ; repéré avec `git status` avant la pull request.

**Ce que Claude a bien fait / mal fait** (détail : `built-with-claude.md`)
- Bien : plan complet avant code, propositions utiles au format prévu, incompatibilité signalée au lieu d'être contournée, accord demandé avant de modifier.
- Mal : une décision attribuée à Vincent à tort (DEC-043) ; un plan corrigé par ajouts en tête au lieu d'être réécrit. Côté Cowork : cadrage de départ insuffisant, rattrapé par 4 sessions de cadrage.

**Ce que je ferais autrement** 
- Cadrer entièrement avant de créer le dépôt.
- Lancer les commandes Git une par une dès le début, avec `git status` avant chaque commit.
- Activer les options GitHub (Dependency graph) avant d'exiger les vérifications qui en dépendent.

**Temps réel passé vs estimé**
- Réel : **environ 4 h, en une journée** (déclaré par Vincent, cadrage compris).
- Estimé dans la roadmap v1.1 : « 2 à 3 semaines restantes », soit environ 12 à 21 h au rythme de 6 à 7 h par semaine.
- Écart : la phase 0 a pris beaucoup moins que prévu. Une seule phase ne suffit pas pour recalibrer les estimations des phases suivantes ; à réévaluer après la phase 1.

**À changer dans la méthode, CLAUDE.md ou la roadmap** (propositions, rien n'est appliqué sans décision de Vincent)
1. Ajouter dans `release-process.md` : « commandes Git une par une ; `git status` avant chaque commit ».
2. Ajouter dans `CLAUDE.md` : en cas de correction d'un plan, toujours renvoyer le plan complet réécrit.
3. Début de chaque session Claude Code : vérifier que le mode affiché est Manual.
