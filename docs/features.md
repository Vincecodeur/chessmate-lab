# chessmate-lab — Fonctionnalités et parcours du joueur

> Statut : v1.1 — cadrage clôturé — 2026-10-11
> Dernière mise à jour : 2026-10-11
> Phase 2 = découpée en 2a / 2b / 2c dans `roadmap.md` (DEC-038), qui indique la sous-phase de chaque élément.
> Légende « Option » : ✅ = activable / désactivable à la création de la partie.

## 1. Parcours du joueur (écrans)

```
Accueil (choix du mode)
  ├── Créer une partie (options) ──► Partie ──► Fin de partie ──► Revanche / Accueil
  ├── Règles / Comment jouer
  ├── Paramètres généraux
  ├── Statistiques            (phase 3)
  └── À propos / Crédits
```

| ID | Écran | Contenu | Phase |
|---|---|---|---|
| E-01 | Accueil | Choix du mode : 2 joueurs même écran / contre l'ordinateur (phase 3) / en ligne (phase 4) ; accès aux autres écrans | 2 |
| E-02 | Création de partie | Couleur (blancs, noirs, au hasard), cadence de pendule, activation des fonctions de confort et des aides visuelles ; niveau de l'ordinateur (phase 3) | 2 |
| E-03 | Partie | Plateau, pendules, historique des coups, boutons (annuler, retourner, abandonner, proposer la nulle) selon les options | 2 |
| E-04 | Fin de partie | Résultat et raison (mat, pat, nulle, abandon, temps écoulé…), boutons Revanche et Accueil | 2 |
| E-05 | Règles / Comment jouer | Règles illustrées + utilisation du jeu | 2 |
| E-06 | Paramètres généraux | Langue, effets sonores, musique, animations, taille du texte (détail : `design-guidelines.md` §6) | 2 |
| E-07 | Statistiques | Parties jouées / gagnées / perdues / nulles, par mode et par niveau d'ordinateur ; stockées dans le navigateur | 3 |
| E-08 | À propos / Crédits | Auteur, licence, mentions des images, sons et polices utilisés (depuis `credits.md`) | 2 |

## 2. Fonctionnalités de jeu

### 2.1 Règles (moteur)

| ID | Fonctionnalité | Phase |
|---|---|---|
| R-01 | Déplacements de toutes les pièces, échec, mat, pat | 1 |
| R-02 | Roque, prise en passant, promotion | 1 |
| R-03 | Nulles automatiques : triple répétition, 50 coups, matériel insuffisant | 2 |

### 2.2 Interaction

| ID | Fonctionnalité | Option | Phase |
|---|---|---|---|
| I-01 | Déplacer une pièce par clic (pièce puis case) | — | 2 |
| I-02 | Déplacer une pièce par glisser-déposer | — | 2 |
| I-03 | Choix de la pièce de promotion | — | 2 |

### 2.3 Aides visuelles

| ID | Fonctionnalité | Option | Phase |
|---|---|---|---|
| A-01 | Surligner les coups possibles de la pièce sélectionnée | ✅ | 2 |
| A-02 | Surligner le dernier coup joué | ✅ | 2 |
| A-03 | Mettre en évidence le roi en échec | ✅ | 2 |
| A-04 | Coordonnées a–h / 1–8 autour du plateau | ✅ | 2 |

### 2.4 Fonctions de confort

| ID | Fonctionnalité | Option | Phase | Précision |
|---|---|---|---|---|
| C-01 | Annuler un coup | ✅ | 2 | En ligne (phase 4) : seulement avec l'accord de l'adversaire |
| C-02 | Retourner le plateau | ✅ | 2 | |
| C-03 | Revoir les coups joués (historique cliquable) | ✅ | 2 | Consultation seulement : la partie reprend à la position actuelle |
| C-04 | Pendule | ✅ | 2 | Préréglages (ex. 3, 10, 30 min) + temps personnalisé + secondes ajoutées par coup (incrément) ; perte au temps |

### 2.5 Fins de partie

| ID | Fonctionnalité | Phase | Précision |
|---|---|---|---|
| F-01 | Abandonner | 2 | Avec confirmation |
| F-02 | Proposer la nulle | 2 | L'adversaire accepte ou refuse ; en local, les deux joueurs sont devant le même écran |
| F-03 | Revanche | 2 | Nouvelle partie, mêmes options, couleurs inversées |

### 2.6 Aide au joueur

| ID | Fonctionnalité | Phase |
|---|---|---|
| H-01 | Page de règles illustrée (E-05) | 2 |
| H-02 | Infobulles sur les boutons et éléments de l'interface | 2 |
| H-03 | Messages explicatifs (ex. « Coup impossible : votre roi serait en échec ») | 2 |
| H-04 | Tutoriel interactif pas à pas | 5 (nouvelle phase, après la phase 4) |

### 2.7 Modes de jeu

| ID | Fonctionnalité | Phase |
|---|---|---|
| M-01 | 2 joueurs sur le même écran | 2 |
| M-02 | Contre l'ordinateur, plusieurs niveaux (code écrit par Vincent) | 3 |
| M-03 | En ligne entre 2 joueurs | 4 |

### 2.8 Présentation, son, accessibilité, langue

Détail : `design-guidelines.md`.

| ID | Fonctionnalité | Phase |
|---|---|---|
| P-01 | Animations : déplacement, prise, échec / mat, transitions d'écran ; désactivables | 2 |
| P-02 | Effets sonores : coup, prise, échec, fin de partie, alerte de pendule | 2 |
| P-03 | Musique de fond | 2 |
| P-04 | Accessibilité couleurs (information jamais portée par la seule couleur) | 2 |
| P-05 | Jeu complet au clavier | 2 |
| P-06 | Taille du texte réglable | 2 |
| P-07 | Interface en français et en anglais | 2 |

### 2.9 Sauvegarde, en ligne, retours

Détail : `non-functional.md`.

| ID | Fonctionnalité | Phase |
|---|---|---|
| S-01 | Reprise automatique de la partie en cours (2 joueurs même écran) | 2 |
| S-02 | Reprise automatique de la partie contre l'ordinateur | 3 |
| N-01 | Créer une partie en ligne et partager un code / lien ; rejoindre avec ce code | 4 |
| N-02 | Déconnexion : 60 s pour revenir, sinon défaite | 4 |
| N-03 | Demande d'annulation / de nulle soumise à l'adversaire | 4 |
| B-01 | Lien « Signaler un bug / Proposer une idée » vers GitHub (écran À propos) | 2 |

## 3. Taille de la phase 2

La phase 2 contient 35 éléments. Elle est découpée en trois sous-phases publiables (2a partie jouable, 2b options et confort, 2c finitions) : voir `roadmap.md` et DEC-038.
