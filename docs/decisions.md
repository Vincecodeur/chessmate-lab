# chessmate-lab — Journal des décisions (ADR)

> Format : une entrée par décision structurante. Statut = **Acceptée** (validée par Vincent) ou **Proposée** (en attente de validation).
> Dernière mise à jour : 2026-10-11

---

## DEC-001 — TypeScript pour tout le projet
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Contexte** : le projet aura un client navigateur et, en phase 4, un serveur.
- **Décision** : TypeScript partout (client, moteur, serveur Node.js).
- **Pourquoi** : un seul langage à apprendre ; le moteur de règles est partagé tel quel entre client et serveur.
- **Alternatives écartées** : TypeScript + serveur Python (deux langages, règles à dupliquer) ; Python + Pygame (pas de version navigateur).

## DEC-002 — Phaser comme moteur d'affichage
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : l'interface utilise le moteur de jeu Phaser.
- **Pourquoi** : objectif de formation au développement de jeu, réutilisable pour de futurs projets de jeu.
- **Conséquence acceptée** : plus lourd que nécessaire pour un plateau d'échecs ; compensé par DEC-004.
- **Alternatives écartées** : TypeScript sans framework ; React.

## DEC-003 — Règles complètes dès la phase 1
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : roque, prise en passant, promotion, échec, mat, pat en phase 1 ; nulles avancées (répétition, 50 coups, matériel insuffisant) en phase 2.
- **Pourquoi** : le jeu est correct dès qu'il devient jouable.

## DEC-004 — Moteur de règles indépendant de Phaser
- **Date** : 2026-10-11 — **Statut** : Proposée
- **Décision** : le paquet `engine` n'importe jamais Phaser, ni le client, ni le serveur.
- **Pourquoi** : tests rapides sans navigateur ; réutilisation par le serveur pour refuser les coups illégaux ; interface remplaçable.

## DEC-005 — Plateau représenté par un tableau 8 × 8
- **Date** : 2026-10-11 — **Statut** : Proposée
- **Pourquoi** : le plus lisible pour apprendre. Les représentations plus rapides (0x88, bitboards) restent possibles plus tard sans toucher au client.

## DEC-006 — `applyMove` renvoie un nouvel état
- **Date** : 2026-10-11 — **Statut** : Proposée
- **Pourquoi** : évite les modifications accidentelles d'un état partagé ; simplifie l'annulation de coup et la recherche de l'adversaire ordinateur.
- **Coût** : un peu plus de mémoire et de calcul, négligeable ici.

## DEC-007 — Adversaire ordinateur codé par Vincent
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : en phase 3, pas de moteur externe (ex. Stockfish). Vincent écrit l'adversaire ; Claude explique et relit.
- **Note** : un moteur externe reste un candidat pour plus tard (voir `post-mvp-backlog.md`), sans remplacer l'adversaire codé par Vincent.
- **Pourquoi** : objectif d'apprentissage prioritaire sur le niveau de jeu.

## DEC-008 — Zéro coût strict
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : uniquement des services gratuits. Dès qu'un coût apparaît : arrêt et décision de Vincent.
- **Conséquence** : si aucun hébergement gratuit ne convient en phase 4, le mode en ligne reste limité au réseau local.

## DEC-009 — Dépôt public `chessmate-lab`
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : dépôt public sur le GitHub personnel de Vincent ; publication du jeu via GitHub Pages.
- **Licence** : voir DEC-011.

## DEC-011 — Licence MIT
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : le dépôt est publié sous licence MIT, titulaire des droits : Vincent Gueret.
- **Pourquoi** : licence permissive et très répandue ; chacun peut réutiliser le code en conservant la mention de l'auteur. Cohérente avec Phaser, lui-même sous MIT.
- **Alternatives écartées** : GPL-3.0 (oblige les versions modifiées distribuées à rester open source) ; aucune licence (code non réutilisable légalement).

## DEC-010 — Vitest pour les tests
- **Date** : 2026-10-11 — **Statut** : Proposée
- **Pourquoi** : la méthode de travail prévoit pytest, qui est un outil Python. Vitest joue le même rôle en TypeScript et s'intègre à Vite. Le cycle reste : règle → modèle → service → tests → commit.
