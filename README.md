# Reminance

Petit site personnel que j'utilise au quotidien pour deux choses :

- **Fiches de lecture/visionnage** : garder une trace des jeux vidéo, livres, films et séries que je termine, avec mes impressions.
- **Suivi boursier** : suivre l'évolution de quelques actions qui m'intéressent particulièrement, via l'API Yahoo Finance.

## Stack

- **Front-end** : Angular (Angular CLI 21)
- **Back-end** : Node.js / Express, avec récupération des cours boursiers via l'API Yahoo Finance
- **Stockage** : fichiers JSON (pas de base de données)

## Lancer le projet en local

```bash
ng serve
```

Puis ouvrir `http://localhost:4200/`. L'application se recharge automatiquement à chaque modification des fichiers source.

## Build

```bash
ng build
```

Génère les artefacts de production dans le dossier `backend/angular`.

