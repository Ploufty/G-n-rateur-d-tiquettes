# Plan de développement proposé

Les décisions fonctionnelles validées sont décrites dans le cahier des charges. Ce document propose une méthode d’implémentation.

## Architecture
HTML sémantique, CSS responsive et JavaScript en modules. Une application statique suffit pour les fonctions envisagées ; aucun compte ni serveur de données n’est nécessaire. Le traitement local est une proposition technique à confirmer.

Séparer :
- données du projet et validation du schéma JSON ;
- liste de classe et identifiants stables ;
- groupes et héritage des réglages ;
- modèles et exceptions individuelles ;
- ressources : images, polices, métadonnées de licence ;
- calcul de mise en page en millimètres ;
- aperçu et exports PDF/PNG ;
- interface du parcours et historique Annuler/Rétablir.

L’aperçu et l’export doivent partager les mêmes calculs pour éviter des différences de placement. Le texte du PDF doit rester net ; intégrer les polices si les licences le permettent. Les bibliothèques exactes seront sélectionnées après un prototype d’export.

## Développement par étapes
1. Valider le parcours sur la maquette et choisir ensuite le style visuel.
2. Mettre en place le modèle de données, les identifiants stables et un premier JSON versionné.
3. Développer une chaîne complète : liste → étiquette simple → calcul A4 → aperçu → PDF.
4. Développer les trois lignes, polices validées, initiales et ajustement individuel des prénoms longs.
5. Ajouter photos, recadrage, fonds, contours, pictogrammes et groupes.
6. Ajouter l’import CSV conforme au fichier de référence et son tutoriel.
7. Compléter modèles personnels, JSON autonome et export de modèle sans données élèves.
8. Ajouter les gabarits autocollants, cases utilisées et calibration.
9. Compléter PNG et ZIP, puis accessibilité, compatibilité et finitions.

Les modèles de la première maquette ne sont pas une liste exhaustive des supports finaux.

## Vérifications utiles
- Accents, apostrophes, traits d’union, prénoms longs et homonymes.
- Associations élève/photo/groupe après tri, suppression et modification.
- Héritage individuel/groupe/commun propriété par propriété.
- Quantités, cases exclues et pagination sans ligne supplémentaire.
- Dimensions physiques du PDF et essai papier à 100 %.
- Chargement des polices avant mesure du texte.
- Recadrage des images et proportions conservées.
- Export/import JSON : images, modèles et exceptions restaurés.
- Modèle partagé sans données d’élèves résiduelles.
- Navigation clavier et contrôles sur petits écrans.
- Essais sur les navigateurs de l’école, notamment Chrome, Firefox et Edge.
- Sources, licences et attributions avant inclusion des ressources.

## État de vérification de la maquette
La syntaxe JavaScript a passé `node --check`. Un scénario Playwright a été préparé pour navigation, écritures, initiale, groupes, annulation et largeur 360 px, mais n’a pas pu s’exécuter car le navigateur Playwright était absent. Aucun test d’impression n’a encore eu lieu.
