# chessmate-lab — Architecture

> Statut : v1.1 — cadrage clôturé — 2026-10-11
> Dernière mise à jour : 2026-10-11

## 1. Principe central : séparer règles, logique et affichage

```
┌──────────────────────────────┐
│ engine (TypeScript pur)       │  Règles du jeu. Aucun lien avec Phaser,
│ packages/engine               │  le navigateur ou le réseau. (DEC-004)
└──────────────┬───────────────┘
      utilisé par │ utilisé par
   ┌──────────────┴───────────────────────────┐
   ▼                                          ▼
┌───────────────────────────────┐   ┌───────────────────────────┐
│ client  packages/client       │   │ server  packages/server    │
│ ┌───────────────────────────┐ │   │ Parties en ligne,          │
│ │ logic : options, pendule, │ │   │ fait autorité :            │
│ │ historique, sauvegarde,   │ │WS │ vérifie chaque coup,       │
│ │ états d'écran (testable)  │◄├──►│ tient la pendule (phase 4) │
│ └────────────┬──────────────┘ │   └───────────────────────────┘
│ ┌────────────▼──────────────┐ │
│ │ scenes : affichage Phaser,│ │
│ │ clics, animations, sons   │ │
│ └───────────────────────────┘ │
└───────────────────────────────┘
```

**Pourquoi**
1. **Tests** : règles et logique client se testent sans navigateur ni affichage (DEC-016).
2. **Réutilisation** : le serveur vérifie les coups avec exactement le même moteur que le client (anti-triche).
3. **Remplaçabilité** : si Phaser devait être remplacé, seules les scènes changeraient (DEC-037).

**Règles à ne jamais enfreindre**
- `engine` n'importe jamais `phaser`, ni rien de `client` ou `server`.
- Dans le client, `logic` n'importe jamais `phaser` ; les scènes appellent la logique, jamais l'inverse.
- Aucun texte affiché écrit en dur : tout passe par les fichiers de traduction (DEC-026).

## 2. Structure du dépôt

```
chessmate-lab/
├── CLAUDE.md                  # Règles du projet pour Claude Code
├── README.md, LICENSE, CHANGELOG.md (2a.2), CONTRIBUTING.md (2a.3)
├── package.json               # Racine : workspaces npm, scripts communs
├── package-lock.json          # Versions exactes (commité)
├── tsconfig.base.json         # TypeScript strict, réglages communs
├── eslint.config.js           # ESLint (typescript-eslint + eslint-config-prettier)
├── .prettierrc.json           # Prettier : apostrophes simples, le reste par défaut
├── .prettierignore            # Markdown exclu (DEC-043), package-lock.json
├── cspell.json                # Correcteur orthographique (anglais + français)
├── .vscode/extensions.json    # Extensions VS Code recommandées (ESLint, Prettier)
├── docs/                      # Documents vivants (liste dans README)
├── packages/
│   ├── engine/                # Phase 1 — règles
│   │   ├── package.json       # @chessmate-lab/engine : scripts test, couverture, typage
│   │   ├── tsconfig.json      # Hérite de tsconfig.base.json
│   │   ├── vitest.config.ts   # Tests et mesure de couverture du moteur
│   │   ├── src/
│   │   └── tests/
│   ├── client/                # Phase 2 (squelette en 2a.1)
│   │   ├── src/
│   │   │   ├── logic/         # Logique testable, sans Phaser
│   │   │   ├── scenes/        # Scènes Phaser
│   │   │   └── i18n/          # Fichiers de traduction fr / en
│   │   ├── public/            # Images, sons, polices (tracés dans docs/credits.md)
│   │   └── tests/
│   └── server/                # Phase 4 — Node.js + WebSocket
│       ├── src/
│       └── tests/
├── e2e/                       # Tests de bout en bout (Playwright)
└── .github/
    ├── workflows/             # Vérification automatique, publication par version
    ├── ISSUE_TEMPLATE/        # Modèles « bug » et « idée »
    └── dependabot.yml         # Mises à jour des dépendances
```

## 3. Outils

| Domaine | Outil | Rôle | Réf. |
|---|---|---|---|
| Langage | TypeScript, mode strict | Erreurs de types détectées avant l'exécution | DEC-001 |
| Affichage | Phaser | Plateau, animations, sons, clics | DEC-002 |
| Construction du client | Vite | Serveur de développement, version publiée | |
| Tests (moteur, logique, serveur) | Vitest + mesure de couverture | Équivalent TypeScript de pytest | DEC-010, DEC-016 |
| Tests de bout en bout | Playwright | Navigateur automatique (Chrome / Edge) | DEC-016, DEC-027 |
| Style | ESLint + Prettier | Erreurs probables + mise en forme automatique | DEC-017 |
| Vérification automatique | GitHub Actions | Style, typage, tests, couverture, licences, à chaque envoi et pull request | DEC-017, DEC-029 |
| Publication | GitHub Pages | Mise en ligne à chaque version | DEC-018 |
| Dépendances | Dependabot | Alertes de failles, pull requests de mise à jour | DEC-035 |
| Serveur (phase 4) | Node.js + WebSocket | Connexion permanente pour les coups en temps réel | |

Les versions exactes sont fixées à l'installation et notées ici (étape 0.3 pour le socle, 2a.1 pour Phaser et Playwright). Aucune version n'est annoncée d'avance.

**Versions installées à l'étape 0.3** (source : `package-lock.json`) — Node.js ≥ 22.13.0 exigé (`engines`), poste de développement en 22.20.0, npm 10.9.3.

| Paquet | Version | Remarque |
|---|---|---|
| `typescript` | 6.0.3 | Pas la 7 : `typescript-eslint` 8.71.1 exige TypeScript < 6.1 |
| `vitest` | 5.0.3 | |
| `@vitest/coverage-v8` | 5.0.3 | Toujours la même version que `vitest` |
| `vite` | 8.3.4 | Installé automatiquement avec Vitest (non déclaré) |
| `eslint` | 10.12.0 | |
| `@eslint/js` | 10.0.1 | |
| `typescript-eslint` | 8.71.1 | |
| `eslint-config-prettier` | 10.1.8 | |
| `prettier` | 3.9.10 | |

## 4. Moteur de règles (`engine`)

### 4.1 Représentation du plateau

Tableau de 8 × 8 cases (DEC-005) : la représentation la plus lisible pour apprendre. Des représentations plus rapides (« 0x88 », « bitboards ») restent possibles plus tard sans toucher au client.

### 4.2 Modèle de données (première idée, finalisée à l'étape 1.1)

```ts
type Color = 'white' | 'black';
type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
interface Piece { type: PieceType; color: Color; }
type Square = { file: number; rank: number }; // 0..7, a1 = {0,0}

interface GameState {
  board: (Piece | null)[][];       // 8×8
  turn: Color;
  castling: { whiteKingSide: boolean; whiteQueenSide: boolean;
              blackKingSide: boolean; blackQueenSide: boolean };
  enPassant: Square | null;
  halfmoveClock: number;            // règle des 50 coups
  fullmoveNumber: number;
}

interface Move { from: Square; to: Square; promotion?: PieceType; }
```

À trancher à l'étape 1.1 et documenter ici :
- **convention d'indexation** du plateau (ex. `board[rank][file]`, rangée 0 = rangée 1 des blancs) ;
- **historique des positions** : nécessaire à la triple répétition (2a.9) et à l'annulation (2b.2). Comme chaque coup crée un nouvel état (DEC-006), garder la liste des états successifs suffit pour annuler ; la répétition compare les positions de cette liste.

### 4.3 Fonctions publiques (contrat)

| Fonction | Rôle |
|---|---|
| `createInitialState()` | Position de départ |
| `fromFEN(fen)` / `toFEN(state)` | Lire / écrire une position au format FEN (format texte standard) |
| `legalMoves(state)` | Tous les coups légaux |
| `applyMove(state, move)` | Renvoie un **nouvel** état, l'ancien n'est pas modifié (DEC-006) |
| `status(…)` | `ongoing`, `check`, `checkmate`, `stalemate`, puis nulles (étape 2a.9) |
| `toSAN(state, move)` | Notation algébrique d'un coup (ex. `Nf3`, `O-O`, `e8=Q+`) — étape 1.8 ; la notation est une règle, elle est donc dans le moteur |

### 4.4 Génération des coups

1. Générer les coups selon le déplacement de chaque pièce, sans tenir compte de l'échec.
2. Jouer chaque coup sur une copie et retirer ceux qui laissent son propre roi attaqué.

Simple à comprendre et à tester ; suffisant pour ce projet (vitesse mesurée, DEC-031).

### 4.5 Validation : perft

Compte tous les coups possibles jusqu'à une profondeur donnée et compare à des valeurs de référence publiques. Position initiale : profondeur 1 = 20, 2 = 400, 3 = 8 902, 4 = 197 281. Les positions de référence supplémentaires (roque, prise en passant, promotion) seront prises sur une source publique citée en phase 1.

## 5. Client (`client`)

| Couche | Contenu |
|---|---|
| `logic/` | Options de partie (DEC-012), déroulement d'une partie (appels au moteur), historique, annulation, pendule, sauvegarde et reprise (DEC-030), statistiques, paramètres généraux, enchaînement des écrans. Testé avec Vitest. |
| `scenes/` | Une scène Phaser par écran (accueil, création, partie, fin, règles, paramètres, statistiques, à propos). Affiche l'état fourni par la logique, transmet les actions du joueur (clic, glisser, clavier). |
| `i18n/` | Un fichier de textes par langue (fr, en). |

- **Stockage dans le navigateur** : paramètres généraux, partie en cours, statistiques. Rien n'est envoyé ailleurs (DEC-028).
- **Adversaire ordinateur** (phase 3) : calcul dans un *Web Worker* (calcul en arrière-plan) pour que l'écran ne se fige pas.
- **Accessibilité** : jamais d'information portée par la seule couleur ; tout est jouable au clavier ; animations désactivables (DEC-025).

## 6. Serveur (`server`, phase 4)

- Le serveur **fait autorité** : il tient l'état officiel de chaque partie et la pendule, et vérifie chaque coup avec `engine`.
- Partie créée → code / lien à partager (DEC-032) ; déconnexion → 60 s pour revenir, sinon défaite (DEC-033).
- Messages (première idée, à préciser en phase 4) : `createGame`, `joinGame`, `move`, `requestUndo`, `offerDraw`, `answer`, `resign`, `state`, `error`.
- Sécurité de base : messages vérifiés (format, taille), limites par connexion, codes de partie impossibles à deviner.
- Aucune donnée conservée après la partie (DEC-028). Hébergement : étude à l'étape 4.1 (zéro coût, DEC-008, DEC-042).

## 7. Qualité

Voir `test-strategy.md` (niveaux de tests, couverture, style, vérification automatique, recette) et `release-process.md` (branches, pull requests, versions, publication).
