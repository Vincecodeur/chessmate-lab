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
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : le paquet `engine` n'importe jamais Phaser, ni le client, ni le serveur.
- **Pourquoi** : tests rapides sans navigateur ; réutilisation par le serveur pour refuser les coups illégaux ; interface remplaçable.

## DEC-005 — Plateau représenté par un tableau 8 × 8
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Pourquoi** : le plus lisible pour apprendre. Les représentations plus rapides (0x88, bitboards) restent possibles plus tard sans toucher au client.

## DEC-006 — `applyMove` renvoie un nouvel état
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Pourquoi** : évite les modifications accidentelles d'un état partagé ; simplifie l'annulation de coup et la recherche de l'adversaire ordinateur.
- **Coût** : un peu plus de mémoire et de calcul, négligeable ici.

## DEC-007 — Adversaire ordinateur codé par Vincent
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : en phase 3, pas de moteur externe (ex. Stockfish). Vincent écrit l'adversaire ; Claude explique et relit.
- **Périmètre** : « l'adversaire » = évaluation et recherche (étapes 3.1 à 3.4). L'interface, le calcul en arrière-plan, les niveaux et les statistiques suivent le fonctionnement habituel.
- **Note** : un moteur externe reste un candidat pour plus tard (voir `post-mvp-backlog.md`), sans remplacer l'adversaire codé par Vincent.
- **Pourquoi** : objectif d'apprentissage prioritaire sur le niveau de jeu.

## DEC-008 — Zéro coût strict
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : uniquement des services gratuits. Dès qu'un coût apparaît : arrêt et décision de Vincent.
- **Périmètre** : l'abonnement Claude déjà disponible (Cowork, Claude Code) n'entre pas dans cette contrainte ; aucun abonnement ni achat supplémentaire.
- **Conséquence** : si aucun hébergement gratuit ne convient en phase 4, le mode en ligne reste limité à un usage local (voir DEC-042).

## DEC-009 — Dépôt public `chessmate-lab`
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : dépôt public sur le GitHub personnel de Vincent ; publication du jeu via GitHub Pages.
- **Licence** : voir DEC-011.

## DEC-010 — Vitest pour les tests
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : Vitest pour les tests du moteur, de la logique client et du serveur.
- **Pourquoi** : outil de test TypeScript qui s'intègre naturellement à Vite (même configuration) et mesure la couverture.

## DEC-011 — Licence MIT
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : le dépôt est publié sous licence MIT, titulaire des droits : Vincent Gueret.
- **Pourquoi** : licence permissive et très répandue ; chacun peut réutiliser le code en conservant la mention de l'auteur. Cohérente avec Phaser, lui-même sous MIT.
- **Alternatives écartées** : GPL-3.0 (oblige les versions modifiées distribuées à rester open source) ; aucune licence (code non réutilisable légalement).

## DEC-012 — Fonctions de confort et aides visuelles activables à la création de partie
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : annuler, retourner le plateau, revoir les coups, pendule, et les 4 aides visuelles sont chacune activables dans les options de création de partie (voir `features.md`).
- **Conséquence** : la partie doit porter un objet « options » choisi à sa création, lu par le client (affichage) et par le serveur en ligne (ex. annulation soumise à l'accord de l'adversaire).

## DEC-013 — Pendule en phase 2
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : la pendule sort des idées pour plus tard et arrive en phase 2 : préréglages + temps personnalisé + incrément par coup.

## DEC-014 — Nouvelle phase 5 : tutoriel interactif
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : le tutoriel interactif est traité après la phase 4, dans une phase 5 dédiée, pour ne pas retarder le cœur du jeu.

## DEC-015 — Bilan d'apprentissage par phase
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : un bilan court à la fin de chaque phase dans `docs/learning-log.md`, selon le modèle de ce fichier.

## DEC-016 — Trois niveaux de tests
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : tests du moteur (Vitest + perft), tests de la logique client (Vitest), tests de bout en bout (Playwright), et recette manuelle avant chaque version (`docs/recette.md`, à partir de la phase 2). Détails : `test-strategy.md`.
- **Historique** : recette manuelle d'abord écartée, puis ajoutée le 2026-10-11 sur décision de Vincent.
- **Conséquence (validée)** : la logique du client est écrite hors des scènes Phaser pour pouvoir être testée sans affichage.

## DEC-017 — Vérification automatique bloquante, ESLint et Prettier, couverture du moteur ≥ 90 %
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : GitHub Actions à chaque envoi et pull request (style, typage, tests, couverture) ; `main` protégée, fusion impossible si une vérification échoue.

## DEC-018 — Versions numérotées, CHANGELOG, Releases, publication par version
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : numérotation MAJEUR.MINEUR.CORRECTIF, `CHANGELOG.md`, une Release GitHub par version ; GitHub Pages publié automatiquement à chaque version. Détails : `release-process.md`.

## DEC-019 — Issues, une branche par étape, pull requests
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : une issue et une branche par étape, fusion dans `main` par pull request relue par Claude et fusionnée par Vincent.
- **Précision (validée)** : démarrage à l'étape 0.3. La vérification automatique arrive à l'étape 0.4 : la pull request de 0.3 est donc fusionnée sans elle (seule exception).
- **Qui fait quoi** : Claude Code rédige le texte des issues et des pull requests ; Vincent les crée (site GitHub) et fusionne. Claude ne lance aucune commande qui modifie GitHub.

## DEC-020 — Fusion par commit de fusion (pas de « squash »)
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Pourquoi** : le « squash » regroupe tous les commits d'une branche en un seul, ce qui mélangerait code, tests et docs — contraire à la règle de séparation des commits.

## DEC-021 — Présentation publique
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : README soigné, qui sert de vitrine du dépôt (ce qu'est le projet, ce que propose le jeu, où il en est, comment il est construit, comment le lancer) sans recopier la roadmap ; badges et `CONTRIBUTING.md` (étapes 2a.2 et 2a.3) ; récit `docs/built-with-claude.md`, créé à l'étape 0.4 et complété à chaque fin de phase.
- **Historique** : modifiée le 2026-10-11 — le README devient la vitrine du dépôt (demande de Vincent). Captures d'écran et GIF possibles à partir de v0.1.0.

## DEC-022 — Style moderne et épuré, un seul style
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : aplats de couleurs, formes simples, lisibilité avant tout. Pas de système de thèmes. Détail graphique en début de phase 2. Voir `design-guidelines.md`.

## DEC-023 — Images générées par IA, outil choisi en phase 2
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : pièces, plateau et icônes générés par IA ; choix de l'outil en phase 2 (Claude en SVG ou générateur d'images gratuit).
- **Conditions** : outil gratuit (DEC-008) dont les conditions autorisent la publication ; chaque image tracée dans `credits.md`.
- **Point juridique** : aux États-Unis, une image entièrement générée par IA n'est pas protégée par le droit d'auteur (*Thaler v. Perlmutter*, appel mars 2025, recours rejeté par la Cour suprême le 2 mars 2026). Droit français : non vérifié, à regarder en phase 2.

## DEC-024 — Sons et musique libres de droits
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : effets (coup, prise, échec, fin de partie, alerte de pendule) et musique de fond, issus de banques libres de droits, crédités ; activables et réglables dans les paramètres.

## DEC-025 — Accessibilité : couleurs, clavier, taille
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : aucune information donnée uniquement par la couleur, jeu complet au clavier, texte agrandissable, animations désactivables. Lecteur d'écran hors périmètre actuel.

## DEC-026 — Interface en français et en anglais
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : tous les textes dans des fichiers de traduction ; langue choisie dans les paramètres (défaut : langue du navigateur si disponible, sinon anglais).

## DEC-027 — Navigateurs pris en charge : Chrome et Edge
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : tests de bout en bout et recette sur Chrome et Edge (ordinateur) uniquement. Firefox, Safari et mobile non garantis.

## DEC-028 — Aucune collecte de données hors du navigateur
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : pas de mesure d'audience, pas de cookies tiers ; paramètres et statistiques stockés dans le navigateur du joueur. Mode en ligne : pseudo temporaire, rien de conservé après la partie.

## DEC-029 — Registre des ressources et contrôle automatique des licences
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : `docs/credits.md` recense chaque ressource (source, auteur, licence, outil IA) ; la vérification automatique refuse une dépendance npm dont la licence est incompatible avec MIT.

## DEC-030 — Reprise automatique de la partie en cours
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : partie locale ou contre l'ordinateur enregistrée dans le navigateur après chaque coup ; proposition de reprise à la réouverture ; pendule en pause. Voir `non-functional.md` §1.

## DEC-031 — Objectifs de performance chiffrés
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : objectifs mesurés (fluidité, chargement, temps de réponse de l'ordinateur, délai en ligne), valeurs confirmées au début de chaque phase concernée. Mesurer avant d'optimiser. Voir `non-functional.md` §2.

## DEC-032 — En ligne : adversaire par code à partager
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : pas de file d'attente publique ; le créateur partage un code ou un lien.

## DEC-033 — En ligne : 60 s pour revenir après une déconnexion
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : la pendule continue ; passé le délai, le joueur déconnecté perd.

## DEC-034 — Retours de joueurs
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : modèles d'issues GitHub, lien depuis l'écran À propos, testeurs proches à chaque fin de phase 2, 3 et 4. Aucune donnée stockée par le jeu.

## DEC-035 — Dependabot et politique de mise à jour
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : alertes et pull requests de mise à jour automatiques ; correctifs de sécurité traités immédiatement, mises à jour majeures en début de phase.

## DEC-036 — Blocage de plus de 2 semaines : pause assumée
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : on fige l'état (`project-status.md` à jour) et on reprend plus tard avec `handoff-prompt.md`. Voir `risks.md`.

## DEC-037 — Plan B Phaser : garder et contourner
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : en cas de limite de Phaser, on contourne plutôt que de changer d'outil (objectif de formation). La séparation règles / logique / affichage limite l'impact d'un éventuel changement à l'affichage.

## DEC-038 — Phase 2 découpée en 2a / 2b / 2c, versions par sous-phase
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : 2a client, publication et partie jouable ; 2b options, confort, pendule, fins de partie, reprise ; 2c finitions. Les numéros de phase 3, 4, 5 sont inchangés.
- **Versions** (modifiées par DEC-039) : v0.1.0 fin de 2a (première version publiée), v0.2.0 fin de 2b, v0.3.0 fin de 2c, v0.4.0 fin de phase 3, v1.0.0 fin de phase 4, v1.1.0 fin de phase 5.
- **Pourquoi** : 35 éléments en phase 2 ; découpée, chaque sous-phase se termine par une version jouable et publiée.

## DEC-039 — Phase 0 allégée
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : la phase 0 se limite au socle (0.3) et à la vérification automatique (0.4). Le squelette Phaser, Playwright, la publication GitHub Pages, `CHANGELOG.md`, les badges, `CONTRIBUTING.md` et les modèles d'issues passent au début de la phase 2a. Pas de version publiée avant la fin de 2a (v0.1.0).
- **Pourquoi** : les règles d'échecs commencent plus tôt ; ces outils arrivent quand il y a quelque chose à afficher et à publier.

## DEC-040 — Tests d'abord, envoi de la branche en fin d'étape
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : dans une étape, commit des tests (qui échouent), puis commit du code (qui les fait passer). La branche n'est envoyée sur GitHub qu'une fois l'étape terminée.
- **Pourquoi** : on écrit d'abord ce que le code doit faire ; la vérification automatique ne voit jamais un état intermédiaire (ex. couverture insuffisante entre deux commits).

## DEC-041 — Types de commits
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : quatre types de commits jamais mélangés : config (package.json, tsconfig, ESLint, Prettier, workflows…), tests, code, docs. Une étape triviale (ex. correction de texte) peut tenir en un seul commit, justifié dans la pull request.

## DEC-042 — Hébergement étudié au début de la phase 4 ; v1.0.0 même sans hébergement
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : l'étude des hébergements gratuits est la première étape de la phase 4 (4.1). Sans hébergement gratuit, le mode en ligne n'est utilisable qu'en lançant aussi le client en local : un site publié en HTTPS (GitHub Pages) ne peut pas joindre un serveur local non sécurisé. v1.0.0 sort quand même, avec cette limite indiquée clairement.

## DEC-043 — Markdown exclu de Prettier
- **Date** : 2026-10-11 — **Statut** : Acceptée
- **Décision** : les fichiers Markdown (`*.md`) sont exclus de Prettier (`.prettierignore`) ; Prettier ne met en forme que le code et la configuration.
- **Pourquoi** : éviter le reformatage des tableaux de documentation écrits à la main.
- **Historique** : proposée par Claude à l'étape 0.3, acceptée par Vincent.
