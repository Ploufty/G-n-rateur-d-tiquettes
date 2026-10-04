# Cahier des charges — Étiquettes de maternelle

État consolidé de la conversation • 5 octobre 2026

Ce document distingue les décisions validées, les propositions de conception et les points ouverts. Il ne décrit pas des fonctionnalités déjà développées.

## 1. Objectif et périmètre
Réécrire l’application de zéro en HTML, CSS et JavaScript, en s’inspirant des deux applications fournies. « Java » dans la demande initiale est interprété comme JavaScript pour le navigateur.

Créer des étiquettes prénom adaptées à la maternelle : porte-manteaux, appel, cahiers, casiers, matériel et petites étiquettes prénom. La première version traite uniquement les prénoms. Un onglet « Étiquettes texte » pourra être développé plus tard.

Une seule classe est gérée. Les modèles prêts à personnaliser et la création au format libre sont tous deux souhaités.

## 2. Liste des élèves et imports
- Une liste principale commune à tous les onglets.
- Import CSV basé sur un fichier de référence qu’Etienne doit encore fournir.
- Tutoriel simple expliquant les colonnes, le séparateur, l’encodage et un exemple de fichier.
- Les colonnes exactes du CSV ne sont pas encore fixées.
- Quantité d’exemplaires commune, modifiable individuellement.
- Ordre de la liste, ordre alphabétique, classement par groupe et déplacement manuel.
- Saisie, collage et import TXT : proposés dans le plan initial, à confirmer dans le périmètre final.

## 3. Modèles
Modèles d’usage validés : porte-manteaux, appel, cahiers, casiers, matériel, petites étiquettes prénom et format libre.

Les propositions de départ incluent prénom simple, photo et trois écritures. Les dimensions précises des modèles restent à définir. Les planches autocollantes relèvent des réglages avancés.

## 4. Écritures et initiales
- Jusqu’à trois lignes, choisies librement : capitales, script et cursive.
- Chaque ligne possède ses propres réglages : police, taille, casse, couleur et options d’initiale.
- Initiale dans le prénom : agrandissement, gras et couleur définie, indépendants et cumulables.
- Grande initiale séparée au-dessus du prénom : option supplémentaire retenue.
- Ajustement individuel automatique pour les prénoms longs.
- Personnalisation d’une étiquette sans modifier les autres.
- Polices gratuites avec licences compatibles avec l’intégration et la redistribution prévues.
- Polices souhaitées : Marelle, Marelle Bâton, OpenDyslexic et polices décoratives. Leurs licences doivent être vérifiées avant inclusion ; aucune n’est déclarée admissible sans vérification.

## 5. Photos
- Photo facultative : si absente, ne pas afficher de cadre vide ni d’image de remplacement.
- Import individuel ou en lot.
- Association proposée par nom de fichier pour les imports en lot, avec vérification avant validation.
- Placement au choix : gauche, droite ou au-dessus du prénom.
- Formes au choix : carré, rectangle, rond et coins arrondis.
- Zoom et déplacement dans le cadre, en conservant l’image originale.
- Proposition technique : conserver une association stable entre élève et photo après tri ou modification de la liste.

## 6. Fonds, contours et pictogrammes
- Image de fond commune, par groupe ou par élève, au choix.
- Déplacement, zoom et opacité du fond réglables.
- Fond uni avec couleur personnalisable, pouvant reprendre celle du groupe défini.
- Contour configurable : afficher/masquer, couleur, épaisseur, style et arrondi des coins.
- Styles de contour prévus : trait simple et pointillés.
- Pictogramme individuel facultatif, en plus de l’icône du groupe.
- Le contour de l’étiquette est distinct des repères de découpe proposés.

## 7. Groupes et priorité des réglages
- Onglet « Groupes » distinct, utilisant la liste principale sans nouvelle saisie.
- Un seul groupe par élève pour la première version.
- Groupes de départ : Rouge, Bleu, Vert, Jaune.
- Nom, couleur et icône facultative personnalisables.
- Icônes respectant les droits et licences applicables.
- Répartition laissée au choix de conception : affectation manuelle et bouton facultatif « Répartir équitablement », avec aperçu avant remplacement des affectations existantes.
- Export PDF de la liste des groupes retenu dans la synthèse de l’échange.
- Priorité validée : réglage individuel → réglage du groupe → réglage commun. L’héritage doit s’appliquer propriété par propriété.

## 8. Format et impression
- A4 par défaut, orientation portrait ou paysage au choix.
- Le choix d’un format papier est souhaité ; les formats supplémentaires n’ont pas été validés. A3, A5 et format personnalisé restent ouverts.
- Deux modes : dimensions des étiquettes en mm ou nombre de lignes et de colonnes.
- Proposition de conception : le mode actif fournit les contraintes ; l’autre jeu de valeurs est calculé pour éviter les contradictions.
- Marges de la feuille et espacements entre étiquettes réglables séparément.
- Petit menu de visualisation avec schéma coté.
- Convention proposée : L = largeur d’étiquette, H = hauteur d’étiquette, l = espace horizontal, h = espace vertical. Afficher également des libellés explicites.
- Gabarit autocollant enregistrable et cases utilisées à exclure : choix de conception délégué, en mode Avancé.
- Page de calibration et corrections de décalage en mode Avancé.
- Export PDF et PNG. Les trois portées PNG sont retenues : étiquette seule, page entière, série d’images individuelles dans un ZIP.
- Proposition technique : calculer les pages avant export, vérifier les débordements et produire un PDF à dimensions physiques exactes. L’impression doit être faite à 100 % / taille réelle.
- L’impression directe dans le navigateur n’a pas été retenue comme sortie prioritaire : PDF et PNG sont les sorties demandées.

## 9. Enregistrement et partage
- Sauvegarde principale dans un fichier JSON à télécharger et rouvrir.
- Restauration automatique dans le navigateur non obligatoire.
- Projet complet : classe, groupes, photos, fonds, réglages, exceptions et modèles personnels.
- Les modèles personnels sont conservés dans le JSON.
- Option d’export : projet complet ou modèle sans données des élèves.
- Proposition technique : images intégrées au JSON pour permettre le transfert entre ordinateurs sans chemins locaux ; version de schéma et validation à l’ouverture.
- Nettoyer les éléments propres aux élèves lors du partage de modèle, y compris les images contenant des informations personnelles.

## 10. Ergonomie
- Parcours étape par étape.
- Découpage proposé : élèves → modèle → personnalisation → mise en page → export.
- Onglets validés : Étiquettes, Groupes, Aide ; Étiquettes texte ultérieurement.
- Choix entre mode Simple et mode Avancé.
- Annuler / Rétablir pour les modifications du projet.
- Usage principalement dans un navigateur ; priorité proposée à l’ordinateur. Importance de la tablette non précisée.
- Style visuel choisi après la première maquette, sans esthétique définitivement validée.
- L’aperçu permanent à droite n’est pas le parcours principal retenu, mais un aperçu contextualisé peut accompagner les étapes.

## 11. Droits d’auteur et licences
Règle explicite d’Etienne : les images doivent respecter le droit d’auteur et les licences.

Pour les ressources intégrées : vérifier et documenter source, auteur, licence, droits de modification et de redistribution, obligations d’attribution. Conserver les crédits nécessaires, y compris dans les exports si requis.

Pour les ressources importées : l’utilisateur doit disposer des droits nécessaires. L’application ne peut pas certifier automatiquement les droits d’une image importée. Gratuité et liberté de réutilisation ne sont pas équivalentes.

Même exigence de compatibilité pour les polices. La licence générale du nouveau projet reste à choisir.

## 12. Documentation et GitHub
- Petit wiki simple, enrichi après chaque catégorie validée.
- Explications courtes : utilité, étapes et exemple.
- Tutoriel CSV à rédiger à partir du fichier de référence.
- Documentation à ajuster au fonctionnement réel après développement.
- Dépôt cible : https://github.com/Ploufty/G-n-rateur-d-tiquettes
- Mise à jour progressive du plan, du wiki puis du code souhaitée.
- Racine du dépôt consultée : seul README.md était présent.
- Tentatives d’écriture : erreur 403 « Resource not accessible by integration ». Aucun des documents n’a été envoyé avec succès.

## 13. État réel de la maquette
La maquette contient des élèves fictifs et un style provisoire. Elle illustre les cinq étapes, les onglets, les modes Simple/Avancé, une partie des réglages et la sauvegarde JSON.

Les fonctionnalités finales ne sont pas toutes implémentées. Notamment : CSV, photos, fonds, licences de polices vérifiées et polices embarquées, modèles distincts complets, contour détaillé, exceptions individuelles, icônes, calibration, pagination exacte, export PDF/PNG, bibliothèque de modèles JSON et export de modèle anonymisé.

La grande initiale, les trois lignes, les réglages partiels et l’aperçu sont schématiques. La cursive est une police générique du navigateur, pas une police scolaire validée.

Limitation de la maquette : les groupes utilisent les positions de liste plutôt que des identifiants stables ; appliquer une nouvelle liste les réinitialise. La version finale devra utiliser des identifiants stables. L’import JSON de la maquette a son propre format temporaire et n’est pas le schéma final.

## 14. Points ouverts
- CSV de référence et colonnes.
- Dimensions par modèle et formats papier supplémentaires.
- Polices exactes, licences et traitement de la cursive.
- Résolution PNG et règles de nommage des fichiers.
- Détails du contour, repères de découpe et calibration.
- Gestion des homonymes et modification d’une liste déjà illustrée.
- Modèles personnels : sélection, duplication, suppression et séparation données/modèles dans le JSON.
- Étendue de l’historique Annuler/Rétablir.
- Bibliothèque d’icônes et attribution.
- Présentation visuelle après retour sur la maquette.
- Usage tablette et fonctionnement hors connexion à confirmer.
