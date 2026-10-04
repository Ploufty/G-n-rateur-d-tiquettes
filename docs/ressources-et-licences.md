# Ressources, crédits et licences

## Polices intégrées

Dans la famille Marelle : uniquement **Marelle** et **Marelle Bâton**, versions normales, conformément à la précision du propriétaire. OpenDyslexic, Nunito Sans, Fredoka et Playwrite FR Trad complètent la sélection libre. Les fichiers sont inchangés et embarqués localement ; aucun appel à un CDN n’est nécessaire.

Source : [site officiel Marelle](https://marelle.forge.apps.education.fr/) et [dépôt de la Forge éducative](https://forge.apps.education.fr/marelle/marelle.forge.apps.education.fr). Révision de provenance : `285b42837f38cc94b89f04a9073ff874c389dc17`. Fichiers `fonts/webfonts/Marelle-Regular.woff2` et `fonts/webfonts/MarelleBaton-Regular.woff2`, copiés sous les noms de fichiers locaux indiquant la graisse 400. Les fichiers de police eux-mêmes n’ont pas été modifiés.

Copyright 2026 Ministère de l’Éducation nationale, de l’Enseignement supérieur et de la Recherche, Laurent Bourcellier, Jonathan Fabreguettes et Rosalie Wagner. Nom réservé : Marelle.

Licence **SIL Open Font License 1.1**, conservée intégralement dans [assets/fonts/Marelle-LICENSE.txt](../assets/fonts/Marelle-LICENSE.txt). Elle autorise l’intégration et la redistribution avec la notice et la licence ; les polices ne peuvent pas être vendues seules. Aucune modification du nom interne n’est réalisée. Le gras demandé par l’interface est synthétisé par le navigateur.

L’interface et la liste PDF des groupes utilisent les polices système ; aucun fichier de police système n’est distribué.

Les autres polices proviennent des paquets Fontsource figés dans package-lock.json, sous SIL OFL 1.1. Leurs notices intégrales sont conservées dans assets/fonts :

| Police | Auteurs et source | Notice |
| --- | --- | --- |
| OpenDyslexic | Abbie Gonzalez · [projet officiel](https://opendyslexic.org/) | OpenDyslexic-LICENSE.txt |
| Nunito Sans | The Nunito Sans Project Authors · [Fonthausen/NunitoSans](https://github.com/Fonthausen/NunitoSans) | NunitoSans-LICENSE.txt |
| Fredoka | The Fredoka Project Authors · [hafontia/Fredoka-One](https://github.com/hafontia/Fredoka-One) | Fredoka-LICENSE.txt |
| Playwrite FR Trad | [The Playwrite Project Authors](https://github.com/TypeTogether/Playwrite) · distribution Fontsource | PlaywriteFRTrad-LICENSE.txt |

Les noms et les fichiers binaires ne sont pas modifiés. Les fontes de graisse 400 et 700 sont fournies quand disponibles ; Playwrite FR Trad est fourni en graisse 400.

## Bibliothèques

- [jsPDF](https://github.com/parallax/jsPDF) : génération PDF, licence MIT. Version exacte dans package-lock.json.
- [JSZip](https://github.com/Stuk/jszip) : séries d’images ZIP, utilisée sous licence MIT parmi les licences proposées.

Les notices sont conservées dans les fichiers distribués et dans [vendor/LICENSES.md](../vendor/LICENSES.md). Les dépendances de test ne sont pas chargées par l’application.

## Images et direction artistique

Les pictogrammes géométriques et l’icône SVG sont des dessins du projet. Aucune photo, image de fond ou image d’un site tiers n’est livrée. Les photos utilisées par les tests restent dans les résultats locaux ignorés par Git.

Les repères visuels Apps1D76 viennent des fichiers fournis par Etienne : couleurs, cartes et boutons. Leur application a été réécrite ; les fichiers de l’autre projet ne sont pas copiés dans ce dépôt. Les deux captures de code d’inspiration du ZIP ne sont pas redistribuées.

Les droits sur les photos/fonds importés relèvent de l’utilisateur. Le modèle partagé retire toutes les images, pour éviter de transmettre des ressources personnelles. Une ressource supplémentaire devra être accompagnée de sa source, son auteur, sa licence et ses obligations d’attribution avant intégration.

## Licence du code

Le propriétaire n’a pas encore choisi la licence générale du nouveau code. Les licences distinctes des bibliothèques et polices continuent de s’appliquer. Aucune licence générale n’est attribuée automatiquement au projet.
