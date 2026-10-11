# chessmate-lab — Exigences hors fonctionnalités

> Statut : v1.1 — cadrage clôturé — 2026-10-11
> Dernière mise à jour : 2026-10-11
> Sauvegarde, performance, réseau, retours de joueurs, dépendances. Les risques sont dans `risks.md`.

## 1. Sauvegarde (DEC-030)

- La partie en cours (2 joueurs même écran, contre l'ordinateur) est enregistrée automatiquement **dans le navigateur** après chaque coup.
- À la réouverture du jeu : « Reprendre la partie en cours ? » (Oui / Nouvelle partie).
- La pendule est mise en pause à la fermeture et reprend à la réouverture.
- **Format versionné** : la sauvegarde porte un numéro de version de format ; une sauvegarde d'un ancien format ou illisible est ignorée avec un message, sans bloquer le jeu (détail décidé au début de 2b).
- Parties en ligne : pas de sauvegarde locale ; c'est le serveur qui tient la partie (voir §3).
- Export / import de parties (format PGN) : reste dans `post-mvp-backlog.md`.

## 2. Performance (DEC-031)

Objectifs mesurés sur un PC de bureau courant avec Chrome ou Edge. **Valeurs proposées, à confirmer au début de la phase concernée** après une première mesure.

| Mesure | Objectif | Comment on vérifie | Phase |
|---|---|---|---|
| Fluidité des animations | 60 images par seconde, sans saccade visible | Outils de performance du navigateur + recette | 2 |
| Affichage du jeu au premier chargement | < 3 s | Test de bout en bout chronométré | 2 |
| Réponse de l'ordinateur au niveau le plus fort | < 2 s par coup | Test chronométré sur des positions de référence | 3 |
| Interface pendant que l'ordinateur réfléchit | Reste réactive (calcul en arrière-plan) | Test de bout en bout | 3 |
| Coup en ligne affiché chez l'adversaire | < 0,5 s sur réseau local | Test à deux navigateurs | 4 |
| Validation des règles (perft profondeur 4, position initiale) | Mesurée, sans objectif | Test Vitest | 1 |

Principe : **mesurer avant d'optimiser**. Aucune optimisation sans mesure qui montre un problème.

Méthode : la machine de référence est le PC de Vincent ; les mesures sont faites à la main (outils du navigateur) et par des tests indicatifs. Les temps mesurés dans la vérification automatique GitHub varient trop pour servir de seuil bloquant.

## 3. Mode en ligne (phase 4)

| Sujet | Décision | Réf. |
|---|---|---|
| Hébergement | Étude à l'étape 4.1 ; sans offre gratuite, usage local seulement (client et serveur lancés en local) | DEC-042 |
| Trouver un adversaire | Le créateur reçoit un **code / lien à partager** ; pas de file d'attente publique | DEC-032 |
| Autorité | Le serveur tient l'état officiel et vérifie chaque coup avec le moteur (anti-triche) | DEC-004 |
| Pendule | Gérée par le serveur (référence de temps unique) | — |
| Déconnexion | **Délai de 60 s pour revenir**, pendule qui continue ; passé le délai, défaite | DEC-033 |
| Annuler un coup | Seulement avec l'accord de l'adversaire | `features.md` C-01 |
| Données | Pseudo temporaire, rien de conservé après la partie | DEC-028 |
| Sécurité de base | Messages reçus vérifiés (format, taille), nombre de parties par connexion limité, codes de partie impossibles à deviner | — |

## 4. Retours de joueurs (DEC-034)

- **Modèles d'issues GitHub** : « Signaler un bug » et « Proposer une idée » (mis en place avec `CONTRIBUTING.md`, étape 2a.3).
- **Lien dans le jeu** (écran À propos) vers ces formulaires GitHub — aucun formulaire maison, aucune donnée stockée par le jeu.
- **Testeurs proches** : 2 ou 3 personnes testent à chaque version de fin de phase (2, 3, 4) avec une courte liste de questions ; leurs retours deviennent des issues.

## 5. Dépendances (DEC-035)

- **Dependabot** (GitHub, gratuit) : alertes en cas de faille connue et pull requests de mise à jour.
- Une mise à jour n'est fusionnée qu'après vérification automatique verte et validation de Vincent.
- Correctifs de sécurité : traités dès qu'ils arrivent. Mises à jour importantes (changement de version majeure, ex. Phaser) : regroupées en début de phase, jamais en milieu.
- Versions exactes fixées dans le fichier de verrouillage npm (`package-lock.json`), commité.
