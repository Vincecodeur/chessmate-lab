# CLAUDE.md — chessmate-lab

Projet d'apprentissage : un jeu d'échecs en TypeScript (Phaser côté affichage, Node.js côté serveur).
Vincent apprend le développement de jeu ET le travail avec Claude. Comprendre compte plus qu'aller vite.

Avant toute action, lire : `docs/project-status.md` (en premier : où en est le projet), puis `docs/roadmap.md`, `docs/decisions.md`, `docs/architecture.md`, `docs/product-vision.md`. Les autres documents sont listés dans `README.md` : lire ceux qui concernent l'étape en cours.

## Règle n°1 — Aucune initiative sans validation

- Faire uniquement ce que demande le message ET ce que prévoit `docs/roadmap.md` pour l'étape en cours.
- Tout élément non prévu (dépendance, fichier, outil, option de configuration, réorganisation de code, test supplémentaire, amélioration « en passant ») est une **proposition**, jamais une action.
- Format obligatoire d'une proposition, puis attendre la réponse de Vincent :
  > **Proposition** — Quoi : … / Pourquoi : … / Alternative : … / Impact si on ne le fait pas : …
- En cas de doute ou d'ambiguïté : poser la question au lieu de choisir.
- Ne jamais enchaîner sur l'étape suivante. Seul Vincent lance une étape (mot-clé « forward »).

## Règle n°2 — Ne jamais inventer

- Si une fonction, une option ou un comportement (Phaser, Vitest, Vite, Node.js, TypeScript) n'est pas certain : vérifier dans la version installée (`package.json`, `node_modules`) ou la documentation officielle. Sinon, écrire « je ne sais pas ».
- Ne jamais présenter une supposition comme un fait.

## Façon de travailler

- Avant de modifier quoi que ce soit : présenter un plan court (fichiers touchés, commandes à lancer) et attendre la validation.
- Expliquer le **pourquoi** de chaque choix, en français simple, sans jargon non expliqué.
- Après 3 erreurs sur le même sujet : s'arrêter, chercher la cause réelle, repartir d'une version minimale vérifiée.
- **Phase 3 (adversaire ordinateur) : Claude n'écrit pas ce code.** Vincent le code lui-même (DEC-007). Claude explique les notions, donne des indices, relit et signale les erreurs — sans fournir la solution complète, sauf si Vincent la demande explicitement.

## Tests

- Un test qui échoue est une information, pas un obstacle.
- **Ne jamais modifier, désactiver ou supprimer un test pour le faire passer.** Si un test semble faux, l'expliquer et proposer la correction ; Vincent décide.

## Règles techniques

- `packages/engine` n'importe jamais Phaser, ni `client`, ni `server` (DEC-004).
- TypeScript en mode strict. Tests : Vitest (moteur, logique client), Playwright (bout en bout). ESLint + Prettier. Voir `docs/test-strategy.md`.
- Logique du client écrite hors des scènes Phaser, pour être testable sans affichage (DEC-016).
- Aucune installation de dépendance sans validation explicite.
- Code et noms (variables, fonctions, fichiers) en anglais. Réponses à Vincent en français.
- Aucun texte affiché au joueur écrit en dur : tout passe par les fichiers de traduction français / anglais (DEC-026).
- Toute image, son, musique ou police ajoutée = une ligne dans `docs/credits.md`, dans le même commit (DEC-029).

## Environnement

- Windows, terminal **PowerShell** dans VS Code. Toute commande proposée doit fonctionner dans PowerShell (pas de syntaxe Linux comme `rm -rf`, `export`, `&&` non garanti).
- Les scripts npm doivent fonctionner à la fois sous Windows (poste de Vincent) et sous Linux (vérification automatique GitHub) : pas de commande propre à un système dans `package.json`.

## Contraintes du projet

- **Zéro coût (DEC-008)** : ne jamais proposer de service, d'outil ou d'hébergement payant sans l'indiquer clairement comme payant. Dès qu'un coût apparaît, s'arrêter et laisser Vincent décider.
- **Dépôt public** : ne jamais écrire dans le code, les docs ou les commits de données personnelles, de secrets (`.env`, clés, mots de passe, jetons) ni de référence au contexte professionnel de Vincent.

## Git

- Ne jamais lancer `git commit`, `git push`, fusionner, ni aucune commande qui modifie GitHub : proposer les commandes, les messages de commit et le texte des issues / pull requests ; Vincent les exécute.
- 1 étape = 1 issue + 1 branche `etape/<numéro>-<sujet>` + 1 pull request (voir `docs/release-process.md`).
- **Tests d'abord** : commit des tests (qui échouent), puis commit du code (DEC-040). La branche n'est envoyée sur GitHub qu'en fin d'étape.
- Quatre types de commits jamais mélangés : config, tests, code, docs (DEC-041). Étape triviale : un seul commit, à justifier.
- Relire chaque pull request à la demande de Vincent : écarts avec les docs, tests manquants, risques.
- Avant chaque commit : signaler ce qui est obsolète, manquant ou contradictoire dans `docs/`.

## Reprise et passation

- `docs/project-status.md` est la source de vérité sur l'avancement. Si l'état réel du dépôt (`git log`, fichiers) le contredit, le signaler avant toute action.
- À la fin de chaque étape, proposer la mise à jour de `docs/project-status.md` (étape terminée, commits, prochaine étape, décisions en attente, écarts) dans le commit de documentation.
- Le message pour reprendre le projet dans une nouvelle conversation est dans `docs/handoff-prompt.md`.

## Compte rendu de fin de tâche

Terminer chaque tâche par ce résumé :

```
Fichiers modifiés : …
Commandes lancées : …
Résultat des tests / de tsc : …
Propositions en attente de validation : …
Prochaine action attendue de Vincent : …
```
