# chessmate-lab — Graphisme, son, accessibilité, langue, compatibilité

> Statut : v1.1 — cadrage clôturé — 2026-10-11
> Dernière mise à jour : 2026-10-11
> Le détail graphique (couleurs exactes, dessin des pièces, choix de l'outil IA) est un sujet de formation à l'étape 2a.4.

## 1. Graphisme

| Sujet | Décision | Réf. |
|---|---|---|
| Style | **Moderne et épuré** : aplats de couleurs, formes simples, très lisible. Un seul style (pas de thèmes au choix) | DEC-022 |
| Source des images | **Générées par IA** ; outil choisi en phase 2 (Claude en SVG ou générateur d'images gratuit), contrainte zéro coût | DEC-023 |
| Animations | Déplacement des pièces, prise, échec / mat, transitions entre écrans | — |
| Désactivation | Animations désactivables dans les paramètres ; le réglage « réduire les animations » du système est respecté par défaut | — |

### 1.1 Points de vigilance sur les images générées par IA

- **Droit d'auteur** : aux États-Unis, une image produite entièrement par une IA, sans apport créatif humain suffisant, n'est pas protégée par le droit d'auteur (décision d'appel *Thaler v. Perlmutter*, mars 2025 ; recours devant la Cour suprême rejeté le 2 mars 2026). Conséquence : ces images ne peuvent pas être revendiquées comme création de Vincent sous la licence MIT ; elles sont signalées comme « générées par IA » dans `credits.md`. Situation en droit français : non vérifiée — à regarder en phase 2.
- **Conditions de l'outil** : vérifier que ses conditions d'utilisation autorisent la publication dans un dépôt public, et qu'il est gratuit (DEC-008).
- **Ressemblance** : ne pas demander d'imiter un jeu de pièces ou un style existant identifiable.
- **Traçabilité** : pour chaque image, noter dans `credits.md` l'outil, la date et la retouche éventuelle faite à la main.

## 2. Son

| Sujet | Décision |
|---|---|
| Effets | Coup, prise, échec, fin de partie (mat, pat, nulle, abandon, temps), alerte de pendule (peu de temps restant) |
| Musique | Musique de fond |
| Réglages | Effets et musique activables séparément, volume réglable (paramètres généraux E-06) |
| Source | Banques de sons et musiques **libres de droits** (ex. CC0), crédités dans `credits.md` et l'écran À propos (DEC-024) |

## 3. Accessibilité

| Sujet | Décision |
|---|---|
| Couleurs | Contrastes suffisants ; **aucune information donnée uniquement par la couleur** (ex. coup possible = point + couleur, roi en échec = contour + couleur) ; vérifié pour les principales formes de daltonisme |
| Clavier | Partie jouable sans souris : flèches pour choisir une case, Entrée pour sélectionner / jouer, Échap pour annuler la sélection ; tous les écrans navigables au clavier |
| Taille et zoom | Interface lisible quand la fenêtre est agrandie ou réduite ; taille du texte réglable dans les paramètres |
| Lecteur d'écran | **Hors périmètre actuel** (dans `post-mvp-backlog.md`) : Phaser dessine dans une zone que les lecteurs d'écran ne lisent pas, il faudrait un texte parallèle |

(DEC-025)

## 4. Langue

- Interface en **français et anglais**, choix dans les paramètres ; langue par défaut = celle du navigateur si elle est disponible, sinon anglais (DEC-026). Jusqu'à l'arrivée de l'anglais (2c.2), le jeu est en français seulement.
- **Aucun texte affiché écrit en dur dans le code** : tous les textes passent par des fichiers de traduction (un par langue).
- Les règles illustrées (E-05) et le tutoriel (phase 5) existent dans les deux langues.

## 5. Compatibilité

- Navigateurs pris en charge : **Chrome et Edge** (ordinateur), testés en recette manuelle et en tests de bout en bout (DEC-027).
- Firefox et Safari : non pris en charge officiellement (le jeu peut y fonctionner, sans garantie).
- Mobile : hors périmètre actuel (`post-mvp-backlog.md`).

## 6. Paramètres généraux (écran E-06) — contenu

| Réglage | Valeurs |
|---|---|
| Langue | Français / English |
| Effets sonores | Oui / Non + volume |
| Musique | Oui / Non + volume |
| Animations | Oui / Non (par défaut : selon le réglage du système) |
| Taille du texte | Normale / Grande / Très grande |

Les réglages sont conservés dans le navigateur du joueur.
