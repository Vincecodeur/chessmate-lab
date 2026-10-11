# chessmate-lab — Stratégie de qualité et de tests

> Statut : v1.1 — cadrage clôturé — 2026-10-11
> Dernière mise à jour : 2026-10-11

## 1. Principe

Chaque fonctionnalité est **terminée** seulement quand :

1. ses tests existent et passent ;
2. la vérification TypeScript, ESLint et Prettier ne signalent rien ;
3. la vérification automatique GitHub est verte sur la pull request (à partir de l'étape 0.4) ;
4. elle est visible et validée dans le jeu (si elle a un effet visible).

## 2. Les trois niveaux de tests

| Niveau | Ce qu'on teste | Outil | Où | Dès la phase |
|---|---|---|---|---|
| **Moteur** (unitaires) | Chaque règle : déplacements, échec, roque, prise en passant, promotion, mat, pat, nulles ; validation globale par perft | Vitest | `packages/engine/tests` | 1 |
| **Logique client** | Tout ce qui ne dépend pas de l'affichage : options de partie, pendule, historique, annulation, enchaînement des écrans | Vitest | `packages/client/tests` | 2 |
| **Bout en bout** | Le jeu réel dans un navigateur automatique : ouvrir, créer une partie, jouer des coups, vérifier le résultat (ex. mat du berger) | Playwright (gratuit, open source) | `e2e/` | 2a |

**Tester ce que Phaser dessine** : Playwright ne voit pas l'intérieur du dessin Phaser. En mode test, le jeu expose son état (position, écran affiché, messages) via un point d'accès réservé aux tests, et les clics visent des cases dont la position est calculée (étape 2a.1).

Règle de conception qui rend le niveau 2 possible : **la logique du client est écrite hors des scènes Phaser** (fonctions et classes TypeScript simples), les scènes ne font qu'afficher et transmettre les actions du joueur. Même principe que DEC-004, appliqué au client.

Phase 4 : tests du serveur (Vitest) et tests de bout en bout à deux navigateurs.

## 3. Couverture

- Objectif : **au moins 90 % du moteur** couvert par les tests, vérifié automatiquement (la vérification échoue en dessous). Seuil activé à l'étape 1.1 ; avant, la couverture est seulement mesurée.
- Client et serveur : couverture mesurée pour information, sans objectif chiffré.
- Rappel : 90 % de couverture ne prouve pas que les règles sont justes. C'est le perft qui le prouve ; la couverture montre seulement ce qui n'est jamais testé.

## 4. Style de code

| Outil | Rôle |
|---|---|
| TypeScript strict | Erreurs de types |
| ESLint | Erreurs probables et mauvaises pratiques (ex. variable inutilisée, promesse non attendue) |
| Prettier | Mise en forme automatique identique partout ; plus de débat sur les espaces |

## 5. Vérification automatique (GitHub Actions)

À chaque envoi sur une branche et à chaque pull request :

1. installation des dépendances ;
2. Prettier (vérification), ESLint, TypeScript ;
3. tests Vitest + seuil de couverture du moteur ;
4. tests de bout en bout (à partir de l'étape 2a.1) ;
5. contrôle des licences des dépendances npm (DEC-029).

**Bloquant** : la branche `main` est protégée ; une pull request ne peut pas être fusionnée si une vérification échoue.

## 6. Recette manuelle

Les tests automatiques ne voient pas tout : une animation saccadée, une couleur peu lisible, un bouton mal placé ou un parcours confus passent les tests. La recette manuelle couvre ces points.

| Quoi | Détail |
|---|---|
| Support | `docs/recette.md` : une liste de vérifications à faire à la main, regroupées par écran et par fonctionnalité (créée en phase 2a, quand le jeu devient jouable ; complétée à chaque nouvelle fonctionnalité) |
| Quand | Avant chaque version (à partir de v0.1.0, fin de 2a), sur la version construite pour la publication |
| Qui | Vincent |
| Navigateurs | Chrome et Edge (DEC-027) |
| Résultat | Chaque point coché OK / KO ; un KO bloque la version et devient une issue ; le résultat est résumé dans la Release GitHub |

Format d'une ligne de recette :

```
- [ ] E-03 Partie — glisser une pièce sur une case interdite : la pièce revient à sa place et un message explique pourquoi
```

Pour chaque fonctionnalité, la validation visuelle (§1, point 4) reste faite au moment où elle est développée ; la recette revérifie l'ensemble avant de publier.
