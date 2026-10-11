# chessmate-lab — Construit avec Claude

> Créé à la fin de la phase 0 — 2026-10-12. Complété à chaque fin de phase.
> Récit factuel : ce qui a marché, les erreurs de l'IA (et de son utilisateur), comment elles ont été repérées, ce qu'on en garde.

## 1. Méthode

| Qui | Rôle |
|---|---|
| **Vincent** | Décide. Valide chaque plan et chaque modification. Lance lui-même les commits, les envois, les pull requests et les fusions. |
| **Claude Code** (extension VS Code, mode Manual) | Propose un plan, puis écrit la configuration, les tests, le code et la documentation après validation. Ne fait jamais de commit, d'envoi ni de fusion. |
| **Claude dans Cowork** (application Claude) | Prépare le cadrage et les documents, rédige les messages envoyés à Claude Code, relit ses plans et ses comptes rendus, signale les écarts avec les docs. |

Garde-fous en place :

- `CLAUDE.md` : aucune initiative sans validation, format « Proposition » pour toute idée hors demande, ne jamais inventer, compte rendu de fin de tâche en 5 lignes.
- Mode **Manual** de Claude Code : chaque modification de fichier est montrée avant d'être appliquée. Il est fixé au démarrage par le réglage VS Code `"claudeCode.initialPermissionMode": "manual"`.
- Protection de `main` : pull request obligatoire, vérifications `verify` et `dependency-review` obligatoires, aucune exception, y compris pour le propriétaire du dépôt.

## 2. Phase 0 — Mise en place (2026-10-11 → 2026-10-12)

### Ce qui a marché

- **Plan avant code.** À l'étape 0.3 comme à l'étape 0.4, Claude Code a présenté un plan complet avant de toucher un fichier. Plusieurs de ses propositions ont été acceptées : vérifications strictes supplémentaires de TypeScript, versions exactes notées dès l'étape 0.3, ligne `licenses:check` dans le README.
- **Il a signalé une incompatibilité au lieu de la contourner.** `typescript-eslint` 8.71.1 exige TypeScript < 6.1, donc on est resté en TypeScript 6.0.3 au lieu de 7.0.2. L'écart est noté dans `project-status.md`.
- **Il a demandé avant d'agir.** Au test de blocage, Claude Code a montré la modification d'une ligne et attendu le « ok » avant de l'appliquer.
- **Le test de blocage a prouvé la protection de `main`** (pull request #5) : avec un test faux, la fusion était impossible ; après annulation, elle redevenait possible. La pull request a été fermée sans fusion.

### Erreurs et comment elles ont été repérées

| Erreur | Qui | Repérée comment | Correction |
|---|---|---|---|
| Une décision attribuée à Vincent alors qu'il ne l'avait pas prise (Markdown exclu de Prettier) | Claude Code | Relecture du plan dans Cowork | Décision posée et écrite (DEC-043) |
| Corrections ajoutées en tête de plan, sans réécrire le reste : le plan devenait contradictoire | Claude Code | Relecture du plan | On demande désormais un plan complet réécrit |
| Mode Claude Code repassé en « Edit automatically » | Cause non identifiée | Capture d'écran envoyée pendant l'étape 0.4 | Mode Manual remis, puis fixé dans les réglages VS Code |
| Cadrage insuffisant au départ : roadmap, fonctionnalités, graphisme, tests et déploiement n'étaient pas détaillés | Claude dans Cowork | Remarque de Vincent | 4 sessions de cadrage, auto-évaluation par un second agent, roadmap v1.1 |
| Copie de fichier vers le PC qui envoyait parfois une ancienne version | Outil de Cowork | Taille du fichier comparée après écriture | Vérification de taille systématique, renvoi si besoin |

### Incidents hors IA

| Incident | Cause | Solution |
|---|---|---|
| `licensee` refusait de s'installer | Node 22.20 trop ancien | Passage à Node 24 LTS partout (DEC-048) |
| `dependency-review` en échec | Option « Dependency graph » désactivée sur le dépôt | Option activée, vérification relancée |
| Comportement étrange de npm dans les scripts | Un vieux npm 2.15.12 dans le dossier personnel prenait la place du bon | Supprimé |
| Commit absent au test de blocage | Plusieurs commandes Git collées d'un coup dans PowerShell : le commit n'a pas été fait, mais l'envoi oui (cause exacte non vérifiée) | Détecté avec `git status` et `git log` avant d'ouvrir la pull request ; commandes relancées une par une |

### Leçons

1. **Relire le plan entier**, pas seulement le début : c'est là que se cachent les décisions attribuées à tort.
2. **Vérifier le mode de Claude Code** en début de session.
3. **Commandes Git une par une**, en lisant chaque sortie. `git status` avant chaque commit.
4. **Une protection se teste.** Sans le test de blocage, on aurait supposé que la ruleset fonctionnait.
5. **Une vérification obligatoire a ses propres prérequis** (ici le « Dependency graph ») : les activer avant de l'exiger.
