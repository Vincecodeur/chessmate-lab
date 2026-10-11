# chessmate-lab — Risques et plans B

> Statut : v1.1 — cadrage clôturé — 2026-10-11
> Dernière mise à jour : 2026-10-11
> Revu à chaque fin de phase, avec le bilan d'apprentissage.

| # | Risque | Probabilité | Effet | Prévention | Si ça arrive |
|---|---|---|---|---|---|
| K-01 | Une phase bloque plus de 2 semaines (difficulté, manque de temps) | Moyenne | Projet figé, démotivation | Étapes courtes, versions publiables par sous-phase | **Pause assumée** : `project-status.md` mis à jour, reprise plus tard avec `handoff-prompt.md` (DEC-036) |
| K-02 | Perte de l'accès au compte Claude utilisé, ou outil qui devient payant | Faible à moyenne | Plus d'assistant de code | Tout le contexte est dans le dépôt (docs, CLAUDE.md), pas dans les conversations | Arrêt et décision de Vincent (contrainte zéro coût, DEC-008) ; le projet reste réalisable sans Claude |
| K-03 | Phaser inadapté (limite bloquante, lourdeur) | Faible | Retard en phase 2 | Logique et règles hors de Phaser (DEC-004, DEC-016) | **Garder Phaser et contourner** ; seul l'affichage serait touché en cas de changement (DEC-037) |
| K-04 | Claude produit du code faux, invente ou prend des initiatives | Élevée | Bugs, incompréhension | Mode Manual, CLAUDE.md, tests, relecture des pull requests | Garde-fou des 3 erreurs (CLAUDE.md) ; noté dans le bilan de phase |
| K-05 | Perte de contexte entre deux conversations | Élevée | Reprise confuse, décisions oubliées | `project-status.md`, `decisions.md`, `handoff-prompt.md` | Message de reprise ; comparaison docs / état réel du dépôt |
| K-06 | Aucun hébergement gratuit convenable pour le serveur | Moyenne | Mode en ligne non publié | Étude au début de la phase 4 (4.1) | Usage local seulement (client et serveur lancés en local) ; v1.0.0 sort quand même avec cette limite (DEC-042) |
| K-07 | Problème de droits sur une image générée par IA ou une ressource | Faible | Ressource à retirer | Registre `credits.md`, conditions des outils vérifiées | Remplacer la ressource ; noter dans `credits.md` |
| K-08 | Faille de sécurité dans une dépendance | Moyenne | Risque pour les joueurs | Dependabot, `package-lock.json` | Mise à jour immédiate (DEC-035) |
| K-09 | Périmètre trop large (phase 2 très chargée, voir `features.md` §3) | Élevée | Longue période sans version publiée | Découpage en sous-phases publiables (roadmap réécrite) | Déplacer des éléments vers une phase suivante ou le backlog (décision écrite) |
| K-10 | Les tests automatiques passent mais le jeu est désagréable à utiliser | Moyenne | Mauvaise expérience | Validation visuelle par fonctionnalité, recette avant chaque version, testeurs proches | Issues, corrections dans une version corrective |
