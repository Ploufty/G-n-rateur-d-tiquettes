# Étiquettes de maternelle · Apps1D76

Base évolutive pour créer les étiquettes prénom d’une classe : modèles de départ, jusqu’à trois lignes, Marelle et Marelle Bâton, photos, fonds, groupes, grille A4 et exports PDF/PNG/ZIP.

## Utilisation

Téléchargez le dépôt et ouvrez **index.html** dans un navigateur récent. L’application fonctionne sans installation et hors connexion avec le dossier complet. Aucun compte ni serveur de données : les élèves et images sont traités localement.

Enregistrez votre projet en JSON pour le reprendre sur un autre ordinateur. La classe n’est pas sauvegardée automatiquement. Les modèles partagés retirent toutes les images, les groupes et les données des élèves.

- [Guide utilisateur](docs/wiki.md)
- [Fonctions disponibles et prochaines évolutions](docs/etat-du-projet.md)
- [Plan de développement](docs/plan-developpement.md)
- [Sources et licences des ressources](docs/ressources-et-licences.md)
- [Cahier des charges initial](docs/conception/cahier-des-charges.md)

## Développement

Node.js 24 et npm 11.13.0. Pas de compilation : HTML, CSS et fichiers JavaScript séparés. Les versions des dépendances sont figées dans package-lock.json ; les scripts d’installation sont désactivés dans .npmrc.

```sh
npm ci --ignore-scripts
npm test
npm start
```

Serveur local : http://127.0.0.1:4173. Pour un autre port, définissez la variable PORT. Les fichiers de vendor et assets/fonts sont versionnés pour permettre une ouverture locale autonome. `npm run vendor` recopie les bibliothèques PDF et ZIP après une mise à jour volontaire des dépendances.

Les tests de navigateur utilisent Edge installé, via Playwright :

```sh
npm run test:browser
```

Le serveur doit être lancé. TEST_URL permet de changer son adresse. BROWSER_CHANNEL permet de sélectionner un autre navigateur compatible avec Playwright ; par exemple chromium après installation de son navigateur de test.

Les résultats et captures sont écrits dans test-results, qui n’est pas publié.

## Limites actuelles

A4 uniquement. CSV provisoire documenté, à adapter au fichier de référence. PDF composé d’images à 300 ppp aux dimensions exactes : le texte n’est pas sélectionnable. La ligne script utilise Nunito Sans par défaut et la cursive Marelle Bâton.

Essais automatisés réalisés dans Edge, ouverture locale hors connexion et contrôles d’accessibilité sur les vues testées. Un essai papier à 100 % et les essais Firefox/tablette restent à effectuer.

La direction artistique reprend les repères Apps1D76 fournis : bleu/rouge, cartes, pilules, thème clair/sombre. Le code des deux applications d’inspiration et les fichiers de l’autre projet ne sont pas inclus.

La licence générale du code du projet reste à choisir par son propriétaire. Les licences des bibliothèques et polices sont conservées séparément.
