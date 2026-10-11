# chessmate-lab — Architecture

> Statut : brouillon v0.1 — à valider par Vincent
> Dernière mise à jour : 2026-10-11

## 1. Principe central : le moteur de règles est indépendant de tout le reste

```
                ┌──────────────────────────┐
                │   engine  (TypeScript)    │
                │   Règles du jeu, pures    │
                │   Aucun lien avec Phaser, │
                │   le navigateur ou réseau │
                └────────────┬─────────────┘
                 utilisé par │ utilisé par
          ┌──────────────────┴──────────────────┐
          ▼                                     ▼
┌────────────────────┐                ┌────────────────────┐
│ client (Phaser)     │  WebSocket    │ server (Node.js)    │
│ Affichage, clics,   │ ◄───────────► │ Parties en ligne,   │
│ adversaire ordi     │  (phase 4)    │ vérifie chaque coup │
└────────────────────┘                └────────────────────┘
```

**Pourquoi** (voir DEC-004) :

1. **Tests** : les règles se testent seules, en millisecondes, sans ouvrir de navigateur.
2. **Réutilisation** : en ligne, le serveur doit vérifier chaque coup reçu, sinon un joueur peut tricher en envoyant un coup illégal. Il utilise exactement le même code que le client.
3. **Remplaçabilité** : si on change d'interface un jour, les règles ne bougent pas.

**Règle à ne jamais enfreindre** : `engine` n'importe jamais `phaser`, ni rien de `client` ou `server`.

## 2. Structure du dépôt

Un seul dépôt, découpé en 3 « paquets » gérés par les *workspaces* npm (fonction intégrée à npm qui permet à plusieurs sous-projets de partager un dépôt et de se référencer entre eux).

```
chessmate-lab/
├── CLAUDE.md                 # Règles du projet pour Claude Code
├── README.md
├── package.json              # Racine : déclare les workspaces
├── tsconfig.base.json        # Réglages TypeScript communs (mode strict)
├── docs/                     # Documents vivants (vision, archi, roadmap, décisions…)
├── packages/
│   ├── engine/               # Phase 1 — règles du jeu
│   │   ├── src/
│   │   └── tests/
│   ├── client/               # Phase 0 (squelette) puis phase 2 — Vite + Phaser
│   │   ├── src/
│   │   └── public/           # Images, sons
│   └── server/               # Phase 4 — Node.js + WebSocket
└── .github/workflows/        # Phase 2 — publication automatique sur GitHub Pages
```

## 3. Choix techniques

| Domaine | Choix | Rôle |
|---|---|---|
| Langage | TypeScript, mode strict | Le typage attrape une partie des erreurs avant l'exécution |
| Outil de build client | Vite | Lance un serveur de développement et prépare la version publiée |
| Moteur de jeu | Phaser | Affichage du plateau, animations, gestion des clics |
| Tests | Vitest | Équivalent TypeScript de pytest ; s'intègre naturellement à Vite |
| Serveur (phase 4) | Node.js + WebSocket | Connexion permanente entre navigateur et serveur pour envoyer les coups en temps réel |
| Publication | GitHub Pages | Hébergement gratuit du jeu pour un dépôt public |

Les versions exactes de chaque outil seront fixées en phase 0, au moment de l'installation, et notées ici. Aucune version n'est annoncée d'avance pour ne pas inventer.

## 4. Moteur de règles (`engine`)

### 4.1 Représentation du plateau

Tableau de 8 × 8 cases (DEC-005). C'est la représentation la plus lisible pour apprendre. Il en existe de plus rapides (« 0x88 », « bitboards »), mais elles sont plus difficiles à comprendre. Si l'adversaire ordinateur est trop lent en phase 3, on pourra en changer sans toucher au client, grâce à la séparation du §1.

### 4.2 Modèle de données (première version)

```ts
type Color = 'white' | 'black';
type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
interface Piece { type: PieceType; color: Color; }
type Square = { file: number; rank: number }; // 0..7, a1 = {0,0}

interface GameState {
  board: (Piece | null)[][];       // 8×8
  turn: Color;                      // à qui de jouer
  castling: { whiteKingSide: boolean; whiteQueenSide: boolean;
              blackKingSide: boolean; blackQueenSide: boolean };
  enPassant: Square | null;         // case de prise en passant possible
  halfmoveClock: number;            // règle des 50 coups (phase 2)
  fullmoveNumber: number;
}

interface Move { from: Square; to: Square; promotion?: PieceType; }
```

### 4.3 Fonctions publiques du moteur (contrat)

| Fonction | Rôle |
|---|---|
| `createInitialState()` | Position de départ |
| `fromFEN(fen)` / `toFEN(state)` | Lire / écrire une position au format FEN (format texte standard d'une position, très utile pour les tests) |
| `legalMoves(state)` | Liste de tous les coups légaux |
| `applyMove(state, move)` | Renvoie un **nouvel** état (l'ancien n'est pas modifié) |
| `status(state)` | `ongoing`, `check`, `checkmate`, `stalemate`, puis nulles en phase 2 |

Le choix « renvoyer un nouvel état » (DEC-006) évite des bugs difficiles à trouver (un état modifié par erreur à un autre endroit) et simplifie l'annulation de coup et la recherche de l'adversaire ordinateur.

### 4.4 Méthode de génération des coups

1. Générer les coups selon le déplacement de chaque pièce, sans s'occuper de l'échec.
2. Pour chaque coup, le jouer sur une copie et vérifier que son propre roi n'est pas attaqué ; sinon, le retirer.

C'est la méthode la plus simple à comprendre et à tester. Elle est lente mais suffisante pour ce projet.

### 4.5 Validation : le test « perft »

Le « perft » compte tous les coups possibles jusqu'à une profondeur donnée et compare le résultat à des valeurs de référence publiques. Depuis la position initiale : profondeur 1 = 20, profondeur 2 = 400, profondeur 3 = 8 902, profondeur 4 = 197 281. Si les nombres correspondent, la génération des coups est très probablement juste. Les positions de référence supplémentaires (roque, prise en passant, promotion) seront prises sur une source publique citée au moment de la phase 1.

## 5. Client (`client`)

- Une **scène** Phaser principale (`GameScene`) : dessine le plateau à partir du `GameState`, gère les clics.
- Le client ne décide jamais si un coup est légal : il demande au moteur.
- Phase 3 : l'adversaire ordinateur tourne dans un *Web Worker* (calcul en arrière-plan) pour que l'écran ne se fige pas pendant qu'il réfléchit.

## 6. Serveur (`server`, phase 4)

- Le serveur est la **référence** : il tient l'état officiel de chaque partie et vérifie chaque coup avec `engine`.
- Messages échangés (première idée, à préciser en phase 4) : `createGame`, `joinGame`, `move`, `resign`, `state`, `error`.
- Tests d'abord sur le réseau local. Hébergement public seulement si une offre gratuite convient (contrainte zéro coût).

## 7. Qualité

| Règle | Détail |
|---|---|
| Tests | `npm test` à la racine lance les tests de tous les paquets ; ils doivent tous passer avant chaque commit |
| Typage | `tsc --noEmit` sans erreur avant chaque commit |
| Commits | 1 étape = 1 commit ; jamais code, tests et docs mélangés |
| Revue documentaire | Avant chaque commit : lister ce qui est obsolète, manquant ou contradictoire dans `docs/` |
