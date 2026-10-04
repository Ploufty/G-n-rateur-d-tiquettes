# État de la base · 5 octobre 2026

## Disponible

- Application statique autonome, thème clair/sombre, parcours en cinq étapes, onglets Étiquettes/Groupes/Aide, Simple/Avancé, plein écran si le navigateur le permet.
- Classe unique, saisie/collage, TXT et CSV provisoire, quantités communes/individuelles, ordre alphabétique/par groupe/manuel, identifiants stables, homonymes.
- Sept bases de format modifiables et modèles personnels dans le JSON.
- Jusqu’à trois lignes ; Marelle, Marelle Bâton, OpenDyslexic, Nunito Sans, Fredoka et Playwrite FR Trad. Seulement deux variantes de Marelle, sans lignage ni variante « 2 ». Taille, casse, couleur, gras, initiales et ajustement automatique.
- Photos individuelles/en lot avec association à vérifier, recadrage non destructif, position et forme ; fonds classe/groupe/élève, couleur, zoom, déplacement, opacité.
- Contours, pictogrammes géométriques, groupes personnalisables, prévisualisation d’une répartition équilibrée et PDF des groupes.
- A4 portrait/paysage ; dimensions ou grille ; marges et espacements ; cases exclues de la première feuille, calibration et repères de découpe.
- Aperçu paginé, PDF toutes pages, PNG élève/page, ZIP des étiquettes individuelles.
- JSON autonome versionné et validé ; modèles personnels, partage sans aucune image ni donnée élève ; Annuler/Rétablir.

## Choix de cette première base

Le PDF embarque des images d’étiquettes à 300 ppp, aux dimensions exactes. Le texte n’est pas sélectionnable. Aperçu et export partagent calcul et moteur de dessin. Un PDF vectoriel pourra améliorer netteté à fort zoom, recherche et poids des fichiers.

Marelle Bâton garde des minuscules cursives ; la ligne script utilise Nunito Sans par défaut. Les deux fichiers Marelle ont une graisse normale ; le gras est une synthèse du navigateur.

Les modèles de départ proposent des dimensions, sans prétendre correspondre à une référence commerciale. Le CSV doit encore être ajusté au fichier de référence d’Etienne. Les images originales ne sont pas redimensionnées à l’import ; utilisez des fichiers raisonnables.

Une seule classe et A4. Le traitement est local et la distribution peut se faire en dossier téléchargé ou en hébergement statique. L’application ne fonctionne pas comme une PWA : l’ouverture locale du dossier complet constitue le mode hors connexion.

## Vérification

Tests de données : associations après modification de liste et homonymes, héritage par ligne/propriété, calcul A4, pagination/exclusions, formats impossibles, validation JSON, partage anonymisé, CSV et nettoyage des images inutilisées.

Scénarios Edge/Playwright : création, personnalisation, import CSV, association de photos, fond et recadrage, groupes/PDF, JSON avec images et restauration, rejet de version invalide, modèles/duplication/suppression, Annuler/Rétablir, PDF/PNG/ZIP, ouverture locale hors connexion.

Contrôles axe sur l’écran d’export ; vérification des thèmes clair/sombre et absence de débordement sur les vues testées à 320, 768, 1024 et 1440 px. Captures inspectées. PDF contrôlé : MediaBox A4 (595,275591 × 841,889764 points) ; PNG A4 300 ppp : 2480 × 3508 pixels. Les tests automatisés ne constituent pas un audit d’accessibilité complet.

Installation reproductible vérifiée avec npm ci (scripts désactivés). Audit npm avant publication : aucune vulnérabilité connue signalée.

Un essai papier à 100 %, Firefox, les autres navigateurs et les tablettes restent à vérifier. Aucune licence générale de publication du code n’a encore été choisie.

## Prochaines évolutions

1. Retours de classe sur les modèles, dimensions et ergonomie ; fichier CSV réel.
2. Vérifications papier et compatibilité navigateur/tablette.
3. PDF vectoriel et gestion plus avancée des ligatures/initiales cursives.
4. Formats supplémentaires, bibliothèque de modèles et variantes pédagogiques de Marelle, selon validation.
5. Étiquettes texte dans une évolution distincte.

Les documents initiaux se trouvent dans [conception](conception/cahier-des-charges.md). Ils conservent l’historique des décisions et propositions, y compris les anciennes limitations de la maquette et les échecs GitHub antérieurs. Le présent fichier décrit l’implémentation actuelle.
