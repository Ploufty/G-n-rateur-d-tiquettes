# Guide utilisateur · version 0.1

## 1. Préparer la classe

Un prénom par ligne, puis **Appliquer la liste**. Un CSV ou TXT peut aussi être importé. Les fiches permettent de renommer un élève, changer sa quantité, déplacer sa position ou le supprimer. Les flèches utilisent l’ordre manuel.

Les homonymes sont conservés comme élèves distincts. Une nouvelle liste conserve les associations des prénoms inchangés dans leur ordre d’apparition. Pour renommer sans perdre la photo ou le groupe, modifiez la fiche.

Format CSV de départ (UTF-8) :

```csv
Prénom;Groupe;Exemplaires
Léna;Rouge;2
Malo;Bleu;1
Inès;;
```

Groupe et Exemplaires sont facultatifs. Point-virgule, virgule et tabulation sont acceptés. Les cellules entre guillemets sont prises en charge. Une colonne Prénom est recommandée ; une liste sans en-tête utilise sa première colonne. Le fichier de référence définitif reste attendu.

## 2. Choisir une base

Porte-manteau, appel, cahier, casier, matériel, petits prénoms et format libre proposent des dimensions modifiables. Choisir une base remplace les réglages communs, sans effacer les exceptions existantes.

Enregistrez les réglages communs et la grille comme modèle personnel. Les modèles sont conservés dans le JSON ; ils peuvent être utilisés, dupliqués et supprimés. Un gabarit autocollant peut ainsi être réutilisé.

## 3. Personnaliser

Choisissez une cible : classe, groupe ou élève. Seules les propriétés modifiées remplacent les propriétés héritées. Priorité : élève → groupe → classe. **Revenir aux réglages hérités** retire toutes les exceptions de la cible.

Jusqu’à trois lignes sont disponibles, chacune avec police, casse, couleur, taille maximale et gras. Le mode Avancé expose l’agrandissement, le gras et la couleur de l’initiale. Une grande initiale séparée peut être ajoutée.

Polices intégrées : **Marelle**, **Marelle Bâton**, **OpenDyslexic**, **Nunito Sans**, **Fredoka** et **Playwrite FR Trad**. La précision du propriétaire limite uniquement la famille Marelle à ses deux variantes de base, sans lignage ni variante « 2 ». Marelle Bâton garde des minuscules cursives ; la ligne script utilise Nunito Sans par défaut. Pour les polices sans fichier gras, le navigateur synthétise le gras.

Les prénoms s’ajustent automatiquement au cadre selon les mesures réelles des caractères. Aucun cadre photo n’apparaît si l’élève n’a pas de photo.

Une photo individuelle se règle dans Personnaliser. L’import en lot se trouve dans Élèves : le nom de fichier suggère l’élève, puis vous vérifiez les associations avant validation. Les homonymes exigent un choix explicite. Zoom et déplacements conservent l’image originale.

Photos : gauche, droite ou dessus ; carré, rectangle, rond ou arrondi. Fond : couleur, couleur du groupe, image, zoom, déplacement et opacité. Contour : couleur, épaisseur, pointillés et arrondi. Pictogrammes : formes géométriques originales du projet.

## 4. Régler la feuille

A4 portrait ou paysage. Deux modes : dimensions de l’étiquette en mm, ou lignes et colonnes. Seul le mode choisi pilote le calcul. Marges haut/bas/gauche/droite et espaces horizontal/vertical sont distincts.

En Avancé, marquez les cases déjà utilisées d’une planche : elles sont exclues **sur la première feuille uniquement**. Les autres feuilles utilisent toute la grille. Modifier le format ou les dimensions remet ces cases à zéro.

Téléchargez la calibration, imprimez à 100 % et mesurez son carré de 100 mm. Les corrections horizontale et verticale déplacent la grille sans changer ses dimensions. Une grille qui déborde empêche l’export.

## 5. Vérifier et exporter

Parcourez toutes les pages de l’aperçu. Le PDF contient toutes les pages. Le PNG peut représenter un élève ou la page affichée. Le ZIP contient les images individuelles, copies comprises. Les noms sont numérotés pour éviter d’écraser les homonymes.

PDF : A4 aux dimensions physiques exactes, étiquettes rasterisées à 300 ppp. PNG : 150 ou 300 ppp. La dimension en pixels découle des millimètres et de cette résolution ; certains logiciels demandent de régler explicitement la taille d’impression du PNG. Pour imprimer précisément, utilisez le PDF à **taille réelle / 100 %**, sans ajustement à la page.

## Groupes

Renommez les groupes, choisissez couleur et icône, puis affectez les élèves. Une proposition de répartition équilibrée est affichée avant application ; elle suit l’ordre actuel des élèves et n’est pas aléatoire. L’export PDF rassemble les groupes et les élèves sans groupe.

## Sauvegarde et partage

**Enregistrer** télécharge un JSON autonome avec la classe, les groupes, les images, les réglages et les modèles. **Ouvrir un projet** restaure ce fichier. Un fichier incompatible est refusé sans remplacer la classe. Ctrl/Cmd + S enregistre le projet.

Le partage d’un modèle retire tous les élèves, groupes, photos et fonds, ainsi que les cases déjà utilisées. Ce choix conservateur évite de transférer une image personnelle. Ouvrir un modèle applique ses réglages à votre classe actuelle.

Annuler/Rétablir conserve jusqu’à 35 modifications. Les téléchargements ne sont pas annulables. Les images devenues inutilisées sont retirées du projet courant ; elles peuvent rester dans l’historique pour permettre l’annulation, jusqu’à la fermeture du navigateur.

## Données et limites

Aucune transmission ni sauvegarde automatique des élèves. Seule la préférence de thème peut être mémorisée. Vous êtes responsable des droits sur vos images et de la conservation du JSON.

300 élèves, 30 groupes, 50 exemplaires par élève, 3 000 étiquettes par série, 100 pages et 50 modèles personnels au maximum. JPG, PNG et WebP : 10 Mo par image et 30 millions de pixels. Images intégrées limitées à 70 millions de caractères encodés ; import JSON limité à 80 Mo.

Voir [l’état du projet](etat-du-projet.md) pour les limites de vérification et [les crédits](ressources-et-licences.md).
