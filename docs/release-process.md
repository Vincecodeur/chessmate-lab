# chessmate-lab — Organisation du travail, versions et publication

> Statut : v1.1 — cadrage clôturé — 2026-10-11

## 1. Rôles

| Qui | Fait | Ne fait pas |
|---|---|---|
| **Vincent** | Valide chaque plan et chaque modification ; crée les issues et les pull requests (site GitHub) ; lance commits, envois et fusions ; fait la recette | — |
| **Claude Code** (VS Code) | Propose un plan ; écrit tests, code, config et docs après validation ; rédige le texte des issues, des pull requests et des messages de commit ; relit une pull request à la demande | Commit, envoi, fusion, toute commande qui modifie GitHub |
| **Cowork** | Entrée : plan, compte rendu de fin de tâche ou lien de pull request collé par Vincent. Sortie : liste des écarts avec les docs et la méthode, et un avis « on peut fusionner / à corriger » | Modifier le code |

## 2. Suivi des tâches : GitHub Issues

- **Une issue par étape** de la roadmap (ex. « 1.4 Pions : avance, prise, promotion »), avec ses critères de fin (colonne « Fini quand » de la roadmap).
- Les bugs trouvés deviennent aussi des issues.
- Un tableau GitHub Projects (gratuit) peut afficher les issues par colonne — optionnel.

## 3. Branches, commits et pull requests

À partir de l'étape 0.3 (DEC-019). La vérification automatique est bloquante à partir de l'étape 0.4 ; la pull request de 0.3 est la seule fusionnée sans elle.

```
main (protégée à partir de 0.4)
 └── etape/1.4-pions                 ← une branche par étape
       ├── commit config  (si besoin : package.json, tsconfig, ESLint, workflows…)
       ├── commit tests   (ils échouent)
       ├── commit code    (ils passent)
       └── commit docs    (dont project-status.md)
     → envoi sur GitHub, une seule fois, étape terminée (DEC-040)
     → pull request « Étape 1.4 — Pions » (lie l'issue)
     → vérification automatique verte + relecture par Claude + avis Cowork si besoin
     → fusion par Vincent (commit de fusion, DEC-020)
```

- Nommage : `etape/<numéro>-<sujet-court>` ; correctifs : `fix/<sujet-court>`.
- Quatre types de commits jamais mélangés : config, tests, code, docs (DEC-041). Étape triviale : un seul commit, justifié dans la pull request.
- Protection de `main` adaptée à un développeur seul : vérification automatique obligatoire, pas d'approbation exigée (on ne peut pas approuver sa propre pull request), règles appliquées aussi à l'administrateur, seule la fusion par commit de fusion autorisée (réglages du dépôt).

## 4. Versions

- Première version : **v0.1.0 à la fin de la phase 2a** (première version jouable). Puis une version par fin de sous-phase ou de phase (voir `roadmap.md`).
- Numérotation **MAJEUR.MINEUR.CORRECTIF** : CORRECTIF = correction de bug ; MINEUR = fin de sous-phase ; MAJEUR = `1` quand les trois modes de jeu sont terminés.
- Avant chaque version : recette manuelle complète (`docs/recette.md`, `test-strategy.md` §6) ; tout point KO bloque la version.
- `CHANGELOG.md` à la racine : ce qui change dans chaque version, en français simple.
- Une **Release GitHub** par version, avec le contenu du CHANGELOG et le résumé de la recette.
- **Version corrective** : branche `fix/…` créée depuis l'étiquette de la version à corriger, nouvelle étiquette `vX.Y.Z+1`, puis fusion de la correction dans `main`.

## 5. Publication du jeu

- GitHub Pages (gratuit pour un dépôt public), mis en place à l'étape 2a.2.
- **Publication automatique à chaque version** : l'étiquette `vX.Y.Z` déclenche la construction et la mise en ligne. Le site montre toujours une version stable.
- Points techniques à régler à l'étape 2a.2 : adresse de base du site (`/chessmate-lab/`), autorisation de publier depuis une étiquette.
- Serveur du mode en ligne : étude à l'étape 4.1 (DEC-042).

## 6. Présentation publique (DEC-021)

| Élément | Contenu | Quand |
|---|---|---|
| README (vitrine) | Ce qu'est le projet et pourquoi, ce que propose le jeu, où il en est, comment il est construit avec Claude, comment le lancer, lien vers la démo ; renvoie à la roadmap sans la recopier | Maintenu à chaque version ; captures à partir de v0.1.0 |
| Badges | Vérification automatique, licence, dernière version | 2a.2 |
| Guide de contribution | `CONTRIBUTING.md` : installer, lancer, conventions, proposer un changement | 2a.3 |
| Récit « construit avec Claude » | `docs/built-with-claude.md` : méthode, ce qui a marché, erreurs de Claude et comment elles ont été repérées, leçons | Créé à 0.4, complété à chaque fin de phase |
