# Petit wiki — Étiquettes de maternelle

Document évolutif • Version 0.9 • 5 octobre 2026

L’application est en préparation. Ce guide décrit les fonctionnalités retenues ; elles ne sont pas encore disponibles. Les rubriques à préciser seront complétées après chaque échange.

## À quoi sert l’application ?
Créer des étiquettes prénom pour les porte-manteaux, l’appel, les cahiers, les casiers, le matériel et les petits supports de classe.

La première version utilise uniquement des prénoms. Un onglet « Étiquettes texte » est prévu pour une évolution ultérieure.

## Choisir un modèle
Deux possibilités sont retenues : partir d’un modèle prêt à personnaliser ou créer une étiquette au format libre. Les dimensions et les modèles exacts restent à définir.

## Préparer la liste de la classe
L’application gère une seule classe. La liste de l’onglet principal est la référence commune pour les autres onglets.

Un import CSV est prévu. Le tutoriel sera rédigé à partir du fichier de référence fourni par Etienne : colonnes, séparateur, encodage et exemple. Aucun format CSV définitif n’est fixé à ce stade.

## Organiser les groupes
Un onglet « Groupes » utilisera les élèves de la liste principale : inutile de ressaisir les prénoms. Un élève pourra appartenir à un seul groupe dans la première version.

Les groupes proposés au départ seront Rouge, Bleu, Vert et Jaune. Ils pourront être renommés, leur couleur modifiée et une icône facultative ajoutée, avec une licence compatible et les crédits requis.

Choix de conception retenu par délégation : affectation manuelle simple, accompagnée d’un bouton facultatif « Répartir équitablement » pour équilibrer les effectifs. Une répartition automatique devra être prévisualisée avant de remplacer des affectations existantes.

Un export PDF de la liste des groupes est retenu.

Les réglages individuels priment sur ceux du groupe, qui priment sur les réglages communs. Seules les propriétés explicitement modifiées remplacent les valeurs héritées.

## Choisir l’ordre et le nombre d’exemplaires
Les étiquettes pourront suivre l’ordre de la liste, l’ordre alphabétique, un classement par groupe ou un ordre manuel.

Un nombre d’exemplaires commun pourra être défini, avec des quantités différentes pour certains élèves.

Exemple : préparer deux étiquettes par élève et trois pour un élève en particulier.

## Choisir les polices
Les polices devront être gratuites et leur licence autoriser les usages et la distribution prévus dans l’application.

Polices souhaitées : Marelle, Marelle Bâton, OpenDyslexic et une sélection de polices décoratives. Leur inclusion reste conditionnée à la vérification de leurs licences.

Jusqu’à trois lignes sont disponibles : capitales, script et cursive. Chaque ligne peut être affichée ou masquée et possède ses propres réglages de police, taille, casse, couleur et mise en valeur de l’initiale.

La taille du texte s’ajuste automatiquement à chaque prénom long. Une étiquette peut être personnalisée individuellement sans modifier les autres.

## Mettre l’initiale en valeur
Trois options sont retenues pour l’initiale dans le prénom : l’agrandir, la mettre en gras et choisir sa couleur. Elles seront indépendantes et cumulables.

Exemple : dans « Léna », afficher le L plus grand, en gras et en rouge.

Une option permet d’afficher une grande initiale séparée au-dessus du prénom.

## Ajouter des photos
Une photo est facultative : si un élève n’en a pas, aucun cadre vide ni image de remplacement n’est affiché.

Les photos pourront être importées individuellement ou en lot. Pour un lot, une association par nom de fichier sera proposée et devra être vérifiée avant validation.

Le placement est au choix : à gauche, à droite ou au-dessus du prénom. Les formes disponibles seront carrée, rectangulaire, ronde ou à coins arrondis.

Le zoom et le déplacement dans le cadre permettent d’ajuster le recadrage en conservant l’image originale.

Exemple : importer les portraits de la classe, vérifier leur association aux élèves puis ajuster le cadrage de chaque visage.

## Ajouter un fond personnalisé
Le fond pourra être défini pour toute la classe, pour un groupe ou pour un élève. Les réglages permettront de déplacer l’image, de zoomer et de modifier son opacité.

Un fond uni sera également disponible, avec une couleur personnalisable pouvant reprendre celle du groupe lorsqu’il est défini.

Le contour (outline) des étiquettes sera configurable : affichage ou masquage, couleur, épaisseur, style de trait et arrondi des coins. Les styles prévus comprennent le trait simple et les pointillés. Ce contour décoratif sera distinct des éventuels repères de découpe.

Un pictogramme facultatif pourra être attribué à chaque élève, en complément de l’icône de son groupe. Les images devront avoir une licence compatible ou être importées avec les droits nécessaires.

## Définir le format et la mise en page
Le format A4 sera proposé par défaut, avec orientation portrait ou paysage au choix. Les autres formats éventuels restent à préciser ; A3, A5 et format personnalisé ne sont pas validés à ce stade.

Deux modes seront disponibles : fixer les dimensions d’une étiquette en millimètres ou fixer le nombre de lignes et de colonnes. Le mode actif sera indiqué clairement ; l’autre jeu de valeurs sera calculé pour éviter des réglages contradictoires.

Les marges de la feuille et les espacements horizontaux et verticaux entre les étiquettes seront réglables séparément.

Un petit schéma coté accompagnera les réglages, avec une légende textuelle : L = largeur de l’étiquette, H = hauteur de l’étiquette, l = espacement horizontal, h = espacement vertical. Les marges et les dimensions de la feuille auront leurs propres indications. Les valeurs seront exprimées en millimètres.

## Calibrer l’impression
Une page de calibration et des corrections de décalage seront disponibles en mode Avancé pour vérifier et ajuster l’alignement imprimé. Les dimensions de référence permettront de contrôler une impression à taille réelle (100 %).

## Utiliser une planche autocollante
Choix de conception retenu par délégation : un réglage avancé permettra d’enregistrer un gabarit personnalisé et de marquer les cases déjà utilisées. Les étiquettes seront placées dans les cases restantes sans déplacer la grille.

## Exporter les étiquettes
Deux sorties sont retenues : PDF et PNG. Le PDF permettra l’impression à taille réelle. Pour le PNG, les trois possibilités sont retenues : une étiquette seule, une page entière ou toutes les étiquettes sous forme de fichiers individuels réunis dans un ZIP.

## Enregistrer et reprendre un projet
La sauvegarde principale sera un fichier JSON à télécharger puis à rouvrir dans l’application. La restauration automatique dans le navigateur n’est pas obligatoire.

Le projet JSON contiendra la liste de la classe, les groupes, les photos, les fonds, les réglages, les exceptions individuelles et les modèles personnels. Les images devront être incluses dans le fichier pour permettre de reprendre le projet sur un autre ordinateur sans liens vers des fichiers locaux.

Exemple : enregistrer le projet après avoir préparé les modèles « Appel » et « Cahiers », puis rouvrir ce JSON pour retrouver le travail.

## Partager un modèle
Une option d’export permettra de choisir entre un projet complet et un modèle sans les données des élèves. Le modèle partagé conservera la mise en page et les réglages utiles, en retirant les prénoms, photos et autres éléments propres aux élèves. Les images conservées devront respecter leurs licences et ne pas contenir de données d’élèves.

## Se repérer dans l’application
La création suivra un parcours étape par étape. Le découpage proposé est : liste des élèves, modèle, personnalisation, mise en page puis export. Les intitulés exacts seront validés sur la maquette. Le style visuel sera choisi par Etienne après la première maquette ; aucune direction esthétique n’est encore validée.

Les onglets principaux seront « Étiquettes », « Groupes » et « Aide ». L’onglet « Étiquettes texte » sera ajouté lors du développement de cette fonction ultérieure.

Deux modes seront proposés : Simple et Avancé. Le mode Simple présentera les réglages essentiels ; le mode Avancé donnera accès aux réglages détaillés.

Les actions « Annuler » et « Rétablir » permettront de revenir sur les modifications du projet. Elles ne pourront pas annuler un fichier déjà téléchargé.

L’application sera utilisée principalement dans un navigateur, avec priorité à l’ergonomie sur ordinateur. L’importance de l’usage sur tablette reste à préciser.

## Respecter les droits sur les images
Toutes les images utilisées dans le projet doivent respecter le droit d’auteur et leur licence. Une image gratuite n’est pas automatiquement réutilisable.

Pour les images fournies avec l’application, la source, l’auteur, la licence et les obligations de crédit seront vérifiés et documentés avant intégration. Les crédits requis seront accessibles dans l’application et conservés dans les exports lorsque la licence le demande.

Pour les photos et fonds importés, l’utilisateur devra disposer des droits ou autorisations nécessaires ; l’import ne permet pas à l’application de vérifier automatiquement ces droits.

## Rubriques à compléter ensemble
- Formats de papier supplémentaires éventuels et détails des corrections de calibration.
- Tutoriel CSV avec un fichier exemple.

## Comment ce wiki évolue
Chaque catégorie validée enrichira ce même guide. Les explications resteront courtes : à quoi sert la fonction, comment l’utiliser et un exemple si nécessaire. Après développement, les étapes seront adaptées au fonctionnement réel de l’application.
