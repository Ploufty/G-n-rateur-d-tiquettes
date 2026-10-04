# Plan de développement évolutif

## Base 0.1

Le socle suit le cahier des charges initial : classe et identités stables, héritage, modèles, images, mise en page et exports, puis JSON autonome. La précision du propriétaire limite uniquement les variantes Marelle à Marelle et Marelle Bâton ; OpenDyslexic et les autres polices libres restent disponibles.

Les modules sont volontairement séparés :

| Fichier | Responsabilité |
| --- | --- |
| js/core.js | Projet, validation, héritage, CSV, grille, pagination |
| js/render.js | Mesures des textes, images, aperçu et étiquettes rasterisées |
| js/exports.js | PDF, PNG, ZIP, calibration et liste des groupes |
| js/ui.js | Éléments DOM, champs, lecture locale des images |
| js/students.js | Liste, quantités, imports, association des photos |
| js/personalize.js | Réglages communs, de groupe et individuels |
| js/groups.js | Groupes, affectation et proposition équilibrée |
| js/layout.js | Dimensions, marges, calibration et cases |
| js/app.js | Parcours, historique, modèles et fichiers JSON |

Les fichiers JavaScript classiques exposent des espaces de noms limités ; ce choix permet l’ouverture via file:// sans installation ni serveur. Les fichiers sont chargés dans l’ordre déclaré dans index.html. Le JSON version 1 remplace le format temporaire de la maquette et ne le charge pas.

## Faire évoluer la base

Choisir un petit besoin, préciser son comportement, ajouter un test pertinent, développer puis vérifier dans le navigateur. Mettre à jour le wiki et l’état du projet avec le fonctionnement livré. Conserver la même chaîne de calcul pour aperçu et export.

Toute évolution du JSON doit préserver les projets existants ou fournir une migration explicite. Les élèves sont identifiés par ID, jamais par position ou prénom seul. L’héritage demeure propriété par propriété, y compris pour chacune des trois lignes.

## Priorités après les premiers retours

La prochaine séance doit commencer par le rappel des demandes de simplification dans [prochaine-seance.md](prochaine-seance.md) : parcours, aperçus de polices, CSV, marges et mesures, modèles visuels, menu du format libre, bandeau JSON près du plein écran, palette de couleurs et aperçu accessible pendant la création.

Le fichier CSV de référence, les essais papier et l’ajustement des dimensions sont prioritaires. Le PDF vectoriel et les essais Firefox/tablette suivent. Les nouveaux formats papier et l’onglet texte exigent une validation fonctionnelle avant ajout.
